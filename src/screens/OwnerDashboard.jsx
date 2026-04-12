import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, Plus, DollarSign, Trash2, TrendingUp, Users
} from 'lucide-react'
import { theme } from '../styles/theme'
import { PrimaryButton } from '../components/ui/Button'

/* ── Storage helpers ── */
const getExpenses = (clientId) => {
  try {
    const all = JSON.parse(localStorage.getItem('avara_expenses') || '[]')
    return all.filter(e => e.clientId === clientId)
  } catch { return [] }
}

const saveExpense = (expense) => {
  try {
    const all = JSON.parse(localStorage.getItem('avara_expenses') || '[]')
    const updated = [expense, ...all]
    localStorage.setItem('avara_expenses', JSON.stringify(updated))
    return updated
  } catch { return [] }
}

const deleteExpense = (id) => {
  try {
    const all = JSON.parse(localStorage.getItem('avara_expenses') || '[]')
    const updated = all.filter(e => e.id !== id)
    localStorage.setItem('avara_expenses', JSON.stringify(updated))
    return updated
  } catch { return [] }
}

/* ── Seed owner expense data ── */
const SEED_EXPENSES = [
  { id: 'exp_001', clientId: 'client_sarah_mitchell', category: 'Pool', vendor: 'Desert Pool Professionals', amount: 350, date: '2026-04-06', description: 'Weekly service + chemical treatment', billable: false },
  { id: 'exp_002', clientId: 'client_sarah_mitchell', category: 'Landscaping', vendor: 'Verde Desert Landscaping', amount: 420, date: '2026-04-07', description: 'Weekly maintenance + irrigation repair', billable: true },
  { id: 'exp_003', clientId: 'client_sarah_mitchell', category: 'Cleaning', vendor: 'Pristine Estate Cleaning', amount: 480, date: '2026-04-08', description: 'Full estate cleaning + arrival prep', billable: false },
  { id: 'exp_004', clientId: 'client_sarah_mitchell', category: 'Pool', vendor: 'Desert Pool Professionals', amount: 350, date: '2026-03-30', description: 'Weekly service', billable: false },
  { id: 'exp_005', clientId: 'client_sarah_mitchell', category: 'Landscaping', vendor: 'Verde Desert Landscaping', amount: 380, date: '2026-03-31', description: 'Weekly maintenance', billable: false },
  { id: 'exp_006', clientId: 'client_sarah_mitchell', category: 'HVAC', vendor: 'Sonoran Climate Systems', amount: 685, date: '2026-03-22', description: 'Seasonal service + filter replacement', billable: false },
  { id: 'exp_007', clientId: 'client_sarah_mitchell', category: 'Pest Control', vendor: 'Desert Shield Pest', amount: 295, date: '2026-03-28', description: 'Quarterly treatment', billable: false },
  { id: 'exp_008', clientId: 'client_sarah_mitchell', category: 'Cleaning', vendor: 'Pristine Estate Cleaning', amount: 380, date: '2026-03-25', description: 'Weekly cleaning', billable: false },
  { id: 'exp_009', clientId: 'client_james_harwood', category: 'Pool', vendor: 'Blue Diamond Pool Service', amount: 280, date: '2026-04-05', description: 'Weekly service', billable: false },
  { id: 'exp_010', clientId: 'client_james_harwood', category: 'Cleaning', vendor: 'Premier Estate Cleaning', amount: 320, date: '2026-04-07', description: 'Weekly cleaning', billable: false },
  { id: 'exp_011', clientId: 'client_diana_chen', category: 'Landscaping', vendor: 'Desert Bloom Landscapes', amount: 560, date: '2026-04-08', description: 'Weekly + spring planting', billable: false },
  { id: 'exp_012', clientId: 'client_diana_chen', category: 'Security', vendor: 'Apex Security Systems', amount: 420, date: '2026-04-01', description: 'Monthly monitoring + camera check', billable: false },
]

const seedExpenses = () => {
  if (!localStorage.getItem('avara_expenses_seeded')) {
    localStorage.setItem('avara_expenses', JSON.stringify(SEED_EXPENSES))
    localStorage.setItem('avara_expenses_seeded', '1')
  }
}

/* ── Static Clients ── */
const OWNER_CLIENTS = [
  {
    id: 'client_sarah_mitchell',
    name: 'Sarah Mitchell',
    avatar: 'SM',
    tier: 2,
    retainer: 6000,
    address: 'Paradise Valley Estate',
  },
  {
    id: 'client_james_harwood',
    name: 'James Harwood',
    avatar: 'JH',
    tier: 1,
    retainer: 4500,
    address: 'Scottsdale North Residence',
  },
  {
    id: 'client_diana_chen',
    name: 'Diana Chen',
    avatar: 'DC',
    tier: 3,
    retainer: 9500,
    address: 'McCormick Ranch Estate',
  },
]

