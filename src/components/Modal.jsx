import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${maxWidth} rounded-2xl shadow-2xl flex flex-col max-h-[90vh]`}
        style={{ background: '#2A2520', border: '1px solid #3A3028' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-avara-border flex-shrink-0">
          <h3 className="font-display text-lg font-semibold text-avara-cream">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-avara-muted hover:text-avara-cream hover:bg-avara-elevated transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
