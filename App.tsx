import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import ScrollUpButton from './components/ScrollUpButton';
import ScrollToTop from './components/ScrollToTop';
import DeepsGuard360Tour from './components/DeepsGuard360Tour';
import MeshSatMapEmbed from './components/MeshSatMapEmbed';
import DeepsGuard360DemoTheme from './components/DeepsGuard360DemoTheme';
import Home from './pages/Home';
import SolutionsPage from './pages/SolutionsPage';
import DeepsGuard360Page from './pages/DeepsGuard360Page';
import DeepsGuard360DemoPage from './pages/DeepsGuard360DemoPage';
import AdvantagePage from './pages/AdvantagePage';
import InsightsPage from './pages/InsightsPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import NotFound from './pages/NotFound';
import { CartProvider } from './components/CartContext';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => (
  <HelmetProvider>
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen selection:bg-emerald-500/30">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-emerald-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl">Skip to main content</a>
          <Navbar />
          <CartDrawer />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/deepsguard360" element={<DeepsGuard360Page />} />
              <Route path="/deepsguard360/demo" element={<DeepsGuard360DemoPage />} />
              <Route path="/advantage" element={<AdvantagePage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:category/:slug" element={<ArticlePage />} />
              <Route path="/insights/:slug" element={<ArticlePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <DeepsGuard360Tour />
          <MeshSatMapEmbed />
          <DeepsGuard360DemoTheme />
          <Footer />
          <ScrollUpButton />
        </div>
      </CartProvider>
    </Router>
  </HelmetProvider>
);

export default App;
