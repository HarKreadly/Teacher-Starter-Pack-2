import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroControls from "../components/features/Hero/HeroControls";
import HeroCarousel from "../components/features/Hero/HeroCarousel";
import HeroInfo from "../components/features/Hero/HeroInfo";
import StatsSection from "../components/features/Stats/StatsSection";
import FAQSection from "../components/features/FAQ/FAQSection";
import { useSettings } from "../context/SettingsContext";
import { slides } from "../data/heroSlides";

const Home = () => {
  const { 
    fontSize, setFontSize, 
    autoPlaySpeed, setAutoPlaySpeed,
    widgetsEnabled,
    showRotationSpeed, showTextSizeWidget, showWhatsNew,
    showTime, showDate, showCalendar
  } = useSettings();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % slides.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play for background/quotes
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
      nextQuote();
    }, autoPlaySpeed);
    return () => clearInterval(slideTimer);
  }, [currentSlide, currentQuote, autoPlaySpeed]);

  const isLeftVisible = widgetsEnabled && (showRotationSpeed || showTextSizeWidget || showWhatsNew);
  const isRightVisible = widgetsEnabled && (showTime || showDate || showCalendar);

  // Tablet and Desktop Column configuration mappings
  let leftColClass = "md:col-span-1 lg:col-span-3 order-3 md:order-2 lg:order-1 px-4 md:px-0 lg:pl-8";
  if (isLeftVisible && !isRightVisible) {
    leftColClass = "md:col-span-2 lg:col-span-3 order-3 md:order-2 lg:order-1 px-4 md:px-0 lg:pl-8";
  }

  let rightColClass = "md:col-span-1 lg:col-span-3 order-2 md:order-3 lg:order-3 px-4 md:px-0 lg:pr-8 mt-12 md:mt-0";
  if (!isLeftVisible && isRightVisible) {
    rightColClass = "md:col-span-2 lg:col-span-3 order-2 md:order-3 lg:order-3 px-4 md:px-0 lg:pr-8 mt-12 md:mt-0";
  }

  let colSpanClass = "md:col-span-2 lg:col-span-6 lg:col-start-4";
  if (!isLeftVisible && !isRightVisible) {
    colSpanClass = "md:col-span-2 lg:col-span-12 max-w-4xl mx-auto";
  }

  return (
    <div className="relative w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-hidden transition-colors duration-1000">
      {/* Fold 1: Hero Landing Area */}
      <div className="relative w-full min-h-dvh overflow-hidden flex flex-col justify-center">
        {/* Layer 0: Full Screen Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slides[currentSlide].image}
              alt="Background"
              className="w-full h-full object-cover opacity-30 dark:opacity-60 transition-opacity duration-500"
            />
          </motion.div>
        </AnimatePresence>

        {/* Layer 1: Blur Overlay */}
        <div className="absolute inset-0 z-0 backdrop-blur-2xl bg-white/40 dark:bg-zinc-950/40 transition-colors duration-500"></div>

        {/* Layer 2: Dark Vignette */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(24,24,27,0.95)_100%)] pointer-events-none transition-all duration-500"></div>

        {/* Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 min-h-dvh pt-32 pb-10 px-4 md:px-8 lg:px-16 gap-8 items-center">
          <HeroControls
            fontSize={fontSize}
            setFontSize={setFontSize}
            autoPlaySpeed={autoPlaySpeed}
            setAutoPlaySpeed={setAutoPlaySpeed}
            className={leftColClass}
          />

          <HeroCarousel
            currentQuote={currentQuote}
            nextQuote={nextQuote}
            prevQuote={prevQuote}
            fontSize={fontSize}
            currentSlide={currentSlide}
            className={colSpanClass}
          />

          <HeroInfo
            className={rightColClass}
          />
        </div>
      </div>

      {/* Fold 2: Dynamic Core Impact Metrics Section */}
      <StatsSection />

      {/* Fold 3: Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
};

export default Home;

