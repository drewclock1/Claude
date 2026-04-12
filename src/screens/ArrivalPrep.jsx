import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import {
  ShoppingBag, Thermometer, Flower2, Waves, Wine, Sparkles, Bed, ChefHat, Check
} from 'lucide-react'
import { theme } from '../styles/theme'
import { GoldCard } from '../components/ui/Card'
import Toggle from '../components/ui/Toggle'
import { PrimaryButton, SecondaryButton } from '../components/ui/Button'
import { getArrivals, addArrival } from '../data/storage'
import { useToast } from '../hooks/useToast'

const Page = styled.div`
  padding: 28px 20px 40px;
  max-width: 600px;
  margin: 0 auto;
`

const PageTitle = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: 1.6rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  margin-bottom: 4px;
`

const PageSub = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  color: ${theme.colors.muted};
  margin-bottom: 24px;
`

// Confirmed State
const CountdownCard = styled(GoldCard)`
  text-align: center;
  padding: 32px 24px;
  margin-bottom: 20px;
`

const CountdownNumber = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 3rem;
  color: ${theme.colors.gold};
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
`

const CountdownLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  color: ${theme.colors.muted};
  margin-bottom: 4px;
`

const CountdownDate = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  color: ${theme.colors.faint};
`

const PrepSection = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.15);
  border-radius: ${theme.radius.lg};
  padding: 20px;
  margin-bottom: 16px;
`

const PrepSectionLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
  font-weight: 500;
`

const PrepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`

