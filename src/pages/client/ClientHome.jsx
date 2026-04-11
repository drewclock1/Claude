import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { ChevronRight, Plus, MessageCircle, Calendar, CheckCircle2 } from 'lucide-react'
import { greetingByHour, daysUntil, daysSince, formatDate } from '../../utils/helpers'

const spotlightCards = [
  {
    title: "The best new restaurant openings in Scottsdale",
    sub: "April 2026 · Dining",
    gradient: 'linear-gradient(160deg, #2A1F18 0%, #1A1208 100%)',
    accent: '#B8966A',
  },
  {
    title: "Desert Mountain: what members are loving right now",
    sub: "Member Experiences · Golf",
    gradient: 'linear-gradient(160deg, #182228 0%, #0E1618 100%)',
    accent: '#6A8AB8',
  },
  {
    title: "Private aviation at Scottsdale Airport: what you should know",
    sub: "Travel · Scottsdale Air",
    gradient: 'linear-gradient(160deg, #221826 0%, #140E18 100%)',
    accent: '#9A6AB8',
  },
]

export default function ClientHome() {
  const navigate = useNavigate()
  const { activeClient, tasks } = useApp()

  if (!activeClient) return null

  const daysNext = daysUntil(activeClient.nextVisit)
  const daysLast = daysSince(activeClient.lastVisit)
  const openTasks = tasks.filter(t => t.clientId === activeClient.id && t.status !== 'Completed').length
  const lastInspection = (activeClient.property?.inspections || [])[0]
  const statusClear = !lastInspection || lastInspection.issues === 0
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24 lg:pb-8">

      {/* Header */}
      <div className="pt-2">
        <p className="text-avara-muted text-sm mb-0.5">{today}</p>
        <h1 className="font-display text-3xl font-semibold text-avara-cream">
          {greetingByHour()}, {activeClient.name.split(' ')[0]}.
        </h1>
        <div className="h-px mt-3" style={{ background: 'linear-gradient(90deg, #B8966A 0%, transparent 70%)' }} />
      </div>

      {/* Hero: Property Status */}
      <div
        className="rounded-2xl p-5 space-y-4"
        style={{ background: '#2A2520', border: '1px solid #B8966A' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label-xs mb-1">Your Property</p>
            <p className="text-avara-cream font-semibold text-sm leading-snug">{activeClient.address}</p>
          </div>
          <span
            className="badge-status flex-shrink-0"
            style={statusClear
              ? { color: '#8AB89A', borderColor: 'rgba(138,184,154,0.5)', background: 'rgba(138,184,154,0.1)' }
              : { color: '#D4B483', borderColor: 'rgba(212,180,131,0.5)', background: 'rgba(212,180,131,0.1)' }
            }
          >
            {statusClear ? '✓ All Clear' : `${lastInspection?.issues} Noted`}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl text-center" style={{ background: '#3A3028' }}>
            <p className="label-xs mb-1">Last Visit</p>
            <p className="text-avara-cream font-semibold text-sm">
              {daysLast !== null ? (daysLast === 0 ? 'Today' : `${daysLast}d ago`) : '—'}
            </p>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: '#3A3028' }}>
            <p className="label-xs mb-1">Next Visit</p>
            <p className="font-semibold text-sm" style={{ color: daysNext !== null && daysNext <= 5 ? '#D4B483' : '#FAF7F2' }}>
              {daysNext !== null ? (daysNext === 0 ? 'Today' : `In ${daysNext}d`) : '—'}
            </p>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: '#3A3028' }}>
            <p className="label-xs mb-1">Open Items</p>
            <p className="font-semibold text-sm" style={{ color: openTasks > 0 ? '#D4B483' : '#8AB89A' }}>
              {openTasks > 0 ? openTasks : '—'}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/client/property')}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          style={{ background: 'rgba(184,150,106,0.12)', color: '#B8966A', border: '1px solid rgba(184,150,106,0.25)' }}
        >
          View Full Report <ChevronRight size={15} />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/client/requests')}
          className="flex flex-col items-start gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
          style={{ background: '#2A2520', border: '1px solid #3A3028' }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(184,150,106,0.12)', color: '#B8966A' }}>
            <Plus size={20} />
          </div>
          <div>
            <p className="font-semibold text-avara-cream text-sm">Make a Request</p>
            <p className="text-xs text-avara-muted mt-0.5">Estate, lifestyle, or shopping</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/client/messages')}
          className="flex flex-col items-start gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5"
          style={{ background: '#2A2520', border: '1px solid #3A3028' }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(138,184,212,0.12)', color: '#8AB8D4' }}>
            <MessageCircle size={20} />
          </div>
          <div>
            <p className="font-semibold text-avara-cream text-sm">Message Avara</p>
            <p className="text-xs text-avara-muted mt-0.5">Talk to your concierge</p>
          </div>
        </button>
      </div>

      {/* Upcoming */}
      {(daysNext !== null && daysNext >= 0 && daysNext <= 30) && (
        <div
          className="flex items-center gap-4 p-4 rounded-2xl"
          style={{ background: '#2A2520', border: '1px solid #3A3028' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(184,150,106,0.12)', color: '#B8966A' }}
          >
            <Calendar size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-avara-cream">Arrival Prep</p>
            <p className="text-xs text-avara-muted mt-0.5">
              {formatDate(activeClient.nextVisit)} · {daysNext === 0 ? 'Today' : daysNext === 1 ? 'Tomorrow' : `In ${daysNext} days`}
            </p>
          </div>
          <span
            className="text-2xl font-display font-semibold"
            style={{ color: daysNext <= 5 ? '#D4B483' : '#B8966A' }}
          >
            {daysNext}d
          </span>
        </div>
      )}

      {/* Scottsdale Spotlight */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-display text-xl text-avara-cream">Scottsdale Spotlight</h2>
          <div className="flex-1 h-px" style={{ background: '#3A3028' }} />
        </div>
        <div className="space-y-3">
          {spotlightCards.map((card, i) => (
            <div
              key={i}
              className="hover-card rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: card.gradient, border: '1px solid #3A3028' }}
            >
              {/* Image placeholder with dark overlay */}
              <div className="h-32 flex items-end p-4" style={{ background: card.gradient }}>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: card.accent }}>{card.sub}</p>
                  <h3 className="font-display text-base font-semibold text-avara-cream leading-snug">{card.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
