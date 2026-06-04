import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const menuItems = [
  { name: "Home", path: "/", id: "01" },
  { name: "Warmups", path: "/warm-ups", id: "02" },
  { name: "Materials", path: "/materials", id: "03" },
  { name: "Exercises", path: "/exercises", id: "04" },
  { name: "Assessments", path: "/assessments", id: "05" },
  { name: "Contact", path: "/contact", id: "06" },
];

const MenuModal = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const firstHalf = menuItems.slice(0, 3);
  const secondHalf = menuItems.slice(3, 6);

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
            className="fixed inset-0 bg-zinc-950/25 dark:bg-black/55 backdrop-blur-md animate-fade-in"
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
                <span className="w-1.5 h-6 rounded-full bg-zinc-950 dark:bg-zinc-50" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-550">Navigation</span>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border border-zinc-250/20 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-zinc-500 hover:text-zinc-955 dark:hover:text-white transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center"
                title="Close Navigation"
              >
                <X size={14} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Content Sidebar + Menu Links */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-none [overscroll-behavior-y:contain] flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16">
              <nav className="w-full max-w-xs flex flex-col gap-2.5">
                {firstHalf.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-tight transition-all duration-300 cursor-pointer border group ${
                          isActive 
                          ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-700 shadow-sm' 
                          : 'bg-white/30 dark:bg-zinc-900/10 border-zinc-250/20 dark:border-zinc-850/60 text-zinc-650 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-800 hover:bg-white/60 dark:hover:bg-zinc-900/30'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-medium opacity-50 tracking-widest font-mono">
                            {item.id}
                          </span>
                          <span className="font-bold tracking-tight uppercase">
                            {item.name}
                          </span>
                        </div>
                        <ArrowRight
                          size={15}
                          className={`transition-all duration-300 stroke-[2.5] ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="hidden lg:block w-px h-64 bg-zinc-250/40 dark:bg-zinc-850/60"></div>

              <nav className="w-full max-w-xs flex flex-col gap-2.5">
                {secondHalf.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i + 4) * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-tight transition-all duration-300 cursor-pointer border group ${
                          isActive 
                          ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-700 shadow-sm' 
                          : 'bg-white/30 dark:bg-zinc-900/10 border-zinc-250/20 dark:border-zinc-850/60 text-zinc-650 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-800 hover:bg-white/60 dark:hover:bg-zinc-900/30'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-medium opacity-50 tracking-widest font-mono">
                            {item.id}
                          </span>
                          <span className="font-bold tracking-tight uppercase">
                            {item.name}
                          </span>
                        </div>
                        <ArrowRight
                          size={15}
                          className={`transition-all duration-300 stroke-[2.5] ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Footer */}
            <div className="shrink-0 w-full px-6 sm:px-8 py-6 border-t border-zinc-250/20 dark:border-zinc-900/40 flex justify-between items-center opacity-50 text-zinc-500 dark:text-zinc-400">
              <div className="flex gap-6">
                <a
                  href="#"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  <FaGithub size={18} />
                </a>
              </div>
              <div className="text-[9px] font-bold tracking-[0.2em] uppercase">
                Warmedia // 2026
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
