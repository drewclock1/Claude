import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  Utensils, Car, Plane, ChefHat, Anchor, Ticket,
  ChevronRight,
} from 'lucide-react'
import Modal from '../../components/Modal'
import { statusBadgeStyle } from '../../utils/helpers'

const arrangements = [
  { icon: Utensils, label: 'Private Dining Reservations', category: 'Lifestyle & Acquisitions', desc: 'Secure the best tables in Scottsdale and beyond.' },
  { icon: Car,      label: 'Vehicle & Exotic Car Sourcing', category: 'Lifestyle & Acquisitions', desc: 'Short-term, long-term, or purchase arrangement.' },
  { icon: Plane,    label: 'Private Aviation Coordination', category: 'Lifestyle & Acquisitions', desc: 'Charter, membership, or fractional flights.' },
  { icon: ChefHat,  label: 'In-Home Chef Experience', category: 'Lifestyle & Acquisitions', desc: 'Private chef for dinner parties or weekly service.' },
  { icon: Anchor,   label: 'Yacht & Boat Charters', category: 'Lifestyle & Acquisitions', desc: 'Lake Pleasant or beyond — fully crewed.' },
  { icon: Ticket,   label: 'VIP Event Access', category: 'Lifestyle & Acquisitions', desc: 'Suites, floor tickets, hospitality packages.' },
]

const exclusives = [
  {
    title: 'Desert Mountain Golf Club',
    sub: 'Member Experiences',
    desc: "Six Nicklaus Signature courses. We coordinate access, tee times, and guest arrangements for members and their guests.",
    gradient: 'linear-gradient(160deg, #1A2218 0%, #101408 100%)',
    accent: '#8AB89A',
  },
  {
    title: 'Sanctuary Camelback Mountain',
    sub: 'Spa & Wellness',
    desc: "Award-winning spa with desert views. Private cabanas, couples treatments, and wellness retreats curated by Avara.",
    gradient: 'linear-gradient(160deg, #221A20 0%, #160E14 100%)',
    accent: '#B86AB8',
  },
  {
    title: 'The Phoenician',
    sub: 'Private Dining Events',
    desc: "Scottsdale's iconic luxury resort. Private dining rooms, Chef's Table experiences, and curated event spaces.",
    gradient: 'linear-gradient(160deg, #221C18 0%, #160E08 100%)',
    accent: '#B8966A',
  },
]

function ArrangementRequestModal({ service, open, onClose, client }) {
  const { addTask } = useApp()
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask({
      title: service.label,
      category: service.category,
      notes,
      priority: 'Medium',
      dueDate: date,
      status: 'New',
      clientId: client.id,
      clientName: client.name,
    })
    onClose()
    setNotes('')
    setDate('')
  }

  return (
    <Modal open={open} onClose={onClose} title={service.label}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-avara-muted">{service.desc}</p>
        <div>
          <label className="label-xs block mb-1.5">Tell us more</label>
          <textarea
            className="input-dark"
            rows={4}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Dates, party size, preferences, budget, or any details…"
          />
        </div>
        <div>
          <label className="label-xs block mb-1.5">Preferred Date</label>
          <input type="date" className="input-dark" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-gold flex-1">Send Request</button>
        </div>
      </form>
    </Modal>
  )
}

export default function ClientLifestyle() {
  const { activeClient, tasks } = useApp()
  const [selectedService, setSelectedService] = useState(null)

  if (!activeClient) return null

  const recentArrangements = tasks
    .filter(t => t.clientId === activeClient.id && t.category === 'Lifestyle & Acquisitions')
    .slice(0, 3)

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-24 lg:pb-8">

      {/* Header */}
      <div className="pt-2">
        <h1 className="font-display text-3xl font-semibold text-avara-cream">Your Arizona</h1>
        <p className="text-avara-muted text-sm mt-1">Curated by Avara Home</p>
        <div className="h-px mt-3" style={{ background: 'linear-gradient(90deg, #B8966A 0%, transparent 70%)' }} />
      </div>

      {/* Section 1: We Can Arrange */}
      <section className="space-y-3">
        <p className="label-xs">We Can Arrange</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {arrangements.map(({ icon: Icon, label, category, desc }) => (
            <button
              key={label}
              onClick={() => setSelectedService({ icon: Icon, label, category, desc })}
              className="p-4 rounded-2xl text-left hover:-translate-y-0.5 transition-all group"
              style={{ background: '#2A2520', border: '1px solid #3A3028' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors"
                style={{ background: 'rgba(184,150,106,0.1)', color: '#B8966A' }}
              >
                <Icon size={18} />
              </div>
              <p className="text-sm font-semibold text-avara-cream leading-snug group-hover:text-avara-gold transition-colors">
                {label}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Section 2: Scottsdale Exclusives */}
      <section className="space-y-3">
        <p className="label-xs">Scottsdale Exclusives</p>
        <div className="space-y-3">
          {exclusives.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden hover-card cursor-pointer"
              style={{ background: item.gradient, border: '1px solid #3A3028' }}
            >
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: item.accent }}>{item.sub}</p>
                <h3 className="font-display text-base font-semibold text-avara-cream mb-2">{item.title}</h3>
                <p className="text-xs text-avara-muted leading-relaxed">{item.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: item.accent }}>
                  Inquire with Avara <ChevronRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Recent Arrangements */}
      <section className="space-y-3">
        <p className="label-xs">Recent Arrangements</p>
        {recentArrangements.length === 0 ? (
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: '#2A2520', border: '1px solid #3A3028' }}
          >
            <p className="font-display text-lg text-avara-cream mb-1">Your first arrangement</p>
            <p className="text-avara-muted text-sm">is one tap away.</p>
            <button
              onClick={() => setSelectedService(arrangements[0])}
              className="btn-gold mt-4"
            >
              Make a Request
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {recentArrangements.map(task => {
              const st = statusBadgeStyle(task.status)
              return (
                <div key={task.id} className="card-sm flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-avara-cream truncate">{task.title}</p>
                    <p className="text-xs text-avara-muted mt-0.5">{task.category}</p>
                  </div>
                  <span className="badge-status flex-shrink-0" style={{ color: st.color, borderColor: st.border, background: st.bg }}>
                    {task.status}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {selectedService && (
        <ArrangementRequestModal
          service={selectedService}
          open={!!selectedService}
          onClose={() => setSelectedService(null)}
          client={activeClient}
        />
      )}
    </div>
  )
}
