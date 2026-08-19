import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';
import { Skill, SkillCategory } from '../types';
import { soundFx } from '../utils/audio';
import { 
  BrainCircuit, 
  Code, 
  Database, 
  Cloud, 
  Search, 
  Sparkles, 
  Layers, 
  Cpu, 
  Flame, 
  Container, 
  GitBranch, 
  Atom, 
  FileCode, 
  Zap, 
  Radio, 
  Palette, 
  FileSearch, 
  Network, 
  CloudLightning, 
  Server, 
  UploadCloud,
  CheckCircle2,
  Wrench
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(SKILLS[0]);

  const iconComponents: Record<string, React.ElementType> = {
    Code2: Code,
    Brain: BrainCircuit,
    Cpu,
    Sparkles,
    FileSearch,
    Network,
    Atom,
    FileCode,
    Zap,
    Code,
    Radio,
    Palette,
    Database,
    Layers,
    Flame,
    Container,
    GitBranch,
    CloudLightning,
    Server,
    UploadCloud,
    Search
  };

  const categories = [
    { id: 'all', label: 'All Technologies', count: SKILLS.length },
    { id: 'ai-ml', label: 'AI / ML & RAG', count: SKILLS.filter(s => s.category === 'ai-ml').length },
    { id: 'development', label: 'Full-Stack Dev', count: SKILLS.filter(s => s.category === 'development').length },
    { id: 'database-infra', label: 'Database & Infra', count: SKILLS.filter(s => s.category === 'database-infra').length },
    { id: 'cloud-ai-infra', label: 'Cloud & AI Tools', count: SKILLS.filter(s => s.category === 'cloud-ai-infra').length }
  ];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Wrench className="w-3.5 h-3.5" />
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              Technologies & <span className="text-cyan-400">Tools</span>
            </h2>
            <p className="text-slate-300 max-w-xl text-base">
              The languages, machine learning frameworks, databases, and cloud services I build with daily.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="skill-search-input"
              type="text"
              placeholder="Search technologies, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2 overflow-x-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`skill-cat-${cat.id}`}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat.id as SkillCategory | 'all');
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-slate-950/30 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid and Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Skills Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredSkills.map((skill) => {
              const IconComponent = iconComponents[skill.icon] || Code;
              const isHovered = hoveredSkill?.name === skill.name;

              return (
                <div
                  key={skill.name}
                  id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onMouseEnter={() => {
                    setHoveredSkill(skill);
                    soundFx.playHover();
                  }}
                  onClick={() => {
                    setHoveredSkill(skill);
                    soundFx.playClick();
                  }}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative group overflow-hidden ${
                    isHovered
                      ? 'bg-slate-900/90 border-cyan-400/80 shadow-lg shadow-cyan-500/15 -translate-y-1'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isHovered
                            ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-400'
                            : 'bg-slate-900 text-cyan-400 border border-slate-800'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono text-cyan-300/90 font-semibold">
                        {skill.proficiency}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-display mb-1 group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {skill.description}
                    </p>
                  </div>

                  {/* Level Indicator Bar */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>PROFICIENCY</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredSkills.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 font-mono text-xs">
                No technologies found matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Sticky Tech Inspector Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Wrench className="w-4 h-4" />
                  <span>TECH HIGHLIGHT</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                  ACTIVE
                </span>
              </div>

              {hoveredSkill ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      SELECTED TECHNOLOGY
                    </span>
                    <h3 className="text-xl font-bold text-white font-display mt-0.5">
                      {hoveredSkill.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {hoveredSkill.description}
                    </p>
                  </div>

                  {/* Proficiency Gauge */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">MASTERY LEVEL</span>
                      <span className="text-cyan-300 font-bold">{hoveredSkill.level}% • {hoveredSkill.proficiency}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
                        style={{ width: `${hoveredSkill.level}%` }}
                      />
                    </div>
                  </div>

                  {/* Related Projects in Portfolio */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
                      USED IN PROJECTS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {hoveredSkill.relatedProjects.map((proj) => (
                        <span
                          key={proj}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
                      KEY CONCEPTS & LIBRARIES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {hoveredSkill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs font-mono text-slate-400">
                  Hover over or tap any technology card to view details.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
