import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  Users, DollarSign, ClipboardList, CalendarDays,
  CheckCircle2, AlertCircle, ChevronRight, TrendingUp,
} from 'lucide-react'
import { formatDate, daysUntil, currency, activityIcon } from '../../utils/helpers'

function MetricCard({ icon: Icon, label, value, sub, subColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card hover-card text-left w-full group transition-all"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(184,150,106,0.12)', color: '#B8966A' }}
        >
          <Icon size={17} />
        </div>
        {onClick && (
          <ChevronRight size={14} className="text-avara-muted opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
        )}
      </div>
      <p className="label-xs mb-1">{label}</p>
      <p className="font-display text-2xl font-semibold text-avara-cream">{value}</p>
      {sub && (
        <p className="text-xs mt-1" style={{ color: subColor || '#9A8E82' }}>{sub}</p>
      )}
    </button>
  )
}

export default function Dashboard() {
  const { clients, tasks, activity, openTasks, moveTask, logVisit } = useApp()
  const navigate = useNavigate()
  const [skeleton] = useState(false)

  // Metrics
  const activeClients = clients.filter(c => c.status === 'Active')
  const tier1 = activeClients.filter(c => c.tier === 1).length
  const tier2 = activeClients.filter(c => c.tier === 2).length
  const mrr = activeClients.reduce((s, c) => s + (c.retainer || 0), 0)

  const today = new Date().toISOString().split('T')[0]
  const overdueTasks = openTasks.filter(t => t.dueDate && t.dueDate < today)
  const todayTasks = openTasks.filter(t => t.dueDate === today)
  const focusTasks = [...overdueTasks, ...todayTasks].sort((a, b) => {
    const pri = { Urgent: 0, High: 1, Medium: 2, Low: 3 }
    return (pri[a.priority] ?? 4) - (pri[b.priority] ?? 4)
  })

  const upcomingArrivals = clients
    .filter(c => {
      const d = daysUntil(c.nextVisit)
      return d !== null && d >= 0 && d <= 14
    })
    .sort((a, b) => new Date(a.nextVisit) - new Date(b.nextVisit))

  const next7Arrivals = clients.filter(c => {
    const d = daysUntil(c.nextVisit)
    return d !== null && d >= 0 && d <= 7
  }).length

  const priorityDot = { Urgent: '#D4726A', High: '#D4A26A', Medium: '#B8966A', Low: '#6A8AB8' }
  const priorityLabel = { Urgent: '#D4726A', High: '#D4A26A', Medium: '#B8966A', Low: '#9A8E82' }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Users}
          label="Active Clients"
          value={activeClients.length}
          sub={`${tier2} Tier 2 · ${tier1} Tier 1`}
          onClick={() => navigate('/operator/clients')}
        />
        <MetricCard
          icon={DollarSign}
          label="Monthly Retainer"
          value={currency(mrr)}
          sub="MRR across all clients"
          subColor="#8AB89A"
        />
        <MetricCard
          icon={ClipboardList}
          label="Open Tasks"
          value={openTasks.length}
          sub={overdueTasks.length > 0 ? `${overdueTasks.length} overdue` : 'All on track'}
          subColor={overdueTasks.length > 0 ? '#D4726A' : '#8AB89A'}
          onClick={() => navigate('/operator/tasks')}
        />
        <MetricCard
          icon={CalendarDays}
          label="Upcoming Arrivals"
          value={next7Arrivals}
          sub="Arriving in next 7 days"
          onClick={() => navigate('/operator/clients')}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Today's Focus */}
        <div className="card flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-avara-cream">Today's Focus</h2>
            <button
              onClick={() => navigate('/operator/tasks')}
              className="text-xs text-avara-gold hover:text-avara-gold-light flex items-center gap-1 transition-colors"
            >
              All tasks <ChevronRight size={12} />
            </button>
          </div>

          {focusTasks.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle2 size={32} className="mb-3" style={{ color: '#8AB89A' }} />
              <p className="text-avara-cream font-medium">All clear for today</p>
              <p className="text-avara-muted text-sm mt-1">No tasks due or overdue.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {focusTasks.slice(0, 6).map(task => {
                const isOverdue = task.dueDate < today
                return (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-xl group"
                    style={{ background: '#3A3028' }}
                  >
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: priorityDot[task.priority] || '#9A8E82' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-avara-cream leading-snug truncate">{task.title}</p>
                      <p className="text-xs text-avara-muted mt-0.5">{task.clientName}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="text-[10px] font-semibold"
                        style={{ color: isOverdue ? '#D4726A' : '#9A8E82' }}
                      >
                        {isOverdue ? 'OVERDUE' : 'TODAY'}
                      </span>
                      <button
                        onClick={() => moveTask(task.id, 'Completed')}
                        className="w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-avara-cream"
                        style={{ background: 'rgba(138,184,154,0.15)', color: '#8AB89A' }}
                        title="Mark done"
                      >
                        <CheckCircle2 size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Upcoming Arrivals */}
        <div className="card flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-avara-cream">Upcoming Arrivals</h2>
            <span className="text-xs text-avara-muted">Next 14 days</span>
          </div>

          {upcomingArrivals.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CalendarDays size={32} className="mb-3 text-avara-muted" />
              <p className="text-avara-cream font-medium">No arrivals scheduled</p>
              <p className="text-avara-muted text-sm mt-1">No clients arriving in the next 14 days.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingArrivals.map(client => {
                const days = daysUntil(client.nextVisit)
                return (
                  <div
                    key={client.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: '#3A3028' }}
                  >
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: '#B8966A', color: '#1A1612' }}
                    >
                      {client.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-avara-cream">{client.name}</p>
                        <span className={`badge-tier${client.tier}`}>T{client.tier}</span>
                      </div>
                      <p className="text-xs text-avara-muted mt-0.5 truncate">{client.address}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold" style={{ color: days <= 3 ? '#D4B483' : '#FAF7F2' }}>
                        {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days}d`}
                      </p>
                      <p className="text-[10px] text-avara-muted">{formatDate(client.nextVisit)}</p>
                    </div>

                    <button
                      onClick={() => navigate(`/operator/clients/${client.id}`)}
                      className="btn-outline text-xs px-2 py-1 flex-shrink-0"
                    >
                      Prep
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-avara-cream">Recent Activity</h2>
          <TrendingUp size={16} className="text-avara-muted" />
        </div>
        <div className="divide-y" style={{ borderColor: '#3A3028' }}>
          {activity.slice(0, 10).map((item, i) => (
            <div key={item.id || i} className="flex items-start gap-3 py-3">
              <span className="text-base flex-shrink-0 mt-0.5">{activityIcon(item.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-avara-cream">{item.content}</p>
                {item.clientName && (
                  <p className="text-xs text-avara-muted mt-0.5">{item.clientName}</p>
                )}
              </div>
              <p className="text-[10px] text-avara-muted flex-shrink-0">
                {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
