import React, { useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILLS, TIMELINE } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Sparkles
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playClick();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleDownloadText = () => {
    soundFx.playClick();
    const resumeContent = `
=====================================================
AMIT KESHARI
AI/ML Developer & Software Engineer
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}
=====================================================

EDUCATION:
${PERSONAL_INFO.education}

CORE FOCUS AREAS:
- Artificial Intelligence & Machine Learning
- Retrieval-Augmented Generation (RAG) & Vector Search
- Full-Stack Web Engineering (React, TypeScript, FastAPI, PostgreSQL)
- Cloud Infrastructure (Docker, Azure, Neon, Redis)

KEY PROJECTS:
1. Nexus RAG: High-throughput semantic retrieval engine with pgvector, Redis, and FastAPI.
2. Hotel Management System: Dynamic QR-based billing, express digital checkout & occupancy matrix.
3. GST Billing Software: Automated multi-slab GST invoicing and financial ledger system.
4. Disease Prediction Application: Machine learning multi-condition clinical diagnostics system.

KEY SKILLS:
Python, PyTorch, Scikit-Learn, LangChain, pgvector, React, TypeScript, FastAPI, PostgreSQL, Redis, Docker, Azure, Git.
=====================================================
`;
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Amit_Keshari_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="resume-modal-container"
        className="relative w-full max-w-4xl my-auto rounded-2xl glass-panel border border-cyan-500/40 p-6 sm:p-10 shadow-2xl bg-slate-950/95 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <FileText className="w-4 h-4" />
            <span>Amit Keshari • Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-print-action-btn"
              onClick={handlePrint}
              onMouseEnter={() => soundFx.playHover()}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Print Resume"
              aria-label="Print Resume"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              id="resume-download-action-btn"
              onClick={handleDownloadText}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-sm shadow-cyan-500/30 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Resume (.txt)</span>
            </button>

            <button
              id="close-resume-modal-btn"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Resume Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div id="printable-resume-sheet" className="space-y-8 relative z-10 text-left">
          
          {/* Header Contact Strip */}
          <div className="border-b border-slate-800/80 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold font-display text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-mono text-cyan-400 mt-0.5">
                  {PERSONAL_INFO.title}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-300">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-cyan-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4" />
              Education & Specialization
            </h2>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Bachelor of Technology in Computer Science & Engineering
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    Specialization in Artificial Intelligence & Machine Learning
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  2022 - PRESENT
                </span>
              </div>
            </div>
          </div>

          {/* Key Featured Projects in CV */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-3">
              <Code2 className="w-4 h-4" />
              Featured Projects
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                      {proj.title}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                        {proj.category.toUpperCase()}
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mb-2.5 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Arsenal */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" />
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">AI / ML & NLP:</span>
                <span className="text-slate-300">
                  Python, PyTorch, Scikit-Learn, RAG Systems, Embeddings, pgvector, Vector Search, LangChain
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">FULL-STACK & BACKEND:</span>
                <span className="text-slate-300">
                  React, TypeScript, JavaScript, FastAPI, Node.js, Express, REST APIs, Tailwind CSS
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">DATABASES & CACHING:</span>
                <span className="text-slate-300">
                  PostgreSQL, Redis, Neon Serverless, Firebase Firestore, Upstash
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">DEVOPS & CLOUD:</span>
                <span className="text-slate-300">
                  Docker, Git & GitHub, Azure Cloud, Render, Vercel CI/CD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
