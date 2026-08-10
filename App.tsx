import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import QuantumAssistant from './components/QuantumAssistant';
import ScrollUpButton from './components/ScrollUpButton';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SolutionsPage from './pages/SolutionsPage';
import AdvantagePage from './pages/AdvantagePage';
import InsightsPage from './pages/InsightsPage';
import Contact from './components/Contact';
import ShopPage from './pages/ShopPage';
import NotFound from './pages/NotFound';
import { CartProvider } from './components/CartContext';
import { HelmetProvider } from 'react-helmet-async';
import Seo from './components/Seo';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen selection:bg-emerald-500/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-emerald-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Navbar />
        <CartDrawer />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/advantage" element={<AdvantagePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={
              <>
                <Seo
                  title="Contact Us | Deeps Systems"
                  description="Start your digital transformation consultation. Get in touch with our Port Moresby node specialized team."
                  canonicalUrl="https://dspng.tech/contact"
                />
                <div className="pt-16 sm:pt-20 lg:pt-24"><Contact /></div>
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <QuantumAssistant />
        <ScrollUpButton />
        </div>
        </CartProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
