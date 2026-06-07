import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Search, Grid, List, Clock, User, 
  X, ChevronLeft, ChevronRight, ChevronDown, PlayCircle, RefreshCw, 
  Download, ArrowLeft, ArrowRight, Paperclip,
  Sliders, Timer, Users, Cpu, Flame, LayoutGrid, Wrench
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import { warmupsData } from "../data/warmupsData";

const GeometricShapes = ({ id }) => {
  if (id % 6 === 1) {
    return (
      <svg className="w-24 h-24 absolute bottom-0 right-0 pointer-events-none z-0 opacity-15 dark:opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 100 100">
        <circle cx="75" cy="75" r="22" className="fill-zinc-950 dark:fill-white" />
        <rect x="35" y="45" width="28" height="28" rx="6" className="fill-zinc-400 dark:fill-zinc-650" transform="rotate(15 49 59)" />
      </svg>
    );
  }
  if (id % 6 === 2) {
    return (
      <svg className="w-24 h-24 absolute bottom-0 right-0 pointer-events-none z-0 opacity-15 dark:opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 100 100">
        <path d="M40 75 L75 40 L90 75 Z" className="fill-zinc-950 dark:fill-white" />
        <circle cx="50" cy="75" r="18" className="fill-zinc-400 dark:fill-zinc-650" />
      </svg>
    );
  }
  if (id % 6 === 3) {
    return (
      <svg className="w-24 h-24 absolute bottom-0 right-0 pointer-events-none z-0 opacity-15 dark:opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 100 100">
        <rect x="52" y="38" width="32" height="32" rx="8" className="fill-zinc-950 dark:fill-white" transform="rotate(-20 68 54)" />
        <circle cx="38" cy="75" r="16" className="fill-zinc-400 dark:fill-zinc-650" />
      </svg>
    );
  }
  if (id % 6 === 4) {
    return (
      <svg className="w-24 h-24 absolute bottom-0 right-0 pointer-events-none z-0 opacity-15 dark:opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 100 100">
        <circle cx="68" cy="48" r="18" className="fill-zinc-950 dark:fill-white" />
        <rect x="35" y="62" width="38" height="22" rx="5" className="fill-zinc-400 dark:fill-zinc-650" transform="rotate(5 54 73)" />
      </svg>
    );
  }
  if (id % 6 === 5) {
    return (
      <svg className="w-24 h-24 absolute bottom-0 right-0 pointer-events-none z-0 opacity-15 dark:opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 100 100">
        <path d="M40 75 A 24 24 0 0 1 88 75 Z" className="fill-zinc-950 dark:fill-white" />
        <rect x="72" y="58" width="14" height="14" rx="3" className="fill-zinc-400 dark:fill-zinc-650" transform="rotate(30 79 65)" />
      </svg>
    );
  }
  return (
    <svg className="w-24 h-24 absolute bottom-0 right-0 pointer-events-none z-0 opacity-15 dark:opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 100 100">
      <rect x="48" y="48" width="28" height="28" rx="14" className="fill-zinc-950 dark:fill-white" />
      <circle cx="78" cy="78" r="10" className="fill-zinc-400 dark:fill-zinc-650" />
    </svg>
  );
};

const StepIllustration = ({ activityType, index }) => {
  const strokeColor = "stroke-zinc-300 dark:stroke-zinc-800";
  const accentStroke = "stroke-zinc-900 dark:stroke-zinc-100";
  const softAccent = "stroke-zinc-400 dark:stroke-zinc-650";

  // Conceptual inline minimalist vector illustrations mimicking fine hand-sketched schemas.
  if (activityType === "Ice Breakers" || activityType === "Discussion") {
    if (index % 3 === 0) {
      return (
        <div className="w-full h-36 flex items-center justify-center relative my-4">
          <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
            {/* Minimalist user circles with connecting communication lines */}
            <circle cx="35" cy="50" r="14" className={strokeColor} strokeWidth="1" />
            <circle cx="70" cy="50" r="14" className={accentStroke} strokeWidth="1" />
            <path d="M 49,45 Q 52.5,42 56,45" className={accentStroke} strokeWidth="1" strokeLinecap="round" />
            <path d="M 44,55 Q 52.5,58 61,55" className={softAccent} strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
            {/* Dynamic visual indicator dot */}
            <circle cx="70" cy="42" r="2.5" className="fill-zinc-950 dark:fill-white stroke-none" />
          </svg>
        </div>
      );
    } else if (index % 3 === 1) {
      return (
        <div className="w-full h-36 flex items-center justify-center relative my-4">
          <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
            {/* Laptop model with feedback curves */}
            <rect x="25" y="32" width="50" height="34" rx="4" className={strokeColor} strokeWidth="1" />
            <line x1="20" y1="66" x2="80" y2="66" className={accentStroke} strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 40,48 H 60" className={strokeColor} strokeWidth="1" />
            <path d="M 45,54 H 55" className={softAccent} strokeWidth="1" />
            <circle cx="50" cy="40" r="3" className={`${accentStroke} fill-none`} strokeWidth="1" />
            <path d="M 15,35 Q 22,25 32,30" className={softAccent} strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-full h-36 flex items-center justify-center relative my-4">
          <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
            {/* Stacked speech balloons or message lanes */}
            <rect x="20" y="24" width="45" height="22" rx="6" className={strokeColor} strokeWidth="1" />
            <rect x="35" y="52" width="45" height="22" rx="6" className={accentStroke} strokeWidth="1" />
            <path d="M 30,46 L 26,52" className={strokeColor} strokeWidth="1" />
            <path d="M 70,52 L 74,46" className={accentStroke} strokeWidth="1" />
          </svg>
        </div>
      );
    }
  }

  if (activityType === "TPR" || activityType === "Games") {
    if (index % 3 === 0) {
      return (
        <div className="w-full h-36 flex items-center justify-center relative my-4">
          <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
            {/* Concentric rings / physical coordination rings */}
            <circle cx="50" cy="50" r="28" className={strokeColor} strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="18" className={accentStroke} strokeWidth="1.2" />
            <path d="M 50,15 V 32 M 50,68 V 85" className={softAccent} strokeWidth="1" />
            <circle cx="50" cy="32" r="3" className="fill-none stroke-zinc-950 dark:stroke-white" strokeWidth="1" />
            <circle cx="50" cy="68" r="3" className="fill-zinc-950 dark:fill-white" />
          </svg>
        </div>
      );
    } else if (index % 3 === 1) {
      return (
        <div className="w-full h-36 flex items-center justify-center relative my-4">
          <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
            {/* Flow dynamic arrows / spectrum indicators */}
            <line x1="15" y1="50" x2="85" y2="50" className={strokeColor} strokeWidth="1" />
            <circle cx="50" cy="50" r="8" className={accentStroke} strokeWidth="1.2" />
            <path d="M 28,34 L 18,50 L 28,66" className={softAccent} strokeWidth="1" strokeLinejoin="round" />
            <path d="M 72,34 L 82,50 L 72,66" className={accentStroke} strokeWidth="1" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="2" className="fill-zinc-950 dark:fill-white" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-full h-36 flex items-center justify-center relative my-4">
          <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
            {/* Compass / node connectors */}
            <rect x="25" y="25" width="50" height="50" rx="25" className={strokeColor} strokeWidth="1" />
            <line x1="25" y1="50" x2="75" y2="50" className={softAccent} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="50" y1="25" x2="50" y2="75" className={softAccent} strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 40,40 L 60,60" className={accentStroke} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="3" className="fill-zinc-900 dark:fill-zinc-100" />
            <circle cx="60" cy="60" r="3" className="fill-none stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="1" />
          </svg>
        </div>
      );
    }
  }

  // Fallback diagrams (for Puzzles, Brainstorming, etc.)
  if (index % 3 === 0) {
    return (
      <div className="w-full h-36 flex items-center justify-center relative my-4">
        <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
          {/* Box grids resembling puzzle pieces/cards */}
          <rect x="20" y="25" width="26" height="26" rx="4" className={strokeColor} strokeWidth="1" />
          <rect x="54" y="25" width="26" height="26" rx="4" className={accentStroke} strokeWidth="1" />
          <rect x="37" y="58" width="26" height="26" rx="4" className={strokeColor} strokeWidth="1" />
          <path d="M 40,38 L 54,38" className={softAccent} strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 33,51 L 43,58" className={softAccent} strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>
    );
  } else if (index % 3 === 1) {
    return (
      <div className="w-full h-36 flex items-center justify-center relative my-4">
        <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
          {/* Brainstorming node webs */}
          <circle cx="50" cy="30" r="8" className={accentStroke} strokeWidth="1.2" />
          <circle cx="28" cy="65" r="8" className={strokeColor} strokeWidth="1" />
          <circle cx="72" cy="65" r="8" className={strokeColor} strokeWidth="1" />
          <line x1="45" y1="36" x2="33" y2="59" className={softAccent} strokeWidth="1" />
          <line x1="55" y1="36" x2="67" y2="59" className={softAccent} strokeWidth="1" />
          <circle cx="50" cy="30" r="3" className="fill-zinc-950 dark:fill-white" />
        </svg>
      </div>
    );
  } else {
    return (
      <div className="w-full h-36 flex items-center justify-center relative my-4">
        <svg className="w-full h-full max-w-[140px]" viewBox="0 0 100 100" fill="none">
          {/* Structured list lines with tick metrics */}
          <line x1="20" y1="30" x2="80" y2="30" className={accentStroke} strokeWidth="1.2" />
          <line x1="20" y1="50" x2="70" y2="50" className={strokeColor} strokeWidth="1" />
          <line x1="20" y1="70" x2="80" y2="70" className={strokeColor} strokeWidth="1" />
          <circle cx="85" cy="30" r="2.5" className="fill-zinc-950 dark:fill-white stroke-none" />
          <circle cx="75" cy="50" r="2" className="fill-zinc-400 dark:fill-zinc-600 stroke-none" />
          <circle cx="85" cy="70" r="2" className="fill-zinc-400 dark:fill-zinc-600 stroke-none" />
        </svg>
      </div>
    );
  }
};

