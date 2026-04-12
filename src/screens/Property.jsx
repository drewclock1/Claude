import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import {
  Wind, Waves, Trees, Shield, Droplets, Bug, ChevronDown, ChevronUp, Phone
} from 'lucide-react'
import { theme } from '../styles/theme'
import { GoldCard } from '../components/ui/Card'
import StatusDot from '../components/ui/StatusDot'
import BottomSheet from '../components/layout/BottomSheet'
import { PrimaryButton } from '../components/ui/Button'
import { getVisits } from '../data/storage'

const Page = styled.div`
  padding: 0 0 32px;
  max-width: 600px;
  margin: 0 auto;
`

const Hero = styled.div`
  background: linear-gradient(180deg, ${theme.colors.surfaceRaised} 0%, ${theme.colors.bg} 100%);
  padding: 28px 20px 24px;
`

const HeroLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
`

const HeroAddress1 = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: 1.6rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
`

const HeroAddress2 = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.9rem;
  color: ${theme.colors.muted};
  margin-bottom: 20px;
`

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
`

const HeroStat = styled.div`
  text-align: center;
  padding: 0 8px;
  border-right: 1px solid rgba(184,150,106,0.12);

  &:last-child { border-right: none; }
  &:first-child { padding-left: 0; }
`

const HeroStatLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.65rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
`

const HeroStatValue = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  font-weight: 500;
  color: ${theme.colors.cream};
`

const Section = styled.div`
  padding: 0 20px;
  margin-top: 28px;
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

const SystemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

const SystemTile = styled(motion.button)`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.12);
  border-radius: ${theme.radius.lg};
  padding: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 44px;
`

const SystemName = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  font-weight: 500;
  color: ${theme.colors.cream};
`

const SystemStatus = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 300;
  color: ${theme.colors.muted};
`

const SystemLastService = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.65rem;
  color: ${theme.colors.faint};
`

const SystemTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const VisitRow = styled.div`
  border-bottom: 1px solid rgba(184,150,106,0.08);
  overflow: hidden;
`

const VisitHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`

const VisitDate = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: 500;
  color: ${theme.colors.cream};
  width: 44px;
  flex-shrink: 0;
`

const VisitSummaryShort = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const VisitExpanded = styled(motion.div)`
  padding: 0 0 16px;
`

const VisitFullSummary = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  color: ${theme.colors.cream};
  line-height: 1.6;
  margin-bottom: 12px;
`

const VisitItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
`

const VisitItemText = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  line-height: 1.4;
`

const StatusChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: ${theme.radius.full};
  font-family: ${theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 500;
  background: ${p => p.$status === 'clear' ? theme.colors.successBg : theme.colors.amberBg};
  color: ${p => p.$status === 'clear' ? theme.colors.success : theme.colors.amber};
  margin-top: 10px;
`

const VendorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(184,150,106,0.08);
`

const VendorCat = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.7rem;
  color: ${theme.colors.muted};
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.12);
  padding: 2px 8px;
  border-radius: ${theme.radius.full};
  flex-shrink: 0;
  width: 90px;
  text-align: center;
`

const VendorName = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  color: ${theme.colors.cream};
  font-weight: 500;
  flex: 1;
`

const CallBtn = styled.a`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  font-weight: 500;
  color: ${theme.colors.gold};
  background: rgba(184,150,106,0.1);
  border: 1px solid rgba(184,150,106,0.2);
  padding: 6px 14px;
  border-radius: ${theme.radius.full};
  display: inline-block;
  text-decoration: none;
  min-height: 44px;
  display: flex;
  align-items: center;