const CheckIcon = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${theme.colors.successBg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const PrepItemText = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  color: ${theme.colors.cream};
`

const NotesSection = styled.div`
  background: rgba(184,150,106,0.05);
  border-left: 2px solid rgba(184,150,106,0.3);
  padding: 12px 16px;
  border-radius: 0 ${theme.radius.sm} ${theme.radius.sm} 0;
  margin-bottom: 20px;
`

const NotesSectionLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
`

const NotesText = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  color: ${theme.colors.cream};
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

// Plan State
const StepSection = styled.div`
  margin-bottom: 24px;
`

const StepLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
`

const DateInput = styled.input`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid ${p => p.$error ? theme.colors.amber : 'rgba(184,150,106,0.2)'};
  border-radius: ${theme.radius.md};
  padding: 14px 16px;
  color: ${theme.colors.cream};
  font-family: ${theme.fonts.sans};
  font-size: 0.95rem;
  transition: border-color 0.15s;

  &:focus { outline: none; border-color: ${theme.colors.gold}; }
`

const ErrorNote = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  color: ${theme.colors.amber};
  margin-top: 6px;
`

const HintNote = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  margin-top: 6px;
`

const GuestPills = styled.div`
  display: flex;
  gap: 8px;
`

const GuestPill = styled.button`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  padding: 8px 16px;
  border-radius: ${theme.radius.full};
  border: 1px solid ${p => p.$active ? theme.colors.gold : 'rgba(184,150,106,0.2)'};
  color: ${p => p.$active ? theme.colors.gold : theme.colors.muted};
  background: ${p => p.$active ? theme.colors.goldPale : theme.colors.surface};
  cursor: pointer;
  transition: all 0.15s;
  min-height: 44px;
`

const PrepToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(184,150,106,0.07);

  &:last-child { border-bottom: none; }
`

const PrepToggleIcon = styled.div`
  color: ${theme.colors.gold};
  line-height: 0;
  flex-shrink: 0;
`

const PrepToggleLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  color: ${theme.colors.cream};
  flex: 1;
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
  margin-top: 8px;
  transition: border-color 0.15s;

  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  &::placeholder { color: ${theme.colors.faint}; }
`

const ChefNoteInput = styled.input`
  width: 100%;
  background: rgba(184,150,106,0.05);
  border: 1px solid rgba(184,150,106,0.15);
  border-radius: ${theme.radius.md};
  padding: 10px 12px;
  color: ${theme.colors.cream};
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  margin-top: 10px;
  transition: border-color 0.15s;

  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  &::placeholder { color: ${theme.colors.faint}; }
`

function daysUntil(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24))
}

function formatLong(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })
}

const CONFIRMED_PREPS = [
  { key: 'groceries', label: 'Groceries stocked to your list' },
  { key: 'temperature', label: 'Temperature set to 72°' },
  { key: 'flowers', label: 'Fresh flowers (white peonies)' },
  { key: 'pool', label: 'Pool ready at 86°' },
  { key: 'wine', label: 'Jordan Chardonnay chilled' },
  { key: 'cleaning', label: 'Full cleaning day before arrival' },
  { key: 'guestRoom', label: 'Guest room prepared' },
  { key: 'mealRequest', label: 'In-home chef meal on arrival' },
]

const DEFAULT_PREPS = {
  groceries: true,
  temperature: true,
  flowers: true,
  pool: true,
  wine: true,
  cleaning: true,
  guestRoom: false,
  mealRequest: false,
}

const PREP_ICONS = {
  groceries: ShoppingBag,
  temperature: Thermometer,
  flowers: Flower2,
  pool: Waves,
  wine: Wine,
  cleaning: Sparkles,
  guestRoom: Bed,
  mealRequest: ChefHat,
}

export default function ArrivalPrepScreen() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const arrivals = getArrivals()
  const upcoming = arrivals.find(a => daysUntil(a.date) >= 0)

  const [planMode, setPlanMode] = useState(!upcoming)
  const [arrivalDate, setArrivalDate] = useState('')
  const [dateError, setDateError] = useState(false)
  const [guests, setGuests] = useState('just-me')
  const [preps, setPreps] = useState(DEFAULT_PREPS)
  const [notes, setNotes] = useState('')
  const [chefNote, setChefNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [newArrival, setNewArrival] = useState(null)

  const activeArrival = newArrival || upcoming

  const handleSubmit = () => {
    if (!arrivalDate) {
      setDateError(true)
      return
    }
    setDateError(false)

    const arr = {
      id: `arr_${Date.now()}`,
      date: arrivalDate,
      guestCount: guests === 'just-me' ? 1 : guests === '2-3' ? 3 : 5,
      preps: { ...preps },
      notes: notes || (chefNote ? `Chef: ${chefNote}` : ''),
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
    }

    addArrival(arr)
    setNewArrival(arr)
    showToast(`Arrival prep confirmed for ${new Date(arrivalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.`)
    setPlanMode(false)
  }

  const confirmedArrival = !planMode ? activeArrival : null

  if (confirmedArrival) {
    const days = daysUntil(confirmedArrival.date)
    return (
      <Page>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <PageTitle>Your Arrival</PageTitle>
          <PageSub>Paradise Valley · {formatLong(confirmedArrival.date).split(',')[0] + ',' + formatLong(confirmedArrival.date).split(',')[1]}</PageSub>

          <CountdownCard>
            <CountdownNumber>{Math.max(0, days)}</CountdownNumber>
            <CountdownLabel>days until your home is ready</CountdownLabel>
            <CountdownDate>{formatLong(confirmedArrival.date)}</CountdownDate>
          </CountdownCard>

          <PrepSection>
            <PrepSectionLabel>What we're preparing</PrepSectionLabel>
            {CONFIRMED_PREPS.filter(p => confirmedArrival.preps[p.key]).map(p => (
              <PrepItem key={p.key}>
                <CheckIcon>
                  <Check size={12} color={theme.colors.success} strokeWidth={2.5} />
                </CheckIcon>
                <PrepItemText>{p.label}</PrepItemText>
              </PrepItem>
            ))}
          </PrepSection>

          {confirmedArrival.notes && (
            <NotesSection>
              <NotesSectionLabel>Special notes</NotesSectionLabel>
              <NotesText>{confirmedArrival.notes}</NotesText>
            </NotesSection>
          )}

          <ButtonGroup>
            <SecondaryButton fullWidth onClick={() => setPlanMode(true)} aria-label="Modify prep">
              Modify This Prep
            </SecondaryButton>
            <SecondaryButton fullWidth onClick={() => navigate('/messages')} aria-label="Message Avara">
              Message Avara
            </SecondaryButton>
          </ButtonGroup>
        </motion.div>
      </Page>
    )
  }

  return (
    <Page>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <PageTitle>When are you arriving?</PageTitle>

        {/* Date */}
        <StepSection>
          <DateInput
            type="date"
            value={arrivalDate}
            onChange={e => { setArrivalDate(e.target.value); setDateError(false) }}
            $error={dateError}
            aria-label="Arrival date"
          />
          {dateError && <ErrorNote>Please select your arrival date</ErrorNote>}
          <HintNote>Your home will be ready the day before you arrive.</HintNote>
        </StepSection>

        {/* Guests */}
        <StepSection>
          <StepLabel>Who's coming?</StepLabel>
          <GuestPills>
            {[
              { key: 'just-me', label: 'Just me' },
              { key: '2-3', label: '2–3 guests' },
              { key: '4+', label: '4+ guests' },
            ].map(g => (
              <GuestPill key={g.key} $active={guests === g.key} onClick={() => setGuests(g.key)}>
                {g.label}
              </GuestPill>
            ))}
          </GuestPills>
          <AnimatePresence>
            {guests !== 'just-me' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden', marginTop: 12 }}
              >
                <PrepToggleRow>
                  <PrepToggleIcon><Bed size={18} /></PrepToggleIcon>
                  <PrepToggleLabel>Guest room prepared</PrepToggleLabel>
                  <Toggle
                    on={preps.guestRoom}
                    onChange={v => setPreps(p => ({ ...p, guestRoom: v }))}
                    ariaLabel="Guest room prepared"
                  />
                </PrepToggleRow>
              </motion.div>
            )}
          </AnimatePresence>
        </StepSection>

        {/* Preps */}
        <StepSection>
          <StepLabel>Your standard preps are already on.</StepLabel>
          <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.78rem', color: theme.colors.muted, marginBottom: 12 }}>
            Toggle anything you want to change.
          </p>

          <PrepSection>
            {[
              { key: 'groceries', label: 'Groceries stocked to your list', Icon: ShoppingBag },
              { key: 'temperature', label: 'Temperature set to 72°', Icon: Thermometer },
              { key: 'flowers', label: 'Fresh flowers', Icon: Flower2 },
              { key: 'pool', label: 'Pool ready at 86°', Icon: Waves },
              { key: 'wine', label: 'Chardonnay + wine stocked', Icon: Wine },
              { key: 'cleaning', label: 'Full cleaning day before arrival', Icon: Sparkles },
              { key: 'mealRequest', label: 'In-home chef meal on arrival', Icon: ChefHat },
            ].map(({ key, label, Icon }) => (
              <div key={key}>
                <PrepToggleRow>
                  <PrepToggleIcon><Icon size={18} /></PrepToggleIcon>
                  <PrepToggleLabel>{label}</PrepToggleLabel>
                  <Toggle
                    on={preps[key]}
                    onChange={v => setPreps(p => ({ ...p, [key]: v }))}
                    ariaLabel={label}
                  />
                </PrepToggleRow>
                <AnimatePresence>
                  {key === 'mealRequest' && preps.mealRequest && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <ChefNoteInput
                        placeholder="Describe the meal or preferences:"
                        value={chefNote}
                        onChange={e => setChefNote(e.target.value)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </PrepSection>
        </StepSection>

        {/* Notes */}
        <StepSection>
          <StepLabel>Anything different this time?</StepLabel>
          <TextArea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Leave blank if everything is standard. We'll take it from here."
          />
        </StepSection>

        <PrimaryButton fullWidth onClick={handleSubmit}>Confirm Arrival Prep</PrimaryButton>
      </motion.div>
    </Page>
  )
}
