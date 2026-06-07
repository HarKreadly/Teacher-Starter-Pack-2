import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sun, Moon, Settings, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import LanguageSelector from "../common/LanguageSelector";
import MenuModal from "./MenuModal";
import SettingsModal from "./SettingsModal";
import { useSettings } from "../../context/SettingsContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

/* Renders dropdown via portal so no transform ancestor breaks backdrop-blur */
const DropdownPortal = ({ anchorRef, anchorKey, open, onMouseEnter, onMouseLeave, children }) => {
  const [coords, setCoords] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open || !anchorRef || !anchorRef.current) return;
    const element = anchorRef.current[anchorKey];
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 24, // 24px gap between navbar and dropdown
      left: rect.left + rect.width / 2,
    });
  }, [open, anchorRef, anchorKey]);

  useEffect(() => {
    if (coords && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        const offset = rect.right - window.innerWidth + 20; // 20px padding from edge
        containerRef.current.style.transform = `translateX(calc(-50% - ${offset}px))`;
      } else if (rect.left < 0) {
        const offset = -rect.left + 20;
        containerRef.current.style.transform = `translateX(calc(-50% + ${offset}px))`;
      } else {
        containerRef.current.style.transform = "translateX(-50%)";
      }
    }
  }, [coords]);

  if (!open || !coords) return null;

  return createPortal(
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
};

/* Right-aligned portal dropdown (for the right dock) */
const DropdownPortalRight = ({ anchorRef, open, onMouseEnter, onMouseLeave, children }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 24,
      right: window.innerWidth - rect.right,
    });
  }, [open, anchorRef]);

  if (!open || !coords) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: coords.top,
        right: coords.right,
        zIndex: 9999,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
};

const dropdownClass =
  "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl backdrop-saturate-150 " +
  "border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-4 shadow-2xl pointer-events-auto";

