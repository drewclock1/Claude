const CLIENT = {
  id: 'client_sarah_mitchell',
  name: 'Sarah Mitchell',
  firstName: 'Sarah',
  address: '8420 E Camelback Road, Paradise Valley, AZ 85253',
  addressShort: 'Camelback Estate',
  addressLine1: '8420 E Camelback Road',
  addressLine2: 'Paradise Valley, AZ',
  tier: 2,
  retainer: 6000,
  memberSince: '2026-01-15',
  phone: '602-555-0184',
  email: 'sarah.mitchell@email.com',
  avatar: 'SM',
  nextArrival: '2026-04-17',
  preferences: {
    arrivalTemp: 72,
    poolTemp: 86,
    groceries: [
      'Pressed Juicery green juice x6',
      'Pellegrino sparkling water (24pk)',
      'Canyon Ranch granola',
      'Oat milk',
      'Fresh flowers — white peonies or ranunculus',
      'Fresh berries',
      'Chardonnay — Jordan or Rombauer',
    ],
    lighting: 'Warm, dimmed — 40% on arrival',
    guestRoom: 'Always prepped — fresh linens, towels, diffuser on',
    wine: 'Jordan Chardonnay or Rombauer preferred',
    communication: 'Text first, then email. No calls unless urgent.',
    dietaryNotes: 'No red meat. Prefers organic where available.',
  },
  property: {
    sqft: 7200,
    bedrooms: 5,
    bathrooms: 6,
    pool: true,
    yearBuilt: 2019,
    builder: 'Calvis Wyant',
    alarmCode: '4721',
    gateCode: '8836',
    lockboxCode: '2291',
  },
  vendors: [
    { id: 'v1', category: 'Pool', name: 'Desert Pool Professionals', contact: 'Mike Torres', phone: '480-555-0192', lastService: '2026-04-06', status: 'current' },
    { id: 'v2', category: 'HVAC', name: 'Sonoran Climate Systems', contact: 'Dave Reyes', phone: '480-555-0847', lastService: '2026-03-22', status: 'current' },
    { id: 'v3', category: 'Landscaping', name: 'Verde Desert Landscaping', contact: 'Carlos Mendez', phone: '480-555-0334', lastService: '2026-04-07', status: 'current' },
    { id: 'v4', category: 'Cleaning', name: 'Pristine Estate Cleaning', contact: 'Angela Park', phone: '480-555-0571', lastService: '2026-04-08', status: 'current' },
    { id: 'v5', category: 'Security', name: 'Pinnacle Home Security', contact: 'James Ortiz', phone: '480-555-0923', lastService: '2026-03-15', status: 'current' },
    { id: 'v6', category: 'Pest Control', name: 'Desert Shield Pest', contact: 'Tony Bass', phone: '480-555-0448', lastService: '2026-03-28', status: 'current' },
  ],
  systemsHealth: {
    hvac: { status: 'good', label: 'Running normally', lastService: '2026-03-22', nextService: '2026-06-22', vendorId: 'v2' },
    pool: { status: 'good', label: 'Chemistry balanced', lastService: '2026-04-06', nextService: '2026-04-13', vendorId: 'v1' },
    landscaping: { status: 'good', label: 'Maintained weekly', lastService: '2026-04-07', nextService: '2026-04-14', vendorId: 'v3' },
    security: { status: 'good', label: 'All sensors active', lastService: '2026-03-15', nextService: '2026-09-15', vendorId: 'v5' },
    irrigation: { status: 'good', label: 'Seasonal schedule set', lastService: '2026-03-01', nextService: null, vendorId: null },
    pest: { status: 'good', label: 'Quarterly treatment current', lastService: '2026-03-28', nextService: '2026-06-28', vendorId: 'v6' },
  },
}

const VISITS = [
  {
    id: 'visit_001',
    date: '2026-04-08',
    summary: 'Full weekly walkthrough completed. All systems running normally. Pool chemistry balanced and temperature holding at 84°. Pantry restocked with your standard items. Fresh flowers replaced in primary suite and living room. Noted a small irrigation emitter that needs attention on the east garden — scheduled Verde to address Thursday.',
    items: [
      { type: 'noted', text: 'Irrigation emitter #4 (east garden) — replaced Thursday April 11, resolved.' },
    ],
    overallStatus: 'attention',
    resolvedCount: 1,
    openCount: 0,
  },
  {
    id: 'visit_002',
    date: '2026-04-01',
    summary: 'Weekly visit completed. Post-monsoon exterior inspection clear. Pool serviced, HVAC filters checked — all good. Restocked pantry and wine. Property is in excellent condition.',
    items: [],
    overallStatus: 'clear',
    resolvedCount: 0,
    openCount: 0,
  },
  {
    id: 'visit_003',
    date: '2026-03-25',
    summary: 'Weekly walkthrough. Guest room prepared per your instructions for upcoming visit. Fresh linens, diffuser on, towels folded. Confirmed pool heating schedule is active for arrival. Light touch-up cleaning completed.',
    items: [],
    overallStatus: 'clear',
    resolvedCount: 0,
    openCount: 0,
  },
  {
    id: 'visit_004',
    date: '2026-03-18',
    summary: 'Quarterly deep inspection completed alongside weekly visit. HVAC serviced by Sonoran Climate. All ductwork clear. Pest control quarterly treatment applied by Desert Shield. Property sealed and inspected. No issues found.',
    items: [],
    overallStatus: 'clear',
    resolvedCount: 0,
    openCount: 0,
  },
  {
    id: 'visit_005',
    date: '2026-03-11',
    summary: 'Weekly visit. Minor crack noted in back patio tile near fire pit — flagged for monitoring. Pool and landscaping in excellent shape. Pantry restocked.',
    items: [
      { type: 'noted', text: 'Back patio tile hairline crack near fire pit — monitoring. No structural concern. Will reassess in 4 weeks.' },
    ],
    overallStatus: 'attention',
    resolvedCount: 0,
    openCount: 1,
  },
]

