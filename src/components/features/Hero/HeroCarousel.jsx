import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Quote, 
  Zap, BookOpen, ClipboardCheck, Award 
} from "lucide-react";
import TextPressure from "../../ui/TextPressure";
import { slides } from "../../../data/heroSlides";
import { useTheme } from "next-themes";
import { useSettings } from "../../../context/SettingsContext";
import LayerManager from "./LayerManager";

const HeroCarousel = ({ currentQuote, nextQuote, prevQuote, fontSize, currentSlide, className = "" }) => {
  const { theme } = useTheme();
  const { showQuotation, showSearchBar, widgetsEnabled, activeTheme } = useSettings();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const containerRef = useRef(null);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  }, []);

  const fontSizes = {
    sm: { quote: "text-sm" },
    md: { quote: "text-base" },
    lg: { quote: "text-lg" },
  };

  const searchTargets = [
    { name: "Warm-Ups", path: "/warm-ups", icon: Zap, label: "Warm-Ups" },
    { name: "Materials", path: "/materials", icon: BookOpen, label: "Materials" },
    { name: "Exercises", path: "/exercises", icon: ClipboardCheck, label: "Exercises" },
    { name: "Assessments", path: "/assessments", icon: Award, label: "Assessments" },
  ];

  const triggerSearch = () => {
    const tabName = selectedTag ? selectedTag.name.toLowerCase().replace("-", "") : "all";
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&tab=${tabName}`);
    } else if (selectedTag) {
      navigate(`/search?tab=${tabName}`);
    } else {
      navigate("/search");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className={`${className} flex flex-col items-center justify-between min-h-[75vh] lg:h-full order-1 lg:order-2 relative z-10 w-full pb-16 lg:pb-8 pt-4`}>
      
      {/* Top Spacer */}
      <div className="flex-1 w-full min-h-[2vh] lg:min-h-0" />

      {/* Title Area - Framed with a subtle glow and TextPressure */}
      <div className="relative z-20 text-center flex flex-col items-center w-full justify-center mb-1">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-zinc-400/5 dark:bg-zinc-200/5 blur-[80px] pointer-events-none" />
        
        <div className="w-full max-w-[90vw] sm:max-w-[550px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] h-[105px] sm:h-[145px] md:h-[195px] drop-shadow-sm px-4">
          <TextPressure
            text={greeting}
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={false}
            textColor={theme === 'dark' ? "#ffffff" : "#09090b"}
            minFontSize={50}
          />
        </div>
      </div>

      {/* Search Bar - Beautiful AI Chat Style */}
      {widgetsEnabled && showSearchBar && (
        <div 
          ref={containerRef}
          className="w-full max-w-3xl px-4 lg:px-8 mb-4 flex flex-col items-center relative z-40"
        >
          <div className="relative w-full flex flex-col rounded-[1.25rem] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] focus-within:border-zinc-300 dark:focus-within:border-zinc-700 transition-all overflow-hidden focus-within:ring-4 focus-within:ring-zinc-100/50 dark:focus-within:ring-zinc-800/40">
            
            <div className="flex items-center w-full px-4 pt-3 pb-2">
              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={selectedTag ? `Search in ${selectedTag.name}...` : "Ask anything or search for resources..."}
                className="flex-1 w-full py-1 bg-transparent text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none font-sans text-sm tracking-wide"
              />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-200/50 dark:bg-zinc-800/50" />

            {/* Footer: Tags and Submit */}
            <div className="flex items-center justify-between px-3 py-2 w-full bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-md">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {searchTargets.map((target) => {
                   const isSelected = selectedTag?.path === target.path;
                   return (
                     <button
                       key={target.path}
                       onClick={() => setSelectedTag(isSelected ? null : target)}
                       className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors border ${
                         isSelected
                           ? `${activeTheme.primaryBg} border-transparent shadow-sm`
                           : 'bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-450 border-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 hover:text-zinc-900 dark:hover:text-zinc-200'
                       }`}
                       type="button"
                     >
                       <target.icon size={12} className="stroke-[2.5]" />
                       {target.label}
                     </button>
                   );
                })}
              </div>

              {/* Submit Button */}
              <button
                onClick={triggerSearch}
                disabled={!searchQuery.trim() && !selectedTag}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 ml-2 ${
                  searchQuery.trim() || selectedTag
                    ? `${activeTheme.bulletBg} cursor-pointer hover:scale-105`
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
                }`}
                type="button"
                aria-label="Search"
              >
                <ArrowRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flexible Spacer */}
      <div className="flex-grow w-full min-h-[6vh] lg:min-h-0" />

      {/* Bottom Section: Quotes & Indicators */}
      <div className="w-full px-4 flex flex-col items-center relative z-40 mt-auto">
        
        {/* Quote Section - Super sleek glass card with backdrop filters */}
        {widgetsEnabled && showQuotation && (
          <div 
            className="max-w-xl w-full backdrop-blur-xl bg-white/40 dark:bg-zinc-950/45 rounded-3xl p-6 border border-zinc-200/50 dark:border-zinc-800/25 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] mb-6 flex flex-col items-center relative overflow-hidden group"
            id="hero-quote-container-card"
          >
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-zinc-300/10 dark:bg-zinc-850/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2.5 mb-4 z-10">
              <button
                onClick={prevQuote}
                aria-label="Previous quote"
                className="w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/60 dark:hover:bg-zinc-850/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-105"
              >
                <ArrowLeft size={13} className="stroke-[2.5]" />
              </button>
              
              <div className="px-2.5 py-0.5 rounded-full bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/40 dark:border-zinc-800/50 flex items-center gap-1">
                <Quote size={10} className="text-zinc-500 dark:text-zinc-400 stroke-[2.5]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Curated</span>
              </div>

              <button
                onClick={nextQuote}
                aria-label="Next quote"
                className="w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/60 dark:hover:bg-zinc-850/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-105"
              >
                <ArrowRight size={13} className="stroke-[2.5]" />
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                className="relative w-full flex items-center justify-center px-2 text-center z-10"
              >
                <p className={`${fontSizes[fontSize]?.quote || "text-base"} text-zinc-800 dark:text-zinc-200 leading-relaxed font-serif italic max-w-lg`}>
                  "{slides[currentQuote].quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Dynamic Carousel Slide Pill Indicators */}
        <div className="flex gap-2 justify-center w-full mt-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-350 ease-out ${
                idx === currentSlide
                  ? "w-7 bg-zinc-900 dark:bg-zinc-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  : "w-2.5 bg-zinc-300 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {/* Dynamic Workspace Layers & Blocks Configurator */}
        <LayerManager />
      </div>
    </div>
  );
};

export default HeroCarousel;
