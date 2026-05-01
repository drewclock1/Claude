import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Users, MessageSquare, ChevronLeft, ChevronRight,
  Plus, Trash2, DollarSign, CheckCircle, Clock, AlertCircle,
  Send, Home, Star
} from 'lucide-react'
import { theme } from '../styles/theme'

/* ─── localStorage helpers ─────────────────────────────────────── */
const ls = {
  get: (k, fb = null) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb } catch { return fb } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} },
}

const getExpenses = (clientId) => ls.get('avara_expenses', []).filter(e => e.clientId === clientId)

const addExpense = (exp) => {
  const all = ls.get('avara_expenses', [])
  ls.set('avara_expenses', [exp, ...all])
}

const removeExpense = (id) => {
  ls.set('avara_expenses', ls.get('avara_expenses', []).filter(e => e.id !== id))
}

/* ─── Seed data ─────────────────────────────────────────────────── */
const SEED_EXPENSES = [
  { id: 'exp_001', clientId: 'client_sarah_mitchell', category: 'Pool',        vendor: 'Desert Pool Professionals',  amount: 350,  date: '2026-04-06', description: 'Weekly service + chemical treatment', billable: false },
  { id: 'exp_002', clientId: 'client_sarah_mitchell', category: 'Landscaping', vendor: 'Verde Desert Landscaping',    amount: 420,  date: '2026-04-07', description: 'Weekly maintenance + irrigation repair', billable: true  },
  { id: 'exp_003', clientId: 'client_sarah_mitchell', category: 'Cleaning',    vendor: 'Pristine Estate Cleaning',    amount: 480,  date: '2026-04-08', description: 'Full estate cleaning + arrival prep', billable: false },
  { id: 'exp_004', clientId: 'client_sarah_mitchell', category: 'Pool',        vendor: 'Desert Pool Professionals',  amount: 350,  date: '2026-03-30', description: 'Weekly service', billable: false },
  { id: 'exp_005', clientId: 'client_sarah_mitchell', category: 'Landscaping', vendor: 'Verde Desert Landscaping',    amount: 380,  date: '2026-03-31', description: 'Weekly maintenance', billable: false },
  { id: 'exp_006', clientId: 'client_sarah_mitchell', category: 'HVAC',        vendor: 'Sonoran Climate Systems',     amount: 685,  date: '2026-03-22', description: 'Seasonal service + filter replacement', billable: false },
  { id: 'exp_007', clientId: 'client_sarah_mitchell', category: 'Pest Control',vendor: 'Desert Shield Pest',          amount: 295,  date: '2026-03-28', description: 'Quarterly treatment', billable: false },
  { id: 'exp_008', clientId: 'client_sarah_mitchell', category: 'Cleaning',    vendor: 'Pristine Estate Cleaning',    amount: 380,  date: '2026-03-25', description: 'Weekly cleaning', billable: false },
  { id: 'exp_009', clientId: 'client_james_harwood',  category: 'Pool',        vendor: 'Blue Diamond Pool Service',   amount: 280,  date: '2026-04-05', description: 'Weekly service', billable: false },
  { id: 'exp_010', clientId: 'client_james_harwood',  category: 'Cleaning',    vendor: 'Premier Estate Services',     amount: 320,  date: '2026-04-07', description: 'Weekly cleaning', billable: false },
  { id: 'exp_011', clientId: 'client_diana_chen',     category: 'Landscaping', vendor: 'Desert Bloom Landscapes',     amount: 560,  date: '2026-04-08', description: 'Weekly + spring planting', billable: false },
  { id: 'exp_012', clientId: 'client_diana_chen',     category: 'Security',    vendor: 'Apex Security Systems',       amount: 420,  date: '2026-04-01', description: 'Monthly monitoring + camera check', billable: false },
]

const seedExpenses = () => {
  if (!localStorage.getItem('avara_expenses_seeded')) {
    ls.set('avara_expenses', SEED_EXPENSES)
    localStorage.setItem('avara_expenses_seeded', '1')
  }
}

