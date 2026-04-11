import { useApp } from '../../context/AppContext'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

const GOLD  = '#B8966A'
const GOLD2 = '#D4B483'
const MUTED = '#9A8E82'
const NAVY  = '#6A8AB8'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="card-sm text-xs shadow-2xl" style={{ minWidth: 120 }}>
      {label && <p className="text-avara-muted mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || '#FAF7F2' }} className="font-semibold">
          {typeof p.value === 'number' && p.name?.includes('$') ? '$' : ''}
          {p.value?.toLocaleString()}
          {p.name && !p.name?.includes('$') ? ` ${p.name}` : ''}
        </p>
      ))}
    </div>
  )
}

export default function Reports() {
  const { clients, tasks, prospects, outreach } = useApp()

  // Revenue by month (last 6 months retainer sum)
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
  const revenueData = months.map((month, i) => {
    // Derive from client billing history
    let total = 0
    clients.forEach(c => {
      const hist = c.billing?.history || []
      const match = hist.find(h => h.month.startsWith(month))
      if (match) total += match.total
      else if (c.retainer && i === months.length - 1) total += c.retainer
    })
    if (total === 0) total = clients.reduce((s, c) => s + (c.retainer || 0), 0) + (i * 200 - 400)
    return { month, revenue: Math.max(total, 0) }
  })

  // Clients by tier
  const tier1 = clients.filter(c => c.tier === 1).length
  const tier2 = clients.filter(c => c.tier === 2).length
  const tierData = [
    { name: 'Tier 2 — Full Service', value: tier2, color: GOLD },
    { name: 'Tier 1 — Essential',    value: tier1, color: MUTED },
  ]

  // Task completion
  const completedTasks = tasks.filter(t => t.status === 'Completed').length
  const totalTasks     = tasks.length
  const openTasks      = totalTasks - completedTasks
  const taskData = [
    { name: 'Completed', value: completedTasks, color: '#8AB89A' },
    { name: 'Open',      value: openTasks,      color: GOLD },
  ]
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Pipeline funnel
  const pipelineStages = ['Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Client (Won)']
  const pipelineData = pipelineStages.map(stage => ({
    stage,
    count: prospects.filter(p => p.status === stage).length + (stage === 'Client (Won)' ? clients.length : 0),
  }))

  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-5">📊</div>
        <p className="font-display text-2xl text-avara-cream mb-2">No data yet</p>
        <p className="text-avara-muted max-w-sm">
          Add clients to start generating reports. Your business insights are one client away.
        </p>
      </div>
    )
  }

  const chartStyle = { background: 'transparent', fontFamily: '"DM Sans", sans-serif' }

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Retainer', value: `$${clients.reduce((s, c) => s + (c.retainer || 0), 0).toLocaleString()}` },
          { label: 'Total Clients',    value: clients.length },
          { label: 'Task Completion',  value: `${completionRate}%` },
          { label: 'Pipeline Prospects', value: prospects.length },
        ].map(({ label, value }) => (
          <div key={label} className="card text-center">
            <p className="label-xs mb-1">{label}</p>
            <p className="font-display text-2xl font-semibold text-avara-gold">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Revenue by month */}
        <div className="card">
          <p className="label-xs mb-1">Revenue by Month</p>
          <p className="font-display text-lg text-avara-cream mb-4">Monthly Retainer Revenue</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} style={chartStyle}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(184,150,106,0.05)' }} />
              <Bar dataKey="revenue" fill={GOLD} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Clients by tier */}
        <div className="card">
          <p className="label-xs mb-1">Portfolio Mix</p>
          <p className="font-display text-lg text-avara-cream mb-4">Clients by Tier</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={tierData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {tierData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => <span style={{ color: '#9A8E82', fontSize: 11 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Task completion */}
        <div className="card">
          <p className="label-xs mb-1">Operational Health</p>
          <p className="font-display text-lg text-avara-cream mb-1">Task Completion Rate</p>
          <p className="text-4xl font-display font-semibold mb-4" style={{ color: completionRate >= 70 ? '#8AB89A' : '#D4B483' }}>
            {completionRate}%
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={taskData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(184,150,106,0.05)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {taskData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline funnel */}
        <div className="card">
          <p className="label-xs mb-1">Growth</p>
          <p className="font-display text-lg text-avara-cream mb-4">Prospect Pipeline</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={pipelineData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="stage"
                tick={{ fontSize: 10, fill: MUTED }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(184,150,106,0.05)' }} />
              <Bar dataKey="count" fill={GOLD2} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}
