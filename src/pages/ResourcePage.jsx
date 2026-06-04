import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, BookOpen, Check, FileText, X } from 'lucide-react';

const ResourcePage = ({ title, description, filterConfig, resources }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [downloadingId, setDownloadingId] = useState(null);

  // Derive unique levels from the configuration or defaults
  const grades = useMemo(() => {
    const levelSection = filterConfig?.find(f => f.id === 'level');
    if (levelSection) {
      return ['All', ...levelSection.options.map(o => o.value)];
    }
    return ['All', '7th Grade', '8th Grade', '9th Grade', 'Common Core', '1st Bac', '2nd Bac'];
  }, [filterConfig]);

  // Fast filtering of materials
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesSearch = !searchQuery || 
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        res.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGrade = selectedGrade === 'All' || res.level === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [resources, searchQuery, selectedGrade]);

  const triggerDownload = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1200);
  };

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen text-zinc-900 dark:text-zinc-50 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      
      {/* Editorial Header */}
      <div className="mb-16 text-left max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-zinc-400 dark:text-zinc-550 mb-3 block"
        >
          Curriculum Materials Hub
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-white uppercase mb-4"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold pr-4"
        >
          {description}
        </motion.p>
      </div>

      {/* Streamlined Minimal Search + Grade Filter Pills */}
      <div className="flex flex-col gap-6 mb-12" id="materials-filter-bar">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-200/40 dark:border-zinc-900 pb-6">
          
          {/* Minimalist Search box with backdrop filter */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-505">
              <Search size={14} className="stroke-[2.5]" />
            </div>
            <input 
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold pl-10 pr-10 py-3 rounded-xl border border-zinc-200/40 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/10 backdrop-blur-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-650 transition-all duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3.5 flex items-center text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={12} className="stroke-[2.5]" />
              </button>
            )}
          </div>

          <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 dark:text-zinc-550 font-black">
            Active: {filteredResources.length} listed
          </div>
        </div>

        {/* Grade Pills Layout */}
        <div className="flex flex-wrap items-center gap-1.5" id="grade-pills-selector">
          {grades.map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border ${
                selectedGrade === grade
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-md shadow-zinc-950/10"
                  : "bg-white/40 dark:bg-zinc-900/10 hover:bg-white dark:hover:bg-zinc-805/40 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-150 dark:border-zinc-850/80"
              }`}
            >
              {grade === 'All' ? 'All Grades' : grade}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      <div id="materials-grid-display">
        {filteredResources.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredResources.map(resource => (
                <motion.div
                  key={resource.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-6 rounded-2xl border border-zinc-200/30 dark:border-zinc-850 bg-white/30 dark:bg-zinc-900/10 backdrop-blur-xl flex flex-col justify-between h-64 hover:border-zinc-400 dark:hover:border-zinc-750 hover:bg-white/60 dark:hover:bg-zinc-900/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden text-left"
                >
                  <div>
                    {/* Header line on Card */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 bg-zinc-100/50 dark:bg-zinc-850 px-2 py-0.5 rounded-md border border-zinc-200/20 dark:border-zinc-800">
                        <BookOpen size={10} className="text-zinc-500" />
                        <span className="text-[8px] font-mono font-black text-zinc-450 dark:text-zinc-400 uppercase tracking-widest">
                          {resource.format || 'PDF'}
                        </span>
                      </div>
                      
                      <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-505 font-mono uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-150/40 dark:border-zinc-900/60 px-1.5 py-0.5 rounded">
                        {resource.level || 'General'}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase mb-2 group-hover:text-zinc-955 dark:group-hover:text-white transition-colors duration-200 line-clamp-2">
                      {resource.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-450 font-semibold line-clamp-3">
                      {resource.description}
                    </p>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200/20 dark:border-zinc-850 mt-auto">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-550 uppercase">
                      By {resource.author?.split(" ")[0] || 'Unknown'}
                    </span>

                    <button
                      onClick={() => triggerDownload(resource.id)}
                      className={`h-7 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 pointer-events-auto cursor-pointer border ${
                        downloadingId === resource.id
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                          : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 border-transparent"
                      }`}
                    >
                      {downloadingId === resource.id ? (
                        <>
                          <Check size={11} className="stroke-[3]" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Download size={11} className="stroke-[2.5]" />
                          <span>Get Resource</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 rounded-3xl border border-zinc-200/20 dark:border-zinc-850 bg-white/20 dark:bg-zinc-900/10 backdrop-blur-xl"
          >
            <FileText size={24} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-3" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-450 block mb-1">
              No matching materials
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-550 block">
              Adjust your search keywords or grade filter tags.
            </span>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default ResourcePage;
