// src/components/TransportDisplay.jsx
import React, { useEffect, useState, useRef } from 'react';
import TransportTile from './TransportTile';

function TransportDisplay({ metroLines, metroMonitoringRefs, destinationPattern, title }) {
  const [metroData, setMetroData] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const cacheDuration = 60000; // 1 minute in milliseconds

  // Reference to store the interval ID
  const intervalRef = useRef(null);

  useEffect(() => {
    // Fetch data on component mount
    fetchMetroData();

    // Set up interval to refresh data every minute
    intervalRef.current = setInterval(() => {
      fetchMetroData();
    }, 60000); // 1 minute interval

    // Clean up interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  const fetchMetroData = async (bypassCache = false) => {
    const now = Date.now();

    if (!bypassCache && lastFetchTime && now - lastFetchTime < cacheDuration) {
      // Cache is valid, do not fetch
      console.log('Using cached data');
      return;
    }

    setIsFetching(true);

    // According to swagger.json: host prim.iledefrance-mobilites.fr, basePath /marketplace, path /stop-monitoring
    const api_url = 'https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring';
    
    const part1 = 'bH6c8yOh6';
    const part2 = 'cFDhml3QJ7eW';
    const part3 = '0KDBSQkzzef';
    
    const api_key = `${part1}${part2}${part3}`;

    const metroDataArray = [];

    for (const lineLabel in metroLines) {
      try {
        const monitoringRef = metroMonitoringRefs[lineLabel];
        const lineRef = metroLines[lineLabel];

        // Build query per swagger: required MonitoringRef, optional LineRef
        const params = new URLSearchParams({ MonitoringRef: monitoringRef });
        if (lineRef) params.set('LineRef', lineRef);

        const doRequest = async (query) =>
          fetch(`${api_url}?${query.toString()}`, {
            headers: {
              Accept: 'application/json',
              apikey: api_key,
            },
          });

        let response = await doRequest(params);
        // If IDs combination is not accepted (400), retry with only MonitoringRef
        if (response.status === 400 && lineRef) {
          console.warn(
            `400 for line ${lineLabel} with LineRef; retrying with MonitoringRef only.`
          );
          const fallback = new URLSearchParams({ MonitoringRef: monitoringRef });
          response = await doRequest(fallback);
        }
        if (!response.ok) {
          console.error(`Error fetching data for line ${lineLabel}: ${response.status}`);
          continue;
        }
        const data = await response.json();
        const visits = data?.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit || [];
        visits.forEach((visit) => {
          const journey = visit.MonitoredVehicleJourney;
          const expectedDepartureTimeUTC = journey?.MonitoredCall?.ExpectedDepartureTime;
          if (!expectedDepartureTimeUTC) return;
          const destination = journey.DestinationName?.[0]?.value || '';

          // If a destinationPattern is provided, filter by it
          if (destinationPattern instanceof RegExp) {
            if (!destinationPattern.test(destination)) return;
          }

          const metroInfo = {
            number: lineLabel,
            direction: journey?.DirectionName?.[0]?.value || '',
            destination,
            stopName: journey?.MonitoredCall?.StopPointName?.[0]?.value || '',
            expectedTime: convertToParisTime(expectedDepartureTimeUTC),
            status: journey?.MonitoredCall?.DepartureStatus,
            timeUntilDeparture: computeTimeUntilDeparture(expectedDepartureTimeUTC),
          };
          metroDataArray.push(metroInfo);
        });
      } catch (error) {
        console.error(`Error fetching data for line ${lineLabel}:`, error);
      }
    }

    setMetroData(metroDataArray);
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
      {/* Section header: title + refresh (inline on desktop) */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between" style={{margin:'12px 0 12px'}}>
        {title ? (
          <h2 className="md-title-large">{title}</h2>
        ) : null}
        <div className="flex md:block" style={{justifyContent:'center'}}>
          <button
            onClick={() => fetchMetroData(true)}
            className="md-button md-button--filled-white"
            disabled={isFetching}
          >
            <span className="material-symbols-rounded" style={{fontSize: 18, verticalAlign: 'middle', marginRight: 6}}>refresh</span>
            {isFetching ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Metro Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {metroData.length > 0 ? (
          metroData.map((metro, index) => (
            <TransportTile key={index} metro={metro} />
          ))
        ) : (
          <p className="md-muted">No metro data available.</p>
        )}
      </div>
    </div>
  );
}

export default TransportDisplay;