const CATEGORIES = ['Pool', 'HVAC', 'Landscaping', 'Cleaning', 'Security', 'Pest Control', 'Plumbing', 'Electrical', 'Other']

/* ── Styled Components ── */
const Page = styled.div`
  padding: 0 0 40px;
  max-width: 600px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  padding: 24px 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const BackBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
`

const PageTitle = styled.h1`
  font-family: ${theme.fonts.serif};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  flex: 1;
`

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding: 0 16px 20px;
`

const SummaryCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.12);
  border-radius: 12px;
  padding: 14px 12px;
`

const SummaryValue = styled.p`
  font-family: ${theme.fonts.serif};
  font-size: 1.2rem;
  color: ${theme.colors.gold};
  margin-bottom: 3px;
`

const SummaryLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.65rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const SectionLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 500;
  padding: 0 16px;
  margin-bottom: 10px;
`

const ClientList = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ClientCard = styled.button`
  width: 100%;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.14);
  border-radius: 14px;
  padding: 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.15s;

  &:active { border-color: rgba(184,150,106,0.4); }
`

const ClientAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${theme.colors.gold};
  color: ${theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
`

const ClientInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ClientName = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.92rem;
  font-weight: 600;
  color: ${theme.colors.cream};
  margin-bottom: 2px;
`

const ClientAddress = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.muted};
`

const ClientRight = styled.div`
  text-align: right;
`

const ClientRetainer = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: 600;
  color: ${theme.colors.cream};
  margin-bottom: 2px;
`

const ClientRetainerLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.65rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

const TierBadge = styled.span`
  display: inline-block;
  font-family: ${theme.fonts.sans};
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.gold};
  background: rgba(184,150,106,0.1);
  padding: 2px 7px;
  border-radius: ${theme.radius.full};
  margin-top: 4px;
`

const ExpenseMonthTotal = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.gold};
  margin-top: 2px;
`

/* ── Expense View ── */
const ExpHeader = styled.div`
  padding: 20px 16px 16px;
`

const ExpClientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

const ExpClientName = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: 1.3rem;
  font-weight: 400;
  color: ${theme.colors.cream};
  flex: 1;
`

const MonthTotals = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 4px;
`

const MonthCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.12);
  border-radius: 12px;
  padding: 14px;
`

const MonthValue = styled.p`
  font-family: ${theme.fonts.serif};
  font-size: 1.35rem;
  color: ${theme.colors.gold};
  margin-bottom: 3px;
`

const MonthLabel = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.65rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const CatBreakdown = styled.div`
  padding: 0 16px;
  margin-bottom: 20px;
`

const CatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`

const CatLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  width: 90px;
  flex-shrink: 0;
`

const CatBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(184,150,106,0.12);
  border-radius: 3px;
  overflow: hidden;
`

const CatBarFill = styled.div`
  height: 100%;
  background: ${theme.colors.gold};
  border-radius: 3px;
  width: ${p => p.$pct}%;
  transition: width 0.4s ease;
`

const CatAmount = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.78rem;
  color: ${theme.colors.cream};
  width: 60px;
  text-align: right;
  flex-shrink: 0;
`

const AddExpenseForm = styled.div`
  margin: 0 16px 20px;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.2);
  border-radius: 14px;
  padding: 16px;
`

const FormTitle = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.82rem;
  font-weight: 600;
  color: ${theme.colors.cream};
  margin-bottom: 14px;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const FormFieldFull = styled(FormField)`
  grid-column: 1 / -1;
`

const FieldLabelSmall = styled.label`
  font-family: ${theme.fonts.sans};
  font-size: 0.7rem;
  color: ${theme.colors.muted};
`

const Input = styled.input`
  background: rgba(184,150,106,0.05);
  border: 1px solid rgba(184,150,106,0.2);
  border-radius: ${theme.radius.sm};
  padding: 9px 10px;
  color: ${theme.colors.cream};
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;

  &:focus { outline: none; border-color: ${theme.colors.gold}; }
  &::placeholder { color: ${theme.colors.faint}; }
`

const Select = styled.select`
  background: rgba(184,150,106,0.05);
  border: 1px solid rgba(184,150,106,0.2);
  border-radius: ${theme.radius.sm};
  padding: 9px 10px;
  color: ${theme.colors.cream};
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;
  appearance: none;

  &:focus { outline: none; border-color: ${theme.colors.gold}; }

  option { background: #1a1612; color: ${theme.colors.cream}; }
`

const BillableRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 12px;
`

const BillableText = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  color: ${theme.colors.muted};
`

const ExpenseListWrap = styled.div`
  padding: 0 16px;
`

const ExpenseListTitle = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.68rem;
  color: ${theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 500;
  margin-bottom: 10px;
`

const ExpenseItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(184,150,106,0.08);

  &:last-child { border-bottom: none; }
`

const ExpenseLeft = styled.div`
  flex: 1;
  min-width: 0;
`

const ExpenseVendor = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${theme.colors.cream};
`

const ExpenseCatDate = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.muted};
  margin-top: 2px;
