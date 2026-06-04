import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, Gauge, Type, Bell, Search, Quote, Clock, Calendar, CalendarDays, ChevronUp, ChevronDown 
} from "lucide-react";
import { useSettings } from "../../../context/SettingsContext";

const LayerManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    showRotationSpeed, setShowRotationSpeed,
    showTextSizeWidget, setShowTextSizeWidget,
    showWhatsNew, setShowWhatsNew,
    showSearchBar, setShowSearchBar,
    showQuotation, setShowQuotation,
    showTime, setShowTime,
    showDate, setShowDate,
    showCalendar, setShowCalendar,
    widgetsEnabled
  } = useSettings();

  if (!widgetsEnabled) return null;

  const layersConfig = [
    {
      id: "search",
      name: "Search Tool",
      icon: Search,
      group: "Center Focus",
      active: showSearchBar,
      toggle: () => setShowSearchBar(!showSearchBar)
    },
    {
      id: "quote",
      name: "Daily Quotes",
      icon: Quote,
      group: "Center Focus",
      active: showQuotation,
      toggle: () => setShowQuotation(!showQuotation)
    },
    {
      id: "time",
      name: "Clock Widget",
      icon: Clock,
      group: "Right Panel",
      active: showTime,
      toggle: () => setShowTime(!showTime)
    },
    {
      id: "date",
      name: "Date Card",
      icon: Calendar,
      group: "Right Panel",
      active: showDate,
      toggle: () => setShowDate(!showDate)
    },
    {
      id: "calendar",
      name: "Interactive Calendar",
      icon: CalendarDays,
      group: "Right Panel",
      active: showCalendar,
      toggle: () => setShowCalendar(!showCalendar)
    },
    {
      id: "speed",
      name: "Rotation Speed",
      icon: Gauge,
      group: "Left Panel",
      active: showRotationSpeed,
      toggle: () => setShowRotationSpeed(!showRotationSpeed)
    },
    {
      id: "size",
      name: "Text Sizer",
      icon: Type,
      group: "Left Panel",
      active: showTextSizeWidget,
      toggle: () => setShowTextSizeWidget(!showTextSizeWidget)
    },
    {
      id: "whatsnew",
      name: "What's New Notification",
      icon: Bell,
      group: "Left Panel",
      active: showWhatsNew,
      toggle: () => setShowWhatsNew(!showWhatsNew)
    }
  ];

  return (
    <div className="relative w-full max-w-2xl flex flex-col items-center z-40 mt-5">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="absolute bottom-full mb-3.5 left-0 right-0 w-full backdrop-blur-2xl bg-white/70 dark:bg-zinc-950/75 border border-zinc-250/50 dark:border-zinc-800/60 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.55)] overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/40 dark:border-zinc-800/35">
              <div className="flex items-center gap-2">
                <Layers className="text-zinc-500 dark:text-zinc-400 stroke-[2.2]" size={14} />
                <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-sans">
                  Workspace Layers & Bricks
                </h3>
              </div>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium font-mono">
                Toggle layers to adapt layout space
              </span>
            </div>

            {/* Grid layout of brick containers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {layersConfig.map((layer) => {
                const IconComponent = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={layer.toggle}
                    className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                      layer.active
                        ? "bg-zinc-900 border-zinc-950 dark:bg-zinc-100 dark:border-zinc-200 text-white dark:text-zinc-900 shadow-sm"
                        : "bg-zinc-100/30 border-transparent dark:bg-zinc-900/30 text-zinc-500 hover:text-zinc-850 dark:text-zinc-450 dark:hover:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60"
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl shrink-0 ${
                      layer.active 
                        ? "bg-white/15 dark:bg-zinc-900/10 text-white dark:text-zinc-950" 
                        : "bg-zinc-200/40 dark:bg-zinc-800/40"
                    }`}>
                      <IconComponent size={13} className="stroke-[2.2]" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[8px] font-bold uppercase tracking-wider opacity-60">
                        {layer.group}
                      </span>
                      <span className="text-xs font-semibold truncate leading-tight mt-0.5">
                        {layer.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline Pill Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] text-zinc-550 hover:text-zinc-900 dark:text-zinc-420 dark:hover:text-zinc-100 transition-all cursor-pointer font-sans text-[10px] font-bold tracking-widest uppercase"
      >
        <Layers size={11} className="stroke-[2.4]" />
        <span>Manage Layers</span>
        {isOpen ? (
          <ChevronDown size={11} className="stroke-[2.5]" />
        ) : (
          <ChevronUp size={11} className="stroke-[2.5]" />
        )}
      </motion.button>
    </div>
  );
};

export default LayerManager;
