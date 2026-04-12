import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
  UtensilsCrossed, Car, Plane, ChefHat, Anchor, Ticket,
  Gift, Map, ChevronRight
} from 'lucide-react'
import { theme } from '../styles/theme'
import BottomSheet from '../components/layout/BottomSheet'
import { PrimaryButton } from '../components/ui/Button'
import { StatusBadge } from '../components/ui/Badge'
import { useRequests } from '../hooks/useRequests'
import { useToast } from '../hooks/useToast'

const Page = styled.div`
  padding: 28px 20px 40px;
  max-width: 600px;
  margin: 0 auto;
`

const PageTitle = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: 2rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
`

const PageSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  color: ${theme.colors.muted};
  font-style: italic;
  margin-bottom: 24px;
`

const QuickRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 28px;
  padding-bottom: 4px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const QuickChip = styled(motion.button)`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  padding: 8px 16px;
  border-radius: ${theme.radius.full};
  border: 1px solid rgba(184,150,106,0.25);
  color: ${theme.colors.muted};
  background: ${theme.colors.surface};
  cursor: pointer;
  white-space: nowrap;
  min-height: 40px;
  flex-shrink: 0;
`

const QuickLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
`

const FeaturedCard = styled.div`
  background: linear-gradient(135deg, #2A1F14 0%, #1A1612 60%, #251D15 100%);
  border: 1px solid rgba(184,150,106,0.3);
  border-radius: ${theme.radius.xl};
  padding: 24px;
  position: relative;
  margin-bottom: 28px;
`

const FeaturedBadge = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.6rem;
  font-weight: 700;
  color: ${theme.colors.gold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(184,150,106,0.1);
  padding: 4px 10px;
  border-radius: ${theme.radius.full};
  border: 1px solid rgba(184,150,106,0.2);
`

const FeaturedTitle = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: 1.3rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  margin-bottom: 10px;
  margin-top: 8px;
  padding-right: 80px;
`

const FeaturedDesc = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  color: ${theme.colors.muted};
  line-height: 1.6;
  margin-bottom: 16px;
`

const ArrangeBtn = styled(motion.button)`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${theme.colors.gold};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
`

const SectionLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 12px;
    background: ${theme.colors.gold};
    border-radius: 2px;
  }
`

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 28px;
`

const ServiceTile = styled(motion.button)`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.15);
  border-radius: 12px;
  padding: 18px 16px;
  text-align: left;
  cursor: pointer;
`

const TileIcon = styled.div`
  color: ${theme.colors.gold};
  margin-bottom: 10px;
  line-height: 0;
`

const TileLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
`

const TileSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 300;
  color: ${theme.colors.muted};
`

const SpotlightScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  margin-bottom: 28px;
  padding-bottom: 4px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const SpotlightCard = styled(motion.button)`
  width: 260px;
  flex-shrink: 0;
  background: ${theme.colors.surfaceRaised};
  border: 1px solid rgba(184,150,106,0.15);
  border-radius: ${theme.radius.lg};
  padding: 16px;
  text-align: left;
  cursor: pointer;
  position: relative;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const SpotlightTag = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.65rem;
  font-weight: 600;
  color: ${theme.colors.gold};
  background: rgba(184,150,106,0.12);
  padding: 3px 10px;
  border-radius: ${theme.radius.full};
  border: 1px solid rgba(184,150,106,0.2);
  position: absolute;
  top: 14px;
  left: 14px;
`

const SpotlightTitle = styled.p`
  font-family: ${theme.fonts.serif};
  font-size: 0.95rem;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
  line-height: 1.3;
`

const SpotlightSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.muted};
  line-height: 1.4;
`

const RecentCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.12);
  border-radius: ${theme.radius.md};
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

// Sheet
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

  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  &::placeholder { color: ${theme.colors.faint}; }
`

const SheetFooter = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  color: ${theme.colors.muted};
  text-align: center;
