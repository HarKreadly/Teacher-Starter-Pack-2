import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const DispersionCursor = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  
  const wavesRef = useRef([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isLoopActiveRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId = null;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.imageSmoothingEnabled = true;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const getWaveColor = (alpha) => {
      const isDark = document.documentElement.classList.contains("dark") || theme === "dark";
      if (isDark) {
        // Subtle white/zinc wave for dark theme
        return `rgba(244, 244, 245, ${alpha})`;
      } else {
        // Deep zinc/charcoal wave for light theme
        return `rgba(39, 39, 42, ${alpha})`;
      }
    };

    const updateAndDraw = () => {
      if (wavesRef.current.length === 0) {
        isLoopActiveRef.current = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const now = performance.now();

      wavesRef.current = wavesRef.current.filter((wave) => {
        const elapsed = now - wave.born;
        if (elapsed < wave.delay) {
          return true;
        }

        const activeTime = elapsed - wave.delay;
        if (activeTime >= wave.duration) {
          return false;
        }

        const progress = activeTime / wave.duration; 
        const ease = 1 - Math.pow(1 - progress, 3); // smooth cubic ease-out
        
        const currentRadius = wave.startRadius + (wave.maxRadius - wave.startRadius) * ease;
        const currentOpacity = wave.startOpacity * (1 - progress);

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, currentRadius, 0, Math.PI * 2);
        ctx.lineWidth = wave.lineWidth * (1 - progress * 0.4);
        ctx.strokeStyle = getWaveColor(currentOpacity);
        ctx.stroke();

        return true;
      });

      ctx.restore();

      if (wavesRef.current.length > 0) {
        animationFrameId = requestAnimationFrame(updateAndDraw);
      } else {
        isLoopActiveRef.current = false;
      }
    };

    const startAnimationLoop = () => {
      if (!isLoopActiveRef.current) {
        isLoopActiveRef.current = true;
        animationFrameId = requestAnimationFrame(updateAndDraw);
      }
    };

    const createWave = (x, y, options = {}) => {
      const now = performance.now();
      wavesRef.current.push({
        x,
        y,
        born: now,
        delay: options.delay || 0,
        duration: options.duration || 600,
        startRadius: options.startRadius || 4,
        maxRadius: options.maxRadius || 40,
        startOpacity: options.startOpacity || 0.12,
        lineWidth: options.lineWidth || 1,
      });
      startAnimationLoop();
    };

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const lastPos = lastPosRef.current;
      const dist = Math.hypot(x - lastPos.x, y - lastPos.y);

      if (dist > 20) {
        createWave(x, y, {
          duration: 450,
          startRadius: 2,
          maxRadius: 24,
          startOpacity: 0.08,
          lineWidth: 1.0,
        });
        lastPosRef.current = { x, y };
      }
    };

    const handleClick = (e) => {
      const { clientX: x, clientY: y } = e;
      
      createWave(x, y, {
        delay: 0,
        duration: 700,
        startRadius: 5,
        maxRadius: 85,
        startOpacity: 0.35,
        lineWidth: 1.8,
      });
      createWave(x, y, {
        delay: 80,
        duration: 650,
        startRadius: 3,
        maxRadius: 65,
        startOpacity: 0.25,
        lineWidth: 1.4,
      });
      createWave(x, y, {
        delay: 160,
        duration: 600,
        startRadius: 1,
        maxRadius: 45,
        startOpacity: 0.15,
        lineWidth: 1.0,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile, theme]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default DispersionCursor;
