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
    <div className="bg-black text-white border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-between max-w-sm mx-auto mb-4 hover:shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Time Until Departure */}
      <div className="flex items-center justify-center bg-gray-800 rounded-full w-20 h-20 mb-4">
        {timeLeft > 0 ? (
          <>
            <span className="text-4xl font-bold text-white">{timeLeft}</span>
            <span className="text-sm font-medium text-gray-400 ml-1">min</span>
          </>
        ) : (
          <span className="text-4xl font-bold text-gray-400">Due</span>
        )}
      </div>

      {/* Metro Information */}
      <div className="w-full text-center">
        <h2 className="text-xl font-bold mb-2">Metro {bus.number}</h2>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="font-medium">Direction:</strong> {bus.direction}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="font-medium">Destination:</strong> {bus.destination}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="font-medium">Stop:</strong> {bus.stopName}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong className="font-medium">Departure Time:</strong> {bus.expectedTime}
        </p>
        <p
          className={`text-sm font-bold mt-2 ${
            bus.status === 'onTime' ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          <strong>Status:</strong> {bus.status}
        </p>
      </div>
    </div>
  );
}

export default TransportTile;
