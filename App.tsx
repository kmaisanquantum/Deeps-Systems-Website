import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuantumAssistant from './components/QuantumAssistant';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SolutionsPage from './pages/SolutionsPage';
import AdvantagePage from './pages/AdvantagePage';
import InsightsPage from './pages/InsightsPage';
import Contact from './components/Contact';
import ShopPage from './pages/ShopPage';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-emerald-500/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-emerald-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/advantage" element={<AdvantagePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<div className="pt-20"><Contact /></div>} />
          </Routes>
        </main>
        <Footer />
        <QuantumAssistant />
      </div>
    </Router>
  );
};

export default App;
