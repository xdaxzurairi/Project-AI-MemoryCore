# KailPro — SDLC Plan

## Phase 1: Planning & Requirements (Minggu 1–2)

### 1.1 Market Research
- [ ] Semak competitor: Fishbrain, Navionics, C-MAP — apa yang diorang takde untuk Malaysia
- [ ] Identify target user persona: pemancing sungai vs laut, usia, tech-savviness
- [ ] Pricing benchmark: Fishbrain Pro USD$69/yr — KailPro target RM5–10/bulan

### 1.2 Requirements Lock
- [ ] Finalize Free vs Pro feature list
- [ ] Confirm data sources: JUPEM API access, LKIM data format
- [ ] Legal: semak syarat guna data kerajaan Malaysia (JUPEM, LKIM)
- [ ] Define MVP scope: minimum untuk launch

### 1.3 Business Model
- [ ] Pricing tiers: Free / Pro RM8/bulan atau RM70/tahun
- [ ] Payment gateway: ToyyibPay (Malaysia-first)
- [ ] Monetization tambahan: Premium lubuk listing untuk resort/guide mancing

---

## Phase 2: System Design (Minggu 2–3)

### 2.1 Architecture
```
[React PWA] ←→ [Supabase Auth + DB + Storage]
                       ↕
              [Edge Functions / API Routes]
                       ↕
    [JUPEM Tide] [OWM Marine] [LKIM Zones] [AISstream]
```

### 2.2 Database Schema (Supabase)

**users** — auth.users (Supabase built-in)

**profiles**
- id, user_id, tier (free/pro), subscription_end, created_at

**trips**
- id, user_id, title, started_at, ended_at, distance_km, env_type (river/sea/coastal)

**trip_points**
- id, trip_id, lat, lng, recorded_at, speed_knots
- Index: trip_id, recorded_at

**spots**
- id, user_id, name, lat, lng, type (lubuk/port/parking), env_type, is_public, description
- RLS: is_public = true → visible to Pro users; is_public = false → owner only

**restricted_zones**
- id, name, authority (LKIM/Taman Laut), geojson_polygon, type, updated_at
- Seeded from official data, read-only untuk users

### 2.3 RLS Policy (Supabase)
- trips: user boleh CRUD sendiri sahaja
- spots: owner full access; Pro users boleh SELECT where is_public=true
- restricted_zones: semua boleh SELECT, only admin INSERT/UPDATE

### 2.4 Offline Strategy
- Service Worker cache map tiles (kawasan preset)
- IndexedDB untuk queue trip points bila offline
- Sync ke Supabase bila connection recover

---

## Phase 3: MVP Development (Minggu 3–8)

### Sprint 1 (Minggu 3–4): Core Map + Auth
- [ ] Setup Supabase project, schema, RLS
- [ ] React PWA scaffold (Vite + React + Tailwind)
- [ ] Leaflet.js map dengan OpenStreetMap
- [ ] Auth: email/password + Google OAuth (Supabase)
- [ ] Profile page + tier display

### Sprint 2 (Minggu 5–6): Trip Logger
- [ ] GPS tracking — Geolocation API watchPosition
- [ ] Start/Stop trip UI
- [ ] Store trip_points ke IndexedDB → sync Supabase
- [ ] Trip history list + replay path atas map
- [ ] Offline queue dengan Service Worker

### Sprint 3 (Minggu 7): Spots + Tide
- [ ] Add/edit/delete spot (private)
- [ ] Map marker untuk spots
- [ ] Pasang surut chart — integrate JUPEM/MyTide API
- [ ] Restricted zones — load polygon LKIM, render atas map

### Sprint 4 (Minggu 8): Pro Features + Payment
- [ ] ToyyibPay integration — subscribe Pro tier
- [ ] Community lubuk map (Pro only)
- [ ] Geofence alert (restricted zones)
- [ ] Export GPX (basic)
- [ ] Upgrade/downgrade tier flow

---

## Phase 4: Testing (Minggu 8–9)

### 4.1 Functional Testing
- [ ] Trip logging accuracy (compare dengan Strava / GPS tracker)
- [ ] Offline mode — trip logging tanpa internet, sync lepas sambung
- [ ] Geofence alert trigger accuracy
- [ ] Payment flow: subscribe, renew, cancel

### 4.2 Field Testing
- [ ] Beta test dengan 5–10 pemancing — sungai + laut
- [ ] Collect feedback: UX, GPS accuracy, data coverage

### 4.3 Performance
- [ ] Map tile loading speed (terutama kawasan pedalaman coverage teruk)
- [ ] Supabase query performance untuk trip_points (boleh jadi besar)

---

## Phase 5: Launch (Minggu 10)

### 5.1 Pre-Launch
- [ ] Landing page KailPro.com / KailPro.my
- [ ] Early access waitlist (collect email)
- [ ] Social media: TikTok + Facebook Group pemancing Malaysia
- [ ] App icon, branding, colour palette (biru laut + emas)

### 5.2 Launch
- [ ] Soft launch: Pro tier free 3 bulan untuk beta users
- [ ] Product Hunt / Indie Hackers post
- [ ] Outreach ke komuniti pemancing (Facebook Group, forum)

### 5.3 Post-Launch (Bulan 2–3)
- [ ] Monitor churn rate
- [ ] A/B test paywall position (lubuk koordinat vs alert)
- [ ] Add: AIS vessel proximity (P7)
- [ ] Add: Offline map cache (P9)

---

## Risk Register

| Risk | Likelihood | Mitigation |
|---|---|---|
| JUPEM API tiada public access | Medium | Scrape MyTide.info, atau guna WorldTides API (USD) |
| LKIM data format lama/PDF | Medium | Manual digitize polygon utama, crowdsource update |
| GPS accuracy teruk dalam hutan/tebing | High | Warn user, allow manual pin correction |
| Low conversion free→paid | Medium | Limit free spots to 5 (bukan 10), komuniti lubuk jadi killer feature |
| Competition dari Navionics | Low | Diorang mahal + tak cover Malaysia-specific data |

---

## KPI Targets (6 Bulan Post-Launch)

| Metric | Target |
|---|---|
| Registered users | 500 |
| Pro subscribers | 50 (10% conversion) |
| MRR | RM400 (50 × RM8) |
| Lubuk community spots | 200+ |
| Trip logs recorded | 1,000+ |
