/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

export const THEMES = {
  zinc: {
    id: "zinc",
    name: "Zinc",
    color: "#71717a",
    primaryBg: "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
    primaryText: "text-zinc-950 dark:text-white",
    hoverBg: "hover:bg-zinc-900 dark:hover:bg-zinc-100",
    border: "border-zinc-950 dark:border-white",
    accentBorder: "border-zinc-950 dark:border-white",
    textHover: "hover:text-zinc-950 dark:hover:text-white",
    fill: "fill-zinc-950 dark:fill-white",
    stroke: "stroke-zinc-950 dark:stroke-white",
    tag: "bg-zinc-105 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
    shadow: "shadow-zinc-950/10",
    bulletBg: "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950",
  },
  blossom: {
    id: "blossom",
    name: "Blossom",
    color: "#fbcfe8",
    primaryBg: "bg-pink-200 hover:bg-pink-300 text-pink-900 dark:bg-pink-300 dark:hover:bg-pink-400 dark:text-pink-950",
    primaryText: "text-pink-600 dark:text-pink-300",
    hoverBg: "hover:bg-pink-300 dark:hover:bg-pink-400",
    border: "border-pink-300 dark:border-pink-400",
    accentBorder: "border-pink-300 dark:border-pink-400",
    textHover: "hover:text-pink-600 dark:hover:text-pink-300",
    fill: "fill-pink-400 dark:fill-pink-300",
    stroke: "stroke-pink-400 dark:stroke-pink-300",
    tag: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200",
    shadow: "shadow-pink-300/20",
    bulletBg: "bg-pink-300 text-pink-950 dark:bg-pink-400 dark:text-pink-950",
  },
  mint: {
    id: "mint",
    name: "Mint",
    color: "#bbf7d0",
    primaryBg: "bg-green-200 hover:bg-green-300 text-green-900 dark:bg-green-300 dark:hover:bg-green-400 dark:text-green-950",
    primaryText: "text-green-600 dark:text-green-300",
    hoverBg: "hover:bg-green-300 dark:hover:bg-green-400",
    border: "border-green-300 dark:border-green-400",
    accentBorder: "border-green-300 dark:border-green-400",
    textHover: "hover:text-green-600 dark:hover:text-green-300",
    fill: "fill-green-400 dark:fill-green-300",
    stroke: "stroke-green-400 dark:stroke-green-300",
    tag: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
    shadow: "shadow-green-300/20",
    bulletBg: "bg-green-300 text-green-950 dark:bg-green-400 dark:text-green-950",
  },
  buttercup: {
    id: "buttercup",
    name: "Buttercup",
    color: "#fef08a",
    primaryBg: "bg-yellow-200 hover:bg-yellow-300 text-yellow-900 dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:text-yellow-950",
    primaryText: "text-yellow-600 dark:text-yellow-300",
    hoverBg: "hover:bg-yellow-300 dark:hover:bg-yellow-400",
    border: "border-yellow-300 dark:border-yellow-400",
    accentBorder: "border-yellow-300 dark:border-yellow-400",
    textHover: "hover:text-yellow-600 dark:hover:text-yellow-300",
    fill: "fill-yellow-400 dark:fill-yellow-300",
    stroke: "stroke-yellow-400 dark:stroke-yellow-300",
    tag: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
    shadow: "shadow-yellow-300/20",
    bulletBg: "bg-yellow-300 text-yellow-950 dark:bg-yellow-400 dark:text-yellow-950",
  },
  cloud: {
    id: "cloud",
    name: "Cloud",
    color: "#bfdbfe",
    primaryBg: "bg-blue-200 hover:bg-blue-300 text-blue-900 dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-blue-950",
    primaryText: "text-blue-600 dark:text-blue-300",
    hoverBg: "hover:bg-blue-300 dark:hover:bg-blue-400",
    border: "border-blue-300 dark:border-blue-400",
    accentBorder: "border-blue-300 dark:border-blue-400",
    textHover: "hover:text-blue-600 dark:hover:text-blue-300",
    fill: "fill-blue-400 dark:fill-blue-300",
    stroke: "stroke-blue-400 dark:stroke-blue-300",
    tag: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    shadow: "shadow-blue-300/20",
    bulletBg: "bg-blue-300 text-blue-950 dark:bg-blue-400 dark:text-blue-950",
  },
  lavender: {
    id: "lavender",
    name: "Lavender",
    color: "#e9d5ff",
    primaryBg: "bg-purple-200 hover:bg-purple-300 text-purple-900 dark:bg-purple-300 dark:hover:bg-purple-400 dark:text-purple-950",
    primaryText: "text-purple-600 dark:text-purple-300",
    hoverBg: "hover:bg-purple-300 dark:hover:bg-purple-400",
    border: "border-purple-300 dark:border-purple-400",
    accentBorder: "border-purple-300 dark:border-purple-400",
    textHover: "hover:text-purple-600 dark:hover:text-purple-300",
    fill: "fill-purple-400 dark:fill-purple-300",
    stroke: "stroke-purple-400 dark:stroke-purple-300",
    tag: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
    shadow: "shadow-purple-300/20",
    bulletBg: "bg-purple-300 text-purple-950 dark:bg-purple-400 dark:text-purple-950",
  },
  creamsicle: {
    id: "creamsicle",
    name: "Creamsicle",
    color: "#fed7aa",
    primaryBg: "bg-orange-200 hover:bg-orange-300 text-orange-900 dark:bg-orange-300 dark:hover:bg-orange-400 dark:text-orange-950",
    primaryText: "text-orange-600 dark:text-orange-300",
    hoverBg: "hover:bg-orange-300 dark:hover:bg-orange-400",
    border: "border-orange-300 dark:border-orange-400",
    accentBorder: "border-orange-300 dark:border-orange-400",
    textHover: "hover:text-orange-600 dark:hover:text-orange-300",
    fill: "fill-orange-400 dark:fill-orange-300",
    stroke: "stroke-orange-400 dark:stroke-orange-300",
    tag: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200",
    shadow: "shadow-orange-300/20",
    bulletBg: "bg-orange-300 text-orange-950 dark:bg-orange-400 dark:text-orange-950",
  }
};

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  // --- One-time reset of widget settings to default to false ---
  useState(() => {
    const migrated = localStorage.getItem("harkreadly_widget_migrated_to_new_set");
    if (!migrated) {
      localStorage.removeItem("harkreadly_showtime");
      localStorage.removeItem("harkreadly_showdate");
      localStorage.removeItem("harkreadly_showcalendar");
      localStorage.removeItem("harkreadly_showquotation");
      localStorage.removeItem("harkreadly_showrotationspeed");
      localStorage.removeItem("harkreadly_showtextsizewidget");
      localStorage.setItem("harkreadly_widget_migrated_to_new_set", "true");
    }
  });

  // --- Persistent States ---
  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem("harkreadly_colortheme");
    const parsed = saved !== null ? JSON.parse(saved) : null;
    if (!parsed || parsed === "creamsicle") return "zinc";
    return Object.keys(THEMES).includes(parsed) ? parsed : "zinc"; 
  });

  const [cursorEnabled, setCursorEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_cursor");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [dispersionCursorEnabled, setDispersionCursorEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_dispersion_cursor");
    const parsed = saved !== null ? JSON.parse(saved) : null;
    if (parsed === null || parsed === true) return false;
    return parsed;
  });

  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_animations");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [sparksEnabled, setSparksEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_sparks");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [floatingParticles, setFloatingParticles] = useState(() => {
    const saved = localStorage.getItem("harkreadly_particles");
    return saved !== null ? JSON.parse(saved) : true; // Default to true now
  });

  const [scanlines, setScanlines] = useState(() => {
    const saved = localStorage.getItem("harkreadly_scanlines");
    return saved !== null ? JSON.parse(saved) : true; // Film grain default true
  });

  const [acrylicEnabled, setAcrylicEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_acrylic");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [performanceMode, setPerformanceMode] = useState(() => {
    const saved = localStorage.getItem("harkreadly_performance");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [smoothScroll, setSmoothScroll] = useState(() => {
    const saved = localStorage.getItem("harkreadly_smoothscroll");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [autoPlaySpeed, setAutoPlaySpeed] = useState(() => {
    const saved = localStorage.getItem("harkreadly_autoplay");
    return saved !== null ? JSON.parse(saved) : 6000;
  });

  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = localStorage.getItem("harkreadly_fontsize");
      if (saved === null) return 16;
      const parsed = JSON.parse(saved);
      // Guard against old string values like "md"
      return typeof parsed === "number" ? parsed : 16;
    } catch {
      return 16;
    }
  });

  const [backdropBlur, setBackdropBlur] = useState(() => {
    const saved = localStorage.getItem("harkreadly_backdropblur");
    return saved !== null ? JSON.parse(saved) : 60;
  });

  const [widgetsEnabled, setWidgetsEnabled] = useState(() => {
    const saved = localStorage.getItem("harkreadly_widgets");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showTime, setShowTime] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showtime");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [showDate, setShowDate] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showdate");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [showCalendar, setShowCalendar] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showcalendar");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [showQuotation, setShowQuotation] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showquotation");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [showSearchBar, setShowSearchBar] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showsearchbar");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [showRotationSpeed, setShowRotationSpeed] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showrotationspeed");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [showTextSizeWidget, setShowTextSizeWidget] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showtextsizewidget");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [showWhatsNew, setShowWhatsNew] = useState(() => {
    const saved = localStorage.getItem("harkreadly_showwhatsnew");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // --- Persistence Effect ---
  useEffect(() => {
    localStorage.setItem("harkreadly_colortheme", JSON.stringify(colorTheme));
    localStorage.setItem("harkreadly_cursor", JSON.stringify(cursorEnabled));
    localStorage.setItem("harkreadly_dispersion_cursor", JSON.stringify(dispersionCursorEnabled));
    localStorage.setItem("harkreadly_animations", JSON.stringify(animationsEnabled));
    localStorage.setItem("harkreadly_sparks", JSON.stringify(sparksEnabled));
    localStorage.setItem("harkreadly_particles", JSON.stringify(floatingParticles));
    localStorage.setItem("harkreadly_scanlines", JSON.stringify(scanlines));
    localStorage.setItem("harkreadly_acrylic", JSON.stringify(acrylicEnabled));
    localStorage.setItem("harkreadly_performance", JSON.stringify(performanceMode));
    localStorage.setItem("harkreadly_smoothscroll", JSON.stringify(smoothScroll));
    localStorage.setItem("harkreadly_autoplay", JSON.stringify(autoPlaySpeed));
    localStorage.setItem("harkreadly_fontsize", JSON.stringify(fontSize));
    localStorage.setItem("harkreadly_backdropblur", JSON.stringify(backdropBlur));
    localStorage.setItem("harkreadly_widgets", JSON.stringify(widgetsEnabled));
    localStorage.setItem("harkreadly_showtime", JSON.stringify(showTime));
    localStorage.setItem("harkreadly_showdate", JSON.stringify(showDate));
    localStorage.setItem("harkreadly_showcalendar", JSON.stringify(showCalendar));
    localStorage.setItem("harkreadly_showquotation", JSON.stringify(showQuotation));
    localStorage.setItem("harkreadly_showsearchbar", JSON.stringify(showSearchBar));
    localStorage.setItem("harkreadly_showrotationspeed", JSON.stringify(showRotationSpeed));
    localStorage.setItem("harkreadly_showtextsizewidget", JSON.stringify(showTextSizeWidget));
    localStorage.setItem("harkreadly_showwhatsnew", JSON.stringify(showWhatsNew));
  }, [
    colorTheme, cursorEnabled, dispersionCursorEnabled, animationsEnabled, sparksEnabled, floatingParticles, 
    scanlines, acrylicEnabled, performanceMode, smoothScroll, 
    autoPlaySpeed, fontSize, backdropBlur, widgetsEnabled,
    showTime, showDate, showCalendar, showQuotation, showSearchBar,
    showRotationSpeed, showTextSizeWidget, showWhatsNew
  ]);

  useEffect(() => {
    if (!acrylicEnabled) {
      document.documentElement.classList.add("disable-acrylic");
    } else {
      document.documentElement.classList.remove("disable-acrylic");
    }
  }, [acrylicEnabled]);

  const activeTheme = THEMES[colorTheme] || THEMES.zinc;

  return (
    <SettingsContext.Provider value={{ 
      colorTheme, setColorTheme, activeTheme,
      cursorEnabled, setCursorEnabled,
      dispersionCursorEnabled, setDispersionCursorEnabled,
      animationsEnabled, setAnimationsEnabled,
      sparksEnabled, setSparksEnabled,
      floatingParticles, setFloatingParticles,
      scanlines, setScanlines,
      acrylicEnabled, setAcrylicEnabled,
      performanceMode, setPerformanceMode,
      smoothScroll, setSmoothScroll,
      autoPlaySpeed, setAutoPlaySpeed,
      fontSize, setFontSize,
      backdropBlur, setBackdropBlur,
      widgetsEnabled, setWidgetsEnabled,
      showTime, setShowTime,
      showDate, setShowDate,
      showCalendar, setShowCalendar,
      showQuotation, setShowQuotation,
      showSearchBar, setShowSearchBar,
      showRotationSpeed, setShowRotationSpeed,
      showTextSizeWidget, setShowTextSizeWidget,
      showWhatsNew, setShowWhatsNew
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
