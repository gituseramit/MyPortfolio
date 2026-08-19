import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/common/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';
import { BackgroundParticles } from './components/three/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { TerminalAssistant } from './components/TerminalAssistant';
import { Footer } from './components/Footer';
import { testFirestoreConnection } from './firebase';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    testFirestoreConnection();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Loading Sequence */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Futuristic Custom Cursor */}
      <CustomCursor />

      {/* Cyber Ambient Dust Particles Canvas */}
      <BackgroundParticles />

      {/* Floating HUD Navbar */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Command Center Content */}
      <main className="relative z-10">
        {/* Hero Section with 3D Neural Core */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Cyber Metric Stats HUD */}
        <Stats />

        {/* About Section */}
        <About onOpenResume={() => setIsResumeOpen(true)} />

        {/* Technology Arsenal */}
        <Skills />

        {/* Selected Projects (Grid + 3D Ecosystem) */}
        <Projects />

        {/* My Journey Timeline */}
        <Journey />

        {/* Contact Section */}
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Futuristic Footer */}
      <Footer />

      {/* Digital Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Interactive AI Terminal Assistant CLI */}
      <TerminalAssistant
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
