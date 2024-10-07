// src/pages/MoreTimesPage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function MoreTimesPage() {
  const busLines = {
    '144': 'STIF:Line::C01169:',
  };

  const monitoringRefs = {
    '144': 'STIF:StopPoint:Q:36775:',
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Arrêt Rueil Ville</h1>
      <TransportDisplay busLines={busLines} monitoringRefs={monitoringRefs} />
    </div>
  );
}

export default MoreTimesPage;
