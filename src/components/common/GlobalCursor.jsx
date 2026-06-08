import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSettings } from "../../context/SettingsContext";

const GlobalCursor = () => {
  const { cursorEnabled } = useSettings();
  const [isMobile, setIsMobile] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest(".cursor-pointer") ||
          (target.style && target.style.cursor === "pointer"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    if (!isMobile && cursorEnabled) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [isMobile, cursorEnabled, mouseX, mouseY]);

  if (isMobile || !cursorEnabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none mix-blend-difference z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full bg-white opacity-40 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        animate={{
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 250,
        }}
      />
      
      {/* Small Core Dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className={`w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${isHovered ? "scale-150 opacity-95" : "scale-100 opacity-80"}`} />
      </div>
    </motion.div>
  );
};

export default GlobalCursor;
