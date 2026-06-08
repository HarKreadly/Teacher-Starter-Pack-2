import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Languages, MousePointer2, Type, Aperture, Film, LayoutDashboard, Monitor, 
  Sparkles, Wind, Gauge, ScrollText, Zap, RotateCw,
  Eye, Layers, Cpu, ChevronRight, Clock, Calendar, Quote, Search, Bell,
  Waves
} from "lucide-react";
import { useSettings, THEMES } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const ToggleRow = ({ icon: Icon, title, desc, value, onChange }) => {
  return (
    <div 
      onClick={onChange}
      className="flex items-center gap-4 py-3.5 px-4 rounded-2xl border border-zinc-250/20 dark:border-zinc-850/40 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md transition-all duration-300 hover:border-zinc-350 dark:hover:border-zinc-800 cursor-pointer active:scale-[0.99]"
    >
      <div className="p-2 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400/90 border border-transparent select-none shrink-0">
        <Icon size={15} className="stroke-[2]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-tight text-zinc-950 dark:text-zinc-100 truncate">{title}</p>
        <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-0.5 leading-relaxed font-semibold">{desc}</p>
      </div>
      <div className="flex items-center rounded-xl p-1 bg-zinc-100/80 dark:bg-zinc-900/40 border border-zinc-250/30 dark:border-zinc-805/50 shrink-0 select-none">
        <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${value ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs' : 'text-zinc-400 dark:text-zinc-550'}`}>
          On
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${!value ? 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 shadow-xs' : 'text-zinc-400 dark:text-zinc-550'}`}>
          Off
        </div>
      </div>
    </div>
  );
};

/* ─── Slider Row Card (Custom Div Slider similar to Brightness Slidebar) ─── */
const SliderRow = ({ icon: Icon, title, desc, value, onChange, min, max, unit }) => {
  const { activeTheme } = useSettings();
  const trackRef = useRef(null);

  // Calculate percentage of full slider width
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleUpdate = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const width = rect.width;
    const clickX = clientX - rect.left;
    const decimal = Math.min(1, Math.max(0, clickX / width));
    const rawValue = min + decimal * (max - min);
    onChange(Math.round(rawValue));
  };

  const handlePointerDown = (e) => {
    const initialClientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    handleUpdate(initialClientX);
    
    const handlePointerMove = (moveEvent) => {
      const clientX = moveEvent.clientX ?? (moveEvent.touches && moveEvent.touches[0].clientX);
      handleUpdate(clientX);
    };

    const handlePointerUp = () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);
  };

  return (
    <div className="py-3.5 px-4 rounded-2xl border border-zinc-250/20 dark:border-zinc-850/40 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md transition-all duration-300 hover:border-zinc-350 dark:hover:border-zinc-800">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-550 select-none">
          <Icon size={15} className="stroke-[2]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-tight text-zinc-950 dark:text-zinc-100 truncate">{title}</p>
          <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-0.5 leading-relaxed font-semibold">{desc}</p>
        </div>
        <span className="font-mono text-[9px] font-black uppercase text-zinc-550 dark:text-zinc-450 bg-white/85 dark:bg-zinc-900 w-fit shrink-0 border border-zinc-250/20 dark:border-zinc-800 px-2 py-0.5 rounded-lg shadow-3xs select-none">
          {value}{unit}
        </span>
      </div>
      <div className="pl-11 pr-1">
        <div 
          ref={trackRef}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="relative w-full h-4 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-250 dark:hover:bg-zinc-600 rounded-full cursor-pointer select-none transition-colors duration-200 overflow-hidden"
        >
          {/* Active filler track representing progress */}
          <div 
            style={{ width: `${percentage}%` }}
            className={`absolute left-0 top-0 h-full ${activeTheme.primaryBg} rounded-full transition-all duration-75`}
          />
        </div>
      </div>
    </div>
  );
};

const SettingsModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("appearance");

  const { 
    colorTheme, setColorTheme, activeTheme,
    cursorEnabled, setCursorEnabled,
    dispersionCursorEnabled, setDispersionCursorEnabled,
    animationsEnabled, setAnimationsEnabled,
    sparksEnabled, setSparksEnabled,
    floatingParticles, setFloatingParticles,
    scanlines, setScanlines,
    acrylicEnabled, setAcrylicEnabled,
    performanceMode, setPerformanceMode,
    smoothScroll, setSmoothScroll,
    autoPlaySpeed, setAutoPlaySpeed,
    widgetsEnabled, setWidgetsEnabled,
    backdropBlur, setBackdropBlur,
    fontSize, setFontSize,
    showTime, setShowTime,
    showDate, setShowDate,
    showCalendar, setShowCalendar,
    showQuotation, setShowQuotation,
    showSearchBar, setShowSearchBar,
    showRotationSpeed, setShowRotationSpeed,
    showTextSizeWidget, setShowTextSizeWidget,
    showWhatsNew, setShowWhatsNew
  } = useSettings();

  const { i18n } = useTranslation("common");
  const { theme, setTheme } = useTheme();

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  const sections = [
    { id: "appearance", label: "Appearance", icon: Eye },
    { id: "interface", label: "Interface", icon: Layers },
    { id: "effects", label: "Effects", icon: Sparkles },
    { id: "performance", label: "Performance", icon: Cpu },
    { id: "updates", label: "Updates", icon: Bell },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const renderContent = () => {
    switch (activeSection) {
      case "appearance":
        return (
          <div className="space-y-6">
            {/* Theme */}
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-3.5">Theme Selection</p>
              <div className="flex gap-2.5 p-1 rounded-2xl bg-zinc-100/40 dark:bg-zinc-950/20 border border-zinc-250/20 dark:border-zinc-900/30 backdrop-blur-xs">
                {[
                  { id: "light", label: "Light" },
                  { id: "dark", label: "Dark" },
                  { id: "system", label: "Auto" },
                ].map(t => (
                  <button 
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                      theme === t.id 
                      ? `${activeTheme.primaryBg} shadow-sm border-transparent` 
                      : 'text-zinc-550 hover:text-zinc-955 dark:hover:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-900/40 border-transparent'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Theme Selection */}
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-3.5">Color Accent Theme</p>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-3 p-3.5 rounded-2xl bg-zinc-100/40 dark:bg-zinc-950/20 border border-zinc-250/20 dark:border-zinc-900/30 backdrop-blur-xs">
                {Object.values(THEMES).map(item => {
                  const isSelected = colorTheme === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setColorTheme(item.id)}
                      className="flex flex-col items-center gap-1.5 p-1.5 rounded-xl transition-all duration-300 hover:bg-white/30 dark:hover:bg-zinc-900/10 cursor-pointer group"
                    >
                      <div 
                        style={{ backgroundColor: item.color }}
                        className={`w-9 h-9 rounded-full transition-all duration-300 relative flex items-center justify-center shadow-xs border border-white/20 ${
                          isSelected 
                            ? "ring-2 ring-zinc-900 dark:ring-white scale-110 shadow-md" 
                            : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                        }`}
                      >
                        {isSelected && (
                          <span className="text-white text-[10px] font-bold select-none drop-shadow-sm">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className={`text-[9px] font-mono tracking-wider uppercase font-extrabold transition-colors duration-300 ${
                        isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-550 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
                      }`}>
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-3.5">Language</p>
              <div className="grid grid-cols-1 gap-2.5">
                {languages.map(lang => (
                  <button 
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-tight transition-all duration-300 cursor-pointer border ${
                      i18n.language === lang.code 
                      ? `${activeTheme.primaryBg} shadow-sm border-transparent` 
                      : 'bg-white/30 dark:bg-zinc-900/10 border-zinc-250/20 dark:border-zinc-850/60 text-zinc-650 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-800 hover:bg-white/60 dark:hover:bg-zinc-900/30'
                    }`}
                  >
                    <Languages size={15} className="stroke-[2]" />
                    <span>{lang.name}</span>
                    {i18n.language === lang.code && <ChevronRight size={14} className="ml-auto stroke-[2.5]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "interface":
        return (
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-3.5">General Controls</p>
              <div className="grid grid-cols-1 gap-3.5">
                <ToggleRow icon={MousePointer2} title="Custom Cursor" desc="Tailored minimalist cursor tracking" value={cursorEnabled} onChange={() => setCursorEnabled(!cursorEnabled)} />
                <SliderRow icon={Type} title="Text Size" desc="Set global platform base font size" value={fontSize} onChange={setFontSize} min={12} max={24} unit="px" />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-3.5 pt-2">Hero Widgets</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <ToggleRow icon={Clock} title="Time Widget" desc="Display live clock on hero homepage" value={showTime} onChange={() => setShowTime(!showTime)} />
                <ToggleRow icon={Calendar} title="Date Widget" desc="Display active date on hero homepage" value={showDate} onChange={() => setShowDate(!showDate)} />
                <ToggleRow icon={Calendar} title="Calendar Widget" desc="Show interactive calendar on hover" value={showCalendar} onChange={() => setShowCalendar(!showCalendar)} />
                <ToggleRow icon={Quote} title="Quotation" desc="Show curated inspirational verses" value={showQuotation} onChange={() => setShowQuotation(!showQuotation)} />
                <ToggleRow icon={Search} title="Search Bar" desc="Display quick searching console input" value={showSearchBar} onChange={() => setShowSearchBar(!showSearchBar)} />
                <ToggleRow icon={Gauge} title="Rotation speed" desc="Hero dynamic slide velocity tuner" value={showRotationSpeed} onChange={() => setShowRotationSpeed(!showRotationSpeed)} />
                <ToggleRow icon={Type} title="Text scaling bar" desc="Toggle hero typography widget tuner" value={showTextSizeWidget} onChange={() => setShowTextSizeWidget(!showTextSizeWidget)} />
                <ToggleRow icon={Bell} title="What's New Card" desc="Announce release history on homepage" value={showWhatsNew} onChange={() => setShowWhatsNew(!showWhatsNew)} />
                <ToggleRow icon={LayoutDashboard} title="Master Toggle" desc="Turn on or off all widgets instantly" value={widgetsEnabled} onChange={() => setWidgetsEnabled(!widgetsEnabled)} />
              </div>
            </div>
          </div>
        );

      case "effects":
        return (
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-3.5">Environment aesthetics</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <ToggleRow icon={Layers} title="Acrylic Backdrop" desc="Glassmorphism blur for better visuals" value={acrylicEnabled} onChange={() => setAcrylicEnabled(!acrylicEnabled)} />
                <ToggleRow icon={Film} title="Film Grain" desc="Cinematic visual texture overlay" value={scanlines} onChange={() => setScanlines(!scanlines)} />
                <ToggleRow icon={Waves} title="Dispersion ripples" desc="Concentric canvas ripples on movement" value={dispersionCursorEnabled} onChange={() => setDispersionCursorEnabled(!dispersionCursorEnabled)} />
                <ToggleRow icon={Sparkles} title="Click Sparks" desc="Refined particle fireworks at point of click" value={sparksEnabled} onChange={() => setSparksEnabled(!sparksEnabled)} />
                <ToggleRow icon={Wind} title="Floating Particles" desc="Ambient physics particles floating in background" value={floatingParticles} onChange={() => setFloatingParticles(!floatingParticles)} />
                <div className="sm:col-span-2">
                  <SliderRow icon={Aperture} title="Backdrop Blur" desc="Adjust overall blur thickness for cards" value={backdropBlur} onChange={setBackdropBlur} min={0} max={100} unit="px" />
                </div>
              </div>
            </div>
          </div>
        );

      case "performance":
        return (
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-3.5">System optimization</p>
              <div className="grid grid-cols-1 gap-3.5">
                <ToggleRow icon={Zap} title="Animations" desc="Toggle dynamic UI motion layouts" value={animationsEnabled} onChange={() => setAnimationsEnabled(!animationsEnabled)} />
                <ToggleRow icon={ScrollText} title="Smooth Scroll" desc="Premium smooth touch scrolling feel" value={smoothScroll} onChange={() => setSmoothScroll(!smoothScroll)} />
                <ToggleRow icon={Monitor} title="Performance Mode" desc="Bypass heavy textures to speed up loading" value={performanceMode} onChange={() => setPerformanceMode(!performanceMode)} />
                <SliderRow icon={RotateCw} title="Carousel Speed" desc="Hero slides auto rotation seconds" value={autoPlaySpeed / 1000} onChange={(v) => setAutoPlaySpeed(v * 1000)} min={2} max={15} unit="s" />
              </div>
            </div>
          </div>
        );

      case "updates": {
        const versions = [
          { 
            id: "v1.2",
            title: "Major UI Overhaul & Performance Boost",
            date: "May 14, 2026",
            desc: "Redesigned dashboard for an immersive experience. Optimized framer animations. Added Whats New widget.",
            features: ["Cinematic Dashboard", "Refined Modal Layouts", "Minimalist Zinc Nav Style"]
          },
          { 
            id: "v1.1",
            title: "Gradebook & Visual Analytics",
            date: "April 28, 2026",
            desc: "Interactive grade management console with full analytics to monitor student metrics efficiently.",
            features: ["Analytics Dashboard", "Grade Tracking System", "One-click CSV Exports"]
          },
          { 
            id: "v1.0",
            title: "Initial Teacher Starter Pack Launch",
            date: "April 1, 2026",
            desc: "Save preparation time using our bespoke digital utility catalog crafted for classrooms.",
            features: ["Lesson Planner Module", "Schedule Manager", "Basic Student Roster"]
          }
        ];

        return (
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-550 mb-3.5">Release Chronicles</p>
            <div className="flex flex-col gap-4 pr-1.5 overflow-y-auto">
              {versions.map((v) => (
                <div 
                  key={v.id} 
                  className="bg-white/20 dark:bg-zinc-950/15 border border-zinc-250/20 dark:border-zinc-850/50 backdrop-blur-md rounded-2xl p-4 transition-all duration-300 hover:border-zinc-350 dark:hover:border-zinc-800"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-[8px] font-mono font-black tracking-widest text-zinc-955 dark:text-white bg-zinc-150 dark:bg-zinc-800 border border-zinc-250/20 dark:border-zinc-700 px-2.5 py-1 rounded-lg">
                      {v.id}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-550 font-bold font-mono">
                      {v.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase mb-1.5">
                    {v.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed font-semibold mb-3.5">
                    {v.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {v.features.map((feature, fIdx) => (
                      <span 
                        key={fIdx} 
                        className="text-[9px] font-bold text-zinc-650 dark:text-zinc-450 bg-white/40 dark:bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-250/20 dark:border-zinc-800 shadow-3xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/55 backdrop-blur-md animate-fade-in"
            onClick={onClose}
          />

          {/* Centered Settings Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-6 z-[101] flex flex-col border border-zinc-250/20 dark:border-zinc-850 bg-white/45 dark:bg-zinc-950/30 backdrop-blur-3xl rounded-[2rem] shadow-2xl overflow-hidden text-left"
          >
            {/* Top Bar / Header */}
            <div className="shrink-0 w-full px-6 sm:px-8 pt-6 pb-4 flex justify-between items-center border-b border-zinc-250/20 dark:border-zinc-900/40">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-550">Settings Panel</span>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border border-zinc-250/20 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-zinc-500 hover:text-zinc-955 dark:hover:text-white transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center"
                title="Close Settings"
              >
                <X size={14} className="stroke-[2.5]" id="settings-close-icon" />
              </button>
            </div>

            {/* Sidebar + Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
              {/* Sidebar Navigation */}
              <nav className="w-full md:w-52 shrink-0 p-4 md:p-6 border-b md:border-b-0 md:border-r border-zinc-200/20 dark:border-zinc-900/40 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto [overscroll-behavior:contain]">
                {sections.map(section => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      id={`sidebar-sec-${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-350 cursor-pointer shrink-0 border ${
                        isActive
                          ? `${activeTheme.primaryBg} shadow-sm font-bold scale-[1.02] border-transparent`
                          : 'text-zinc-550 hover:text-zinc-955 dark:text-zinc-400 dark:hover:text-zinc-100 bg-transparent border-transparent hover:bg-white/40 dark:hover:bg-zinc-900/30'
                      }`}
                    >
                      <section.icon size={15} className="stroke-[2]" />
                      <span className="text-xs font-bold uppercase tracking-tight">{section.label}</span>
                    </button>
                  );
                })}

                {/* Decorative sidebar footer */}
                <div className="hidden md:block mt-auto pt-6 px-4">
                  <div className="text-[8px] font-mono font-black tracking-[0.3em] uppercase text-zinc-350 dark:text-zinc-700">System v2.4.0</div>
                </div>
              </nav>

              {/* Scrolling Settings Panel */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto [overscroll-behavior-y:contain] h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={activeSection === "updates" ? "w-full max-w-5xl" : "max-w-3xl"}
                  >
                    <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight mb-1">
                      {sections.find(s => s.id === activeSection)?.label}
                    </h3>
                    <p className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 mb-6 uppercase tracking-wider">
                      {activeSection === "appearance" && "Customize colors, theme and language options"}
                      {activeSection === "interface" && "Configure custom cursor, metrics and widgets"}
                      {activeSection === "effects" && "Manage graphic animations and environment aesthetics"}
                      {activeSection === "performance" && "Optimize system speed and scrolling behavior"}
                      {activeSection === "updates" && "Check out the latest features and release logs"}
                    </p>
                    
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
