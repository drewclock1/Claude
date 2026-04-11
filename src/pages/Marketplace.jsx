import { useState } from 'react'
import {
  Star, MapPin, Clock, Shield, Search,
  Wrench, Droplets, Zap, Paintbrush, Trees, Sofa,
  ChevronRight, Phone, Calendar,
} from 'lucide-react'
import clsx from 'clsx'

const categories = [
  { key: 'all',       label: 'All Services',  icon: Wrench },
  { key: 'plumbing',  label: 'Plumbing',      icon: Droplets },
  { key: 'electric',  label: 'Electrical',    icon: Zap },
  { key: 'painting',  label: 'Painting',      icon: Paintbrush },
  { key: 'landscaping', label: 'Landscaping', icon: Trees },
  { key: 'interior',  label: 'Interior',      icon: Sofa },
]

const services = [
  {
    id: 1,
    name: 'CoolAir HVAC Services',
    category: 'plumbing',
    specialty: 'HVAC & Air Quality',
    rating: 4.9,
    reviews: 312,
    price: '$85–$200',
    eta: 'Same day',
    location: 'Austin, TX',
    verified: true,
    featured: true,
    avatar: 'CA',
    color: 'bg-sky-500',
    tags: ['HVAC', 'Air Filters', 'Tune-ups'],
  },
  {
    id: 2,
    name: 'Bright Sparks Electrical',
    category: 'electric',
    specialty: 'Residential Electrician',
    rating: 4.8,
    reviews: 189,
    price: '$75–$180',
    eta: 'Next day',
    location: 'Round Rock, TX',
    verified: true,
    featured: false,
    avatar: 'BS',
    color: 'bg-amber-500',
    tags: ['Wiring', 'Panels', 'Fixtures'],
  },
  {
    id: 3,
    name: 'Green Thumb Landscaping',
    category: 'landscaping',
    specialty: 'Lawn & Garden Care',
    rating: 4.7,
    reviews: 94,
    price: '$60–$140',
    eta: '2–3 days',
    location: 'Cedar Park, TX',
    verified: true,
    featured: false,
    avatar: 'GT',
    color: 'bg-emerald-500',
    tags: ['Mowing', 'Trimming', 'Irrigation'],
  },
  {
    id: 4,
    name: 'Pro Paint Co.',
    category: 'painting',
    specialty: 'Interior & Exterior Paint',
    rating: 4.9,
    reviews: 228,
    price: '$450–$1,200',
    eta: '3–5 days',
    location: 'Austin, TX',
    verified: true,
    featured: true,
    avatar: 'PP',
    color: 'bg-avara-600',
    tags: ['Interior', 'Exterior', 'Faux Finishes'],
  },
  {
    id: 5,
    name: 'Flow Masters Plumbing',
    category: 'plumbing',
    specialty: 'Emergency & Routine Plumbing',
    rating: 4.6,
    reviews: 143,
    price: '$90–$250',
    eta: 'Same day',
    location: 'Austin, TX',
    verified: true,
    featured: false,
    avatar: 'FM',
    color: 'bg-blue-500',
    tags: ['Leaks', 'Drains', 'Water Heaters'],
  },
  {
    id: 6,
    name: 'Interior Visions',
    category: 'interior',
    specialty: 'Home Design & Staging',
    rating: 5.0,
    reviews: 61,
    price: '$150–$500',
    eta: '1 week',
    location: 'Austin, TX',
    verified: true,
    featured: true,
    avatar: 'IV',
    color: 'bg-rose-500',
    tags: ['Design', 'Staging', 'Furniture'],
  },
]

function ServiceCard({ service }) {
  return (
    <div className={clsx(
      'card hover:shadow-md transition-shadow duration-200 relative',
      service.featured && 'ring-1 ring-avara-300'
    )}>
      {service.featured && (
        <span className="absolute -top-3 left-4 badge bg-avara-600 text-white text-xs shadow-sm">
          Featured
        </span>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0', service.color)}>
          {service.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-stone-900 text-sm leading-tight">{service.name}</h3>
            {service.verified && (
              <Shield size={13} className="text-sky-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-stone-400 mt-0.5">{service.specialty}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {service.tags.map(tag => (
          <span key={tag} className="badge bg-stone-100 text-stone-600 text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="grid grid-cols-3 gap-2 text-center mb-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
            <Star size={11} fill="currentColor" />
            <span className="text-xs font-semibold text-stone-800">{service.rating}</span>
          </div>
          <p className="text-xs text-stone-400">{service.reviews} reviews</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-stone-800 mb-0.5">{service.price}</p>
          <p className="text-xs text-stone-400">per job</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-stone-700 mb-0.5">
            <Clock size={11} />
            <span className="text-xs font-semibold">{service.eta}</span>
          </div>
          <p className="text-xs text-stone-400">availability</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-stone-400 text-xs mb-4">
        <MapPin size={11} />
        {service.location}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 btn-secondary text-sm py-2">
          <Phone size={13} />
          Contact
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 btn-primary text-sm py-2">
          <Calendar size={13} />
          Book
        </button>
      </div>
    </div>
  )
}

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = services.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.specialty.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search services, specialties, or tags..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-5 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-avara-300 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={clsx(
              'flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              activeCategory === key
                ? 'bg-avara-600 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-500 hover:text-stone-700'
            )}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-stone-500">
        {filtered.length} {filtered.length === 1 ? 'provider' : 'providers'} found
        {activeCategory !== 'all' && ` in ${categories.find(c => c.key === activeCategory)?.label}`}
      </p>

      {/* Service grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-stone-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No providers match your search.</p>
          <p className="text-sm mt-1">Try a different keyword or category.</p>
        </div>
      )}

    </div>
  )
}
