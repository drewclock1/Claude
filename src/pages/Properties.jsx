import { useState } from 'react'
import {
  MapPin, Bed, Bath, Square, TrendingUp, TrendingDown,
  Plus, MoreHorizontal, Star, Home, Building2,
} from 'lucide-react'
import clsx from 'clsx'

const properties = [
  {
    id: 1,
    name: '14 Willow Lane',
    type: 'Primary Residence',
    address: 'Austin, TX 78701',
    beds: 4,
    baths: 3,
    sqft: 2850,
    value: 645000,
    change: 2.4,
    status: 'owner-occupied',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    rating: 4.9,
    yearBuilt: 2018,
  },
  {
    id: 2,
    name: '88 Oakwood Ave',
    type: 'Investment · For Rent',
    address: 'Round Rock, TX 78664',
    beds: 3,
    baths: 2,
    sqft: 1980,
    value: 142000,
    change: 1.1,
    status: 'rented',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    rating: 4.6,
    yearBuilt: 2012,
  },
  {
    id: 3,
    name: 'Lakeview Condo #302',
    type: 'Investment · Vacant',
    address: 'Cedar Park, TX 78613',
    beds: 2,
    baths: 2,
    sqft: 1120,
    value: 104000,
    change: -0.8,
    status: 'vacant',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    rating: 4.2,
    yearBuilt: 2020,
  },
]

const statusConfig = {
  'owner-occupied': { label: 'Owner Occupied', cls: 'bg-avara-100 text-avara-700' },
  'rented':         { label: 'Rented',          cls: 'bg-emerald-100 text-emerald-700' },
  'vacant':         { label: 'Vacant',           cls: 'bg-amber-100 text-amber-700' },
}

function PropertyCard({ property }) {
  const status = statusConfig[property.status]
  return (
    <div className="card overflow-hidden p-0 hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative h-48 bg-stone-100 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={clsx('badge text-xs font-semibold', status.cls)}>
            {status.label}
          </span>
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white transition-colors">
          <MoreHorizontal size={15} className="text-stone-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-stone-900 text-lg leading-tight">{property.name}</h3>
          <div className="flex items-center gap-1 text-amber-400 flex-shrink-0">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-medium text-stone-600">{property.rating}</span>
          </div>
        </div>

        <p className="text-sm text-stone-500 mb-1">{property.type}</p>
        <div className="flex items-center gap-1 text-stone-400 text-xs mb-4">
          <MapPin size={12} />
          {property.address}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-stone-500 text-xs mb-4 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-1.5">
            <Bed size={13} />
            <span>{property.beds} bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={13} />
            <span>{property.baths} bath</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square size={13} />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Value */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-stone-400 mb-0.5">Est. Value</p>
            <p className="text-xl font-display font-semibold text-stone-900">
              ${property.value.toLocaleString()}
            </p>
          </div>
          <div className={clsx(
            'flex items-center gap-1 text-sm font-medium',
            property.change >= 0 ? 'text-emerald-600' : 'text-red-500'
          )}>
            {property.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(property.change)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Properties() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? properties
    : properties.filter(p => p.status === filter)

  const totalValue = properties.reduce((s, p) => s + p.value, 0)

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="w-10 h-10 bg-navy-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Home size={18} className="text-navy-700" />
          </div>
          <p className="text-2xl font-display font-semibold text-stone-900">{properties.length}</p>
          <p className="text-xs text-stone-400 mt-0.5">Total Properties</p>
        </div>
        <div className="card text-center">
          <div className="w-10 h-10 bg-avara-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Building2 size={18} className="text-avara-700" />
          </div>
          <p className="text-2xl font-display font-semibold text-stone-900">
            ${(totalValue / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-stone-400 mt-0.5">Portfolio Value</p>
        </div>
        <div className="card text-center">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <TrendingUp size={18} className="text-emerald-700" />
          </div>
          <p className="text-2xl font-display font-semibold text-stone-900">+1.9%</p>
          <p className="text-xs text-stone-400 mt-0.5">Avg. Monthly Growth</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl p-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'owner-occupied', label: 'Owner Occupied' },
            { key: 'rented', label: 'Rented' },
            { key: 'vacant', label: 'Vacant' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filter === key
                  ? 'bg-avara-600 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Property
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

    </div>
  )
}
