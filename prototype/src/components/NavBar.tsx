import { useAppState } from '../context/AppState'
import { SESSION_CAP } from '../types'
import type { Screen } from '../App'

const TABS: { id: Screen; label: string }[] = [
  { id: 'batch', label: 'Batch View' },
  { id: 'approval', label: 'Approval Queue' },
  { id: 'tracker', label: 'Tracker' },
]

export function NavBar({
  screen,
  onNavigate,
}: {
  screen: Screen
  onNavigate: (screen: Screen) => void
}) {
  const { submittedCount, capReached } = useAppState()

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Job Application Agent — Governance Demo
          </span>
          <nav className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  screen === tab.id || (tab.id === 'batch' && screen === 'detail')
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div
          className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium ${
            capReached
              ? 'border-rose-300 bg-rose-50 text-rose-700'
              : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          <span>Session submissions</span>
          <span className="font-mono">
            {submittedCount} / {SESSION_CAP}
          </span>
          {capReached && <span>— cap reached</span>}
        </div>
      </div>
    </header>
  )
}
