import type { Band } from '../types'
import { BAND_BADGE_CLASS, BAND_LABEL } from '../lib/scoring'

export function BandBadge({ band }: { band: Band | 'duplicate' }) {
  if (band === 'duplicate') {
    return (
      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 border-slate-300">
        Duplicate
      </span>
    )
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${BAND_BADGE_CLASS[band]}`}
    >
      {BAND_LABEL[band]}
    </span>
  )
}

export function InjectionBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-red-300 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
      ⚠ Injection attempt
    </span>
  )
}

export function DecisionBadge({ decision }: { decision: string }) {
  const styles: Record<string, string> = {
    submitted: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    revised: 'bg-sky-100 text-sky-800 border-sky-300',
    discarded: 'bg-slate-100 text-slate-700 border-slate-300',
    skipped: 'bg-rose-100 text-rose-800 border-rose-300',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[decision] ?? 'bg-slate-100 text-slate-700 border-slate-300'
      }`}
    >
      {decision}
    </span>
  )
}
