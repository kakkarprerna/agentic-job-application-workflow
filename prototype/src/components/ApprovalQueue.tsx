import { useAppState } from '../context/AppState'
import { BandBadge, InjectionBadge } from './Badge'
import { SESSION_CAP } from '../types'

export function ApprovalQueue({ onSelectListing }: { onSelectListing: (id: string) => void }) {
  const { pendingApprovalListings, getScore, decide, capReached, submittedCount } = useAppState()

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-slate-900">Approval Queue</h1>
        <p className="mt-1 text-sm text-slate-600">
          Every application now pauses before submission, no exceptions. Roles scoring 60 or
          above wait here for an explicit human decision.
        </p>
      </div>

      {capReached && (
        <div className="mb-4 rounded-md border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800">
          <strong>Session cap reached ({submittedCount} / {SESSION_CAP}).</strong> No further
          submissions or revisions are possible in this session. Roles below can still be
          discarded.
        </div>
      )}

      {pendingApprovalListings.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Nothing waiting for approval right now.
        </div>
      ) : (
        <ul className="space-y-3">
          {pendingApprovalListings.map((listing) => {
            const score = getScore(listing.id)
            if (!score) return null
            return (
              <li
                key={listing.id}
                className="rounded-lg border border-slate-200 bg-white p-4 sm:flex sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onSelectListing(listing.id)}
                    className="text-left font-medium text-slate-900 hover:underline"
                  >
                    {listing.title}
                  </button>
                  <p className="text-sm text-slate-600">
                    {listing.company} · {listing.location}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <BandBadge band={score.band} />
                    <span className="font-mono text-xs text-slate-500">{score.total} / 100</span>
                    {listing.containsInjectionAttempt && <InjectionBadge />}
                  </div>
                </div>

                <div className="mt-3 flex flex-shrink-0 gap-2 sm:mt-0">
                  <button
                    type="button"
                    disabled={capReached}
                    onClick={() => decide(listing.id, 'submitted')}
                    className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Approve &amp; submit
                  </button>
                  <button
                    type="button"
                    disabled={capReached}
                    onClick={() => decide(listing.id, 'revised')}
                    className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Send for revision
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(listing.id, 'discarded')}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Discard
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
