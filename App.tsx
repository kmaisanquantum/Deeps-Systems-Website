import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import Solutions from './components/Solutions';
import AdvancedSolutions from './components/AdvancedSolutions';
import Comparison from './components/Comparison';
import Partnerships from './components/Partnerships';
import Testimonials from './components/Testimonials';
import News from './components/News';
import ClientLogos from './components/ClientLogos';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuantumAssistant from './components/QuantumAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-teal-500/30">
      <Navbar />
      <main>
        <Hero />
        <Advantages />
        <Solutions />
        <AdvancedSolutions />
        <Comparison />
        <Partnerships />
        <Testimonials />
        <News />
        <ClientLogos />
        <Contact />
      </main>
      <Footer />
      <QuantumAssistant />
    </div>
  );
};

export default App;