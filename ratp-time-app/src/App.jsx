import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MoreTimesPage from './pages/MoreTimesPage'; // Import the new More Times page

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/more-times" element={<MoreTimesPage />} /> {/* New route for More Times */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
