// src/pages/AboutPage.jsx
import React from 'react'

function Card({ icon, title, children, index = 0 }) {
  return (
    <div className="md-card fx-card fx-animate" style={{padding: 20, '--i': index}}>
      <div className="fx-title-row" style={{marginBottom:10}}>
        {icon ? (
          <span className="material-symbols-rounded fx-icon" aria-hidden style={{fontSize:18}}>{icon}</span>
        ) : null}
        <h2 className="md-title-medium" style={{margin:0}}>{title}</h2>
      </div>
      <div className="md-body">
        {children}
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="container">
      {/* Hero */}
      <section
        className="md-card fx-hero fx-animate"
        style={{
          padding: 24,
          borderColor: 'transparent',
        }}
      >
        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:6}}>
          <span className="material-symbols-rounded" style={{color:'var(--md-color-accent)'}}>train</span>
          <h1 className="md-title-large" style={{margin:0}}>About Metro Times</h1>
        </div>
        <p className="md-body" style={{margin:0}}>
          Metro Times shows real-time departures for selected Paris Metro lines using the
          Île-de-France Mobilités (IDFM) SIRI Stop Monitoring API. Built with React + Vite and styled with Tailwind.
        </p>
      </section>

      <div className="spacer-24" />

      {/* First row: What it shows, Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fx-grid">
        <Card title="What it shows" icon="visibility" index={0}>
          <ul className="list-disc list-inside" style={{marginLeft:16}}>
            <li>Next departures with minutes remaining</li>
            <li>Destination and stop/platform name</li>
            <li>Scheduled time and current status</li>
            <li>Auto-refresh every 60 seconds with a short cache</li>
            <li>Manual refresh button to bypass cache</li>
            <li>Responsive grid: 2 tiles per row on mobile, 4 on desktop</li>
          </ul>
        </Card>

        <Card title="Pages" icon="dashboard" index={1}>
          <ul className="list-disc list-inside" style={{marginLeft:16}}>
            <li>
              Auto — picks the most relevant view based on the time of day (before noon → Forwards, afternoon/evening → Return)
            </li>
            <li>Forwards — morning commute directions</li>
            <li>Return — evening commute directions</li>
          </ul>
        </Card>
      </div>

      <div className="spacer-24" />

      {/* Second row: Lines & stops, How it works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fx-grid">
        <Card title="Lines and stops" icon="map" index={0}>
          <ul className="list-disc list-inside" style={{marginLeft:16}}>
            <li>
              Metro 6 — Chevaleret → filter for trains toward “Charles de Gaulle – Étoile”
            </li>
            <li>
              Metro 7 — Place d’Italie → filter for trains toward “La Courneuve – 8 Mai 1945”
              (direction that serves Chaussée d’Antin – La Fayette)
            </li>
          </ul>
        </Card>

        <Card title="How it works" icon="bolt" index={1}>
          <ul className="list-disc list-inside" style={{marginLeft:16}}>
            <li>Client-only app calling the IDFM SIRI Stop Monitoring endpoint</li>
            <li>Refresh interval set to 60s with a 60s cache window</li>
            <li>
              Destination-based filtering keeps only the relevant direction for each monitored stop
            </li>
            <li>Routing uses HashRouter for static hosting compatibility</li>
            <li>UI simplification: removed duplicate "Direction" field (destination already conveys it)</li>
          </ul>
        </Card>
      </div>

      <div className="spacer-24" />

      {/* Third row: Tech + Data source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fx-grid">
        <Card title="Tech stack" icon="stack" index={0}>
          <ul className="list-disc list-inside" style={{marginLeft:16}}>
            <li>React 18 + Vite 5</li>
            <li>React Router 6 (HashRouter)</li>
            <li>Tailwind CSS 3</li>
          </ul>
        </Card>

        <Card title="Data source and credits" icon="database" index={1}>
          <p>
            Data provided by the Île-de-France Mobilités SIRI Stop Monitoring API.
            Timetables and service data are subject to change by the operator.
          </p>
        </Card>
      </div>

      <div className="spacer-24" />

      {/* Final row: Disclaimer + More info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fx-grid">
        <Card title="Disclaimer" icon="verified_user" index={0}>
          <p>
            This project is not affiliated with RATP or Île-de-France Mobilités. Information is provided as-is and may differ from on-site signage.
          </p>
        </Card>

        <Card title="More info" icon="link" index={1}>
          <p>
            Learn more or view updates at: {' '}
            <a
              href="https://ratp.thefrenchartist.dev"
              className="hover:underline"
              style={{color:'var(--md-color-secondary)'}}
              target="_blank"
              rel="noreferrer"
            >
              ratp.thefrenchartist.dev
            </a>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default AboutPage
