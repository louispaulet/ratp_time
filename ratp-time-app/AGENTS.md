# AGENTS.md — Working Guidelines for This Repo

Scope: Applies to the whole project unless a more specific AGENTS.md is added in a subdirectory.

Project overview
- Single‑page React app (Vite) that displays real‑time Paris Metro departures from the Île‑de‑France Mobilités SIRI Stop Monitoring API.
- Pages live in `src/pages` and components in `src/components`.
- Routing uses `HashRouter` for static hosting compatibility (GitHub Pages).

Key files
- `src/pages/ForwardsPage.jsx` — Morning/“outbound” view (M6 Chevaleret → Étoile, M7 Place d’Italie → La Courneuve).
- `src/pages/ReturnTripPage.jsx` — Evening/“return” view (M7 Chaussée d’Antin → Place d’Italie, M6 Place d’Italie → Chevaleret).
- `src/pages/AutoPage.jsx` — Picks Forwards before noon and Return after noon (Europe/Paris timezone).
- `src/components/TransportDisplay.jsx` — Fetch + list rendering. Accepts `metroLines`, `metroMonitoringRefs`, `destinationPattern`, `title`.
- `src/components/TransportTile.jsx` — Individual card.
- `src/components/Header.jsx`, `src/components/Footer.jsx` — Layout.
- `src/index.css` — Tailwind plus a small Material‑inspired dark theme via CSS variables and `md-*` utility classes.

Coding conventions
- React 18 functional components only; keep files focused and small.
- Default export the component defined in the file.
- Prefer existing `md-*` classes and CSS variables from `src/index.css` for colors/typography; use Tailwind utilities for layout/spacing.
- Keep inline styles minimal (only for small layout adjustments where a utility would be noisy).
- Do not introduce state managers or new large dependencies without necessity.
- Keep refresh cadence at 60s in `TransportDisplay.jsx` unless there’s a strong reason.

Data/configuration
- Do not hard‑code real API keys in the repo. The current key logic is for demo only; prefer an environment variable (`VITE_IDFM_API_KEY`) or a proxy when making changes. If you touch API code, add a short security note to README.
- When adding a new monitored line/stop:
  1) Put the SIRI `LineRef` and `MonitoringRef` values in the relevant page (`ForwardsPage.jsx` or `ReturnTripPage.jsx`).
  2) If a stop has multiple quai IDs, you may pass an array to `metroMonitoringRefs`.
  3) Use a `destinationPattern` RegExp to filter to the intended direction.
  4) Update `README.md` (Monitored Lines and Stops) and `src/pages/AboutPage.jsx` accordingly.

Routing and hosting
- Keep `HashRouter` unless the hosting model changes away from static pages.
- Custom domain is configured via `public/CNAME` and `homepage` in `package.json`.

Linting and formatting
- ESLint is configured in `eslint.config.js`. Run `npm run lint` locally before larger edits.
- Follow the existing code style; avoid adding header banners or copyright notices.

Validation checklist (manual)
- `npm run dev` — sanity check pages (Auto/Forwards/Return) and refresh button behavior.
- Validate new `destinationPattern` filters by confirming only the intended direction appears.
- If you change monitored IDs, verify API responses contain `MonitoredStopVisit` entries for those IDs.

Documentation
- If you change behavior, add or remove lines/stops, or alter routes, update both `README.md` and `AboutPage.jsx` to match.

Out of scope for routine edits
- Do not migrate to server‑side rendering or add a backend unless explicitly requested.
- Do not replace the design system; iterate within Tailwind + `md-*` helpers.