/* ─── Static data ───────────────────────────────────────────────── */
const CLIENTS = [
  { id: 'client_sarah_mitchell', name: 'Sarah Mitchell', avatar: 'SM', tier: 2, retainer: 6000, address: 'Paradise Valley Estate', nextArrival: '2026-04-17', status: 'active' },
  { id: 'client_james_harwood',  name: 'James Harwood',  avatar: 'JH', tier: 1, retainer: 4500, address: 'Scottsdale North Residence', nextArrival: '2026-05-02', status: 'active' },
  { id: 'client_diana_chen',     name: 'Diana Chen',     avatar: 'DC', tier: 3, retainer: 9500, address: 'McCormick Ranch Estate',  nextArrival: '2026-04-28', status: 'active' },
]

const EXPENSE_CATS = ['Pool','HVAC','Landscaping','Cleaning','Security','Pest Control','Plumbing','Electrical','Other']

const OWNER_MESSAGES = [
  { id: 'om1', clientId: 'client_sarah_mitchell', clientName: 'Sarah Mitchell', avatar: 'SM', preview: 'Can you make sure the pool is a bit warmer when I arrive?', time: '10:02 AM', unread: false },
  { id: 'om2', clientId: 'client_diana_chen',     clientName: 'Diana Chen',     avatar: 'DC', preview: 'Please coordinate with Verde for the spring planting this week.', time: 'Yesterday', unread: true  },
  { id: 'om3', clientId: 'client_james_harwood',  clientName: 'James Harwood',  avatar: 'JH', preview: 'What\'s the status on the garage door repair?', time: 'Mon', unread: true  },
]

const RECENT_ACTIVITY = [
  { id: 'a1', type: 'request',  client: 'Sarah Mitchell', text: 'Personal Shopping request submitted', time: '2 hrs ago', icon: Star    },
  { id: 'a2', type: 'arrival',  client: 'Diana Chen',     text: 'Arrival prep confirmed for Apr 28',   time: '5 hrs ago', icon: Home    },
  { id: 'a3', type: 'complete', client: 'Sarah Mitchell', text: 'Restaurant reservation completed',    time: 'Yesterday', icon: CheckCircle },
  { id: 'a4', type: 'message',  client: 'James Harwood',  text: 'New message: garage door status',     time: 'Yesterday', icon: MessageSquare },
  { id: 'a5', type: 'expense',  client: 'Diana Chen',     text: 'Expense logged: Landscaping $560',    time: '2 days ago', icon: DollarSign },
]

/* ─── Utilities ─────────────────────────────────────────────────── */
const $m  = (n) => `$${Number(n).toLocaleString()}`
const fmtDate = (s) => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
const thisMonth = (dateStr) => dateStr?.startsWith(new Date().toISOString().slice(0, 7))

/* ─── Styled components ─────────────────────────────────────────── */
const Page = styled.div`max-width: 680px; margin: 0 auto; padding: 0 0 40px;`

const PageHeader = styled.div`padding: 24px 16px 0;`
const PageTitle  = styled.h1`font-family: ${theme.fonts.serif}; font-size: 1.5rem; font-weight: 400; color: ${theme.colors.cream}; margin-bottom: 4px;`
const PageSub    = styled.p`font-family: ${theme.fonts.sans}; font-size: 0.8rem; color: ${theme.colors.muted}; margin-bottom: 20px;`

/* stat cards */
const StatGrid = styled.div`display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; padding: 0 16px 20px;`
const StatCard = styled.div`background: ${theme.colors.surface}; border: 1px solid rgba(184,150,106,0.12); border-radius: 14px; padding: 14px 12px;`
const StatVal  = styled.p`font-family: ${theme.fonts.serif}; font-size: 1.25rem; color: ${theme.colors.gold}; margin-bottom: 3px;`
const StatLbl  = styled.p`font-family: ${theme.fonts.sans}; font-size: 0.62rem; color: ${theme.colors.muted}; text-transform: uppercase; letter-spacing: .08em;`

/* section label */
const SecLabel = styled.p`font-family: ${theme.fonts.sans}; font-size: 0.68rem; color: ${theme.colors.gold}; text-transform: uppercase; letter-spacing: .12em; font-weight: 500; padding: 0 16px; margin-bottom: 10px;`

