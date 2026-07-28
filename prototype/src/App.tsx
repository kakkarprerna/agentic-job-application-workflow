import { useState } from 'react'
import { AppStateProvider } from './context/AppState'
import { NavBar } from './components/NavBar'
import { BatchView } from './components/BatchView'
import { ListingDetail } from './components/ListingDetail'
import { ApprovalQueue } from './components/ApprovalQueue'
import { Tracker } from './components/Tracker'

export type Screen = 'batch' | 'detail' | 'approval' | 'tracker'

function AppShell() {
  const [screen, setScreen] = useState<Screen>('batch')
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null)

  function openDetail(id: string) {
    setSelectedListingId(id)
    setScreen('detail')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar screen={screen} onNavigate={setScreen} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {screen === 'batch' && <BatchView onSelectListing={openDetail} />}
        {screen === 'detail' && selectedListingId && (
          <ListingDetail listingId={selectedListingId} onBack={() => setScreen('batch')} />
        )}
        {screen === 'approval' && <ApprovalQueue onSelectListing={openDetail} />}
        {screen === 'tracker' && <Tracker />}
      </main>
    </div>
  )
}

function App() {
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  )
}

export default App