const DropdownItems = ({ items }) => {
  const isGrid = items.length > 4;
  return (
    <div className={`grid gap-1.5 ${isGrid ? 'grid-cols-2 w-max max-w-[90vw] sm:w-[500px]' : 'grid-cols-1 w-[280px]'}`}>
      {items.map((dropItem, idx) => (
        <Link
          key={idx}
          to={dropItem.link}
          className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-all duration-200 group/item"
        >
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-[13px] text-left group-hover/item:text-zinc-950 dark:group-hover/item:text-white transition-colors">
            {dropItem.title}
          </span>
          <span className="text-zinc-400 dark:text-zinc-500 font-normal text-[11px] text-left mt-0.5 leading-normal">
            {dropItem.desc}
          </span>
        </Link>
      ))}
    </div>
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { activeTheme } = useSettings();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeRightDropdown, setActiveRightDropdown] = useState(false);

  const leftTimeoutRef = useRef(null);
  const rightTimeoutRef = useRef(null);

  const handleLeftMouseEnter = (itemName, hasDropdown) => {
    if (leftTimeoutRef.current) clearTimeout(leftTimeoutRef.current);
    setHoveredTab(itemName);
    if (hasDropdown) setActiveDropdown(itemName);
  };

  const handleLeftMouseLeave = () => {
    setHoveredTab(null);
    leftTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 500);
  };

  const handleRightMouseLeave = () => {
    rightTimeoutRef.current = setTimeout(() => {
      setActiveRightDropdown(false);
    }, 500);
  };

  const handleRightMouseEnter = (activeItem) => {
    if (rightTimeoutRef.current) clearTimeout(rightTimeoutRef.current);
    if (activeItem && activeItem.dropdown) setActiveRightDropdown(true);
  };

  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  const rightBadgeRef = useRef(null);
  const itemRefs = useRef({});
  const location = useLocation();

  const navItems = [
    { name: "Home", link: "/" },
    {
      name: "Warmups",
      link: "/warm-ups",
      dropdown: [
        { title: "Discussion", desc: "Engaging topics & questions", link: "/warm-ups/discussion" },
        { title: "TPR", desc: "Total Physical Response", link: "/warm-ups/tpr" },
        { title: "Puzzles", desc: "Riddles & logic challenges", link: "/warm-ups/puzzles" },
        { title: "Ice Breakers", desc: "Start the class with energy", link: "/warm-ups/icebreakers" },
        { title: "BrainStorming", desc: "Creative idea generation", link: "/warm-ups/brainstorming" },
        { title: "Games", desc: "Interactive language games", link: "/warm-ups/games" },
      ],
    },
    {
      name: "Materials",
      link: "/materials",
      dropdown: [
        { title: "Printables", desc: "Worksheets and handouts", link: "/materials/printables" },
        { title: "Presentations", desc: "Slide decks for lessons", link: "/materials/presentations" },
        { title: "Audio/Video", desc: "Media for listening practice", link: "/materials/media" },
        { title: "Flashcards", desc: "Visual aids for vocabulary", link: "/materials/flashcards" },
      ],
    },
    {
      name: "Exercises",
      link: "/exercises",
      dropdown: [
        { title: "Reading", desc: "Comprehension passages", link: "/exercises/reading" },
        { title: "Writing", desc: "Essay prompts and guides", link: "/exercises/writing" },
        { title: "Speaking", desc: "Conversation topics", link: "/exercises/speaking" },
        { title: "Listening", desc: "Audio tests and quizzes", link: "/exercises/listening" },
      ],
    },
    { name: "Assessments", link: "/assessments" },
    { name: "Contact", link: "/contact" },
  ];

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === "/" || path === "") return navItems.find(i => i.name === "Home");
    if (path.startsWith("/warm-ups") || path.startsWith("/warmups")) return navItems.find(i => i.name === "Warmups");
    if (path.startsWith("/materials")) return navItems.find(i => i.name === "Materials");
    if (path.startsWith("/exercises")) return navItems.find(i => i.name === "Exercises");
    if (path.startsWith("/assessments")) return navItems.find(i => i.name === "Assessments");
    if (path.startsWith("/contact")) return navItems.find(i => i.name === "Contact");
    return navItems.find(i => i.name === "Home");
  };

  const activeItem = getActiveItem() || navItems[0];

  useGSAP(() => {
    gsap.fromTo(leftNavRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.3, ease: "power4.out", delay: 0.1 }
    );
    gsap.fromTo(rightNavRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.3, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 flex justify-between items-center pointer-events-none gap-4">

        {/* LEFT DOCK */}
        <motion.div
          ref={leftNavRef}
          className="pointer-events-auto flex items-center gap-4 px-4 md:px-5 py-2.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] text-sm transition-colors duration-300"
          onMouseLeave={handleLeftMouseLeave}
        >
          <button
            onClick={() => setIsMenuModalOpen(true)}
            className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-955 dark:hover:text-white bg-zinc-100/50 dark:bg-zinc-900/40 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>

          <div className="hidden lg:block h-5 w-px bg-zinc-200 dark:bg-zinc-800/80 shrink-0" />

          <div className="hidden lg:flex items-center gap-1 font-sans text-[13px] font-medium tracking-wide">
            {navItems.map((item) => {
              const hasDropdown = !!item.dropdown;
              const isDropdownOpen = activeDropdown === item.name;
              const isActive = activeItem?.name === item.name;

              return (
                <Link
                  key={item.name}
                  to={item.link}
                  ref={el => { itemRefs.current[item.name] = el; }}
                  className={`relative py-1.5 px-3.5 cursor-pointer shrink-0 rounded-full transition-all duration-300 border flex items-center gap-1.5 ${
                    isActive
                      ? "bg-zinc-100/80 dark:bg-zinc-800/45 text-zinc-950 dark:text-zinc-50 border-zinc-200/50 dark:border-zinc-700/25 font-bold shadow-xs scale-[1.02]"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 border-transparent"
                  }`}
                  onMouseEnter={() => handleLeftMouseEnter(item.name, hasDropdown)}
                >
                  <span>{item.name}</span>
                  {hasDropdown && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500"}`}
                    />
                  )}

                  {hoveredTab === item.name && !isActive && (
                    <motion.span
                      layoutId="navbar-hover-indicator"
                      className="absolute inset-0 bg-zinc-100/50 dark:bg-white/5 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* Dropdown via portal — no transform ancestor, backdrop-blur works */}
                  <AnimatePresence>
                    {hasDropdown && isDropdownOpen && (
                      <DropdownPortal
                        anchorRef={itemRefs}
                        anchorKey={item.name}
                        open={isDropdownOpen}
                        onMouseEnter={() => handleLeftMouseEnter(item.name, true)}
                        onMouseLeave={handleLeftMouseLeave}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className={dropdownClass}
                        >
                          <DropdownItems items={item.dropdown} />
                        </motion.div>
                      </DropdownPortal>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800/80 mx-2 shrink-0" />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-955 dark:hover:text-white bg-zinc-100/50 dark:bg-zinc-900/40 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <LanguageSelector />
            </div>
          </div>
        </motion.div>

        {/* RIGHT DOCK */}
        <motion.div
          ref={rightNavRef}
          className="pointer-events-auto flex items-center gap-2.5 px-4 md:px-5 py-2.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] text-sm transition-colors duration-300 relative shrink-0"
          onMouseLeave={handleRightMouseLeave}
        >
          <Link
            to={activeItem.link}
            ref={rightBadgeRef}
            className={`relative px-3 py-1.5 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors duration-300 border ${activeTheme.primaryBg} border-transparent`}
            onMouseEnter={() => handleRightMouseEnter(activeItem)}
          >
            <span>{activeItem.name}</span>
            {activeItem && activeItem.dropdown && (
              <ChevronDown
                size={11}
                className={`transition-transform duration-300 ${activeRightDropdown ? "rotate-180" : ""}`}
              />
            )}
          </Link>

          {/* Right dock dropdown via portal */}
          <AnimatePresence>
            {activeItem && activeItem.dropdown && activeRightDropdown && (
              <DropdownPortalRight
                anchorRef={rightBadgeRef}
                open={activeRightDropdown}
                onMouseEnter={() => handleRightMouseEnter(activeItem)}
                onMouseLeave={handleRightMouseLeave}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className={`${dropdownClass} normal-case tracking-normal font-sans`}
                >
                  <DropdownItems items={activeItem.dropdown} />
                </motion.div>
              </DropdownPortalRight>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-955 dark:hover:text-white bg-zinc-100/50 dark:bg-zinc-900/40 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70 transition-all duration-300 hover:scale-105 cursor-pointer group flex items-center justify-center"
            aria-label="Settings"
          >
            <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </motion.div>

      </div>

      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </>
  );
};

export default Navbar;