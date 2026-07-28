import type { JobListing, TrackerEntry } from '../types'

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * A listing is a duplicate if a prior tracker entry already logged the same
 * title + company. Per the brief, duplicates are flagged and skipped
 * *before* scoring rather than being re-evaluated.
 */
export function findDuplicateEntry(
  listing: JobListing,
  priorEntries: TrackerEntry[],
): TrackerEntry | undefined {
  const title = normalize(listing.title)
  const company = normalize(listing.company)
  return priorEntries.find(
    (entry) => normalize(entry.title) === title && normalize(entry.company) === company,
  )
}
