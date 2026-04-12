const parse = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export const getClient = () => parse('avara_client', null)

export const getVisits = () => {
  const visits = parse('avara_visits', [])
  return [...visits].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getMessages = () => {
  const msgs = parse('avara_messages', [])
  return [...msgs].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
}

export const getRequests = () => {
  const reqs = parse('avara_requests', [])
  return [...reqs].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
}

export const getArrivals = () => {
  const arrivals = parse('avara_arrivals', [])
  return [...arrivals].sort((a, b) => new Date(a.date) - new Date(b.date))
}

export const addMessage = (msgObj) => {
  const msgs = parse('avara_messages', [])
  const updated = [...msgs, msgObj]
  return save('avara_messages', updated)
}

export const addRequest = (reqObj) => {
  const reqs = parse('avara_requests', [])
  const updated = [reqObj, ...reqs]
  return save('avara_requests', updated)
}

export const addArrival = (arrObj) => {
  const arrivals = parse('avara_arrivals', [])
  const updated = [...arrivals, arrObj]
  return save('avara_arrivals', updated)
}

export const updateRequest = (id, patch) => {
  const reqs = parse('avara_requests', [])
  const updated = reqs.map(r => r.id === id ? { ...r, ...patch } : r)
  return save('avara_requests', updated)
}

export const updateArrivals = (arr) => {
  return save('avara_arrivals', arr)
}
