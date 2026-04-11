import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { MapPin, Calendar, ClipboardList, Home } from 'lucide-react'
import { formatDate, daysUntil, daysSince } from '../../utils/helpers'

export default function Properties() {
  const { clients, tasks } = useApp()
  const navigate = useNavigate()

  const getOpenIssues = (clientId) =>
    tasks.filter(t => t.clientId === clientId && t.status !== 'Completed').length

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-avara-muted text-sm">{clients.length} propert{clients.length !== 1 ? 'ies' : 'y'} under management</p>
      </div>

      {clients.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-center">
          <Home size={40} className="mb-4" style={{ color: '#B8966A', opacity: 0.4 }} />
          <p className="font-display text-xl text-avara-cream mb-1">No properties yet</p>
          <p className="text-avara-muted text-sm">Add clients to see their properties here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {clients.map(client => {
            const openIssues = getOpenIssues(client.id)
            const daysNext = daysUntil(client.nextVisit)
            const daysLast = daysSince(client.lastVisit)
            const lastInspection = (client.property?.inspections || [])[0]

            return (
              <div
                key={client.id}
                className="card hover-card cursor-pointer"
                onClick={() => navigate(`/operator/clients/${client.id}`)}
              >
                {/* Map placeholder */}
                <div
                  className="h-40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden"
                  style={{ background: '#3A3028' }}
                >
                  <div className="text-center">
                    <Home size={32} style={{ color: '#B8966A', opacity: 0.4 }} className="mx-auto mb-2" />
                    <p className="text-xs text-avara-muted">Scottsdale / Paradise Valley</p>
                    <p className="text-xs text-avara-muted">Arizona</p>
                  </div>

                  {/* Tier badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`badge-tier${client.tier}`}>Tier {client.tier}</span>
                  </div>

                  {/* Issues badge */}
                  {openIssues > 0 && (
                    <div
                      className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: '#D4726A', color: '#FAF7F2' }}
                    >
                      {openIssues}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <p className="font-semibold text-avara-cream mb-0.5">{client.name}</p>
                  <p className="text-xs text-avara-muted flex items-center gap-1 mb-4">
                    <MapPin size={10} /> {client.address}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg" style={{ background: '#3A3028' }}>
                      <p className="label-xs mb-1">Last Visit</p>
                      <p className="text-sm text-avara-cream">
                        {daysLast !== null ? `${daysLast}d ago` : '—'}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg" style={{ background: '#3A3028' }}>
                      <p className="label-xs mb-1">Next Visit</p>
                      <p className="text-sm" style={{ color: daysNext !== null && daysNext <= 3 ? '#D4B483' : '#FAF7F2' }}>
                        {daysNext !== null ? (daysNext === 0 ? 'Today' : `In ${daysNext}d`) : '—'}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg" style={{ background: '#3A3028' }}>
                      <p className="label-xs mb-1">Open Tasks</p>
                      <p className="text-sm" style={{ color: openIssues > 0 ? '#D4B483' : '#8AB89A' }}>
                        {openIssues > 0 ? `${openIssues} open` : 'All clear'}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg" style={{ background: '#3A3028' }}>
                      <p className="label-xs mb-1">Last Inspection</p>
                      <p className="text-sm text-avara-cream">
                        {lastInspection ? formatDate(lastInspection.date) : '—'}
                      </p>
                    </div>
                  </div>

                  {/* Property details */}
                  {client.property?.sqft && (
                    <div className="flex gap-3 mt-3 text-xs text-avara-muted border-t border-avara-border pt-3">
                      <span>{client.property.sqft.toLocaleString()} sqft</span>
                      {client.property.bedrooms && <span>{client.property.bedrooms} bed</span>}
                      {client.property.pool && <span>Pool</span>}
                      {client.property.yearBuilt && <span>Built {client.property.yearBuilt}</span>}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
