// src/pages/HomePage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function HomePage() {
  // TODO: Replace the placeholders below with the actual IDFM SIRI identifiers
  // for Metro 6 (LineRef) and Chevaleret stop point (MonitoringRef).
  // See README for instructions to retrieve them.
  const busLines = {
    // Key is the label shown in the UI, value is the SIRI LineRef.
    // Per perimetre-des-donnees-tr-disponibles-plateforme-idfm.csv (Chevaleret, Metro 6)
    'M6': 'STIF:Line::C01376:',
  };

  const monitoringRefs = {
    // From perimetre-des-donnees-tr-disponibles-plateforme-idfm.csv
    // Chevaleret StopPoint (platform): STIF:StopPoint:Q:22174:
    'M6': 'STIF:StopPoint:Q:22174:',
  };

  return (
    <div className="container">
      <h1 className="md-title-large" style={{margin:'12px 0 12px'}}>Metro 6 — Chevaleret → Charles de Gaulle – Étoile</h1>
      <TransportDisplay
        busLines={busLines}
        monitoringRefs={monitoringRefs}
        destinationPattern={/charles\s+de\s+gaulle/i}
      />

      <div className="spacer-24" />

      <h2 className="md-title-large" style={{margin:'12px 0 12px'}}>Metro 7 — Place d'Italie → Chaussée d'Antin – La Fayette</h2>
      <TransportDisplay
        busLines={{ 'M7': 'STIF:Line::C01377:' }}
        // Place d'Italie (Line 7) StopPoint candidates include Q:22365 and Q:463026; switch to Q:463026
        monitoringRefs={{ 'M7': 'STIF:StopPoint:Q:463026:' }}
        // Filter trains heading toward La Courneuve – 8 Mai 1945 (direction that serves Chaussée d'Antin)
        destinationPattern={/courneuve/i}
      />
    </div>
  );
}

export default HomePage;
