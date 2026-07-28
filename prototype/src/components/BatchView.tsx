import { useMemo, useState } from 'react'
import { useAppState } from '../context/AppState'
import { BandBadge, InjectionBadge } from './Badge'

const BATCH_SIZE = 5

type SortDir = 'asc' | 'desc' | null

export function BatchView({ onSelectListing }: { onSelectListing: (id: string) => void }) {
  const { listings, getScore, duplicateListingIds } = useAppState()
  const [batchIndex, setBatchIndex] = useState(0)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const batchCount = Math.ceil(listings.length / BATCH_SIZE)
  const batch = listings.slice(batchIndex * BATCH_SIZE, batchIndex * BATCH_SIZE + BATCH_SIZE)

  const rows = useMemo(() => {
    const withScores = batch.map((listing) => {
      const isDuplicate = duplicateListingIds.has(listing.id)
      const score = getScore(listing.id)
      return {
        listing,
        isDuplicate,
        total: isDuplicate ? null : score?.total ?? null,
        band: isDuplicate ? ('duplicate' as const) : score?.band,
      }
    })
    if (!sortDir) return withScores
    return [...withScores].sort((a, b) => {
      const aVal = a.total ?? -1
      const bVal = b.total ?? -1
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal
    })
  }, [batch, sortDir, duplicateListingIds, getScore])

  function toggleSort() {
    setSortDir((prev) => (prev === 'desc' ? 'asc' : prev === 'asc' ? null : 'desc'))
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-slate-900">Batch Evaluation</h1>
        <p className="mt-1 text-sm text-slate-600">
          Roles are evaluated five at a time and ranked against each other in a single comparison
          table, rather than judged in isolation.
        </p>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-700">
          Batch {batchIndex + 1} of {batchCount}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={batchIndex === 0}
            onClick={() => setBatchIndex((i) => Math.max(0, i - 1))}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={batchIndex >= batchCount - 1}
            onClick={() => setBatchIndex((i) => Math.min(batchCount - 1, i + 1))}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">
                <button type="button" onClick={toggleSort} className="flex items-center gap-1">
                  Total score
                  <span className="text-slate-400">
                    {sortDir === 'asc' ? '▲' : sortDir === 'desc' ? '▼' : '↕'}
                  </span>
                </button>
              </th>
              <th className="px-4 py-3">Band</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ listing, isDuplicate, total, band }) => (
              <tr
                key={listing.id}
                onClick={() => onSelectListing(listing.id)}
                className={`cursor-pointer hover:bg-slate-50 ${isDuplicate ? 'bg-slate-50/60' : ''}`}
              >
                <td className="px-4 py-3 font-medium text-slate-900">{listing.title}</td>
                <td className="px-4 py-3 text-slate-600">{listing.company}</td>
                <td className="px-4 py-3 text-slate-600">{listing.location}</td>
                <td className="px-4 py-3">
                  {listing.containsInjectionAttempt && <InjectionBadge />}
                </td>
                <td className="px-4 py-3 font-mono text-slate-700">{total ?? '—'}</td>
                <td className="px-4 py-3">{band && <BandBadge band={band} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
