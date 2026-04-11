import { useState } from 'react'
import {
  Lightbulb, Thermometer, Lock, ShieldCheck, Tv,
  Wind, Droplets, PlugZap, Sun, Moon, Volume2, Wifi,
  ChevronUp, ChevronDown,
} from 'lucide-react'
import clsx from 'clsx'

const initialDevices = [
  { id: 1,  room: 'Living Room',   icon: Lightbulb,    name: 'Main Lights',      on: true,  value: 80,   unit: '%',  type: 'dimmer' },
  { id: 2,  room: 'Living Room',   icon: Tv,           name: 'Smart TV',         on: false, value: null, unit: null, type: 'switch' },
  { id: 3,  room: 'Living Room',   icon: Volume2,      name: 'Soundbar',         on: false, value: null, unit: null, type: 'switch' },
  { id: 4,  room: 'Bedroom',       icon: Lightbulb,    name: 'Ceiling Light',    on: false, value: 40,   unit: '%',  type: 'dimmer' },
  { id: 5,  room: 'Bedroom',       icon: Sun,          name: 'Smart Blinds',     on: true,  value: 60,   unit: '%',  type: 'dimmer' },
  { id: 6,  room: 'Kitchen',       icon: Lightbulb,    name: 'Under Cabinet',    on: true,  value: 100,  unit: '%',  type: 'dimmer' },
  { id: 7,  room: 'Kitchen',       icon: PlugZap,      name: 'Coffee Maker',     on: true,  value: null, unit: null, type: 'switch' },
  { id: 8,  room: 'Whole Home',    icon: Thermometer,  name: 'Thermostat',       on: true,  value: 72,   unit: '°F', type: 'number' },
  { id: 9,  room: 'Whole Home',    icon: Wind,         name: 'HVAC Fan',         on: true,  value: null, unit: null, type: 'switch' },
  { id: 10, room: 'Whole Home',    icon: Droplets,     name: 'Humidifier',       on: false, value: 45,   unit: '%',  type: 'number' },
  { id: 11, room: 'Security',      icon: Lock,         name: 'Front Door Lock',  on: true,  value: null, unit: null, type: 'lock' },
  { id: 12, room: 'Security',      icon: ShieldCheck,  name: 'Alarm System',     on: true,  value: null, unit: null, type: 'alarm' },
  { id: 13, room: 'Security',      icon: Wifi,         name: 'Smart Doorbell',   on: true,  value: null, unit: null, type: 'switch' },
]

const rooms = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Whole Home', 'Security']

const scenes = [
  { name: 'Good Morning', icon: Sun,  color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { name: 'Movie Night',  icon: Tv,   color: 'bg-navy-100 text-navy-700 border-navy-200' },
  { name: 'Away Mode',    icon: Lock, color: 'bg-stone-100 text-stone-700 border-stone-200' },
  { name: 'Good Night',   icon: Moon, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
]

function DeviceCard({ device, onToggle, onValueChange }) {
  const Icon = device.icon

  const lockLabel = device.on ? 'Locked' : 'Unlocked'
  const alarmLabel = device.on ? 'Armed' : 'Disarmed'

  let statusLabel = device.on ? 'On' : 'Off'
  if (device.type === 'lock')  statusLabel = lockLabel
  if (device.type === 'alarm') statusLabel = alarmLabel

  return (
    <div className={clsx(
      'card transition-all duration-200 hover:shadow-md',
      device.on ? 'border-avara-200' : 'opacity-70'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={clsx(
          'w-11 h-11 rounded-xl flex items-center justify-center transition-colors',
          device.on ? 'bg-avara-600 text-white' : 'bg-stone-100 text-stone-400'
        )}>
          <Icon size={19} />
        </div>

        {/* Toggle */}
        <button
          onClick={() => onToggle(device.id)}
          className={clsx(
            'relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none',
            device.on ? 'bg-avara-600' : 'bg-stone-200'
          )}
        >
          <span className={clsx(
            'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
            device.on ? 'translate-x-6' : 'translate-x-0.5'
          )} />
        </button>
      </div>

      <p className="font-medium text-stone-900 text-sm mb-0.5">{device.name}</p>
      <p className="text-xs text-stone-400 mb-3">{statusLabel}</p>

      {/* Value control */}
      {device.value !== null && device.on && (
        <div className="flex items-center justify-between bg-stone-50 rounded-lg px-3 py-2">
          <span className="text-sm font-semibold text-stone-800">
            {device.value}{device.unit}
          </span>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => onValueChange(device.id, Math.min(device.value + (device.type === 'number' ? 1 : 5), device.unit === '°F' ? 85 : 100))}
              className="p-0.5 text-stone-400 hover:text-avara-600 transition-colors"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={() => onValueChange(device.id, Math.max(device.value - (device.type === 'number' ? 1 : 5), device.unit === '°F' ? 60 : 0))}
              className="p-0.5 text-stone-400 hover:text-avara-600 transition-colors"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SmartHome() {
  const [devices, setDevices] = useState(initialDevices)
  const [activeRoom, setActiveRoom] = useState('All')

  const toggleDevice = (id) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, on: !d.on } : d))
  }

  const changeValue = (id, newVal) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, value: newVal } : d))
  }

  const filtered = activeRoom === 'All'
    ? devices
    : devices.filter(d => d.room === activeRoom)

  const onCount = devices.filter(d => d.on).length

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Status bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-display font-semibold text-avara-600">{onCount}</p>
          <p className="text-xs text-stone-400 mt-0.5">Active Devices</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-display font-semibold text-stone-900">72°F</p>
          <p className="text-xs text-stone-400 mt-0.5">Indoor Temp</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-display font-semibold text-emerald-600">28 kWh</p>
          <p className="text-xs text-stone-400 mt-0.5">Today's Usage</p>
        </div>
      </div>

      {/* Scenes */}
      <div className="card">
        <h2 className="font-display font-semibold text-stone-900 mb-4">Scenes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {scenes.map(({ name, icon: Icon, color }) => (
            <button
              key={name}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl border font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]',
                color
              )}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Room filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {rooms.map(room => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className={clsx(
              'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              activeRoom === room
                ? 'bg-avara-600 text-white'
                : 'bg-white border border-stone-200 text-stone-500 hover:text-stone-700'
            )}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Device grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={toggleDevice}
            onValueChange={changeValue}
          />
        ))}
      </div>

    </div>
  )
}
