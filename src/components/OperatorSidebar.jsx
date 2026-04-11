import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Building2, ClipboardList,
  Radio, Wrench, BarChart3, X,
} from 'lucide-react'

const nav = [
  { to: '/operator/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/operator/clients',     icon: Users,           label: 'Clients' },
  { to: '/operator/properties',  icon: Building2,       label: 'Properties' },
  { to: '/operator/tasks',       icon: ClipboardList,   label: 'Tasks & Requests' },
  { to: '/operator/outreach',    icon: Radio,           label: 'Outreach' },
  { to: '/operator/vendors',     icon: Wrench,          label: 'Vendors' },
  { to: '/operator/reports',     icon: BarChart3,       label: 'Reports' },
]

export default function OperatorSidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-[60px] left-0 bottom-0 z-50 w-56 flex flex-col
          transition-transform duration-200
          lg:static lg:translate-x-0 lg:flex lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: '#1E1A16', borderRight: '1px solid #3A3028' }}
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between px-4 py-3 lg:hidden border-b border-avara-border">
          <span className="label-xs">Navigation</span>
          <button onClick={onClose} className="text-avara-muted hover:text-avara-cream">
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="label-xs px-3 pb-3 pt-1">OPERATIONS</p>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={16} className="flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom brand mark */}
        <div className="px-5 py-4 border-t border-avara-border">
          <p className="text-[10px] text-avara-muted tracking-widest uppercase font-semibold">
            Avara Home OS
          </p>
          <p className="text-[10px] text-avara-muted/60 mt-0.5">v1.0 · Owner Dashboard</p>
        </div>
      </aside>
    </>
  )
}
