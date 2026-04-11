import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Search, Plus, ChevronRight, MapPin, Calendar, ClipboardList } from 'lucide-react'
import { formatDate, currency, daysSince, daysUntil } from '../../utils/helpers'
import Modal from '../../components/Modal'
import { uuid } from '../../utils/helpers'

const FILTERS = ['All', 'Tier 1', 'Tier 2', 'Active', 'Inactive']

function NewClientModal({ open, onClose }) {
  const { addClient } = useApp()
  const [form, setForm] = useState({
    name: '', tier: 2, address: '', retainer: '', phone: '', email: '', since: new Date().toISOString().split('T')[0], status: 'Active',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addClient({
      ...form,
      tier: Number(form.tier),
      retainer: Number(form.retainer),
      initials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      preferences: { property: {}, grocery: {}, lifestyle: {}, communication: {}, importantDates: {} },
      property: { systems: {}, inspections: [] },
      notes: [],
      billing: { paymentStatus: 'Pending', alaCarte: [], history: [] },
    })
    onClose()
    setForm({ name: '', tier: 2, address: '', retainer: '', phone: '', email: '', since: new Date().toISOString().split('T')[0], status: 'Active' })
  }

  return (
    <Modal open={open} onClose={onClose} title="New Client">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="label-xs block mb-1.5">Full Name</label>
            <input required className="input-dark" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Sarah Mitchell" />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Tier</label>
            <select className="input-dark" value={form.tier} onChange={e => setForm(p => ({ ...p, tier: e.target.value }))}>
              <option value={2}>Tier 2 — Full Service ($6K+)</option>
              <option value={1}>Tier 1 — Essential ($1K)</option>
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Monthly Retainer ($)</label>
            <input required type="number" className="input-dark" value={form.retainer} onChange={e => setForm(p => ({ ...p, retainer: e.target.value }))} placeholder="6000" />
          </div>
          <div className="col-span-2">
            <label className="label-xs block mb-1.5">Property Address</label>
            <input required className="input-dark" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="8420 E Camelback Rd, Paradise Valley, AZ" />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Phone</label>
            <input className="input-dark" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="(480) 555-0100" />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Email</label>
            <input type="email" className="input-dark" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="client@email.com" />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Client Since</label>
            <input type="date" className="input-dark" value={form.since} onChange={e => setForm(p => ({ ...p, since: e.target.value }))} />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Status</label>
            <select className="input-dark" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-gold flex-1">Add Client</button>
        </div>
      </form>
    </Modal>
  )
}

export default function Clients() {
  const { clients, tasks, logVisit } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = clients.filter(c => {
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'All' ? true :
      filter === 'Tier 1' ? c.tier === 1 :
      filter === 'Tier 2' ? c.tier === 2 :
      filter === 'Active' ? c.status === 'Active' :
      filter === 'Inactive' ? c.status === 'Inactive' : true
    return matchSearch && matchFilter
  })

  const getOpenRequestCount = (clientId) =>
    tasks.filter(t => t.clientId === clientId && t.status !== 'Completed').length

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-avara-muted" />
          <input
            className="input-dark pl-9"
            placeholder="Search clients or addresses…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filter pills */}
        <div
          className="flex rounded-lg overflow-hidden flex-shrink-0"
          style={{ border: '1px solid #3A3028' }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-2 text-xs font-semibold transition-colors"
              style={{
                background: filter === f ? '#B8966A' : 'transparent',
                color: filter === f ? '#1A1612' : '#9A8E82',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <button onClick={() => setShowAdd(true)} className="btn-gold flex-shrink-0">
          <Plus size={15} /> Add Client
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-center">
          <Users size={40} className="mb-4 text-avara-muted opacity-40" style={{ color: '#B8966A' }} />
          <p className="font-display text-xl text-avara-cream mb-1">No clients found</p>
          <p className="text-avara-muted text-sm">Your first client is one conversation away.</p>
          <button onClick={() => setShowAdd(true)} className="btn-gold mt-5">Add First Client</button>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Tier</th>
                  <th>Retainer</th>
                  <th>Next Visit</th>
                  <th>Open Tasks</th>
                  <th>Days as Client</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(client => {
                  const openCount = getOpenRequestCount(client.id)
                  const days = daysSince(client.since)
                  const arrival = daysUntil(client.nextVisit)
                  return (
                    <tr
                      key={client.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/operator/clients/${client.id}`)}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                            style={{ background: '#B8966A', color: '#1A1612' }}
                          >
                            {client.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-avara-cream">{client.name}</p>
                            <p className="text-[11px] text-avara-muted flex items-center gap-1 mt-0.5">
                              <MapPin size={10} /> {client.address}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge-tier${client.tier}`}>T{client.tier}</span>
                      </td>
                      <td>
                        <span className="font-semibold text-avara-gold">{currency(client.retainer)}/mo</span>
                      </td>
                      <td>
                        <div>
                          <p className="text-avara-cream">{formatDate(client.nextVisit)}</p>
                          {arrival !== null && arrival >= 0 && (
                            <p className="text-[11px]" style={{ color: arrival <= 3 ? '#D4B483' : '#9A8E82' }}>
                              {arrival === 0 ? 'Today' : arrival === 1 ? 'Tomorrow' : `In ${arrival} days`}
                            </p>
                          )}
                        </div>
                      </td>
                      <td>
                        {openCount > 0 ? (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ background: 'rgba(184,150,106,0.1)', color: '#B8966A', border: '1px solid rgba(184,150,106,0.3)' }}
                          >
                            <ClipboardList size={10} /> {openCount}
                          </span>
                        ) : (
                          <span className="text-avara-muted text-xs">—</span>
                        )}
                      </td>
                      <td>
                        <span className="text-avara-muted">{days !== null ? `${days}d` : '—'}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => logVisit(client.id)}
                            className="btn-ghost text-xs py-1 px-2"
                          >
                            Log Visit
                          </button>
                          <button
                            onClick={() => navigate(`/operator/clients/${client.id}`)}
                            className="btn-outline text-xs py-1 px-2"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <NewClientModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  )
}
