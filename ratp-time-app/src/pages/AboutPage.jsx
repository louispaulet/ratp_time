// src/pages/AboutPage.jsx
import React from 'react'

function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-3">About Metro Times</h1>
      <p className="text-gray-300 mb-6">
        Real-time departures for selected Paris Metro lines using the
        Île-de-France Mobilités SIRI Stop Monitoring API. Built with React + Vite and styled with Tailwind.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What it shows</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-200">
          <li>Next departures with minutes remaining</li>
          <li>Destination, direction, stop/platform name</li>
          <li>Scheduled time and current status</li>
          <li>Auto-refresh every 60 seconds with a short cache</li>
          <li>Manual refresh button to bypass cache</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Lines and stops</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-200">
          <li>
            Metro 6 — Chevaleret → filter for trains toward “Charles de Gaulle – Étoile”
          </li>
          <li>
            Metro 7 — Place d'Italie → filter for trains toward “La Courneuve – 8 Mai 1945”
            (direction that serves Chaussée d'Antin – La Fayette)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">How it works</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-200">
          <li>Client-only app calling the IDFM SIRI Stop Monitoring endpoint</li>
          <li>Refresh interval set to 60s with a 60s cache window</li>
          <li>
            Destination-based filtering keeps only the relevant direction for each monitored stop
          </li>
          <li>Routing uses HashRouter for static hosting compatibility</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Tech stack</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-200">
          <li>React 18 + Vite 5</li>
          <li>React Router 6 (HashRouter)</li>
          <li>Tailwind CSS 3</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Data source and credits</h2>
        <p className="text-gray-300">
          Data provided by the Île-de-France Mobilités SIRI Stop Monitoring API.
          Timetables and service data are subject to change by the operator.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">More info</h2>
        <p className="text-gray-300">
          Learn more or view updates at: {" "}
          <a
            href="https://ratp.thefrenchartist.dev"
            className="text-blue-400 hover:underline"
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
