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
    <div className="container flex flex-col min-h-full">
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
          <p>
            Glanceable next departures with minutes remaining, destination, stop/platform, and current status — all in one view. Auto‑refresh keeps things up to date every 60 seconds (with a short cache), and you can refresh instantly whenever you like. The layout adapts from 2 tiles on mobile to 4 on desktop for a clean, quick read. ⏱️📱
          </p>
        </Card>

        <Card title="Pages" icon="dashboard" index={1}>
          <p>
            Auto picks the best view based on the time of day — 🌅 mornings go Forwards, 🌆 afternoons/evenings go Return. Prefer control? Jump straight to Forwards for the outbound commute or Return for the way back. 🤖🧭
          </p>
        </Card>
      </div>

      <div className="spacer-24" />

      {/* Second row: Lines & stops (full width), then 2x2 grid for remaining cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fx-grid">
        <div className="md:col-span-2">
          <Card title="Lines and stops" icon="map" index={2}>
            <ul className="list-disc list-outside pl-4">
              <li>
                Metro 6 — Chevaleret → filter for trains toward “Charles de Gaulle – Étoile”
              </li>
              <li>
                Metro 7 — Place d’Italie → filter for trains toward “La Courneuve – 8 Mai 1945”
                (direction that serves Chaussée d’Antin – La Fayette)
              </li>
            </ul>
          </Card>
        </div>

        <Card title="How it works" icon="bolt" index={3}>
          <p>
            A lightweight, client‑only app calls the IDFM SIRI Stop Monitoring endpoint and refreshes every 60 seconds with a matching cache window. We filter by destination so you only see the relevant direction for each stop, and use HashRouter for reliable static hosting. ⚡🔁🧭
          </p>
        </Card>
        <Card title="Tech stack" icon="stack" index={4}>
          <p>
            React 18 + Vite 5, React Router 6 (HashRouter), and Tailwind CSS 3 — a modern, lean stack built to load fast and stay maintainable. 🧩⚙️
          </p>
        </Card>

        <Card title="Data source and credits" icon="database" index={5}>
          <p>
            Data provided by the Île-de-France Mobilités SIRI Stop Monitoring API. Timetables and service data are subject to change by the operator. 🗄️
          </p>
        </Card>
        <Card title="Disclaimer" icon="verified_user" index={6}>
          <p>
            This project is not affiliated with RATP or Île-de-France Mobilités. Information is provided as‑is and may differ from on‑site signage. ⚠️
          </p>
        </Card>
      </div>

      {/* Inline: More info */}
      <div className="flex-1" />
      <p className="md-body mt-6" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
        <span className="material-symbols-rounded" style={{color:'var(--md-color-accent)'}}>train</span>
        <span>
        Learn more or view updates: {' '}
        <a
          href="https://ratp.thefrenchartist.dev"
          className="hover:underline"
          style={{color:'var(--md-color-secondary)'}}
          target="_blank"
          rel="noreferrer"
        >
          ratp.thefrenchartist.dev
        </a>{' '}🔗
        </span>
      </p>
      <div className="flex-1" />
    </div>
  )
}

export default AboutPage
