import React from 'react';
import { LifeScenario } from '../types';
import { PersonaProfile } from '../data/mockData';
import { ArrowRight, CheckCircle2, ShieldCheck, Landmark, Sparkles, TrendingDown, TrendingUp, AlertCircle, Wallet } from 'lucide-react';

interface ChainReactionVisualizerProps {
  profile: PersonaProfile;
  scenario: LifeScenario;
  customIncomeChange: number;
  customExpenseChange: number;
  customOneTime: number;
}

export const ChainReactionVisualizer: React.FC<ChainReactionVisualizerProps> = ({
  profile,
  scenario,
  customIncomeChange,
  customExpenseChange,
  customOneTime,
}) => {
  const currentNetDisposable = profile.monthlyAverageIncome - profile.monthlyAverageExpense;
  const projectedNetDisposable = currentNetDisposable + customIncomeChange - Math.abs(customExpenseChange);
  
  const dailyOutflow = (profile.monthlyAverageExpense + Math.abs(customExpenseChange)) / 30;
  const newEmergencyDays = dailyOutflow > 0 
    ? Math.min(180, Math.round(Math.max(0, profile.monthlyAverageIncome * 0.5 - customOneTime) / dailyOutflow))
    : 30;

  const scoreShift = scenario.impactOnHealthScore;
  const projectedHealthScore = Math.max(10, Math.min(100, profile.healthScore + scoreShift));

  const steps = [
    {
      id: 'step1',
      label: 'Decision',
      subtext: scenario.title,
      badge: customOneTime > 0 ? `-₹${customOneTime.toLocaleString('en-IN')} upfront` : 'Monthly shift',
      icon: Wallet,
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    },
    {
      id: 'step2',
      label: 'Cash Flow',
      subtext: `Net: ₹${projectedNetDisposable.toLocaleString('en-IN')}/mo`,
      badge: projectedNetDisposable >= currentNetDisposable ? `+₹${projectedNetDisposable - currentNetDisposable}` : `-₹${currentNetDisposable - projectedNetDisposable}`,
      icon: projectedNetDisposable >= currentNetDisposable ? TrendingUp : TrendingDown,
      color: projectedNetDisposable >= currentNetDisposable ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
    {
      id: 'step3',
      label: 'Emergency Buffer',
      subtext: `${newEmergencyDays} Days Covered`,
      badge: newEmergencyDays >= 30 ? 'Safe Cushion' : 'Cushion Drain',
      icon: ShieldCheck,
      color: newEmergencyDays >= 30 ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    },
    {
      id: 'step4',
      label: 'Passport Impact',
      subtext: `Score: ${projectedHealthScore}/100`,
      badge: scoreShift >= 0 ? `+${scoreShift} pts` : `${scoreShift} pts`,
      icon: Sparkles,
      color: scoreShift >= 0 ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
    {
      id: 'step5',
      label: 'Subsidies Match',
      subtext: `${profile.schemes.length} Schemes Active`,
      badge: 'Auto-verified',
      icon: Landmark,
      color: 'border-teal-500/40 text-teal-400 bg-teal-500/10',
    },
    {
      id: 'step6',
      label: 'Recommendation',
      subtext: scoreShift >= 0 ? 'Proceed safely' : 'Maintain buffer before commit',
      badge: scoreShift >= 0 ? 'Green Light' : 'Caution',
      icon: scoreShift >= 0 ? CheckCircle2 : AlertCircle,
      color: scoreShift >= 0 ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
  ];

  return (
    <div className="bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Chain Reaction Analysis Flow
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Real-time Decision Propagation
        </span>
      </div>

      {/* Visual Chain Reaction Flow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div key={step.id} className="relative group">
              <div className={`p-3.5 rounded-xl border bg-[#06080e] space-y-2 transition-all hover:border-white/20 ${step.color}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                    0{idx + 1}. {step.label}
                  </span>
                  <IconComp className="w-4 h-4 shrink-0" />
                </div>
                <div className="font-semibold text-white text-xs truncate" title={step.subtext}>
                  {step.subtext}
                </div>
                <div className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/40 border border-white/10">
                  {step.badge}
                </div>
              </div>

              {/* Arrow Connector for Desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
