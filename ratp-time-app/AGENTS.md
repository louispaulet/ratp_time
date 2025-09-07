# AGENTS.md — Working Guidelines for This Repo

Scope: Applies to the whole project unless a more specific AGENTS.md is added in a subdirectory.

Project Overview
- Single‑page React app (Vite) that displays real‑time Paris Metro departures from the Île‑de‑France Mobilités (IDFM) SIRI Stop Monitoring API.
- Pages live in `src/pages` and components in `src/components`.
- Routing uses `HashRouter` for static hosting compatibility (GitHub Pages).

Key Files
- `src/pages/ForwardsPage.jsx` — Morning/“outbound” view (M6 Chevaleret → Étoile, M7 Place d’Italie → La Courneuve).
- `src/pages/ReturnTripPage.jsx` — Evening/“return” view (M7 Chaussée d’Antin → Place d’Italie, M6 Place d’Italie → Chevaleret).
- `src/pages/AutoPage.jsx` — Picks Forwards before noon and Return after noon (Europe/Paris timezone).
- `src/pages/AboutPage.jsx` — App overview, features, lines/stops, disclaimer, site link.
- `src/components/TransportDisplay.jsx` — Fetch + list rendering. Accepts `metroLines`, `metroMonitoringRefs`, `destinationPattern`, `title`.
- `src/components/TransportTile.jsx` — Individual card.
- `src/components/Header.jsx`, `src/components/Footer.jsx` — Layout.
- `src/index.css` — Tailwind plus a Material‑inspired dark theme via CSS variables and `md-*` utility classes.
- `index.html` — Document title and global font/icon includes.
 - `public/favicon.svg` — Favicon (white or black badge with orange “M”).

Wording & UX Style Guide
- Product name: “Metro Times”. Use consistently across code and docs.
- Navigation labels: `Home`, `Forwards`, `Return`, `About`.
- Page titles (examples):
  - Forwards: `Metro 6 — Chevaleret → Charles de Gaulle – Étoile` and `Metro 7 — Place d’Italie → Chaussée d’Antin – La Fayette`.
  - Return: `Metro 7 — Chaussée d’Antin – La Fayette → Place d’Italie` and `Metro 6 — Place d’Italie → Chevaleret`.
- Buttons and messages:
  - Refresh button: `Refresh` (changes to `Refreshing…` during fetch).
  - Empty state: `No metro data available.`
  - Time badge: use `min` for minutes; when <= 0 display `Due`.
- Tile labels: `Destination:`, `Stop:`, `Departure Time:`, `Status:`.
- Typography and punctuation: keep smart punctuation and diacritics as in UI copy
  (e.g., `d’Italie`, `Étoile`, `—` em dash, `→` right arrow).
- Date/time formatting: keep `en-GB` formatting and Europe/Paris timezone for display.
- About page sections should include: What it shows, Pages, Lines and stops, How it works, Tech stack, Data source and credits, Disclaimer, More info.
- Footer: `© YEAR Metro Times App. All rights reserved.`
- Keep the `<title>` in `index.html` aligned with branding and README.

About Page Presentation (FX)
- The About page may use tasteful animations/effects without changing the wording.
- Available CSS helpers in `src/index.css`:
  - `fx-hero` — gradient hero with soft glows.
  - `fx-card` — premium card with a very slow shimmer overlay.
  - `fx-grid` + `fx-animate` — staggered reveal; pass `style={{ '--i': index }}` or `index` prop in JSX for delay.
  - Animation timings: shimmer is `30s` (`.fx-card::after { animation: fx-shimmer 30s linear infinite; }`). Keep it subtle.
- Prefer CSS‑only animations; avoid new JS dependencies for motion.
- Keep content text exactly as in the current About page; only adjust layout/presentation.

Coding Conventions
- React 18 functional components only; keep files focused and small. Default export the main component.
- Prefer existing `md-*` classes and CSS variables from `src/index.css` for colors/typography; use Tailwind utilities for layout/spacing.
- Keep inline styles minimal (only for small layout adjustments where a utility would be noisy).
- Do not introduce state managers or new large dependencies without necessity.
- Keep refresh cadence at 60s in `TransportDisplay.jsx` unless there’s a strong reason.

Branding & Icons
- Favicon lives at `public/favicon.svg` and is referenced in `index.html` as `/favicon.svg`.
- Current design: rounded square badge with an orange “M” (`#ff6d00`). Background is black for strong contrast.
- If changing colors, ensure high contrast on common tab backgrounds (white and dark).
- Browsers cache favicons; after changes, a hard refresh or cache busting may be needed.

Titles
- `index.html` title: `Metro Times — Paris Metro Real‑Time Departures`.
- Keep route and page titles consistent with this branding.

Data & API Configuration
- Do not hard‑code real API keys in the repo. The current key logic is demo‑only; prefer an env var (`VITE_IDFM_API_KEY`) or a proxy. If you touch API code, keep the README “API Key and Security Note” updated.
- SIRI endpoint (from `documentation/swagger.json`):
  - Host: `prim.iledefrance-mobilites.fr`, Base path: `/marketplace`, Path: `/stop-monitoring`.
  - Header: `apikey` (securityDefinitions.apiKey).
  - Query params: required `MonitoringRef`, optional `LineRef`.
  - Handle `400` by retrying without `LineRef` (already implemented in `TransportDisplay.jsx`).
- When adding a new monitored line/stop:
  1) Put the SIRI `LineRef` and `MonitoringRef` values in the relevant page (`ForwardsPage.jsx` or `ReturnTripPage.jsx`).
  2) If a stop has multiple quai IDs, you may pass an array to `metroMonitoringRefs`.
  3) Use a `destinationPattern` RegExp to filter to the intended direction.
  4) Update `README.md` (Monitored Lines and Stops) and `src/pages/AboutPage.jsx` accordingly.

Routing & Hosting
- Keep `HashRouter` unless the hosting model changes away from static pages.
- Custom domain is configured via `public/CNAME` and `homepage` in `package.json`.

Linting & Formatting
- ESLint is configured in `eslint.config.js`. Run `npm run lint` before larger edits.
- Follow the existing code style; avoid adding header banners or copyright notices.

Manual Validation Checklist
- `npm run dev` — sanity check pages (Auto/Forwards/Return) and refresh button behavior.
- Validate new `destinationPattern` filters by confirming only the intended direction appears.
- If you change monitored IDs, verify API responses contain `MonitoredStopVisit` entries.
- Confirm About and README reflect any wording or route changes.
- Check `index.html` `<title>` matches branding and current scope.

Documentation
- If you change behavior, add/remove lines or stops, or alter routes/labels, update both `README.md` and `AboutPage.jsx` to match. Keep typographic punctuation and diacritics intact.

Out of Scope for Routine Edits
- Do not migrate to server‑side rendering or add a backend unless explicitly requested.
- Do not replace the design system; iterate within Tailwind + `md-*` helpers.
