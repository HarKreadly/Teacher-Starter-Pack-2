import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 pt-2 transition-colors duration-300">
      
      {/* Bottom elegant curved top banner - updated to high-contrast modern light zinc palette */}
      <div className="relative bg-zinc-100/95 dark:bg-zinc-900/60 md:mx-4 lg:mx-8 xl:mx-12 xl:max-w-[1536px] 2xl:max-w-[1700px] xl:mx-auto text-zinc-900 dark:text-zinc-100 pt-20 xl:pt-28 pb-0 px-6 xl:px-12 text-center rounded-t-[40px] md:rounded-t-[64px] xl:rounded-t-[80px] border-t border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-200/20 dark:from-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(24,24,27,0.03)_0%,_transparent_65%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_65%)] pointer-events-none" />
        
        <div className="relative max-w-2xl xl:max-w-3xl mx-auto z-10 flex flex-col items-center gap-6 xl:gap-8 mb-16 xl:mb-20">
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-zinc-955 dark:text-white font-sans">
            Turn preparation into clarity
          </h2>
          <p className="text-zinc-650 dark:text-zinc-400 text-sm md:text-base xl:text-lg leading-relaxed max-w-md xl:max-w-xl font-sans">
            Warmedia makes it effortless to uncover pedagogical insights, inspire students, and run your classroom with precision.
          </p>
          <Link 
            to="/warm-ups"
            className="mt-2 px-6 py-2.5 xl:px-8 xl:py-3.5 bg-zinc-950 hover:bg-zinc-850 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold rounded-full text-xs tracking-wider uppercase shadow-xl hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] cursor-pointer"
          >
            Get Started
          </Link>
        </div>

        {/* Floating container card with dynamic backdrop filter and coordinates layout matching the main theme */}
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1450px] mx-auto bg-white/70 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800/80 rounded-[28px] md:rounded-[36px] xl:rounded-[48px] shadow-[0_12px_45px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-12 xl:p-16 relative overflow-hidden text-left mb-16 xl:mb-24 z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(24,24,27,0.01)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.01)_0%,_transparent_50%)] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 relative z-10">
            
            {/* Brand/Logo Section (Left column, taking up more space) */}
            <div className="lg:col-span-5 flex flex-col items-start font-sans">
              <Link to="/" className="flex items-center gap-3.5 hover:opacity-90 transition-opacity">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-zinc-800 dark:border-zinc-200/20 transition-transform duration-300 hover:scale-105">
                  <svg className="w-full h-full text-white dark:text-zinc-950 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="font-extrabold text-lg tracking-tight text-zinc-950 dark:text-white uppercase">warmedia</span>
              </Link>
              
              <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-[13px] xl:text-sm leading-relaxed mt-5 max-w-sm font-medium">
                Warmedia helps educators transform complex lesson materials into clear, engaging activities — everything you need in one clean place.
              </p>
            </div>

            {/* Navigation options split into three visual columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 xl:gap-14 text-sans">
              
              {/* Product Navigation Column */}
              <div>
                <h4 className="font-black text-zinc-950 dark:text-white uppercase text-[11px] tracking-widest mb-4">Product</h4>
                <ul className="space-y-3.5 text-[13px]">
                  <li>
                    <Link to="/warm-ups" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Warm-Ups
                    </Link>
                  </li>
                  <li>
                    <Link to="/materials" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold font-semibold">
                      Teaching Materials
                    </Link>
                  </li>
                  <li>
                    <Link to="/exercises" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Exercises
                    </Link>
                  </li>
                  <li>
                    <Link to="/assessments" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Assessments
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <h4 className="font-black text-zinc-955 dark:text-white uppercase text-[11px] tracking-widest mb-4">Resources</h4>
                <ul className="space-y-3.5 text-[13px]">
                  <li>
                    <Link to="/documentation" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Column */}
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-black text-zinc-955 dark:text-white uppercase text-[11px] tracking-widest mb-4">Company</h4>
                <ul className="space-y-3.5 text-[13px]">
                  <li>
                    <Link to="/about" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors duration-200 font-semibold">
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Thin horizontal divider divider line */}
          <div className="border-t border-zinc-200 dark:border-zinc-800/80 my-8 w-full relative z-10" />

          {/* Bottom attribution and legal hyperlinks */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 font-sans">
            <p className="text-[12px] text-zinc-500 dark:text-zinc-450 font-semibold">
              © {new Date().getFullYear()} Warmedia. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-[12px] text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white underline underline-offset-4 decoration-zinc-200 dark:decoration-zinc-800 hover:decoration-zinc-950 dark:hover:decoration-white transition-colors font-medium">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-[12px] text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white underline underline-offset-4 decoration-zinc-200 dark:decoration-zinc-800 hover:decoration-zinc-950 dark:hover:decoration-white transition-colors font-medium">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Massive subtle background identifier */}
        <div className="w-full text-center mt-12 xl:mt-24 select-none pointer-events-none h-24 sm:h-36 md:h-48 xl:h-64 flex items-end justify-center relative z-0">
          <span className="text-[16vw] xl:text-[14vw] font-black tracking-tighter text-zinc-900/[0.03] dark:text-white/[0.03] leading-none uppercase font-sans origin-bottom font-bold">
            warmedia
          </span>
         </div>
      </div>

    </footer>
  );
};

export default Footer;
