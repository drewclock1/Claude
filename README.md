# Avara Home OS

**Estate · Lifestyle · Concierge**

A full-stack, dual-interface platform for a luxury private estate concierge service operating in Scottsdale and Paradise Valley, Arizona.

---

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Architecture

**Tech Stack**
- React 18 + React Router v6
- Tailwind CSS v3 with custom Avara design system
- Recharts for data visualizations
- Lucide React for icons
- localStorage for all data persistence (no backend required)

**Design System**
- Background: `#1A1612` (warm near-black)
- Gold accent: `#B8966A`
- Typography: Playfair Display (headings) + DM Sans (UI)

---

## Features

### Owner Dashboard (Operator View)

| Page | Description |
|---|---|
| **Dashboard** | Live metrics (MRR, clients, tasks, arrivals), Today's Focus, Upcoming Arrivals, Activity Feed |
| **Clients** | Searchable client table with Tier 1/2 filter, full client profile with 5 tabs |
| **Client Profile** | Preference Profile · Property · Requests · Notes · Billing — all editable and persisted |
| **Properties** | Grid of all managed estates with system status and visit tracking |
| **Tasks & Requests** | Kanban board (New / In Progress / Awaiting Client / Completed) |
| **Outreach** | Referral partners table (pre-populated with 10 contacts) + prospect pipeline kanban |
| **Vendors** | Vendor directory with star ratings, category filter, status management |
| **Reports** | Revenue chart, tier mix donut, task completion, pipeline funnel (Recharts) |

### Member Portal (Client View)

| Page | Description |
|---|---|
| **Home** | Personalized greeting, property status hero, quick actions, Scottsdale Spotlight cards |
| **My Property** | Systems status, inspection history accordion, vendor contacts |
| **Requests** | Request list with status tracking, new request form |
| **Lifestyle** | "We Can Arrange" tiles, Scottsdale Exclusives, recent arrangements |
| **Messages** | Live chat UI with Avara concierge, persisted per client |

---

## Demo Data

On first load, the app seeds with:
- **Sarah Mitchell** — Tier 2, $6,000/mo, 8420 E Camelback Rd, Paradise Valley
- **James Worthington** — Tier 1, $1,000/mo, 15200 N Scottsdale Rd, Scottsdale
- 6 demo tasks, 8 vendors, 10 outreach contacts, 4 prospects, message threads

**Reset to seed data:** Open DevTools → Application → Local Storage → Clear All, then refresh.

---

## View Toggle

The top-right header contains an **Owner / Client** toggle. In Client View, a dropdown lets you preview the portal as any client.

---

## localStorage Keys

| Key | Contents |
|---|---|
| `avara_clients` | All client records |
| `avara_tasks` | All tasks and requests |
| `avara_vendors` | Vendor directory |
| `avara_outreach` | Referral partner contacts |
| `avara_prospects` | Prospect pipeline |
| `avara_activity` | Activity log |
| `avara_messages_{clientId}` | Per-client message threads |
| `avara_view` | Current view (owner/client) |
| `avara_active_client` | Selected client for client view |
