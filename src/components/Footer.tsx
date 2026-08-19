import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between border-b border-slate-900 pb-12">
          
          {/* Left: Brand / Identity */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-display font-bold text-sm text-cyan-400">
                AK
              </div>
              <span className="text-lg font-bold font-display text-white tracking-tight">
                Amit Keshari
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md font-sans leading-relaxed">
              B.Tech in Computer Science (AI/ML). Focused on practical retrieval systems, machine learning engineering, and responsive full-stack software.
            </p>
          </div>

          {/* Right: Quick Links & Back to Top */}
          <div className="md:col-span-6 flex flex-col md:flex-row items-start md:items-center justify-end gap-6">
            <div className="flex items-center gap-3 text-xs font-mono">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onMouseEnter={() => soundFx.playHover()}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Back to Top Trigger */}
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono text-cyan-300 transition-all hover:border-cyan-400 hover:-translate-y-0.5 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Amit Keshari. Built with React, TypeScript & Three.js.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400">Available for Opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
