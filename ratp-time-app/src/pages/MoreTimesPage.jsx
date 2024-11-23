// src/pages/MoreTimesPage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function MoreTimesPage() {
  const busLines = {
    '144': 'STIF:Line::C01169:',
    'RER_A': 'STIF:Line::C01742:', // Add the RER A line
  };

  const monitoringRefs = {
    '144': 'STIF:StopPoint:Q:36775:',
    'RER_A': 'STIF:StopPoint:Q:474022:', // Add the monitoring reference for Rueil Malmaison
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Arrêt Rueil Ville & Rueil Malmaison (RER A)</h1>
      <TransportDisplay busLines={busLines} monitoringRefs={monitoringRefs} />
    </div>
  );
}

export default MoreTimesPage;
