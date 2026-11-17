import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { CustomNavbar } from './components/CustomNavbar';
import Team from './components/Team';
import Home from './components/Home';
import ReferencesPage from './components/Reference';
import Video from './components/Video';
import Footer from './components/Footer';

// Start every page at the top when navigating between routes.
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-page text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <ScrollToTopOnNavigate />
      <CustomNavbar />
      <main id="content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<ReferencesPage />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
