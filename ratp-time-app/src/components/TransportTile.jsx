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
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-between transition-transform duration-300 hover:scale-105 max-w-sm mx-auto mb-4">
      {/* Time Until Departure */}
      <div className="flex items-center justify-center bg-blue-100 rounded-full w-20 h-20 mb-4">
        {timeLeft > 0 ? (
          <>
            <span className="text-4xl font-bold text-blue-600">{timeLeft}</span>
            <span className="text-sm font-medium text-gray-500">min</span>
          </>
        ) : (
          <span className="text-4xl font-bold text-red-600">Due</span>
        )}
      </div>

      {/* Bus Information */}
      <div className="w-full text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Bus {bus.number}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <strong className="font-medium text-blue-500">Direction:</strong> {bus.direction}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong className="font-medium text-blue-500">Destination:</strong> {bus.destination}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong className="font-medium text-blue-500">Stop:</strong> {bus.stopName}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong className="font-medium text-blue-500">Departure Time:</strong> {bus.expectedTime}
        </p>
        <p className={`text-sm font-bold mt-2 ${
          bus.status === 'onTime' ? 'text-green-500' : 'text-red-500'
        }`}>
          <strong>Status:</strong> {bus.status}
        </p>
      </div>
    </div>
  );
}

export default TransportTile;
