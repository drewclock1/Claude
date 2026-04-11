import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Cpu,
  Wrench,
  ShoppingBag,
  X,
  Home,
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/properties',  icon: Building2,       label: 'Properties' },
  { to: '/smart-home',  icon: Cpu,             label: 'Smart Home' },
  { to: '/maintenance', icon: Wrench,          label: 'Maintenance' },
  { to: '/marketplace', icon: ShoppingBag,     label: 'Marketplace' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-30 w-64 bg-navy-900 text-white flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-navy-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-avara-500 rounded-xl flex items-center justify-center">
            <Home size={18} className="text-white" />
          </div>
          <div>
            <span className="font-display font-semibold text-lg leading-none block">Avara</span>
            <span className="text-xs text-navy-300 font-medium tracking-widest uppercase">Home</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-navy-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-avara-600 text-white shadow-lg shadow-avara-900/30'
                  : 'text-navy-300 hover:bg-navy-800 hover:text-white'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User profile */}
      <div className="px-4 py-4 border-t border-navy-700">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-navy-800 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-avara-500 flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
            AW
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Alex Walker</p>
            <p className="text-xs text-navy-400 truncate">alex@avara.home</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
