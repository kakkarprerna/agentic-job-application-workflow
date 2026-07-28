import { useMemo, useState } from 'react'
import { useAppState } from '../context/AppState'
import { BandBadge, DecisionBadge } from './Badge'
import { downloadCsv, trackerToCsv } from '../lib/csv'
import type { Band, Decision } from '../types'

type DecisionFilter = Decision | 'all'
type BandFilter = Band | 'duplicate' | 'all'

export function Tracker() {
  const { trackerEntries } = useAppState()
  const [decisionFilter, setDecisionFilter] = useState<DecisionFilter>('all')
  const [bandFilter, setBandFilter] = useState<BandFilter>('all')

  const sorted = useMemo(
    () =>
      [...trackerEntries].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [trackerEntries],
  )

  const filtered = sorted.filter((entry) => {
    if (decisionFilter !== 'all' && entry.decision !== decisionFilter) return false
    if (bandFilter !== 'all' && entry.band !== bandFilter) return false
    return true
  })

  function handleExport() {
    const csv = trackerToCsv(filtered)
    downloadCsv('application-tracker.csv', csv)
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Application Tracker</h1>
          <p className="mt-1 text-sm text-slate-600">
            A log of every evaluated role, standing in for the Google Sheets tracker.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          Export CSV
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Decision
          <select
            value={decisionFilter}
            onChange={(e) => setDecisionFilter(e.target.value as DecisionFilter)}
            className="rounded-md border border-slate-300 px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="submitted">Submitted</option>
            <option value="revised">Revised</option>
            <option value="discarded">Discarded</option>
            <option value="skipped">Skipped</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          Band
          <select
            value={bandFilter}
            onChange={(e) => setBandFilter(e.target.value as BandFilter)}
            className="rounded-md border border-slate-300 px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="apply">Apply</option>
            <option value="apply_with_cover_letter">Apply (cover letter)</option>
            <option value="skip">Skip</option>
            <option value="duplicate">Duplicate</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Decision</th>
              <th className="px-4 py-3">Band</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((entry) => (
              <tr key={entry.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{entry.title}</td>
                <td className="px-4 py-3 text-slate-600">{entry.company}</td>
                <td className="px-4 py-3">
                  <DecisionBadge decision={entry.decision} />
                </td>
                <td className="px-4 py-3">
                  <BandBadge band={entry.band} />
                </td>
                <td className="px-4 py-3 font-mono text-slate-700">
                  {entry.scoreTotal ?? '—'}
                </td>
                <td className="px-4 py-3 text-slate-500">{entry.skipReason ?? '—'}</td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                  No tracker entries match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
