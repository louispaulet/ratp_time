// src/pages/HomePage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function HomePage() {
  const busLines = {
    '144': 'STIF:Line::C01169:',
    '244': 'STIF:Line::C01240:',
  };

  const monitoringRefs = {
    '144': 'STIF:StopPoint:Q:413091:',
    '244': 'STIF:StopPoint:Q:421321:',
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vers Rueil-Malmaison centre </h1>
      <TransportDisplay busLines={busLines} monitoringRefs={monitoringRefs} />
    </div>
  );
}

export default HomePage;
