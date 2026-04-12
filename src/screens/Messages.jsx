import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { ArrowUp } from 'lucide-react'
import { theme } from '../styles/theme'
import { useMessages } from '../hooks/useMessages'
import Avatar from '../components/ui/Avatar'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 64px);

  @media (min-width: 769px) {
    height: 100dvh;
    max-width: 640px;
    margin: 0 auto;
  }
`

const Header = styled.div`
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(184,150,106,0.1);
  flex-shrink: 0;
`

const HeaderTitle = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
`

const OnlineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const GreenDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.colors.success};
`

const OnlineLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  color: ${theme.colors.muted};
`

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DateSep = styled.p`
  text-align: center;
  font-family: ${theme.fonts.sans};
  font-size: 0.7rem;
  color: ${theme.colors.faint};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 12px 0 8px;
`

const MsgRow = styled.div`
  display: flex;
  flex-direction: ${p => p.$isClient ? 'row-reverse' : 'row'};
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 6px;
`

const Bubble = styled(motion.div)`
  max-width: 72%;
  padding: 12px 16px;
  border-radius: ${p => p.$isClient ? '16px 4px 16px 16px' : '4px 16px 16px 16px'};
  background: ${p => p.$isClient ? theme.colors.gold : theme.colors.surfaceRaised};
  border: ${p => p.$isClient ? 'none' : '1px solid rgba(184,150,106,0.12)'};
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  color: ${p => p.$isClient ? theme.colors.bg : theme.colors.cream};
  line-height: 1.5;
`

const Timestamp = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.65rem;
  color: ${theme.colors.faint};
  margin-top: 3px;
  text-align: ${p => p.$isClient ? 'right' : 'left'};
  padding: 0 4px;
`

const QuickReplies = styled(motion.div)`
  display: flex;
  gap: 8px;
  padding: 8px 20px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  flex-shrink: 0;
`

const QuickChip = styled(motion.button)`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  padding: 7px 16px;
  border-radius: ${theme.radius.full};
  border: 1px solid rgba(184,150,106,0.25);
  color: ${theme.colors.muted};
  background: ${theme.colors.surface};
  cursor: pointer;
  white-space: nowrap;
  min-height: 36px;
  flex-shrink: 0;
`

const InputBar = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0));
  background: rgba(26,22,18,0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(184,150,106,0.10);
`

const MessageInput = styled.input`
  flex: 1;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.15);
  border-radius: ${theme.radius.full};
  padding: 10px 18px;
  color: ${theme.colors.cream};
  font-family: ${theme.fonts.sans};
  font-size: 0.9rem;
  transition: border-color 0.15s;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.gold};
  }

  &::placeholder { color: ${theme.colors.faint}; }
`

const SendBtn = styled(motion.button)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${p => p.$hasText ? theme.colors.gold : theme.colors.surface};
  border: 1px solid ${p => p.$hasText ? theme.colors.gold : 'rgba(184,150,106,0.15)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${p => p.$hasText ? 'pointer' : 'default'};
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
`

const AUTO_REPLIES = [
  "We're on it, Sarah. We'll get back to you shortly.",
  'Noted. We\'ll take care of this.',
  "Got it — we'll handle it and update you soon.",
]

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function formatDateSep(ts) {
  const d = new Date(ts)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) return 'Today'
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

function isSameDay(ts1, ts2) {
  return new Date(ts1).toDateString() === new Date(ts2).toDateString()
}

export default function MessagesScreen({ client }) {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useMessages()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const lastMsg = messages[messages.length - 1]
  const showQuickReplies = lastMsg && lastMsg.sender === 'avara'

  const send = (text) => {
    if (!text.trim()) return
    sendMessage(text.trim(), 'client')

    const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]
    setTimeout(() => {
      sendMessage(reply, 'avara')
    }, 2000)
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    send(text)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickReply = (text) => {
    if (text === "I need something →") {
      navigate('/requests')
      return
    }
    send(text)
  }

  return (
    <Page>
      <Header>
        <HeaderTitle>Your Avara Team</HeaderTitle>
        <OnlineRow>
          <GreenDot />
          <OnlineLabel>Available now</OnlineLabel>
        </OnlineRow>
      </Header>

      <MessagesArea>
        {messages.map((msg, i) => {
          const isClient = msg.sender === 'client'
          const showDateSep = i === 0 || !isSameDay(msg.timestamp, messages[i - 1].timestamp)

          return (
            <div key={msg.id}>
              {showDateSep && <DateSep>{formatDateSep(msg.timestamp)}</DateSep>}
              <MsgRow $isClient={isClient}>
                {!isClient && (
                  <Avatar initials="AH" size="28px" fontSize="0.6rem" />
                )}
                <div>
                  <Bubble
                    $isClient={isClient}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.text}
                  </Bubble>
                  <Timestamp $isClient={isClient}>{formatTime(msg.timestamp)}</Timestamp>
                </div>
              </MsgRow>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </MessagesArea>

      <AnimatePresence>
        {showQuickReplies && (
          <QuickReplies
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
          >
            {['Thank you', 'Perfect', 'I need something →'].map(r => (
              <QuickChip
                key={r}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickReply(r)}
                aria-label={r}
              >
                {r}
              </QuickChip>
            ))}
          </QuickReplies>
        )}
      </AnimatePresence>

      <InputBar>
        <MessageInput
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Message your Avara team..."
          aria-label="Message input"
        />
        <SendBtn
          $hasText={!!input.trim()}
          onClick={handleSend}
          whileTap={input.trim() ? { scale: 0.9 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          aria-label="Send message"
          disabled={!input.trim()}
        >
          <ArrowUp size={18} color={input.trim() ? theme.colors.bg : theme.colors.faint} />
        </SendBtn>
      </InputBar>
    </Page>
  )
}
