import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Plus, Edit2, Save, X } from 'lucide-react'
import Modal from '../../components/Modal'
import { formatDate, statusBadgeStyle } from '../../utils/helpers'

const PROSPECT_STATUSES = ['Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Client (Won)', 'Not Interested']
const PRIORITY_COLORS = {
  Hot:  { color: '#D4726A', border: 'rgba(212,114,106,0.4)', bg: 'rgba(212,114,106,0.1)' },
  Warm: { color: '#D4A26A', border: 'rgba(212,162,106,0.4)', bg: 'rgba(212,162,106,0.1)' },
  Cold: { color: '#9A8E82', border: 'rgba(154,142,130,0.4)', bg: 'rgba(154,142,130,0.1)' },
}

function EditContactModal({ contact, open, onClose }) {
  const { updateOutreach } = useApp()
  const [form, setForm] = useState({ ...contact })

  const handleSave = () => { updateOutreach(contact.id, form); onClose() }

  return (
    <Modal open={open} onClose={onClose} title={`Edit — ${contact.name}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-xs block mb-1.5">Priority</label>
            <select className="input-dark" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
              {['Hot', 'Warm', 'Cold'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Status</label>
            <select className="input-dark" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {['In Progress', 'Active Partner', 'Cold'].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Last Contact</label>
            <input type="date" className="input-dark" value={form.lastContact || ''} onChange={e => setForm(p => ({ ...p, lastContact: e.target.value }))} />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Next Follow-up</label>
            <input type="date" className="input-dark" value={form.nextFollowup || ''} onChange={e => setForm(p => ({ ...p, nextFollowup: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="label-xs block mb-1.5">Notes</label>
          <textarea className="input-dark" rows={3} value={form.notes || ''} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
        </div>
        <div className="flex gap-3 pt-1">
          <button className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button className="btn-gold flex-1" onClick={handleSave}><Save size={13} />Save</button>
        </div>
      </div>
    </Modal>
  )
}

function AddProspectModal({ open, onClose }) {
  const { addProspect } = useApp()
  const [form, setForm] = useState({ name: '', source: 'Realtor Ref', potentialTier: 1, status: 'Contacted', notes: '' })
  const handleSubmit = (e) => {
    e.preventDefault()
    addProspect(form)
    onClose()
    setForm({ name: '', source: 'Realtor Ref', potentialTier: 1, status: 'Contacted', notes: '' })
  }
  return (
    <Modal open={open} onClose={onClose} title="Add Prospect">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-xs block mb-1.5">Name</label>
          <input required className="input-dark" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name or company" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-xs block mb-1.5">Source</label>
            <select className="input-dark" value={form.source} onChange={e => setForm(p => ({ ...p, source: e.target.value }))}>
              {['Realtor Ref', 'Builder Ref', 'Ads', 'Door Drop', 'Event', 'Other'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Potential Tier</label>
            <select className="input-dark" value={form.potentialTier} onChange={e => setForm(p => ({ ...p, potentialTier: Number(e.target.value) }))}>
              <option value={2}>Tier 2 (Full Service)</option>
              <option value={1}>Tier 1 (Essential)</option>
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Status</label>
            <select className="input-dark" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {PROSPECT_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Referred By</label>
            <input className="input-dark" value={form.referredBy || ''} onChange={e => setForm(p => ({ ...p, referredBy: e.target.value }))} placeholder="Optional" />
          </div>
        </div>
        <div>
          <label className="label-xs block mb-1.5">Notes</label>
          <textarea className="input-dark" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-gold flex-1">Add Prospect</button>
        </div>
      </form>
    </Modal>
  )
}

export default function Outreach() {
  const { outreach, prospects, updateProspect } = useApp()
  const [editContact, setEditContact] = useState(null)
  const [showAddProspect, setShowAddProspect] = useState(false)
  const [typeFilter, setTypeFilter] = useState('All')

  const filteredOutreach = typeFilter === 'All' ? outreach : outreach.filter(o => o.type === typeFilter)

  const prospectColumns = PROSPECT_STATUSES.map(status => ({
    status,
    items: prospects.filter(p => p.status === status),
  }))

  const colBorderColor = {
    'Contacted':         '#B8966A',
    'Meeting Scheduled': '#D4B483',
    'Proposal Sent':     '#8AB8D4',
    'Client (Won)':      '#8AB89A',
    'Not Interested':    '#9A8E82',
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ── Section 1: Referral Partners ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-avara-cream">Referral Partners</h2>
          <div className="flex gap-2">
            {['All', 'Realtor', 'Builder'].map(f => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: typeFilter === f ? '#B8966A' : '#2A2520',
                  color: typeFilter === f ? '#1A1612' : '#9A8E82',
                  border: typeFilter === f ? 'none' : '1px solid #3A3028',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Last Contact</th>
                  <th>Next Follow-up</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOutreach.map(contact => {
                  const pri = PRIORITY_COLORS[contact.priority] || PRIORITY_COLORS.Cold
                  const st = statusBadgeStyle(contact.status)
                  return (
                    <tr key={contact.id}>
                      <td>
                        <div>
                          <p className="font-semibold text-avara-cream">{contact.name}</p>
                          <div className="flex gap-3 mt-0.5 text-[11px] text-avara-muted">
                            {contact.phone && <span>{contact.phone}</span>}
                            {contact.email && <span>{contact.email}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="text-avara-muted">{contact.company}</td>
                      <td>
                        <span className="text-xs font-medium text-avara-cream">{contact.type}</span>
                      </td>
                      <td>
                        <span className="badge-status" style={{ color: pri.color, borderColor: pri.border, background: pri.bg }}>
                          {contact.priority}
                        </span>
                      </td>
                      <td className="text-avara-muted">{formatDate(contact.lastContact)}</td>
                      <td className="text-avara-muted">{formatDate(contact.nextFollowup)}</td>
                      <td>
                        <span className="badge-status" style={{ color: st.color, borderColor: st.border, background: st.bg }}>
                          {contact.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => setEditContact(contact)}
                          className="btn-ghost text-xs py-1 px-2"
                        >
                          <Edit2 size={11} /> Edit
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 2: Prospect Pipeline ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-avara-cream">Prospect Pipeline</h2>
          <button onClick={() => setShowAddProspect(true)} className="btn-gold">
            <Plus size={15} /> Add Prospect
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {prospectColumns.map(({ status, items }) => (
            <div key={status} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-4 rounded-full" style={{ background: colBorderColor[status] }} />
                <p className="label-xs truncate" style={{ color: colBorderColor[status] }}>{status}</p>
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: '#3A3028', color: colBorderColor[status] }}
                >
                  {items.length}
                </span>
              </div>

              <div className="space-y-2 min-h-[80px]">
                {items.length === 0 && (
                  <div
                    className="flex items-center justify-center py-6 rounded-xl text-xs text-avara-muted border border-dashed"
                    style={{ borderColor: '#3A3028' }}
                  >
                    Empty
                  </div>
                )}
                {items.map(p => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl space-y-1.5"
                    style={{ background: '#3A3028', borderLeft: `2px solid ${colBorderColor[status]}` }}
                  >
                    <p className="text-sm font-semibold text-avara-cream leading-tight">{p.name}</p>
                    <p className="text-[11px] text-avara-muted">{p.source}</p>
                    <span className={`badge-tier${p.potentialTier}`}>T{p.potentialTier}</span>
                    {p.referredBy && <p className="text-[10px] text-avara-muted">via {p.referredBy}</p>}
                    {p.notes && <p className="text-[11px] text-avara-muted leading-relaxed line-clamp-2">{p.notes}</p>}
                    {/* Move buttons */}
                    <div className="flex gap-1 pt-1">
                      {PROSPECT_STATUSES.indexOf(status) > 0 && (
                        <button
                          onClick={() => updateProspect(p.id, { status: PROSPECT_STATUSES[PROSPECT_STATUSES.indexOf(status) - 1] })}
                          className="text-[10px] px-1.5 py-1 rounded text-avara-muted hover:text-avara-cream"
                          style={{ background: '#4A4038' }}
                        >
                          ←
                        </button>
                      )}
                      {PROSPECT_STATUSES.indexOf(status) < PROSPECT_STATUSES.length - 1 && (
                        <button
                          onClick={() => updateProspect(p.id, { status: PROSPECT_STATUSES[PROSPECT_STATUSES.indexOf(status) + 1] })}
                          className="text-[10px] px-1.5 py-1 rounded flex-1 font-medium transition-colors"
                          style={{ background: 'rgba(184,150,106,0.15)', color: '#B8966A' }}
                        >
                          Advance →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {editContact && (
        <EditContactModal contact={editContact} open={!!editContact} onClose={() => setEditContact(null)} />
      )}
      <AddProspectModal open={showAddProspect} onClose={() => setShowAddProspect(false)} />
    </div>
  )
}
