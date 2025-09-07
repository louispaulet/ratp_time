import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-white hover:text-gray-400">Metro Times App</Link>
        <div>
          <Link to="/" className="mr-4 text-white hover:text-gray-400">Home</Link>
          <Link to="/about" className="mr-4 text-white hover:text-gray-400">About</Link>
          {/* More Times removed for this metro-focused version */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
