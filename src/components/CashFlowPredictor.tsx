import React from 'react';
import { CashFlowForecastPoint, PersonaType } from '../types';
import { PERSONA_PROFILES } from '../data/mockData';
import { getTranslation } from '../utils/i18n';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { TrendingUp, AlertTriangle, Calendar, ArrowRight, ShieldAlert, Sparkles, Activity } from 'lucide-react';

interface CashFlowPredictorProps {
  currentPersona: PersonaType;
  forecastData: CashFlowForecastPoint[];
  language?: string;
}

export const CashFlowPredictor: React.FC<CashFlowPredictorProps> = ({
  currentPersona,
  forecastData,
  language = 'Hinglish',
}) => {
  const profile = PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;
  const lowestPoint = (forecastData && forecastData.length > 0) ? forecastData.reduce((prev, curr) => (curr.projectedBalance < prev.projectedBalance ? curr : prev), forecastData[0]) : null;
  const safeThreshold = Math.round(profile.monthlyAverageExpense * 0.25); // 25% of monthly expense as warning mark

  const upcomingBills = (forecastData || []).filter((f) => f.note);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0a0e17] border border-[#182030] rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">{getTranslation(language, 'predictiveTitle')}</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              30-Day Forecast
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {getTranslation(language, 'predictiveSubtitle')}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-[#060910] px-3.5 py-2 rounded-xl border border-[#182030]">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{getTranslation(language, 'lowWaterMark')}</span>
            <span className={`text-sm font-black ${lowestPoint?.projectedBalance < safeThreshold ? 'text-amber-400' : 'text-emerald-400'}`}>
              ₹{lowestPoint?.projectedBalance.toLocaleString('en-IN')} ({lowestPoint?.dayLabel})
            </span>
          </div>

          <div className="bg-[#060910] px-3.5 py-2 rounded-xl border border-[#182030]">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Volatility Index</span>
            <span className="text-sm font-black text-indigo-400">
              {currentPersona === 'gig_worker' ? 'High (Variable)' : currentPersona === 'student' ? 'Moderate' : 'Stable'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Projected Liquidity Trajectory (INR)
          </h3>
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400 mr-1.5"></span>
              Projected Balance
            </span>
            <span className="flex items-center">
              <span className="w-3 h-0.5 bg-amber-400 mr-1.5"></span>
              Safe Buffer Threshold (₹{safeThreshold.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="dayLabel" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as CashFlowForecastPoint;
                    return (
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-slate-200">{data.dayLabel} ({data.date})</p>
                        <p className="text-emerald-400 font-extrabold text-sm">
                          Balance: ₹{data.projectedBalance.toLocaleString('en-IN')}
                        </p>
                        {data.income > 0 && <p className="text-emerald-300">Income: +₹{data.income.toLocaleString('en-IN')}</p>}
                        {data.expenses > 0 && <p className="text-rose-400">Expense: -₹{data.expenses.toLocaleString('en-IN')}</p>}
                        {data.note && <p className="text-amber-300 italic text-[11px] pt-1 border-t border-slate-800">Note: {data.note}</p>}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={safeThreshold} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Buffer Limit', fill: '#f59e0b', fontSize: 10 }} />
              <Area
                type="monotone"
                dataKey="projectedBalance"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#balanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Warnings & Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Low-Water Alert Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-amber-400">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-bold text-slate-100">Low-Water Mark Radar</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your lowest forecasted liquidity will touch <span className="font-bold text-amber-300">₹{lowestPoint?.projectedBalance.toLocaleString('en-IN')}</span> on <span className="underline">{lowestPoint?.dayLabel}</span>.
          </p>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200/90 space-y-1">
            <span className="font-bold flex items-center text-amber-400">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> MapMyMoney AI Mitigation Advice:
            </span>
            <p className="text-[11px] leading-normal">
              {currentPersona === 'student'
                ? 'Clear Simpl BNPL bill (₹420) 2 days early to avoid low-water mark on 30th July before your allowance.'
                : currentPersona === 'gig_worker'
                ? 'Monsoon order drops predicted. Complete 6 extra delivery orders during weekend peak hours to add a ₹1,200 cushion.'
                : 'CRED credit card bill due on 31st July. Pay using liquid salary buffer on 1st August to maintain zero penalty.'}
            </p>
          </div>
        </div>

        {/* Upcoming Auto-Debits & Income Timeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-100">Upcoming Cash Events Timeline</h3>
            </div>
            <span className="text-[10px] text-slate-500">Auto-Detected</span>
          </div>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
            {upcomingBills.map((event, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold">
                    {event.dayLabel}
                  </span>
                  <div>
                    <p className="font-bold text-slate-200">{event.note}</p>
                    <span className="text-[10px] text-slate-500">Predicted Balance: ₹{event.projectedBalance.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <span
                  className={`font-bold ${
                    event.income > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {event.income > 0 ? `+₹${event.income}` : `-₹${event.expenses}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