const categoryDetails = {
  "TPR": {
    description: [
      "Total Physical Response relies on physical movement.",
      "Teaches language and concepts through visual and kinesthetic actions.",
      "Students react to verbal input using their entire body.",
      "Creates a direct link between physical action and cognitive memory."
    ],
    advantages: [
      "Makes students active and not sleepy in class.",
      "Works well with middle school and high school students.",
      "Reduces stress by removing the pressure to speak early.",
      "Makes learning highly memorable through physical association."
    ],
    disadvantages: [
      "Can get a bit chaotic if not properly managed.",
      "Requires open physical space in the classroom.",
      "Some older students might feel shy or self-conscious at first.",
      "Not suited for abstract or complex theoretical concepts."
    ],
    usage: [
      "Great for acquiring new energetic vocabulary words.",
      "Excellent method for practicing classroom instructions.",
      "Perfect tool for energizing a class during a mid-lesson slump.",
      "Use it to review previous physical action verbs."
    ]
  },
  "Discussion": {
    description: [
      "Structured conversations designed to explore specific topics.",
      "Allows students to debate ideas and share unique opinions.",
      "Requires active listening and spontaneous speaking.",
      "Can be guided by prompts, questions, or controversial statements."
    ],
    advantages: [
      "Improves speaking fluency and builds conversational rhythm.",
      "Develops critical thinking by challenging personal assumptions.",
      "Fosters peer-to-peer connection, empathy, and active listening.",
      "Prepares students for real-world professional discussions."
    ],
    disadvantages: [
      "Conversations may fall quiet if topics aren't engaging enough.",
      "Can sometimes be dominated by highly extroverted students.",
      "Requires careful scaffolding so students know what to say.",
      "Can stray off-topic quickly if not monitored."
    ],
    usage: [
      "Best for advancing complex or abstract class topics.",
      "Excellent for practicing debate and negotiation skills.",
      "Use for consolidating knowledge at the end of a lesson.",
      "Ideal for activating prior knowledge before a presentation."
    ]
  },
  "Ice Breakers": {
    description: [
      "Quick, highly interactive activities designed to warm up the room.",
      "Encourages interaction among students who don't know each other.",
      "Usually unrelated to heavy academic curriculum.",
      "Builds quick rapport and lightens the classroom atmosphere."
    ],
    advantages: [
      "Instantly grabs student attention right at the start.",
      "Builds a safe, welcoming, and relaxed classroom environment.",
      "Lowers the affective filter to increase student participation.",
      "Helps the teacher read the room's energy level very quickly."
    ],
    disadvantages: [
      "Can take time away from core content if not well-managed.",
      "Students may become overly energetic and hard to calm down.",
      "Might feel repetitive if the same games are used often.",
      "Some students may resist participation if they feel silly."
    ],
    usage: [
      "Optimal for use at the beginning of a school term or Monday.",
      "Great for mixing up student groups or seating charts.",
      "Use whenever classroom energy stalls and needs a quick reboot.",
      "Helpful transition tool between two highly intensive study blocks."
    ]
  },
  "Brainstorming": {
    description: [
      "Rapid, unstructured generation of large quantities of ideas.",
      "Focuses on quantity over quality without immediate judgment.",
      "Can be done independently, in small groups, or whole-class.",
      "Uses whiteboards, sticky notes, or verbal call-outs."
    ],
    advantages: [
      "Encourages high creativity and out-of-the-box thinking.",
      "Allows all students to contribute freely without fear of being 'wrong'.",
      "Generates exceptional raw material for writing or projects.",
      "Builds momentum and excitement for a brand new topic."
    ],
    disadvantages: [
      "May go off-topic rapidly without strong teacher facilitation.",
      "Sometimes results in superficial or repetitive ideas.",
      "Requires a process to filter and organize ideas afterward.",
      "Quiet students might still struggle to shout out ideas in large groups."
    ],
    usage: [
      "Ideal for pre-writing activities and essay structuring.",
      "Perfect for introducing a completely new classroom unit.",
      "Excellent for collaborative group problem-solving tasks.",
      "Use to review everything students remember about a past topic."
    ]
  },
  "Games": {
    description: [
      "Playful, rule-based structured contexts applied directly to learning.",
      "Often involves points, time limits, or friendly team competition.",
      "Transforms repetitive drills into active challenges.",
      "Requires clear win-conditions and defined boundaries."
    ],
    advantages: [
      "Significantly increases motivation and academic engagement.",
      "Makes repetitive practice or memorization highly interactive.",
      "Promotes intense focus and immediate application of knowledge.",
      "Creates joyful memories tied directly to the learning material."
    ],
    disadvantages: [
      "Can easily become overly competitive or loud.",
      "Instructions and rule clarifications can take too much time.",
      "Losing teams may become discouraged if not managed well.",
      "Takes slightly longer to prep materials than standard worksheets."
    ],
    usage: [
      "Perfect for end-of-unit review sessions or test prep.",
      "Ideal for energetic Friday warm-ups to close the week.",
      "Use for celebrating learning milestones or vocabulary mastery.",
      "Great for station-rotation independent or group activities."
    ]
  },
  "Puzzles": {
    description: [
      "Cognitively stimulating challenges that require critical thinking.",
      "Teaches sequence logic, pattern matching, and analytical deduction.",
      "Engages students individually or in pairs to crack a specific cipher.",
      "Encourages grit and resilience through focused problem-solving."
    ],
    advantages: [
      "Sharply focuses classroom attention and calms down rowdy energy.",
      "Develops independent reasoning and analytical capability.",
      "Highly satisfying when students reach the Eureka breakthrough moment.",
      "Provides measurable indicators of student comprehension limits."
    ],
    disadvantages: [
      "Can frustrate struggling students if the difficulty curve is too steep.",
      "Takes longer for slower-paced students to complete.",
      "Requires careful design to prevent guessing.",
      "Not as immediately loud or rowdy if high energy is desired."
    ],
    usage: [
      "Outstanding for starting intensive math or science sessions.",
      "Use as a quiet transition entry task when students enter the room.",
      "Perfect for encouraging small-team logical sorting workouts.",
      "Use to review formulas, vocabulary stems, or chronological facts."
    ]
  }
};

