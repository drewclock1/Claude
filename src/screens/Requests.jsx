import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import {
  Wrench, Calendar, Eye, Package, UtensilsCrossed, Map, Plane, Car, Ticket,
  Anchor, ShoppingBag, Gift, Search, Shirt, Users, Home, Star, ChevronDown, ChevronUp
} from 'lucide-react'
import { theme } from '../styles/theme'
import BottomSheet from '../components/layout/BottomSheet'
import { PrimaryButton } from '../components/ui/Button'
import { StatusBadge } from '../components/ui/Badge'
import { useRequests } from '../hooks/useRequests'
import { useToast } from '../hooks/useToast'

const Page = styled.div`
  padding: 0 0 32px;
  max-width: 600px;
  margin: 0 auto;
`

const TabRow = styled.div`
  display: flex;
  padding: 20px 20px 0;
  gap: 0;
  border-bottom: 1px solid rgba(184,150,106,0.1);
  margin-bottom: 0;
`

const Tab = styled.button`
  font-family: ${theme.fonts.sans};
  font-size: 0.9rem;
  font-weight: ${p => p.$active ? 500 : 400};
  color: ${p => p.$active ? theme.colors.gold : theme.colors.muted};
  border-bottom: 2px solid ${p => p.$active ? theme.colors.gold : 'transparent'};
  padding: 10px 16px 12px;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  transition: color 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;
`

const CountBadge = styled.span`
  background: ${theme.colors.goldPale};
  color: ${theme.colors.gold};
  font-size: 0.65rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: ${theme.radius.full};
`

const NewContent = styled.div`
  padding: 20px;
`

const RequestSubHeader = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: 1.2rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  margin-bottom: 20px;
`

const RowLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0 12px;

  span {
    font-family: ${theme.fonts.sans};
    font-size: 0.68rem;
    color: ${theme.colors.gold};
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 500;
  }

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(184,150,106,0.15);
  }
`

const TileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

const Tile = styled(motion.button)`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.15);
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  cursor: pointer;
  min-height: 44px;
`

const TileIcon = styled.div`
  color: ${theme.colors.gold};
  margin-bottom: 8px;
  line-height: 0;
`

const TileLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${theme.colors.cream};
  margin-bottom: 3px;
`

const TileSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 300;
  color: ${theme.colors.muted};
`

const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const PrefilledNote = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  color: ${theme.colors.muted};
  line-height: 1.5;
  padding: 10px 14px;
  background: rgba(184,150,106,0.05);
  border-left: 2px solid rgba(184,150,106,0.3);
  border-radius: 0 ${theme.radius.sm} ${theme.radius.sm} 0;
`

const FieldLabel = styled.label`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  display: block;
  margin-bottom: 6px;
`

const TextArea = styled.textarea`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.2);
  border-radius: ${theme.radius.md};
  padding: 12px;
  color: ${theme.colors.cream};
  font-family: ${theme.fonts.sans};
  font-size: 0.9rem;
  resize: none;
  min-height: 80px;
  transition: border-color 0.15s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.gold};
  }

  &::placeholder { color: ${theme.colors.faint}; }
`

const DateInput = styled.input`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.2);
  border-radius: ${theme.radius.md};
  padding: 12px;
  color: ${theme.colors.cream};
  font-family: ${theme.fonts.sans};
  font-size: 0.9rem;
  transition: border-color 0.15s;

  &:focus { outline: none; border-color: ${theme.colors.gold}; }
`

const PriorityRow = styled.div`
  display: flex;
  gap: 8px;
`

const PriorityBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: ${theme.radius.full};
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${p => p.$active && p.$urgent
    ? theme.colors.amber
    : p.$active ? theme.colors.gold : 'rgba(184,150,106,0.2)'};
  background: ${p => p.$active ? 'rgba(184,150,106,0.1)' : theme.colors.surface};
  color: ${p => p.$active && p.$urgent ? theme.colors.amber : p.$active ? theme.colors.gold : theme.colors.muted};
  min-height: 44px;
`

const UrgentNote = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.muted};
  text-align: center;
`

const SheetFooter = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  color: ${theme.colors.muted};
  text-align: center;
`

// My Requests
const RequestsContent = styled.div`
  padding: 16px 20px;
`

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 16px;
  padding-bottom: 2px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const FilterChip = styled.button`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  padding: 6px 16px;
  border-radius: ${theme.radius.full};
  border: 1px solid ${p => p.$active ? theme.colors.gold : 'rgba(184,150,106,0.15)'};
  color: ${p => p.$active ? theme.colors.gold : theme.colors.muted};
  background: ${p => p.$active ? theme.colors.goldPale : theme.colors.surface};
  cursor: pointer;
  white-space: nowrap;
  min-height: 36px;
`

const RequestCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.12);
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  margin-bottom: 8px;
`

const RequestCardTop = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`

const RequestType = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: 500;
  color: ${theme.colors.cream};
  flex: 1;
`

const RequestDetail = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  padding: 0 16px;
  margin-top: -4px;
  margin-bottom: 10px;
  line-height: 1.4;
`

const RequestDate = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.faint};
  padding: 0 16px 12px;
