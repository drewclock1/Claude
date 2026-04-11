import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  ArrowLeft, Phone, Mail, MapPin, Calendar, Plus,
  Edit2, Save, CheckCircle2, Home, Wrench,
  MessageCircle, DollarSign, FileText, Star,
} from 'lucide-react'
import Modal from '../../components/Modal'
import {
  formatDate, currency, daysSince, daysUntil,
  noteTypeIcon, statusBadgeStyle, uuid,
} from '../../utils/helpers'

const TABS = ['Preferences', 'Property', 'Requests', 'Notes', 'Billing']

// ─── Preference Tab ───────────────────────────────────────────────
function PrefSection({ title, fields, data, onSave }) {
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState({ ...data })

  const handleSave = () => { onSave(local); setEditing(false) }

  return (
    <div className="card-sm mb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="label-xs">{title}</p>
        {editing ? (
          <button onClick={handleSave} className="btn-gold text-xs py-1 px-2"><Save size={12} />Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="btn-ghost text-xs py-1 px-2"><Edit2 size={12} />Edit</button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <p className="text-[10px] text-avara-muted uppercase tracking-widest mb-1">{label}</p>
            {editing ? (
              <input
                className="input-dark text-sm py-1.5"
                value={local[key] || ''}
                onChange={e => setLocal(p => ({ ...p, [key]: e.target.value }))}
              />
            ) : (
              <p className="text-sm text-avara-cream">{data[key] || <span className="text-avara-muted italic">Not set</span>}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Requests Tab ────────────────────────────────────────────────
function AddTaskModal({ open, onClose, client }) {
  const { addTask } = useApp()
  const [form, setForm] = useState({ title: '', category: 'Estate Management', priority: 'Medium', dueDate: '', notes: '', status: 'New' })
  const handleSubmit = (e) => {
    e.preventDefault()
    addTask({ ...form, clientId: client.id, clientName: client.name })
    onClose()
    setForm({ title: '', category: 'Estate Management', priority: 'Medium', dueDate: '', notes: '', status: 'New' })
  }
  return (
    <Modal open={open} onClose={onClose} title="New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-xs block mb-1.5">Title</label>
          <input required className="input-dark" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Task title" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-xs block mb-1.5">Category</label>
            <select className="input-dark" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
              {['Estate Management', 'Lifestyle & Acquisitions', 'Personal Shopping', 'Communications'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Priority</label>
            <select className="input-dark" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
              {['Low', 'Medium', 'High', 'Urgent'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Due Date</label>
            <input type="date" className="input-dark" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Status</label>
            <select className="input-dark" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {['New', 'In Progress', 'Awaiting Client', 'Completed'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label-xs block mb-1.5">Notes</label>
          <textarea className="input-dark" rows={3} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Task details…" />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-gold flex-1">Create Task</button>
        </div>
      </form>
    </Modal>
  )
}

export default function ClientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { clients, tasks, updateClientPreferences, addClientNote, updateTask, moveTask, logVisit } = useApp()

  const client = clients.find(c => c.id === id)
  const [tab, setTab] = useState(0)
  const [showAddTask, setShowAddTask] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteType, setNoteType] = useState('note')
  const [taskFilter, setTaskFilter] = useState('All')

  if (!client) return (
    <div className="flex flex-col items-center justify-center py-24">
      <p className="font-display text-2xl text-avara-cream mb-2">Client not found</p>
      <button onClick={() => navigate('/operator/clients')} className="btn-outline mt-4"><ArrowLeft size={14} />Back to Clients</button>
    </div>
  )

  const clientTasks = tasks.filter(t => t.clientId === client.id)
  const filteredTasks = taskFilter === 'All' ? clientTasks : clientTasks.filter(t => t.status === taskFilter)

  const priorityDot = { Urgent: '#D4726A', High: '#D4A26A', Medium: '#B8966A', Low: '#6A8AB8' }

  const handleSavePref = (section, updates) => updateClientPreferences(client.id, section, updates)

  const handleAddNote = () => {
    if (!noteText.trim()) return
    addClientNote(client.id, { type: noteType, content: noteText })
    setNoteText('')
  }

  const totalThisMonth = (client.billing?.alaCarte || []).reduce((s, i) => s + Number(i.amount || 0), 0)

  return (
    <div className="max-w-5xl mx-auto space-y-5">

      {/* Back */}
      <button onClick={() => navigate('/operator/clients')} className="flex items-center gap-2 text-sm text-avara-muted hover:text-avara-cream transition-colors">
        <ArrowLeft size={14} /> Clients
      </button>

      {/* Header Card */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: '#B8966A', color: '#1A1612' }}
          >
            {client.initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="font-display text-2xl font-semibold text-avara-cream">{client.name}</h1>
              <span className={`badge-tier${client.tier}`}>Tier {client.tier}</span>
              <span className="badge-status" style={{ color: '#8AB89A', borderColor: 'rgba(138,184,154,0.4)', background: 'rgba(138,184,154,0.08)' }}>
                {client.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 mt-3 text-sm">
              <div>
                <p className="label-xs mb-0.5">Retainer</p>
                <p className="text-avara-gold font-semibold">{currency(client.retainer)}/mo</p>
              </div>
              <div>
                <p className="label-xs mb-0.5">Client Since</p>
                <p className="text-avara-cream">{formatDate(client.since)}</p>
              </div>
              <div>
                <p className="label-xs mb-0.5">Next Visit</p>
                <p className="text-avara-cream">{formatDate(client.nextVisit)}</p>
              </div>
              <div>
                <p className="label-xs mb-0.5">Last Visit</p>
                <p className="text-avara-cream">{formatDate(client.lastVisit)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm text-avara-muted">
              {client.address && <span className="flex items-center gap-1"><MapPin size={12} />{client.address}</span>}
              {client.phone && <a href={`tel:${client.phone}`} className="flex items-center gap-1 hover:text-avara-cream transition-colors"><Phone size={12} />{client.phone}</a>}
              {client.email && <a href={`mailto:${client.email}`} className="flex items-center gap-1 hover:text-avara-cream transition-colors"><Mail size={12} />{client.email}</a>}
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => logVisit(client.id)} className="btn-outline text-xs py-1.5"><Home size={13} />Log Visit</button>
            <button onClick={() => { setTab(2); setShowAddTask(true) }} className="btn-ghost text-xs py-1.5"><Plus size={13} />Task</button>
            <button onClick={() => setTab(3)} className="btn-ghost text-xs py-1.5"><FileText size={13} />Note</button>
            <button onClick={() => setTab(0)} className="btn-gold text-xs py-1.5"><Star size={13} />Prefs</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0"
            style={{
              background: tab === i ? '#B8966A' : '#2A2520',
              color: tab === i ? '#1A1612' : '#9A8E82',
              border: tab === i ? 'none' : '1px solid #3A3028',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab 0: Preferences ── */}
      {tab === 0 && (
        <div className="space-y-1">
          <PrefSection title="Property" data={client.preferences?.property || {}} onSave={d => handleSavePref('property', d)} fields={[
            { key: 'arrivalTemp', label: 'Arrival Temp' },
            { key: 'poolTemp', label: 'Pool Temp' },
            { key: 'lighting', label: 'Lighting' },
            { key: 'guestRoomSetup', label: 'Guest Room Setup' },
            { key: 'alarmCode', label: 'Alarm Code' },
            { key: 'gateCode', label: 'Gate Code' },
            { key: 'parking', label: 'Parking' },
          ]} />
          <PrefSection title="Grocery & Provisions" data={client.preferences?.grocery || {}} onSave={d => handleSavePref('grocery', d)} fields={[
            { key: 'staples', label: 'Staples' },
            { key: 'dietary', label: 'Dietary Restrictions' },
            { key: 'brands', label: 'Preferred Brands' },
            { key: 'beverages', label: 'Beverages' },
            { key: 'wine', label: 'Wine' },
          ]} />
          <PrefSection title="Lifestyle" data={client.preferences?.lifestyle || {}} onSave={d => handleSavePref('lifestyle', d)} fields={[
            { key: 'restaurants', label: 'Restaurants' },
            { key: 'travelStyle', label: 'Travel Style' },
            { key: 'vehiclePreferences', label: 'Vehicle Preferences' },
            { key: 'activities', label: 'Activities' },
            { key: 'events', label: 'Events' },
          ]} />
          <PrefSection title="Communication" data={client.preferences?.communication || {}} onSave={d => handleSavePref('communication', d)} fields={[
            { key: 'preferredChannel', label: 'Preferred Channel' },
            { key: 'preferredTiming', label: 'Preferred Timing' },
            { key: 'detailLevel', label: 'Update Detail Level' },
          ]} />
          <PrefSection title="Important Dates" data={client.preferences?.importantDates || {}} onSave={d => handleSavePref('importantDates', d)} fields={[
            { key: 'birthday', label: 'Birthday' },
            { key: 'anniversary', label: 'Anniversary' },
            { key: 'regularArrival', label: 'Regular Arrival' },
            { key: 'special', label: 'Special Notes' },
          ]} />
        </div>
      )}

      {/* ── Tab 1: Property ── */}
      {tab === 1 && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="card grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Sq Footage', value: client.property?.sqft ? client.property.sqft.toLocaleString() + ' sqft' : '—' },
              { label: 'Bedrooms', value: client.property?.bedrooms || '—' },
              { label: 'Bathrooms', value: client.property?.bathrooms || '—' },
              { label: 'Year Built', value: client.property?.yearBuilt || '—' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="label-xs mb-1">{label}</p>
                <p className="font-display text-xl text-avara-cream">{value}</p>
              </div>
            ))}
          </div>

          {/* Systems */}
          <div className="card">
            <p className="label-xs mb-4">Systems Status</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(client.property?.systems || {}).map(([key, sys]) => (
                <div key={key} className="p-3 rounded-xl" style={{ background: '#3A3028' }}>
                  <p className="text-xs font-semibold text-avara-cream capitalize mb-1">{key}</p>
                  {sys.model && <p className="text-[11px] text-avara-muted">{sys.model}</p>}
                  {sys.equipment && <p className="text-[11px] text-avara-muted">{sys.equipment}</p>}
                  {sys.system && <p className="text-[11px] text-avara-muted">{sys.system}</p>}
                  {sys.vendor && <p className="text-[11px] text-avara-muted">{sys.vendor}</p>}
                  {sys.lastService && <p className="text-[11px] text-avara-muted">Last: {formatDate(sys.lastService)}</p>}
                  <span
                    className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: sys.status === 'Good' || sys.status === 'Active' ? 'rgba(138,184,154,0.12)' : 'rgba(212,180,131,0.12)',
                      color: sys.status === 'Good' || sys.status === 'Active' ? '#8AB89A' : '#D4B483',
                    }}
                  >
                    {sys.status || 'Unknown'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection History */}
          <div className="card">
            <p className="label-xs mb-4">Inspection History</p>
            <div className="space-y-2">
              {(client.property?.inspections || []).map(ins => (
                <div key={ins.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#3A3028' }}>
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: ins.issues === 0 ? '#8AB89A' : '#D4B483' }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-avara-cream">{formatDate(ins.date)}</p>
                      <span className="text-xs text-avara-muted">{ins.summary}</span>
                    </div>
                    {ins.notes && <p className="text-xs text-avara-muted mt-1">{ins.notes}</p>}
                  </div>
                  <span
                    className="text-xs font-semibold flex-shrink-0"
                    style={{ color: ins.issues === 0 ? '#8AB89A' : '#D4B483' }}
                  >
                    {ins.issues === 0 ? 'Clear' : `${ins.issues} noted`}
                  </span>
                </div>
              ))}
              {!(client.property?.inspections?.length) && (
                <p className="text-avara-muted text-sm text-center py-4">No inspection history.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Requests ── */}
      {tab === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 overflow-x-auto">
              {['All', 'New', 'In Progress', 'Awaiting Client', 'Completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setTaskFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors"
                  style={{
                    background: taskFilter === f ? '#B8966A' : '#2A2520',
                    color: taskFilter === f ? '#1A1612' : '#9A8E82',
                    border: taskFilter === f ? 'none' : '1px solid #3A3028',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <button onClick={() => setShowAddTask(true)} className="btn-gold text-xs flex-shrink-0"><Plus size={13} />Task</button>
          </div>

          <div className="space-y-2">
            {filteredTasks.length === 0 && (
              <div className="card text-center py-10">
                <CheckCircle2 size={28} className="mx-auto mb-2" style={{ color: '#8AB89A' }} />
                <p className="text-avara-muted text-sm">No tasks in this view.</p>
              </div>
            )}
            {filteredTasks.map(task => {
              const st = statusBadgeStyle(task.status)
              return (
                <div key={task.id} className="card-sm flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: priorityDot[task.priority] || '#9A8E82' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-avara-cream">{task.title}</p>
                      <span className="badge-status" style={{ color: st.color, borderColor: st.border, background: st.bg }}>{task.status}</span>
                    </div>
                    <p className="text-xs text-avara-muted">{task.category} · Due {formatDate(task.dueDate)}</p>
                    {task.notes && <p className="text-xs text-avara-muted mt-1">{task.notes}</p>}
                  </div>
                  {task.status !== 'Completed' && (
                    <button onClick={() => moveTask(task.id, 'Completed')} className="btn-ghost text-xs py-1 px-2 flex-shrink-0">
                      <CheckCircle2 size={12} /> Done
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          <AddTaskModal open={showAddTask} onClose={() => setShowAddTask(false)} client={client} />
        </div>
      )}

      {/* ── Tab 3: Notes ── */}
      {tab === 3 && (
        <div className="space-y-4">
          {/* Add note */}
          <div className="card">
            <p className="label-xs mb-3">Add Note</p>
            <div className="flex gap-2 mb-3">
              {['note', 'call', 'text', 'email', 'visit'].map(t => (
                <button
                  key={t}
                  onClick={() => setNoteType(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors"
                  style={{
                    background: noteType === t ? '#B8966A' : '#3A3028',
                    color: noteType === t ? '#1A1612' : '#9A8E82',
                  }}
                >
                  {noteTypeIcon(t)} {t}
                </button>
              ))}
            </div>
            <textarea
              className="input-dark mb-3"
              rows={3}
              placeholder="Add a note about this client…"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            />
            <button onClick={handleAddNote} className="btn-gold" disabled={!noteText.trim()}>
              <Save size={13} /> Save Note
            </button>
          </div>

          {/* Notes feed */}
          <div className="space-y-2">
            {(client.notes || []).length === 0 && (
              <div className="card text-center py-10">
                <FileText size={28} className="mx-auto mb-2 text-avara-muted" />
                <p className="text-avara-muted text-sm">No notes yet. Log your first interaction.</p>
              </div>
            )}
            {(client.notes || []).map(note => (
              <div key={note.id} className="card-sm flex gap-3">
                <span className="text-base flex-shrink-0 mt-0.5">{noteTypeIcon(note.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#B8966A' }}>{note.type}</p>
                    <p className="text-xs text-avara-muted">{formatDate(note.date)}</p>
                  </div>
                  <p className="text-sm text-avara-cream leading-relaxed">{note.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 4: Billing ── */}
      {tab === 4 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="card grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="label-xs mb-1">Monthly Retainer</p>
              <p className="font-display text-2xl text-avara-gold">{currency(client.retainer)}</p>
            </div>
            <div>
              <p className="label-xs mb-1">À La Carte (Apr)</p>
              <p className="font-display text-2xl text-avara-cream">{currency(totalThisMonth)}</p>
            </div>
            <div>
              <p className="label-xs mb-1">Total This Month</p>
              <p className="font-display text-2xl text-avara-cream">{currency((client.retainer || 0) + totalThisMonth)}</p>
            </div>
            <div>
              <p className="label-xs mb-1">Payment Status</p>
              <span
                className="badge-status mt-1"
                style={{
                  color: client.billing?.paymentStatus === 'Paid' ? '#8AB89A' : '#D4B483',
                  borderColor: client.billing?.paymentStatus === 'Paid' ? 'rgba(138,184,154,0.4)' : 'rgba(212,180,131,0.4)',
                  background: client.billing?.paymentStatus === 'Paid' ? 'rgba(138,184,154,0.08)' : 'rgba(212,180,131,0.08)',
                }}
              >
                {client.billing?.paymentStatus || 'Pending'}
              </span>
            </div>
          </div>

          {/* À La Carte items */}
          <div className="card">
            <p className="label-xs mb-3">À La Carte — April 2026</p>
            {(client.billing?.alaCarte || []).length === 0 ? (
              <p className="text-avara-muted text-sm">No additional charges this month.</p>
            ) : (
              <div className="space-y-2">
                {(client.billing?.alaCarte || []).map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-avara-border last:border-0">
                    <p className="text-sm text-avara-cream">{item.description}</p>
                    <p className="text-sm font-semibold text-avara-gold">{currency(item.amount)}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 font-semibold">
                  <p className="text-sm text-avara-cream">Total</p>
                  <p className="text-avara-gold">{currency((client.retainer || 0) + totalThisMonth)}</p>
                </div>
              </div>
            )}
          </div>

          {/* History */}
          <div className="card">
            <p className="label-xs mb-3">Billing History</p>
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Retainer</th>
                  <th>Extras</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(client.billing?.history || []).map((row, i) => (
                  <tr key={i}>
                    <td className="text-avara-cream">{row.month}</td>
                    <td>{currency(row.retainer)}</td>
                    <td>{currency(row.extras)}</td>
                    <td className="font-semibold text-avara-gold">{currency(row.total)}</td>
                    <td>
                      <span
                        className="badge-status"
                        style={row.status === 'Paid'
                          ? { color: '#8AB89A', borderColor: 'rgba(138,184,154,0.4)', background: 'rgba(138,184,154,0.08)' }
                          : { color: '#D4B483', borderColor: 'rgba(212,180,131,0.4)', background: 'rgba(212,180,131,0.08)' }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
