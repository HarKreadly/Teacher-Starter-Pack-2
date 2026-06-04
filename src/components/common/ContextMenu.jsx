import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, ClipboardPaste, Printer, RotateCw, CornerUpLeft } from "lucide-react";

const ContextMenu = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      
      let x = e.clientX;
      let y = e.clientY;
      
      // Basic bounds check to prevent menu from going outside the viewport
      // Assuming menu width ~180px, height ~200px
      if (x + 180 > window.innerWidth) {
        x = window.innerWidth - 180;
      }
      if (y + 200 > window.innerHeight) {
        y = window.innerHeight - 200;
      }
      
      setPosition({ x, y });
      setIsOpen(true);
    };

    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      } else if (!menuRef.current) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const menuItems = [
    { 
      label: "Back", 
      icon: CornerUpLeft, 
      action: () => {
        window.history.back();
        setIsOpen(false);
      },
      shortcut: "Alt+←"
    },
    { 
      label: "Reload", 
      icon: RotateCw, 
      action: () => {
        window.location.reload();
      },
      shortcut: "Ctrl+R"
    },
    { divider: true },
    { 
      label: "Copy", 
      icon: Copy, 
      action: () => {
        const text = window.getSelection().toString();
        if (text) {
          navigator.clipboard.writeText(text);
        } else {
          // If no selection, copy nothing or active element text
        }
        setIsOpen(false);
      },
      shortcut: "Ctrl+C"
    },
    { 
      label: "Paste", 
      icon: ClipboardPaste, 
      action: async () => {
        try {
          const text = await navigator.clipboard.readText();
          const activeEl = document.activeElement;
          if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
            if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') {
              activeEl.value = activeEl.value.substring(0, activeEl.selectionStart) + text + activeEl.value.substring(activeEl.selectionEnd);
            } else {
              activeEl.innerText += text;
            }
          }
        } catch {
          console.log("Paste failed");
        }
        setIsOpen(false);
      },
      shortcut: "Ctrl+V"
    },
    { divider: true },
    { 
      label: "Print", 
      icon: Printer, 
      action: () => {
        setIsOpen(false);
        setTimeout(() => {
          window.print();
        }, 100);
      },
      shortcut: "Ctrl+P"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ top: position.y, left: position.x }}
          className="fixed z-[9999] w-48 p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-xl flex flex-col gap-0.5"
        >
          {menuItems.map((item, idx) => {
            if (item.divider) {
              return <div key={`div-${idx}`} className="h-px bg-zinc-200/50 dark:bg-zinc-800/50 my-1 mx-2" />;
            }

            return (
              <button
                key={item.label}
                onClick={item.action}
                className="flex items-center justify-between w-full px-3 py-2 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-transparent hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon size={14} className="stroke-[2.5] opacity-70" />
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
