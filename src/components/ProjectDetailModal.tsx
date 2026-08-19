import React, { useEffect } from 'react';
import { Project } from '../types';
import { soundFx } from '../utils/audio';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Cpu, 
  Layers, 
  Database, 
  Server, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Code2
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      id="project-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-content"
        className="relative w-full max-w-4xl my-auto rounded-2xl glass-panel-glow border border-cyan-500/40 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden bg-slate-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Cyber Grid Accent */}
        <div className="absolute inset-0 cyber-grid-dense opacity-15 pointer-events-none" />

        {/* Modal Close Button */}
        <button
          id="close-project-modal-btn"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="relative z-10 border-b border-slate-800 pb-6 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
              {project.category.toUpperCase()} SYSTEM
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-md bg-slate-900 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: {project.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-cyan-400 font-mono mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Left Column: Deep Overview & Features */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                SYSTEM ARCHITECTURE OVERVIEW
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features List */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                CORE ENGINEERING CAPABILITIES
              </h3>
              <div className="space-y-2.5">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Benchmarks / Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  PERFORMANCE TELEMETRY
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center"
                    >
                      <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300 block">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight block mt-0.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Architectural Blueprint & Stack */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Architecture Stack Breakdown */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4" />
                SYSTEM BLUEPRINT
              </h3>

              <div className="space-y-3 text-xs font-mono">
                {project.architecture.frontend && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Client Tier</span>
                    <span className="text-slate-200 block font-semibold">{project.architecture.frontend}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Service / Backend</span>
                  <span className="text-slate-200 block font-semibold">{project.architecture.backend}</span>
                </div>

                {project.architecture.aiModelOrVector && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Vector Index / AI Pipeline</span>
                    <span className="text-cyan-300 block font-semibold">{project.architecture.aiModelOrVector}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Database & Storage</span>
                  <span className="text-slate-200 block font-semibold">{project.architecture.database}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Infrastructure & Deploy</span>
                  <span className="text-slate-200 block font-semibold">{project.architecture.deployment}</span>
                </div>
              </div>
            </div>

            {/* Technologies Grid */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                DEPLOYED TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-semibold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH DEMO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
