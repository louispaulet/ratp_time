// src/components/Header.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold">Bus Times App</Link>
        <div>
          <Link to="/" className="mr-4 hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
