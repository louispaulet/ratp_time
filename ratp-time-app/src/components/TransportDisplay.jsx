// src/components/TransportDisplay.jsx
import React, { useEffect, useState } from 'react';
import TransportTile from './TransportTile';

function TransportDisplay() {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    fetchBusData();
  }, []);

  const fetchBusData = async () => {
    const api_url = 'https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring';
    const api_key = 'bH6c8yOh6cFDhml3QJ7eW0KDBSQkzzef';

    const busLines = {
      '144': 'STIF:Line::C01169:',
      '244': 'STIF:Line::C01240:',
      // 'A_1': 'STIF:Line::C01742:',
      // 'A_2': 'STIF:Line::C01742:',
      // 'A_3': 'STIF:Line::C01742:',
      // 'A_4': 'STIF:Line::C01742:',
    };

    const monitoringRefs = {
      '144': 'STIF:StopPoint:Q:413091:',
      '244': 'STIF:StopPoint:Q:421321:',
      // 'A_1': 'STIF:StopPoint:Q:474020:',
      // 'A_2': 'STIF:StopPoint:Q:474023:',
      // 'A_3': 'STIF:StopPoint:Q:474021:',
      // 'A_4': 'STIF:StopPoint:Q:474022:',
    };

    const busDataArray = [];

    for (let bus in busLines) {
      try {
        const response = await fetch(
          `${api_url}?MonitoringRef=${monitoringRefs[bus]}&LineRef=${busLines[bus]}`,
          {
            headers: {
              Accept: 'application/json',
              apikey: api_key,
            },
          }
        );
        if (!response.ok) {
          console.error(`Error fetching data for bus ${bus}: ${response.status}`);
          continue;
        }
        const data = await response.json();
        const visits = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit;
        visits.forEach((visit) => {
          const journey = visit.MonitoredVehicleJourney;
          const expectedDepartureTimeUTC = journey.MonitoredCall.ExpectedDepartureTime;

          const busInfo = {
            number: bus,
            direction: journey.DirectionName[0].value,
            destination: journey.DestinationName[0].value,
            stopName: journey.MonitoredCall.StopPointName[0].value,
            expectedTime: convertToParisTime(expectedDepartureTimeUTC),
            status: journey.MonitoredCall.DepartureStatus,
            timeUntilDeparture: computeTimeUntilDeparture(expectedDepartureTimeUTC),
          };
          busDataArray.push(busInfo);
        });
      } catch (error) {
        console.error(`Error fetching data for bus ${bus}:`, error);
      }
    }
    setBusData(busDataArray);
  };

  // Function to convert UTC to Paris time (returns formatted string)
  const convertToParisTime = (utcTime) => {
    const date = new Date(utcTime);
    const options = {
      timeZone: 'Europe/Paris',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  // Function to compute time until departure in minutes
  const computeTimeUntilDeparture = (utcTime) => {
    const now = new Date();
    const departureTime = new Date(utcTime);

    // Compute the difference in milliseconds
    const diffMs = departureTime.getTime() - now.getTime();

    // Convert milliseconds to minutes
    const diffMinutes = Math.ceil(diffMs / 60000); // 60000 ms in one minute

    return diffMinutes; // May be negative if the departure time has passed
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {busData.map((bus, index) => (
        <TransportTile key={index} bus={bus} />
      ))}
    </div>
  );
}

export default TransportDisplay;
