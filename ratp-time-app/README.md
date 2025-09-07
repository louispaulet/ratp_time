# RATP Time App

Real‑time departures for Île‑de‑France transport (RATP / IDFM) using the SIRI Stop Monitoring API. Built with React + Vite, styled with Tailwind, and deployed to GitHub Pages.

Live site: https://ratp.thefrenchartist.dev

## Features
- Real‑time next departures (minutes remaining, destination, direction, stop name, scheduled time, status)
- Auto‑refresh every minute with a 1‑minute cache to limit API calls
- Manual Refresh button
- Multiple pages via React Router (using `HashRouter` for static hosting)
  - Home: selected bus lines (e.g., 144, 244)
  - More Times: additional lines/stops (e.g., bus 144 at another stop, RER A)
  - About: brief description

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
The app is client‑side and currently fetches directly from the IDFM SIRI Stop Monitoring API.

- Lines and stops shown on each page are defined in code:
  - Home page: `src/pages/HomePage.jsx`
  - More Times page: `src/pages/MoreTimesPage.jsx`
  Provide mappings for `busLines` (line refs) and `monitoringRefs` (stop point refs):
  ```js
  const busLines = { '144': 'STIF:Line::C01169:' };
  const monitoringRefs = { '144': 'STIF:StopPoint:Q:413091:' };
  ```

- Auto refresh: Implemented in `src/components/TransportDisplay.jsx` with a 60s interval and a 60s cache window; a Refresh button can bypass the cache.

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
- `src/pages/*` – Page components (Home, More Times, About)
- `src/components/*` – UI components (Header, Footer, TransportDisplay, TransportTile)
- `public/CNAME` – Custom domain configuration for GitHub Pages

## Acknowledgements
- Data via Île‑de‑France Mobilités SIRI Stop Monitoring API

## License
No license file is provided. If you plan to open‑source, add a license file appropriate for your needs.
