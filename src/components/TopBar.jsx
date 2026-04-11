import { useLocation } from 'react-router-dom'
import { Menu, Bell, Search } from 'lucide-react'

const pageTitles = {
  '/dashboard':   { title: 'Dashboard',     subtitle: 'Welcome back, Alex' },
  '/properties':  { title: 'Properties',    subtitle: 'Manage your portfolio' },
  '/smart-home':  { title: 'Smart Home',    subtitle: 'Control your devices' },
  '/maintenance': { title: 'Maintenance',   subtitle: 'Track service requests' },
  '/marketplace': { title: 'Marketplace',   subtitle: 'Discover home services' },
}

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation()
  const page = pageTitles[pathname] ?? { title: 'Avara Home', subtitle: '' }

  return (
    <header className="bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between lg:px-8 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-display font-semibold text-stone-900 leading-tight">{page.title}</h1>
          <p className="text-sm text-stone-500 leading-none mt-0.5">{page.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-stone-100 rounded-xl px-4 py-2.5 text-sm text-stone-400 w-60">
          <Search size={15} />
          <span>Search...</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-avara-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-avara-500 flex items-center justify-center text-sm font-semibold text-white cursor-pointer">
          AW
        </div>
      </div>
    </header>
  )
}
