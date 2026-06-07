import { motion } from "framer-motion";
import { ArrowUpRight, Flame, ClipboardCheck, Sparkles, Download } from "lucide-react";
import { useSettings } from "../../../context/SettingsContext";
import { useNavigate } from "react-router-dom";

const StatsSection = () => {
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
              className="group rounded-3xl overflow-hidden bg-zinc-100/10 dark:bg-zinc-900/5 backdrop-blur-xl border border-zinc-200/40 dark:border-zinc-800/40 hover:bg-zinc-200/20 dark:hover:bg-zinc-900/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[320px]"
              id="stat-cell-curated-drills"
            >
              {/* Card Head */}
              <div className="w-full flex items-center justify-between px-6 py-4.5 bg-zinc-200/40 dark:bg-zinc-900/40 border-b border-zinc-200/40 dark:border-zinc-800/40 transition-colors duration-500">
                <div className="p-3 rounded-2xl bg-zinc-300/40 dark:bg-zinc-805/35 text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-955 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-955 transition-all duration-500 shadow-sm">
                  <Flame size={18} className="stroke-[2]" />
                </div>
                <div className="text-zinc-400 dark:text-zinc-650 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500">
                  <ArrowUpRight size={18} className="stroke-[2.5]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow bg-zinc-100/5 dark:bg-zinc-950/5">
                <div className="flex items-end justify-between my-4 gap-4">
                  <h3 className="text-5xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none">
                    12+
                  </h3>
                  
                  {/* Subtle Interactive Activity Histogram (Shades of Zinc) */}
                  <div className="flex items-end gap-1 h-10 pb-0.5">
                    {[35, 55, 45, 80, 60, 95, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        style={{ height: `${height}%` }}
                        className="w-1 rounded-full bg-zinc-250 dark:bg-zinc-800 group-hover:bg-zinc-955 dark:group-hover:bg-zinc-205 transition-colors duration-500"
                        initial={{ scaleY: 0.3 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.55, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block mb-1">
                    warmups
                  </span>
                  <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    Curated student engagement drills designed to warm up classrooms.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Assessments */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => navigate("/assessments")}
              className="group rounded-3xl overflow-hidden bg-zinc-100/10 dark:bg-zinc-900/5 backdrop-blur-xl border border-zinc-200/40 dark:border-zinc-800/40 hover:bg-zinc-200/20 dark:hover:bg-zinc-900/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[320px]"
              id="stat-cell-templates"
            >
              {/* Card Head */}
              <div className="w-full flex items-center justify-between px-6 py-4.5 bg-zinc-200/40 dark:bg-zinc-900/40 border-b border-zinc-200/40 dark:border-zinc-800/40 transition-colors duration-500">
                <div className="p-3 rounded-2xl bg-zinc-300/40 dark:bg-zinc-805/35 text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-955 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-955 transition-all duration-500 shadow-sm">
                  <ClipboardCheck size={18} className="stroke-[2]" />
                </div>
                <div className="text-zinc-400 dark:text-zinc-650 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500">
                  <ArrowUpRight size={18} className="stroke-[2.5]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow bg-zinc-100/5 dark:bg-zinc-950/5">
                <div className="flex items-center justify-between my-4 gap-4">
                  <h3 className="text-5xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none">
                    15+
                  </h3>

                  {/* Step Progress Pipeline (Shades of Zinc) */}
                  <div className="flex items-center gap-1.5 w-[70px] h-10">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex-1 flex items-center gap-1 bg-zinc-105 dark:bg-zinc-900/40 p-1 rounded-md">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 flex-grow ${
                            step <= 2 
                              ? "bg-zinc-900 dark:bg-zinc-100" 
                              : "bg-zinc-250 dark:bg-zinc-800"
                          }`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block mb-1">
                    assessments
                  </span>
                  <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    Interactive classroom test engines and live vocabulary diagnostics.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Materials */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => navigate("/materials")}
              className="group rounded-3xl overflow-hidden bg-zinc-100/10 dark:bg-zinc-900/5 backdrop-blur-xl border border-zinc-200/40 dark:border-zinc-800/40 hover:bg-zinc-200/20 dark:hover:bg-zinc-900/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[320px]"
              id="stat-cell-assessments"
            >
              {/* Card Head */}
              <div className="w-full flex items-center justify-between px-6 py-4.5 bg-zinc-200/40 dark:bg-zinc-900/40 border-b border-zinc-200/40 dark:border-zinc-800/40 transition-colors duration-500">
                <div className="p-3 rounded-2xl bg-zinc-300/40 dark:bg-zinc-805/35 text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-955 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-955 transition-all duration-500 shadow-sm">
                  <Sparkles size={18} className="stroke-[2]" />
                </div>
                <div className="text-zinc-400 dark:text-zinc-650 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500">
                  <ArrowUpRight size={18} className="stroke-[2.5]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow bg-zinc-100/5 dark:bg-zinc-950/5">
                <div className="flex items-center justify-between my-4 gap-4">
                  <h3 className="text-5xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none">
                    24+
                  </h3>

                  {/* Resource Category Badges representation */}
                  <div className="flex flex-col gap-1 items-end h-10 justify-center">
                    <span className="text-[7.5px] font-mono tracking-widest px-1.5 py-0.5 rounded-sm border border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100 font-bold bg-white dark:bg-zinc-950 shadow-xs block">
                      SLIDES
                    </span>
                    <span className="text-[7.5px] font-mono tracking-widest px-1.5 py-0.5 rounded-sm border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 font-bold bg-transparent block">
                      GUIDES
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block mb-1">
                    materials
                  </span>
                  <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    Ready-to-use lesson companions, slides, guides, and templates.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Worksheets */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              onClick={() => navigate("/materials")}
              className="group rounded-3xl overflow-hidden bg-zinc-100/10 dark:bg-zinc-900/5 backdrop-blur-xl border border-zinc-200/40 dark:border-zinc-800/40 hover:bg-zinc-200/20 dark:hover:bg-zinc-900/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[320px]"
              id="stat-cell-printables"
            >
              {/* Card Head */}
              <div className="w-full flex items-center justify-between px-6 py-4.5 bg-zinc-200/40 dark:bg-zinc-900/40 border-b border-zinc-200/40 dark:border-zinc-800/40 transition-colors duration-500">
                <div className="p-3 rounded-2xl bg-zinc-300/40 dark:bg-zinc-805/35 text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-955 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-955 transition-all duration-500 shadow-sm">
                  <Download size={18} className="stroke-[2]" />
                </div>
                <div className="text-zinc-400 dark:text-zinc-650 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500">
                  <ArrowUpRight size={18} className="stroke-[2.5]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow bg-zinc-100/5 dark:bg-zinc-950/5">
                <div className="flex items-center justify-between my-4 gap-4">
                  <h3 className="text-5xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white font-sans leading-none">
                    300+
                  </h3>

                  {/* Aesthetic 3x3 Grid Dots representation (Shades of Zinc) */}
                  <div className="grid grid-cols-3 gap-1 w-7 h-7 items-center justify-center bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-md">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-1 rounded-full bg-zinc-250 dark:bg-zinc-800 transition-all duration-500 group-hover:scale-125 ${
                          i % 3 === 0 ? "bg-zinc-900 dark:bg-zinc-350" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block mb-1">
                    worksheets
                  </span>
                  <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed font-sans">
                    Print-ready lesson structures optimized for offline classroom access.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
