import { useState } from 'react'
import {
  Plus, Wrench, Zap, Droplets, Thermometer, Shield,
  Clock, CheckCircle2, AlertTriangle, Circle,
  Calendar, DollarSign, User, ChevronRight, X,
} from 'lucide-react'
import clsx from 'clsx'

const categoryIcons = {
  Plumbing:    Droplets,
  Electrical:  Zap,
  HVAC:        Thermometer,
  General:     Wrench,
  Security:    Shield,
}

const requests = [
  {
    id: 1,
    title: 'Leak under guest bathroom sink',
    category: 'Plumbing',
    property: '14 Willow Lane',
    status: 'urgent',
    priority: 'high',
    date: '2026-04-11',
    cost: null,
    assignedTo: 'Unassigned',
    description: 'Slow drip observed under the vanity cabinet. Floor mat is damp. Needs immediate attention.',
  },
  {
    id: 2,
    title: 'HVAC annual maintenance',
    category: 'HVAC',
    property: '14 Willow Lane',
    status: 'scheduled',
    priority: 'medium',
    date: '2026-04-15',
    cost: 180,
    assignedTo: 'CoolAir Services',
    description: 'Annual tune-up for both AC units. Filter replacement included.',
  },
  {
    id: 3,
    title: 'Replace exterior light fixture',
    category: 'Electrical',
    property: '88 Oakwood Ave',
    status: 'in-progress',
    priority: 'low',
    date: '2026-04-09',
    cost: 90,
    assignedTo: 'Bright Sparks LLC',
    description: 'Front porch light stopped working. Fixture is old, full replacement needed.',
  },
  {
    id: 4,
    title: 'Repaint living room',
    category: 'General',
    property: '14 Willow Lane',
    status: 'completed',
    priority: 'low',
    date: '2026-04-02',
    cost: 620,
    assignedTo: 'Pro Paint Co.',
    description: 'Full repaint of living room and hallway in Sherwin Williams "Accessible Beige".',
  },
  {
    id: 5,
    title: 'Smart lock battery replacement',
    category: 'Security',
    property: 'Lakeview Condo #302',
    status: 'completed',
    priority: 'medium',
    date: '2026-03-28',
    cost: 15,
    assignedTo: 'Self',
    description: 'Front door smart lock low battery warning. Replaced with Energizer Ultimate Lithium.',
  },
]

const statusConfig = {
  'urgent':      { label: 'Urgent',      cls: 'bg-red-100 text-red-700',     icon: AlertTriangle },
  'scheduled':   { label: 'Scheduled',   cls: 'bg-sky-100 text-sky-700',     icon: Calendar },
  'in-progress': { label: 'In Progress', cls: 'bg-amber-100 text-amber-700', icon: Clock },
  'completed':   { label: 'Completed',   cls: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  'open':        { label: 'Open',        cls: 'bg-stone-100 text-stone-600',  icon: Circle },
}

const priorityDot = {
  high:   'bg-red-500',
  medium: 'bg-amber-500',
  low:    'bg-emerald-500',
}

function RequestRow({ req, onClick }) {
  const status = statusConfig[req.status]
  const Icon = categoryIcons[req.category] ?? Wrench
  const StatusIcon = status.icon

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer border border-transparent hover:border-stone-100"
      onClick={() => onClick(req)}
    >
      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 flex-shrink-0">
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', priorityDot[req.priority])} />
          <p className="text-sm font-medium text-stone-900 truncate">{req.title}</p>
        </div>
        <p className="text-xs text-stone-400">{req.property} · {req.category}</p>
      </div>

      <div className="hidden sm:flex flex-col items-end gap-1">
        <span className={clsx('badge', status.cls)}>
          <StatusIcon size={11} />
          {status.label}
        </span>
        <span className="text-xs text-stone-400">{req.date}</span>
      </div>

      <div className="flex items-center gap-2">
        {req.cost !== null && (
          <span className="hidden md:block text-sm font-medium text-stone-600">${req.cost}</span>
        )}
        <ChevronRight size={16} className="text-stone-300" />
      </div>
    </div>
  )
}

function DetailModal({ req, onClose }) {
  if (!req) return null
  const status = statusConfig[req.status]
  const Icon = categoryIcons[req.category] ?? Wrench
  const StatusIcon = status.icon

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
              <Icon size={22} />
            </div>
            <div>
              <span className={clsx('badge mb-1', status.cls)}>
                <StatusIcon size={11} />
                {status.label}
              </span>
              <h3 className="font-display font-semibold text-stone-900 text-base leading-tight">{req.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed">{req.description}</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Calendar,    label: 'Date',     value: req.date },
            { icon: User,        label: 'Assigned',  value: req.assignedTo },
            { icon: DollarSign,  label: 'Cost',      value: req.cost !== null ? `$${req.cost}` : 'TBD' },
            { icon: Wrench,      label: 'Category',  value: req.category },
          ].map(({ icon: I, label, value }) => (
            <div key={label} className="bg-stone-50 rounded-xl px-3 py-3">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                <I size={11} /> {label}
              </div>
              <p className="text-sm font-medium text-stone-800">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-1">
          <button className="btn-secondary flex-1">Update Status</button>
          <button className="btn-primary flex-1">Contact Pro</button>
        </div>
      </div>
    </div>
  )
}

export default function Maintenance() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter)

  const counts = {
    urgent:      requests.filter(r => r.status === 'urgent').length,
    inProgress:  requests.filter(r => r.status === 'in-progress').length,
    scheduled:   requests.filter(r => r.status === 'scheduled').length,
    completed:   requests.filter(r => r.status === 'completed').length,
  }

  const totalSpend = requests
    .filter(r => r.cost !== null)
    .reduce((s, r) => s + r.cost, 0)

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-xl font-display font-semibold text-red-600">{counts.urgent}</p>
          <p className="text-xs text-stone-400 mt-0.5">Urgent</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-display font-semibold text-amber-600">{counts.inProgress}</p>
          <p className="text-xs text-stone-400 mt-0.5">In Progress</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-display font-semibold text-sky-600">{counts.scheduled}</p>
          <p className="text-xs text-stone-400 mt-0.5">Scheduled</p>
        </div>
        <div className="card text-center">
          <p className="text-xl font-display font-semibold text-stone-700">${totalSpend}</p>
          <p className="text-xs text-stone-400 mt-0.5">YTD Spend</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl p-1 flex-wrap">
          {[
            { key: 'all',         label: 'All' },
            { key: 'urgent',      label: 'Urgent' },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'scheduled',   label: 'Scheduled' },
            { key: 'completed',   label: 'Completed' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filter === key
                  ? 'bg-avara-600 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          New Request
        </button>
      </div>

      {/* List */}
      <div className="card divide-y divide-stone-50 p-2">
        {filtered.length === 0 && (
          <p className="text-center py-10 text-stone-400 text-sm">No requests found.</p>
        )}
        {filtered.map(req => (
          <RequestRow key={req.id} req={req} onClick={setSelected} />
        ))}
      </div>

      {selected && <DetailModal req={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
