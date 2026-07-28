export type Band = 'apply' | 'apply_with_cover_letter' | 'skip'

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  remote: boolean
  description: string
  /** Exact substring within `description` that contains the embedded injection attempt, if any. */
  injectionText?: string
  containsInjectionAttempt: boolean
}

export interface ScoreBreakdown {
  listingId: string
  roleFit: number // out of 30
  domainFit: number // out of 25
  requirementsCoverage: number // out of 25
  practicalFit: number // out of 20
  total: number // out of 100
  band: Band
}

export type Decision = 'submitted' | 'revised' | 'discarded' | 'skipped'

export interface TrackerEntry {
  id: string
  listingId: string
  title: string
  company: string
  decision: Decision
  skipReason?: string
  scoreTotal: number | null
  band: Band | 'duplicate'
  timestamp: string // ISO
}

export interface SessionState {
  submittedCount: number
  capReached: boolean
}

export const SESSION_CAP = 10
