// src/components/TransportTile.jsx
import React, { useState, useEffect } from 'react';

function TransportTile({ bus }) {
  const [timeLeft, setTimeLeft] = useState(bus.timeUntilDeparture);

  useEffect(() => {
    // Update timeLeft every minute
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 60000); // 1 minute interval

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Reset timeLeft if bus.timeUntilDeparture changes
    setTimeLeft(bus.timeUntilDeparture);
  }, [bus.timeUntilDeparture]);

  return (
    <div className="bg-white rounded shadow p-4 flex">
      {/* Left Side: Time Until Departure */}
      <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-300">
        {timeLeft > 0 ? (
          <>
            <span className="text-6xl font-bold">{timeLeft}</span>
            <span className="text-xl">min</span>
          </>
        ) : (
          <span className="text-4xl font-bold">Due</span>
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
