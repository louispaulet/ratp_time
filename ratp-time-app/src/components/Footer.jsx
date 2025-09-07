import React, { useEffect, useState } from 'react';

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Schedule an update exactly at the start of the next year
    const now = new Date();
    const nextYearStart = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
    const msUntilNextYear = nextYearStart.getTime() - now.getTime();
    const timer = setTimeout(() => setYear(new Date().getFullYear()), msUntilNextYear);
    return () => clearTimeout(timer);
  }, [year]);

  return (
    <footer className="md-footer" style={{padding:16, marginTop:'auto'}}>
      <div className="container" style={{textAlign:'center'}}>
        &copy; {year} Metro Times App. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
