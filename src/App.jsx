import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Toast from './components/Toast'
import AppHeader from './components/AppHeader'
import OperatorSidebar from './components/OperatorSidebar'
import ClientNav, { ClientSidebar } from './components/ClientNav'

// Operator pages
import Dashboard    from './pages/operator/Dashboard'
import Clients      from './pages/operator/Clients'
import ClientProfile from './pages/operator/ClientProfile'
import Properties   from './pages/operator/Properties'
import Tasks        from './pages/operator/Tasks'
import Outreach     from './pages/operator/Outreach'
import Vendors      from './pages/operator/Vendors'
import Reports      from './pages/operator/Reports'

// Client pages
import ClientHome      from './pages/client/ClientHome'
import ClientProperty  from './pages/client/ClientProperty'
import ClientRequests  from './pages/client/ClientRequests'
import ClientLifestyle from './pages/client/ClientLifestyle'
import ClientMessages  from './pages/client/ClientMessages'

const PAGE_TITLES = {
  '/operator/dashboard':  { title: 'Dashboard',         sub: 'Business overview' },
  '/operator/clients':    { title: 'Clients',           sub: 'Manage your portfolio' },
  '/operator/properties': { title: 'Properties',        sub: 'All managed estates' },
  '/operator/tasks':      { title: 'Tasks & Requests',  sub: 'Kanban board' },
  '/operator/outreach':   { title: 'Outreach',          sub: 'Partners & pipeline' },
  '/operator/vendors':    { title: 'Vendors',           sub: 'Trusted service providers' },
  '/operator/reports':    { title: 'Reports',           sub: 'Business insights' },
}

function OperatorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const pageInfo = PAGE_TITLES[location.pathname] || { title: 'Avara Home OS', sub: '' }

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#1A1612' }}>
      <AppHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <OperatorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page header */}
          <div
            className="flex-shrink-0 px-6 py-4 border-b"
            style={{ borderColor: '#3A3028', background: '#1E1A16' }}
          >
            <h1 className="font-display text-lg font-semibold text-avara-cream leading-none">{pageInfo.title}</h1>
            {pageInfo.sub && <p className="text-xs text-avara-muted mt-0.5">{pageInfo.sub}</p>}
          </div>
          <main className="flex-1 overflow-y-auto p-5 lg:p-6">
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"       element={<Dashboard />} />
              <Route path="clients"         element={<Clients />} />
              <Route path="clients/:id"     element={<ClientProfile />} />
              <Route path="properties"      element={<Properties />} />
              <Route path="tasks"           element={<Tasks />} />
              <Route path="outreach"        element={<Outreach />} />
              <Route path="vendors"         element={<Vendors />} />
              <Route path="reports"         element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

function ClientLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#1A1612' }}>
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <ClientSidebar />
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home"      element={<ClientHome />} />
            <Route path="property"  element={<ClientProperty />} />
            <Route path="requests"  element={<ClientRequests />} />
            <Route path="lifestyle" element={<ClientLifestyle />} />
            <Route path="messages"  element={<ClientMessages />} />
          </Routes>
        </main>
      </div>
      <ClientNav />
    </div>
  )
}

function AppRouter() {
  const { view } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  // Auto-redirect when view changes
  useEffect(() => {
    if (view === 'owner' && location.pathname.startsWith('/client')) {
      navigate('/operator/dashboard', { replace: true })
    } else if (view === 'client' && location.pathname.startsWith('/operator')) {
      navigate('/client/home', { replace: true })
    }
  }, [view])

  return (
    <Routes>
      <Route path="/" element={<Navigate to={view === 'client' ? '/client/home' : '/operator/dashboard'} replace />} />
      <Route path="/operator/*" element={<OperatorLayout />} />
      <Route path="/client/*"   element={<ClientLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <>
      <AppRouter />
      <Toast />
    </>
  )
}
