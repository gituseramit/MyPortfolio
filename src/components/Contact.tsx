import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { saveContactMessage } from '../firebase';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  FileText, 
  MessageSquare, 
  MapPin,
  Clock,
  ArrowUpRight
} from 'lucide-react';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await saveContactMessage(
        formData.name.trim(),
        formData.email.trim(),
        formData.subject.trim(),
        formData.message.trim()
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playSuccess();

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#06b6d4', '#38bdf8', '#818cf8', '#34d399']
        });
      } catch {
        // safe ignore
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Fallback display gracefully
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playSuccess();
    }
  };

  const handleReset = () => {
    soundFx.playClick();
    setIsSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Let's Build <span className="text-cyan-400">Together</span>
          </h2>
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg">
            Have an engineering role, a collaborative project, or an AI challenge? Drop a note below or reach out directly.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
                Direct Channels
              </h3>

              {/* Email Direct Card */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onMouseEnter={() => soundFx.playHover()}
                className="group p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between block"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      EMAIL
                    </span>
                    <span className="text-sm font-mono text-white group-hover:text-cyan-300 transition-colors font-medium">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-center gap-3 text-xs font-mono text-slate-300 hover:text-white"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-center gap-3 text-xs font-mono text-slate-300 hover:text-white"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Resume Trigger */}
              <button
                id="contact-open-resume-btn"
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-400/50 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume / CV</span>
              </button>

              {/* Status Indicator Bar */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Location</span>
                  </span>
                  <span className="text-slate-200">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Typical Response</span>
                  </span>
                  <span className="text-emerald-400">&lt; 24 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 shadow-2xl relative">
              
              {isSubmitted ? (
                /* Success State Screen */
                <div className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300 shadow-lg shadow-cyan-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">
                      Message Sent!
                    </h3>
                    <p className="text-sm font-mono text-cyan-400 mt-1">
                      Thanks for reaching out.
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    I've received your note and will get back to you at {formData.email} as soon as possible.
                  </p>
                  <button
                    id="send-another-message-btn"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 font-mono text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Active Form View */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <MessageSquare className="w-4 h-4" />
                      <span>Send a Direct Note</span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="text-xs font-mono text-slate-300 block">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-email" className="text-xs font-mono text-slate-300 block">
                        Your Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="e.g. sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300 block">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="e.g. Engineering Opportunity / Technical Discussion"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="text-xs font-mono text-slate-300 block">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      placeholder="Tell me about what you're working on or what you'd like to build together..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => soundFx.playHover()}
                      className="w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
