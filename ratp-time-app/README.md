# Metro Times — Paris Metro Real‑Time Departures

Real‑time departures for selected Paris Metro lines using the Île‑de‑France Mobilités (IDFM) SIRI Stop Monitoring API. Built with React + Vite, styled with Tailwind.

Live site (if configured): https://ratp.thefrenchartist.dev

## Features
- Real‑time next departures (minutes remaining, destination, direction, stop name, scheduled time, status)
- Auto‑refresh every minute with a 1‑minute cache to limit API calls
- Manual refresh button to bypass cache
- Pages:
  - Auto — selects Forwards before noon and Return after noon (Europe/Paris)
  - Forwards — morning commute directions (Chevaleret → Étoile, Place d’Italie → La Courneuve)
  - Return — evening commute directions (Chaussée d’Antin → Place d’Italie, Place d’Italie → Chevaleret)

## Monitored Lines and Stops

Configured in `src/pages/ForwardsPage.jsx` and `src/pages/ReturnTripPage.jsx`:

- Metro 6
  - LineRef: `STIF:Line::C01376:`
  - Forwards → MonitoringRef: `STIF:StopPoint:Q:22174:` (Chevaleret)
  - Return → MonitoringRef: `STIF:StopPoint:Q:463003:` (Place d’Italie alternative platform)
  - Destination filter: contains “Charles de Gaulle – Étoile”

- Metro 7
  - LineRef: `STIF:Line::C01377:`
  - Forwards → MonitoringRef: `STIF:StopPoint:Q:463026:` (Place d’Italie)
  - Return → MonitoringRefs: `STIF:StopPoint:Q:463145:` and `STIF:StopPoint:Q:22388:` (Chaussée d’Antin – La Fayette platforms)
  - Destination filters:
    - Forwards: contains “La Courneuve – 8 Mai 1945” (direction serving Chaussée d’Antin)
    - Return: contains “Italie”, “Ivry”, or “Villejuif”

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

- IDs and filters are defined in `src/pages/ForwardsPage.jsx` and `src/pages/ReturnTripPage.jsx`.
  - Destination filters are RegExps set via the `destinationPattern` prop in `TransportDisplay` to keep only the relevant direction.
  - Values come from `documentation/perimetre-des-donnees-tr-disponibles-plateforme-idfm.csv` and align with the SIRI identifiers in `documentation/swagger.json`.

- Auto‑refresh: Implemented in `src/components/TransportDisplay.jsx` with a 60s interval and a 60s cache window; the Refresh button bypasses the cache.

- Auto page selection: Implemented in `src/pages/AutoPage.jsx` using Europe/Paris time to choose Forwards (before noon) or Return (after noon).

### How to find or validate IDs (optional)

If you ever need to re‑derive IDs from open data:

- List metro lines to find Metro 6 (LineRef):
  `curl -H "apikey: <YOUR_API_KEY>" "https://prim.iledefrance-mobilites.fr/marketplace/v1/lines?type=METRO" | jq`

- Find Chevaleret stop point (MonitoringRef):
  `curl -H "apikey: <YOUR_API_KEY>" "https://prim.iledefrance-mobilites.fr/marketplace/v1/stop-places?q=Chevaleret" | jq`

Validate with SIRI Stop Monitoring

`curl -H "Accept: application/json" -H "apikey: <YOUR_API_KEY>" \
  "https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=<STOPPOINT_ID>&LineRef=<LINE_REF>" | jq`

You should see `MonitoredStopVisit` entries with matching `DestinationName` (e.g., “Charles de Gaulle – Étoile” for M6, “La Courneuve – 8 Mai 1945” for M7). If empty, try the other platform ID for the station or remove the `LineRef` parameter to test.

### API Key and Security Note
The code currently assembles an API key string inside `src/components/TransportDisplay.jsx` for the IDFM API. Exposing API keys in client code is not secure for production.

Recommended options:
- Move the key to a server or serverless proxy and call that from the client
- Or, use a Vite env var (e.g., `VITE_IDFM_API_KEY`) and keep your `.env` files out of version control; note this still exposes the key to end users at runtime, so prefer a proxy for production

## Routing and Hosting
- Uses `HashRouter` for static hosting compatibility (e.g., GitHub Pages).
- Configured with a custom domain via `public/CNAME` and `homepage` in `package.json`.

## Deployment (GitHub Pages)
Build and deploy to the `gh-pages` branch using the included script:
```bash
npm run build
npm run deploy
```
If using a project subpath (no custom domain), ensure Vite `base` reflects your repo name (e.g., `base: '/your-repo/'`). With a custom root domain, `base: '/'` is correct.

## Project Structure (selected)
- `src/pages/*` – Page components (Auto, Forwards, Return, About)
- `src/components/*` – UI components (Header, Footer, TransportDisplay, TransportTile)
- `public/CNAME` – Custom domain configuration for GitHub Pages

## Contributing
- Read `AGENTS.md` for coding conventions, file layout, and how to add/update monitored lines and stops.
- Run `npm run lint` before submitting changes; keep edits minimal and focused.
- If behavior or routes change, update both `README.md` and `src/pages/AboutPage.jsx`.

## Disclaimer
This project is not affiliated with RATP or Île‑de‑France Mobilités. Information is provided as‑is and may differ from on‑site signage.

## Acknowledgements
- Data via Île‑de‑France Mobilités SIRI Stop Monitoring API

## License
No license file is provided. If you plan to open‑source, add a license file appropriate for your needs.
