import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';

import useLenis from './hooks/useLenis';
import { siteConfig } from './config';

import Navbar from './components/Navbar';
import Footer from './sections/Footer';

// Pages
import Home from './pages/Home';
import Story from './pages/Story';
import Craft from './pages/Craft';
import Journey from './pages/Journey';
import GenericPage from './pages/GenericPage';

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to ensure page starts at top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  // Initialize Lenis smooth scrolling
  useLenis();
  const location = useLocation();

  useEffect(() => {
    // Set document language if configured
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    const refreshScroll = () => ScrollTrigger.refresh();

    // Small delay to ensure route transitions & images are ready before GSAP math
    const timeout = setTimeout(refreshScroll, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="relative bg-kaleo-sand min-h-screen flex flex-col">
      <ScrollToTop />
      
      {/* Navbar overlaying everywhere */}
      <Navbar />

      {/* Pages Content */}
      <main className="flex-grow">
        <AnimatePresence 
          mode="wait" 
          onExitComplete={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            // Small scroll-trick for Lenis to refresh instantly
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/craft" element={<Craft />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/contact" element={<GenericPage title="Hubungi Kami" subtitle="Untuk diskusi mendalam mengenai riset, integrasi sistem, atau adopsi Edge-AI di sektor agrikultur." />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
