import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import SmartHome from './pages/SmartHome'
import Maintenance from './pages/Maintenance'
import Marketplace from './pages/Marketplace'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="smart-home" element={<SmartHome />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="marketplace" element={<Marketplace />} />
      </Route>
    </Routes>
  )
}
