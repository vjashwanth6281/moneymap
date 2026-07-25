import React, { useState } from 'react';
import { FinancialIdentityData, PersonaType } from '../types';
import { PERSONA_PROFILES, PersonaProfile } from '../data/mockData';
import { getTranslation } from '../utils/i18n';
import { QrCode, ShieldCheck, Download, Share2, Check, FileCode, Award, UserCheck, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface FinancialIdentityProps {
  currentPersona: PersonaType;
  customProfile: PersonaProfile | null;
  identity: FinancialIdentityData;
  language?: string;
}

export const FinancialIdentity: React.FC<FinancialIdentityProps> = ({
  currentPersona,
  customProfile,
  identity,
  language = 'Hinglish',
}) => {
  const activeProfile = (currentPersona === 'custom_user' && customProfile) ? customProfile : PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;
  const [copied, setCopied] = useState(false);

  const chartData = [
    { name: 'Income', value: activeProfile.monthlyAverageIncome, color: '#10b981' }, // Emerald 500
    { name: 'Expenses', value: activeProfile.monthlyAverageExpense, color: '#f59e0b' }, // Amber 500
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://mapmymoney.in/passport/${identity.passportId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(identity, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MapMyMoney_Passport_${identity.passportId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# MapMyMoney Portable Financial Identity Passport
**Passport ID:** ${identity.passportId}
**User Name:** ${identity.userName}
**Role / Persona:** ${activeProfile.role}
**Health Pulse Score:** ${identity.healthScore}/100
**Income Stability Index:** ${identity.incomeStabilityIndex}
**Emergency Buffer Days:** ${identity.emergencyBufferDays} days
**Clean Repayment History:** ${identity.cleanRepaymentHistoryMonths} months

## Verified Badges
${identity.verifiedBadges.map(b => `- ${b}`).join('\n')}

---
*Generated via MapMyMoney — Intelligent Financial Operating System for India's Young Workforce*
`;
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(mdContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MapMyMoney_Passport_${identity.passportId}.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-[#101622] border border-[#1e2738] rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">MapMyMoney Financial Passport</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Verifiable Passport
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            When changing gig platforms or switching jobs, your financial reputation shouldn't reset. This verifiable passport travels with you.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={handleDownloadJson}
            className="flex items-center space-x-1.5 bg-[#172030] hover:bg-[#1e293d] text-slate-200 border border-[#253248] font-semibold px-3 py-2 rounded-xl text-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center space-x-1.5 bg-[#172030] hover:bg-[#1e293d] text-slate-200 border border-[#253248] font-semibold px-3 py-2 rounded-xl text-xs transition-all"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export MD</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Link' : 'Share Passport'}</span>
          </button>
        </div>
      </div>

      {/* Main Passport Identity Visual Card */}
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#0e131d] via-[#111723] to-[#0e1d1a] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        {/* Subtle Watermark BG */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
          <ShieldCheck className="w-72 h-72 text-emerald-400" />
        </div>

        {/* Card Header */}
        <div className="flex items-start justify-between border-b border-[#1e2738] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-black text-black text-xl">
              {identity.userName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">{identity.userName}</h3>
              <p className="text-xs text-slate-400">{activeProfile.role}</p>
              <p className="text-[10px] text-slate-500 flex items-center mt-0.5">
                <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                Issued: {identity.issueDate} • {identity.location}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
              Verified MapMyMoney ID
            </span>
            <span className="text-[10px] text-slate-400 block font-mono mt-1">{identity.passportId}</span>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#0a0d14] p-3 rounded-2xl border border-[#1e2738] text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Health Pulse</span>
            <span className="text-lg font-black text-emerald-400">{identity.healthScore}/100</span>
          </div>

          <div className="bg-[#0a0d14] p-3 rounded-2xl border border-[#1e2738] text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Emergency Buffer</span>
            <span className="text-lg font-black text-white">{identity.emergencyBufferDays} Days</span>
          </div>

          <div className="bg-[#0a0d14] p-3 rounded-2xl border border-[#1e2738] text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Active Sources</span>
            <span className="text-lg font-black text-indigo-400">{identity.activePlatformsCount} Accounts</span>
          </div>

          <div className="bg-[#0a0d14] p-3 rounded-2xl border border-[#1e2738] text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Clean Repayment</span>
            <span className="text-lg font-black text-amber-300">{identity.cleanRepaymentHistoryMonths} Months</span>
          </div>
        </div>

        {/* Income vs Expenses Donut Chart */}
        <div className="bg-[#0a0d14] border border-[#1e2738] rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 shrink-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0d14', border: '1px solid #1e2738', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', color: '#f1f5f9' }}
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Net</span>
              <span className="text-xs font-black text-white font-mono">
                ₹{(activeProfile.monthlyAverageIncome - activeProfile.monthlyAverageExpense).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          
          <div className="flex-1 w-full space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide border-b border-[#1e2738] pb-2">Cash Flow Balance</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-slate-400">Monthly Income</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">₹{activeProfile.monthlyAverageIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-slate-400">Monthly Expenses</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">₹{activeProfile.monthlyAverageExpense.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 flex items-center">
            <Award className="w-4 h-4 text-emerald-400 mr-1.5" /> Verified Reputation Badges
          </span>
          <div className="flex flex-wrap gap-2">
            {identity.verifiedBadges.map((badge, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-3 py-1 rounded-xl bg-[#0a0d14] text-slate-200 border border-emerald-500/30 flex items-center shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* QR Code & Verification Payload */}
        <div className="bg-[#0a0d14] p-4 rounded-2xl border border-[#1e2738] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-200 block">QR Verification Standard</span>
            <p className="text-[10px] text-slate-400 max-w-xs">
              Scannable by landlords, micro-lenders, or employers for instant health verification without revealing transaction history.
            </p>
          </div>

          <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
            <div className="w-14 h-14 bg-slate-900 rounded flex items-center justify-center text-white">
              <QrCode className="w-11 h-11 text-slate-900 fill-slate-100 bg-white p-0.5 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
