import React, { useState } from 'react';
import { TIMELINE } from '../data/portfolioData';
import { TimelineItem } from '../types';
import { soundFx } from '../utils/audio';
import { 
  GraduationCap, 
  BrainCircuit, 
  Layers, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Compass,
  Milestone
} from 'lucide-react';

export const Journey: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(TIMELINE[0].id);

  const categoryIcons: Record<string, React.ElementType> = {
    Education: GraduationCap,
    'AI / ML': BrainCircuit,
    Engineering: Layers,
    Entrepreneurship: Sparkles
  };

  const filteredTimeline = TIMELINE.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Milestone className="w-3.5 h-3.5" />
              <span>EXPERIENCE & EDUCATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              My <span className="text-cyan-400">Journey</span>
            </h2>
            <p className="text-slate-300 max-w-xl text-base">
              My path through computer science, applied AI research, full-stack systems engineering, and product building.
            </p>
          </div>

          {/* Timeline Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Education', 'AI / ML', 'Engineering', 'Entrepreneurship'].map((filter) => (
              <button
                key={filter}
                id={`timeline-filter-${filter.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedFilter(filter);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-400'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Center Spine Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />

          <div className="space-y-12 sm:space-y-16">
            {filteredTimeline.map((item, idx) => {
              const Icon = categoryIcons[item.category] || Compass;
              const isEven = idx % 2 === 0;
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  id={`timeline-item-${item.id}`}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Node Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <div
                      className={`w-9 h-9 rounded-full bg-slate-950 border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                        item.current
                          ? 'border-cyan-400 shadow-cyan-400/50 scale-110'
                          : 'border-slate-700 hover:border-cyan-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>

                  {/* Spacer on opposite side */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div
                    onClick={() => {
                      soundFx.playClick();
                      setExpandedId(isExpanded ? null : item.id);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-10' : 'sm:pl-10'
                    } w-full cursor-pointer`}
                  >
                    <div
                      className={`p-6 rounded-2xl glass-panel border transition-all duration-300 ${
                        isExpanded
                          ? 'border-cyan-500/50 bg-slate-900/90 shadow-xl shadow-cyan-500/10'
                          : 'border-slate-800/80 hover:border-slate-700 bg-slate-950/60'
                      }`}
                    >
                      {/* Period & Category Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {item.category}
                        </span>
                      </div>

                      {/* Title & Role */}
                      <h3 className="text-lg font-bold font-display text-white mt-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/90 mb-3">
                        {item.role} {item.organization ? `• ${item.organization}` : ''}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 mb-4">
                        {item.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-2 text-xs text-slate-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Applied Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