const stickyNotePresets = {
  "Discussion": { 
    bg: "bg-amber-100/10 dark:bg-amber-950/10", 
    border: "border-amber-250/35 dark:border-amber-900/20",
    text: "text-amber-900 dark:text-amber-400", 
    dot: "bg-amber-400 dark:bg-amber-500",
    hoverBg: "hover:bg-amber-100/20 dark:hover:bg-amber-950/15"
  },
  "TPR": { 
    bg: "bg-rose-100/10 dark:bg-rose-950/10", 
    border: "border-rose-250/35 dark:border-rose-900/20",
    text: "text-rose-900 dark:text-rose-400", 
    dot: "bg-rose-400 dark:bg-rose-500",
    hoverBg: "hover:bg-rose-100/20 dark:hover:bg-rose-950/15"
  },
  "Puzzles": { 
    bg: "bg-sky-100/10 dark:bg-sky-950/10", 
    border: "border-sky-250/35 dark:border-sky-900/20",
    text: "text-sky-900 dark:text-sky-400", 
    dot: "bg-sky-400 dark:bg-sky-500",
    hoverBg: "hover:bg-sky-100/20 dark:hover:bg-sky-950/15"
  },
  "Ice Breakers": { 
    bg: "bg-emerald-100/10 dark:bg-emerald-950/10", 
    border: "border-emerald-250/35 dark:border-emerald-900/20",
    text: "text-emerald-900 dark:text-emerald-400", 
    dot: "bg-emerald-400 dark:bg-emerald-500",
    hoverBg: "hover:bg-emerald-100/20 dark:hover:bg-emerald-950/15"
  },
  "Brainstorming": { 
    bg: "bg-purple-100/10 dark:bg-purple-950/10", 
    border: "border-purple-250/35 dark:border-purple-900/20",
    text: "text-purple-900 dark:text-purple-400", 
    dot: "bg-purple-400 dark:bg-purple-500",
    hoverBg: "hover:bg-purple-100/20 dark:hover:bg-purple-950/15"
  },
  "Games": { 
    bg: "bg-pink-100/10 dark:bg-pink-950/10", 
    border: "border-pink-250/35 dark:border-pink-900/20",
    text: "text-pink-900 dark:text-pink-400", 
    dot: "bg-pink-400 dark:bg-pink-500",
    hoverBg: "hover:bg-pink-100/20 dark:hover:bg-pink-950/15"
  }
};

const formulaData = {
  voltage: {
    title: "High Voltage Kinetic",
    metric1: "Kinesthetic Drive",
    val1: 95,
    metric2: "Cognitive Load",
    val2: 30,
    metric3: "Social Resonance",
    val3: 85,
    spark: "ZINC-800 // SENSORY_SHIELD",
    blueprint: "Convert static desk positions to rotating nodes every 120 seconds. High frequency physical handovers reduce screen fatigue."
  },
  dialectic: {
    title: "Cognitive Dialectic",
    metric1: "Kinesthetic Drive",
    val1: 20,
    metric2: "Cognitive Load",
    val2: 90,
    metric3: "Social Resonance",
    val3: 95,
    spark: "ZINC-600 // CRITICAL_HEURISTIC",
    blueprint: "Establish randomized peer-debate dyads. Force thesis-antithesis synthesis in rapid 90 second intervals with muted transitions."
  },
  reticulation: {
    title: "Logical Reticulation",
    metric1: "Kinesthetic Drive",
    val1: 15,
    metric2: "Cognitive Load",
    val2: 95,
    metric3: "Social Resonance",
    val3: 40,
    spark: "ZINC-400 // RESOLVING_DEDUCTION",
    blueprint: "Deploy silent puzzle sequences in increments of three. Gradual logic escalation builds dopamine cycles via pattern recognition."
  }
};

const WarmupsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTheme } = useSettings();

  const [searchQuery, setSearchQuery] = useState(() => {
    return new URLSearchParams(window.location.search).get("q") || "";
  });
  const [selectedTime, setSelectedTime] = useState("All");
  const [selectedPreparation, setSelectedPreparation] = useState("All");
  const [selectedEnergy, setSelectedEnergy] = useState("All");
  const [selectedInteraction, setSelectedInteraction] = useState("All");
  const [selectedMaterials, setSelectedMaterials] = useState("All");
  const [viewMode, setViewMode] = useState("colorful"); // colorful grid, minimalist grid, compact list
  const [selectedWarmup, setSelectedWarmup] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFormulaId, setActiveFormulaId] = useState("voltage");

  // Derive selectedType directly from the URL pathname to avoid state synchronization side-effects
  const selectedType = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.endsWith("/discussion") || path.includes("/discussion")) {
      return "Discussion";
    } else if (path.endsWith("/tpr") || path.includes("/tpr")) {
      return "TPR";
    } else if (path.endsWith("/puzzles") || path.includes("/puzzles")) {
      return "Puzzles";
    } else if (path.endsWith("/icebreakers") || path.includes("/icebreakers") || path.endsWith("/ice-breakers") || path.includes("/ice-breakers")) {
      return "Ice Breakers";
    } else if (path.endsWith("/brainstorming") || path.includes("/brainstorming")) {
      return "Brainstorming";
    } else if (path.endsWith("/games") || path.includes("/games")) {
      return "Games";
    }
    return "All";
  }, [location.pathname]);

  const handleTypeSelect = (type) => {
    if (type === "All" || !type) {
      navigate("/warm-ups");
    } else {
      const typeToSubpath = {
        "Discussion": "discussion",
        "TPR": "tpr",
        "Puzzles": "puzzles",
        "Ice Breakers": "icebreakers",
        "Brainstorming": "brainstorming",
        "Games": "games"
      };
      const subpath = typeToSubpath[type] || type.toLowerCase().replace(/\s+/g, "");
      navigate(`/warm-ups/${subpath}`);
    }
  };

  // Filters setup
  const activityTypes = ["All", "Discussion", "TPR", "Puzzles", "Ice Breakers", "Brainstorming", "Games"];

  const activeFiltersCount = useMemo(() => {
    return [
      selectedType !== "All",
      selectedTime !== "All",
      selectedPreparation !== "All",
      selectedEnergy !== "All",
      selectedInteraction !== "All",
      selectedMaterials !== "All"
    ].filter(Boolean).length;
  }, [selectedType, selectedTime, selectedPreparation, selectedEnergy, selectedInteraction, selectedMaterials]);

  const filteredWarmups = useMemo(() => {
    return warmupsData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || item.activityType === selectedType;
      const matchesTime = selectedTime === "All" || item.duration === selectedTime;
      const matchesPreparation = selectedPreparation === "All" || item.preparation === selectedPreparation;
      const matchesEnergy = selectedEnergy === "All" || item.energy === selectedEnergy;
      const matchesInteraction = selectedInteraction === "All" || item.interaction === selectedInteraction;
      const matchesMaterials = selectedMaterials === "All" || item.materials === selectedMaterials;

      return matchesSearch && matchesType && matchesTime && matchesPreparation && matchesEnergy && matchesInteraction && matchesMaterials;
    });
  }, [searchQuery, selectedType, selectedTime, selectedPreparation, selectedEnergy, selectedInteraction, selectedMaterials]);

  const ITEMS_PER_PAGE = 9;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredWarmups.length / ITEMS_PER_PAGE));
  }, [filteredWarmups]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const warmupId = params.get("warmupId");
    if (warmupId) {
      const match = warmupsData.find(w => w.id.toString() === warmupId);
      if (match) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedWarmup(match);
      }
    }
  }, [location.search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedTime, selectedPreparation, selectedEnergy, selectedInteraction, selectedMaterials]);

  const paginatedWarmups = useMemo(() => {
    const activePage = Math.min(currentPage, totalPages);
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredWarmups.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredWarmups, currentPage, totalPages]);

  const resetFilters = () => {
    setSearchQuery("");
    handleTypeSelect("All");
    setSelectedTime("All");
    setSelectedPreparation("All");
    setSelectedEnergy("All");
    setSelectedInteraction("All");
    setSelectedMaterials("All");
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-1000 font-sans pb-24 pt-28 overflow-x-hidden relative" id="warmups-outer-container">
      
      {/* ── IMMERSIVE FOLD PANEL HERO (Designed exactly after e-commerce mockup reference) ── */}
      <div className="relative w-full bg-[#fef9c3] dark:bg-[#1f1d12] overflow-hidden border-b border-zinc-200/50 dark:border-zinc-900/50 shadow-md mb-16 select-none" id="hero-fold-mat">
        
        {/* Real technical cutting grid background overlay inside cutting mat */}
        <div 
          className="absolute inset-x-0 top-0 bottom-0 pointer-events-none opacity-[0.22] z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px"
          }}
        />

        {/* TOP LAYER: White Curl Page */}
        <div className="w-full bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-250/20 rounded-br-[140px] pb-24 pt-10 px-6 sm:px-12 md:px-16 lg:px-20 relative overflow-hidden transition-colors z-10 shadow-lg">
          
          {/* Authentic Page Curl Fold Bottom-Right Overlap Element */}
          <div className="absolute bottom-0 right-0 w-[140px] h-[140px] bg-gradient-to-tr from-zinc-200 via-zinc-250 to-white dark:from-zinc-805 dark:via-zinc-750 dark:to-zinc-850 rounded-tl-[140px] shadow-[-16px_-16px_32px_rgba(0,0,0,0.14),_0_15px_30px_rgba(0,0,0,0.12)] border-t border-l border-white/50 dark:border-zinc-700/30 transition-all pointer-events-none z-20" />

          {/* Inline header inside white page */}
          <div className="flex items-center justify-center pb-8 border-b border-zinc-150/80 dark:border-zinc-800/80 relative z-25">
            
            {/* Quick anchors which act as immediate type search triggers */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-zinc-100/60 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/80 backdrop-blur-md font-sans flex-wrap justify-center">
              {activityTypes.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    handleTypeSelect(type);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer ${
                    selectedType === type 
                      ? `${activeTheme.primaryBg} shadow-md border-transparent scale-[1.02]` 
                      : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {type === "All" ? "Overview" : type}
                </button>
              ))}
            </div>
          </div>

          {/* Central Hero Headline and minimal copywriter text layout */}
          <div className="w-full max-w-6xl mx-auto mt-20 mb-8 relative z-20">
            <AnimatePresence mode="popLayout">
              {selectedType === "All" ? (
                <motion.div 
                  key="hero-default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-white tracking-tight leading-[1.08] mb-6 font-sans">
                    Do you lead teaching for a complex classroom?
                  </h2>
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
                    Generate instant student attention same block by conducting the most thoughtful, customizable interactive warm-up activities on the planet.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key={`hero-${selectedType}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative"
                >
                  <h2 className="text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight mb-8">
                    {selectedType}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <div>
                      <h4 className="text-zinc-950 dark:text-white uppercase font-black text-[11px] tracking-widest mb-4">Description</h4>
                      <ul className="space-y-3">
                        {categoryDetails[selectedType]?.description?.map((point, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-2 shrink-0" />
                            <span className="opacity-90 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-zinc-950 dark:text-white uppercase font-black text-[11px] tracking-widest mb-4">Advantages</h4>
                      <ul className="space-y-3">
                        {categoryDetails[selectedType]?.advantages?.map((point, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="w-1 h-1 rounded-full bg-emerald-500/80 mt-2 shrink-0" />
                            <span className="opacity-90 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-zinc-950 dark:text-white uppercase font-black text-[11px] tracking-widest mb-4">Disadvantages</h4>
                      <ul className="space-y-3">
                        {categoryDetails[selectedType]?.disadvantages?.map((point, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="w-1 h-1 rounded-full bg-rose-500/80 mt-2 shrink-0" />
                            <span className="opacity-90 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-zinc-950 dark:text-white uppercase font-black text-[11px] tracking-widest mb-4">Usage</h4>
                      <ul className="space-y-3">
                        {categoryDetails[selectedType]?.usage?.map((point, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="w-1 h-1 rounded-full bg-blue-500/80 mt-2 shrink-0" />
                            <span className="opacity-90 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM EXPOSED LAYER: Warm yellow mat exposing beautiful physical scattered sticky notes */}
        <div className="relative px-6 sm:px-12 md:px-16 lg:px-20 py-16 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-12 overflow-hidden bg-[#fef08a] dark:bg-[#18160e] z-0 select-none">
          
          {/* Slashed metadata label over yellow board */}
          <div className="space-y-3 max-w-lg z-10 relative">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight font-sans">
              Engage them, trust them.
            </h3>
            <p className="text-zinc-700/80 dark:text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed font-sans">
              Inspire high school cohorts same minute. We convert traditional written material files into lightweight, responsive digital micro-game stages designed for high retention.
            </p>
          </div>

          {/* SCATTERED PHYSICAL STICKY NOTES OVER GRIDS */}
          <div className="flex flex-wrap items-center justify-center gap-6 xl:gap-8 shrink-0 z-10 relative w-full xl:w-auto">
            
            {/* Pink Coral Custom Sticky Note */}
            <div className="relative w-40 h-40 p-5 shadow-2xl rotate-[-4deg] hover:rotate-[-1deg] hover:scale-105 transition-all duration-300 border border-black/5 text-zinc-950 flex flex-col justify-between rounded-sm cursor-default" style={{ backgroundColor: "#ff7597" }}>
              {/* Overlay paperclip clip aesthetic link */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-6 bg-white/70 backdrop-blur-xs rounded shadow-sm flex items-center justify-center border border-zinc-200/20">
                <Paperclip size={10} className="text-zinc-650 shrink-0" />
              </div>

              <div className="font-mono text-[9px] font-black uppercase tracking-widest text-black/40">PEDAGOGY</div>
              
              <p className="font-sans text-xs font-black tracking-tight leading-normal uppercase text-black">
                This class
                <br />
                needs to be
                <br />
                engaged
                <br />
                ASAP!
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
              {/* Silver Clip */}
              <div className="absolute top-2 left-4 w-9 h-3.5 bg-zinc-300/40 rotate-[15deg] backdrop-blur-xs shadow-xs rounded-xs" />
              
              <div className="font-mono text-[9px] font-black uppercase tracking-widest text-black/40">SCHEDULING</div>

              <p className="font-sans text-xs font-black tracking-tight leading-normal uppercase text-black">
                Try Speed
                <br />
                Debating
                <br />
                this
                <br />
                Thursday!
              </p>

              <div className="font-mono text-[8px] font-bold text-black/50 tracking-wider">WARMEDIA // 02</div>
            </div>

          </div>

        </div>

      </div>

      {/* ── HIGH PERFORMANCE CARD FILTER AND CARD SYSTEM ── */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[95rem] mx-auto w-full">
        <div id="filters-grid-section" className="scroll-mt-28">
        
        {/* Streamlined Minimalist Filtering Strip */}
        <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-center justify-between mb-8 pb-6 border-b border-zinc-200/50 dark:border-zinc-900">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
            {/* Search Bar wrapper and container styled to match the layout switcher buttons */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative w-full bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl p-1 shadow-xs flex items-center">
                <div className="pl-2.5 pr-1 text-zinc-400 dark:text-zinc-500 flex items-center justify-center shrink-0">
                  <Search size={14} className="stroke-[2.2]" />
                </div>
                
                <input 
                  type="text"
                  placeholder="Search warm-ups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-1.5 pl-1.5 pr-8 bg-transparent border-none text-xs font-semibold focus:outline-none focus:ring-0 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
                />

                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 p-1 rounded-full text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40 flex items-center justify-center"
                  >
                    <X size={12} className="stroke-[2.2]" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Direct Indicators of active indicators */}
            {(selectedType !== "All" || selectedTime !== "All" || selectedPreparation !== "All" || selectedEnergy !== "All" || selectedInteraction !== "All" || selectedMaterials !== "All" || searchQuery !== "") && (
              <button 
                onClick={resetFilters} 
                className="text-[10px] uppercase font-mono tracking-widest font-black text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0 cursor-pointer self-start sm:self-auto py-2 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg animate-fade-in"
              >
                Reset active filters
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/80 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80">
              {[
                { id: "colorful", label: "Colorful", icon: Grid },
                { id: "minimalist", label: "Minimalist", icon: Grid },
                { id: "compact", label: "Compact List", icon: List },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  title={mode.label}
                  className={`p-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                    viewMode === mode.id
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-250/20 dark:border-zinc-700/50"
                      : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <mode.icon size={14} className="stroke-[2.2]" />
                </button>
              ))}
            </div>

            {/* Export trigger or Download button */}
            <button className={`flex items-center gap-2 px-4 py-2 ${activeTheme.primaryBg} rounded-xl text-xs font-extrabold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer`}>
              <Download size={13} />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>

        </div>

        {/* ── Advanced Filter Engine Accordion ── */}
        <div className="mb-10 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/80 bg-zinc-100/10 dark:bg-zinc-950/20 backdrop-blur-xl overflow-hidden transition-all duration-300">
          
          {/* Accordion Trigger Header */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between p-6 sm:p-8 cursor-pointer select-none text-left hover:bg-zinc-100/30 dark:hover:bg-zinc-900/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sliders size={15} className={`text-zinc-400 dark:text-zinc-500 transition-transform duration-300 ${showFilters ? "rotate-90 text-zinc-900 dark:text-white" : ""}`} />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-xs font-mono tracking-widest uppercase font-black text-zinc-700 dark:text-zinc-300">
                  Advanced Filter Engine
                </h3>
                <span className="text-[10px] text-zinc-455 dark:text-zinc-500 font-mono">
                  Fine-tune warmups by category, duration, pep level, and more
                </span>
              </div>

              {/* Active filters count badge */}
              {activeFiltersCount > 0 && (
                <div className={`ml-2 ${activeTheme.primaryBg} text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider`}>
                  {activeFiltersCount} Active
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-455 dark:text-zinc-500 sm:inline hidden">
                {showFilters ? "Collapse" : "Expand"}
              </span>
              <div className={`p-1.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/40 dark:border-zinc-800 transition-transform duration-350 ${showFilters ? "rotate-180" : ""}`}>
                <ChevronDown size={14} className="text-zinc-550 dark:text-zinc-400" />
              </div>
            </div>
          </button>

          {/* Accordion Content Body inside AnimatePresence */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="p-6 sm:p-8 pt-0 border-t border-zinc-200/30 dark:border-zinc-900/40">
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    
                    {/* Filter 1: Type */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 px-1">
                        <LayoutGrid size={13} className="text-zinc-400 dark:text-zinc-550" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-400 dark:text-zinc-500">Type</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activityTypes.map(type => (
                          <button
                            key={type}
                            onClick={() => handleTypeSelect(type)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border ${
                              selectedType === type
                                ? `${activeTheme.primaryBg} border-transparent shadow-md scale-[1.02]`
                                : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-805/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/80 dark:border-zinc-850/60 shadow-xs"
                            }`}
                          >
                            {type === "All" ? "All Types" : type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filter 2: Time */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 px-1">
                        <Timer size={13} className="text-zinc-400 dark:text-zinc-550" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-400 dark:text-zinc-500">Time</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["All", "5min", "7min", "10min"].map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border ${
                              selectedTime === time
                                ? `${activeTheme.primaryBg} border-transparent shadow-md scale-[1.02]`
                                : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-805/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/80 dark:border-zinc-850/60 shadow-xs"
                            }`}
                          >
                            {time === "All" ? "All Times" : time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filter 3: Preparation */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 px-1">
                        <Wrench size={13} className="text-zinc-400 dark:text-zinc-550" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-400 dark:text-zinc-500">Preparation</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["All", "none", "low", "high"].map(prep => (
                          <button
                            key={prep}
                            onClick={() => setSelectedPreparation(prep)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border ${
                              selectedPreparation === prep
                                ? `${activeTheme.primaryBg} border-transparent shadow-md scale-[1.02]`
                                : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-805/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/80 dark:border-zinc-850/60 shadow-xs"
                            }`}
                          >
                            {prep === "All" ? "All Prep" : prep}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filter 4: Energy */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 px-1">
                        <Flame size={13} className="text-zinc-400 dark:text-zinc-550" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-400 dark:text-zinc-500">Energy</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["All", "boosters", "calming", "building"].map(energy => (
                          <button
                            key={energy}
                            onClick={() => setSelectedEnergy(energy)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border ${
                              selectedEnergy === energy
                                ? `${activeTheme.primaryBg} border-transparent shadow-md scale-[1.02]`
                                : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-805/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/80 dark:border-zinc-850/60 shadow-xs"
                            }`}
                          >
                            {energy === "All" ? "All Energy" : energy}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filter 5: Interaction */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 px-1">
                        <Users size={13} className="text-zinc-400 dark:text-zinc-555" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-400 dark:text-zinc-500">Interaction</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["All", "individual", "pairs", "group", "whole class"].map(interact => (
                          <button
                            key={interact}
                            onClick={() => setSelectedInteraction(interact)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border ${
                              selectedInteraction === interact
                                ? `${activeTheme.primaryBg} border-transparent shadow-md scale-[1.02]`
                                : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-805/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/80 dark:border-zinc-850/60 shadow-xs"
                            }`}
                          >
                            {interact}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filter 6: Materials */}
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 px-1">
                        <Cpu size={13} className="text-zinc-400 dark:text-zinc-550" />
                        <span className="text-[10px] font-mono tracking-widest uppercase font-black text-zinc-400 dark:text-zinc-500">Materials</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["All", "Traditional", "ICT", "Objects"].map(material => (
                          <button
                            key={material}
                            onClick={() => setSelectedMaterials(material)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border ${
                              selectedMaterials === material
                                ? `${activeTheme.primaryBg} border-transparent shadow-md scale-[1.02]`
                                : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-800/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/80 dark:border-zinc-800/60 shadow-xs"
                            }`}
                          >
                            {material === "All" ? "All Materials" : material}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Dynamic Layout Grid and items ── */}
        <AnimatePresence mode="wait">
          {selectedWarmup ? (
            /* RENDER DETAILED VIEW CARD INLINE INSIDE CONTAINER */
            <motion.div
              key={`warmup-details-${selectedWarmup.id}`}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-zinc-50 dark:bg-zinc-950 backdrop-blur-3xl rounded-[2.5rem] border border-zinc-200/40 dark:border-zinc-800/80 shadow-2xl p-6 sm:p-10 md:p-12 text-left relative overflow-hidden mb-12 animate-once"
              id="selected-warmup-details-container"
            >
              {/* Header with return button */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200/50 dark:border-zinc-800/80">
                <button
                  onClick={() => {
                    setSelectedWarmup(null);
                    if (new URLSearchParams(window.location.search).has("warmupId")) {
                      navigate(location.pathname, { replace: true });
                    }
                    document.getElementById('filters-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase font-black text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <ArrowLeft size={14} className="stroke-[2.5]" />
                  Return To Warmups
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px]">
                
                {/* LEFT COLUMN (4/12 width): Title, objectives, custom sticky note tips */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:border-r lg:border-zinc-250/20 lg:dark:border-zinc-800/50 lg:pr-10">
                  
                  <div className="space-y-6">
                    {/* Category Label Tag */}
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-mono tracking-widest font-black uppercase ${selectedWarmup.tagColor}`}>
                        {selectedWarmup.activityType}
                      </span>
                    </div>

                    {/* Master Title Frame */}
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block mb-1">How it works</span>
                      <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 dark:text-white tracking-tight leading-tight uppercase font-sans">
                        {selectedWarmup.title}
                      </h2>
                    </div>

                    {/* Meta values strip details */}
                    <div className="pt-4 border-t border-zinc-200/20 dark:border-zinc-900/40 grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-400 dark:text-zinc-550 leading-relaxed font-bold">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-400/70 font-black">DURATION PRESET</span>
                        <span className="text-zinc-800 dark:text-zinc-300 transition-colors uppercase flex items-center gap-1 mt-0.5"><Clock size={11} /> {selectedWarmup.duration}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-400/70 font-black">INTERACTION FORMAT</span>
                        <span className="text-zinc-800 dark:text-zinc-300 transition-colors uppercase flex items-center gap-1 mt-0.5"><Users size={11} /> {selectedWarmup.interaction}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-400/70 font-black">PREPARATION STAGE</span>
                        <span className="text-zinc-800 dark:text-zinc-300 transition-colors uppercase flex items-center gap-1 mt-0.5"><Wrench size={11} /> {selectedWarmup.preparation} Prep</span>
                      </div>
                      {selectedWarmup.author && (
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-400/70 font-black">REPOSITORY FACILITATOR</span>
                          <span className="text-zinc-800 dark:text-zinc-300 transition-colors uppercase flex items-center gap-1 mt-0.5"><User size={11} /> {selectedWarmup.author.split(" ")[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Objective replacing sticky note */}
                  {selectedWarmup.description && (
                    <div className="bg-white/40 dark:bg-zinc-900/40 text-zinc-900 dark:text-zinc-200 border border-zinc-200/50 dark:border-zinc-800/80 p-5 rounded-2xl relative shadow-sm text-xs leading-relaxed font-semibold">
                      <div className="text-[9px] font-mono tracking-widest text-zinc-500 font-extrabold uppercase mb-2">Objectives</div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed pr-2 font-mono text-[11px]">
                        {selectedWarmup.description}
                      </p>
                    </div>
                  )}

                </div>

                {/* RIGHT COLUMN (8/12 width): Step cols side-by-side with dividers matching screenshot */}
                <div className="lg:col-span-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-200/60 dark:divide-zinc-800/60 overflow-x-auto pb-4 -mx-2 md:mx-0">
                  {selectedWarmup.instructions.map((step, idx) => {
                    const stepNum = idx + 1;
                    const totalSteps = selectedWarmup.instructions.length;
                    
                    return (
                      <div 
                        key={idx} 
                        className="flex-1 min-w-[220px] px-2 md:px-6 lg:px-8 py-6 md:py-0 first:pl-2 first:md:pl-0 last:pr-0 flex flex-col justify-between h-full group/step transition-all"
                      >
                        {/* Step title label */}
                        <div className="space-y-4">
                          <h5 className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                            STEP {stepNum}
                          </h5>
                          
                          <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-[13px] leading-relaxed font-semibold font-sans">
                            {step}
                          </p>
                        </div>

                        {/* Beautiful minimalist hand-drawn diagram container sketch below */}
                        <div className="mt-8 transition-transform duration-500 group-hover/step:scale-[1.02]">
                          <StepIllustration 
                            activityType={selectedWarmup.activityType} 
                            index={idx} 
                            total={totalSteps} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </motion.div>
          ) : filteredWarmups.length > 0 ? (
            <motion.div
              key={viewMode + "-" + filteredWarmups.length}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              
              {/* colorful Grid Style */}
              {viewMode === "colorful" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedWarmups.map((warmup) => {
                    return (
                      <motion.div
                        key={warmup.id}
                        layoutId={`warmup-card-${warmup.id}`}
                        onClick={() => setSelectedWarmup(warmup)}
                        whileHover={{ 
                          y: -6,
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="group relative p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/10 backdrop-blur-xl flex flex-col justify-between h-72 cursor-pointer transition-all duration-300 shadow-xs hover:border-zinc-350 dark:hover:border-zinc-700 hover:bg-white/60 dark:hover:bg-zinc-900/20 text-zinc-950 dark:text-zinc-50 overflow-hidden"
                        id={`warmup-colorful-${warmup.id}`}
                      >
                        <div className="z-10 relative">
                          {/* Title metadata badges */}
                          <div className="flex items-center justify-between mb-5">
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-305 ${warmup.tagColor}`}>
                              {warmup.activityType}
                            </span>
                            <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-300">
                              <Clock size={11} className="stroke-[2.2]" />
                              <span className="text-[10px] font-mono font-bold tracking-tight">{warmup.duration}</span>
                            </div>
                          </div>

                          {/* Title content */}
                          <h3 className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2 uppercase group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-300">
                            {warmup.title}
                          </h3>

                          {/* Description clamp */}
                          <p className="text-[11px] leading-relaxed text-zinc-550 dark:text-zinc-450 group-hover:text-zinc-750 dark:group-hover:text-zinc-200 transition-colors duration-300 line-clamp-3 font-semibold pr-2">
                            {warmup.description}
                          </p>
                        </div>

                        {/* Beautiful Backdrop Blur Footer aligned to custom glass model */}
                        <div className="flex items-center justify-between px-6 py-4 -mx-6 -mb-6 mt-auto z-10 relative bg-zinc-50/75 dark:bg-zinc-950/45 backdrop-blur-sm border-t border-zinc-200/50 dark:border-zinc-800/80 rounded-b-2xl transition-all duration-300 group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-950/70">
                          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white group-hover:translate-x-1 duration-300 transition-all">
                            <ArrowRight size={13} className="stroke-[2.2]" />
                          </div>
                          
                          <div className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white tracking-widest transition-colors duration-300">
                            {warmup.preparation} Prep • {warmup.interaction}
                          </div>
                        </div>

                        {/* Clean geometric shapes outline overlaying inside background */}
                        <GeometricShapes id={warmup.id} />
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* minimalist Grid Style */}
              {viewMode === "minimalist" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedWarmups.map((warmup) => {
                    return (
                      <motion.div
                        key={warmup.id}
                        layoutId={`warmup-card-${warmup.id}`}
                        onClick={() => setSelectedWarmup(warmup)}
                        whileHover={{ y: -4 }}
                        className="group p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/10 backdrop-blur-md flex flex-col justify-between h-64 cursor-pointer hover:border-zinc-350 dark:hover:border-zinc-700 hover:bg-white/60 dark:hover:bg-zinc-900/20 transition-all duration-300 relative overflow-hidden"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                              {warmup.activityType}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 font-mono">{warmup.duration}</span>
                          </div>

                          <h3 className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2 uppercase group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-300">
                            {warmup.title}
                          </h3>

                          <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-450 line-clamp-3 font-semibold">
                            {warmup.description}
                          </p>
                        </div>

                        {/* Premium backdrop-blurred Glass Footer */}
                        <div className="flex items-center justify-between px-6 py-4 -mx-6 -mb-6 mt-auto z-10 relative bg-zinc-50/75 dark:bg-zinc-950/45 backdrop-blur-sm border-t border-zinc-200/50 dark:border-zinc-800/80 rounded-b-2xl transition-all duration-300 group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-950/70">
                          <span className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Educator // {warmup.author.split(" ")[0]}</span>
                          
                          <span className="text-[9px] font-mono font-bold text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1">
                            Open <ChevronRight size={11} className="stroke-[2.5]" />
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

                 {/* compact List Style (Accordion style with larger card gaps & sticky note drops) */}
              {viewMode === "compact" && (
                <div className="flex flex-col gap-6 text-left" id="compact-view-list">
                  {paginatedWarmups.map((warmup) => {
                    const isExpanded = expandedId === warmup.id;
                    const preset = stickyNotePresets[warmup.activityType] || {
                      bg: "bg-zinc-100/10 dark:bg-zinc-950/10",
                      border: "border-zinc-200/35 dark:border-zinc-800/20",
                      text: "text-zinc-900 dark:text-zinc-400",
                      dot: "bg-zinc-400 dark:bg-zinc-500",
                      hoverBg: "hover:bg-zinc-150/20 dark:hover:bg-zinc-900/15"
                    };

                    return (
                      <div
                        key={warmup.id}
                        className={`flex flex-col relative overflow-hidden border backdrop-blur-xl rounded-[1.5rem] shadow-xs transition-all duration-300 ${
                          isExpanded 
                            ? `${preset.bg} ${preset.border} shadow-sm` 
                            : "bg-white/30 dark:bg-zinc-900/10 border-zinc-200/50 dark:border-zinc-800/80 hover:bg-zinc-100/30 dark:hover:bg-zinc-805/20"
                        } group`}
                      >
                        {/* Accordion Row Header */}
                        <div
                          onClick={() => setExpandedId(isExpanded ? null : warmup.id)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 cursor-pointer select-none"
                        >
                          <div className="flex-1 min-w-0 pr-6">
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-wide font-black uppercase ${warmup.tagColor}`}>
                                {warmup.activityType}
                              </span>
                              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 font-mono">{warmup.duration}</span>
                            </div>
                            
                            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white mb-0.5 uppercase">
                              {warmup.title}
                            </h4>

                            {!isExpanded && (
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-450 font-semibold truncate max-w-xl">
                                {warmup.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-6 mt-3 sm:mt-0 shrink-0">
                            <div className="flex flex-col items-start sm:items-end text-[9px] font-mono">
                              <span className="text-zinc-400">INTERACTION</span>
                              <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase">{warmup.interaction}</span>
                            </div>
                            
                            <div className="flex flex-col items-start sm:items-end text-[9px] font-mono">
                              <span className="text-zinc-400">MATERIALS</span>
                              <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase">{warmup.materials}</span>
                            </div>

                            <div className="p-1.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/30 dark:border-zinc-805/65 text-zinc-450 dark:text-zinc-500 group-hover:bg-zinc-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-950 transition-all duration-300 flex items-center justify-center shrink-0">
                              <ChevronDown size={14} className={`stroke-[2.2] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                            </div>
                          </div>
                        </div>

                        {/* Accordion Collapsible Body */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-50/10 dark:bg-zinc-950/25 backdrop-blur-md">
                                <div className="lg:col-span-4 space-y-4">
                                  <div>
                                    <span className="text-[9px] font-mono font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Objective</span>
                                    <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-semibold mt-1 bg-white/30 dark:bg-zinc-950/20 p-3.5 rounded-xl border border-zinc-200/30 dark:border-zinc-950/20 shadow-3xs">
                                      {warmup.description}
                                    </p>
                                  </div>
                                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono space-y-1 bg-zinc-150/10 dark:bg-zinc-950/30 p-3.5 rounded-xl border border-zinc-200/20 dark:border-zinc-950/20">
                                    <div className="flex justify-between">
                                      <span>EDUCATION LEVEL:</span>
                                      <span className="font-bold text-zinc-700 dark:text-zinc-350">{warmup.engagementLevel || "High"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>PREPARATION TYPE:</span>
                                      <span className="font-bold text-zinc-700 dark:text-zinc-350">{warmup.preparation} Prep</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>FACILITATOR AUTHOR:</span>
                                      <span className="font-bold text-zinc-700 dark:text-zinc-350">{warmup.author}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="lg:col-span-8 flex flex-col justify-between">
                                  <div className="space-y-3">
                                    <span className="text-[9px] font-mono font-black uppercase text-zinc-450 dark:text-zinc-550 tracking-wider">Tactical execution blueprint</span>
                                    <div className="grid grid-cols-1 gap-3 mt-1">
                                      {warmup.instructions.map((step, idx) => (
                                        <div 
                                          key={idx} 
                                          className="bg-white/45 dark:bg-zinc-900/15 backdrop-blur-md rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 p-3.5 shadow-3xs flex gap-3.5 items-start hover:border-zinc-350 dark:hover:border-zinc-800 transition-all duration-300"
                                        >
                                          <span className={`w-5.5 h-5.5 rounded-lg shrink-0 flex items-center justify-center text-[9px] font-mono font-black ${activeTheme.primaryBg}`}>
                                            {idx + 1}
                                          </span>
                                          <div className="flex-1">
                                            <span className="text-[8px] font-mono font-bold text-zinc-400 dark:text-zinc-500 block mb-0.5">STEP {idx + 1}</span>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs font-semibold">
                                              {step}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex justify-end mt-4 gap-2 pt-4 border-t border-zinc-200/10 dark:border-zinc-900/40">
                                    <button
                                      onClick={() => setSelectedWarmup(warmup)}
                                      className={`flex items-center gap-1.5 px-4 py-1.5 ${activeTheme.primaryBg} text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs`}
                                    >
                                      <span>Open immersive view</span>
                                      <PlayCircle size={12} className="stroke-[2.2]" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Wide Minimalist Pagination System */}
              {totalPages > 1 && (
                <div className="mt-12 w-full" id="pagination-wrapper-card">
                  <div className="flex w-full items-center justify-between px-6 py-4 sm:px-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-3xl" id="pagination-controls-bar">
                    <button
                       onClick={() => {
                         if (currentPage > 1) {
                           setCurrentPage(prev => prev - 1);
                           setTimeout(() => {
                             document.getElementById('filters-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                           }, 50);
                         }
                       }}
                       disabled={currentPage === 1}
                       className={`px-4 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5 justify-center cursor-pointer ${
                         currentPage === 1
                           ? "bg-zinc-100/35 dark:bg-zinc-900/30 border-zinc-200/30 dark:border-zinc-800/40 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-40"
                           : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-800/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/50 dark:border-zinc-800/80 active:scale-95"
                       }`}
                       title="Previous Page"
                       id="pagination-prev-btn"
                    >
                      <ChevronLeft size={14} className="stroke-[2.5]" />
                      <span className="text-[10px] font-black uppercase tracking-wider">Previous</span>
                    </button>

                    <div className="flex items-center gap-1.5 px-1" id="pagination-pages-nums">
                      {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => {
                              setCurrentPage(pageNumber);
                              setTimeout(() => {
                                document.getElementById('filters-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                              }, 50);
                            }}
                            className={`w-8 h-8 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer border flex items-center justify-center ${
                              currentPage === pageNumber
                                ? `${activeTheme.primaryBg} border-transparent scale-[1.02]`
                                : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-800/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/50 dark:border-zinc-800/80"
                            }`}
                            id={`pagination-page-${pageNumber}`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(prev => prev + 1);
                          setTimeout(() => {
                            document.getElementById('filters-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                          }, 50);
                        }
                      }}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5 justify-center cursor-pointer ${
                        currentPage === totalPages
                          ? "bg-zinc-100/35 dark:bg-zinc-900/30 border-zinc-200/30 dark:border-zinc-800/40 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-40"
                          : "bg-white/60 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-800/60 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-200/50 dark:border-zinc-800/80 active:scale-95"
                      }`}
                      title="Next Page"
                      id="pagination-next-btn"
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider">Next</span>
                      <ChevronRight size={14} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          ) : (
            /* Empty Search States */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md border border-dashed border-zinc-200 dark:border-zinc-900 rounded-[2rem]"
            >
              <RefreshCw className="mx-auto text-zinc-400 animate-spin mb-4 stroke-[1.8]" size={28} />
              
              <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1">
                No Warm-Ups resolved
              </h3>

              <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-6 max-w-sm mx-auto font-semibold">
                We couldn't resolve any active items matching those search parameters on this layout. Try resetting your criteria configuration.
              </p>

              <button 
                onClick={resetFilters}
                className={`px-6 py-2.5 ${activeTheme.primaryBg} text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-all cursor-pointer shadow-md`}
              >
                Reset active search filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        </div>

        {/* Minimalist divider line with technical accent label */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-250 dark:via-zinc-800 to-transparent my-24 relative" id="laboratory-divider">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-50 dark:bg-zinc-950 px-6 py-1 text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-bold transition-colors duration-1000">
            Atmosphere Laboratory
          </div>
        </div>

        {/* Elegant Laboratory Interactive Core Section */}
        <div className="w-full flex flex-col lg:flex-row gap-12 items-stretch justify-between mb-8" id="laboratory-section">
          {/* Left: Section Header with bold, clean typography and minimal info-graphic */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="text-zinc-650 dark:text-zinc-400 animate-pulse" size={15} />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  SYSTEMIC SYNERGY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white uppercase leading-none font-sans">
                ENGAGEMENT <br />FORMULAS
              </h2>
              <p className="text-zinc-500 dark:text-zinc-455 text-xs leading-relaxed font-semibold font-sans">
                Interactive blueprint matrices for tuning classroom focus. Choose a catalyst mode below to calibrate tactile and cognitive activity.
              </p>
            </div>

            {/* Elegant selection buttons in shades of Zinc with backdrop filters */}
            <div className="flex flex-col gap-2.5 w-full font-mono">
              {Object.entries(formulaData).map(([key, item]) => {
                const isActive = activeFormulaId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFormulaId(key)}
                    className={`w-full text-left p-4 rounded-2xl border backdrop-blur-xl transition-all duration-350 cursor-pointer text-xs flex items-center justify-between ${
                      isActive
                        ? "bg-zinc-950 dark:bg-zinc-100 border-transparent text-white dark:text-zinc-955 shadow-md font-bold scale-[1.015]"
                        : "bg-white/40 dark:bg-zinc-900/10 border-zinc-200/50 dark:border-zinc-800/40 text-zinc-505 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                    id={`catalyst-btn-${key}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-white dark:bg-zinc-950 scale-125" : "bg-zinc-450 dark:bg-zinc-600"}`} />
                      <span className="uppercase tracking-widest text-[9px] font-black">{item.title}</span>
                    </div>
                    <ArrowRight size={13} className={`transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Formula Engine with backdrop filters + status cards */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Card 1: Synergy Metric Bars with elegant backdrop blur */}
            <div className="p-8 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-805/40 bg-white/40 dark:bg-zinc-900/10 backdrop-blur-xl hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/20 transition-all duration-500 flex flex-col justify-between min-h-[290px]" id="metric-bars-panel">
              <div className="space-y-5 w-full">
                <div className="flex justify-between items-center border-b border-zinc-200/40 dark:border-zinc-800/60 pb-3">
                  <span className="text-[9px] font-mono tracking-widest font-black uppercase text-zinc-400 dark:text-zinc-500">
                    ATMOSPHERE INDEX
                  </span>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-550">
                    {formulaData[activeFormulaId].spark}
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Metric 1 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                      <span>{formulaData[activeFormulaId].metric1}</span>
                      <span className="text-zinc-900 dark:text-white font-black">{formulaData[activeFormulaId].val1}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200/40 dark:bg-zinc-900/60 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${formulaData[activeFormulaId].val1}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                      <span>{formulaData[activeFormulaId].metric2}</span>
                      <span className="text-zinc-900 dark:text-white font-black">{formulaData[activeFormulaId].val2}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200/40 dark:bg-zinc-900/60 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${formulaData[activeFormulaId].val2}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                      <span>{formulaData[activeFormulaId].metric3}</span>
                      <span className="text-zinc-900 dark:text-white font-black">{formulaData[activeFormulaId].val3}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200/40 dark:bg-zinc-900/60 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${formulaData[activeFormulaId].val3}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[8px] font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase font-black pt-4 border-t border-zinc-200/20 dark:border-zinc-800/40 mt-6">
                Active Synthesis Metrics
              </div>
            </div>

            {/* Card 2: Blueprint Details with elegant backdrop blur */}
            <div className="p-8 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-805/40 bg-zinc-100/10 dark:bg-zinc-905/10 backdrop-blur-xl hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/20 dark:hover:bg-zinc-900/15 transition-all duration-500 flex flex-col justify-between min-h-[290px]" id="blueprint-details-panel">
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-zinc-200/40 dark:border-zinc-800/60 pb-3">
                  <span className="text-[9px] font-mono tracking-widest font-black uppercase text-zinc-400 dark:text-zinc-500">
                    TACTICAL BLUEPRINT
                  </span>
                  <div className="p-2 rounded-2xl bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-650 dark:text-zinc-350 shadow-sm">
                    <Wrench size={14} className="stroke-[2]" />
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <h4 className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-black tracking-widest">
                    OPERATIONAL PROTOCOL
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-[13px] leading-relaxed font-semibold font-sans">
                    {formulaData[activeFormulaId].blueprint}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-zinc-205/15 dark:border-zinc-800/40 mt-6">
                <div className="w-5.5 h-5.5 rounded-full bg-zinc-950/10 dark:bg-white/10 flex items-center justify-center border border-zinc-250/20 dark:border-zinc-750/35">
                  <Flame size={11} className="text-zinc-600 dark:text-zinc-300" />
                </div>
                <span className="text-[8px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-black">
                  Warmedia Pedagogical Engine
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default WarmupsPage;
