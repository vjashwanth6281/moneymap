import React from 'react';
import { HealthPillar, PersonaType } from '../types';
import { PERSONA_PROFILES } from '../data/mockData';
import { getTranslation } from '../utils/i18n';
import { ShieldCheck, Zap, AlertTriangle, CheckCircle, ArrowUpRight, Flame, Lock } from 'lucide-react';

interface HealthScoreProps {
  currentPersona: PersonaType;
  pillars: HealthPillar[];
  healthScore: number;
  language?: string;
}

export const HealthScore: React.FC<HealthScoreProps> = ({
  currentPersona,
  pillars,
  healthScore,
  language = 'Hinglish',
}) => {
  const profile = PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;

  const getPillarColor = (status: HealthPillar['status']) => {
    switch (status) {
      case 'optimal': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'critical': default: return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Pulse Hero Card */}
      <div className="bg-[#0a0e17] border border-[#182030] rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>{getTranslation(language, 'healthTitle')}</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Health Pulse: <span className="text-emerald-400">{healthScore}/100</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {getTranslation(language, 'healthSubtitle')}
          </p>
        </div>

        {/* Score Ring / Gauge Representation */}
        <div className="relative shrink-0 flex flex-col items-center justify-center bg-[#060910] p-6 rounded-2xl border border-[#182030] w-full lg:w-64 text-center">
          <div className="text-5xl font-black bg-gradient-to-tr from-emerald-400 to-teal-200 bg-clip-text text-transparent">
            {healthScore}
          </div>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">
            {healthScore >= 80 ? 'Tier 1: Excellent' : healthScore >= 65 ? 'Tier 2: Resilient' : 'Tier 3: At Risk'}
          </span>
          <div className="w-full bg-[#141c2c] h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-500"
              style={{ width: `${healthScore}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-500 mt-2">Travels with {profile.name.split(' ')[0]} across jobs</span>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPillarColor(pillar.status)}`}>
                  {pillar.status}
                </span>
                <span className="text-sm font-black text-slate-100">{pillar.score}/{pillar.maxScore}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200">{pillar.name}</h3>
              <p className="text-xs text-slate-400 leading-normal">{pillar.detail}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 font-medium flex items-center">
              <Zap className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0" />
              <span>{pillar.impactNote}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Boosters Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">1-Click Health Boosters</h3>
          </div>
          <span className="text-xs text-slate-400">Recommended for {profile.role}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">+4 Pts Score Boost</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-200">Cancel Unused Subscriptions</h4>
            <p className="text-[11px] text-slate-400">
              Cut 1 idle auto-debit to lower Subscription Drag below 3% of income.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">+6 Pts Score Boost</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-200">Enroll in e-Shram / PMSBY Cover</h4>
            <p className="text-[11px] text-slate-400">
              Get ₹2 Lakh accidental insurance shield for ₹20/year to lock Emergency Buffer.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">+8 Pts Score Boost</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-bold text-slate-200">Zero BNPL Rollover</h4>
            <p className="text-[11px] text-slate-400">
              Repay Simpl / Amazon Pay Later 3 days before due date to build clean 12-month credit history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
