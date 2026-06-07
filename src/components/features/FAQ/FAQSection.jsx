import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ArrowUpRight, ChevronDown } from "lucide-react";
import { useSettings } from "../../../context/SettingsContext";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div 
      className="group relative rounded-2xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
      id={`faq-item-${question.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 text-sm md:text-base leading-snug pr-4">
          {question}
        </span>
        <div 
          className={`flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 bg-zinc-200/80 dark:bg-zinc-800" : "group-hover:bg-zinc-200/50 dark:group-hover:bg-zinc-800/40"}`}
        >
          <ChevronDown size={14} className="stroke-[2.5]" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans border-t border-zinc-100/50 dark:border-zinc-800/40 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { activeTheme } = useSettings();

  const faqs = [
    {
      question: "What is Warmedia?",
      answer: "Warmedia is an offline-friendly learning and prep workspace designed for modern educators. Prepare, manage, and deliver highly-engaging activities directly from your browser—no installations or active internet connections required."
    },
    {
      question: "How does it work?",
      answer: "Simply customize your preferences in our settings panel (such as turning on the dispersion wave cursor), select standard curriculum models, and project the interactive activities instantly to your students."
    },
    {
      question: "Is my data safe?",
      answer: "Yes. Warmedia saves your preferences, active streaks, and lesson progress locally in your browser. Your classroom data belongs exclusively to you—always."
    },
    {
      question: "Can I use it offline?",
      answer: "Absolutely. All core warm-ups, exercises, and interactive tools are bundled locally, ensuring a smooth, interruption-free experience even in low-connectivity classrooms."
    }
  ];

  return (
    <section 
      className="relative w-full py-20 px-6 md:px-12 lg:px-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden border-t border-zinc-200/40 dark:border-zinc-900/60"
      id="faq-section-container"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,244,245,0.08)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Informational Sidebar/Column */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6">
          {/* Tagline Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-350/20 dark:border-zinc-800/60 backdrop-blur-sm">
            <HelpCircle size={13} className="text-zinc-600 dark:text-zinc-400 stroke-[2.5]" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 font-sans">
              Your Questions, Answered
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-none font-sans">
            Frequently Asked Questions
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
            Warmedia is an offline-friendly pedagogical hub that empowers educators to design beautiful lesson warmups, save prep hours, and lead interactive classroom exercises effortlessly.
          </p>

          {/* Call to action "Still Have Questions" Card with backdrop filter */}
          <div 
            className="w-full mt-4 p-6 rounded-[24px] border border-zinc-200/50 dark:border-zinc-800/80 bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md shadow-sm dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
            id="faq-cta-card"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-3">
              Still Have Questions?
            </h3>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 font-sans">
              We understand that every classroom and curriculum has unique needs. If there's anything you'd like to clarify about our exercises, interactive controls, or offline setup, we're here to help.
            </p>

            <button 
              className={`flex items-center gap-2 px-5 py-2.5 ${activeTheme.primaryBg} font-semibold rounded-full text-xs tracking-wide shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
              id="faq-book-demo-btn"
            >
              Book a Demo
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right FAQ List Accordion Column */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
