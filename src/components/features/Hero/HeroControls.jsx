import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X, Type, Gauge, List, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "../../../context/SettingsContext";

const HeroControls = ({
  fontSize,
  setFontSize,
  autoPlaySpeed,
  setAutoPlaySpeed,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeVersionId, setActiveVersionId] = useState("v1.3");

  const { 
    widgetsEnabled, 
    showRotationSpeed,
    showTextSizeWidget,
    showWhatsNew,
    activeTheme
  } = useSettings();

  const versions = [
    { 
      id: "v1.3",
      title: "Interactive Visual Mechanics & Unified Spacing",
      date: "June 7, 2026",
      desc: "We have introduced visual components directly onto dashboard cells under a minimalist aesthetic. This update includes an interactive histogram, a multi-stage step pipeline, and custom category badges. We also standardized background borders, unified opacity, and maximized performance across all devices.",
      features: ["Interactive Activity Histogram", "Visual Progress Pipeline", "Category Capsule Labels", "Minimalist Zinc Styling Standards"]
    },
    { 
      id: "v1.2",
      title: "Major UI Overhaul & Performance Boost",
      date: "May 14, 2026",
      desc: "We've completely redesigned the home dashboard for a more cinematic and immersive experience. New GSAP animations ensure everything feels incredibly smooth. The new 'What's New' feature keeps you updated on all the latest tools we add for teachers.",
      features: ["Cinematic Dashboard", "GSAP Expanding Modals", "Minimalist Zinc Nav Style"]
    },
    { 
      id: "v1.1",
      title: "Gradebook & Visual Analytics",
      date: "April 28, 2026",
      desc: "An intuitive new interface for managing student grades with visual analytics. Track performance over time with beautiful, interactive charts.",
      features: ["Visual Analytics Dashboard", "Grade Tracking System", "One-click CSV Export"]
    },
    { 
      id: "v1.0",
      title: "Initial Teacher Starter Pack Launch",
      date: "April 1, 2026",
      desc: "The very first version of Teacher Starter Pack. Includes core functionalities designed specifically to save teachers time and energy.",
      features: ["Lesson Planner Module", "Schedule Manager", "Basic Student Roster"]
    }
  ];

  const activeVersion = versions.find(v => v.id === activeVersionId) || versions[0];

  const speedVisible = widgetsEnabled && showRotationSpeed;
  const sizeVisible = widgetsEnabled && showTextSizeWidget;
  const whatsNewVisible = widgetsEnabled && showWhatsNew;

  if (!speedVisible && !sizeVisible && !whatsNewVisible) return null;

  return (
    <div className="lg:col-span-3 flex flex-col h-full py-6 lg:py-10 order-3 lg:order-1 px-4 md:px-8 lg:pl-8 relative z-40">
      
      {/* Wrapper to push everything to the bottom */}
      <div className="mt-auto flex flex-col gap-4 w-full max-w-[280px] mx-auto lg:mx-0">
        
        {/* Rotation Speed Control Card */}
        {speedVisible && (
          <div 
            className="w-full backdrop-blur-xl bg-white/40 dark:bg-zinc-950/45 rounded-2xl p-4.5 border border-zinc-200/50 dark:border-zinc-800/25 shadow-[0_8px_30px_rgba(0,0,0,0.015)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.25)] transition-colors duration-350 relative group"
            id="speed-control-widget"
          >
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="text-zinc-500 dark:text-zinc-400 stroke-[2.2]" size={15} />
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-sans">
                Rotation Speed
              </h3>
            </div>
            <div className="flex gap-1.5">
              {[12, 8, 6, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setAutoPlaySpeed(num * 1000)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                    autoPlaySpeed === num * 1000
                      ? `${activeTheme.primaryBg} border-transparent shadow-sm scale-[1.04]`
                      : "bg-zinc-100/60 dark:bg-zinc-900/65 text-zinc-650 dark:text-zinc-350 border-transparent hover:bg-zinc-200/65 dark:hover:bg-zinc-800/80 hover:cursor-pointer"
                  }`}
                >
                  {num}s
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Size Control Card */}
        {sizeVisible && (
          <div 
            className="w-full backdrop-blur-xl bg-white/40 dark:bg-zinc-950/45 rounded-2xl p-4.5 border border-zinc-200/50 dark:border-zinc-800/25 shadow-[0_8px_30px_rgba(0,0,0,0.015)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.25)] transition-colors duration-350 relative group"
            id="size-control-widget"
          >
            <div className="flex items-center gap-2 mb-3">
              <Type className="text-zinc-500 dark:text-zinc-400 stroke-[2.2]" size={15} />
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-sans">
                Text Size
              </h3>
            </div>
            <div className="flex gap-1.5">
              {[
                { id: "sm", label: "A", sizeClass: "text-xs" },
                { id: "md", label: "A", sizeClass: "text-sm" },
                { id: "lg", label: "A", sizeClass: "text-base" },
              ].map((sizeObj) => (
                <button
                  key={sizeObj.id}
                  onClick={() => setFontSize(sizeObj.id)}
                  className={`flex-1 py-1.5 rounded-xl font-sans font-extrabold transition-all duration-300 border ${sizeObj.sizeClass} ${
                    fontSize === sizeObj.id
                      ? `${activeTheme.primaryBg} border-transparent shadow-sm scale-[1.04]`
                      : "bg-zinc-100/60 dark:bg-zinc-900/65 text-zinc-650 dark:text-zinc-350 border-transparent hover:bg-zinc-200/65 dark:hover:bg-zinc-800/80 hover:cursor-pointer"
                  }`}
                >
                  {sizeObj.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* What's New Compact Card */}
        {whatsNewVisible && (
          <div 
            onClick={() => setExpanded(true)}
            className="w-full backdrop-blur-xl bg-white/40 dark:bg-zinc-950/45 rounded-2xl p-4.5 border border-zinc-200/50 dark:border-zinc-800/25 shadow-[0_8px_30px_rgba(0,0,0,0.015)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.25)] cursor-pointer hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group relative"
            id="whats-new-control-widget"
          >
            {/* What's New Title Area */}
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-sans">
                What's New!
              </h3>
              <ArrowUpRight size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-0.5">
                {versions[0].date}
              </span>
              <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-150 leading-snug group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                {versions[0].title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Release Notes Full Screen Viewport (Using elegant portal system) */}
      {createPortal(
        <AnimatePresence>
          {expanded && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden">
              {/* Backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/55 backdrop-blur-md animate-fade-in"
                onClick={() => setExpanded(false)}
              />

              {/* Centered Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-6 z-[101] flex flex-col border border-zinc-250/20 dark:border-zinc-850 bg-white/45 dark:bg-zinc-950/30 backdrop-blur-3xl rounded-[2rem] shadow-2xl overflow-hidden text-left"
              >
                {/* Header Navigation */}
                <div className="shrink-0 w-full px-6 sm:px-8 pt-6 pb-4 flex justify-between items-center border-b border-zinc-250/20 dark:border-zinc-900/40">
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-6 rounded-full ${activeTheme.primaryBg}`} />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-550">
                      Release Notes
                    </span>
                  </div>

                  <button 
                    className="p-2.5 rounded-xl border border-zinc-250/20 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-zinc-500 hover:text-zinc-955 dark:hover:text-white transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center"
                    onClick={() => setExpanded(false)}
                  >
                    <X size={14} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Body content containing modular listings */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
                  
                  {/* Left Nav Pane: Version Timeline */}
                  <div className="w-full md:w-64 lg:w-80 border-r border-zinc-250/20 dark:border-zinc-850/60 p-6 md:p-8 overflow-y-auto scrollbar-none [overscroll-behavior-y:contain] flex flex-col gap-3 shrink-0">
                    <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-1 font-sans">
                      History
                    </h4>
                    <div className="space-y-2">
                      {versions.map((v) => (
                        <button 
                          key={v.id}
                          onClick={() => setActiveVersionId(v.id)}
                          className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-300 border ${
                            activeVersionId === v.id 
                              ? `${activeTheme.primaryBg} border-transparent shadow-sm`
                              : "bg-white/30 dark:bg-zinc-900/10 border-zinc-250/20 dark:border-zinc-850/60 text-zinc-650 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-800 hover:bg-white/60 dark:hover:bg-zinc-900/30"
                          }`}
                        >
                          <List size={15} className={`stroke-[2.2] shrink-0 ${activeVersionId === v.id ? "opacity-100" : "opacity-60"}`} />
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold tracking-widest uppercase mb-0.5">
                              {v.id}
                            </span>
                            <span className="text-[9px] opacity-70">
                              {v.date}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Pane: Version Content Viewer */}
                  <div className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto scrollbar-none relative">
                    <motion.div 
                      key={activeVersionId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="max-w-2xl flex flex-col"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Clock size={14} className="text-zinc-400 dark:text-zinc-500 stroke-[2.2]" />
                        <span className="text-[11px] font-bold tracking-wider text-zinc-450 dark:text-zinc-500 uppercase font-sans">
                          Arrived on {activeVersion.date}
                        </span>
                      </div>

                      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6 leading-none font-sans">
                        {activeVersion.title}
                      </h1>

                      <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                        {activeVersion.desc}
                      </p>

                      <div className="border-t border-zinc-250/40 dark:border-zinc-800/80 pt-6">
                        <h3 className="text-[10px] font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase mb-4 flex items-center gap-2 font-sans">
                          <CheckCircle2 size={14} className="stroke-[2.2] text-zinc-650 dark:text-zinc-350" /> Highlights
                        </h3>
                        
                        <ul className="grid grid-cols-1 gap-3">
                          {activeVersion.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-500 dark:text-zinc-450 text-xs md:text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-550" />
                              <span className="font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
};

export default HeroControls;
