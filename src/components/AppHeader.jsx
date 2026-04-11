import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ChevronDown, Menu } from 'lucide-react'

export default function AppHeader({ onMenuClick }) {
  const { view, setView, clients, activeClientId, setActiveClientId } = useApp()
  const [showClientDrop, setShowClientDrop] = useState(false)

  const activeClient = clients.find(c => c.id === activeClientId) || clients[0]

  return (
    <header
      className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 border-b z-40"
      style={{ background: '#1A1612', borderColor: '#3A3028', height: 60 }}
    >
      {/* Left: hamburger (mobile) + wordmark */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-avara-muted hover:text-avara-cream"
          >
            <Menu size={18} />
          </button>
        )}
        <div>
          <span className="font-display text-lg font-semibold tracking-wide text-avara-cream">
            AVARA HOME OS
          </span>
          <span
            className="hidden sm:inline ml-3 text-xs tracking-[0.15em] uppercase"
            style={{ color: '#B8966A', fontFamily: '"DM Sans", sans-serif' }}
          >
            Estate · Lifestyle · Concierge
          </span>
        </div>
      </div>

      {/* Right: view toggle */}
      <div className="flex items-center gap-2">
        {/* Toggle pills */}
        <div
          className="flex rounded-lg overflow-hidden text-xs font-semibold tracking-wide"
          style={{ border: '1px solid #3A3028' }}
        >
          <button
            onClick={() => setView('owner')}
            className="px-3 py-1.5 transition-colors"
            style={{
              background: view === 'owner' ? '#B8966A' : 'transparent',
              color: view === 'owner' ? '#1A1612' : '#9A8E82',
            }}
          >
            Owner
          </button>
          <button
            onClick={() => setView('client')}
            className="px-3 py-1.5 transition-colors"
            style={{
              background: view === 'client' ? '#B8966A' : 'transparent',
              color: view === 'client' ? '#1A1612' : '#9A8E82',
            }}
          >
            Client
          </button>
        </div>

        {/* Client selector (only in client view) */}
        {view === 'client' && (
          <div className="relative">
            <button
              onClick={() => setShowClientDrop(p => !p)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ background: '#2A2520', border: '1px solid #3A3028', color: '#FAF7F2' }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: '#B8966A', color: '#1A1612' }}
              >
                {activeClient?.initials}
              </span>
              <span className="hidden sm:inline">{activeClient?.name}</span>
              <ChevronDown size={12} className="text-avara-muted" />
            </button>

            {showClientDrop && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowClientDrop(false)} />
                <div
                  className="absolute right-0 top-full mt-1 rounded-xl shadow-2xl z-50 min-w-[200px] py-1 overflow-hidden"
                  style={{ background: '#2A2520', border: '1px solid #3A3028' }}
                >
                  <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-avara-muted font-semibold">
                    Viewing as
                  </p>
                  {clients.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setActiveClientId(c.id); setShowClientDrop(false) }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-avara-elevated text-left"
                      style={{ color: c.id === activeClientId ? '#B8966A' : '#FAF7F2' }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: '#B8966A', color: '#1A1612' }}
                      >
                        {c.initials}
                      </span>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-[10px] text-avara-muted">Tier {c.tier}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
