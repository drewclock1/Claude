import { NavLink } from 'react-router-dom'
import { Home, Building2, ClipboardList, Star, MessageCircle } from 'lucide-react'

const tabs = [
  { to: '/client/home',       icon: Home,            label: 'Home' },
  { to: '/client/property',   icon: Building2,       label: 'Property' },
  { to: '/client/requests',   icon: ClipboardList,   label: 'Requests' },
  { to: '/client/lifestyle',  icon: Star,            label: 'Lifestyle' },
  { to: '/client/messages',   icon: MessageCircle,   label: 'Messages' },
]

// Desktop sidebar
export function ClientSidebar() {
  return (
    <aside
      className="hidden lg:flex w-52 flex-col flex-shrink-0"
      style={{ background: '#1E1A16', borderRight: '1px solid #3A3028' }}
    >
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="label-xs px-3 pb-3 pt-1">MEMBER PORTAL</p>
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={16} className="flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-avara-border">
        <p className="text-[10px] text-avara-muted tracking-widest uppercase font-semibold">
          Avara Home OS
        </p>
        <p className="text-[10px] text-avara-muted/60 mt-0.5">Member Portal</p>
      </div>
    </aside>
  )
}

// Mobile bottom tab bar
export default function ClientNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex"
      style={{ background: '#1A1612', borderTop: '1px solid #3A3028', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold tracking-wide uppercase transition-colors ${
              isActive ? 'text-avara-gold' : 'text-avara-muted'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
