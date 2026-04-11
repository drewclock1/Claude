import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { Send } from 'lucide-react'
import { formatDateTime } from '../../utils/helpers'

export default function ClientMessages() {
  const { activeClient, getMessages, sendMessage } = useApp()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    if (activeClient) setMessages(getMessages(activeClient.id))
  }, [activeClient?.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!activeClient) return null

  const handleSend = () => {
    if (!input.trim()) return
    const updated = sendMessage(activeClient.id, input.trim(), 'client')
    setMessages(updated)
    setInput('')

    // Auto-reply after 1.5s for demo feel
    setTimeout(() => {
      const autoReplies = [
        "Got it — we'll take care of that right away.",
        "Thank you, we're on it. We'll update you shortly.",
        "Noted! Expect a confirmation from us soon.",
        "Perfect, we'll handle that before your next visit.",
        "Understood. Our team will be in touch with details.",
      ]
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
      const withReply = sendMessage(activeClient.id, reply, 'avara')
      setMessages(withReply)
    }, 1500)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto pb-20 lg:pb-0" style={{ height: 'calc(100vh - 140px)' }}>

      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-avara-border flex-shrink-0">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: '#B8966A', color: '#1A1612' }}
        >
          AH
        </div>
        <div>
          <p className="font-semibold text-avara-cream">Avara Home</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <p className="text-xs text-avara-muted">Your concierge team</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
              style={{ background: '#B8966A', color: '#1A1612' }}
            >
              AH
            </div>
            <p className="font-display text-xl text-avara-cream mb-1">Hello, {activeClient.name.split(' ')[0]}</p>
            <p className="text-avara-muted text-sm max-w-xs">
              Your Avara concierge team is available. Send a message to get started.
            </p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isClient = msg.sender === 'client'
          const showTime = i === 0 || new Date(msg.timestamp) - new Date(messages[i-1]?.timestamp) > 300000

          return (
            <div key={msg.id}>
              {showTime && (
                <p className="text-center text-[10px] text-avara-muted my-3">
                  {formatDateTime(msg.timestamp)}
                </p>
              )}
              <div className={`flex ${isClient ? 'justify-end' : 'justify-start'} gap-2`}>
                {!isClient && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 self-end mb-0.5"
                    style={{ background: '#B8966A', color: '#1A1612' }}
                  >
                    AH
                  </div>
                )}
                <div
                  className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={isClient
                    ? { background: '#B8966A', color: '#1A1612', borderRadius: '20px 20px 6px 20px', fontWeight: 500 }
                    : { background: '#2A2520', color: '#FAF7F2', borderRadius: '20px 20px 20px 6px', border: '1px solid #3A3028' }
                  }
                >
                  {msg.content}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 flex items-end gap-3 pt-4 border-t border-avara-border"
      >
        <textarea
          className="input-dark flex-1 resize-none"
          rows={1}
          placeholder="Message your concierge…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          style={{ maxHeight: 120, overflowY: 'auto' }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: input.trim() ? '#B8966A' : '#3A3028',
            color: input.trim() ? '#1A1612' : '#6A6058',
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
