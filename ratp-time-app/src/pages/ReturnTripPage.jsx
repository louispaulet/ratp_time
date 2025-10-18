// src/pages/ReturnTripPage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function ReturnTripPage() {
  return (
    <div className="container">
      <TransportDisplay
        metroLines={{ 'M12': 'STIF:Line::C01382:' }}
        // Trinité – d’Estienne d’Orves (Line 12) toward Madeleine and Mairie d'Issy
        metroMonitoringRefs={{ 'M12': 'STIF:StopPoint:Q:463317:' }}
        destinationPattern={/mairie\s+d['’]?issy/i}
        title={"Metro 12 — Trinité – d’Estienne d’Orves → Madeleine"}
      />

      <div className="spacer-24" />

      <TransportDisplay
        metroLines={{ 'M14': 'STIF:Line::C01384:' }}
        // Madeleine (Line 14) heading back to Bercy toward Aéroport d'Orly
        metroMonitoringRefs={{ 'M14': 'STIF:StopPoint:Q:21961:' }}
        destinationPattern={/orly/i}
        title={"Metro 14 — Madeleine → Bercy"}
      />

      <div className="spacer-24" />

      <TransportDisplay
        metroLines={{ 'M6': 'STIF:Line::C01376:' }}
        // Bercy (Line 6) toward Chevaleret and Charles de Gaulle – Étoile
        metroMonitoringRefs={{ 'M6': ['STIF:StopPoint:Q:463128:', 'STIF:StopPoint:Q:22178:'] }}
        destinationPattern={/etoile|charles\s*de\s*gaulle/i}
        title={"Metro 6 — Bercy → Chevaleret"}
      />
    </div>
  );
}

export default ReturnTripPage;
