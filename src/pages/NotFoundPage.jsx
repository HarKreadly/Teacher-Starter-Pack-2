import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import notFoundImage from "../assets/images/not_found_creature_1.png";
import { useSettings } from "../context/SettingsContext";

const NotFoundPage = () => {
  const { activeTheme } = useSettings();
  return (
    <div className="container mx-auto px-6 h-[100vh] flex flex-col items-center justify-center text-center selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900" id="not-found-page-container">
      <div className="max-w-2xl w-full flex flex-col items-center gap-6">
        
        {/* We Got Lost in The Field Title (on top of the picture) */}


        {/* Static, Enlarged Creature Image Container without animations */}
        <div
          className="relative w-full max-w-md md:max-w-lg"
          id="not-found-visual-wrapper"
        >
          {/* Subtle halo backdrop effect */}
          <div className="absolute inset-0 bg-zinc-250/20 dark:bg-zinc-800/10 blur-3xl rounded-full scale-95" />
          
          <img
            src={notFoundImage}
            alt="404 - Not Found Creature"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain dark:invert rounded-2xl relative z-10"
            id="not-found-creature-img"
          />
        </div>

        {/* Editorial Text Details */}
        <div className="flex flex-col gap-2 relative z-10">
                  <h1
            className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight uppercase"
            id="not-found-header-title"
          >
            We got lost in the field
          </h1>
          <p
            className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-sm mx-auto"
            id="not-found-desc"
          >
            The playground or teaching resource section you are looking for has been moved, archived, or does not exist.
          </p>
        </div>

        {/* Action Buttons are a bit smaller now */}
        <div
          className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-xs px-4 mt-2"
          id="not-found-actions-bar"
        >
          <Link
            to="/"
            className={`w-full sm:flex-1 py-2 px-4 ${activeTheme.primaryBg} text-[11px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer border border-transparent font-sans`}
            id="not-found-home-btn"
          >
            <ArrowLeft size={11} className="stroke-[2.5]" />
            <span>Home</span>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:flex-1 py-2 px-4 bg-white/40 dark:bg-zinc-900/10 hover:bg-white dark:hover:bg-zinc-805/40 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white text-[11px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 border border-zinc-200/50 dark:border-zinc-850 active:scale-95 cursor-pointer font-sans"
            id="not-found-retry-btn"
          >
            <RefreshCw size={11} className="stroke-[2.5]" />
            <span>Retry Page</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
