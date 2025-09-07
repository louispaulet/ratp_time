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
    <div className="md-card" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
      {/* Time Until Departure */}
      <div className="mb-2 md:mb-4" style={{display:'flex', alignItems:'center', justifyContent:'center', background:'var(--md-color-surface)', border:'2px solid var(--md-color-accent)', borderRadius:9999, width:90, height:90, boxShadow:'0 0 0 4px rgba(255,109,0,0.08)'}}>
        {timeLeft > 0 ? (
          <>
            <span style={{fontSize:36, fontWeight:800, color:'var(--md-color-accent)'}}>{timeLeft}</span>
            <span className="md-muted" style={{fontSize:12, fontWeight:700, marginLeft:6}}>min</span>
          </>
        ) : (
          <span style={{fontSize:24, fontWeight:800, color:'var(--md-color-accent)'}}>Due</span>
        )}
      </div>

      {/* Metro Information */}
      <div style={{width:'100%', textAlign:'center'}}>
        <h2 className="md-title-medium" style={{marginBottom:8}}>Metro {bus.number}</h2>
        <p className="md-muted" style={{marginBottom:4}}>
          <span className="md-title-small" style={{fontWeight:600}}>Destination:</span> {bus.destination}
        </p>
        <p className="md-muted" style={{marginBottom:4}}>
          <span className="md-title-small" style={{fontWeight:600}}>Stop:</span> {bus.stopName}
        </p>
        <p className="md-muted" style={{marginBottom:4}}>
          <span className="md-title-small" style={{fontWeight:600}}>Departure Time:</span> {bus.expectedTime}
        </p>
        <p className="md-muted" style={{fontWeight:700, marginTop:8}}>
          <span className="md-title-small" style={{fontWeight:700}}>Status:</span> {bus.status}
        </p>
      </div>
    </div>
  );
}

export default TransportTile;
