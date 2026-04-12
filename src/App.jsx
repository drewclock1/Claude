import { useEffect, useMemo } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import { seedStorage } from './data/seed'
import { getClient } from './data/storage'
import AppShell from './components/layout/AppShell'
import { ToastContext, useToastState } from './hooks/useToast'
import { useMessages } from './hooks/useMessages'

import HomeScreen from './screens/Home'
import PropertyScreen from './screens/Property'
import RequestsScreen from './screens/Requests'
import ArrivalPrepScreen from './screens/ArrivalPrep'
import EventsScreen from './screens/Events'
import MessagesScreen from './screens/Messages'
import OwnerDashboard from './screens/OwnerDashboard'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

const pageTransition = { duration: 0.22, ease: 'easeOut' }

function AnimatedRoute({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ minHeight: '100%' }}
    >
      {children}
    </motion.div>
  )
}

function AppInner() {
  const location = useLocation()
  const client = useMemo(() => getClient(), [])
  const { unreadCount } = useMessages()

  return (
    <AppShell client={client} unreadCount={unreadCount}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Owner routes */}
          <Route path="/owner" element={<AnimatedRoute><OwnerDashboard /></AnimatedRoute>} />

          {/* Client routes */}
          <Route path="/" element={<AnimatedRoute><HomeScreen client={client} /></AnimatedRoute>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/property" element={<AnimatedRoute><PropertyScreen client={client} /></AnimatedRoute>} />
          <Route path="/requests" element={<AnimatedRoute><RequestsScreen /></AnimatedRoute>} />
          <Route path="/arrival" element={<AnimatedRoute><ArrivalPrepScreen /></AnimatedRoute>} />
          <Route path="/events" element={<AnimatedRoute><EventsScreen /></AnimatedRoute>} />
          <Route path="/messages" element={<AnimatedRoute><MessagesScreen client={client} /></AnimatedRoute>} />

          {/* Legacy redirect */}
          <Route path="/lifestyle" element={<Navigate to="/requests" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  )
}

export default function App() {
  useEffect(() => {
    seedStorage()
  }, [])

  const toastState = useToastState()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContext.Provider value={toastState}>
        <AppInner />
      </ToastContext.Provider>
    </ThemeProvider>
  )
}
