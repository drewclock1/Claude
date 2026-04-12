import { useState, useCallback } from 'react'
import { getMessages, addMessage as storageAddMessage } from '../data/storage'

export function useMessages() {
  const [messages, setMessages] = useState(() => getMessages())

  const sendMessage = useCallback((text, sender = 'client') => {
    const msg = {
      id: `msg_${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toISOString(),
      read: sender === 'avara',
    }
    storageAddMessage(msg)
    setMessages(getMessages())
    return msg
  }, [])

  const refresh = useCallback(() => {
    setMessages(getMessages())
  }, [])

  const unreadCount = messages.filter(m => m.sender === 'avara' && !m.read).length

  return { messages, sendMessage, refresh, unreadCount }
}