`

const AvaraResponse = styled.div`
  margin: 0 16px 14px;
  padding: 10px 12px;
  border-left: 2px solid ${theme.colors.gold};
  background: rgba(184,150,106,0.05);
  border-radius: 0 ${theme.radius.sm} ${theme.radius.sm} 0;
`

const AvaraResponseLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.gold};
  margin-bottom: 4px;
  font-weight: 500;
`

const AvaraResponseText = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  color: ${theme.colors.cream};
  font-style: italic;
  line-height: 1.5;
`

const InProgressPulse = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 14px;
`

const PulsingDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.amber};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 20px;
`

const REQUESTS_DATA = [
  { type: 'Something Needs Fixing', sub: 'Plumbing, electric, HVAC, general', Icon: Wrench, cat: 'estate' },
  { type: 'Schedule a Service', sub: 'Coordinate with vendors', Icon: Calendar, cat: 'estate' },
  { type: 'Property Check', sub: 'I want eyes on my home', Icon: Eye, cat: 'estate' },
  { type: 'Package / Delivery', sub: 'Manage an incoming delivery', Icon: Package, cat: 'estate' },
]

const LIFESTYLE_DATA = [
  { type: 'Restaurant Reservation', sub: 'Any table, any night', Icon: UtensilsCrossed, cat: 'lifestyle' },
  { type: 'Travel Planning', sub: 'Itineraries, hotels, transfers', Icon: Map, cat: 'lifestyle' },
  { type: 'Private Aviation', sub: 'Coordinate your flight', Icon: Plane, cat: 'lifestyle' },
  { type: 'Exotic / Luxury Vehicle', sub: 'Source, deliver, return', Icon: Car, cat: 'lifestyle' },
  { type: 'Event Tickets', sub: "The event you thought was sold out", Icon: Ticket, cat: 'lifestyle' },
  { type: 'Yacht / Boat Charter', sub: 'On any water, anywhere', Icon: Anchor, cat: 'lifestyle' },
]

const SHOPPING_DATA = [
  { type: 'Grocery Stock', sub: 'For my next arrival', Icon: ShoppingBag, cat: 'shopping' },
  { type: 'Personal Shopping', sub: 'Fashion, gifts, sourcing', Icon: Gift, cat: 'shopping' },
  { type: 'Specialty Item', sub: "Hard to find. We'll find it.", Icon: Search, cat: 'shopping' },
  { type: 'Wardrobe', sub: 'Curation and styling', Icon: Shirt, cat: 'shopping' },
]

const EVENT_DATA = [
  { type: 'Dinner Party', sub: "I'm hosting guests", Icon: Users, cat: 'event' },
  { type: 'Family Visit', sub: 'Prepare the property', Icon: Home, cat: 'event' },
  { type: 'Special Occasion', sub: 'Something is happening', Icon: Star, cat: 'event' },
]

const PREFILL_NOTES = {
  'Grocery Stock': "We'll use your standard list. Let us know anything different.",
  'Restaurant Reservation': 'We know your preferences. Any specific date or occasion?',
  'Arrival Prep': 'Your standard arrival prep is saved. Any changes this time?',
}

const PLACEHOLDERS = {
  'Grocery Stock': 'Any additions to your usual list?',
  'Restaurant Reservation': 'Date, party size, or any special occasion?',
  'Exotic / Luxury Vehicle': 'Type of vehicle, dates, any preferences?',
  'Travel Planning': 'Destination, dates, number of travelers?',
  'Personal Shopping': 'Item, occasion, budget?',
  default: 'Leave blank if we already know what you need.',
}

function defaultNeedBy() {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  return d.toISOString().split('T')[0]
}

function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function RequestSheet({ service, isOpen, onClose, onSubmit }) {
  const [notes, setNotes] = useState('')
  const [priority, setPriority] = useState('standard')
  const [needBy, setNeedBy] = useState(defaultNeedBy())

  if (!service) return null

  const prefillNote = PREFILL_NOTES[service.type] || "We'll take it from here. Any details we should know?"
  const placeholder = PLACEHOLDERS[service.type] || PLACEHOLDERS.default

  const handleSubmit = () => {
    onSubmit({ type: service.type, category: service.cat, notes, priority, needBy })
    setNotes('')
    setPriority('standard')
    setNeedBy(defaultNeedBy())
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={service.type}>
      <SheetContent>
        <PrefilledNote>{prefillNote}</PrefilledNote>
        <div>
          <FieldLabel>Anything to add?</FieldLabel>
          <TextArea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div>
          <FieldLabel style={{ marginBottom: 10 }}>Priority</FieldLabel>
          <PriorityRow>
            <PriorityBtn
              $active={priority === 'standard'}
              onClick={() => setPriority('standard')}
            >
              Standard
            </PriorityBtn>
            <PriorityBtn
              $active={priority === 'urgent'}
              $urgent
              onClick={() => setPriority('urgent')}
            >
              Urgent
            </PriorityBtn>
          </PriorityRow>
          {priority === 'urgent' && (
            <UrgentNote style={{ marginTop: 8 }}>Urgent requests are actioned within 2 hours.</UrgentNote>
          )}
        </div>
        <div>
          <FieldLabel>Needed by</FieldLabel>
          <DateInput type="date" value={needBy} onChange={e => setNeedBy(e.target.value)} />
        </div>
        <PrimaryButton fullWidth onClick={handleSubmit}>Submit Request</PrimaryButton>
        <SheetFooter>Your Avara team will confirm within the hour.</SheetFooter>
      </SheetContent>
    </BottomSheet>
  )
}

function TileRow({ data, onSelect }) {
  return (
    <TileGrid>
      {data.map(({ type, sub, Icon, cat }) => (
        <Tile
          key={type}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => onSelect({ type, sub, cat })}
          aria-label={type}
        >
          <TileIcon><Icon size={22} /></TileIcon>
          <TileLabel>{type}</TileLabel>
          <TileSub>{sub}</TileSub>
        </Tile>
      ))}
    </TileGrid>
  )
}

export default function RequestsScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('new')
  const [selectedService, setSelectedService] = useState(null)
  const [expandedReq, setExpandedReq] = useState(null)
  const [filter, setFilter] = useState('all')
  const { requests, addRequest } = useRequests()
  const { showToast } = useToast()

  const openCount = requests.filter(r => r.status !== 'completed').length

  const filtered = requests.filter(r => {
    if (filter === 'open') return r.status !== 'completed'
    if (filter === 'completed') return r.status === 'completed'
    return true
  }).sort((a, b) => {
    const order = { in_progress: 0, new: 1, completed: 2 }
    const ao = order[a.status] ?? 3
    const bo = order[b.status] ?? 3
    if (ao !== bo) return ao - bo
    return new Date(b.submittedAt) - new Date(a.submittedAt)
  })

  const handleSubmit = (data) => {
    addRequest(data)
    showToast("Request received. We're on it.")
    setActiveTab('history')
  }

  return (
    <Page>
      <TabRow>
        <Tab $active={activeTab === 'new'} onClick={() => setActiveTab('new')}>New Request</Tab>
        <Tab $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
          My Requests
          {openCount > 0 && <CountBadge>{openCount}</CountBadge>}
        </Tab>
      </TabRow>

      {activeTab === 'new' ? (
        <NewContent>
          <RequestSubHeader>What can we arrange for you?</RequestSubHeader>

          <RowLabel><span>Estate</span></RowLabel>
          <TileRow data={REQUESTS_DATA} onSelect={setSelectedService} />

          <RowLabel><span>Lifestyle</span></RowLabel>
          <TileRow data={LIFESTYLE_DATA} onSelect={setSelectedService} />

          <RowLabel><span>Shopping</span></RowLabel>
          <TileRow data={SHOPPING_DATA} onSelect={setSelectedService} />

          <RowLabel><span>Event Prep</span></RowLabel>
          <TileRow data={EVENT_DATA} onSelect={setSelectedService} />
        </NewContent>
      ) : (
        <RequestsContent>
          <FilterRow>
            {['all', 'open', 'completed'].map(f => (
              <FilterChip key={f} $active={filter === f} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </FilterChip>
            ))}
          </FilterRow>

          {filtered.length === 0 ? (
            <EmptyState>
              <Star size={40} color={theme.colors.gold} style={{ margin: '0 auto 12px' }} />
              <p style={{ fontFamily: theme.fonts.serif, fontSize: '1.1rem', color: theme.colors.cream, marginBottom: 8 }}>
                Your first request is one tap away.
              </p>
              <PrimaryButton onClick={() => setActiveTab('new')} style={{ margin: '12px auto 0', display: 'block' }}>
                Make a Request
              </PrimaryButton>
            </EmptyState>
          ) : (
            filtered.map(req => (
              <RequestCard key={req.id}>
                <RequestCardTop onClick={() => setExpandedReq(expandedReq === req.id ? null : req.id)}>
                  <RequestType>{req.type}</RequestType>
                  <StatusBadge status={req.status} />
                  {expandedReq === req.id ? <ChevronUp size={14} color={theme.colors.muted} /> : <ChevronDown size={14} color={theme.colors.muted} />}
                </RequestCardTop>
                <RequestDetail>{req.detail?.substring(0, 80)}{req.detail?.length > 80 ? '...' : ''}</RequestDetail>
                <AnimatePresence>
                  {expandedReq === req.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RequestDetail style={{ color: theme.colors.cream }}>{req.detail}</RequestDetail>
                      {req.avara_response && (
                        <AvaraResponse>
                          <AvaraResponseLabel>Avara Home:</AvaraResponseLabel>
                          <AvaraResponseText>{req.avara_response}</AvaraResponseText>
                        </AvaraResponse>
                      )}
                      {req.status === 'in_progress' && (
                        <InProgressPulse>
                          <PulsingDot animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                          <span style={{ fontFamily: theme.fonts.sans, fontSize: '0.8rem', color: theme.colors.amber }}>
                            We're working on this.
                          </span>
                        </InProgressPulse>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <RequestDate>{formatShortDate(req.submittedAt)}</RequestDate>
              </RequestCard>
            ))
          )}
        </RequestsContent>
      )}

      <RequestSheet
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
