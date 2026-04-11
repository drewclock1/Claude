import { useApp } from '../context/AppContext'
import { X } from 'lucide-react'

export default function Toast() {
  const { toasts, removeToast } = useApp()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium animate-fade-in"
          style={{
            background: '#2A2520',
            border: t.type === 'error' ? '1px solid rgba(212,114,106,0.6)' : '1px solid #B8966A',
            color: '#FAF7F2',
            minWidth: 260,
            maxWidth: 360,
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: t.type === 'error' ? '#D4726A' : '#B8966A' }}
          />
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="flex-shrink-0 text-avara-muted hover:text-avara-cream transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
