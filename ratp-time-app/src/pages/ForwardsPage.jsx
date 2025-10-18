// src/pages/HomePage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function ForwardsPage() {
  // IDFM SIRI identifiers for the morning itinerary:
  // - Metro 6 (Chevaleret eastbound toward Nation)
  const metroLines = {
    'M6': 'STIF:Line::C01376:',
  };

  const metroMonitoringRefs = {
    // Include both Chevaleret platforms; filter keeps only Nation-bound departures.
    'M6': ['STIF:StopPoint:Q:22174:', 'STIF:StopPoint:Q:463147:'],
  };

  return (
    <div className="container">
      <TransportDisplay
        metroLines={metroLines}
        metroMonitoringRefs={metroMonitoringRefs}
        destinationPattern={/nation/i}
        title={"Metro 6 — Chevaleret → Bercy"}
      />

      <div className="spacer-24" />

      <TransportDisplay
        metroLines={{ 'M14': 'STIF:Line::C01384:' }}
        // Bercy (Line 14) toward Madeleine and Saint-Denis – Pleyel
        metroMonitoringRefs={{ 'M14': 'STIF:StopPoint:Q:21957:' }}
        destinationPattern={/saint[-\s]*denis|pleyel/i}
        title={"Metro 14 — Bercy → Madeleine"}
      />

      <div className="spacer-24" />

      <TransportDisplay
        metroLines={{ 'M12': 'STIF:Line::C01382:' }}
        // Madeleine (Line 12) toward Trinité – d’Estienne d’Orves and Mairie d'Aubervilliers
        metroMonitoringRefs={{ 'M12': 'STIF:StopPoint:Q:463081:' }}
        destinationPattern={/aubervilliers/i}
        title={"Metro 12 — Madeleine → Trinité – d’Estienne d’Orves"}
      />
    </div>
  );
}

export default ForwardsPage;
