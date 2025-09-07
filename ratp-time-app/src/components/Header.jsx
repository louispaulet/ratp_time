import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="md-appbar">
      <nav className="container relative" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding: 0}}>
        <Link to="/" className="md-appbar__brand" onClick={closeMenu}>
          <span className="material-symbols-rounded" style={{verticalAlign: 'middle', marginRight: 6, color:'var(--md-color-accent)'}}>train</span>
          Metro Times
        </Link>
        {/* Desktop nav */}
        <div className="md-appbar__nav hidden md:flex" style={{gap: 8}}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/forwards" onClick={closeMenu}>Forwards</Link>
          <Link to="/return" onClick={closeMenu}>Return</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </div>

        {/* Mobile: Home button + burger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/" className="md-button md-button--filled-white" onClick={closeMenu}>
            Home
          </Link>
          <button
            aria-label="Menu"
            className="md-button md-button--tonal"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span className="material-symbols-rounded">menu</span>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg md:hidden"
            style={{background:'var(--md-color-surface)', border:'1px solid var(--md-color-outline-variant)'}}
          >
            <div className="py-1 flex flex-col">
              <Link to="/forwards" className="px-4 py-2 hover:bg-black/5" onClick={closeMenu}>Forwards</Link>
              <Link to="/return" className="px-4 py-2 hover:bg-black/5" onClick={closeMenu}>Return</Link>
              <Link to="/about" className="px-4 py-2 hover:bg-black/5" onClick={closeMenu}>About</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
