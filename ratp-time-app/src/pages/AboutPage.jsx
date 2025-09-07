// src/pages/AboutPage.jsx
import React from 'react'

function AboutPage() {
  return (
    <div className="container">
      <h1 className="md-title-large" style={{marginBottom:12}}>About Metro Times</h1>
      <p className="md-body" style={{marginBottom:20}}>
        Metro Times shows real-time departures for selected Paris Metro lines using the
        Île-de-France Mobilités (IDFM) SIRI Stop Monitoring API. Built with React + Vite and styled with Tailwind.
      </p>

      <section className="mb-8">
        <h2 className="md-title-medium" style={{marginBottom:8}}>What it shows</h2>
        <ul className="list-disc list-inside md-body" style={{marginLeft:16}}>
          <li>Next departures with minutes remaining</li>
          <li>Destination and stop/platform name</li>
          <li>Scheduled time and current status</li>
          <li>Auto-refresh every 60 seconds with a short cache</li>
          <li>Manual refresh button to bypass cache</li>
          <li>Responsive grid: 2 tiles per row on mobile, 4 on desktop</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="md-title-medium" style={{marginBottom:8}}>Pages</h2>
        <ul className="list-disc list-inside md-body" style={{marginLeft:16}}>
          <li>
            Auto — picks the most relevant view based on the time of day (before noon → Forwards, afternoon/evening → Return)
          </li>
          <li>Forwards — morning commute directions</li>
          <li>Return — evening commute directions</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="md-title-medium" style={{marginBottom:8}}>Lines and stops</h2>
        <ul className="list-disc list-inside md-body" style={{marginLeft:16}}>
          <li>
            Metro 6 — Chevaleret → filter for trains toward “Charles de Gaulle – Étoile”
          </li>
          <li>
            Metro 7 — Place d’Italie → filter for trains toward “La Courneuve – 8 Mai 1945”
            (direction that serves Chaussée d’Antin – La Fayette)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="md-title-medium" style={{marginBottom:8}}>How it works</h2>
        <ul className="list-disc list-inside md-body" style={{marginLeft:16}}>
          <li>Client-only app calling the IDFM SIRI Stop Monitoring endpoint</li>
          <li>Refresh interval set to 60s with a 60s cache window</li>
          <li>
            Destination-based filtering keeps only the relevant direction for each monitored stop
          </li>
          <li>Routing uses HashRouter for static hosting compatibility</li>
          <li>UI simplification: removed duplicate "Direction" field (destination already conveys it)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="md-title-medium" style={{marginBottom:8}}>Tech stack</h2>
        <ul className="list-disc list-inside md-body" style={{marginLeft:16}}>
          <li>React 18 + Vite 5</li>
          <li>React Router 6 (HashRouter)</li>
          <li>Tailwind CSS 3</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="md-title-medium" style={{marginBottom:8}}>Data source and credits</h2>
        <p className="md-body">
          Data provided by the Île-de-France Mobilités SIRI Stop Monitoring API.
          Timetables and service data are subject to change by the operator.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="md-title-medium" style={{marginBottom:8}}>Disclaimer</h2>
        <p className="md-body">
          This project is not affiliated with RATP or Île-de-France Mobilités. Information is provided as-is and may differ from on-site signage.
        </p>
      </section>

      <section>
        <h2 className="md-title-medium" style={{marginBottom:8}}>More info</h2>
        <p className="md-body">
          Learn more or view updates at: {" "}
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
      </section>
    </div>
  )
}

export default AboutPage
