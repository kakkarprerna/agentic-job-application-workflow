import type { TrackerEntry } from '../types'

function escapeCsvCell(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function trackerToCsv(entries: TrackerEntry[]): string {
  const header = ['id', 'title', 'company', 'decision', 'skipReason', 'scoreTotal', 'band', 'timestamp']
  const rows = entries.map((entry) =>
    [
      entry.id,
      entry.title,
      entry.company,
      entry.decision,
      entry.skipReason ?? '',
      entry.scoreTotal === null ? '' : String(entry.scoreTotal),
      entry.band,
      entry.timestamp,
    ]
      .map((cell) => escapeCsvCell(String(cell)))
      .join(','),
  )
  return [header.join(','), ...rows].join('\n')
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
