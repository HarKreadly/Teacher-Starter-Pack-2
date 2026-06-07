import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineTranslate } from "react-icons/md";
import { createPortal } from "react-dom";
import { useSettings } from "../../context/SettingsContext";

const languages = [
  { code: "en", name: "English", sub: "EN" },
  { code: "es", name: "Español", sub: "ES" },
  { code: "fr", name: "Français", sub: "FR" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation("common");
  const { activeTheme } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      {/* Minimalistic Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-955 dark:hover:text-white bg-zinc-100/50 dark:bg-zinc-900/40 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center shrink-0"
        aria-label="Select Language"
      >
        <MdOutlineTranslate size={18} />
      </button>

      {/* Render the full-screen modal directly inside document.body using Portals to prevent pointer-event conflicts */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden">
              {/* Backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/55 backdrop-blur-md animate-fade-in"
                onClick={() => setIsOpen(false)}
              />

              {/* Centered Settings Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-6 z-[111] flex flex-col border border-zinc-250/20 dark:border-zinc-850 bg-white/45 dark:bg-zinc-950/30 backdrop-blur-3xl rounded-[2rem] shadow-2xl overflow-hidden text-left"
              >
                {/* Top Bar / Header */}
                <div className="shrink-0 w-full px-6 sm:px-8 pt-6 pb-4 flex justify-between items-center border-b border-zinc-250/20 dark:border-zinc-900/40">
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-6 rounded-full ${activeTheme.primaryBg}`} />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-550">Language</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-xl border border-zinc-250/20 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-zinc-500 hover:text-zinc-955 dark:hover:text-white transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center"
                    title="Close"
                  >
                    <X size={14} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto scrollbar-none [overscroll-behavior-y:contain]">
                  <div className="grid grid-cols-1 gap-2.5">
                    {languages.map(lang => (
                      <button 
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-tight transition-all duration-300 cursor-pointer border ${
                          i18n.language === lang.code 
                          ? `${activeTheme.primaryBg} border-transparent shadow-sm` 
                          : 'bg-white/30 dark:bg-zinc-900/10 border-zinc-250/20 dark:border-zinc-850/60 text-zinc-650 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-800 hover:bg-white/60 dark:hover:bg-zinc-900/30'
                        }`}
                      >
                        <Languages size={15} className="stroke-[2]" />
                        <span>{lang.name}</span>
                        {i18n.language === lang.code && (
                          <span className="ml-auto text-[9px] font-bold tracking-[0.1em] uppercase">Active</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default LanguageSelector;
