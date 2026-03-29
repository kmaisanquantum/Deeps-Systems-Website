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

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-teal-500/30">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/advantage" element={<AdvantagePage />} />
            <Route path="/insights" element={<InsightsPage />} />
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
