import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import TourGuide from './components/TourGuide';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';

const seenIntro = () => {
  try { return sessionStorage.getItem('aly-intro') === '1'; } catch { return false; }
};

export default function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => !seenIntro() && location.pathname === '/');

  // The pixel "curtain" wipe replays on every page change via its key.
  // Scrolling back to the top happens once the old page has faded out.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);
  const firstPath = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== firstPath.current) document.body.classList.add('has-navigated');
  }, [location.pathname]);

  const finishIntro = () => {
    try { sessionStorage.setItem('aly-intro', '1'); } catch { /* storage blocked */ }
    setShowIntro(false);
  };

  return (
    <>
      <a href="#main" className="skip-link">SKIP TO CONTENT</a>
      {showIntro && <Preloader onFinish={finishIntro} />}
      <div className="curtain" key={location.pathname} aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => <span key={i} style={{ '--i': i }} />)}
      </div>
      <Nav />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <TourGuide hidden={showIntro} />
    </>
  );
}
