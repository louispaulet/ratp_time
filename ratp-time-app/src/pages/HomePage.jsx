// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react'
import TransportTile from '../components/TransportTile'

function HomePage() {
  const [busData, setBusData] = useState([])

  useEffect(() => {
    fetchBusData()
  }, [])

  const fetchBusData = async () => {
    const api_url = "https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring"
    const api_key = "bH6c8yOh6cFDhml3QJ7eW0KDBSQkzzef"

    const busLines = {
      "144": "STIF:Line::C01169:",
      "244": "STIF:Line::C01240:",
      //"A_1": "STIF:Line::C01742:",
      //"A_2": "STIF:Line::C01742:",
      //"A_3": "STIF:Line::C01742:",
      //"A_4": "STIF:Line::C01742:"
    }

    const monitoringRefs = {
      "144": "STIF:StopPoint:Q:413091:",
      "244": "STIF:StopPoint:Q:421321:",
      //"A_1": "STIF:StopPoint:Q:474020:",
      //"A_2": "STIF:StopPoint:Q:474023:",
      //"A_3": "STIF:StopPoint:Q:474021:",
      //"A_4": "STIF:StopPoint:Q:474022:"
    }

    const busDataArray = []

    for (let bus in busLines) {
      try {
        const response = await fetch(`${api_url}?MonitoringRef=${monitoringRefs[bus]}&LineRef=${busLines[bus]}`, {
          headers: {
            'Accept': 'application/json',
            'apikey': api_key
          }
        })
        if (!response.ok) {
          console.error(`Error fetching data for bus ${bus}: ${response.status}`)
          continue
        }
        const data = await response.json()
        const visits = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit
        visits.forEach(visit => {
          const journey = visit.MonitoredVehicleJourney
          const busInfo = {
            number: bus,
            direction: journey.DirectionName[0].value,
            destination: journey.DestinationName[0].value,
            stopName: journey.MonitoredCall.StopPointName[0].value,
            expectedTime: convertToParisTime(journey.MonitoredCall.ExpectedDepartureTime),
            status: journey.MonitoredCall.DepartureStatus
          }
          busDataArray.push(busInfo)
        })
      } catch (error) {
        console.error(`Error fetching data for bus ${bus}:`, error)
      }
    }
    setBusData(busDataArray)
  }

  // Function to convert UTC to Paris time
  const convertToParisTime = (utcTime) => {
    const date = new Date(utcTime)
    const options = { timeZone: 'Europe/Paris', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }
    return new Intl.DateTimeFormat('en-GB', options).format(date)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Next Bus Departures</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {busData.map((bus, index) => (
          <TransportTile key={index} bus={bus} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
