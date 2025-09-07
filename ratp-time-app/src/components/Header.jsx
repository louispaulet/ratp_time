import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="md-appbar">
      <nav className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding: 0}}>
        <Link to="/" className="md-appbar__brand">
          <span className="material-symbols-rounded" style={{verticalAlign: 'middle', marginRight: 6, color:'var(--md-color-accent)'}}>train</span>
          Metro Times
        </Link>
        <div className="md-appbar__nav" style={{display:'flex', gap: 8}}>
          <Link to="/">Home</Link>
          <Link to="/forwards">Forwards</Link>
          <Link to="/return">Return</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
