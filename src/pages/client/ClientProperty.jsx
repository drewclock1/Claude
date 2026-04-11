import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import {
  Thermometer, Droplets, Trees, Shield, Wind,
  Phone, ChevronDown, ChevronUp,
} from 'lucide-react'
import { formatDate, daysSince, daysUntil } from '../../utils/helpers'

const systemIcons = {
  hvac:        Thermometer,
  pool:        Droplets,
  landscaping: Trees,
  security:    Shield,
  irrigation:  Wind,
}

function InspectionItem({ inspection }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#3A3028' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: inspection.issues === 0 ? '#8AB89A' : '#D4B483' }}
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-avara-cream">{formatDate(inspection.date)}</p>
          <p className="text-xs text-avara-muted mt-0.5">{inspection.summary}</p>
        </div>
        <span
          className="text-xs font-semibold flex-shrink-0"
          style={{ color: inspection.issues === 0 ? '#8AB89A' : '#D4B483' }}
        >
          {inspection.issues === 0 ? 'All clear' : `${inspection.issues} noted`}
        </span>
        {open ? <ChevronUp size={14} className="text-avara-muted ml-2" /> : <ChevronDown size={14} className="text-avara-muted ml-2" />}
      </button>
      {open && inspection.notes && (
        <div className="px-4 pb-4 border-t border-avara-border pt-3">
          <p className="text-sm text-avara-muted leading-relaxed">{inspection.notes}</p>
        </div>
      )}
    </div>
  )
}

export default function ClientProperty() {
  const { activeClient, vendors } = useApp()

  if (!activeClient) return null

  const daysLast = daysSince(activeClient.lastVisit)
  const daysNext = daysUntil(activeClient.nextVisit)
  const totalDays = daysSince(activeClient.since)
  const openIssues = (activeClient.property?.inspections || []).reduce((s, i) => s + (i.issues || 0), 0)

  // Property's vendor contacts
  const propertyVendors = vendors.filter(v => v.status === 'Active').slice(0, 5)

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24 lg:pb-8">

      {/* Hero header */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #2A2520 0%, #1A1612 100%)', border: '1px solid #B8966A' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: 'radial-gradient(circle at 80% 50%, #B8966A 0%, transparent 60%)' }}
        />
        <p className="label-xs mb-2 relative">Your Estate</p>
        <h1 className="font-display text-xl font-semibold text-avara-cream relative leading-snug">
          {activeClient.address}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Last Visit', value: daysLast !== null ? `${daysLast}d ago` : '—', color: '#FAF7F2' },
          { label: 'Next Visit', value: daysNext !== null ? `In ${daysNext}d` : '—', color: daysNext !== null && daysNext <= 5 ? '#D4B483' : '#FAF7F2' },
          { label: 'Open Issues', value: openIssues || 'None', color: openIssues > 0 ? '#D4B483' : '#8AB89A' },
          { label: 'Days with Avara', value: totalDays !== null ? `${totalDays}` : '—', color: '#B8966A' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-sm text-center">
            <p className="label-xs mb-1">{label}</p>
            <p className="font-display text-xl font-semibold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Systems Status */}
      <div className="card space-y-4">
        <p className="label-xs">Systems Status</p>
        <div className="space-y-2">
          {Object.entries(activeClient.property?.systems || {}).map(([key, sys]) => {
            const Icon = systemIcons[key] || Thermometer
            const isGood = sys.status === 'Good' || sys.status === 'Active'
            return (
              <div key={key} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#3A3028' }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: isGood ? 'rgba(138,184,154,0.12)' : 'rgba(212,180,131,0.12)', color: isGood ? '#8AB89A' : '#D4B483' }}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-avara-cream capitalize">{key}</p>
                  {sys.lastService && <p className="text-xs text-avara-muted mt-0.5">Last serviced {formatDate(sys.lastService)}</p>}
                  {!sys.lastService && (sys.model || sys.equipment || sys.system || sys.vendor) && (
                    <p className="text-xs text-avara-muted mt-0.5">{sys.model || sys.equipment || sys.system || sys.vendor}</p>
                  )}
                </div>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: isGood ? 'rgba(138,184,154,0.1)' : 'rgba(212,180,131,0.1)',
                    color: isGood ? '#8AB89A' : '#D4B483',
                    border: `1px solid ${isGood ? 'rgba(138,184,154,0.3)' : 'rgba(212,180,131,0.3)'}`,
                  }}
                >
                  {sys.status || 'Unknown'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Property details */}
      {activeClient.property?.sqft && (
        <div className="card">
          <p className="label-xs mb-4">Property Details</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Square Feet', value: activeClient.property.sqft?.toLocaleString() + ' sqft' },
              { label: 'Bedrooms', value: activeClient.property.bedrooms || '—' },
              { label: 'Bathrooms', value: activeClient.property.bathrooms || '—' },
              { label: 'Year Built', value: activeClient.property.yearBuilt || '—' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="label-xs mb-1">{label}</p>
                <p className="text-avara-cream font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inspection Reports */}
      <div className="space-y-3">
        <p className="label-xs">Inspection Reports</p>
        {(activeClient.property?.inspections || []).length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-avara-muted text-sm">No inspection reports yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(activeClient.property?.inspections || []).map(ins => (
              <InspectionItem key={ins.id} inspection={ins} />
            ))}
          </div>
        )}
      </div>

      {/* Vendors */}
      <div className="space-y-3">
        <p className="label-xs">Your Vetted Vendors</p>
        <div className="space-y-2">
          {propertyVendors.map(vendor => (
            <div key={vendor.id} className="card-sm flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-avara-cream">{vendor.name}</p>
                <p className="text-xs text-avara-muted">{vendor.category}</p>
              </div>
              {vendor.phone && (
                <a
                  href={`tel:${vendor.phone}`}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: 'rgba(184,150,106,0.1)', color: '#B8966A', border: '1px solid rgba(184,150,106,0.3)' }}
                >
                  <Phone size={12} /> Contact
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
