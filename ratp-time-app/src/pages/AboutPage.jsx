// src/pages/AboutPage.jsx
import React from 'react'

function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About This App</h1>
      <p>
        This app shows real-time departures for Paris Metro line 6 at Chevaleret,
        towards Charles de Gaulle – Étoile, using the Île-de-France Mobilités
        SIRI Stop Monitoring API.
      </p>
    </div>
  )
}

export default AboutPage
