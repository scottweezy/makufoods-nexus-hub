## Phase 1 — MAKU Foods Nexus Foundation

A mobile-first PWA on TanStack Start + Lovable Cloud. Single app, role-based routing, installable to phone home screens. The screens shipped now are real UI driven by Cloud data — not mock pages.

### What ships in this turn

1. **Lovable Cloud enabled** — Postgres, Auth, Storage, Realtime.
2. **Database schema** (migration):
  - `app_role` enum: `ceo`, `executive_assistant`, `accountant`, `marketing_officer`, `online_sales_rep`, `driver`, `production_staff`
  - `profiles` (id → auth.users, full_name, phone, avatar_url)
  - `user_roles` (id, user_id, role) — separate table, `has_role()` SECURITY DEFINER function8.CHR
  - Trigger to auto-create `profiles` row on signup
  - RLS + GRANTs on every public table
3. **Auth flow** — `/auth` page with email+password (Phase 2 will add Google, biometric WebAuthn, admin-controlled registration). Forgot-password + `/reset-password` page included.
4. **Role-based routing** — `_authenticated` layout reads the user's role and renders the right shell:
  - CEO / Executive Assistant / Accountant / Marketing Officer → **desktop dashboard layout** with collapsible sidebar (matches your MAKU mockup)
  - Online Sales Rep → **mobile Sales Officer screen**
  - Driver → **mobile Driver screen**
  - Production Staff → minimal "coming in Phase 8" placeholder
5. **CEO Dashboard (Phase 3)** — KPI cards (Revenue Today, Revenue This Month, Orders Today, Outstanding Invoices, Cash Available, Payroll Due, Production Status, Inventory Value), Sales Overview area chart with Daily/Weekly/Monthly tabs, Top Selling Products donut, Live Business Activity feed, AI Insights panel. Wired to placeholder server functions returning empty/zero state until real data flows in later phases — no fake hardcoded "GHS 125,560" numbers in production code.
6. **Sales Officer mobile screen** — Good morning header, Today's Summary (Orders / Sales GHS), Daily Target progress ring, Quick Actions grid (New Order, Customers, Collections, Products, Visit Report, More), bottom tab bar (Home, Orders, Customers, More).
7. **Driver mobile screen** — On Delivery status header, map placeholder area, Current Delivery card (#, shop, address, Delivered badge), Pending Stops + Distance Left stats, bottom nav.
8. **PWA installability** — `manifest.webmanifest`, theme color, apple-touch-icon, standalone display so it adds to phone home screen. (Offline support comes later when data layer is mature.)
9. **Design system** — `src/styles.css` tokens for MAKU palette (deep navy surface, red CTA, green accent), card/sidebar/mobile-shell variants. Zero hardcoded colors in components.
10. **First user bootstrap** — since registration is admin-controlled, the very first signup is automatically granted CEO role via trigger so you can log in and test.

### Out of scope this turn (queued for next phases)

Google OAuth, biometric login, admin-controlled invite flow, all CRUD modules (employees, procurement, inventory, production, sales, invoices, payroll, accounting), real-time engine wiring, AI Copilot, web admin portal, FCM push, WhatsApp/SMS, Google Maps, Mobile Money.

### Tech notes (for reference)

- All server reads behind `createServerFn` + `requireSupabaseAuth`; admin role checks via `has_role()` RPC
- Charts via Recharts (already in template)
- Logo: temporary inline SVG with "MAKU FOODS" wordmark + green leaf — replace `src/assets/logo.svg` when you upload the real file

After you approve, I'll execute as one large batch.