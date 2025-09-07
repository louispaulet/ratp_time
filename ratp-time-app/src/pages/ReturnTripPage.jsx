// src/pages/ReturnTripPage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function ReturnTripPage() {
  return (
    <div className="container">
      {/* Metro 7 — Chaussée d’Antin → Place d’Italie (southbound) */}
      <TransportDisplay
        metroLines={{ 'M7': 'STIF:Line::C01377:' }}
        // Chaussée d'Antin - La Fayette (Line 7) platforms (both directions listed to ensure coverage)
        metroMonitoringRefs={{ 'M7': ['STIF:StopPoint:Q:463145:', 'STIF:StopPoint:Q:22388:'] }}
        // Trains going to Place d'Italie continue toward Villejuif – Louis Aragon or Mairie d'Ivry
        destinationPattern={/italie|ivry|villejuif/i}
        title={"Metro 7 — Chaussée d’Antin – La Fayette → Place d’Italie"}
      />

      <div className="spacer-24" />

      {/* Metro 6 — Place d’Italie → Chevaleret (toward Charles de Gaulle – Étoile) */}
      <TransportDisplay
        metroLines={{ 'M6': 'STIF:Line::C01376:' }}
        // Try the alternative quai at Place d'Italie for Line 6
        metroMonitoringRefs={{ 'M6': 'STIF:StopPoint:Q:463003:' }}
        // Trains toward Chevaleret are heading to Charles de Gaulle – Étoile
        destinationPattern={/etoile|charles\s*de\s*gaulle/i}
        title={"Metro 6 — Place d’Italie → Chevaleret"}
      />
    </div>
  );
}

export default ReturnTripPage;
