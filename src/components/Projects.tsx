import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectEcosystem3D } from './three/ProjectEcosystem3D';
import { ProjectDetailModal } from './ProjectDetailModal';
import { soundFx } from '../utils/audio';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  Box, 
  LayoutGrid, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Database,
  BrainCircuit,
  FolderGit2
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              Selected <span className="text-cyan-400">Projects</span>
            </h2>
            <p className="text-slate-300 max-w-xl text-base">
              Real-world systems, AI architectures, and full-stack software designed for speed, scale, and high reliability.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              id="projects-grid-view-toggle"
              onClick={() => {
                soundFx.playClick();
                setViewMode('grid');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              id="projects-3d-view-toggle"
              onClick={() => {
                soundFx.playClick();
                setViewMode('3d');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Constellation</span>
            </button>
          </div>
        </div>

        {/* 3D Ecosystem Mode */}
        {viewMode === '3d' ? (
          <div className="mb-12 animate-in fade-in zoom-in-95 duration-300">
            <ProjectEcosystem3D
              onSelectProjectDetail={(project) => {
                setSelectedProject(project);
              }}
            />
          </div>
        ) : (
          <>
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pb-1">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'ai-ml', label: 'AI / ML & RAG' },
                { id: 'fullstack', label: 'Full-Stack Systems' },
                { id: 'systems', label: 'Automation & Ledger' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  id={`proj-filter-${cat.id}`}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveCategory(cat.id as ProjectCategory);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="group relative rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
                >
                  {/* Card Subtle Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                  <div>
                    {/* Header Row: Category Badge & Status */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                          {project.category.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                          0{idx + 1}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {project.status}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-1 mb-3">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      {project.features.slice(0, 3).map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Metrics Bar */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="text-center">
                            <span className="text-sm font-bold font-mono text-cyan-300 block">
                              {m.value}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 block uppercase">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-slate-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      id={`open-detail-modal-${project.id}`}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedProject(project);
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>VIEW ARCHITECTURE & DEMO</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => soundFx.playHover()}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => soundFx.playHover()}
                          className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 transition-colors"
                          aria-label="Live Demo Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
