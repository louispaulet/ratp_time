import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-white hover:text-gray-400">Bus Times App</Link>
        <div>
          <Link to="/" className="mr-4 text-white hover:text-gray-400">Home</Link>
          <Link to="/about" className="mr-4 text-white hover:text-gray-400">About</Link>
          <Link to="/more-times" className="text-white hover:text-gray-400">More Times</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
