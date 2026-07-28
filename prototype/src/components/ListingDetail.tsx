import { useAppState } from '../context/AppState'
import { BandBadge, InjectionBadge } from './Badge'
import { BAND_LABEL } from '../lib/scoring'

function DescriptionWithInjectionFlag({
  description,
  injectionText,
}: {
  description: string
  injectionText?: string
}) {
  if (!injectionText) {
    return <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{description}</p>
  }

  const index = description.indexOf(injectionText)
  if (index === -1) {
    return <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{description}</p>
  }

  const before = description.slice(0, index)
  const after = description.slice(index + injectionText.length)

  return (
    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
      {before}
      <span className="my-2 block rounded-md border-2 border-dashed border-red-400 bg-red-50 p-3 text-red-900">
        <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
          ⚠ Suspicious content detected — treated as data, not followed
        </span>
        <span className="italic">&ldquo;{injectionText}&rdquo;</span>
      </span>
      {after}
    </p>
  )
}

export function ListingDetail({
  listingId,
  onBack,
}: {
  listingId: string
  onBack: () => void
}) {
  const { listings, getScore, getTrackerEntry, duplicateListingIds } = useAppState()
  const listing = listings.find((l) => l.id === listingId)
  const isDuplicate = duplicateListingIds.has(listingId)
  const score = getScore(listingId)
  const trackerEntry = getTrackerEntry(listingId)

  if (!listing) return null

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← Back to batch
      </button>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{listing.title}</h1>
            <p className="mt-1 text-sm text-slate-600">
              {listing.company} · {listing.location}
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-2">
            {listing.containsInjectionAttempt && <InjectionBadge />}
            {isDuplicate ? (
              <BandBadge band="duplicate" />
            ) : score ? (
              <BandBadge band={score.band} />
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Description
          </h2>
          <DescriptionWithInjectionFlag
            description={listing.description}
            injectionText={listing.injectionText}
          />
        </div>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Evaluation
          </h2>

          {isDuplicate ? (
            <div className="rounded-md border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
              This listing matched a previously logged tracker entry and was flagged as a{' '}
              <strong>duplicate</strong> before scoring began. It was skipped rather than
              re-evaluated.
              {trackerEntry?.skipReason && (
                <p className="mt-1 text-slate-600">{trackerEntry.skipReason}</p>
              )}
            </div>
          ) : score ? (
            <div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ScoreCell label="Role fit" value={score.roleFit} max={30} />
                <ScoreCell label="Domain fit" value={score.domainFit} max={25} />
                <ScoreCell label="Requirements coverage" value={score.requirementsCoverage} max={25} />
                <ScoreCell label="Practical fit" value={score.practicalFit} max={20} />
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-md bg-slate-50 p-3">
                <span className="text-sm font-medium text-slate-600">Total</span>
                <span className="font-mono text-lg font-semibold text-slate-900">
                  {score.total} / 100
                </span>
                <span className="text-sm text-slate-600">→ {BAND_LABEL[score.band]}</span>
              </div>
            </div>
          ) : null}

          {trackerEntry && !isDuplicate && trackerEntry.decision === 'skipped' && (
            <p className="mt-3 text-sm text-slate-600">
              Automatically skipped: {trackerEntry.skipReason}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function ScoreCell({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="rounded-md border border-slate-200 p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-base font-semibold text-slate-900">
        {value} <span className="text-sm font-normal text-slate-400">/ {max}</span>
      </div>
    </div>
  )
}
