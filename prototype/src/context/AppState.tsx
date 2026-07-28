import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { historicalTrackerEntries, seedListings, seedScores } from '../data/seed'
import { findDuplicateEntry } from '../lib/duplicate'
import type { Decision, JobListing, ScoreBreakdown, TrackerEntry } from '../types'
import { SESSION_CAP } from '../types'

interface InitialTracker {
  entries: TrackerEntry[]
  duplicateListingIds: Set<string>
}

function buildInitialTracker(): InitialTracker {
  const entries: TrackerEntry[] = []
  const duplicateListingIds = new Set<string>()
  const initTimestamp = new Date().toISOString()

  for (const listing of seedListings) {
    const duplicateOf = findDuplicateEntry(listing, historicalTrackerEntries)
    if (duplicateOf) {
      duplicateListingIds.add(listing.id)
      entries.push({
        id: `dup-${listing.id}`,
        listingId: listing.id,
        title: listing.title,
        company: listing.company,
        decision: 'skipped',
        skipReason: `Duplicate of a previously evaluated role (see tracker entry from ${new Date(
          duplicateOf.timestamp,
        ).toLocaleDateString()}) — skipped before scoring`,
        scoreTotal: null,
        band: 'duplicate',
        timestamp: initTimestamp,
      })
      continue
    }

    const score = seedScores.find((s) => s.listingId === listing.id)
    if (score && score.band === 'skip') {
      entries.push({
        id: `auto-${listing.id}`,
        listingId: listing.id,
        title: listing.title,
        company: listing.company,
        decision: 'skipped',
        skipReason: 'Score below 60 threshold',
        scoreTotal: score.total,
        band: score.band,
        timestamp: initTimestamp,
      })
    }
    // apply / apply_with_cover_letter listings are left undecided and surface
    // in the approval queue instead of the tracker.
  }

  return { entries, duplicateListingIds }
}

interface AppStateValue {
  listings: JobListing[]
  scores: ScoreBreakdown[]
  trackerEntries: TrackerEntry[]
  duplicateListingIds: Set<string>
  submittedCount: number
  capReached: boolean
  getScore: (listingId: string) => ScoreBreakdown | undefined
  getTrackerEntry: (listingId: string) => TrackerEntry | undefined
  pendingApprovalListings: JobListing[]
  decide: (listingId: string, decision: Decision, skipReason?: string) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [historical] = useState(historicalTrackerEntries)
  const initial = useMemo(buildInitialTracker, [])
  const [trackerEntries, setTrackerEntries] = useState<TrackerEntry[]>(initial.entries)
  const [duplicateListingIds] = useState<Set<string>>(initial.duplicateListingIds)

  const submittedCount = trackerEntries.filter(
    (e) => e.decision === 'submitted' || e.decision === 'revised',
  ).length
  const capReached = submittedCount >= SESSION_CAP

  function getScore(listingId: string) {
    return seedScores.find((s) => s.listingId === listingId)
  }

  function getTrackerEntry(listingId: string) {
    return trackerEntries.find((e) => e.listingId === listingId)
  }

  function decide(listingId: string, decision: Decision, skipReason?: string) {
    setTrackerEntries((prev) => {
      if (prev.some((e) => e.listingId === listingId)) return prev
      const listing = seedListings.find((l) => l.id === listingId)
      if (!listing) return prev
      const score = getScore(listingId)
      const entry: TrackerEntry = {
        id: `dec-${listingId}`,
        listingId,
        title: listing.title,
        company: listing.company,
        decision,
        skipReason,
        scoreTotal: score?.total ?? null,
        band: score?.band ?? 'skip',
        timestamp: new Date().toISOString(),
      }
      return [...prev, entry]
    })
  }

  const pendingApprovalListings = seedListings.filter((listing) => {
    if (duplicateListingIds.has(listing.id)) return false
    if (trackerEntries.some((e) => e.listingId === listing.id)) return false
    const score = getScore(listing.id)
    return score && score.band !== 'skip'
  })

  const value: AppStateValue = {
    listings: seedListings,
    scores: seedScores,
    trackerEntries: [...historical, ...trackerEntries],
    duplicateListingIds,
    submittedCount,
    capReached,
    getScore,
    getTrackerEntry,
    pendingApprovalListings,
    decide,
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
