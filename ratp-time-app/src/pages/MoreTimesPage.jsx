// src/pages/MoreTimesPage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function MoreTimesPage() {
  const bus144 = {
    busLines: { '144': 'STIF:Line::C01169:' },
    monitoringRefs: { '144': 'STIF:StopPoint:Q:36775:' },
  };

  const rerA = {
    busLines: { 'RER_A': 'STIF:Line::C01742:' },
    monitoringRefs: { 'RER_A': 'STIF:StopPoint:Q:474020:' },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Arrêt Rueil Ville & Rueil Malmaison</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Ligne 144</h2>
        <TransportDisplay
          busLines={bus144.busLines}
          monitoringRefs={bus144.monitoringRefs}
        />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">RER A</h2>
        <TransportDisplay
          busLines={rerA.busLines}
          monitoringRefs={rerA.monitoringRefs}
        />
      </div>
    </div>
  );
}

export default MoreTimesPage;
