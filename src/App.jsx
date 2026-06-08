import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes";

import MainLayout from './components/layout/MainLayout';
const Home = lazy(() => import('./pages/Home'));
const ResourcePage = lazy(() => import('./pages/ResourcePage'));
const WarmupsPage = lazy(() => import('./pages/WarmupsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ExercisesPage = lazy(() => import('./pages/ExercisesPage'));
const AssessmentsPage = lazy(() => import('./pages/AssessmentsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
import { textbookFilters, mockResources } from './data/mockData';

import ClickSpark from "./components/ui/ClickSpark";
import FloatingParticles from "./components/ui/FloatingParticles";
import "./i18n";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSettings } from "./context/SettingsContext";
import GlobalCursor from "./components/common/GlobalCursor";
import DispersionCursor from "./components/common/DispersionCursor";
import ContextMenu from "./components/common/ContextMenu";

gsap.registerPlugin(ScrollTrigger);

const AppContent = () => {
  const { 
    sparksEnabled, 
    dispersionCursorEnabled,
    floatingParticles, 
    scanlines, 
    performanceMode, 
    smoothScroll,
    fontSize,
    backdropBlur
  } = useSettings();

  useEffect(() => {
    // Apply dynamic global styles
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.style.setProperty('--global-blur', `${backdropBlur}px`);
  }, [fontSize, backdropBlur]);

  useEffect(() => {
    // Conditional Lenis Scroll
    let lenis = null;
    
    if (smoothScroll && !performanceMode) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
    }

    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove((time) => {
          lenis.raf(time * 1000);
        });
      }
    };
  }, [smoothScroll, performanceMode]);

  return (
    <div className={`
      min-h-screen bg-background transition-colors duration-300
      ${performanceMode ? "performance-mode" : ""}
    `}>
      {/* Global Overlays */}
      {floatingParticles && <FloatingParticles count={60} opacity={0.4} />}
      {scanlines && <div className="scanlines" />}
      {dispersionCursorEnabled && <DispersionCursor />}
      
      <GlobalCursor />
      <ContextMenu />
      
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="warm-ups/*" element={<WarmupsPage />} />
              <Route path="materials/*" element={<ResourcePage title="Teaching Materials" description="Access premium lesson plans, textbook companions, and printable worksheets compiled to save your prep time." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'lesson-plan' || r.type === 'textbook')} />} />
              <Route path="exercises/*" element={<ExercisesPage />} />
              <Route path="assessments/*" element={<AssessmentsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      
      {sparksEnabled && (
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
