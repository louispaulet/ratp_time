// src/components/TransportDisplay.jsx
import React, { useEffect, useState, useRef } from 'react';
import TransportTile from './TransportTile';

function TransportDisplay({ busLines, monitoringRefs }) {
  const [busData, setBusData] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const cacheDuration = 60000; // 1 minute in milliseconds

  // Reference to store the interval ID
  const intervalRef = useRef(null);

  useEffect(() => {
    // Fetch data on component mount
    fetchBusData();

    // Set up interval to refresh data every minute
    intervalRef.current = setInterval(() => {
      fetchBusData();
    }, 60000); // 1 minute interval

    // Clean up interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  const fetchBusData = async (bypassCache = false) => {
    const now = Date.now();

    if (!bypassCache && lastFetchTime && now - lastFetchTime < cacheDuration) {
      // Cache is valid, do not fetch
      console.log('Using cached data');
      return;
    }

    setIsFetching(true);

    const api_url = 'https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring';
    
    const part1 = 'bH6c8yOh6';
    const part2 = 'cFDhml3QJ7eW';
    const part3 = '0KDBSQkzzef';
    
    const api_key = `${part1}${part2}${part3}`;

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
    setLastFetchTime(Date.now());
    setIsFetching(false);
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
    <div>
      {/* Refresh Button */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => fetchBusData(true)} // Pass true to bypass cache
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Bus Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {busData.length > 0 ? (
          busData.map((bus, index) => (
            <TransportTile key={index} bus={bus} />
          ))
        ) : (
          <p>No bus data available.</p>
        )}
      </div>
    </div>
  );
}

export default TransportDisplay;
