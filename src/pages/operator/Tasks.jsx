import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Plus, ChevronRight, ClipboardList, Calendar } from 'lucide-react'
import Modal from '../../components/Modal'
import { formatDate, statusBadgeStyle } from '../../utils/helpers'

const COLUMNS = ['New', 'In Progress', 'Awaiting Client', 'Completed']
const NEXT_STATUS = { New: 'In Progress', 'In Progress': 'Awaiting Client', 'Awaiting Client': 'Completed', Completed: null }
const PREV_STATUS = { Completed: 'Awaiting Client', 'Awaiting Client': 'In Progress', 'In Progress': 'New', New: null }

const CATEGORIES = ['Estate Management', 'Lifestyle & Acquisitions', 'Personal Shopping', 'Communications']
const PRIORITIES  = ['Low', 'Medium', 'High', 'Urgent']
const PRIORITY_DOT = { Urgent: '#D4726A', High: '#D4A26A', Medium: '#B8966A', Low: '#6A8AB8' }

function AddTaskModal({ open, onClose, clients }) {
  const { addTask } = useApp()
  const [form, setForm] = useState({ clientId: clients[0]?.id || '', title: '', category: 'Estate Management', priority: 'Medium', dueDate: '', notes: '', status: 'New' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const client = clients.find(c => c.id === form.clientId)
    addTask({ ...form, clientName: client?.name || '' })
    onClose()
    setForm({ clientId: clients[0]?.id || '', title: '', category: 'Estate Management', priority: 'Medium', dueDate: '', notes: '', status: 'New' })
  }

  return (
    <Modal open={open} onClose={onClose} title="New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-xs block mb-1.5">Client</label>
          <select required className="input-dark" value={form.clientId} onChange={e => setForm(p => ({ ...p, clientId: e.target.value }))}>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label-xs block mb-1.5">Task Title</label>
          <input required className="input-dark" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Describe the task…" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-xs block mb-1.5">Category</label>
            <select className="input-dark" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Priority</label>
            <select className="input-dark" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
              {PRIORITIES.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Due Date</label>
            <input type="date" className="input-dark" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Initial Status</label>
            <select className="input-dark" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {COLUMNS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label-xs block mb-1.5">Notes</label>
          <textarea className="input-dark" rows={3} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Task details, vendor info, instructions…" />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-gold flex-1">Create Task</button>
        </div>
      </form>
    </Modal>
  )
}

function TaskCard({ task, onMove }) {
  const today = new Date().toISOString().split('T')[0]
  const isOverdue = task.dueDate && task.dueDate < today && task.status !== 'Completed'
  const next = NEXT_STATUS[task.status]

  return (
    <div
      className="p-3 rounded-xl space-y-2 hover-card"
      style={{ background: '#3A3028', border: '1px solid #4A4038' }}
    >
      {/* Priority + Category */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PRIORITY_DOT[task.priority] || '#9A8E82' }} />
        <span className="text-[10px] uppercase tracking-widest text-avara-muted">{task.category}</span>
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-avara-cream leading-snug">{task.title}</p>

      {/* Client */}
      <p className="text-xs text-avara-muted">{task.clientName}</p>

      {/* Due date */}
      {task.dueDate && (
        <div className="flex items-center gap-1">
          <Calendar size={11} style={{ color: isOverdue ? '#D4726A' : '#9A8E82' }} />
          <span className="text-[11px]" style={{ color: isOverdue ? '#D4726A' : '#9A8E82' }}>
            {isOverdue ? 'Overdue — ' : ''}{formatDate(task.dueDate)}
          </span>
        </div>
      )}

      {/* Notes */}
      {task.notes && (
        <p className="text-[11px] text-avara-muted leading-relaxed line-clamp-2">{task.notes}</p>
      )}

      {/* Move button */}
      {next && (
        <button
          onClick={() => onMove(task.id, next)}
          className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 rounded-lg transition-colors mt-1"
          style={{ background: 'rgba(184,150,106,0.1)', color: '#B8966A' }}
        >
          Move to {next} <ChevronRight size={11} />
        </button>
      )}
    </div>
  )
}

export default function Tasks() {
  const { tasks, clients, moveTask } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [filterClient, setFilterClient] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const today = new Date().toISOString().split('T')[0]

  const filteredTasks = tasks.filter(t => {
    const matchClient = filterClient === 'All' || t.clientId === filterClient
    const matchPriority = filterPriority === 'All' || t.priority === filterPriority
    return matchClient && matchPriority
  })

  const getColumnTasks = (status) => {
    let col = filteredTasks.filter(t => t.status === status)
    if (status === 'Completed') col = col.filter(t => {
      const d = new Date() - new Date(t.completedAt)
      return d < 7 * 86400000
    })
    return col
  }

  const colStyle = {
    'New':             { header: '#9A8E82', bar: '#4A4038' },
    'In Progress':     { header: '#D4B483', bar: '#B8966A' },
    'Awaiting Client': { header: '#8AB8D4', bar: '#5A8AB8' },
    'Completed':       { header: '#8AB89A', bar: '#5A8A6A' },
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            className="input-dark py-2 text-xs w-auto"
            value={filterClient}
            onChange={e => setFilterClient(e.target.value)}
          >
            <option value="All">All Clients</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select
            className="input-dark py-2 text-xs w-auto"
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priorities</option>
            {PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        <button onClick={() => setShowAdd(true)} className="btn-gold">
          <Plus size={15} /> Add Task
        </button>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colTasks = getColumnTasks(col)
          const style = colStyle[col]
          return (
            <div key={col} className="flex flex-col gap-3">
              {/* Column header */}
              <div className="flex items-center gap-2">
                <div className="h-1 w-4 rounded-full flex-shrink-0" style={{ background: style.bar }} />
                <p className="label-xs" style={{ color: style.header }}>{col}</p>
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: '#3A3028', color: style.header }}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[100px]">
                {colTasks.length === 0 && (
                  <div
                    className="flex items-center justify-center py-8 rounded-xl text-xs text-avara-muted border border-dashed"
                    style={{ borderColor: '#3A3028' }}
                  >
                    No tasks
                  </div>
                )}
                {colTasks.map(task => (
                  <TaskCard key={task.id} task={task} onMove={moveTask} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <AddTaskModal open={showAdd} onClose={() => setShowAdd(false)} clients={clients} />
    </div>
  )
}
