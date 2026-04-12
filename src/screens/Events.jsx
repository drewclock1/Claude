import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car, Palette, Trophy, Utensils, Crown, Shirt, CalendarDays, MapPin, ChevronRight
} from 'lucide-react'
import { theme } from '../styles/theme'
import BottomSheet from '../components/layout/BottomSheet'
import { PrimaryButton } from '../components/ui/Button'
import { useRequests } from '../hooks/useRequests'
import { useToast } from '../hooks/useToast'

const Page = styled.div`
  padding: 0 0 40px;
  max-width: 600px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  padding: 24px 16px 16px;
`

const PageTitle = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: 1.5rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
`

const PageSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  color: ${theme.colors.muted};
`

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 16px 16px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const FilterChip = styled.button`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  padding: 6px 14px;
  border-radius: ${theme.radius.full};
  border: 1px solid ${p => p.$active ? theme.colors.gold : 'rgba(184,150,106,0.18)'};
  color: ${p => p.$active ? theme.colors.gold : theme.colors.muted};
  background: ${p => p.$active ? theme.colors.goldPale : theme.colors.surface};
  cursor: pointer;
  white-space: nowrap;
  min-height: 34px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  gap: 5px;
`

const EventList = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const EventCard = styled.button`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.14);
  border-radius: 16px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.15s;
  display: block;

  &:active {
    border-color: rgba(184,150,106,0.4);
  }
`

const EventCardInner = styled.div`
  padding: 16px;
`

const EventTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
`

const EventIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(184,150,106,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const EventMeta = styled.div`
  flex: 1;
  min-width: 0;
`

const EventTitle = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
  line-height: 1.3;
`

const EventDateVenue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const EventDate = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  color: ${theme.colors.gold};
  display: flex;
  align-items: center;
  gap: 4px;
`

const EventVenue = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.muted};
  display: flex;
  align-items: center;
  gap: 4px;
`

const CategoryTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${theme.fonts.sans};
  font-size: 0.62rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.gold};
  background: rgba(184,150,106,0.1);
  padding: 2px 8px;
  border-radius: ${theme.radius.full};
`

const EventDesc = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  line-height: 1.5;
  margin-top: 8px;
`

const RequestAccessRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid rgba(184,150,106,0.08);
  background: rgba(184,150,106,0.03);
`

const RequestAccessLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  color: ${theme.colors.gold};
  font-weight: 500;
`

/* ── Sheet ── */
const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SheetEventInfo = styled.div`
  padding: 12px 14px;
  background: rgba(184,150,106,0.05);
  border-left: 2px solid rgba(184,150,106,0.3);
  border-radius: 0 ${theme.radius.sm} ${theme.radius.sm} 0;
`

const SheetEventTitle = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: 600;
  color: ${theme.colors.cream};
  margin-bottom: 3px;
`

const SheetEventDate = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  color: ${theme.colors.gold};
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
  box-sizing: border-box;

  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  &::placeholder { color: ${theme.colors.faint}; }
`

const SheetFooter = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  color: ${theme.colors.muted};
  text-align: center;