`

const SERVICES = [
  { type: 'Private Dining', sub: 'Any restaurant, any night, any table.', Icon: UtensilsCrossed },
  { type: 'Luxury Vehicles', sub: 'Exotic sourcing, delivery and return.', Icon: Car },
  { type: 'Private Aviation', sub: 'Wheels up on your schedule.', Icon: Plane },
  { type: 'Yacht & Water', sub: 'From Lake Pleasant to open water.', Icon: Anchor },
  { type: 'In-Home Chef', sub: 'A private chef for any occasion.', Icon: ChefHat },
  { type: 'VIP Events', sub: "The event you thought was sold out.", Icon: Ticket },
  { type: 'Personal Shopping', sub: "We source what money can't easily buy.", Icon: Gift },
  { type: 'Bespoke Travel', sub: 'Itineraries built around your life.', Icon: Map },
]

const QUICK_CHIPS = ['Dinner Res', 'Private Jet', 'Car Service', 'Event Tickets', 'Grocery', 'Gift']

const SPOTLIGHTS = [
  {
    tag: 'Dining',
    title: 'The Best New Tables in Scottsdale Right Now',
    sub: "From Virtu to Mastro's, we have relationships at every room that matters.",
  },
  {
    tag: 'Wellness',
    title: 'Sanctuary Camelback Mountain: What Members Are Booking',
    sub: 'Spa experiences, private cabanas, and the best views in Paradise Valley.',
  },
  {
    tag: 'Entertainment',
    title: "Barrett-Jackson & Beyond: Scottsdale's Exclusive Event Calendar",
    sub: 'Charity galas, private viewings, and members-only access — we handle the details.',
  },
]

function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function ArrangeSheet({ service, isOpen, onClose, onSubmit }) {
  const [notes, setNotes] = useState('')
  if (!service) return null

  const handleSubmit = () => {
    onSubmit({ type: service, category: 'lifestyle', notes })
    setNotes('')
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={service}>
      <SheetContent>
        <PrefilledNote>We'll handle every detail. Any specifics we should know?</PrefilledNote>
        <div>
          <FieldLabel>Details</FieldLabel>
          <TextArea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Dates, party size, preferences, budget, or anything else…"
          />
        </div>
        <PrimaryButton fullWidth onClick={handleSubmit}>Send to Avara</PrimaryButton>
        <SheetFooter>Your team will confirm within the hour.</SheetFooter>
      </SheetContent>
    </BottomSheet>
  )
}

export default function LifestyleScreen() {
  const navigate = useNavigate()
  const [activeSheet, setActiveSheet] = useState(null)
  const { requests, addRequest } = useRequests()
  const { showToast } = useToast()

  const recentArrangements = requests
    .filter(r => r.category === 'lifestyle' || r.category === 'shopping')
    .slice(0, 3)

  const handleSubmit = (data) => {
    addRequest(data)
    showToast("Request received. We're on it.")
  }

  return (
    <Page>
      <PageTitle>Your Arizona</PageTitle>
      <PageSub>Curated experiences, effortlessly arranged.</PageSub>

      {/* Quick Arrange */}
      <QuickLabel>Arrange quickly:</QuickLabel>
      <QuickRow>
        {QUICK_CHIPS.map(chip => (
          <QuickChip
            key={chip}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSheet(chip)}
            aria-label={chip}
          >
            {chip}
          </QuickChip>
        ))}
      </QuickRow>

      {/* Featured Card */}
      <FeaturedCard>
        <FeaturedBadge>FEATURED</FeaturedBadge>
        <FeaturedTitle>Private Evening at The Phoenician</FeaturedTitle>
        <FeaturedDesc>
          An exclusive private dining experience in a reserved terrace. Up to 12 guests.
          Wine pairings, dedicated service staff. We handle every detail.
        </FeaturedDesc>
        <ArrangeBtn
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveSheet('Private Event Arrangement')}
          aria-label="Arrange this experience"
        >
          Arrange This Experience <ChevronRight size={14} />
        </ArrangeBtn>
      </FeaturedCard>

      {/* What We Arrange */}
      <SectionLabel>What we arrange for you</SectionLabel>
      <ServiceGrid>
        {SERVICES.map(({ type, sub, Icon }) => (
          <ServiceTile
            key={type}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setActiveSheet(type)}
            aria-label={type}
          >
            <TileIcon><Icon size={22} /></TileIcon>
            <TileLabel>{type}</TileLabel>
            <TileSub>{sub}</TileSub>
          </ServiceTile>
        ))}
      </ServiceGrid>

      {/* Scottsdale Spotlight */}
      <SectionLabel>Scottsdale Spotlight</SectionLabel>
      <SpotlightScroll>
        {SPOTLIGHTS.map(({ tag, title, sub }, i) => (
          <SpotlightCard
            key={i}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveSheet('Lifestyle Request')}
            aria-label={title}
          >
            <SpotlightTag>{tag}</SpotlightTag>
            <SpotlightTitle>{title}</SpotlightTitle>
            <SpotlightSub>{sub}</SpotlightSub>
          </SpotlightCard>
        ))}
      </SpotlightScroll>

      {/* Recent Arrangements */}
      <SectionLabel>Recent Arrangements</SectionLabel>
      {recentArrangements.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.88rem', color: theme.colors.muted, marginBottom: 14 }}>
            Nothing yet — your first arrangement is one tap away.
          </p>
          <PrimaryButton onClick={() => navigate('/requests')} aria-label="Arrange something">
            Arrange Something
          </PrimaryButton>
        </div>
      ) : (
        recentArrangements.map(r => (
          <RecentCard key={r.id}>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.88rem', fontWeight: 500, color: theme.colors.cream, marginBottom: 2 }}>
                {r.type}
              </p>
              <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.75rem', color: theme.colors.muted }}>
                {formatShortDate(r.submittedAt)}
              </p>
            </div>
            <StatusBadge status={r.status} />
          </RecentCard>
        ))
      )}

      <ArrangeSheet
        service={activeSheet}
        isOpen={!!activeSheet}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