const MESSAGES = [
  {
    id: 'msg_001',
    sender: 'avara',
    text: 'Good morning, Sarah. We completed your weekly visit this morning — everything looks excellent at the property. The irrigation emitter we noted last week has been fully replaced by Verde. Full report is available in the app. Your arrival prep for April 17th is confirmed.',
    timestamp: '2026-04-11T09:14:00',
    read: true,
  },
  {
    id: 'msg_002',
    sender: 'client',
    text: "Thank you. Can you make sure the pool is a bit warmer when I arrive? I'd love 86 degrees.",
    timestamp: '2026-04-11T10:02:00',
    read: true,
  },
  {
    id: 'msg_003',
    sender: 'avara',
    text: "Absolutely — pool will be set to 86° by Wednesday evening so it's perfect for your Thursday arrival. We'll also have your Jordan Chardonnay chilled. Anything else before you land?",
    timestamp: '2026-04-11T10:17:00',
    read: true,
  },
  {
    id: 'msg_004',
    sender: 'client',
    text: 'Perfect. Can you also get some extra pressed juices? The green ones.',
    timestamp: '2026-04-11T11:45:00',
    read: true,
  },
  {
    id: 'msg_005',
    sender: 'avara',
    text: "Done — adding extra Pressed Juicery green juice to your arrival prep list. See you Thursday, Sarah. Your home will be ready.",
    timestamp: '2026-04-11T11:52:00',
    read: true,
  },
]

const REQUESTS = [
  {
    id: 'req_001',
    type: 'Arrival Prep',
    category: 'estate',
    status: 'completed',
    priority: 'standard',
    submittedAt: '2026-04-09T08:00:00',
    completedAt: '2026-04-11T09:14:00',
    detail: 'Arrival prep for April 17. Pool to 86°, groceries per standard list, extra green juices, guest room prepped, Jordan Chardonnay chilled.',
    avara_response: 'Confirmed — all prep scheduled for Wednesday April 16. Home will be ready for your Thursday arrival.',
  },
  {
    id: 'req_002',
    type: 'Restaurant Reservation',
    category: 'lifestyle',
    status: 'completed',
    priority: 'standard',
    submittedAt: '2026-03-28T18:30:00',
    completedAt: '2026-03-29T10:00:00',
    detail: "Table for 4 at Mastro's City Hall or Dominick's, Saturday April 5th, 7:30pm.",
    avara_response: "Secured a table at Mastro's City Hall for 4 guests, Saturday April 5th at 7:30pm. Reservation is under Mitchell. They'll have your preferences on file.",
  },
  {
    id: 'req_003',
    type: 'Vendor Coordination',
    category: 'estate',
    status: 'completed',
    priority: 'standard',
    submittedAt: '2026-03-20T14:00:00',
    completedAt: '2026-03-22T11:00:00',
    detail: 'HVAC seasonal service — filters, coils, refrigerant check before summer.',
    avara_response: 'Sonoran Climate completed full seasonal service March 22nd. All clear — system is ready for summer. Full service report filed.',
  },
  {
    id: 'req_004',
    type: 'Personal Shopping',
    category: 'shopping',
    status: 'in_progress',
    priority: 'standard',
    submittedAt: '2026-04-10T09:00:00',
    completedAt: null,
    detail: 'Looking for a hostess gift for a dinner party — something premium, not wine. Budget $200–$300.',
    avara_response: 'On it — sourcing options now. Will have 3 suggestions to you by end of day.',
  },
]

const ARRIVALS = [
  {
    id: 'arr_001',
    date: '2026-04-17',
    guestCount: 1,
    preps: {
      groceries: true,
      temperature: true,
      flowers: true,
      pool: true,
      guestRoom: false,
      wine: true,
      cleaning: true,
      mealRequest: false,
    },
    notes: 'Extra green juices. Pool to 86°.',
    status: 'confirmed',
    confirmedAt: '2026-04-09T08:00:00',
  },
]

export function seedStorage() {
  if (localStorage.getItem('avara_client')) return

  localStorage.setItem('avara_client', JSON.stringify(CLIENT))
  localStorage.setItem('avara_visits', JSON.stringify(VISITS))
  localStorage.setItem('avara_messages', JSON.stringify(MESSAGES))
  localStorage.setItem('avara_requests', JSON.stringify(REQUESTS))
  localStorage.setItem('avara_arrivals', JSON.stringify(ARRIVALS))
}

export { CLIENT, VISITS, MESSAGES, REQUESTS, ARRIVALS }
