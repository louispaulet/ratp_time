import React, { useState, useEffect, useMemo } from 'react';

function TransportTile({ metro }) {
  const [timeLeft, setTimeLeft] = useState(metro.timeUntilDeparture);

  useEffect(() => {
    // Update timeLeft every minute
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 60000); // 1 minute interval

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Reset timeLeft if metro.timeUntilDeparture changes
    setTimeLeft(metro.timeUntilDeparture);
  }, [metro.timeUntilDeparture]);

  const statusClass = useMemo(() => {
    const s = (metro.status || '').toString().toLowerCase();
    if (!s) return 'chip chip--outline';
    if (/ontime|on time|scheduled|ok/.test(s)) return 'chip chip--accent';
    if (/delay|late|disrupt|cancel/.test(s)) return 'chip chip--warn';
    return 'chip chip--outline';
  }, [metro.status]);

  return (
    <div className="md-card" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
      {/* Time Until Departure */}
      <div className="mb-2 md:mb-4 tile-badge" aria-label="Time until departure">
        {timeLeft > 0 ? (
          <div style={{display:'flex', alignItems:'baseline'}}>
            <span className="tile-time">{timeLeft}</span>
            <span className="tile-unit">min</span>
          </div>
        ) : (
          <div className="tile-due">
            <span className="material-symbols-rounded" aria-hidden style={{fontSize:18, marginRight:6}}>schedule</span>
            Due
          </div>
        )}
      </div>

      {/* Metro Information */}
      <div style={{width:'100%', textAlign:'center'}}>
        <h2 className="md-title-medium tile-heading">Metro {metro.number}</h2>

        <div className="kv">
          <span className="kv-label">Destination:</span>
          <span className="kv-value" title={metro.destination}>{metro.destination}</span>
        </div>
        <div className="kv">
          <span className="kv-label">Stop:</span>
          <span className="kv-value" title={metro.stopName}>{metro.stopName}</span>
        </div>
        <div className="kv">
          <span className="kv-label">Departure Time:</span>
          <span className="kv-value" title={metro.expectedTime}>{metro.expectedTime}</span>
        </div>

        <div className="fx-divider" style={{margin:'10px 0'}} />

        <div className="kv" style={{marginBottom:0}}>
          <span className="kv-label">Status:</span>
          <span className={statusClass}>{metro.status || '—'}</span>
        </div>
      </div>
    </div>
  );
}

export default TransportTile;
