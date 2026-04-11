import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Plus, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react'
import { formatDate, statusBadgeStyle } from '../../utils/helpers'
import Modal from '../../components/Modal'

const CATEGORIES = [
  'Estate Management',
  'Lifestyle & Acquisitions',
  'Personal Shopping',
  'Communications',
]

function NewRequestModal({ open, onClose, client }) {
  const { addTask } = useApp()
  const [form, setForm] = useState({
    title: '',
    category: 'Estate Management',
    description: '',
    priority: 'Medium',
    dueDate: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask({
      title: form.title,
      category: form.category,
      notes: form.description,
      priority: form.priority === 'Urgent' ? 'Urgent' : 'Medium',
      dueDate: form.dueDate,
      status: 'New',
      clientId: client.id,
      clientName: client.name,
    })
    onClose()
    setForm({ title: '', category: 'Estate Management', description: '', priority: 'Medium', dueDate: '' })
  }

  return (
    <Modal open={open} onClose={onClose} title="New Request">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-xs block mb-1.5">Request Title</label>
          <input
            required
            className="input-dark"
            value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Briefly describe your request"
          />
        </div>

        <div>
          <label className="label-xs block mb-1.5">Category</label>
          <select
            className="input-dark"
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="label-xs block mb-1.5">Description</label>
          <textarea
            className="input-dark"
            rows={4}
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Add any details, preferences, or instructions…"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-xs block mb-1.5">Priority</label>
            <div className="flex gap-2">
              {['Standard', 'Urgent'].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, priority: p }))}
                  className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: form.priority === p ? (p === 'Urgent' ? '#D4726A' : '#B8966A') : '#3A3028',
                    color: form.priority === p ? '#1A1612' : '#9A8E82',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Preferred Completion</label>
            <input
              type="date"
              className="input-dark"
              value={form.dueDate}
              onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-gold flex-1">Submit Request</button>
        </div>
      </form>
    </Modal>
  )
}

function RequestCard({ task }) {
  const [expanded, setExpanded] = useState(false)
  const st = statusBadgeStyle(task.status)

  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ background: '#2A2520', border: '1px solid #3A3028' }}
      onClick={() => setExpanded(o => !o)}
    >
      <div className="flex items-center gap-3 p-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(184,150,106,0.1)', color: '#B8966A' }}
        >
          <ClipboardList size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-avara-cream truncate">{task.title}</p>
          <p className="text-xs text-avara-muted mt-0.5">{task.category} · {formatDate(task.createdAt)}</p>
        </div>
        <span
          className="badge-status flex-shrink-0"
          style={{ color: st.color, borderColor: st.border, background: st.bg }}
        >
          {task.status}
        </span>
        {expanded
          ? <ChevronUp size={14} className="text-avara-muted flex-shrink-0" />
          : <ChevronDown size={14} className="text-avara-muted flex-shrink-0" />}
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-avara-border pt-3 space-y-2">
          {task.notes && (
            <p className="text-sm text-avara-muted leading-relaxed">{task.notes}</p>
          )}
          {task.dueDate && (
            <p className="text-xs text-avara-muted">Requested by: {formatDate(task.dueDate)}</p>
          )}
          {task.status === 'Completed' && task.completedAt && (
            <p className="text-xs" style={{ color: '#8AB89A' }}>Completed: {formatDate(task.completedAt)}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function ClientRequests() {
  const { activeClient, tasks } = useApp()
  const [showNew, setShowNew] = useState(false)
  const [filter, setFilter] = useState('All')

  if (!activeClient) return null

  const clientTasks = tasks.filter(t => t.clientId === activeClient.id)
  const filtered = filter === 'All' ? clientTasks : clientTasks.filter(t => t.status === filter)
  const open = clientTasks.filter(t => t.status !== 'Completed').length

  return (
    <div className="space-y-5 max-w-2xl mx-auto pb-24 lg:pb-8">

      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="font-display text-2xl font-semibold text-avara-cream">My Requests</h1>
          {open > 0 && <p className="text-xs text-avara-muted mt-0.5">{open} active request{open !== 1 ? 's' : ''}</p>}
        </div>
        <button onClick={() => setShowNew(true)} className="btn-gold">
          <Plus size={15} /> New Request
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'New', 'In Progress', 'Awaiting Client', 'Completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors"
            style={{
              background: filter === f ? '#B8966A' : '#2A2520',
              color: filter === f ? '#1A1612' : '#9A8E82',
              border: filter === f ? 'none' : '1px solid #3A3028',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Requests list */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center py-14 text-center">
          <ClipboardList size={36} className="mb-3" style={{ color: '#B8966A', opacity: 0.3 }} />
          <p className="font-display text-xl text-avara-cream mb-1">No requests here</p>
          <p className="text-avara-muted text-sm mb-5">
            Your first {filter === 'All' ? '' : filter.toLowerCase() + ' '}request is one tap away.
          </p>
          <button onClick={() => setShowNew(true)} className="btn-gold">Make a Request</button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(task => (
            <RequestCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <NewRequestModal open={showNew} onClose={() => setShowNew(false)} client={activeClient} />
    </div>
  )
}
