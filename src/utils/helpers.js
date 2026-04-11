export const uuid = () =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36)

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'))
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch { return dateStr }
}

export const formatShortDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'))
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch { return dateStr }
}

export const formatTime = (ts) => {
  if (!ts) return ''
  try {
    const d = new Date(ts)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch { return '' }
}

export const formatDateTime = (ts) => {
  if (!ts) return ''
  try {
    const d = new Date(ts)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  } catch { return '' }
}

export const daysUntil = (dateStr) => {
  if (!dateStr) return null
  const diff = new Date(dateStr + 'T00:00:00') - new Date()
  return Math.ceil(diff / 86400000)
}

export const daysSince = (dateStr) => {
  if (!dateStr) return null
  const diff = new Date() - new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'))
  return Math.floor(diff / 86400000)
}

export const currency = (n) => {
  if (n === null || n === undefined) return '—'
  return '$' + Number(n).toLocaleString('en-US')
}

export const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export const priorityColor = (priority) => {
  switch (priority) {
    case 'Urgent': return '#D4726A'
    case 'High':   return '#D4A26A'
    case 'Medium': return '#B8966A'
    case 'Low':    return '#6A8AB8'
    default:       return '#9A8E82'
  }
}

export const statusBadgeStyle = (status) => {
  switch (status) {
    case 'New':              return { color: '#B8966A', border: 'rgba(184,150,106,0.4)', bg: 'rgba(184,150,106,0.1)' }
    case 'In Progress':      return { color: '#D4B483', border: 'rgba(212,180,131,0.4)', bg: 'rgba(212,180,131,0.1)' }
    case 'Awaiting Client':  return { color: '#8AB8D4', border: 'rgba(138,184,212,0.4)', bg: 'rgba(138,184,212,0.1)' }
    case 'Completed':        return { color: '#8AB89A', border: 'rgba(138,184,154,0.4)', bg: 'rgba(138,184,154,0.1)' }
    case 'On Hold':          return { color: '#9A8E82', border: 'rgba(154,142,130,0.4)', bg: 'rgba(154,142,130,0.1)' }
    case 'Active':           return { color: '#8AB89A', border: 'rgba(138,184,154,0.4)', bg: 'rgba(138,184,154,0.1)' }
    case 'Inactive':         return { color: '#9A8E82', border: 'rgba(154,142,130,0.4)', bg: 'rgba(154,142,130,0.1)' }
    case 'Paid':             return { color: '#8AB89A', border: 'rgba(138,184,154,0.4)', bg: 'rgba(138,184,154,0.1)' }
    case 'Pending':          return { color: '#D4B483', border: 'rgba(212,180,131,0.4)', bg: 'rgba(212,180,131,0.1)' }
    case 'Hot':              return { color: '#D4726A', border: 'rgba(212,114,106,0.4)', bg: 'rgba(212,114,106,0.1)' }
    case 'Warm':             return { color: '#D4A26A', border: 'rgba(212,162,106,0.4)', bg: 'rgba(212,162,106,0.1)' }
    case 'Cold':             return { color: '#9A8E82', border: 'rgba(154,142,130,0.4)', bg: 'rgba(154,142,130,0.1)' }
    case 'Active Partner':   return { color: '#8AB89A', border: 'rgba(138,184,154,0.4)', bg: 'rgba(138,184,154,0.1)' }
    case 'In Progress':      return { color: '#D4B483', border: 'rgba(212,180,131,0.4)', bg: 'rgba(212,180,131,0.1)' }
    default:                 return { color: '#9A8E82', border: 'rgba(154,142,130,0.4)', bg: 'rgba(154,142,130,0.1)' }
  }
}

export const activityIcon = (type) => {
  switch (type) {
    case 'visit_logged':      return '🏠'
    case 'task_completed':    return '✓'
    case 'request_received':  return '📋'
    case 'note_added':        return '📝'
    case 'vendor_contacted':  return '📞'
    case 'prospect_added':    return '⭐'
    case 'client_added':      return '👤'
    default:                  return '·'
  }
}

export const noteTypeIcon = (type) => {
  switch (type) {
    case 'visit':  return '🏠'
    case 'call':   return '📞'
    case 'text':   return '💬'
    case 'email':  return '✉️'
    case 'note':   return '📝'
    default:       return '·'
  }
}

export const greetingByHour = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
