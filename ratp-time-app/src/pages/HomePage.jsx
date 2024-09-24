// src/pages/HomePage.jsx
import React from 'react';
import TransportDisplay from '../components/TransportDisplay';

function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Next Bus Departures</h1>
      <TransportDisplay />
    </div>
  );
}

export default HomePage;
