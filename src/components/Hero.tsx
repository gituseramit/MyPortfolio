import React, { useState, useEffect } from 'react';
import { HeroNeuralSphere } from './three/HeroNeuralSphere';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Cpu, 
  Layers, 
  BrainCircuit, 
  Github, 
  Linkedin, 
  Mail,
  ChevronDown,
  Code2
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

const ROLES = [
  'AI/ML Developer',
  'Full-Stack Engineer',
  'RAG Systems Specialist',
  'Product-Minded Builder'
];

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth typewriter effect for roles
  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
        if (displayedRole.length + 1 === currentFullRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length - 1));
        if (displayedRole.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    soundFx.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Glow Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Personal Greeting, Role & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for AI/ML & Engineering Roles</span>
          </div>

          {/* Main Title & Typographic Hierarchy */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
              Amit <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Keshari</span>
            </h1>

            {/* Dynamic Role Subtitle */}
            <div className="flex items-center gap-2 text-lg sm:text-2xl font-mono text-cyan-400 min-h-[2.5rem]">
              <span className="text-slate-500 font-normal">{'>'}</span>
              <span className="font-semibold">{displayedRole}</span>
              <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-0.5" />
            </div>
          </div>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            {PERSONAL_INFO.headline}
          </p>

          {/* Tech Quick-Specs Pill Array */}
          <div className="flex flex-wrap gap-2 pt-1 pb-2">
            {[
              { icon: BrainCircuit, label: 'RAG & Vector Search' },
              { icon: Cpu, label: 'Machine Learning' },
              { icon: Layers, label: 'Full-Stack Systems' },
              { icon: Sparkles, label: 'Generative AI' }
            ].map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300"
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{spec.label}</span>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
            {/* Primary CTA: View Projects */}
            <button
              id="hero-view-work-btn"
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => soundFx.playHover()}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-sm font-bold tracking-wide flex items-center gap-2 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA: Let's Connect */}
            <button
              id="hero-lets-connect-btn"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => soundFx.playHover()}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-400/50 text-slate-200 hover:text-white font-mono text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>LET'S CONNECT</span>
            </button>

            {/* Resume Link */}
            <button
              id="hero-download-resume-btn"
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="px-4 py-3.5 rounded-xl text-slate-400 hover:text-cyan-300 font-mono text-xs tracking-wider flex items-center gap-1.5 hover:bg-slate-900/50 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="underline underline-offset-4 decoration-cyan-500/40">VIEW RESUME</span>
            </button>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full max-w-lg">
            <span className="text-xs font-mono text-slate-400">
              CONNECT:
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onMouseEnter={() => soundFx.playHover()}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Neural Core Sphere */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center">
            {/* 3D WebGL Neural Core */}
            <HeroNeuralSphere />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        id="hero-scroll-indicator-btn"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to About Section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">EXPLORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
      </button>
    </section>
  );
};
