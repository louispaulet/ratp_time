import React from 'react';

function Footer() {
  return (
    <footer className="md-footer" style={{padding:16, marginTop:'auto'}}>
      <div className="container" style={{textAlign:'center'}}>
        &copy; {new Date().getFullYear()} Metro Times App. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
