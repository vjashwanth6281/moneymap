import React, { useState } from 'react';
import { LifeScenario, PersonaType } from '../types';
import { PERSONA_PROFILES } from '../data/mockData';
import { getTranslation } from '../utils/i18n';
import { ChainReactionVisualizer } from './ChainReactionVisualizer';
import { Compass, Sparkles, TrendingDown, TrendingUp, AlertTriangle, ArrowRight, Play, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';

interface LifeEventSimulatorProps {
  currentPersona: PersonaType;
  scenarios: LifeScenario[];
  onRunDeepAiSimulation: (scenario: LifeScenario) => Promise<string>;
  language?: string;
}

export const LifeEventSimulator: React.FC<LifeEventSimulatorProps> = ({
  currentPersona,
  scenarios,
  onRunDeepAiSimulation,
  language = 'Hinglish',
}) => {
  const profile = PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;
  const [selectedScenario, setSelectedScenario] = useState<LifeScenario | null>((scenarios && scenarios[0]) || null);
  const [customIncomeChange, setCustomIncomeChange] = useState<number>((scenarios && scenarios[0])?.monthlyIncomeChange || 0);
  const [customExpenseChange, setCustomExpenseChange] = useState<number>((scenarios && scenarios[0])?.monthlyExpenseChange || 0);
  const [customOneTime, setCustomOneTime] = useState<number>((scenarios && scenarios[0])?.oneTimeCost || 0);
  const [deepAnalysisResult, setDeepAnalysisResult] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);

  const activeScenario = selectedScenario || {
    id: 'custom',
    title: 'Custom Financial Decision',
    description: 'Direct parameter sandbox simulation.',
    monthlyIncomeChange: customIncomeChange,
    monthlyExpenseChange: customExpenseChange,
    oneTimeCost: customOneTime,
    impactOnHealthScore: customIncomeChange > customExpenseChange ? 5 : -10,
    newLowWaterMark: profile.monthlyAverageIncome - profile.monthlyAverageExpense + customIncomeChange - customExpenseChange,
    aiAdvice: 'Custom scenario parameters active.',
  };

  const handleSelectScenario = (sc: LifeScenario) => {
    setSelectedScenario(sc);
    setCustomIncomeChange(sc.monthlyIncomeChange);
    setCustomExpenseChange(sc.monthlyExpenseChange);
    setCustomOneTime(sc.oneTimeCost);
    setDeepAnalysisResult('');
  };

  const handleDeepSimulate = async () => {
    setIsSimulating(true);
    const resultText = await onRunDeepAiSimulation(activeScenario);
    setDeepAnalysisResult(resultText);
    setIsSimulating(false);
  };

  // Calculations
  const currentNetDisposable = profile.monthlyAverageIncome - profile.monthlyAverageExpense;
  const projectedNetDisposable = currentNetDisposable + customIncomeChange - Math.abs(customExpenseChange);
  const projectedHealthScore = Math.max(10, Math.min(100, profile.healthScore + activeScenario.impactOnHealthScore));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Future Simulator</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
              Predictive Sandbox
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Test major financial decisions (EV scooter EMI, job switch, rent upgrade) and observe exact chain-reaction outcomes.
          </p>
        </div>

        <button
          onClick={handleDeepSimulate}
          disabled={isSimulating}
          className="flex items-center space-x-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all disabled:opacity-50 shrink-0 shadow-sm"
        >
          {isSimulating ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              <span>Simulating Chain Reaction...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Simulate Decision</span>
            </>
          )}
        </button>
      </div>

      {/* Preset Scenario Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(scenarios || []).map((sc) => {
          const isSelected = selectedScenario?.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2.5 ${
                isSelected
                  ? 'bg-indigo-500/10 border-indigo-500/60 ring-1 ring-indigo-500/30'
                  : 'bg-[#080b12] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-mono font-semibold text-indigo-400 block mb-1">Scenario</span>
                <h3 className="text-xs font-bold text-white">{sc.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{sc.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px]">
                <span className="text-slate-400">Health Impact:</span>
                <span className={`font-mono font-bold ${sc.impactOnHealthScore >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {sc.impactOnHealthScore >= 0 ? `+${sc.impactOnHealthScore}` : sc.impactOnHealthScore} pts
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Chain Reaction Visualizer */}
      <ChainReactionVisualizer
        profile={profile}
        scenario={activeScenario}
        customIncomeChange={customIncomeChange}
        customExpenseChange={customExpenseChange}
        customOneTime={customOneTime}
      />

      {/* Interactive Controls & Real-time Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders / Inputs Box (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Scenario Parameters</span>
            <span className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">Live Controls</span>
          </h3>

          {/* Income Change Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-400 font-medium">Monthly Income Shift</label>
              <span className={`font-mono font-bold ${customIncomeChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {customIncomeChange >= 0 ? `+₹${customIncomeChange.toLocaleString('en-IN')}` : `-₹${Math.abs(customIncomeChange).toLocaleString('en-IN')}`}
              </span>
            </div>
            <input
              type="range"
              min="-15000"
              max="25000"
              step="500"
              value={customIncomeChange}
              onChange={(e) => setCustomIncomeChange(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Expense Change Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-400 font-medium">Monthly Expense Shift (e.g. Rent/EMI)</label>
              <span className={`font-mono font-bold ${customExpenseChange <= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {customExpenseChange < 0 ? `-₹${Math.abs(customExpenseChange).toLocaleString('en-IN')}` : `+₹${customExpenseChange.toLocaleString('en-IN')}`}
              </span>
            </div>
            <input
              type="range"
              min="-15000"
              max="10000"
              step="500"
              value={customExpenseChange}
              onChange={(e) => setCustomExpenseChange(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* One Time Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-400 font-medium">Upfront Down-payment</label>
              <span className="font-mono font-bold text-amber-300">₹{customOneTime.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={customOneTime}
              onChange={(e) => setCustomOneTime(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Comparison Preview (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Baseline vs. Simulated Outcome</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Before Box */}
            <div className="bg-[#06080e] p-4 rounded-xl border border-white/[0.08] space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Baseline</span>
              <div>
                <span className="text-[10px] text-slate-400 block">Monthly Disposable</span>
                <span className="text-base font-bold text-slate-200 font-mono tabular-nums">₹{currentNetDisposable.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Financial Standing</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{profile.healthScore}/100</span>
              </div>
            </div>

            {/* After Box */}
            <div className="bg-[#06080e] p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-[10px] text-emerald-400 uppercase font-mono block">Post-Decision</span>
              <div>
                <span className="text-[10px] text-slate-400 block">New Disposable</span>
                <span className={`text-base font-bold font-mono tabular-nums ${projectedNetDisposable >= currentNetDisposable ? 'text-emerald-400' : 'text-amber-400'}`}>
                  ₹{projectedNetDisposable.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">New Financial Standing</span>
                <span className={`text-sm font-bold font-mono ${projectedHealthScore >= profile.healthScore ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {projectedHealthScore}/100
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#06080e] border border-white/[0.08] rounded-xl p-3 text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" /> Key Recommendation:
            </span>
            <p className="text-xs leading-relaxed text-slate-300">{activeScenario.aiAdvice}</p>
          </div>
        </div>
      </div>

      {/* Reasoning Analysis Block */}
      {deepAnalysisResult && (
        <div className="bg-[#0a0d14] border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 border-b border-white/[0.08] pb-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Chain-Reaction Reasoning Output</h3>
          </div>

          <div className="prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed whitespace-pre-line font-mono">
            {deepAnalysisResult}
          </div>
        </div>
      )}
    </div>
  );
};
