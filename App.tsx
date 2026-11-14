import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
import AgriTracePage from './pages/AgriTracePage';
import AgriTraceDemoPage from './pages/AgriTraceDemoPage';
import DeepsFlowPage from './pages/DeepsFlowPage';
import DeepsFlowDemoPage from './pages/DeepsFlowDemoPage';
import DeepsCare360Page from './pages/DeepsCare360Page';
import DeepsCare360DemoPage from './pages/DeepsCare360DemoPage';
import DeepsFleet360Page from './pages/DeepsFleet360Page';
import DeepsFleet360DemoPage from './pages/DeepsFleet360DemoPage';
import DeepsComply360Page from './pages/DeepsComply360Page';
import DeepsComply360DemoPage from './pages/DeepsComply360DemoPage';
import DeepsFin360Page from './pages/DeepsFin360Page';
import DeepsFin360DemoPage from './pages/DeepsFin360DemoPage';
import DeepsAdvisory360Page from './pages/DeepsAdvisory360Page';
import DeepsAdvisory360DemoPage from './pages/DeepsAdvisory360DemoPage';
import DeepsPulsePage from './pages/DeepsPulsePage';
import DeepsPulseDemoPage from './pages/DeepsPulseDemoPage';
import AdvantagePage from './pages/AdvantagePage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => (
  <HelmetProvider>
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-emerald-500/30">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-emerald-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl">Skip to main content</a>
        <Navbar />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/deepsguard360" element={<DeepsGuard360Page />} />
            <Route path="/deepsguard360/demo" element={<DeepsGuard360DemoPage />} />
            <Route path="/agritrace" element={<AgriTracePage />} />
            <Route path="/agritrace/demo" element={<AgriTraceDemoPage />} />
            <Route path="/deepsflow" element={<DeepsFlowPage />} />
            <Route path="/deepsflow/demo" element={<DeepsFlowDemoPage />} />
            <Route path="/deepscare360" element={<DeepsCare360Page />} />
            <Route path="/deepscare360/demo" element={<DeepsCare360DemoPage />} />
            <Route path="/deepsfleet360" element={<DeepsFleet360Page />} />
            <Route path="/deepsfleet360/demo" element={<DeepsFleet360DemoPage />} />
            <Route path="/deepscomply360" element={<DeepsComply360Page />} />
            <Route path="/deepscomply360/demo" element={<DeepsComply360DemoPage />} />
            <Route path="/deepsfin360" element={<DeepsFin360Page />} />
            <Route path="/deepsfin360/demo" element={<DeepsFin360DemoPage />} />
            <Route path="/deepsadvisory360" element={<DeepsAdvisory360Page />} />
            <Route path="/deepsadvisory360/demo" element={<DeepsAdvisory360DemoPage />} />
            <Route path="/deepspulse" element={<DeepsPulsePage />} />
            <Route path="/deepspulse/demo" element={<DeepsPulseDemoPage />} />
            <Route path="/advantage" element={<AdvantagePage />} />
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
    </Router>
  </HelmetProvider>
);

export default App;
