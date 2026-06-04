import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const CalendarWidget = ({ currentDate }) => {
  // Navigation state for the calendar
  const [navDate, setNavDate] = useState(new Date(currentDate || new Date()));

  const year = navDate.getFullYear();
  const month = navDate.getMonth();

  // Helper arrays
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calendar calculation functions
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Pad the start with empty slots or dates from previous month
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const calendarCells = [];

  // Previous month overlaps
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      dateObj: new Date(year, month - 1, prevMonthDays - i)
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      dateObj: new Date(year, month, d)
    });
  }

  // Next month overlaps to complete 6-rows grid if needed
  const totalCells = 42; // standard 6x7 grid
  const remainingCells = totalCells - calendarCells.length;
  for (let d = 1; d <= remainingCells; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: false,
      dateObj: new Date(year, month + 1, d)
    });
  }

  // Navigation handlers
  const handlePrevMonth = () => {
    setNavDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setNavDate(new Date(year, month + 1, 1));
  };

  const handleResetToCurrent = () => {
    setNavDate(new Date(currentDate || new Date()));
  };

  // Helper to check if a calendar cell matches "Today" (the absolute current date from server/device)
  const isToday = (cellDate) => {
    const today = currentDate || new Date();
    return (
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear()
    );
  };

  // Check if calendar cell matches the nav date month/year to highlight selections
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDaySelect = (cell) => {
    if (cell.isCurrentMonth) {
      setSelectedDay(cell.day === selectedDay ? null : cell.day);
    }
  };

  return (
    <div 
      className="w-full backdrop-blur-xl bg-white/40 dark:bg-zinc-950/45 rounded-2xl p-4 md:p-5 border border-zinc-200/50 dark:border-zinc-800/25 shadow-[0_8px_30px_rgba(0,0,0,0.015)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.25)] flex flex-col gap-3.5 select-none"
      id="calendar-widget-card"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleResetToCurrent}
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
        >
          <CalendarIcon className="text-zinc-500 dark:text-zinc-400 stroke-[2.2]" size={13} />
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-sans">
            Calendar
          </span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 font-sans">
            {months[month]} {year}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="w-5 h-5 rounded-md flex items-center justify-center bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft size={12} className="stroke-[2.5]" />
            </button>
            <button
              onClick={handleNextMonth}
              aria-label="Next month"
              className="w-5 h-5 rounded-md flex items-center justify-center bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight size={12} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-zinc-200/40 dark:bg-zinc-850/40" />

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((day, idx) => (
          <span 
            key={idx} 
            className="text-[10px] font-semibold text-zinc-405 dark:text-zinc-500 uppercase font-sans py-0.5"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarCells.map((cell, idx) => {
          const currentDayIsToday = isToday(cell.dateObj);
          const isSelected = cell.isCurrentMonth && selectedDay === cell.day;
          
          return (
            <button
              key={idx}
              onClick={() => handleDaySelect(cell)}
              className={`
                aspect-square rounded-lg text-[11px] font-sans font-medium flex items-center justify-center transition-all cursor-pointer relative
                ${!cell.isCurrentMonth 
                  ? "text-zinc-300 dark:text-zinc-700/60 pointer-events-none" 
                  : currentDayIsToday
                    ? "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 font-bold shadow-sm scale-110 z-10"
                    : isSelected
                      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-700 font-bold"
                      : "text-zinc-700 dark:text-zinc-350 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/65"
                }
              `}
            >
              {cell.day}
              {currentDayIsToday && (
                <span className="absolute bottom-[2px] w-1 h-1 rounded-full bg-emerald-400 dark:bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
