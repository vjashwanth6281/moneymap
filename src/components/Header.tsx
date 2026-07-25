import React, { useState } from 'react';
import { PersonaType, AppMode } from '../types';
import { PERSONA_PROFILES, PersonaProfile } from '../data/mockData';
import { getTranslation } from '../utils/i18n';
import { ShieldCheck, Sparkles, User, Languages, SlidersHorizontal, X, Code2 } from 'lucide-react';

interface HeaderProps {
  currentPersona: PersonaType;
  customProfile: PersonaProfile | null;
  onSelectPersona: (persona: PersonaType) => void;
  appMode: AppMode;
  onOpenOnboarding: () => void;
  language: string;
  onSelectLanguage: (lang: string) => void;
  onOpenAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  customProfile,
  onSelectPersona,
  appMode,
  onOpenOnboarding,
  language,
  onSelectLanguage,
  onOpenAiChat,
}) => {
  const [showCodeView, setShowCodeView] = useState(false);
  const activeProfile = (currentPersona === 'custom_user' && customProfile) ? customProfile : PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;

  return (
    <header className="bg-[#030509]/90 border-b border-white/[0.08] text-white sticky top-0 z-30 backdrop-blur-xl print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Purpose Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-indigo-500 flex items-center justify-center font-black text-slate-950 text-base shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white">
                MoneyMap
              </h1>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Predictive
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              What happens to my money next?
            </p>
          </div>
        </div>

        {/* Center: Experience Mode & Switcher */}
        <div className="flex items-center bg-[#0a0d14] p-1 rounded-xl border border-white/[0.08] overflow-x-auto max-w-full gap-1">
          <button
            onClick={onOpenOnboarding}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-1 shrink-0"
            title="Click to customize profile or retake questionnaire"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="capitalize">
              {appMode === 'custom' ? getTranslation(language, 'userMode') : appMode === 'demo' ? getTranslation(language, 'demoMode') : getTranslation(language, 'guestMode')}
            </span>
          </button>

          {/* Persona selector tabs */}
          {appMode === 'custom' && customProfile ? (
            <button
              onClick={() => onSelectPersona('custom_user')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>{customProfile.name}</span>
            </button>
          ) : (
            (['student', 'gig_worker', 'first_time_earner'] as PersonaType[]).map((pType) => {
              const p = PERSONA_PROFILES[pType];
              const isSelected = currentPersona === pType;
              return (
                <button
                  key={pType}
                  onClick={() => onSelectPersona(pType)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 whitespace-nowrap ${
                    isSelected
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{p.name.split(' ')[0]}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          {/* Health Score Pill */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#0a0d14] border border-white/[0.08] rounded-xl px-3 py-1 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">{getTranslation(language, 'healthScore')}:</span>
              <span className="font-bold text-white font-mono tabular-nums">{activeProfile.healthScore}/100</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-[#0a0d14] border border-white/[0.08] rounded-xl px-2.5 py-1 text-xs text-slate-300">
            <Languages className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="Hinglish" className="bg-[#0a0d14] text-slate-200">Hinglish</option>
              <option value="English" className="bg-[#0a0d14] text-slate-200">English</option>
              <option value="Hindi" className="bg-[#0a0d14] text-slate-200">Hindi (हिंदी)</option>
            </select>
          </div>

          {/* Code View / Architecture Info Button */}
          <button
            onClick={() => setShowCodeView(true)}
            className="p-1.5 bg-[#0a0d14] hover:bg-white/10 border border-white/[0.08] text-slate-300 hover:text-white rounded-xl transition-colors"
            title="View Code Architecture"
          >
            <Code2 className="w-4 h-4 text-indigo-400" />
          </button>

          {/* AI Advisor Trigger */}
          <button
            onClick={onOpenAiChat}
            className="flex items-center space-x-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span className="hidden sm:inline">{getTranslation(language, 'aiCoachBtn')}</span>
          </button>
        </div>
      </div>

      {/* Code / Architecture Modal */}
      {showCodeView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0b0e17] border border-[#202a3d] rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2436] pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Architecture & Source Code</h3>
              </div>
              <button 
                onClick={() => setShowCodeView(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
              <div className="p-4 bg-[#121824] border border-[#1e283b] rounded-xl space-y-2">
                <div className="font-bold text-emerald-400 text-sm">Frontend (React 19 + TypeScript)</div>
                <p>The client side is an SPA built with Vite. It features a completely responsive, dark-mode focused UI styled precisely with <strong>Tailwind CSS</strong> to ensure a premium, modern aesthetic.</p>
                <p>State is cleanly managed using React Hooks (<code>useState</code>, <code>useEffect</code>). Interactive charts are rendered via <strong>Recharts</strong> for the cash-flow visualizer. Icons are sourced seamlessly from <strong>Lucide React</strong>.</p>
              </div>

              <div className="p-4 bg-[#121824] border border-[#1e283b] rounded-xl space-y-2">
                <div className="font-bold text-indigo-400 text-sm">Backend (Express + Node.js)</div>
                <p>The server runs in a Node environment (CommonJS build) exposing a secure <strong>Express.js</strong> proxy API. This separation keeps API keys safe on the server and allows full-stack workflows.</p>
                <p>Routing sits within <code>server.ts</code>. It parses frontend payloads securely before interfacing with the external AI engine.</p>
              </div>

              <div className="p-4 bg-[#121824] border border-[#1e283b] rounded-xl space-y-2">
                <div className="font-bold text-amber-400 text-sm">Pushing to Git</div>
                <p>To export and save this codebase to your own GitHub repository:</p>
                <ol className="list-decimal pl-4 space-y-1 mt-1 text-slate-400">
                  <li>Click on the <strong>Export</strong> or <strong>Share to GitHub</strong> option in your repository management tool.</li>
                  <li>Follow the OAuth flow to link your GitHub account.</li>
                  <li>Choose to create a new repository or push to an existing one.</li>
                  <li>Your entire full-stack app (including the Vite and Express configuration) will be safely version-controlled!</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowCodeView(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs"
            >
              Close Info
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
