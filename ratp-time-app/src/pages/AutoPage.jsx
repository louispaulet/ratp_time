// src/pages/AutoPage.jsx
import React, { useEffect, useState } from 'react';
import ForwardsPage from './ForwardsPage';
import ReturnTripPage from './ReturnTripPage';

function AutoPage() {
  const computeIsBeforeNoonParis = () => {
    const now = new Date();
    // Get the hour in Europe/Paris timezone
    const hourParis = Number(
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Paris',
        hour12: false,
        hour: '2-digit',
      }).format(now)
    );
    return hourParis < 12;
  };

  const [beforeNoon, setBeforeNoon] = useState(computeIsBeforeNoonParis());

  useEffect(() => {
    const timer = setInterval(() => {
      setBeforeNoon(computeIsBeforeNoonParis());
    }, 60000); // update decision every minute
    return () => clearInterval(timer);
  }, []);

  return beforeNoon ? <ForwardsPage /> : <ReturnTripPage />;
}

export default AutoPage;

