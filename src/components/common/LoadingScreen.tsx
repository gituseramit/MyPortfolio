import React, { useEffect, useState } from 'react';
import { soundFx } from '../../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Elegant fast loading sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      soundFx.playStartupChime();
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(onComplete, 300);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      id="system-loading-screen"
      className={`fixed inset-0 z-50 bg-[#060913] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-300 ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6 max-w-xs w-full text-center">
        {/* Monogram Logo */}
        <div className="relative w-16 h-16 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center shadow-xl shadow-cyan-500/10">
          <span className="text-xl font-bold font-display text-white tracking-wider">
            AK
          </span>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950 animate-pulse" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-sm font-bold font-display text-white tracking-wide">
            Amit Keshari
          </h2>
          <p className="text-xs font-mono text-cyan-400">
            AI/ML & Software Engineer
          </p>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-full h-1 rounded-full bg-slate-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
