// src/pages/HomePage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function ForwardsPage() {
  // IDFM SIRI identifiers (validated):
  // - Metro 6 (LineRef) + Chevaleret stop point (MonitoringRef)
  // - Metro 7 (LineRef) + Place d’Italie stop point (MonitoringRef)
  const metroLines = {
    // Key is the label shown in the UI, value is the SIRI LineRef.
    // Per perimetre-des-donnees-tr-disponibles-plateforme-idfm.csv (Chevaleret, Metro 6)
    'M6': 'STIF:Line::C01376:',
  };

  const metroMonitoringRefs = {
    // From perimetre-des-donnees-tr-disponibles-plateforme-idfm.csv
    // Chevaleret StopPoint (platform): STIF:StopPoint:Q:22174:
    'M6': 'STIF:StopPoint:Q:22174:',
  };

  return (
    <div className="container">
      <TransportDisplay
        metroLines={metroLines}
        metroMonitoringRefs={metroMonitoringRefs}
        destinationPattern={/charles\s+de\s+gaulle/i}
        title={"Metro 6 — Chevaleret → Charles de Gaulle – Étoile"}
      />

      <div className="spacer-24" />

      <TransportDisplay
        metroLines={{ 'M7': 'STIF:Line::C01377:' }}
        // Place d’Italie (Line 7) StopPoint candidates include Q:22365 and Q:463026; using Q:463026
        metroMonitoringRefs={{ 'M7': 'STIF:StopPoint:Q:463026:' }}
        // Filter trains heading toward La Courneuve – 8 Mai 1945 (direction that serves Chaussée d’Antin)
        destinationPattern={/courneuve/i}
        title={"Metro 7 — Place d’Italie → Chaussée d’Antin – La Fayette"}
      />
    </div>
  );
}

export default ForwardsPage;
