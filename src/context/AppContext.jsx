import { createContext, useContext, useState, useCallback } from 'react'
import { seedData } from '../utils/seed'
import { uuid } from '../utils/helpers'

const AppContext = createContext(null)

function load(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) return JSON.parse(stored)
  } catch {}
  const seeded = fallback()
  try { localStorage.setItem(key, JSON.stringify(seeded)) } catch {}
  return seeded
}

function save(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}

function loadMessages(clientId) {
  return load(`avara_messages_${clientId}`, () => seedData.messages[clientId] || [])
}

export function AppProvider({ children }) {
  // View state
  const [view, setViewRaw] = useState(() => localStorage.getItem('avara_view') || 'owner')
  const [activeClientId, setActiveClientIdRaw] = useState(() => {
    return localStorage.getItem('avara_active_client') || 'client-1'
  })

  // Data state
  const [clients, setClientsRaw]     = useState(() => load('avara_clients',   () => seedData.clients))
  const [tasks, setTasksRaw]         = useState(() => load('avara_tasks',     () => seedData.tasks))
  const [vendors, setVendorsRaw]     = useState(() => load('avara_vendors',   () => seedData.vendors))
  const [outreach, setOutreachRaw]   = useState(() => load('avara_outreach',  () => seedData.outreach))
  const [prospects, setProspectsRaw] = useState(() => load('avara_prospects', () => seedData.prospects))
  const [activity, setActivityRaw]   = useState(() => load('avara_activity',  () => seedData.activity))

  // Toast state
  const [toasts, setToasts] = useState([])

  // --- View ---
  const setView = useCallback((v) => {
    setViewRaw(v)
    save('avara_view', v)
  }, [])

  const setActiveClientId = useCallback((id) => {
    setActiveClientIdRaw(id)
    save('avara_active_client', id)
  }, [])

  // --- Toast ---
  const showToast = useCallback((message, type = 'success') => {
    const id = uuid()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // --- Activity log ---
  const addActivity = useCallback((type, content, clientName = null) => {
    const entry = { id: uuid(), type, content, clientName, timestamp: new Date().toISOString() }
    setActivityRaw(prev => {
      const updated = [entry, ...prev].slice(0, 50)
      save('avara_activity', updated)
      return updated
    })
  }, [])

  // --- Clients ---
  const setClients = useCallback((data) => { setClientsRaw(data); save('avara_clients', data) }, [])

  const addClient = useCallback((client) => {
    const newClient = { ...client, id: uuid() }
    setClients([...clients, newClient])
    addActivity('client_added', `New client added: ${client.name}`, client.name)
    showToast(`${client.name} added as a client`)
  }, [clients, setClients, addActivity, showToast])

  const updateClient = useCallback((id, updates) => {
    const updated = clients.map(c => c.id === id ? { ...c, ...updates } : c)
    setClients(updated)
  }, [clients, setClients])

  const updateClientPreferences = useCallback((clientId, section, updates) => {
    const updated = clients.map(c =>
      c.id === clientId
        ? { ...c, preferences: { ...c.preferences, [section]: { ...c.preferences[section], ...updates } } }
        : c
    )
    setClients(updated)
    showToast('Preferences saved')
  }, [clients, setClients, showToast])

  const addClientNote = useCallback((clientId, note) => {
    const newNote = { id: uuid(), date: new Date().toISOString().split('T')[0], ...note }
    const updated = clients.map(c =>
      c.id === clientId
        ? { ...c, notes: [newNote, ...(c.notes || [])] }
        : c
    )
    setClients(updated)
    addActivity('note_added', `Note added: ${note.content.slice(0, 60)}...`, clients.find(c => c.id === clientId)?.name)
    showToast('Note saved')
  }, [clients, setClients, addActivity, showToast])

  const logVisit = useCallback((clientId) => {
    const today = new Date().toISOString().split('T')[0]
    const client = clients.find(c => c.id === clientId)
    const note = {
      id: uuid(), date: today,
      type: 'visit',
      content: `Property visit logged on ${today}.`
    }
    const updated = clients.map(c =>
      c.id === clientId
        ? { ...c, lastVisit: today, notes: [note, ...(c.notes || [])] }
        : c
    )
    setClients(updated)
    addActivity('visit_logged', `Visit logged at ${client?.address}`, client?.name)
    showToast('Visit logged')
  }, [clients, setClients, addActivity, showToast])

  const updateBillingItem = useCallback((clientId, item) => {
    const newItem = { id: uuid(), ...item }
    const updated = clients.map(c =>
      c.id === clientId
        ? { ...c, billing: { ...c.billing, alaCarte: [...(c.billing?.alaCarte || []), newItem] } }
        : c
    )
    setClients(updated)
    showToast('Billing item added')
  }, [clients, setClients, showToast])

  // --- Tasks ---
  const setTasks = useCallback((data) => { setTasksRaw(data); save('avara_tasks', data) }, [])

  const addTask = useCallback((task) => {
    const newTask = { id: uuid(), createdAt: new Date().toISOString().split('T')[0], ...task }
    setTasks([...tasks, newTask])
    addActivity('request_received', `New task: ${task.title}`, task.clientName)
    showToast('Task created')
  }, [tasks, setTasks, addActivity, showToast])

  const updateTask = useCallback((id, updates) => {
    const updated = tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    setTasks(updated)
    if (updates.status === 'Completed') {
      const task = tasks.find(t => t.id === id)
      addActivity('task_completed', `Task completed: ${task?.title}`, task?.clientName)
      showToast('Task marked complete')
    }
  }, [tasks, setTasks, addActivity, showToast])

  const moveTask = useCallback((id, newStatus) => {
    updateTask(id, { status: newStatus, ...(newStatus === 'Completed' ? { completedAt: new Date().toISOString().split('T')[0] } : {}) })
  }, [updateTask])

  const deleteTask = useCallback((id) => {
    setTasks(tasks.filter(t => t.id !== id))
    showToast('Task removed')
  }, [tasks, setTasks, showToast])

  // --- Vendors ---
  const setVendors = useCallback((data) => { setVendorsRaw(data); save('avara_vendors', data) }, [])

  const addVendor = useCallback((vendor) => {
    setVendors([...vendors, { id: uuid(), rating: 0, ...vendor }])
    showToast('Vendor added')
  }, [vendors, setVendors, showToast])

  const updateVendor = useCallback((id, updates) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, ...updates } : v))
  }, [vendors, setVendors])

  // --- Outreach ---
  const setOutreach = useCallback((data) => { setOutreachRaw(data); save('avara_outreach', data) }, [])

  const updateOutreach = useCallback((id, updates) => {
    setOutreach(outreach.map(o => o.id === id ? { ...o, ...updates } : o))
    showToast('Contact updated')
  }, [outreach, setOutreach, showToast])

  const addOutreach = useCallback((contact) => {
    setOutreach([...outreach, { id: uuid(), ...contact }])
    showToast('Contact added')
  }, [outreach, setOutreach, showToast])

  // --- Prospects ---
  const setProspects = useCallback((data) => { setProspectsRaw(data); save('avara_prospects', data) }, [])

  const addProspect = useCallback((prospect) => {
    const newP = { id: uuid(), addedDate: new Date().toISOString().split('T')[0], ...prospect }
    setProspects([...prospects, newP])
    addActivity('prospect_added', `New prospect: ${prospect.name}`)
    showToast('Prospect added')
  }, [prospects, setProspects, addActivity, showToast])

  const updateProspect = useCallback((id, updates) => {
    setProspects(prospects.map(p => p.id === id ? { ...p, ...updates } : p))
  }, [prospects, setProspects])

  // --- Messages ---
  const getMessages = useCallback((clientId) => {
    return loadMessages(clientId)
  }, [])

  const sendMessage = useCallback((clientId, content, sender = 'avara') => {
    const msg = { id: uuid(), sender, content, timestamp: new Date().toISOString() }
    const existing = loadMessages(clientId)
    const updated = [...existing, msg]
    save(`avara_messages_${clientId}`, updated)
    return updated
  }, [])

  // --- Computed ---
  const activeClient = clients.find(c => c.id === activeClientId) || clients[0]
  const clientTasks = (clientId) => tasks.filter(t => t.clientId === clientId)
  const openTasks = tasks.filter(t => t.status !== 'Completed')

  return (
    <AppContext.Provider value={{
      // View
      view, setView, activeClientId, setActiveClientId, activeClient,

      // Data
      clients, tasks, vendors, outreach, prospects, activity,

      // Client ops
      addClient, updateClient, updateClientPreferences,
      addClientNote, logVisit, updateBillingItem,

      // Task ops
      addTask, updateTask, moveTask, deleteTask,
      clientTasks, openTasks,

      // Vendor ops
      addVendor, updateVendor,

      // Outreach ops
      updateOutreach, addOutreach, addProspect, updateProspect,

      // Message ops
      getMessages, sendMessage,

      // Activity
      addActivity,

      // Toast
      toasts, showToast, removeToast,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
