import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILLS } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { 
  Terminal as TerminalIcon, 
  X, 
  Send
} from 'lucide-react';

interface TerminalAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'system' | 'user' | 'assistant';
  text: string;
  timestamp: string;
  isCode?: boolean;
}

export const TerminalAssistant: React.FC<TerminalAssistantProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      text: 'Hi! Ask me anything about Amit\'s projects, ML architecture, tech stack, or engineering background. You can also try commands like "about", "projects", or "contact".',
      timestamp: 'NOW'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    soundFx.playClick();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Append user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Process command / query
    const lower = trimmed.toLowerCase();
    let responseText = '';

    if (lower === 'help') {
      responseText = `Available Commands:
- "about": Overview of Amit's engineering background & values
- "projects": Deep dive into flagship projects (Nexus RAG, Hotel PMS, GST software)
- "skills": Core AI/ML, Full-Stack & Cloud tech stack
- "rag": How Amit builds low-latency RAG systems with pgvector
- "contact": How to reach out directly
- "clear": Clears the terminal screen`;
    } else if (lower === 'clear') {
      setMessages([]);
      return;
    } else if (lower.includes('about') || lower.includes('who')) {
      responseText = `Amit Keshari is a B.Tech Computer Science student specializing in Artificial Intelligence & Machine Learning. He builds high-performance applications combining AI models, RAG systems, and full-stack engineering.`;
    } else if (lower.includes('project') || lower.includes('work')) {
      responseText = `Key Projects built by Amit:
1. Nexus RAG: High-throughput Retrieval-Augmented Generation system with pgvector, Redis & FastAPI.
2. Hotel Management System: Dynamic QR checkout, billing engine & occupancy state matrix.
3. GST Billing Software: Automated multi-tier GST tax calculator, invoice PDF generator & ledger system.
4. Disease Prediction Application: Multi-model ML diagnostic ensemble (Random Forest, XGBoost).`;
    } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
      responseText = `Amit's Core Tech Stack:
• AI/ML: Python, PyTorch, Scikit-Learn, RAG Systems, Embeddings, Vector Search, LangChain
• Development: React, TypeScript, JavaScript, FastAPI, Node.js, REST APIs, Tailwind CSS
• Databases & Cloud: PostgreSQL, pgvector, Redis, Docker, Azure, Neon, Upstash, Render, Vercel`;
    } else if (lower.includes('rag') || lower.includes('vector') || lower.includes('retrieval')) {
      responseText = `Amit specializes in RAG architectures, including hybrid sparse-dense retrieval (BM25 + pgvector embeddings), reciprocal rank fusion (RRF), cross-encoder re-ranking, and dynamic context condensation for sub-100ms LLM applications.`;
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
      responseText = `Connect with Amit Keshari:
• Email: ${PERSONAL_INFO.email}
• Status: Available for AI/ML and Software Engineering roles & collaborations
• Location: ${PERSONAL_INFO.location}`;
    } else {
      responseText = `Thanks for asking about "${trimmed}"! Amit is an AI/ML developer specializing in RAG systems, deep learning, and full-stack software. Feel free to type "projects", "skills", or "contact" for targeted details.`;
    }

    setTimeout(() => {
      soundFx.playHover();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 250);
  };

  return (
    <div
      id="ai-terminal-assistant-modal"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[460px] h-[520px] rounded-2xl glass-panel border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden bg-slate-950/95 animate-in slide-in-from-bottom-6 duration-200"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            Quick Interactive Assistant
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Commands */}
      <div className="px-3 py-2 bg-slate-950/90 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
        <span className="text-slate-400">QUICK:</span>
        {['about', 'projects', 'skills', 'rag', 'contact', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-cyan-950 text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Output Console Log Screen */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs text-slate-200">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col space-y-1 ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span>{m.sender.toUpperCase()}</span>
              <span>•</span>
              <span>{m.timestamp}</span>
            </div>
            <div
              className={`p-3 rounded-xl max-w-[90%] whitespace-pre-wrap leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                  : m.sender === 'system'
                  ? 'bg-slate-900/90 text-cyan-300 border border-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-200 border border-slate-800'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Terminal Input Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
        }}
        className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-cyan-400 font-mono font-bold text-xs">{'>'}</span>
        <input
          type="text"
          placeholder="Ask a question or enter a command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-xs font-mono text-white placeholder-slate-500 focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
          aria-label="Send query"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
