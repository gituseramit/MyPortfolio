import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';
import { 
  Terminal, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  FileText, 
  Cpu, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

const NAV_ITEMS = [
  { label: 'HOME', href: '#home', id: 'home' },
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'SKILLS', href: '#skills', id: 'skills' },
  { label: 'PROJECTS', href: '#projects', id: 'projects' },
  { label: 'JOURNEY', href: '#journey', id: 'journey' },
  { label: 'CONTACT', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(!soundFx.getMutedState());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFx.playClick();
    setMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    const isNowActive = soundFx.toggleMute();
    setAudioEnabled(isNowActive);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2 sm:py-3 bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-black/40'
            : 'py-4 sm:py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              onMouseEnter={() => soundFx.playHover()}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-500/20">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                  AMIT KESHARI
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </span>
                <span className="text-[10px] font-mono text-cyan-400/80 -mt-0.5 tracking-wider hidden xs:block">
                  AI/ML • BUILDER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-300 font-bold bg-cyan-500/15 shadow-sm shadow-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Sound Synthesizer Toggle */}
              <button
                id="navbar-audio-toggle-btn"
                onClick={toggleAudio}
                onMouseEnter={() => soundFx.playHover()}
                className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  audioEnabled
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={audioEnabled ? 'Audio FX: Active (Click to Mute)' : 'Audio FX: Muted (Click to Enable)'}
                aria-label="Toggle Audio Effects"
              >
                {audioEnabled ? (
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
                <span className="hidden lg:inline text-[11px]">
                  {audioEnabled ? 'SFX: ON' : 'SFX: OFF'}
                </span>
              </button>

              {/* AI Terminal Assistant Launcher */}
              <button
                id="navbar-ai-terminal-btn"
                onClick={() => {
                  soundFx.playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all shadow-sm hover:border-cyan-400 cursor-pointer"
                title="Open AI Command Terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI CLI</span>
              </button>

              {/* Resume CTA */}
              <button
                id="navbar-resume-btn"
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RESUME</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 px-4 pt-3 pb-6 bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-2.5 rounded-xl font-mono text-sm tracking-wider flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  id="mobile-terminal-launcher-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                >
                  <Terminal className="w-4 h-4" />
                  AI ASSISTANT CLI
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
