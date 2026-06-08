import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSettings } from "../../../context/SettingsContext";
import { useNavigate } from "react-router-dom";

const StatsSection = memo(() => {
  const { activeTheme } = useSettings();
  const navigate = useNavigate();

  // Micro-animations presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      className="relative w-full py-28 px-6 md:px-12 lg:px-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden border-t border-zinc-200/40 dark:border-zinc-900/60"
      id="visual-masterpieces-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,244,245,0.06)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl xl:max-w-[95vw] mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full space-y-20"
          id="stats-panel-layout"
        >
          {/* Top Direct-placed Split Layout: Core message left / contextual paragraph right */}
          <motion.div 
            variants={headerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
          >
            {/* Main Title Heading (Left Column) */}
            <div className="lg:col-span-12 xl:col-span-7">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-905 dark:text-white uppercase leading-[1.05] font-sans">
                We turn ideas <br className="hidden sm:inline" />
                into visual <span className="text-zinc-400 dark:text-zinc-650 font-extrabold">masterpieces</span>
              </h2>
            </div>

            {/* Blockquote and CTA Paragraph (Right Column) */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-start gap-6">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-[13px] leading-relaxed font-semibold">
                Explore a curated index of classroom materials. Whether it is an interactive whiteboard game, an ambient vocabulary builder, or structured offline printables, each template is optimized for speed, access, and tactile engagement.
              </p>
              
              <button
                onClick={() => navigate("/contact")}
                className={`flex items-center gap-2 px-5 py-2.5 ${activeTheme.primaryBg} rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer border border-transparent font-sans text-white`}
                id="know-more-cta-button"
              >
                <span>Know More About us</span>
                <ArrowUpRight size={13} className="stroke-[2.5]" />
              </button>
            </div>
          </motion.div>

          {/* Bento-style Metric Cards Grid in beautiful shades of Zinc */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            
            {/* Card 1: Warmups */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => navigate("/warm-ups")}
              className="group rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20 transition-all duration-500 cursor-pointer p-8 flex flex-col relative overflow-hidden"
              id="stat-cell-curated-drills"
            >
              <h3 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                12+
              </h3>
              
              <div className="mt-auto">
                <span className="text-[11px] font-black tracking-widest text-zinc-900 dark:text-zinc-100 uppercase block mb-3">
                  Warmups
                </span>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  Curated student engagement drills designed to warm up classrooms.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Assessments */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => navigate("/assessments")}
              className="group rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20 transition-all duration-500 cursor-pointer p-8 flex flex-col relative overflow-hidden"
              id="stat-cell-templates"
            >
              <h3 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                15+
              </h3>
              
              <div className="mt-auto">
                <span className="text-[11px] font-black tracking-widest text-zinc-900 dark:text-zinc-100 uppercase block mb-3">
                  Assessments
                </span>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  Interactive classroom test engines and live vocabulary diagnostics.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Materials */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => navigate("/materials")}
              className="group rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20 transition-all duration-500 cursor-pointer p-8 flex flex-col relative overflow-hidden"
              id="stat-cell-assessments"
            >
              <h3 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                24+
              </h3>
              
              <div className="mt-auto">
                <span className="text-[11px] font-black tracking-widest text-zinc-900 dark:text-zinc-100 uppercase block mb-3">
                  Materials
                </span>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  Ready-to-use lesson companions, slides, guides, and templates.
                </p>
              </div>
            </motion.div>

            {/* Card 4: Worksheets */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => navigate("/materials")}
              className="group rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20 transition-all duration-500 cursor-pointer p-8 flex flex-col relative overflow-hidden"
              id="stat-cell-printables"
            >
              <h3 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                300+
              </h3>
              
              <div className="mt-auto">
                <span className="text-[11px] font-black tracking-widest text-zinc-900 dark:text-zinc-100 uppercase block mb-3">
                  Worksheets
                </span>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed font-sans">
                  Print-ready lesson structures optimized for offline classroom access.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default StatsSection;