`

const SYSTEM_ICONS = {
  hvac: Wind,
  pool: Waves,
  landscaping: Trees,
  security: Shield,
  irrigation: Droplets,
  pest: Bug,
}

const SYSTEM_NAMES = {
  hvac: 'HVAC',
  pool: 'Pool',
  landscaping: 'Landscaping',
  security: 'Security',
  irrigation: 'Irrigation',
  pest: 'Pest Control',
}

function relativeDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  const now = new Date()
  const diff = Math.round((now - d) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return '1 day ago'
  if (diff < 7) return `${diff} days ago`
  if (diff < 30) return `${Math.round(diff / 7)}w ago`
  return `${Math.round(diff / 30)}mo ago`
}

function monthsSince(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  return `${months} month${months !== 1 ? 's' : ''}`
}

function formatShort(dateStr) {
  if (!dateStr) return 'None scheduled'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatVisitDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function PropertyScreen({ client }) {
  const [openSystemId, setOpenSystemId] = useState(null)
  const [expandedVisit, setExpandedVisit] = useState(null)

  const visits = getVisits()
  const lastVisit = visits[0]

  if (!client) return null

  const systemEntries = Object.entries(client.systemsHealth || {})

  const activeSystem = openSystemId
    ? { key: openSystemId, ...client.systemsHealth[openSystemId] }
    : null

  const activeVendor = activeSystem?.vendorId
    ? client.vendors.find(v => v.id === activeSystem.vendorId)
    : null

  return (
    <Page>
      {/* Hero */}
      <Hero>
        <HeroLabel>Your Estate</HeroLabel>
        <HeroAddress1>{client.addressLine1}</HeroAddress1>
        <HeroAddress2>{client.addressLine2}</HeroAddress2>
        <HeroStats>
          <HeroStat>
            <HeroStatLabel>Last Visit</HeroStatLabel>
            <HeroStatValue>{lastVisit ? relativeDate(lastVisit.date) : '—'}</HeroStatValue>
          </HeroStat>
          <HeroStat>
            <HeroStatLabel>Next Visit</HeroStatLabel>
            <HeroStatValue>
              {client.nextArrival
                ? new Date(client.nextArrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '—'}
            </HeroStatValue>
          </HeroStat>
          <HeroStat>
            <HeroStatLabel>With Avara</HeroStatLabel>
            <HeroStatValue>{monthsSince(client.memberSince)}</HeroStatValue>
          </HeroStat>
          <HeroStat>
            <HeroStatLabel>Property</HeroStatLabel>
            <HeroStatValue>{client.property.sqft.toLocaleString()} sq ft</HeroStatValue>
          </HeroStat>
        </HeroStats>
      </Hero>

      {/* Last Visit Card */}
      {lastVisit && (
        <Section>
          <GoldCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: theme.fonts.sans, fontSize: '0.68rem', color: theme.colors.gold, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Most Recent Visit
              </span>
              <span style={{ fontFamily: theme.fonts.sans, fontSize: '0.78rem', color: theme.colors.muted }}>
                {formatVisitDate(lastVisit.date)}
              </span>
            </div>
            <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.88rem', color: theme.colors.cream, lineHeight: 1.6, marginBottom: 10 }}>
              {lastVisit.summary}
            </p>
            {lastVisit.items?.map((item, i) => (
              <VisitItemRow key={i}>
                <StatusDot $status={item.type === 'noted' ? 'attention' : 'good'} $size="7px" style={{ marginTop: 4 }} />
                <VisitItemText>{item.text}</VisitItemText>
              </VisitItemRow>
            ))}
            <StatusChip $status={lastVisit.overallStatus}>
              <StatusDot $status={lastVisit.overallStatus === 'clear' ? 'good' : 'attention'} $size="7px" />
              {lastVisit.overallStatus === 'clear' ? 'All Clear' : 'Item Noted'}
            </StatusChip>
          </GoldCard>
        </Section>
      )}

      {/* Systems Health */}
      <Section>
        <SectionLabel>Property Systems</SectionLabel>
        <SystemsGrid>
          {systemEntries.map(([key, sys]) => {
            const Icon = SYSTEM_ICONS[key] || Shield
            return (
              <SystemTile
                key={key}
                onClick={() => setOpenSystemId(key)}
                whileTap={{ scale: 0.97 }}
                aria-label={SYSTEM_NAMES[key]}
              >
                <SystemTopRow>
                  <Icon size={20} color={theme.colors.gold} />
                  <StatusDot $status={sys.status === 'good' ? 'good' : 'attention'} $size="8px" />
                </SystemTopRow>
                <SystemName>{SYSTEM_NAMES[key]}</SystemName>
                <SystemStatus>{sys.label}</SystemStatus>
                <SystemLastService>Last: {relativeDate(sys.lastService)}</SystemLastService>
              </SystemTile>
            )
          })}
        </SystemsGrid>
      </Section>

      {/* Visit History */}
      <Section>
        <SectionLabel>Visit History</SectionLabel>
        {visits.map(v => (
          <VisitRow key={v.id}>
            <VisitHeader onClick={() => setExpandedVisit(expandedVisit === v.id ? null : v.id)}>
              <VisitDate>{formatVisitDate(v.date)}</VisitDate>
              <VisitSummaryShort>{v.summary.substring(0, 60)}...</VisitSummaryShort>
              <StatusDot $status={v.overallStatus === 'clear' ? 'good' : 'attention'} $size="8px" />
              {expandedVisit === v.id ? <ChevronUp size={14} color={theme.colors.muted} /> : <ChevronDown size={14} color={theme.colors.muted} />}
            </VisitHeader>
            <AnimatePresence>
              {expandedVisit === v.id && (
                <VisitExpanded
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <VisitFullSummary>{v.summary}</VisitFullSummary>
                  {v.items?.map((item, i) => (
                    <VisitItemRow key={i}>
                      <StatusDot $status="attention" $size="7px" style={{ marginTop: 4 }} />
                      <VisitItemText>{item.text}</VisitItemText>
                    </VisitItemRow>
                  ))}
                  <StatusChip $status={v.overallStatus}>
                    <StatusDot $status={v.overallStatus === 'clear' ? 'good' : 'attention'} $size="7px" />
                    {v.overallStatus === 'clear' ? 'All Clear' : 'Item Noted'}
                  </StatusChip>
                </VisitExpanded>
              )}
            </AnimatePresence>
          </VisitRow>
        ))}
      </Section>

      {/* Vendors */}
      <Section>
        <SectionLabel>Your Vendors</SectionLabel>
        {client.vendors.map(v => (
          <VendorRow key={v.id}>
            <VendorCat>{v.category}</VendorCat>
            <VendorName>{v.name}</VendorName>
            <CallBtn href={`tel:${v.phone.replace(/\D/g, '')}`} aria-label={`Call ${v.name}`}>
              Call
            </CallBtn>
          </VendorRow>
        ))}
      </Section>

      {/* System Detail Sheet */}
      <BottomSheet
        isOpen={!!activeSystem}
        onClose={() => setOpenSystemId(null)}
        title={activeSystem ? SYSTEM_NAMES[activeSystem.key] : ''}
      >
        {activeSystem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusDot $status={activeSystem.status === 'good' ? 'good' : 'attention'} $size="10px" />
              <span style={{ fontFamily: theme.fonts.sans, fontSize: '0.9rem', color: activeSystem.status === 'good' ? theme.colors.success : theme.colors.amber }}>
                {activeSystem.label}
              </span>
            </div>
            <div>
              <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.72rem', color: theme.colors.muted, marginBottom: 4 }}>LAST SERVICE</p>
              <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.9rem', color: theme.colors.cream }}>{formatShort(activeSystem.lastService)}</p>
            </div>
            <div>
              <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.72rem', color: theme.colors.muted, marginBottom: 4 }}>NEXT SERVICE</p>
              <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.9rem', color: theme.colors.cream }}>{formatShort(activeSystem.nextService)}</p>
            </div>
            {activeVendor && (
              <div>
                <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.72rem', color: theme.colors.muted, marginBottom: 8 }}>VENDOR</p>
                <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.9rem', color: theme.colors.cream, marginBottom: 4 }}>{activeVendor.name}</p>
                <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.8rem', color: theme.colors.muted, marginBottom: 12 }}>{activeVendor.contact}</p>
                <CallBtn href={`tel:${activeVendor.phone.replace(/\D/g, '')}`} aria-label={`Call ${activeVendor.name}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={14} /> Call {activeVendor.phone}
                </CallBtn>
              </div>
            )}
          </div>
        )}
      </BottomSheet>
    </Page>
  )
}
