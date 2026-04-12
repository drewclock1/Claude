import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
  Star, Home as HomeIcon, CalendarPlus, Compass, MessageCircle, AlertCircle, Phone
} from 'lucide-react'
import { theme } from '../styles/theme'
import { GoldCard } from '../components/ui/Card'
import StatusDot from '../components/ui/StatusDot'
import BottomSheet from '../components/layout/BottomSheet'
import { PrimaryButton, GhostButton } from '../components/ui/Button'
import { getVisits, getArrivals, getRequests } from '../data/storage'

const Page = styled.div`
  padding: 24px 20px 32px;
  max-width: 600px;
  margin: 0 auto;
`

const GreetingLine = styled(motion.h1)`
  font-family: ${theme.fonts.serif};
  font-size: 2rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  line-height: 1.15;
  margin-bottom: 6px;

  em {
    font-style: italic;
    color: ${theme.colors.goldLight};
  }
`

const GreetingSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  margin-bottom: 2px;
`

const SectionLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
  margin-top: 28px;
`

const PropertyCard = styled(GoldCard)`
  cursor: pointer;
  margin-top: 20px;
`

const PropHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`

const PropLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const PropAddress1 = styled.p`
  font-family: ${theme.fonts.serif};
  font-size: 1.1rem;
  color: ${theme.colors.cream};
  font-weight: 400;
`

const PropAddress2 = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  margin-top: 2px;
`

const Divider = styled.div`
  height: 1px;
  background: rgba(184,150,106,0.2);
  margin: 14px 0;
`

const PropStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
`

const StatItem = styled.div``

const StatLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 2px;
`

const StatValue = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  color: ${theme.colors.cream};
  font-weight: 500;
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
`

const StatusText = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  color: ${p => p.$color || theme.colors.cream};
`

const ProgressBar = styled.div`
  height: 3px;
  background: rgba(184,150,106,0.12);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 6px;
`

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${theme.colors.gold};
  border-radius: 2px;
`

const ProgressLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.muted};
`

const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`

const QuickCard = styled(motion.button)`
  background: ${theme.colors.surface};
  border: 1px solid ${p => p.$amber ? 'rgba(192,128,64,0.25)' : 'rgba(184,150,106,0.15)'};
  border-radius: 14px;
  padding: 20px 16px;
  text-align: left;
  cursor: pointer;
  position: relative;
  min-height: 44px;
`

const QuickIcon = styled.div`
  color: ${p => p.$amber ? theme.colors.amber : theme.colors.gold};
  margin-bottom: 10px;
  line-height: 0;
`

const QuickLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: 500;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
`

const QuickSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 300;
  color: ${theme.colors.muted};
`

const CornerBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${p => p.$dot ? theme.colors.gold : theme.colors.goldPale};
  color: ${theme.colors.bg};
  font-size: 0.6rem;
  font-weight: 700;
  padding: ${p => p.$dot ? 0 : '2px 8px'};
  border-radius: ${theme.radius.full};
  width: ${p => p.$dot ? '10px' : 'auto'};
  height: ${p => p.$dot ? '10px' : 'auto'};
`

const ArrivalStrip = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.15);
  border-radius: ${theme.radius.lg};
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  cursor: pointer;
`

const ArrivalText = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  flex: 1;
`

const ArrivalLink = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  font-weight: 500;
  color: ${theme.colors.gold};
  flex-shrink: 0;
  margin-left: 12px;
`

const EmergencySheetContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding-top: 8px;
`

const EmergencyText = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.9rem;
  color: ${theme.colors.muted};
  line-height: 1.6;
`

const CancelLink = styled.button`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 4px;
`

function greeting(firstName) {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return `Good morning, `
  if (h >= 12 && h < 17) return `Good afternoon, `
  return `Good evening, `
}

function relativeDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = Math.round((now - d) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7) return `${diff} days ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function daysUntil(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24))
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' } }),
}

