import { useState, useEffect } from 'react'
import { getClient } from '../data/storage'

export function useClient() {
  const [client, setClient] = useState(null)

  useEffect(() => {
    setClient(getClient())
  }, [])

  return client
}
