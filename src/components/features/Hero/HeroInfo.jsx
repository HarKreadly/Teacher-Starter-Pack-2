import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { useSettings } from "../../../context/SettingsContext";
import CalendarWidget from "./CalendarWidget";

const HeroInfo = ({ dateTime }) => {
  const { 
    showTime, 
    showDate, 
    showCalendar, 
    widgetsEnabled 
  } = useSettings();

  const formatTime = (date) => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours.toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return { hours: hoursStr, minutes, seconds, ampm };
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const weekday = date.toLocaleString("default", { weekday: "long" });
    return { day, month, year, weekday };
  };

  const { day, month, year, weekday } = formatDate(dateTime);
  const { hours, minutes, seconds, ampm } = formatTime(dateTime);

  const dateVisible = widgetsEnabled && showDate;
  const timeVisible = widgetsEnabled && showTime;
  const calendarVisible = widgetsEnabled && showCalendar;

  if (!dateVisible && !timeVisible && !calendarVisible) return null;

  return (
    <div className="lg:col-span-3 flex flex-col justify-center lg:justify-end h-full py-6 lg:py-10 order-2 lg:order-3 px-4 md:px-8 lg:pr-8 relative z-50 items-center lg:items-end mt-12 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className="flex flex-col items-center lg:items-end w-full max-w-[280px] mx-auto lg:mx-0 mt-auto gap-4"
      >
        {/* Unified Clock & Calendar Slate Card with backdrop filter */}
        {(timeVisible || dateVisible) && (
          <div 
            className="w-full backdrop-blur-xl bg-white/40 dark:bg-zinc-950/45 rounded-2xl p-5 border border-zinc-200/50 dark:border-zinc-800/25 shadow-[0_8px_30px_rgba(0,0,0,0.015)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.25)] flex flex-col gap-4"
            id="hero-time-date-panel"
          >
            {/* Time Block */}
            {timeVisible && (
              <div className="flex flex-col gap-1 w-full text-center lg:text-left">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <Clock className="text-zinc-400 dark:text-zinc-500 stroke-[2.2]" size={12} />
                  <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-sans">
                    Local Time
                  </span>
                </div>
                
                <div className="flex items-baseline justify-center lg:justify-start select-none font-sans">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tighter text-zinc-900 dark:text-zinc-100 flex items-baseline">
                    {hours}
                    <span className="text-zinc-400 dark:text-zinc-650 animate-pulse mx-0.5">:</span>
                    {minutes}
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wider uppercase ml-1.5">
                    {ampm}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-600 font-mono tracking-wider ml-auto hidden lg:inline-block">
                    {seconds}
                  </span>
                </div>
              </div>
            )}

            {/* Dividing microline */}
            {timeVisible && dateVisible && (
              <div className="h-px w-full bg-zinc-200/50 dark:bg-zinc-850/50" />
            )}

            {/* Date Block */}
            {dateVisible && (
              <div className="flex flex-col gap-1 w-full text-center lg:text-left">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <Calendar className="text-zinc-400 dark:text-zinc-500 stroke-[2.2]" size={12} />
                  <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase font-sans">
                    Current Date
                  </span>
                </div>
                
                <div className="text-sm md:text-base font-medium text-zinc-800 dark:text-zinc-200 font-sans tracking-tight text-center lg:text-left select-none leading-none mt-1">
                  <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{weekday}</span>
                  <div className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
                    {month} {day}, {year}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Calendar Widget */}
        {calendarVisible && (
          <div className="w-full">
            <CalendarWidget currentDate={dateTime} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroInfo;
