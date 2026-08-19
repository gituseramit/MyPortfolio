import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { 
  Sparkles, 
  BrainCircuit, 
  Calculator, 
  Activity, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Search, 
  Database,
  Layers,
  Code2
} from 'lucide-react';

export const EngineeringLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'gst' | 'ml'>('rag');

  // RAG Simulator State
  const [ragQuery, setRagQuery] = useState('How does Nexus RAG achieve sub-85ms vector search?');
  const [isRagRunning, setIsRagRunning] = useState(false);
  const [ragStep, setRagStep] = useState<number>(0);

  // GST Simulator State
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInterState, setIsInterState] = useState<boolean>(false);

  // ML Predictor State
  const [glucose, setGlucose] = useState<number>(115);
  const [bloodPressure, setBloodPressure] = useState<number>(78);
  const [bmi, setBmi] = useState<number>(24.5);
  const [age, setAge] = useState<number>(32);

  // Run RAG Simulation
  const handleRunRag = () => {
    soundFx.playClick();
    setIsRagRunning(true);
    setRagStep(1);

    setTimeout(() => {
      setRagStep(2);
      soundFx.playHover();
    }, 450);

    setTimeout(() => {
      setRagStep(3);
      soundFx.playHover();
    }, 900);

    setTimeout(() => {
      setRagStep(4);
      setIsRagRunning(false);
      soundFx.playSuccess();
    }, 1400);
  };

  // GST Calculations
  const calculatedTax = (gstAmount * gstRate) / 100;
  const totalAmount = gstAmount + calculatedTax;
  const cgst = calculatedTax / 2;
  const sgst = calculatedTax / 2;

  // ML Risk Calculation
  const riskScore = Math.min(
    95,
    Math.max(
      5,
      Math.round(
        (glucose > 130 ? 35 : glucose > 100 ? 15 : 5) +
        (bloodPressure > 85 ? 25 : bloodPressure > 75 ? 12 : 5) +
        (bmi > 28 ? 25 : bmi > 24 ? 12 : 5) +
        (age > 45 ? 15 : 5)
      )
    )
  );

  return (
    <section id="interactive-lab" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE ENGINEERING LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              Test My <span className="text-cyan-400">Architectures Live</span>
            </h2>
            <p className="text-slate-300 max-w-xl text-base">
              Try simulated live instances of the algorithms and architectural logic powering my flagship projects.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex flex-wrap p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('rag');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'rag'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>RAG Retrieval</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('gst');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'gst'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>GST Engine</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('ml');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'ml'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>ML Classifier</span>
            </button>
          </div>
        </div>

        {/* Tab 1: RAG Simulator */}
        {activeTab === 'rag' && (
          <div className="p-6 sm:p-10 rounded-2xl glass-panel-glow border border-cyan-500/30 bg-slate-950/80 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  Nexus RAG Multi-Stage Retrieval Simulator
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Simulating Dense Vector Search (pgvector) + Sparse BM25 + Cross-Encoder Re-ranking
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                BENCHMARK: SUB-85MS
              </span>
            </div>

            {/* Input & Query Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-300 block">
                TEST QUERY OR SELECT SAMPLE:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleRunRag}
                  disabled={isRagRunning}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRagRunning ? 'EXECUTING PIPELINE...' : 'RUN PIPELINE'}</span>
                </button>
              </div>

              {/* Sample Queries */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'How does Nexus RAG achieve sub-85ms vector search?',
                  'What chunking strategy prevents context fragmentation?',
                  'How does the Redis semantic cache reduce LLM cost?'
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      soundFx.playClick();
                      setRagQuery(q);
                    }}
                    className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                  >
                    "{q.slice(0, 42)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Stage Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Stage 1 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  ragStep >= 1
                    ? 'bg-slate-900 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                  <span>STAGE 1: EMBED</span>
                  {ragStep >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Vector Encoding</h4>
                <p className="text-xs text-slate-400">
                  Query converted to 1536-dim dense float embedding.
                </p>
                <div className="mt-3 text-[10px] font-mono text-cyan-300/80 bg-slate-950 p-2 rounded">
                  [0.024, -0.081, 0.142, ...]
                </div>
              </div>

              {/* Stage 2 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  ragStep >= 2
                    ? 'bg-slate-900 border-sky-500/60 shadow-md shadow-sky-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-sky-400 mb-2">
                  <span>STAGE 2: HYBRID</span>
                  {ragStep >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">pgvector + BM25</h4>
                <p className="text-xs text-slate-400">
                  IVFFlat index search retrieves top 20 candidate chunks in 32ms.
                </p>
                <div className="mt-3 text-[10px] font-mono text-sky-300/80 bg-slate-950 p-2 rounded">
                  Cosine Match: 0.942
                </div>
              </div>

              {/* Stage 3 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  ragStep >= 3
                    ? 'bg-slate-900 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-indigo-400 mb-2">
                  <span>STAGE 3: RE-RANK</span>
                  {ragStep >= 3 && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Cross-Encoder</h4>
                <p className="text-xs text-slate-400">
                  RRF re-ranking isolates the top 3 highest-signal contextual chunks.
                </p>
                <div className="mt-3 text-[10px] font-mono text-indigo-300/80 bg-slate-950 p-2 rounded">
                  Re-rank Score: 0.984
                </div>
              </div>

              {/* Stage 4 */}
              <div
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  ragStep >= 4
                    ? 'bg-slate-900 border-emerald-500/60 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                  <span>STAGE 4: SYNTHESIS</span>
                  {ragStep >= 4 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Grounded Output</h4>
                <p className="text-xs text-slate-400">
                  Streamed zero-hallucination response with verbatim source citations.
                </p>
                <div className="mt-3 text-[10px] font-mono text-emerald-300/80 bg-slate-950 p-2 rounded">
                  Latency: 64ms total
                </div>
              </div>
            </div>

            {/* Answer Display */}
            {ragStep >= 4 && (
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    GENERATED GROUNDED ANSWER
                  </span>
                  <span>CONFIDENCE: 99.1%</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  Nexus RAG achieves sub-85ms vector search through a layered optimization pipeline: Redis caches frequent semantic query embeddings, PostgreSQL pgvector utilizes tuned IVFFlat indexing with inverted file lists, and FastAPI handles async non-blocking retrieval before cross-encoder filtering.
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-400">
                  <span>SOURCES:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[10px]">
                    nexus_architecture.md#sec-3
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[10px]">
                    pgvector_indexes.sql
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: GST Tax Engine Simulator */}
        {activeTab === 'gst' && (
          <div className="p-6 sm:p-10 rounded-2xl glass-panel-glow border border-cyan-500/30 bg-slate-950/80 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  GST Billing High-Precision Decimal Math Simulator
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Simulating automated multi-slab tax bifurcation (CGST + SGST vs IGST)
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                PRECISION: 100.00%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Controls */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>BASE TAXABLE AMOUNT (₹)</span>
                    <span className="text-cyan-400 font-bold">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={gstAmount}
                    onChange={(e) => {
                      soundFx.playHover();
                      setGstAmount(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400 bg-slate-800"
                  />
                </div>

                {/* Tax Slab Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 block">
                    GST TAX SLAB
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 12, 18, 28].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          soundFx.playClick();
                          setGstRate(rate);
                        }}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          gstRate === rate
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inter vs Intra State Toggle */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-white block">SUPPLY REGION</span>
                    <span className="text-[11px] text-slate-400">
                      {isInterState ? 'Inter-State (IGST 100%)' : 'Intra-State (CGST 50% + SGST 50%)'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setIsInterState(!isInterState);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                      isInterState
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    {isInterState ? 'INTER-STATE' : 'INTRA-STATE'}
                  </button>
                </div>
              </div>

              {/* Real-time Invoice Breakdown Card */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-400">INVOICE LEDGER BREAKDOWN</span>
                  <span className="text-cyan-400">TAX INVOICE #2026-0042</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Taxable Base Value:</span>
                    <span className="text-white font-bold">₹{gstAmount.toFixed(2)}</span>
                  </div>

                  {isInterState ? (
                    <div className="flex justify-between text-indigo-300">
                      <span>IGST ({gstRate}%):</span>
                      <span className="font-bold">+ ₹{calculatedTax.toFixed(2)}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-cyan-300">
                        <span>CGST ({gstRate / 2}%):</span>
                        <span className="font-bold">+ ₹{cgst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sky-300">
                        <span>SGST ({gstRate / 2}%):</span>
                        <span className="font-bold">+ ₹{sgst.toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                    <span>Total Tax Liability:</span>
                    <span className="text-white font-semibold">₹{calculatedTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center text-sm font-bold">
                  <span className="text-white">GRAND TOTAL INVOICE:</span>
                  <span className="text-emerald-400 text-base">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ML Disease Classifier Simulator */}
        {activeTab === 'ml' && (
          <div className="p-6 sm:p-10 rounded-2xl glass-panel-glow border border-cyan-500/30 bg-slate-950/80 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Multi-Model Clinical Risk Assessment Simulator
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Simulating Random Forest & XGBoost Ensemble with SHAP Feature Weights
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                AUC-ROC: 0.97
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sliders */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>FASTING GLUCOSE LEVEL</span>
                    <span className="text-cyan-400 font-bold">{glucose} mg/dL</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="200"
                    value={glucose}
                    onChange={(e) => {
                      soundFx.playHover();
                      setGlucose(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400 bg-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>DIASTOLIC BLOOD PRESSURE</span>
                    <span className="text-sky-400 font-bold">{bloodPressure} mmHg</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="120"
                    value={bloodPressure}
                    onChange={(e) => {
                      soundFx.playHover();
                      setBloodPressure(Number(e.target.value));
                    }}
                    className="w-full accent-sky-400 bg-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>BODY MASS INDEX (BMI)</span>
                    <span className="text-indigo-400 font-bold">{bmi}</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="40"
                    step="0.5"
                    value={bmi}
                    onChange={(e) => {
                      soundFx.playHover();
                      setBmi(Number(e.target.value));
                    }}
                    className="w-full accent-indigo-400 bg-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>PATIENT AGE</span>
                    <span className="text-emerald-400 font-bold">{age} Years</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={age}
                    onChange={(e) => {
                      soundFx.playHover();
                      setAge(Number(e.target.value));
                    }}
                    className="w-full accent-emerald-400 bg-slate-800"
                  />
                </div>
              </div>

              {/* Output Score Card */}
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-mono text-slate-400">ENSEMBLE RISK PROBABILITY</span>
                    <span className="text-xs font-mono text-cyan-400">INFERENCE: 38ms</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-5xl font-bold font-display ${
                      riskScore > 60 ? 'text-rose-400' : riskScore > 30 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {riskScore}%
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {riskScore > 60 ? 'ELEVATED RISK' : riskScore > 30 ? 'MODERATE RISK' : 'LOW RISK PROFILE'}
                    </span>
                  </div>

                  {/* Progress Meter */}
                  <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden mb-4">
                    <div
                      className={`h-full transition-all duration-300 ${
                        riskScore > 60
                          ? 'bg-rose-500'
                          : riskScore > 30
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${riskScore}%` }}
                    />
                  </div>

                  {/* Top Contributing Feature Factors (SHAP) */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <span className="text-slate-400 text-[10px] block">SHAP FEATURE IMPORTANCE:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {glucose > 100 && (
                        <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800 text-[10px]">
                          + Glucose (+{(glucose - 100) * 0.4}%)
                        </span>
                      )}
                      {bloodPressure > 80 && (
                        <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800 text-[10px]">
                          + Blood Pressure (+{(bloodPressure - 80) * 0.3}%)
                        </span>
                      )}
                      {bmi > 25 && (
                        <span className="px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800 text-[10px]">
                          + BMI Factor (+{(bmi - 25) * 0.5}%)
                        </span>
                      )}
                      {glucose <= 100 && bloodPressure <= 80 && bmi <= 25 && (
                        <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px]">
                          All Vital Biometrics in Optimal Range
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800">
                  Model uses ONNX Runtime in FastAPI for real-time sub-50ms diagnostic scoring.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
