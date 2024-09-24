// src/components/TransportTile.jsx
import React from 'react'

function TransportTile({ bus }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-2">Bus {bus.number}</h2>
      <p><strong>Direction:</strong> {bus.direction}</p>
      <p><strong>Destination:</strong> {bus.destination}</p>
      <p><strong>Stop:</strong> {bus.stopName}</p>
      <p><strong>Expected Departure Time:</strong> {bus.expectedTime}</p>
      <p><strong>Status:</strong> {bus.status}</p>
    </div>
  )
}

export default TransportTile