`

/* ── Events Data ── */
const CATEGORY_ICONS = {
  Motorsport: Car,
  Art: Palette,
  Sports: Trophy,
  Dining: Utensils,
  Gala: Crown,
  Fashion: Shirt,
}

const EVENTS = [
  {
    id: 'evt_001',
    title: 'Barrett-Jackson Collector Car Auction',
    date: '2026-04-18',
    endDate: '2026-04-26',
    category: 'Motorsport',
    venue: 'WestWorld of Scottsdale',
    description: "The world's greatest collector car auction returns to Scottsdale. VIP paddock access, preview galas, and rare vehicle consignments from around the globe. Avara can arrange private bidder registration and transport.",
  },
  {
    id: 'evt_002',
    title: 'Phoenix Suns vs. Denver Nuggets',
    date: '2026-04-20',
    endDate: '2026-04-20',
    category: 'Sports',
    venue: 'Footprint Center, Phoenix',
    description: "Western Conference playoff basketball at the Footprint Center. Courtside seats, private suites, and pre-game hospitality available through Avara.",
  },
  {
    id: 'evt_003',
    title: 'Camelback Corridor Art Walk',
    date: '2026-04-25',
    endDate: '2026-04-25',
    category: 'Art',
    venue: 'Scottsdale Gallery District',
    description: "Monthly curated evening walk through Scottsdale's premier gallery corridor. Private studio access, meet-the-artist events, and first-look acquisitions for invited collectors.",
  },
  {
    id: 'evt_004',
    title: 'Rare Whisky & Spirits Tasting',
    date: '2026-04-24',
    endDate: '2026-04-24',
    category: 'Dining',
    venue: 'Bourbon & Bones, Paradise Valley',
    description: "Invite-only evening tasting of rare single malts and premium spirits. 15 curated expressions guided by a master distiller. Limited to 40 guests — Avara can secure your seat.",
  },
  {
    id: 'evt_005',
    title: 'Scottsdale Fine Art Auction',
    date: '2026-04-30',
    endDate: '2026-05-02',
    category: 'Art',
    venue: 'Scottsdale Plaza Resort',
    description: "The Southwest's most prestigious fine art auction. Western, American, and contemporary masters with a VIP preview evening and private bidder orientation. Avara handles registration and transport.",
  },
  {
    id: 'evt_006',
    title: 'Desert Horizons Charity Gala',
    date: '2026-05-03',
    endDate: '2026-05-03',
    category: 'Gala',
    venue: 'The Phoenician Resort',
    description: "Annual black-tie gala at The Phoenician supporting desert conservation and local arts. Headline dinner, live auction, and cocktail reception with 200 of Scottsdale's most notable. Avara arranges table access and transportation.",
  },
  {
    id: 'evt_007',
    title: "Chef's Table at Christopher's",
    date: '2026-05-08',
    endDate: '2026-05-08',
    category: 'Dining',
    venue: "Christopher's at Wrigley Mansion",
    description: "An intimate 12-seat chef's table experience. Seasonal tasting menu with award-winning wine pairings. One of the most coveted private dining experiences in Arizona.",
  },
  {
    id: 'evt_008',
    title: "Arizona Concours d'Elegance",
    date: '2026-05-10',
    endDate: '2026-05-10',
    category: 'Motorsport',
    venue: 'Gainey Ranch Golf Club',
    description: "One of North America's premier concours events on the manicured lawns of Gainey Ranch. Rare and historically significant automobiles judged by international experts. VIP morning access available.",
  },
  {
    id: 'evt_009',
    title: 'Phoenix Fashion Week — Members Preview',
    date: '2026-05-20',
    endDate: '2026-05-24',
    category: 'Fashion',
    venue: 'Saks Fifth Avenue, Scottsdale',
    description: "Members-only evening preview of Phoenix Fashion Week collections. First-look access to Arizona and national designers, with personal styling consultation available through Avara.",
  },
  {
    id: 'evt_010',
    title: 'Pebble Beach Qualifier Showcase',
    date: '2026-05-16',
    endDate: '2026-05-16',
    category: 'Motorsport',
    venue: 'Private Estate, Paradise Valley',
    description: "Invitation-only preview of local vehicles competing for Pebble Beach selection. Hosted at a private Paradise Valley estate — breakfast and champagne served. Strictly by referral.",
  },
]

const CATEGORIES = ['All', 'Motorsport', 'Art', 'Sports', 'Dining', 'Gala', 'Fashion']

function formatEventDate(dateStr, endDateStr) {
  const opts = { month: 'short', day: 'numeric' }
  const start = new Date(dateStr).toLocaleDateString('en-US', opts)
  if (!endDateStr || endDateStr === dateStr) return start
  const end = new Date(endDateStr)
  const endOpts = end.getMonth() === new Date(dateStr).getMonth()
    ? { day: 'numeric' }
    : opts
  return `${start} – ${end.toLocaleDateString('en-US', endOpts)}`
}

function EventRequestSheet({ event, isOpen, onClose, onSubmit }) {
  const [notes, setNotes] = useState('')

  if (!event) return null

  const handleSubmit = () => {
    onSubmit({
      type: `Event Access — ${event.title}`,
      category: 'lifestyle',
      notes,
      priority: 'standard',
      needBy: event.date,
    })
    setNotes('')
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Request Access">
      <SheetContent>
        <SheetEventInfo>
          <SheetEventTitle>{event.title}</SheetEventTitle>
          <SheetEventDate>{formatEventDate(event.date, event.endDate)} · {event.venue}</SheetEventDate>
        </SheetEventInfo>
        <div>
          <FieldLabel>Any specific requests or questions?</FieldLabel>
          <TextArea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Number of guests, seating preferences, transportation needed..."
          />
        </div>
        <PrimaryButton fullWidth onClick={handleSubmit}>Request Access</PrimaryButton>
        <SheetFooter>Avara will confirm availability and arrange access.</SheetFooter>
      </SheetContent>
    </BottomSheet>
  )
}

export default function EventsScreen() {
  const [filter, setFilter] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { addRequest } = useRequests()
  const { showToast } = useToast()

  const filtered = EVENTS.filter(e => filter === 'All' || e.category === filter)

  const handleSubmit = (data) => {
    addRequest(data)
    showToast("Request sent. We'll be in touch.")
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Upcoming Events</PageTitle>
        <PageSub>Curated access to Scottsdale & beyond — we handle every detail.</PageSub>
      </PageHeader>

      <FilterRow>
        {CATEGORIES.map(cat => {
          const Icon = CATEGORY_ICONS[cat]
          return (
            <FilterChip key={cat} $active={filter === cat} onClick={() => setFilter(cat)}>
              {Icon && <Icon size={12} />}
              {cat}
            </FilterChip>
          )
        })}
      </FilterRow>

      <EventList>
        {filtered.map(event => {
          const Icon = CATEGORY_ICONS[event.category] || CalendarDays
          return (
            <EventCard key={event.id} onClick={() => setSelectedEvent(event)} aria-label={event.title}>
              <EventCardInner>
                <EventTop>
                  <EventIconBox>
                    <Icon size={20} color={theme.colors.gold} />
                  </EventIconBox>
                  <EventMeta>
                    <EventTitle>{event.title}</EventTitle>
                    <EventDateVenue>
                      <EventDate>
                        <CalendarDays size={11} />
                        {formatEventDate(event.date, event.endDate)}
                      </EventDate>
                      <EventVenue>
                        <MapPin size={11} />
                        {event.venue}
                      </EventVenue>
                    </EventDateVenue>
                  </EventMeta>
                  <CategoryTag>{event.category}</CategoryTag>
                </EventTop>
                <EventDesc>{event.description}</EventDesc>
              </EventCardInner>
              <RequestAccessRow>
                <RequestAccessLabel>Request Access &amp; Details</RequestAccessLabel>
                <ChevronRight size={16} color={theme.colors.gold} />
              </RequestAccessRow>
            </EventCard>
          )
        })}
      </EventList>

      <EventRequestSheet
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
