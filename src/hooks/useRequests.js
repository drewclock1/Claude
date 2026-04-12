import { useState, useCallback } from 'react'
import { getRequests, addRequest as storageAddRequest, updateRequest as storageUpdateRequest } from '../data/storage'

export function useRequests() {
  const [requests, setRequests] = useState(() => getRequests())

  const addRequest = useCallback((req) => {
    const newReq = {
      id: `req_${Date.now()}`,
      status: 'new',
      submittedAt: new Date().toISOString(),
      completedAt: null,
      avara_response: null,
      ...req,
    }
    storageAddRequest(newReq)
    setRequests(getRequests())
    return newReq
  }, [])

  const updateRequest = useCallback((id, patch) => {
    storageUpdateRequest(id, patch)
    setRequests(getRequests())
  }, [])

  const refresh = useCallback(() => {
    setRequests(getRequests())
  }, [])

  return { requests, addRequest, updateRequest, refresh }
}
