import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Mail, Check } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { activeTheme } = useSettings();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 pt-6 md:pt-10 lg:pt-12 pb-0 transition-colors duration-300 px-6 md:px-10 lg:px-12 w-full" id="app-footer">
      
      {/* Beautifully Crafted Unified Card with Backdrop Blur - Extra Wide for Larger Screens */}
      <div 
        className="relative w-full max-w-7xl xl:max-w-[95vw] 2xl:max-w-[96vw] mx-auto bg-white/40 dark:bg-zinc-900/10 backdrop-blur-xl rounded-t-[3.5rem] sm:rounded-t-[4.5rem] lg:rounded-t-[5.5rem] rounded-b-none border border-b-0 border-zinc-200/50 dark:border-zinc-800/80 p-6 sm:p-10 md:p-12 lg:p-14 text-center overflow-hidden shadow-lg mt-6 md:mt-10 lg:mt-12"
        id="footer-unified-card"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-100/10 dark:from-zinc-950/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(24,24,27,0.02)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />
        
        {/* Top CTA Content Section */}
        <div className="relative max-w-2xl mx-auto z-10 flex flex-col items-center gap-6 mb-12 mt-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-black text-zinc-400 dark:text-zinc-555 flex items-center gap-1.5">
            <Sparkles size={11} className="text-zinc-450 dark:text-zinc-400" />
            Seamless Classroom Flow
          </span>
          <h2 className="text-3xl md:text-4.5xl font-black tracking-tight leading-tight text-zinc-900 dark:text-white uppercase font-sans">
            Turn preparation into clarity
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md font-semibold">
            Warmedia makes it effortless to uncover pedagogical insights, inspire students, and activate your daily classroom routines in seconds.
          </p>
          <Link 
            to="/warm-ups"
            className={`mt-2 px-6 py-3 ${activeTheme.primaryBg} font-black rounded-xl text-[10px] tracking-widest uppercase shadow-sm transition-all duration-300 active:scale-95 cursor-pointer border border-transparent font-sans`}
            id="footer-get-started-btn"
          >
            Get Started
          </Link>
        </div>

        {/* Nested Footer Content Card with White/Glassy Background */}
        <div 
          className="w-full max-w-6xl xl:max-w-7xl mx-auto bg-white/80 dark:bg-zinc-900/35 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 p-8 sm:p-10 md:p-12 rounded-[1.75rem] shadow-md relative overflow-hidden text-left transition-all duration-300 z-10"
          id="footer-nested-links-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10">
            
            {/* Brand/Newsletter Section */}
            <div className="lg:col-span-4 flex flex-col items-start gap-6">
              <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center shadow-xs border border-zinc-800 dark:border-zinc-200/20">
                  <Sparkles size={14} className="text-white dark:text-zinc-950 stroke-[2.5]" />
                </div>
                <span className="font-extrabold text-sm tracking-widest text-zinc-950 dark:text-white uppercase">warmedia</span>
              </Link>
              
              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-sm font-semibold">
                Transforming complex planning routines into dynamic materials. Tailored beautifully with minimalist layouts, Zinc accents, and responsive controls for the modern school context.
              </p>

              {/* Newsletter form with Zinc styling and backdrop-blur */}
              <div className="w-full max-w-sm flex flex-col gap-2 mt-2">
                <span className="text-[9px] font-mono tracking-widest uppercase font-black text-zinc-400 dark:text-zinc-555">
                  Weekly Insights
                </span>
                <form onSubmit={handleSubscribe} className="relative flex items-center w-full">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
                    <Mail size={12} className="stroke-[2.5]" />
                  </div>
                  <input 
                    type="email"
                    required
                    placeholder="name@school.edu"
                    value={email}
                    disabled={subscribed}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-semibold pl-9 pr-24 py-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    disabled={subscribed}
                    className={`absolute right-1.5 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                      subscribed 
                        ? "bg-emerald-500 text-white" 
                        : activeTheme.primaryBg
                    }`}
                  >
                    {subscribed ? (
                      <>
                        <Check size={10} className="stroke-[3]" />
                        <span>Sent</span>
                      </>
                    ) : (
                      <>
                        <span>Join</span>
                        <ArrowRight size={10} className="stroke-[3]" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Links grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              
              {/* Products Column */}
              <div className="flex flex-col gap-4">
                <h4 className="font-black text-zinc-955 dark:text-white uppercase tracking-widest text-[10px] border-b border-zinc-150/50 dark:border-zinc-800/60 pb-2">
                  Curriculum
                </h4>
                <ul className="flex flex-col gap-2.5 font-semibold">
                  <li>
                    <Link to="/warm-ups" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Warm-Ups
                    </Link>
                  </li>
                  <li>
                    <Link to="/materials" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Teaching Materials
                    </Link>
                  </li>
                  <li>
                    <Link to="/exercises" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Exercises
                    </Link>
                  </li>
                  <li>
                    <Link to="/assessments" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Assessments
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support Column */}
              <div className="flex flex-col gap-4">
                <h4 className="font-black text-zinc-955 dark:text-white uppercase tracking-widest text-[10px] border-b border-zinc-150/50 dark:border-zinc-800/60 pb-2">
                  Support
                </h4>
                <ul className="flex flex-col gap-2.5 font-semibold">
                  <li>
                    <Link to="/contact" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Contact Desk
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact?tab=faq" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Common Questions
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact?tab=feedback" 
                      className="text-zinc-500 hover:text-zinc-955 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200"
                    >
                      Send Feedback
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Project Info Column */}
              <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                <h4 className="font-black text-zinc-955 dark:text-white uppercase tracking-widest text-[10px] border-b border-zinc-150/50 dark:border-zinc-800/60 pb-2">
                  Warmedia
                </h4>
                <ul className="flex flex-col gap-2.5 font-semibold">
                  <li>
                    <Link to="/" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200">
                      Partner Network
                    </Link>
                  </li>
                  <li>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono block">
                      V0.4.0 (Release)
                    </span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Thick elegant dark/light horizontal divider inside nested card */}
          <div className="border-t border-zinc-200/50 dark:border-zinc-800/40 my-8 w-full relative z-10" />

          {/* Bottom copyright & guidelines inside nested card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[10px] font-mono tracking-wider uppercase font-black text-zinc-450 dark:text-zinc-550">
            <div>
              © {new Date().getFullYear()} WARMEDIA. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[9px] border border-zinc-200/40 dark:border-zinc-800/85 px-2 py-0.5 rounded text-zinc-450 dark:text-zinc-500">
                CC BY-NC 4.0
              </span>
              <span className="text-[9px] border border-zinc-200/40 dark:border-zinc-800/85 px-2 py-0.5 rounded text-zinc-450 dark:text-zinc-500">
                MINIMALIST EDITION
              </span>
            </div>
          </div>
        </div>

        {/* Giant subtle ambient brand name centered in the backdrop inside parent card */}
        <div className="w-full text-center mt-6 md:mt-8 select-none pointer-events-none h-12 flex items-end justify-center relative z-0">
          <span className="text-[10vw] font-black tracking-widest text-zinc-900/[0.03] dark:text-white/[0.03] leading-none uppercase font-sans">
            warmedia
          </span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
