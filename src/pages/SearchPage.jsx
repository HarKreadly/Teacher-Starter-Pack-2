import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Clock, User, Download, Check, 
  ArrowRight, X, ArrowLeft 
} from "lucide-react";
import { warmupsData } from "../data/warmupsData";
import { mockResources } from "../data/mockData";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(() => {
    return new URLSearchParams(window.location.search).get("q") || "";
  });

  const [activeTab, setActiveTab] = useState(() => {
    return new URLSearchParams(window.location.search).get("tab") || "all";
  });

  const [downloadingId, setDownloadingId] = useState(null);
  const [expandedSection, setExpandedSection] = useState(activeTab === "all" ? "warmups" : activeTab);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Sync state with URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qLabel = params.get("q") || "";
    const tabLabel = params.get("tab") || "all";
    setSearchQuery(qLabel);
    setActiveTab(tabLabel);
    if (tabLabel !== "all") {
      setExpandedSection(tabLabel);
    }
  }, [location.search]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Update URL search parameters when state changes
  const updateParams = (newQ, newTab) => {
    const params = new URLSearchParams();
    if (newQ.trim()) params.set("q", newQ.trim());
    if (newTab && newTab !== "all") params.set("tab", newTab);
    navigate(`/search?${params.toString()}`, { replace: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams(searchQuery, activeTab);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setExpandedSection(tab === "all" ? "warmups" : tab);
    updateParams(searchQuery, tab);
  };

  const query = searchQuery.toLowerCase().trim();

  // Return all results if no query is given, otherwise filter
  const results = useMemo(() => {
    let warmups = warmupsData;
    let materials = mockResources.filter(item => item.type === "lesson-plan" || item.type === "textbook");
    let exercises = mockResources.filter(item => item.type === "exercise");
    let assessments = mockResources.filter(item => item.type === "assessment");

    if (query) {
      warmups = warmups.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) || 
        item.instructions.some(inst => inst.toLowerCase().includes(query)) ||
        (item.activityType && item.activityType.toLowerCase().includes(query)) ||
        (item.tips && item.tips.toLowerCase().includes(query))
      );

      const filterResource = (items) => items.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        (item.skill && item.skill.toLowerCase().includes(query)) ||
        (item.topic && item.topic.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
      );

      materials = filterResource(materials);
      exercises = filterResource(exercises);
      assessments = filterResource(assessments);
    }

    return { warmups, materials, exercises, assessments };
  }, [query]);

  const triggerDownload = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 1200);
  };

  const renderWarmupCard = (warmup) => (
    <motion.div
      key={warmup.id}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group p-6 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col justify-between h-60 hover:bg-white/80 dark:hover:bg-zinc-900/60 shadow-sm hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-mono tracking-widest font-black uppercase bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
            {warmup.activityType}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 uppercase font-bold">
            <Clock size={11} /> {warmup.duration}
          </div>
        </div>
        <h3 className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase mb-2 line-clamp-2 leading-tight">
          {warmup.title}
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed line-clamp-3">
          {warmup.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-4 mt-auto">
        <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
          <User size={11} /> {warmup.author ? warmup.author.split(" ")[0] : "Emma"}
        </span>
        <button
          onClick={() => navigate(`/warm-ups?warmupId=${warmup.id}`)}
          className="text-[10px] font-black text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white flex items-center gap-1.5 hover:gap-2 transition-all uppercase cursor-pointer"
        >
          Launch
          <ArrowRight size={12} className="stroke-[2.5]" />
        </button>
      </div>
    </motion.div>
  );

  const renderResourceCard = (res) => (
    <motion.div
      key={res.id}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group p-6 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-white/40 dark:border-white/5 backdrop-blur-md flex flex-col justify-between h-60 hover:bg-white/80 dark:hover:bg-zinc-900/60 shadow-sm hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-mono tracking-widest font-black uppercase bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 px-2 py-1 rounded-md">
            {res.type === "textbook" ? "Guide" : res.type === "exercise" ? "Practice" : res.type === "assessment" ? "Assessment" : "Lesson"}
          </span>
          <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 uppercase font-bold">
            {res.level}
          </div>
        </div>
        <h3 className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase mb-2 line-clamp-2 leading-tight">
          {res.title}
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed line-clamp-3">
          {res.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-4 mt-auto">
        <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
          <User size={11} /> {res.author.split(" ")[0]}
        </span>
        <button
          onClick={() => triggerDownload(res.id)}
          className="text-[10px] font-black text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white flex items-center gap-1.5 transition-all uppercase cursor-pointer"
        >
          {downloadingId === res.id ? (
            <>
              <Check size={12} className="stroke-[2.5]" />
              Ready
            </>
          ) : (
            <>
              Download
              <Download size={12} className="stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const sections = [
    {
      id: "warmups",
      title: "WARMUPS",
      data: results.warmups,
      shade: "bg-zinc-100 dark:bg-zinc-900",
      textColor: "text-zinc-900 dark:text-white",
      render: (item) => renderWarmupCard(item)
    },
    {
      id: "materials",
      title: "MATERIALS",
      data: results.materials,
      shade: "bg-zinc-200 dark:bg-zinc-800",
      textColor: "text-zinc-900 dark:text-white",
      render: (item) => renderResourceCard(item)
    },
    {
      id: "exercises",
      title: "EXERCISES",
      data: results.exercises,
      shade: "bg-zinc-300 dark:bg-zinc-700",
      textColor: "text-zinc-950 dark:text-zinc-50",
      render: (item) => renderResourceCard(item)
    },
    {
      id: "assessments",
      title: "ASSESSMENTS",
      data: results.assessments,
      shade: "bg-zinc-400 dark:bg-zinc-600",
      textColor: "text-zinc-950 dark:text-zinc-50",
      render: (item) => renderResourceCard(item)
    }
  ];

  const toggleSection = (id) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 text-zinc-900 dark:text-zinc-50 pt-24 pb-0" id="global-search-page">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,244,245,0.08)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="w-full relative z-10 flex flex-col items-center">
        
        <div className="w-full max-w-2xl px-6 flex flex-col items-center">
          {/* Back Link */}
          <button 
            onClick={() => navigate("/")}
          className="mb-12 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 backdrop-blur-md text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all text-[10px] font-black uppercase tracking-wider active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={12} className="stroke-[2.5]" />
          Return Home
        </button>

        {/* Header Block centered */}
        <div className="mb-10 w-full text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-white uppercase mb-4">
            Search
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto">
            Query across core lesson warm-ups, textbook companions, exercises, and assessments in real-time.
          </p>
        </div>

        {/* Sticky Search Refinement Bar */}
        <div className="w-full max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <form onSubmit={handleSearchSubmit} className="w-full mb-6" id="search-refinement-form">
            <div className="relative flex items-center rounded-full bg-white dark:bg-zinc-950 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] border border-zinc-200/50 dark:border-zinc-800/80 transition-all focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:border-zinc-300 dark:focus-within:border-zinc-700">
              <div className="absolute left-5 text-zinc-400 pointer-events-none">
                <Search size={18} className="stroke-[2]" />
              </div>
              
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent pl-12 pr-28 py-3.5 text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 text-zinc-900 dark:text-zinc-100 focus:outline-none rounded-full"
              />

              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    updateParams("", activeTab);
                  }}
                  className="absolute right-24 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer p-2"
                  title="Clear input"
                >
                  <X size={16} className="stroke-[2]" />
                </button>
              )}

              <button 
                type="submit"
                className={`absolute right-2 px-4 py-2 text-[10px] tracking-widest uppercase font-bold rounded-full transition-all bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-sm active:scale-95 cursor-pointer`}
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Tags / Categories directly below */}
          <div className="flex flex-wrap justify-center items-center gap-2 w-full">
            {["all", "warmups", "materials", "exercises", "assessments"].map(tabId => {
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => handleTabChange(tabId)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer border ${
                    isActive
                      ? `bg-zinc-900 dark:bg-zinc-100 border-transparent shadow-sm text-white dark:text-zinc-950`
                      : "bg-white/40 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/50 dark:border-zinc-800/80"
                  }`}
                >
                  {tabId}
                </button>
              );
            })}
          </div>

          {!query && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl">
              {["verbs", "grammar", "reading", "debate", "test", "icebreaker", "writing", "vocabulary"].map(item => (
                <button
                  key={item}
                  onClick={() => {
                    setSearchQuery(item);
                    updateParams(item, activeTab);
                  }}
                  className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-md bg-zinc-200/50 hover:bg-zinc-300/60 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>

        {/* Stacked Accordions */}
        <div className="w-full flex flex-col border-y border-zinc-200/80 dark:border-zinc-800/80 relative">
          {sections.map((section) => {
            const isOpen = expandedSection === section.id;
            // Hide section if specific tab is selected but this isn't it
            if (activeTab !== "all" && activeTab !== section.id) return null;

            return (
              <div 
                key={section.id} 
                className={`transition-colors duration-300 ${section.shade} border-b border-black/5 dark:border-white/5 last:border-none`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left py-10 md:py-16 px-6 md:px-12 flex justify-between items-center group focus:outline-none"
                >
                  <h2 className={`text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-300 ${isOpen ? section.textColor : section.textColor + ' opacity-50 group-hover:opacity-80'}`}>
                    {section.title}
                  </h2>
                  <div className="hidden sm:flex flex-col items-end gap-1">
                    <span className={`text-sm md:text-base font-bold font-mono tracking-widest uppercase transition-opacity ${isOpen ? section.textColor : section.textColor + ' opacity-50 block'}`}>
                      {section.data.length} Results
                    </span>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-12 pb-16">
                        {section.data.length === 0 ? (
                          <div className={`font-mono text-sm tracking-wide uppercase font-bold italic ${section.textColor} opacity-60 bg-black/5 dark:bg-white/5 rounded-2xl p-6 text-center`}>
                            No items found matching the query.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {section.data.map(item => section.render(item))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SearchPage;