export default function HomeScreen({ client }) {
  const navigate = useNavigate()
  const [emergencyOpen, setEmergencyOpen] = useState(false)

  const visits = getVisits()
  const arrivals = getArrivals()
  const requests = getRequests()

  const lastVisit = visits[0]
  const nextArrival = arrivals.find(a => daysUntil(a.date) >= 0 && daysUntil(a.date) <= 60)
  const daysToNextVisit = client ? daysUntil(client.nextArrival) : 7
  const progressPct = Math.max(0, Math.min(100, (1 - daysToNextVisit / 7) * 100))

  const hasUpcomingArrival = !!nextArrival
  const unreadMsgs = 0

  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  if (!client) return null

  return (
    <Page>
      {/* Greeting */}
      <GreetingLine
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {greeting(client.firstName)}<em>{client.firstName}.</em>
      </GreetingLine>
      <GreetingSub>{todayStr}</GreetingSub>
      <GreetingSub>Paradise Valley · 78° Sunny</GreetingSub>

      {/* Property Status Card */}
      <PropertyCard
        onClick={() => navigate('/property')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileTap={{ scale: 0.99 }}
      >
        <PropHeader>
          <PropLabel>Your Estate</PropLabel>
          <StatusDot
            $status={lastVisit?.overallStatus === 'clear' ? 'good' : 'attention'}
            $size="10px"
          />
        </PropHeader>

        <PropAddress1>{client.addressLine1}</PropAddress1>
        <PropAddress2>{client.addressLine2}</PropAddress2>

        <Divider />

        <PropStats>
          <StatItem>
            <StatLabel>Last visit</StatLabel>
            <StatValue>{lastVisit ? relativeDate(lastVisit.date) : '—'}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Next visit</StatLabel>
            <StatValue>{client.nextArrival ? formatShortDate(client.nextArrival) : '—'}</StatValue>
          </StatItem>
        </PropStats>

        <StatusRow>
          <StatusDot
            $status={lastVisit?.overallStatus === 'clear' ? 'good' : 'attention'}
            $size="7px"
          />
          <StatusText $color={lastVisit?.overallStatus === 'clear' ? theme.colors.success : theme.colors.amber}>
            {lastVisit?.overallStatus === 'clear'
              ? 'Everything looks great.'
              : `${lastVisit?.items?.length || 1} item noted — resolved.`
            }
          </StatusText>
        </StatusRow>

        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(10, 100 - (daysToNextVisit / 7) * 100)}%` }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </ProgressBar>
        <ProgressLabel>
          Next visit {daysToNextVisit > 0 ? `in ${daysToNextVisit} days` : 'today'}
        </ProgressLabel>
      </PropertyCard>

      {/* Quick Actions */}
      <SectionLabel>What do you need?</SectionLabel>

      <QuickGrid>
        {[
          { label: 'I Need Something', sub: 'Any request, handled fast', Icon: Star, path: '/requests' },
          { label: 'My Home', sub: 'Visits, reports & systems', Icon: HomeIcon, path: '/property' },
          { label: 'Arrival Prep', sub: 'Get your home ready', Icon: CalendarPlus, path: '/arrival', badge: hasUpcomingArrival ? 'Confirmed' : null },
          { label: 'Lifestyle', sub: 'Dining, travel & experiences', Icon: Compass, path: '/lifestyle' },
          { label: 'Message Avara', sub: 'Talk to your team', Icon: MessageCircle, path: '/messages', dot: unreadMsgs > 0 },
          { label: 'Emergency', sub: 'Needs attention now', Icon: AlertCircle, amber: true, emergency: true },
        ].map(({ label, sub, Icon, path, badge, dot, amber, emergency }, i) => (
          <QuickCard
            key={label}
            $amber={amber}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => {
              if (emergency) setEmergencyOpen(true)
              else if (path) navigate(path)
            }}
            aria-label={label}
          >
            <QuickIcon $amber={amber}><Icon size={24} /></QuickIcon>
            <QuickLabel>{label}</QuickLabel>
            <QuickSub>{sub}</QuickSub>
            {badge && <CornerBadge>{badge}</CornerBadge>}
            {dot && <CornerBadge $dot />}
          </QuickCard>
        ))}
      </QuickGrid>

      {/* Arrival Strip */}
      {hasUpcomingArrival ? (
        <ArrivalStrip
          onClick={() => navigate('/arrival')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.99 }}
        >
          <ArrivalText>
            Your arrival is in {daysUntil(nextArrival.date)} days ·{' '}
            {formatShortDate(nextArrival.date)} · Prep confirmed
          </ArrivalText>
          <ArrivalLink>View →</ArrivalLink>
        </ArrivalStrip>
      ) : (
        <ArrivalStrip
          onClick={() => navigate('/arrival')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.99 }}
        >
          <ArrivalText>Plan your next visit →</ArrivalText>
          <ArrivalLink style={{ color: theme.colors.gold }}>Start</ArrivalLink>
        </ArrivalStrip>
      )}

      {/* Emergency Sheet */}
      <BottomSheet
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        title="Call Avara Home"
      >
        <EmergencySheetContent>
          <EmergencyText>
            Your team is available 24/7. Tap below to call directly.
          </EmergencyText>
          <PrimaryButton
            fullWidth
            as="a"
            href="tel:7017209050"
            aria-label="Call Avara Home"
            style={{ textDecoration: 'none' }}
          >
            Call (701) 720-9050
          </PrimaryButton>
          <CancelLink onClick={() => setEmergencyOpen(false)}>Cancel</CancelLink>
        </EmergencySheetContent>
      </BottomSheet>
    </Page>
  )
}
