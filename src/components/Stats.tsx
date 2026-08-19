import React from 'react';
import { STATS } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { Brain, Cpu, Layers, Sparkles, Activity } from 'lucide-react';

export const Stats: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Brain,
    Cpu,
    Layers,
    Sparkles
  };

  const glowStyles = {
    cyan: 'border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    blue: 'border-sky-500/20 text-sky-400 group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]',
    purple: 'border-indigo-500/20 text-indigo-400 group-hover:border-indigo-400 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]',
    emerald: 'border-emerald-500/20 text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STATS.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Activity;
            const glowClass = glowStyles[stat.highlightColor] || glowStyles.cyan;

            return (
              <div
                key={stat.id}
                id={`stat-card-${stat.id}`}
                onMouseEnter={() => soundFx.playHover()}
                className={`group relative p-6 rounded-2xl glass-panel border transition-all duration-300 hover:-translate-y-1 ${glowClass}`}
              >
                {/* Header: Icon & ID */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Stat Value Display */}
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-2xl font-bold font-mono text-cyan-400">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Stat Label & Subtext */}
                <h3 className="text-sm font-bold font-display text-slate-200 mt-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
