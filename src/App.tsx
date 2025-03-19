import React, { useState } from 'react';
import { Dumbbell, Heart, Instagram, Facebook } from 'lucide-react';
import HomePage from './pages/HomePage';
import JourneyPage from './pages/JourneyPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Check if we're on the success page
    if (window.location.pathname === '/success') {
      return 'success';
    }
    return 'home';
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="fixed w-full z-10 px-4 py-4">
        <nav className="container mx-auto bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-4 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-2 rounded-xl">
                <Dumbbell className="h-6 w-6 text-zinc-100" />
              </div>
              <span className="text-xl font-semibold text-zinc-100">BeautyFitAnnie</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => setCurrentPage('home')} className="text-zinc-400 hover:text-zinc-100 transition">Home</button>
              <button onClick={() => setCurrentPage('journey')} className="text-zinc-400 hover:text-zinc-100 transition">Start Journey</button>
              <a href="#programs" className="text-zinc-400 hover:text-zinc-100 transition">Programs</a>
              <a href="#achievements" className="text-zinc-400 hover:text-zinc-100 transition">Achievements</a>
            </div>
          </div>
        </nav>
      </div>

      {currentPage === 'home' && <HomePage onStartJourney={() => setCurrentPage('journey')} />}
      {currentPage === 'journey' && <JourneyPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'success' && <SuccessPage />}
    </div>
  );
}

export default App;