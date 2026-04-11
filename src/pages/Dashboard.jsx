import {
  TrendingUp,
  TrendingDown,
  Home,
  Wrench,
  Zap,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  ArrowRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Link } from 'react-router-dom'

const valueData = [
  { month: 'Oct', value: 820 },
  { month: 'Nov', value: 835 },
  { month: 'Dec', value: 828 },
  { month: 'Jan', value: 845 },
  { month: 'Feb', value: 860 },
  { month: 'Mar', value: 872 },
  { month: 'Apr', value: 891 },
]

const energyData = [
  { day: 'Mon', kwh: 18 },
  { day: 'Tue', kwh: 22 },
  { day: 'Wed', kwh: 15 },
  { day: 'Thu', kwh: 19 },
  { day: 'Fri', kwh: 25 },
  { day: 'Sat', kwh: 30 },
  { day: 'Sun', kwh: 28 },
]

const recentActivity = [
  { icon: CheckCircle2, color: 'text-emerald-500', label: 'HVAC filter replaced', time: '2 hours ago' },
  { icon: AlertCircle,  color: 'text-amber-500',   label: 'Leak detected — Guest bath', time: '5 hours ago' },
  { icon: CheckCircle2, color: 'text-emerald-500', label: 'Security system armed', time: 'Yesterday' },
  { icon: Clock,        color: 'text-sky-500',     label: 'Lawn care scheduled', time: 'Yesterday' },
  { icon: CheckCircle2, color: 'text-emerald-500', label: 'Mortgage payment processed', time: '2 days ago' },
]

const weatherMetrics = [
  { icon: Thermometer, label: 'Indoor', value: '71°F', sub: 'Set to 72°F' },
  { icon: Droplets,    label: 'Humidity', value: '48%', sub: 'Optimal' },
  { icon: Wind,        label: 'Outdoor', value: '58°F', sub: 'Partly cloudy' },
]

function StatCard({ label, value, delta, positive, icon: Icon, color }) {
  return (
    <div className="card flex items-start justify-between">
      <div>
        <p className="text-sm text-stone-500 font-medium mb-1">{label}</p>
        <p className="text-2xl font-display font-semibold text-stone-900">{value}</p>
        {delta && (
          <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {delta}
          </p>
        )}
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '' }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-stone-100 rounded-xl shadow-lg px-4 py-3 text-sm">
        <p className="text-stone-500 mb-1">{label}</p>
        <p className="font-semibold text-stone-900">{prefix}{payload[0].value}{suffix}</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Portfolio Value"
          value="$891K"
          delta="+2.2% this month"
          positive
          icon={DollarSign}
          color="bg-avara-600"
        />
        <StatCard
          label="Properties"
          value="3"
          delta="1 listed for rent"
          positive
          icon={Home}
          color="bg-navy-600"
        />
        <StatCard
          label="Open Requests"
          value="2"
          delta="1 urgent"
          positive={false}
          icon={Wrench}
          color="bg-amber-500"
        />
        <StatCard
          label="Energy Today"
          value="28 kWh"
          delta="+12% vs avg"
          positive={false}
          icon={Zap}
          color="bg-sky-500"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Portfolio value chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-stone-900">Portfolio Value</h2>
              <p className="text-sm text-stone-400 mt-0.5">Last 7 months · USD thousands</p>
            </div>
            <Link to="/properties" className="text-sm text-avara-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={valueData}>
              <defs>
                <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#755c3f" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#755c3f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f3ef" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#a8a29e' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
              <Tooltip content={<CustomTooltip prefix="$" suffix="K" />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#755c3f"
                strokeWidth={2.5}
                fill="url(#valueGrad)"
                dot={false}
                activeDot={{ r: 5, fill: '#755c3f', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Climate quick-view */}
        <div className="card flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-stone-900">Climate</h2>
            <Link to="/smart-home" className="text-sm text-avara-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Control <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-3">
            {weatherMetrics.map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex items-center gap-4 p-3 rounded-xl bg-stone-50">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-avara-600">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-400 font-medium">{label}</p>
                  <p className="text-base font-semibold text-stone-900 leading-tight">{value}</p>
                </div>
                <span className="text-xs text-stone-400">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Energy chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-stone-900">Energy Usage</h2>
              <p className="text-sm text-stone-400 mt-0.5">This week · kWh</p>
            </div>
            <Link to="/smart-home" className="text-sm text-avara-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Details <ArrowRight size={14} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f3ef" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip suffix=" kWh" />} />
              <Area
                type="monotone"
                dataKey="kwh"
                stroke="#0ea5e9"
                strokeWidth={2.5}
                fill="url(#energyGrad)"
                dot={false}
                activeDot={{ r: 5, fill: '#0ea5e9', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent activity */}
        <div className="card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-stone-900">Recent Activity</h2>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto">
            {recentActivity.map(({ icon: Icon, color, label, time }, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-stone-50 last:border-0">
                <Icon size={16} className={`${color} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-700 font-medium leading-snug">{label}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