`

const ExpenseDesc = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  color: ${theme.colors.faint};
  margin-top: 2px;
  line-height: 1.3;
`

const ExpenseRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`

const ExpenseAmount = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.cream};
`

const BillableDot = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.6rem;
  color: ${theme.colors.gold};
  background: rgba(184,150,106,0.12);
  padding: 2px 6px;
  border-radius: ${theme.radius.full};
`

const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: rgba(184,150,106,0.3);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:active { color: rgba(220, 80, 80, 0.7); }
`

const EmptyExp = styled.div`
  text-align: center;
  padding: 32px 0;
`

const formatMoney = (n) => `$${n.toLocaleString()}`

const formatDate = (str) => new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const currentMonthKey = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

function isCurrentMonth(dateStr) {
  return dateStr.startsWith(currentMonthKey())
}

/* ── Expense View Component ── */
function ExpenseView({ client, onBack }) {
  const [expenses, setExpenses] = useState(() => getExpenses(client.id))
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    category: 'Pool',
    vendor: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    billable: false,
  })

  const thisMonth = expenses.filter(e => isCurrentMonth(e.date))
  const monthTotal = thisMonth.reduce((s, e) => s + e.amount, 0)
  const billableTotal = thisMonth.filter(e => e.billable).reduce((s, e) => s + e.amount, 0)

  const catTotals = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = thisMonth.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
    return acc
  }, {})
  const maxCat = Math.max(...Object.values(catTotals), 1)
  const activeCats = CATEGORIES.filter(c => catTotals[c] > 0)

  const handleAdd = () => {
    if (!form.vendor || !form.amount) return
    const expense = {
      id: `exp_${Date.now()}`,
      clientId: client.id,
      category: form.category,
      vendor: form.vendor,
      amount: parseFloat(form.amount),
      date: form.date,
      description: form.description,
      billable: form.billable,
    }
    saveExpense(expense)
    setExpenses(getExpenses(client.id))
    setForm({ category: 'Pool', vendor: '', amount: '', date: new Date().toISOString().split('T')[0], description: '', billable: false })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    deleteExpense(id)
    setExpenses(getExpenses(client.id))
  }

  const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <ExpHeader>
        <ExpClientRow>
          <BackBtn onClick={onBack} aria-label="Back">
            <ChevronLeft size={18} color={theme.colors.gold} />
          </BackBtn>
          <ClientAvatar>{client.avatar}</ClientAvatar>
          <ExpClientName>{client.name}</ExpClientName>
          <TierBadge>T{client.tier}</TierBadge>
        </ExpClientRow>

        <MonthTotals>
          <MonthCard>
            <MonthValue>{formatMoney(monthTotal)}</MonthValue>
            <MonthLabel>This Month</MonthLabel>
          </MonthCard>
          <MonthCard>
            <MonthValue>{formatMoney(billableTotal)}</MonthValue>
            <MonthLabel>Billable</MonthLabel>
          </MonthCard>
        </MonthTotals>
      </ExpHeader>

      {activeCats.length > 0 && (
        <CatBreakdown>
          {activeCats.map(cat => (
            <CatRow key={cat}>
              <CatLabel>{cat}</CatLabel>
              <CatBar><CatBarFill $pct={(catTotals[cat] / maxCat) * 100} /></CatBar>
              <CatAmount>{formatMoney(catTotals[cat])}</CatAmount>
            </CatRow>
          ))}
        </CatBreakdown>
      )}

      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <PrimaryButton
          fullWidth
          onClick={() => setShowForm(v => !v)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Plus size={16} />
          {showForm ? 'Cancel' : 'Add Expense'}
        </PrimaryButton>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <AddExpenseForm>
              <FormTitle>New Expense</FormTitle>
              <FormGrid>
                <FormField>
                  <FieldLabelSmall>Category</FieldLabelSmall>
                  <Select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </Select>
                </FormField>
                <FormField>
                  <FieldLabelSmall>Amount ($)</FieldLabelSmall>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  />
                </FormField>
                <FormFieldFull>
                  <FieldLabelSmall>Vendor</FieldLabelSmall>
                  <Input
                    type="text"
                    placeholder="Vendor or company name"
                    value={form.vendor}
                    onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))}
                  />
                </FormFieldFull>
                <FormField>
                  <FieldLabelSmall>Date</FieldLabelSmall>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  />
                </FormField>
                <FormField>
                  <FieldLabelSmall>Description</FieldLabelSmall>
                  <Input
                    type="text"
                    placeholder="Service details"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  />
                </FormField>
              </FormGrid>
              <BillableRow>
                <input
                  type="checkbox"
                  checked={form.billable}
                  onChange={e => setForm(f => ({ ...f, billable: e.target.checked }))}
                />
                <BillableText>Mark as billable to client</BillableText>
              </BillableRow>
              <PrimaryButton fullWidth onClick={handleAdd}>Save Expense</PrimaryButton>
            </AddExpenseForm>
          </motion.div>
        )}
      </AnimatePresence>

      <ExpenseListWrap>
        <ExpenseListTitle>All Expenses</ExpenseListTitle>
        {sorted.length === 0 ? (
          <EmptyExp>
            <DollarSign size={32} color={theme.colors.gold} style={{ margin: '0 auto 10px', display: 'block' }} />
            <p style={{ fontFamily: theme.fonts.sans, fontSize: '0.85rem', color: theme.colors.muted }}>
              No expenses logged yet.
            </p>
          </EmptyExp>
        ) : (
          sorted.map(exp => (
            <ExpenseItem key={exp.id}>
              <ExpenseLeft>
                <ExpenseVendor>{exp.vendor}</ExpenseVendor>
                <ExpenseCatDate>{exp.category} · {formatDate(exp.date)}</ExpenseCatDate>
                {exp.description && <ExpenseDesc>{exp.description}</ExpenseDesc>}
              </ExpenseLeft>
              <ExpenseRight>
                {exp.billable && <BillableDot>Billable</BillableDot>}
                <ExpenseAmount>{formatMoney(exp.amount)}</ExpenseAmount>
                <DeleteBtn onClick={() => handleDelete(exp.id)} aria-label="Delete expense">
                  <Trash2 size={14} />
                </DeleteBtn>
              </ExpenseRight>
            </ExpenseItem>
          ))
        )}
      </ExpenseListWrap>
    </>
  )
}

