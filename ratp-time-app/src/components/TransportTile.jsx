// src/components/TransportTile.jsx
import React from 'react';

function TransportTile({ bus }) {
  return (
    <div className="bg-white rounded shadow p-4 flex">
      {/* Left Side: Time Until Departure */}
      <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-300">
        {bus.timeUntilDeparture > 0 ? (
          <>
            <span className="text-6xl font-bold">{bus.timeUntilDeparture}</span>
            <span className="text-xl">min</span>
          </>
        ) : (
          <span className="text-4xl font-bold">Departed</span>
        )}
      </div>

      {/* Right Side: Bus Information */}
      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-bold mb-2">Bus {bus.number}</h2>
        <p>
          <strong>Direction:</strong> {bus.direction}
        </p>
        <p>
          <strong>Destination:</strong> {bus.destination}
        </p>
        <p>
          <strong>Stop:</strong> {bus.stopName}
        </p>
        <p>
          <strong>Departure Time:</strong> {bus.expectedTime}
        </p>
        <p>
          <strong>Status:</strong> {bus.status}
        </p>
      </div>
    </div>
  );
}

export default TransportTile;
