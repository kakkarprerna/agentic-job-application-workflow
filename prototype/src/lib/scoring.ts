import type { Band } from '../types'

export function bandForScore(total: number): Band {
  if (total >= 80) return 'apply'
  if (total >= 60) return 'apply_with_cover_letter'
  return 'skip'
}

export const BAND_LABEL: Record<Band, string> = {
  apply: 'Apply',
  apply_with_cover_letter: 'Apply (targeted cover letter)',
  skip: 'Skip',
}

export const BAND_BADGE_CLASS: Record<Band, string> = {
  apply: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  apply_with_cover_letter: 'bg-amber-100 text-amber-800 border-amber-300',
  skip: 'bg-rose-100 text-rose-800 border-rose-300',
}
