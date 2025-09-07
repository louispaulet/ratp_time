# Metro Times — Chevaleret + Place d’Italie (RATP Time App)

Real‑time departures for Paris Metro using the Île‑de‑France Mobilités SIRI Stop Monitoring API. Built with React + Vite, styled with Tailwind.

Live site (if configured): https://ratp.thefrenchartist.dev

## Features
- Real‑time next departures (minutes remaining, destination, direction, stop name, scheduled time, status)
- Auto‑refresh every minute with a 1‑minute cache to limit API calls
- Manual Refresh button
- Homepage sections for:
  - Metro 6 at Chevaleret → Charles de Gaulle – Étoile
  - Metro 7 at Place d’Italie → (direction La Courneuve – 8 Mai 1945, passes Chaussée d’Antin – La Fayette)

## Monitored Lines and Stops

Current monitored pairs (as configured in `src/pages/HomePage.jsx`):

- Metro 6
  - LineRef: `STIF:Line::C01376:`
  - MonitoringRef (Chevaleret platform): `STIF:StopPoint:Q:22174:`
  - Destination filter: contains “Charles de Gaulle – Étoile”

- Metro 7
  - LineRef: `STIF:Line::C01377:`
  - MonitoringRef (Place d’Italie platform): `STIF:StopPoint:Q:463026:`
  - Destination filter: contains “La Courneuve – 8 Mai 1945” (direction that serves Chaussée d’Antin – La Fayette)

## Tech Stack
- React 18 + Vite 5
- React Router 6 (`HashRouter`)
- Tailwind CSS 3
- Deployed via `gh-pages` with custom domain (see `public/CNAME`)

## Getting Started
Prerequisites:
- Node.js 18+ (required by Vite 5)

Install and run:
```bash
npm install
npm run dev
```
Build production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

## Configuration
The app is client‑side and fetches directly from the IDFM SIRI Stop Monitoring API.

- IDs are defined in `src/pages/HomePage.jsx`:
  - Metro 6 → `LineRef: STIF:Line::C01376:` and `MonitoringRef: STIF:StopPoint:Q:22174:` (Chevaleret)
  - Metro 7 → `LineRef: STIF:Line::C01377:` and `MonitoringRef: STIF:StopPoint:Q:463026:` (Place d’Italie)
  - Destination filters are RegExps set via the `destinationPattern` prop in `TransportDisplay` to keep only relevant direction.
  These values are taken from `documentation/perimetre-des-donnees-tr-disponibles-plateforme-idfm.csv` and align with the SIRI identifiers described in `documentation/swagger.json`.

- Auto refresh: Implemented in `src/components/TransportDisplay.jsx` with a 60s interval and a 60s cache window; the Refresh button can bypass the cache.

### How to find or validate IDs (optional)

If you ever need to re‑derive IDs from open data:

- List metro lines to find Metro 6 (LineRef):
  `curl -H "apikey: <YOUR_API_KEY>" "https://prim.iledefrance-mobilites.fr/marketplace/v1/lines?type=METRO" | jq`

- Find Chevaleret stop point (MonitoringRef):
  `curl -H "apikey: <YOUR_API_KEY>" "https://prim.iledefrance-mobilites.fr/marketplace/v1/stop-places?q=Chevaleret" | jq`

2) Validate with SIRI Stop Monitoring

`curl -H "Accept: application/json" -H "apikey: <YOUR_API_KEY>" \
  "https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=<STOPPOINT_ID>&LineRef=<LINE_REF>" | jq`

You should see `MonitoredStopVisit` entries with matching `DestinationName` (e.g., “Charles de Gaulle – Étoile” for M6, “La Courneuve – 8 Mai 1945” for M7). If empty, try the other platform ID for the station or remove the `LineRef` parameter to test.

### API Key and Security Note
The code currently assembles an API key string inside `src/components/TransportDisplay.jsx` for the IDFM API. Exposing API keys in client code is not secure for production.

Recommended options:
- Move the key to a server or serverless proxy and call that from the client
- Or, use a Vite env var (e.g., `VITE_IDFM_API_KEY`) and keep your `.env` files out of version control; note this still exposes the key to end users at runtime, so prefer a proxy for production

## Routing and Hosting
- The app uses `HashRouter` to support static hosting on GitHub Pages.
- The project is configured with a custom domain via `public/CNAME` and `homepage` in `package.json`.

## Deployment (GitHub Pages)
Build and deploy to the `gh-pages` branch using the included script:
```bash
npm run build
npm run deploy
```
If using a project subpath (no custom domain), ensure Vite `base` reflects your repo name (e.g., `base: '/your-repo/'`). With a custom root domain, `base: '/'` is correct.

## Project Structure (selected)
- `src/pages/*` – Page components (Home, About)
- `src/components/*` – UI components (Header, Footer, TransportDisplay, TransportTile)
- `public/CNAME` – Custom domain configuration for GitHub Pages

## Acknowledgements
- Data via Île‑de‑France Mobilités SIRI Stop Monitoring API

## License
No license file is provided. If you plan to open‑source, add a license file appropriate for your needs.
