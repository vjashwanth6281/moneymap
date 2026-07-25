import React from 'react';
import { Transaction } from '../types';
import { PersonaProfile } from '../data/mockData';
import { getTranslation } from '../utils/i18n';
import { ShieldCheck, Calendar, ArrowRight, Sparkles, AlertCircle, TrendingUp, TrendingDown, Activity, CheckCircle2, Clock, Landmark, User, FileText, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface DashboardHeroProps {
  profile: PersonaProfile;
  transactions: Transaction[];
  onNavigateTab: (tab: 'dashboard' | 'aggregator' | 'predictive' | 'health' | 'benefits' | 'simulator' | 'identity') => void;
  onOpenAiChat: (initialQuery?: string) => void;
  language?: string;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  profile,
  transactions,
  onNavigateTab,
  onOpenAiChat,
  language = 'Hinglish',
}) => {
  const health = profile.healthScore;
  const healthStatus = health >= 80 ? 'Optimal' : health >= 60 ? 'Resilient' : health >= 40 ? 'Moderate' : 'Critical Risk';
  const healthColor = health >= 80 ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : health >= 60 ? 'text-teal-400 border-teal-500/30 bg-teal-500/10' : 'text-amber-400 border-amber-500/30 bg-amber-500/10';

  // Extract upcoming events
  const lowPoint = profile.cashFlowForecast.find(f => f.isLowWaterMark) || profile.cashFlowForecast[2] || profile.cashFlowForecast[0];
  const upcomingEvents = [
    {
      title: 'Rent & Utility Debit',
      time: 'In 3 days',
      amount: `₹${Math.round(profile.monthlyAverageExpense * 0.4).toLocaleString('en-IN')}`,
      type: 'expense',
      status: 'Scheduled',
    },
    {
      title: 'Monthly Earnings Credit',
      time: 'In 7 days',
      amount: `+₹${profile.monthlyAverageIncome.toLocaleString('en-IN')}`,
      type: 'income',
      status: 'Expected',
    },
    {
      title: 'Emergency Fund Duration',
      time: 'Ongoing',
      amount: `${profile.pillars[0]?.detail.split(' ')[0] || '45'} Days`,
      type: 'buffer',
      status: 'Buffer Active',
    },
  ];

  // Strongest Recommendation
  const topPillar = profile.pillars.find(p => p.status === 'warning' || p.status === 'critical') || profile.pillars[0];
  const topRecommendation = topPillar ? topPillar.impactNote : 'Keep maintaining 30-day liquid emergency reserve.';

  return (
    <div className="space-y-6">
      {/* Hero Section: Financial Health + Today's Recommendation + Next Financial Event */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Box 1: Financial Health Algorithm (4 cols) */}
        <div className="lg:col-span-4 bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Financial Health Algorithm
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
              Protected
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white leading-snug">
              How your Financial Standing is calculated
            </h3>
            <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> 
                <span><strong>Buffer:</strong> Number of days you can survive without new income.</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Debt Drag:</strong> Percentage of monthly inflow going to EMIs and loans.</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Volatility:</strong> Variance in income across consecutive months.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Box 2: Today's Recommendation (4 cols) */}
        <div className="lg:col-span-4 bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Today's Action
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-white leading-snug">
              {topRecommendation}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculated to protect your low-water balance of ₹{lowPoint?.projectedBalance.toLocaleString('en-IN')} over the next 30 days.
            </p>
          </div>

          {/* Quiet AI Quick Actions */}
          <div className="flex items-center gap-1.5 pt-2">
            <button
              onClick={() => onNavigateTab('simulator')}
              className="text-[10px] font-mono font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" /> Simulate
            </button>
            <button
              onClick={() => onOpenAiChat("Can you explain my current financial health and what I should do next?")}
              className="text-[10px] font-mono font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" /> Explain
            </button>
            <button
              onClick={() => onNavigateTab('benefits')}
              className="text-[10px] font-mono font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" /> Match Schemes
            </button>
          </div>
        </div>

        {/* Box 3: Next Financial Event (4 cols) */}
        <div className="lg:col-span-4 bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Next Financial Event
              </span>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
              Timeline
            </span>
          </div>

          <div className="space-y-2">
            {upcomingEvents.map((evt, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-[#06080e] rounded-xl border border-white/[0.06] text-xs">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${evt.type === 'income' ? 'bg-emerald-400' : evt.type === 'expense' ? 'bg-amber-400' : 'bg-indigo-400'}`} />
                  <div>
                    <span className="font-semibold text-slate-200 block">{evt.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{evt.time}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">{evt.amount}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('predictive')}
            className="w-full flex items-center justify-between text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3.5 py-2 rounded-xl transition-all"
          >
            <span>Open Cash Flow Forecast</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Supporting Row: Passport + Recent Activity + Government Subsidies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Passport Preview (5 cols) */}
        <div className="lg:col-span-5 bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Financial Passport
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Holder</span>
              <span className="text-sm font-bold text-white">{profile.name}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{profile.role} • {profile.location}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Passport ID</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{profile.identity.passportId}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-[#06080e] rounded-xl border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 block">Status</span>
              <span className="text-lg font-mono font-bold text-white">Active</span>
            </div>
            <div className="p-3 bg-[#06080e] rounded-xl border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 block">Buffer Duration</span>
              <span className="text-lg font-mono font-bold text-emerald-400">{profile.identity.emergencyBufferDays} Days</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('identity')}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl text-xs border border-white/10 flex items-center justify-center gap-2 transition-all"
          >
            <span>View & Export Passport QR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recent Activity / Stream (7 cols) */}
        <div className="lg:col-span-7 bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Recent Activity
            </h3>
            <button
              onClick={() => onNavigateTab('aggregator')}
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({transactions.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {transactions.length === 0 ? (
            <div className="p-8 text-center bg-[#06080e] rounded-xl border border-dashed border-white/10 space-y-2">
              <p className="text-xs font-semibold text-slate-300">No transactions recorded yet</p>
              <p className="text-[11px] text-slate-400">Add a transaction or parse SMS statement to populate your feed.</p>
              <button
                onClick={() => onNavigateTab('aggregator')}
                className="mt-2 px-3 py-1.5 bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                Add Transaction
              </button>
            </div>
          ) : (
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {transactions.slice(0, 4).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-[#06080e] rounded-xl border border-white/[0.06] hover:border-white/20 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-300'}`}>
                      {tx.type === 'income' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{tx.description}</span>
                      <span className="text-[10px] text-slate-400">{tx.platform} • {tx.date}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
