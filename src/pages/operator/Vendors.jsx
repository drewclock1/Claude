import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Plus, Star, Filter } from 'lucide-react'
import Modal from '../../components/Modal'
import { formatDate } from '../../utils/helpers'

const CATEGORIES = ['All', 'HVAC', 'Pool', 'Landscaping', 'Cleaning', 'Pest', 'Handyman', 'Security', 'Grocery']
const STATUS_OPTIONS = ['Active', 'Backup', 'Do Not Use']
const STATUS_COLORS = {
  'Active':      { color: '#8AB89A', border: 'rgba(138,184,154,0.4)', bg: 'rgba(138,184,154,0.08)' },
  'Backup':      { color: '#D4B483', border: 'rgba(212,180,131,0.4)', bg: 'rgba(212,180,131,0.08)' },
  'Do Not Use':  { color: '#D4726A', border: 'rgba(212,114,106,0.4)', bg: 'rgba(212,114,106,0.08)' },
}

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onClick={() => onChange && onChange(n)}
          className="transition-colors"
          style={{ color: n <= value ? '#B8966A' : '#4A4038' }}
        >
          <Star size={13} fill={n <= value ? '#B8966A' : 'none'} />
        </button>
      ))}
    </div>
  )
}

function AddVendorModal({ open, onClose }) {
  const { addVendor } = useApp()
  const [form, setForm] = useState({ name: '', category: 'HVAC', phone: '', email: '', rating: 0, notes: '', status: 'Active' })
  const handleSubmit = (e) => {
    e.preventDefault()
    addVendor(form)
    onClose()
    setForm({ name: '', category: 'HVAC', phone: '', email: '', rating: 0, notes: '', status: 'Active' })
  }
  return (
    <Modal open={open} onClose={onClose} title="Add Vendor">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-xs block mb-1.5">Vendor Name</label>
          <input required className="input-dark" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Company name" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-xs block mb-1.5">Category</label>
            <select className="input-dark" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Status</label>
            <select className="input-dark" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label-xs block mb-1.5">Phone</label>
            <input className="input-dark" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="(480) 555-0000" />
          </div>
          <div>
            <label className="label-xs block mb-1.5">Email</label>
            <input className="input-dark" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="vendor@email.com" />
          </div>
        </div>
        <div>
          <label className="label-xs block mb-1.5">Rating</label>
          <StarRating value={form.rating} onChange={v => setForm(p => ({ ...p, rating: v }))} />
        </div>
        <div>
          <label className="label-xs block mb-1.5">Notes</label>
          <textarea className="input-dark" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-gold flex-1">Add Vendor</button>
        </div>
      </form>
    </Modal>
  )
}

export default function Vendors() {
  const { vendors, updateVendor } = useApp()
  const [catFilter, setCatFilter] = useState('All')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = catFilter === 'All' ? vendors : vendors.filter(v => v.category === catFilter)

  return (
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-colors"
              style={{
                background: catFilter === c ? '#B8966A' : '#2A2520',
                color: catFilter === c ? '#1A1612' : '#9A8E82',
                border: catFilter === c ? 'none' : '1px solid #3A3028',
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-gold flex-shrink-0">
          <Plus size={15} /> Add Vendor
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center py-16 text-center">
          <Filter size={36} className="mb-3" style={{ color: '#B8966A', opacity: 0.3 }} />
          <p className="font-display text-xl text-avara-cream mb-1">No vendors found</p>
          <p className="text-avara-muted text-sm">Add your trusted service providers.</p>
          <button onClick={() => setShowAdd(true)} className="btn-gold mt-5">Add First Vendor</button>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="table-dark">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Contact</th>
                  <th>Rating</th>
                  <th>Last Used</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(vendor => {
                  const st = STATUS_COLORS[vendor.status] || STATUS_COLORS.Active
                  return (
                    <tr key={vendor.id}>
                      <td>
                        <p className="font-semibold text-avara-cream">{vendor.name}</p>
                      </td>
                      <td>
                        <span
                          className="text-[11px] font-semibold px-2 py-1 rounded-md"
                          style={{ background: '#3A3028', color: '#D4B483' }}
                        >
                          {vendor.category}
                        </span>
                      </td>
                      <td>
                        <div className="space-y-0.5 text-xs text-avara-muted">
                          {vendor.phone && <p><a href={`tel:${vendor.phone}`} className="hover:text-avara-cream transition-colors">{vendor.phone}</a></p>}
                          {vendor.email && <p><a href={`mailto:${vendor.email}`} className="hover:text-avara-cream transition-colors">{vendor.email}</a></p>}
                        </div>
                      </td>
                      <td>
                        <StarRating
                          value={vendor.rating}
                          onChange={v => updateVendor(vendor.id, { rating: v })}
                        />
                      </td>
                      <td className="text-avara-muted">{formatDate(vendor.lastUsed)}</td>
                      <td>
                        <select
                          className="text-xs rounded-lg px-2 py-1 border-0 cursor-pointer transition-colors"
                          style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}
                          value={vendor.status}
                          onChange={e => updateVendor(vendor.id, { status: e.target.value })}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>
                        <p className="text-xs text-avara-muted max-w-[200px] truncate">{vendor.notes || '—'}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddVendorModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  )
}
