import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import notFoundImage from "../assets/images/not_found_creature_1780598360922.png";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 min-h-[85vh] flex flex-col items-center justify-center text-center selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        
        {/* Animated Creature Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-72 sm:w-80 group"
          id="not-found-visual-wrapper"
        >
          {/* Subtle halo backdrop effect */}
          <div className="absolute inset-0 bg-zinc-250/30 dark:bg-zinc-800/20 blur-3xl rounded-full scale-95 transition-transform duration-500 group-hover:scale-100" />
          
          <img
            src={notFoundImage}
            alt="404 - Not Found Creature"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain dark:invert rounded-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            id="not-found-creature-img"
          />
        </motion.div>

        {/* Editorial Text Details */}
        <div className="flex flex-col gap-3 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase font-bold text-zinc-400 dark:text-zinc-500"
            id="not-found-status-sub"
          >
            Page Not Found // Error 404
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight uppercase"
            id="not-found-header-title"
          >
            We got lost in the field
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-sm mx-auto"
            id="not-found-desc"
          >
            The playground or teaching resource section you are looking for has been moved, archived, or does not exist.
          </motion.p>
        </div>

        {/* Action Buttons with framer animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full px-4"
          id="not-found-actions-bar"
        >
          <Link
            to="/"
            className="w-full sm:flex-1 py-3 px-6 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer border border-transparent font-sans"
            id="not-found-home-btn"
          >
            <ArrowLeft size={13} className="stroke-[2.5]" />
            <span>Return Home</span>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:flex-1 py-3 px-6 bg-white/40 dark:bg-zinc-900/10 hover:bg-white dark:hover:bg-zinc-805/40 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-200/50 dark:border-zinc-850 active:scale-95 cursor-pointer font-sans"
            id="not-found-retry-btn"
          >
            <RefreshCw size={12} className="stroke-[2.5]" />
            <span>Retry Page</span>
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFoundPage;