/* ── Main Owner Dashboard ── */
export default function OwnerDashboard() {
  const [selectedClient, setSelectedClient] = useState(null)

  useEffect(() => {
    seedExpenses()
  }, [])

  const getMonthTotal = (clientId) => {
    const exps = getExpenses(clientId)
    return exps.filter(e => isCurrentMonth(e.date)).reduce((s, e) => s + e.amount, 0)
  }

  const totalRevenue = OWNER_CLIENTS.reduce((s, c) => s + c.retainer, 0)
  const totalExpenses = OWNER_CLIENTS.reduce((s, c) => s + getMonthTotal(c.id), 0)
  const margin = totalRevenue - totalExpenses

  if (selectedClient) {
    return (
      <Page>
        <ExpenseView
          client={selectedClient}
          onBack={() => setSelectedClient(null)}
        />
      </Page>
    )
  }

  return (
    <Page>
      <PageHeader>
        <TrendingUp size={22} color={theme.colors.gold} />
        <PageTitle>Operations</PageTitle>
      </PageHeader>

      <SummaryRow>
        <SummaryCard>
          <SummaryValue>{formatMoney(totalRevenue)}</SummaryValue>
          <SummaryLabel>Monthly ARR</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{formatMoney(totalExpenses)}</SummaryValue>
          <SummaryLabel>Expenses</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{formatMoney(margin)}</SummaryValue>
          <SummaryLabel>Margin</SummaryLabel>
        </SummaryCard>
      </SummaryRow>

      <SectionLabel>
        <Users size={12} style={{ display: 'inline', marginRight: 6 }} />
        Active Clients
      </SectionLabel>

      <ClientList>
        {OWNER_CLIENTS.map(client => {
          const monthExp = getMonthTotal(client.id)
          return (
            <ClientCard key={client.id} onClick={() => setSelectedClient(client)}>
              <ClientAvatar>{client.avatar}</ClientAvatar>
              <ClientInfo>
                <ClientName>{client.name}</ClientName>
                <ClientAddress>{client.address}</ClientAddress>
                <TierBadge>Tier {client.tier}</TierBadge>
              </ClientInfo>
              <ClientRight>
                <ClientRetainer>{formatMoney(client.retainer)}</ClientRetainer>
                <ClientRetainerLabel>/month</ClientRetainerLabel>
                {monthExp > 0 && (
                  <ExpenseMonthTotal>{formatMoney(monthExp)} spent</ExpenseMonthTotal>
                )}
              </ClientRight>
            </ClientCard>
          )
        })}
      </ClientList>
    </Page>
  )
}
