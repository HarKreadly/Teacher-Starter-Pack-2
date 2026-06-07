import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Gift, MessageSquare, Send, CheckCircle2, 
  ArrowLeft, Upload, ChevronRight, Paperclip, User,
  Twitter, Linkedin, Github, Instagram
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";

const ContactPage = () => {
  const { activeTheme } = useSettings();
  const [selectedMode, setSelectedMode] = useState(null); // null | "feature" | "donate" | "chat"
  const [hoveredId, setHoveredId] = useState(null); // null | "feature" | "donate" | "chat"
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    featureTitle: "",
    impact: "helpful", // "nice", "helpful", "critical"
    resourceType: "lesson-plan", // "lesson-plan", "exercise", "warm-up"
    resourceSource: "",
    mood: "excited", // "excited", "curious", "studying"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1000);
  };

  const resetModeSelection = () => {
    setSelectedMode(null);
    setSubmitSuccess(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      featureTitle: "",
      impact: "helpful",
      resourceType: "lesson-plan",
      resourceSource: "",
      mood: "excited",
    });
    setUploadedFile(null);
    setSubmitSuccess(false);
  };

  const columns = [
    {
      id: "feature",
      num: "01",
      title: "PROPOSE A FEATURE",
      subtitle: "CUSTOM APP BLUEPRINTS",
      description: "Suggest custom vocabulary exercises, interactive slides, math layout structures, or visual elements for your daily lessons.",
      actionText: "Request feature blueprint",
      icon: Sparkles
    },
    {
      id: "donate",
      num: "02",
      title: "CONTRIBUTE RESOURCES",
      subtitle: "DIGITIZE WORKSHEETS",
      description: "Share physical worksheets, lesson plan files, or conjugation matrices and our co-authors will help digitize them.",
      actionText: "Share resource materials",
      icon: Gift
    },
    {
      id: "chat",
      num: "03",
      title: "GENERAL DISCUSSION",
      subtitle: "DIGITAL DIALOGUE THREADS",
      description: "Share pedagogic remarks, provide platform styling suggestions, or describe how your middle school students interacted with our features.",
      actionText: "Start dialogue thread",
      icon: MessageSquare
    }
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-100/40 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-500 overflow-x-hidden flex flex-col justify-between" id="contact-outer-container">
      
      {/* Subtle top/bottom ambient blurry glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-zinc-200/20 dark:bg-zinc-900/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-zinc-300/10 dark:bg-zinc-900/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10 font-sans flex flex-col justify-center min-h-[100vh]" id="contact-inner-cards-container">
        
        <AnimatePresence mode="wait">
          {!selectedMode ? (
            /* ========================================================
               MINIMALIST & POLISHED MODE SELECTION VIEW WITH HOVER INTERACTION
               ======================================================== */
            <motion.div
              key="designer-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full space-y-12"
            >
              {/* Header Title Block */}
              <div className="text-center max-w-2xl mx-auto space-y-2.5">
                <span className="text-[10px] font-black tracking-[0.3em] text-zinc-400 dark:text-zinc-500 uppercase">
                  Collaborate With Us
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-955 dark:text-zinc-50 uppercase leading-tight">
                  Let's design for classrooms
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                  We translate active lesson structures and worksheets into highly custom, accessible, and fast offline experiences for digital educators.
                </p>
              </div>

              {/* Minimalist Grid of 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 w-full">
                {columns.map((col) => {
                  const isHovered = hoveredId === col.id;
                  const isSomethingHovered = hoveredId !== null;

                  return (
                    <motion.div
                      key={col.id}
                      onMouseEnter={() => setHoveredId(col.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedMode(col.id)}
                      whileHover={{ y: -6, scale: 1.015 }}
                      animate={{ 
                        opacity: isSomethingHovered && !isHovered ? 0.6 : 1
                      }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      className="relative flex flex-col justify-between p-8 md:p-10 cursor-pointer rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/90 [backdrop-filter:blur(12px)] shadow-xs overflow-hidden transition-all duration-300 group hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md min-h-[440px] md:min-h-[480px]"
                      id={`contact-card-${col.id}`}
                    >
                      {/* Subtle back gradient glow inside card */}
                      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-zinc-100/10 dark:from-zinc-900/10 to-transparent pointer-events-none z-0" />
                      
                      {/* Massive watermarked position index */}
                      <span className="absolute right-6 top-6 text-7xl md:text-8xl font-black tracking-tighter text-zinc-100 dark:text-zinc-800/15 font-mono select-none pointer-events-none z-0">
                        {col.num}
                      </span>

                      {/* Header content */}
                      <div className="relative z-10 space-y-4">
                        <div className="p-3 w-fit rounded-2xl bg-zinc-50 dark:bg-zinc-950/30 text-zinc-650 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800/60 shadow-3xs group-hover:scale-105 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-all duration-300">
                          <col.icon size={18} className="stroke-[2.2]" />
                        </div>
                        
                        <div>
                          <p className="text-[10px] font-mono tracking-widest font-black text-zinc-400 dark:text-zinc-550 uppercase">
                            {col.subtitle}
                          </p>
                          <h3 className="text-sm font-black uppercase tracking-tight text-zinc-950 dark:text-zinc-50 mt-1">
                            {col.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description and Action Area at the bottom */}
                      <div className="relative z-10 pt-10">
                        <div className="space-y-4">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold max-w-sm">
                            {col.description}
                          </p>
                          
                          <div className="pt-4 border-t border-zinc-200/40 dark:border-zinc-800/40 flex items-center justify-between">
                            <span className="text-[10px] font-black tracking-widest uppercase text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-zinc-200 transition-colors">
                              {col.actionText}
                            </span>
                            <ChevronRight size={14} className="text-zinc-400 dark:text-zinc-600 transform group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>




            </motion.div>
          ) : (
            /* ========================================================
               IMMERSIVE TWO-COLUMN FORM VIEW inspired by mockup design
               ======================================================== */
            <motion.div
              key="designer-form"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch pt-2 pb-12"
            >
              {/* LEFT HAND PANEL: SIDEBAR CONTEXT CARD */}
              <div 
                className="w-full lg:w-[360px] rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shrink-0"
                id="contact-sidebar-card"
              >
                {/* Subtle back gradient glow inside card */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-zinc-100/10 dark:from-zinc-900/10 to-transparent pointer-events-none z-0" />

                <div className="relative z-10 space-y-8">
                  {/* Back button */}
                  <button
                    type="button"
                    onClick={resetModeSelection}
                    className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full border border-zinc-200/80 dark:border-zinc-805 bg-white dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white text-[10px] font-bold uppercase cursor-pointer transition-all shadow-3xs hover:scale-[1.02]"
                  >
                    <ArrowLeft size={11} className="stroke-[2.5]" />
                    Back to options
                  </button>

                  <div className="space-y-4 pt-4">
                    {/* Stage Tag */}
                    <div className="w-fit">
                      <span className={`${activeTheme.primaryBg} text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md`}>
                        STAGE 01
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 uppercase leading-none font-sans">
                      {selectedMode === "feature" && "FEATURE REGISTRY"}
                      {selectedMode === "donate" && "MATERIAL DRIVE"}
                      {selectedMode === "chat" && "DIALOGUE UNION"}
                    </h2>

                    {/* Paragraph */}
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed font-semibold">
                      {selectedMode === "feature" && "Propose custom vocabulary engines, sentence-unscramblers, real-time math builders, or specific interactive layers you need in the classroom."}
                      {selectedMode === "donate" && "Upload physical worksheets, syllabus structures, or conjugating matrix sheets. Our writers will translate actions directly to offline-ready materials."}
                      {selectedMode === "chat" && "Get in direct dialogue threads regarding active pedagogical methodologies, layout improvements, styling critique, or custom requests."}
                    </p>
                  </div>

                  {/* Benefit points exactly matching screenshot icons/layouts */}
                  <div className="pt-8 border-t border-zinc-150/50 dark:border-zinc-850/30 space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="p-2.5 rounded-xl bg-zinc-100/70 dark:bg-zinc-90 w-fit text-zinc-650 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/40 shadow-3xs">
                        <Sparkles size={14} className="stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-105 uppercase tracking-tight">100% Free & Portable</h4>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal font-semibold mt-0.5">Everything remains accessible offline with zero server lockouts.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="p-2.5 rounded-xl bg-zinc-100/70 dark:bg-zinc-90 w-fit text-zinc-650 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/40 shadow-3xs">
                        <Gift size={14} className="stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-zinc-105 uppercase tracking-tight">Empirical Integration</h4>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal font-semibold mt-0.5">We convert worksheets and dialog parameters into interactive digital utilities.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer deleted as requested */}
              </div>

              {/* RIGHT HAND PANEL: ACTUAL FORM VIEW */}
              <div 
                className="flex-grow rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
                id="contact-form-card"
              >
                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <motion.div
                      key="form-fields-animator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Header parameter name with logo icon */}
                        <div className="flex items-center justify-between pb-6 border-b border-zinc-150/50 dark:border-zinc-850/30">
                          <div className="flex items-center gap-3">
                            {(() => {
                              const SelectedIcon = columns.find(c => c.id === selectedMode)?.icon || Sparkles;
                              return <SelectedIcon size={16} className="text-zinc-955 or dark:text-zinc-102 stroke-[2.2]" />;
                            })()}
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-950 dark:text-zinc-100 font-sans">
                              {selectedMode === "feature" && "PROPOSED FEATURE PARAMETERS"}
                              {selectedMode === "donate" && "CONTRIBUTE SOURCE PARAMETERS"}
                              {selectedMode === "chat" && "CORRESPONDENCE DEBATE PARAMETERS"}
                            </span>
                          </div>
                        </div>

                        {/* Name & Email Field Pair */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-500 mb-2.5 pl-0.5">
                              Your Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="Sophia Miller"
                              className="w-full px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-950 dark:focus:border-zinc-100 transition-all shadow-3xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-500 mb-2.5 pl-0.5">
                              Your Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="sophia@school.edu"
                              className="w-full px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-950 dark:focus:border-zinc-100 transition-all shadow-3xs"
                            />
                          </div>
                        </div>

                        {/* Feature-specific Fields */}
                        {selectedMode === "feature" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="space-y-6"
                          >
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-500 mb-2.5 pl-0.5">
                                Feature Blueprint Title
                              </label>
                              <input
                               type="text"
                               name="featureTitle"
                               value={formData.featureTitle}
                               onChange={handleInputChange}
                               required={selectedMode === "feature"}
                               placeholder="e.g. Sentence Unscramble Puzzle Slider"
                               className="w-full px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-950 dark:focus:border-zinc-100 transition-all outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-500 mb-2.5 pl-0.5">
                                Classroom Urgency Level
                              </label>
                              <div className="p-1 px-1.5 bg-zinc-100 dark:bg-zinc-900/55 rounded-2xl flex flex-col sm:flex-row gap-1.5 border border-zinc-200 dark:border-zinc-800/80">
                                {[
                                  { level: "nice", label: "Nice-To-Have" },
                                  { level: "helpful", label: "Highly Helpful" },
                                  { level: "critical", label: "Immediate Necessity" }
                                ].map((lvl) => (
                                  <button
                                    key={lvl.level}
                                    type="button"
                                    onClick={() => setFormData(p => ({ ...p, impact: lvl.level }))}
                                    className={`flex-1 py-3 px-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                      formData.impact === lvl.level
                                        ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white border border-zinc-200/50 dark:border-zinc-700/50"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                                    }`}
                                  >
                                    {lvl.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Donate / Resource drive fields */}
                        {selectedMode === "donate" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-500 mb-2.5 pl-0.5">
                                  Material Category
                                </label>
                                <div className="relative">
                                  <select
                                    name="resourceType"
                                    value={formData.resourceType}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:bg-white focus:border-zinc-950 dark:focus:border-zinc-100 transition-all font-sans cursor-pointer appearance-none animate-none"
                                  >
                                    <option value="lesson-plan" className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">Draft Lesson Syllabus</option>
                                    <option value="exercise" className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">Vocabulary Sheets</option>
                                    <option value="warm-up" className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">5-Min Student Activities</option>
                                    <option value="other" className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">Other References</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-500 mb-2.5 pl-0.5">
                                  Reference Link (Drive / GitHub)
                                </label>
                                <input
                                  type="url"
                                  name="resourceSource"
                                  value={formData.resourceSource}
                                  onChange={handleInputChange}
                                  placeholder="https://drive.google.com/..."
                                  className="w-full px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-950 dark:focus:border-zinc-100 transition-all shadow-3xs"
                                />
                              </div>
                            </div>

                            {/* Drag & Drop Upload Zone */}
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-550 mb-2.5 pl-0.5">
                                Upload File Draft (.pdf, .txt, .md, .docx)
                              </label>
                              <div
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                className={`relative border border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all ${
                                  dragActive 
                                    ? "border-zinc-600 bg-zinc-100 dark:bg-zinc-900/50" 
                                    : "border-zinc-250 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20 hover:border-zinc-400 dark:hover:hover:border-zinc-700"
                                }`}
                              >
                                <Upload size={16} className="text-zinc-400 dark:text-zinc-600 mb-2" />
                                
                                {uploadedFile ? (
                                  <p className="text-[10px] font-black text-zinc-950 dark:text-zinc-250 max-w-xs text-center truncate">
                                    READY: {uploadedFile.name.toUpperCase()} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                                  </p>
                                ) : (
                                  <p className="text-[10px] text-zinc-450 dark:text-zinc-500 text-center leading-normal font-semibold">
                                    Drag document here or{" "}
                                    <label className="text-zinc-955 dark:text-white font-bold underline cursor-pointer select-none">
                                      browse computer
                                      <input
                                        type="file"
                                        accept=".pdf,.txt,.md,.docx"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                      />
                                    </label>
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Dialogue Union topics */}
                        {selectedMode === "chat" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="space-y-6"
                          >
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-550 mb-2.5 pl-0.5">
                                Conversation Topic
                              </label>
                              <div className="p-1 px-1.5 bg-zinc-100 dark:bg-zinc-900/55 rounded-2xl flex flex-col sm:flex-row gap-1.5 border border-zinc-200 dark:border-zinc-800/80">
                                {[
                                  { value: "excited", label: "Feature Idea" },
                                  { value: "curious", label: "General Feedback" },
                                  { value: "studying", label: "Pedagogic Research" }
                                ].map((m) => (
                                  <button
                                    key={m.value}
                                    type="button"
                                    onClick={() => setFormData(p => ({ ...p, mood: m.value }))}
                                    className={`flex-1 py-3 px-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                      formData.mood === m.value
                                        ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white border border-zinc-200/50 dark:border-zinc-700/50"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                                    }`}
                                  >
                                    {m.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Always visible description message space */}
                        <div>
                          <label className="block text-[9px] uppercase font-mono tracking-widest font-black text-zinc-450 dark:text-zinc-550 mb-2.5 pl-0.5">
                            {selectedMode === "feature"
                              ? "DESCRIBE CONTROLS OR CUSTOM VISUAL REQUIREMENTS"
                              : selectedMode === "donate"
                              ? "DESCRIBE AUTHORSHIP ACKNOWLEDGEMENTS OR DETAILS"
                              : "DIALOGUE MESSAGE DETAIL"}
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            placeholder={
                              selectedMode === "feature"
                                ? "Outline the custom score metrics, dynamic animations, text unscramble layouts..."
                                : selectedMode === "donate"
                                ? "Detail source matrices, textbook links, copyright credits, lesson parameters..."
                                : "How are students using active grids? Propose relative user designs..."
                            }
                            className="w-full px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-950 dark:focus:border-zinc-100 transition-all shadow-3xs resize-none"
                          />
                        </div>

                        {/* Bottom action bar row */}
                        <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-zinc-150/50 dark:border-zinc-850/30">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-zinc-950 dark:bg-white animate-pulse shrink-0" />
                            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-450 uppercase tracking-wider">
                              Client dispatch route ready
                            </span>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center justify-center gap-2 px-8 py-4 ${activeTheme.primaryBg} active:scale-95 font-extrabold rounded-full text-[10px] tracking-widest uppercase shadow-md transition-all disabled:opacity-50 cursor-pointer shrink-0`}
                          >
                            {isSubmitting ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                Dispatch Thread
                                <Send size={11} className="stroke-[2.5]" />
                              </>
                            )}
                          </button>
                        </div>

                      </form>
                    </motion.div>
                  ) : (
                    /* SUBMISSION SUCCESS PRESENTATION */
                    <motion.div
                      key="submission-feedback-feedback"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-16 px-4 h-full"
                    >
                      <div className="p-4 rounded-3xl bg-zinc-100 dark:bg-zinc-900/60 text-zinc-955 dark:text-zinc-50 shrink-0 border border-zinc-200/40 dark:border-zinc-800 mb-6 shadow-3xs">
                        <CheckCircle2 size={32} className="stroke-[1.8]" />
                      </div>

                      <h3 className="text-xl font-extrabold tracking-tight text-zinc-955 dark:text-white uppercase mb-2">
                        Draft Sent Successfully
                      </h3>

                      <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-10 font-semibold">
                        Thank you for collaborating! Your input regarding {selectedMode} has been filed locally and our co-authors will evaluate this layout.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={resetForm}
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/45 text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white text-[10px] font-black uppercase cursor-pointer transition-colors shadow-3xs"
                        >
                          <ArrowLeft size={11} className="stroke-[2.5]" />
                          Submit different request
                        </button>

                        <button
                          onClick={resetModeSelection}
                          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl ${activeTheme.primaryBg} text-[10px] font-black uppercase cursor-pointer transition-all shadow-xs`}
                        >
                          Show options list
                          <ChevronRight size={11} className="stroke-[2.5]" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* BOTTOM EXPOSED LAYER: Warm yellow mat exposing beautiful physical scattered sticky notes */}
      <div className="w-full relative mt-auto px-6 sm:px-12 md:px-16 lg:px-20 py-16 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-12 bg-[#fef08a] dark:bg-[#18160e] z-0 select-none border-t border-black/5 dark:border-white/5 shadow-sm">
        
        {/* Slashed metadata label over yellow board */}
        <div className="space-y-6 max-w-lg z-10 relative">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight font-sans">
              Engage them, trust them.
            </h3>
            <p className="text-zinc-700/80 dark:text-zinc-400 text-sm sm:text-base font-medium leading-relaxed font-sans">
              Inspire high school cohorts same minute. We convert traditional written material files into lightweight, responsive digital micro-game stages designed for high retention.
            </p>
          </div>

          {/* SOCIAL MEDIA LINKS */}
          <div className="flex gap-4 pt-2">
            <a href="#" className="p-3 bg-white/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-800/60 border border-zinc-950/10 dark:border-white/10 rounded-2xl transition-all duration-300 text-zinc-900 dark:text-zinc-200 shadow-sm hover:scale-105 active:scale-95">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-3 bg-white/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-800/60 border border-zinc-950/10 dark:border-white/10 rounded-2xl transition-all duration-300 text-zinc-900 dark:text-zinc-200 shadow-sm hover:scale-105 active:scale-95">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-3 bg-white/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-800/60 border border-zinc-950/10 dark:border-white/10 rounded-2xl transition-all duration-300 text-zinc-900 dark:text-zinc-200 shadow-sm hover:scale-105 active:scale-95">
              <Github size={18} />
            </a>
            <a href="#" className="p-3 bg-white/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-800/60 border border-zinc-950/10 dark:border-white/10 rounded-2xl transition-all duration-300 text-zinc-900 dark:text-zinc-200 shadow-sm hover:scale-105 active:scale-95">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* SCATTERED PHYSICAL STICKY NOTES OVER GRIDS */}
        <div className="flex flex-wrap items-center justify-center gap-6 xl:gap-8 shrink-0 z-10 relative w-full xl:w-auto">
          
          {/* Pink Coral Custom Sticky Note */}
          <div className="relative w-40 h-40 p-5 shadow-2xl rotate-[-4deg] hover:rotate-[-1deg] hover:scale-105 transition-all duration-300 border border-black/5 text-zinc-950 flex flex-col justify-between rounded-sm cursor-default" style={{ backgroundColor: "#ff7597" }}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-6 bg-white/70 backdrop-blur-xs rounded shadow-sm flex items-center justify-center border border-zinc-200/20">
              <Paperclip size={10} className="text-zinc-650 shrink-0" />
            </div>

            <div className="font-mono text-[9px] font-black uppercase tracking-widest text-black/40">PEDAGOGY</div>
            
            <p className="font-sans text-xs font-black tracking-tight leading-normal uppercase text-black">
              This class<br />needs to be<br />engaged<br />ASAP!
            </p>

            <div className="font-mono text-[8px] font-bold text-black/50 tracking-wider">WARMEDIA // 01</div>
          </div>

          {/* Semi-Translucent Feedback Comments Dialog bubble */}
          <div className="max-w-xs bg-white/50 dark:bg-[#252317]/50 backdrop-blur-md border border-zinc-250/20 dark:border-zinc-800/40 p-5 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between relative text-zinc-900 dark:text-zinc-100 cursor-default">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5.5 h-5.5 rounded-full bg-zinc-950/10 dark:bg-white/10 flex items-center justify-center border border-zinc-300/30 dark:border-zinc-700/30">
                <User size={10} className="text-zinc-800 dark:text-zinc-300" />
              </div>
              <div className="text-[9px] font-mono tracking-widest font-black uppercase tracking-wide text-zinc-800 dark:text-zinc-300">DAVID_C_EDU</div>
            </div>

            <p className="text-zinc-800 dark:text-zinc-200 text-[11px] leading-relaxed font-sans font-semibold mb-2.5">
              "Two Truths and a Lie worked incredibly well with my Grade 9s! They kept the speaking discussion going."
            </p>

            <div className="text-[8px] font-mono tracking-widest text-zinc-600 dark:text-zinc-400 uppercase font-black">FEEDBACK CONFIRMED</div>
          </div>

          {/* Yellow Sticky Note with slight offset angle */}
          <div className="relative w-40 h-40 p-5 shadow-2xl rotate-[3deg] hover:rotate-[1deg] hover:scale-105 transition-all duration-300 border border-black/5 text-zinc-950 flex flex-col justify-between rounded-sm cursor-default" style={{ backgroundColor: "#fff066" }}>
            <div className="absolute top-2 left-4 w-9 h-3.5 bg-zinc-300/40 rotate-[15deg] backdrop-blur-xs shadow-xs rounded-xs" />
            
            <div className="font-mono text-[9px] font-black uppercase tracking-widest text-black/40">SCHEDULING</div>

            <p className="font-sans text-xs font-black tracking-tight leading-normal uppercase text-black">
              Try Speed<br />Debating<br />this<br />Thursday!
            </p>

            <div className="font-mono text-[8px] font-bold text-black/50 tracking-wider">WARMEDIA // 02</div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
