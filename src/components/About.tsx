import React, { useState } from 'react';
import { PERSONAL_INFO, FOCUS_AREAS } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { 
  GraduationCap, 
  Cpu, 
  Layers, 
  BrainCircuit, 
  Cloud, 
  Workflow, 
  Sparkles, 
  User, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Lightbulb,
  FileText
} from 'lucide-react';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const [activeArea, setActiveArea] = useState(0);

  const iconMap: Record<string, React.ElementType> = {
    BrainCircuit,
    Cpu,
    Layers,
    Cloud,
    Workflow,
    Sparkles
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & MINDSET</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Hi, I'm <span className="text-cyan-400">Amit Keshari</span>.
          </h2>
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg">
            A Computer Science student & AI builder who loves taking ideas from mathematical concepts to resilient, deployed software.
          </p>
        </div>

        {/* 2-Column Story & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Personal Narrative & Live Learning Feed */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Story Card */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/20 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      B.Tech in Computer Science & Engineering
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">
                      Specialization in Artificial Intelligence & Machine Learning
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {PERSONAL_INFO.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onOpenResume();
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>VIEW FULL RESUME</span>
                </button>

                <a
                  href="#contact"
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                >
                  <span>GET IN TOUCH</span>
                </a>
              </div>
            </div>

            {/* What I'm Currently Exploring (Human Touch) */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <BookOpen className="w-4 h-4" />
                <span>WHAT I'M EXPLORING & READING RIGHT NOW</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {PERSONAL_INFO.currentlyExploring.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Engineering Principles & Focus Areas */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Engineering Principles */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 pb-2 border-b border-slate-800">
                <Lightbulb className="w-4 h-4" />
                <span>HOW I THINK ABOUT ENGINEERING</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PERSONAL_INFO.engineeringPrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 font-bold">0{idx + 1}.</span>
                      <h4 className="text-sm font-bold text-white font-display">
                        {principle.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Focus Domains */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-mono text-slate-400">
                  CORE DOMAINS & SPECIALIZATIONS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FOCUS_AREAS.map((area, idx) => {
                  const isSelected = activeArea === idx;
                  const IconComponent = iconMap[area.icon] || Sparkles;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        soundFx.playClick();
                        setActiveArea(idx);
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-900/90 border-cyan-400/80 shadow-lg shadow-cyan-500/10 -translate-y-0.5'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950'
                                : 'bg-slate-900 text-cyan-400 border border-slate-800'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                                : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {area.badge}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white font-display mb-1">
                          {area.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