/* activity feed */
const ActivityList = styled.div`padding: 0 16px; display: flex; flex-direction: column; gap: 2px; margin-bottom: 24px;`
const ActivityRow  = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.1); border-radius: 12px;
`
const ActivityIcon = styled.div`
  width: 34px; height: 34px; border-radius: 10px;
  background: rgba(184,150,106,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
`
const ActivityText    = styled.p`font-family: ${theme.fonts.sans}; font-size: 0.83rem; color: ${theme.colors.cream}; flex: 1; line-height: 1.3;`
const ActivityClient  = styled.span`color: ${theme.colors.gold}; font-weight: 500;`
const ActivityTime    = styled.p`font-family: ${theme.fonts.sans}; font-size: 0.68rem; color: ${theme.colors.faint};`

/* client list */
const ClientList = styled.div`padding: 0 16px; display: flex; flex-direction: column; gap: 10px;`
const ClientCard = styled.button`
  width: 100%; background: ${theme.colors.surface}; border: 1px solid rgba(184,150,106,0.14);
  border-radius: 14px; padding: 16px; text-align: left; cursor: pointer;
  display: flex; align-items: center; gap: 14px;
  touch-action: manipulation; -webkit-tap-highlight-color: transparent;
  transition: border-color .15s;
  &:active { border-color: rgba(184,150,106,.4); }
`
const Avatar = styled.div`
  width: 44px; height: 44px; border-radius: 50%;
  background: ${theme.colors.gold}; color: ${theme.colors.bg};
  display: flex; align-items: center; justify-content: center;
  font-family: ${theme.fonts.sans}; font-size: .8rem; font-weight: 700; flex-shrink: 0;
`
const ClientInfo    = styled.div`flex: 1; min-width: 0;`
const ClientName    = styled.p`font-family: ${theme.fonts.sans}; font-size: .92rem; font-weight: 600; color: ${theme.colors.cream}; margin-bottom: 2px;`
const ClientAddr    = styled.p`font-family: ${theme.fonts.sans}; font-size: .72rem; color: ${theme.colors.muted};`
const TierBadge     = styled.span`display: inline-block; font-family: ${theme.fonts.sans}; font-size: .6rem; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; color: ${theme.colors.gold}; background: rgba(184,150,106,.1); padding: 2px 7px; border-radius: ${theme.radius.full}; margin-top: 4px;`
const ClientRight   = styled.div`text-align: right; flex-shrink: 0;`
const Retainer      = styled.p`font-family: ${theme.fonts.sans}; font-size: .88rem; font-weight: 600; color: ${theme.colors.cream}; margin-bottom: 2px;`
const RetainerLbl   = styled.p`font-family: ${theme.fonts.sans}; font-size: .62rem; color: ${theme.colors.muted}; text-transform: uppercase; letter-spacing: .06em;`
const MonthExp      = styled.p`font-family: ${theme.fonts.sans}; font-size: .72rem; color: ${theme.colors.gold}; margin-top: 3px;`

/* expense view */
const BackBtn = styled.button`
  width: 36px; height: 36px; border-radius: 50%;
  background: ${theme.colors.surface}; border: 1px solid rgba(184,150,106,.2);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  touch-action: manipulation; -webkit-tap-highlight-color: transparent;
`
const ExpHeader  = styled.div`padding: 20px 16px 16px;`
const ExpRow     = styled.div`display: flex; align-items: center; gap: 12px; margin-bottom: 16px;`
const ExpTitle   = styled.h2`font-family: ${theme.fonts.serif}; font-size: 1.3rem; font-weight: 400; color: ${theme.colors.cream}; flex: 1;`

const MonthGrid  = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 4px;`
const MonthCard  = styled.div`background: ${theme.colors.surface}; border: 1px solid rgba(184,150,106,.12); border-radius: 12px; padding: 14px;`
const MonthVal   = styled.p`font-family: ${theme.fonts.serif}; font-size: 1.35rem; color: ${theme.colors.gold}; margin-bottom: 3px;`
const MonthLbl   = styled.p`font-family: ${theme.fonts.sans}; font-size: .62rem; color: ${theme.colors.muted}; text-transform: uppercase; letter-spacing: .08em;`

const CatBreak   = styled.div`padding: 0 16px; margin-bottom: 20px;`
const CatRow     = styled.div`display: flex; align-items: center; gap: 10px; margin-bottom: 8px;`
const CatLbl     = styled.span`font-family: ${theme.fonts.sans}; font-size: .75rem; color: ${theme.colors.muted}; width: 90px; flex-shrink: 0;`
const CatBar     = styled.div`flex: 1; height: 6px; background: rgba(184,150,106,.1); border-radius: 3px; overflow: hidden;`
const CatFill    = styled.div`height: 100%; background: ${theme.colors.gold}; border-radius: 3px; width: ${p => p.$pct}%; transition: width .4s ease;`
const CatAmt     = styled.span`font-family: ${theme.fonts.sans}; font-size: .75rem; color: ${theme.colors.cream}; width: 58px; text-align: right; flex-shrink: 0;`

/* add expense */
const AddBtn = styled.button`
  display: flex; align-items: center; justify-content: center; gap: 6px;
  width: calc(100% - 32px); margin: 0 16px 16px;
  padding: 13px; border-radius: ${theme.radius.md};
  background: ${theme.colors.gold}; border: none;
  font-family: ${theme.fonts.sans}; font-size: .88rem; font-weight: 600;
  color: ${theme.colors.bg}; cursor: pointer;
  touch-action: manipulation; -webkit-tap-highlight-color: transparent;
  transition: opacity .15s;
  &:active { opacity: .85; }
`
const CancelBtn = styled(AddBtn)`background: rgba(184,150,106,.12); color: ${theme.colors.gold};`

const FormBox    = styled.div`margin: 0 16px 16px; background: ${theme.colors.surface}; border: 1px solid rgba(184,150,106,.2); border-radius: 14px; padding: 16px;`
const FormTitle  = styled.p`font-family: ${theme.fonts.sans}; font-size: .85rem; font-weight: 600; color: ${theme.colors.cream}; margin-bottom: 14px;`
const FormGrid   = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;`
const FormFull   = styled.div`grid-column: 1/-1;`
const FLabel     = styled.label`font-family: ${theme.fonts.sans}; font-size: .7rem; color: ${theme.colors.muted}; display: block; margin-bottom: 5px;`
const FInput     = styled.input`
  width: 100%; box-sizing: border-box;
  background: rgba(184,150,106,.05); border: 1px solid rgba(184,150,106,.2);
  border-radius: ${theme.radius.sm}; padding: 9px 10px;
  color: ${theme.colors.cream}; font-family: ${theme.fonts.sans}; font-size: .85rem;
  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  &::placeholder { color: ${theme.colors.faint}; }
`
const FSelect    = styled.select`
  width: 100%; box-sizing: border-box; appearance: none;
  background: rgba(184,150,106,.05); border: 1px solid rgba(184,150,106,.2);
  border-radius: ${theme.radius.sm}; padding: 9px 10px;
  color: ${theme.colors.cream}; font-family: ${theme.fonts.sans}; font-size: .85rem;
  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  option { background: #1a1612; }
`
const BillableRow = styled.label`display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 12px;`
const BillableTxt = styled.span`font-family: ${theme.fonts.sans}; font-size: .8rem; color: ${theme.colors.muted};`

/* expense list */
const ExpList   = styled.div`padding: 0 16px;`
const ExpListHd = styled.p`font-family: ${theme.fonts.sans}; font-size: .68rem; color: ${theme.colors.gold}; text-transform: uppercase; letter-spacing: .12em; font-weight: 500; margin-bottom: 10px;`
const ExpItem   = styled.div`display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 1px solid rgba(184,150,106,.08); &:last-child { border-bottom: none; }`
const ExpLeft   = styled.div`flex: 1; min-width: 0;`
const ExpVendor = styled.p`font-family: ${theme.fonts.sans}; font-size: .85rem; font-weight: 500; color: ${theme.colors.cream};`
const ExpMeta   = styled.p`font-family: ${theme.fonts.sans}; font-size: .72rem; color: ${theme.colors.muted}; margin-top: 2px;`
const ExpDesc   = styled.p`font-family: ${theme.fonts.sans}; font-size: .72rem; color: ${theme.colors.faint}; margin-top: 2px; line-height: 1.3;`
const ExpRight  = styled.div`display: flex; align-items: center; gap: 8px; flex-shrink: 0;`
const ExpAmt    = styled.p`font-family: ${theme.fonts.sans}; font-size: .9rem; font-weight: 600; color: ${theme.colors.cream};`
const BillDot   = styled.span`font-family: ${theme.fonts.sans}; font-size: .6rem; color: ${theme.colors.gold}; background: rgba(184,150,106,.12); padding: 2px 6px; border-radius: ${theme.radius.full};`
const DelBtn    = styled.button`background: none; border: none; cursor: pointer; padding: 4px; color: rgba(184,150,106,.3); touch-action: manipulation; -webkit-tap-highlight-color: transparent; &:active { color: rgba(220,80,80,.7); }`
const EmptyExp  = styled.div`text-align: center; padding: 32px 0;`
const EmptyTxt  = styled.p`font-family: ${theme.fonts.sans}; font-size: .85rem; color: ${theme.colors.muted};`

/* messages */
const MsgList   = styled.div`padding: 0 16px; display: flex; flex-direction: column; gap: 10px;`
const MsgCard   = styled.button`
  width: 100%; background: ${theme.colors.surface};
  border: 1px solid ${p => p.$unread ? 'rgba(184,150,106,0.35)' : 'rgba(184,150,106,0.12)'};
  border-radius: 14px; padding: 14px 16px; text-align: left;
  cursor: pointer; display: flex; align-items: center; gap: 12px;
  touch-action: manipulation; -webkit-tap-highlight-color: transparent;
  transition: border-color .15s;
  &:active { border-color: rgba(184,150,106,.5); }
`
const MsgAvatar = styled(Avatar)`width: 40px; height: 40px; font-size: .75rem;`
const MsgInfo   = styled.div`flex: 1; min-width: 0;`
const MsgName   = styled.p`font-family: ${theme.fonts.sans}; font-size: .88rem; font-weight: 600; color: ${theme.colors.cream}; margin-bottom: 3px;`
const MsgPreview = styled.p`font-family: ${theme.fonts.sans}; font-size: .78rem; color: ${theme.colors.muted}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;`
const MsgTime   = styled.p`font-family: ${theme.fonts.sans}; font-size: .68rem; color: ${theme.colors.faint}; flex-shrink: 0;`
const UnreadDot = styled.div`width: 8px; height: 8px; border-radius: 50%; background: ${theme.colors.gold}; flex-shrink: 0;`

/* msg thread */
const ThreadWrap  = styled.div`display: flex; flex-direction: column; height: 100%;`
const ThreadHd    = styled.div`display: flex; align-items: center; gap: 12px; padding: 16px; border-bottom: 1px solid rgba(184,150,106,.1);`
const ThreadName  = styled.p`font-family: ${theme.fonts.sans}; font-size: .95rem; font-weight: 600; color: ${theme.colors.cream}; flex: 1;`
const MsgFeed     = styled.div`flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px;`
const MsgBubble   = styled.div`
  max-width: 75%; padding: 10px 14px; border-radius: 14px; line-height: 1.45;
  font-family: ${theme.fonts.sans}; font-size: .85rem;
  align-self: ${p => p.$mine ? 'flex-end' : 'flex-start'};
  background: ${p => p.$mine ? theme.colors.gold : theme.colors.surface};
  color: ${p => p.$mine ? theme.colors.bg : theme.colors.cream};
  border: ${p => p.$mine ? 'none' : '1px solid rgba(184,150,106,0.15)'};
`
const MsgTime2    = styled.p`font-family: ${theme.fonts.sans}; font-size: .65rem; color: ${theme.colors.faint}; align-self: ${p => p.$mine ? 'flex-end' : 'flex-start'}; margin-top: -6px;`
const ComposeRow  = styled.div`display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid rgba(184,150,106,.1);`
const ComposeInput = styled.input`
  flex: 1; background: ${theme.colors.surface}; border: 1px solid rgba(184,150,106,.2);
  border-radius: ${theme.radius.full}; padding: 10px 16px;
  color: ${theme.colors.cream}; font-family: ${theme.fonts.sans}; font-size: .88rem;
  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  &::placeholder { color: ${theme.colors.faint}; }
`
const SendBtn = styled.button`
  width: 40px; height: 40px; border-radius: 50%; background: ${theme.colors.gold};
  border: none; display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
  touch-action: manipulation; -webkit-tap-highlight-color: transparent;
  transition: opacity .15s;
  &:active { opacity: .8; }
`

const THREAD_MESSAGES = {
  'client_sarah_mitchell': [
    { id: 1, from: 'client', text: 'Can you make sure the pool is a bit warmer when I arrive? I\'d love 86 degrees.', time: '10:02 AM' },
    { id: 2, from: 'owner',  text: 'Absolutely — pool will be set to 86° by Wednesday evening. We\'ll also have your Jordan Chardonnay chilled.', time: '10:17 AM' },
    { id: 3, from: 'client', text: 'Perfect. Can you also get some extra pressed juices? The green ones.', time: '11:45 AM' },
    { id: 4, from: 'owner',  text: 'Done — adding extra Pressed Juicery green juice to your arrival prep list. See you Thursday, Sarah.', time: '11:52 AM' },
  ],
  'client_diana_chen': [
    { id: 1, from: 'client', text: 'Please coordinate with Verde for the spring planting this week.', time: 'Yesterday' },
  ],
  'client_james_harwood': [
    { id: 1, from: 'client', text: 'What\'s the status on the garage door repair?', time: 'Mon' },
  ],
}

/* ─── Expense View ──────────────────────────────────────────────── */
function ExpenseView({ client, onBack }) {
  const [expenses, setExpenses]   = useState(() => getExpenses(client.id))
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm] = useState({
    category: 'Pool', vendor: '', amount: '', date: new Date().toISOString().split('T')[0], description: '', billable: false,
  })

  const thisMonthExps = expenses.filter(e => thisMonth(e.date))
  const monthTotal    = thisMonthExps.reduce((s, e) => s + e.amount, 0)
  const billableTotal = thisMonthExps.filter(e => e.billable).reduce((s, e) => s + e.amount, 0)

  const catTotals = EXPENSE_CATS.reduce((acc, cat) => {
    acc[cat] = thisMonthExps.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
    return acc
  }, {})
  const maxCat    = Math.max(...Object.values(catTotals), 1)
  const activeCats = EXPENSE_CATS.filter(c => catTotals[c] > 0)

  const handleAdd = () => {
    if (!form.vendor.trim() || !form.amount) return
    const exp = { id: `exp_${Date.now()}`, clientId: client.id, ...form, amount: parseFloat(form.amount) }
    addExpense(exp)
    setExpenses(getExpenses(client.id))
    setForm({ category: 'Pool', vendor: '', amount: '', date: new Date().toISOString().split('T')[0], description: '', billable: false })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    removeExpense(id)
    setExpenses(getExpenses(client.id))
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <>
      <ExpHeader>
        <ExpRow>
          <BackBtn onClick={onBack}><ChevronLeft size={18} color={theme.colors.gold} /></BackBtn>
          <Avatar>{client.avatar}</Avatar>
          <ExpTitle>{client.name}</ExpTitle>
          <TierBadge>T{client.tier}</TierBadge>
        </ExpRow>
        <MonthGrid>
          <MonthCard><MonthVal>{$m(monthTotal)}</MonthVal><MonthLbl>This Month</MonthLbl></MonthCard>
          <MonthCard><MonthVal>{$m(billableTotal)}</MonthVal><MonthLbl>Billable</MonthLbl></MonthCard>
        </MonthGrid>
      </ExpHeader>

      {activeCats.length > 0 && (
        <CatBreak>
          {activeCats.map(cat => (
            <CatRow key={cat}>
              <CatLbl>{cat}</CatLbl>
              <CatBar><CatFill $pct={(catTotals[cat] / maxCat) * 100} /></CatBar>
              <CatAmt>{$m(catTotals[cat])}</CatAmt>
            </CatRow>
          ))}
        </CatBreak>
      )}

      {showForm ? (
        <>
          <FormBox>
            <FormTitle>New Expense</FormTitle>
            <FormGrid>
              <div>
                <FLabel>Category</FLabel>
                <FSelect value={form.category} onChange={e => set('category', e.target.value)}>
                  {EXPENSE_CATS.map(c => <option key={c}>{c}</option>)}
                </FSelect>
              </div>
              <div>
                <FLabel>Amount ($)</FLabel>
                <FInput type="number" placeholder="0.00" value={form.amount} onChange={e => set('amount', e.target.value)} />
              </div>
              <FormFull>
                <FLabel>Vendor</FLabel>
                <FInput type="text" placeholder="Vendor or company name" value={form.vendor} onChange={e => set('vendor', e.target.value)} />
              </FormFull>
              <div>
                <FLabel>Date</FLabel>
                <FInput type="date" value={form.date} onChange={e => set('date', e.target.value)} />
              </div>
              <div>
                <FLabel>Description</FLabel>
                <FInput type="text" placeholder="Service details" value={form.description} onChange={e => set('description', e.target.value)} />
              </div>
            </FormGrid>
            <BillableRow>
              <input type="checkbox" checked={form.billable} onChange={e => set('billable', e.target.checked)} />
              <BillableTxt>Mark as billable to client</BillableTxt>
            </BillableRow>
            <AddBtn onClick={handleAdd}><Plus size={16} /> Save Expense</AddBtn>
          </FormBox>
          <CancelBtn onClick={() => setShowForm(false)}>Cancel</CancelBtn>
        </>
      ) : (
        <AddBtn onClick={() => setShowForm(true)} style={{ margin: '0 16px 20px' }}>
          <Plus size={16} /> Add Expense
        </AddBtn>
      )}

      <ExpList>
        <ExpListHd>All Expenses</ExpListHd>
        {expenses.length === 0 ? (
          <EmptyExp>
            <DollarSign size={32} color={theme.colors.gold} style={{ margin: '0 auto 10px', display: 'block' }} />
            <EmptyTxt>No expenses logged yet.</EmptyTxt>
          </EmptyExp>
        ) : (
          [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).map(exp => (
            <ExpItem key={exp.id}>
              <ExpLeft>
                <ExpVendor>{exp.vendor}</ExpVendor>
                <ExpMeta>{exp.category} · {fmtDate(exp.date)}</ExpMeta>
                {exp.description && <ExpDesc>{exp.description}</ExpDesc>}
              </ExpLeft>
              <ExpRight>
                {exp.billable && <BillDot>Billable</BillDot>}
                <ExpAmt>{$m(exp.amount)}</ExpAmt>
                <DelBtn onClick={() => handleDelete(exp.id)}><Trash2 size={14} /></DelBtn>
              </ExpRight>
            </ExpItem>
          ))
        )}
      </ExpList>
    </>
  )
}

/* ─── Message Thread ────────────────────────────────────────────── */
function MessageThread({ clientId, clientName, avatar, onBack }) {
  const [messages, setMessages] = useState(THREAD_MESSAGES[clientId] || [])
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    setMessages(m => [...m, { id: Date.now(), from: 'owner', text: text.trim(), time: 'Just now' }])
    setText('')
  }

  return (
    <ThreadWrap>
      <ThreadHd>
        <BackBtn onClick={onBack}><ChevronLeft size={18} color={theme.colors.gold} /></BackBtn>
        <Avatar style={{ width: 36, height: 36, fontSize: '.75rem' }}>{avatar}</Avatar>
        <ThreadName>{clientName}</ThreadName>
      </ThreadHd>
      <MsgFeed>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <MsgBubble $mine={m.from === 'owner'}>{m.text}</MsgBubble>
            <MsgTime2 $mine={m.from === 'owner'}>{m.time}</MsgTime2>
          </div>
        ))}
      </MsgFeed>
      <ComposeRow>
        <ComposeInput
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Message..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <SendBtn onClick={handleSend}><Send size={16} color={theme.colors.bg} /></SendBtn>
      </ComposeRow>
    </ThreadWrap>
  )
}

/* ─── Overview Tab ──────────────────────────────────────────────── */
function OverviewTab() {
  const allExp     = ls.get('avara_expenses', [])
  const thisMonthE = allExp.filter(e => thisMonth(e.date))
  const totalARR   = CLIENTS.reduce((s, c) => s + c.retainer, 0)
  const totalExp   = thisMonthE.reduce((s, e) => s + e.amount, 0)
  const margin     = totalARR - totalExp

  return (
    <>
      <PageHeader>
        <PageTitle>Operations</PageTitle>
        <PageSub>Avara Home · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</PageSub>
      </PageHeader>

      <StatGrid>
        <StatCard><StatVal>{$m(totalARR)}</StatVal><StatLbl>Monthly ARR</StatLbl></StatCard>
        <StatCard><StatVal>{$m(totalExp)}</StatVal><StatLbl>Expenses</StatLbl></StatCard>
        <StatCard><StatVal>{$m(margin)}</StatVal><StatLbl>Margin</StatLbl></StatCard>
      </StatGrid>

      <SecLabel>Active Clients</SecLabel>
      <ClientList style={{ marginBottom: 24 }}>
        {CLIENTS.map(c => {
          const mExp = ls.get('avara_expenses', []).filter(e => e.clientId === c.id && thisMonth(e.date)).reduce((s, e) => s + e.amount, 0)
          return (
            <ClientCard key={c.id} as="div" style={{ cursor: 'default' }}>
              <Avatar>{c.avatar}</Avatar>
              <ClientInfo>
                <ClientName>{c.name}</ClientName>
                <ClientAddr>{c.address}</ClientAddr>
                <TierBadge>Tier {c.tier}</TierBadge>
              </ClientInfo>
              <ClientRight>
                <Retainer>{$m(c.retainer)}</Retainer>
                <RetainerLbl>/month</RetainerLbl>
                {mExp > 0 && <MonthExp>{$m(mExp)} spent</MonthExp>}
              </ClientRight>
            </ClientCard>
          )
        })}
      </ClientList>

      <SecLabel>Recent Activity</SecLabel>
      <ActivityList>
        {RECENT_ACTIVITY.map(a => (
          <ActivityRow key={a.id}>
            <ActivityIcon><a.icon size={16} color={theme.colors.gold} /></ActivityIcon>
            <div style={{ flex: 1, minWidth: 0 }}>
              <ActivityText><ActivityClient>{a.client}</ActivityClient> — {a.text}</ActivityText>
              <ActivityTime>{a.time}</ActivityTime>
            </div>
          </ActivityRow>
        ))}
      </ActivityList>
    </>
  )
}

/* ─── Clients Tab ───────────────────────────────────────────────── */
function ClientsTab() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return <ExpenseView client={selected} onBack={() => setSelected(null)} />
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Clients</PageTitle>
        <PageSub>Tap a client to view expenses and details.</PageSub>
      </PageHeader>
      <ClientList>
        {CLIENTS.map(c => {
          const mExp = ls.get('avara_expenses', []).filter(e => e.clientId === c.id && thisMonth(e.date)).reduce((s, e) => s + e.amount, 0)
          return (
            <ClientCard key={c.id} onClick={() => setSelected(c)}>
              <Avatar>{c.avatar}</Avatar>
              <ClientInfo>
                <ClientName>{c.name}</ClientName>
                <ClientAddr>{c.address}</ClientAddr>
                <TierBadge>Tier {c.tier}</TierBadge>
              </ClientInfo>
              <ClientRight>
                <Retainer>{$m(c.retainer)}</Retainer>
                <RetainerLbl>/month</RetainerLbl>
                {mExp > 0 && <MonthExp>{$m(mExp)} spent</MonthExp>}
                <ChevronRight size={14} color={theme.colors.faint} style={{ marginTop: 6 }} />
              </ClientRight>
            </ClientCard>
          )
        })}
      </ClientList>
    </>
  )
}

/* ─── Messages Tab ──────────────────────────────────────────────── */
function MessagesTab() {
  const [thread, setThread] = useState(null)

  if (thread) {
    return (
      <MessageThread
        clientId={thread.clientId}
        clientName={thread.clientName}
        avatar={thread.avatar}
        onBack={() => setThread(null)}
      />
    )
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Messages</PageTitle>
        <PageSub>Client conversations and requests.</PageSub>
      </PageHeader>
      <MsgList>
        {OWNER_MESSAGES.map(m => (
          <MsgCard key={m.id} $unread={m.unread} onClick={() => setThread(m)}>
            <MsgAvatar>{m.avatar}</MsgAvatar>
            <MsgInfo>
              <MsgName>{m.clientName}</MsgName>
              <MsgPreview>{m.preview}</MsgPreview>
            </MsgInfo>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <MsgTime>{m.time}</MsgTime>
              {m.unread && <UnreadDot />}
            </div>
          </MsgCard>
        ))}
      </MsgList>
    </>
  )
}

/* ─── Root ──────────────────────────────────────────────────────── */
export default function OwnerDashboard() {
  const location = useLocation()

  useEffect(() => { seedExpenses() }, [])

  const tab = location.pathname === '/owner/clients'  ? 'clients'
            : location.pathname === '/owner/messages' ? 'messages'
            : 'overview'

  return (
    <Page>
      {tab === 'overview'  && <OverviewTab />}
      {tab === 'clients'   && <ClientsTab />}
      {tab === 'messages'  && <MessagesTab />}
    </Page>
  )
}
