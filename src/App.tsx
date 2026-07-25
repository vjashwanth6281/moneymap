import React, { useState } from 'react';
import { PersonaType, Transaction, GovernmentScheme, LifeScenario, AppMode, QuestionnaireAnswers } from './types';
import { PERSONA_PROFILES, PersonaProfile, generateCustomPersonaProfile } from './data/mockData';
import { Header } from './components/Header';
import { OnboardingModal } from './components/OnboardingModal';
import { DashboardHero } from './components/DashboardHero';
import { PlatformAggregator } from './components/PlatformAggregator';
import { CashFlowPredictor } from './components/CashFlowPredictor';
import { HealthScore } from './components/HealthScore';
import { GovernmentBenefits } from './components/GovernmentBenefits';
import { LifeEventSimulator } from './components/LifeEventSimulator';
import { FinancialIdentity } from './components/FinancialIdentity';
import { FinBotChat } from './components/FinBotChat';
import { getTranslation } from './utils/i18n';
import { Wallet, Activity, ShieldCheck, Landmark, Compass, UserCheck, Sparkles, SlidersHorizontal, Download } from 'lucide-react';

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('demo');
  const [currentPersona, setCurrentPersona] = useState<PersonaType>('gig_worker');
  const [customProfile, setCustomProfile] = useState<PersonaProfile | null>(null);
  const [language, setLanguage] = useState<string>('Hinglish');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'aggregator' | 'predictive' | 'health' | 'benefits' | 'simulator' | 'identity'>('dashboard');

  // Modals
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(true); // Open on initial enter
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState<string | undefined>(undefined);

  // Local state initialized per profile
  const [userTransactions, setUserTransactions] = useState<Record<string, Transaction[]>>({
    student: PERSONA_PROFILES.student.transactions,
    gig_worker: PERSONA_PROFILES.gig_worker.transactions,
    first_time_earner: PERSONA_PROFILES.first_time_earner.transactions,
  });

  const [userSchemes, setUserSchemes] = useState<Record<string, GovernmentScheme[]>>({
    student: PERSONA_PROFILES.student.schemes,
    gig_worker: PERSONA_PROFILES.gig_worker.schemes,
    first_time_earner: PERSONA_PROFILES.first_time_earner.schemes,
  });

  // Active Profile Resolution
  const activeProfileKey = (appMode === 'custom' && customProfile) ? 'custom_user' : currentPersona;
  const activeProfile: PersonaProfile = (appMode === 'custom' && customProfile) 
    ? customProfile 
    : PERSONA_PROFILES[currentPersona] || PERSONA_PROFILES.gig_worker;

  const activeTransactions = userTransactions[activeProfileKey] || activeProfile.transactions;
  const activeSchemes = userSchemes[activeProfileKey] || activeProfile.schemes;

  // Handler for custom questionnaire submission
  const handleCustomQuestionnaireSubmit = (answers: QuestionnaireAnswers) => {
    const generated = generateCustomPersonaProfile(answers);
    setCustomProfile(generated);
    setAppMode('custom');
    setCurrentPersona('custom_user');
    
    // Initialize transaction & scheme state for custom profile
    setUserTransactions(prev => ({
      ...prev,
      custom_user: generated.transactions
    }));
    setUserSchemes(prev => ({
      ...prev,
      custom_user: generated.schemes
    }));
  };

  // Handler 1: Add manual transaction
  const handleEditTransaction = (updatedTx: Transaction) => {
    setUserTransactions((prev) => {
      const current = prev[activeProfileKey] || [];
      return {
        ...prev,
        [activeProfileKey]: current.map((t) => (t.id === updatedTx.id ? updatedTx : t)),
      };
    });
  };

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const fullTx: Transaction = {
      ...newTx,
      id: `custom_${Date.now()}`,
    };
    setUserTransactions((prev) => ({
      ...prev,
      [activeProfileKey]: [fullTx, ...(prev[activeProfileKey] || [])],
    }));
  };

  // Handler 2: AI Parse SMS Bank Statement
  const handleImportStatement = async (payload: { statementText: string, fileData?: string, mimeType?: string }) => {
    try {
      const res = await fetch('/api/engine/parse-statement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.parsedTransactions && Array.isArray(data.parsedTransactions)) {
        const newTxs: Transaction[] = data.parsedTransactions.map((pt: any, idx: number) => ({
          id: `parsed_${Date.now()}_${idx}`,
          date: new Date().toISOString().split('T')[0],
          amount: pt.amount || 100,
          type: pt.type || 'expense',
          description: pt.description || 'Parsed Merchant',
          plainEnglishSummary: pt.plainEnglishSummary || 'Statement entry auto-parsed via MoneyMap',
          platform: pt.platform || 'PhonePe',
          category: pt.category || 'Essential',
          status: 'completed',
          tags: pt.tags || ['Auto Parsed'],
        }));
        setUserTransactions((prev) => ({
          ...prev,
          [activeProfileKey]: [...newTxs, ...(prev[activeProfileKey] || [])],
        }));
      }
    } catch (err) {
      console.error('Failed to import statement:', err);
    }
  };

  // Handler 3: Find AI Custom Government Schemes
  const handleFindAiSchemes = async (query: string) => {
    try {
      const res = await fetch('/api/engine/scheme-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ persona: activeProfile, query }),
      });
      const data = await res.json();
      if (data.customSchemes && Array.isArray(data.customSchemes)) {
        setUserSchemes((prev) => ({
          ...prev,
          [activeProfileKey]: [...data.customSchemes, ...(prev[activeProfileKey] || [])],
        }));
      }
    } catch (err) {
      console.error('Failed to find AI schemes:', err);
    }
  };

  // Handler 4: Run Deep AI Life Simulation
  const handleRunDeepAiSimulation = async (scenario: LifeScenario): Promise<string> => {
    try {
      const res = await fetch('/api/engine/simulate-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: activeProfile,
          scenarioDetails: scenario,
        }),
      });
      const data = await res.json();
      return data.analysis || 'Analysis generated successfully.';
    } catch (err) {
      return 'Simulation temporarily unavailable. Please verify connection.';
    }
  };

  // Handler 5: Send Chat Message to MapMyMoney AI Financial Coach
  const handleSendChatMessage = async (message: string): Promise<string> => {
    try {
      const res = await fetch('/api/engine/advisor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          persona: activeProfile,
          language,
        }),
      });
      const data = await res.json();
      return data.reply || 'Analysis completed.';
    } catch (err) {
      return 'Connectivity issue. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-slate-950">
      {/* Header Bar */}
      <Header
        currentPersona={currentPersona}
        customProfile={customProfile}
        onSelectPersona={(p) => {
          setCurrentPersona(p);
          if (p !== 'custom_user') setAppMode('demo');
        }}
        appMode={appMode}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        language={language}
        onSelectLanguage={(l) => setLanguage(l)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* Onboarding & Mode Switcher Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSelectMode={(mode) => {
          setAppMode(mode);
          if (mode === 'demo') setCurrentPersona('gig_worker');
        }}
        onSubmitQuestionnaire={handleCustomQuestionnaireSubmit}
      />

      {/* Primary Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="flex items-center space-x-3 text-slate-400 text-xs font-mono bg-[#0a0d14] p-3 rounded-xl border border-white/[0.08]">
            <span>Inflow: <strong className="text-white">₹{activeProfile.monthlyAverageIncome.toLocaleString('en-IN')}</strong></span>
            <span>Outflow: <strong className="text-white">₹{activeProfile.monthlyAverageExpense.toLocaleString('en-IN')}</strong></span>
            <button 
              onClick={() => setIsOnboardingOpen(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline font-semibold flex items-center gap-1 font-sans ml-2"
            >
              <SlidersHorizontal className="w-3 h-3" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Navigation Tab Bar (CRED / Linear Style) */}
        <div className="flex items-center bg-[#0a0d14] border border-white/[0.08] rounded-2xl p-1.5 overflow-x-auto shadow-xl no-scrollbar print:hidden">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('aggregator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'aggregator'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Platform Stream</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Future Simulator</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('predictive')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'predictive'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Cash Flow Forecast</span>
          </button>

          <button
            onClick={() => setActiveTab('identity')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'identity'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Financial Passport</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Gov Subsidies ({activeSchemes.length})</span>
          </button>
        </div>

        {/* Executive Dashboard Hero View */}
        {activeTab === 'dashboard' && (
          <DashboardHero
            profile={activeProfile}
            transactions={activeTransactions}
            onNavigateTab={(t) => {
              setActiveTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiChat={(query?: string) => {
              if (query) setAiQuery(query);
              setIsAiChatOpen(true);
            }}
            language={language}
          />
        )}

        {/* Tab View Render */}
        {activeTab === 'aggregator' && (
          <PlatformAggregator
            platforms={activeProfile.platforms}
            transactions={activeTransactions}
            onAddTransaction={handleAddTransaction}
            onEditTransaction={handleEditTransaction}
            onImportStatement={handleImportStatement}
            language={language}
          />
        )}

        {activeTab === 'predictive' && (
          <CashFlowPredictor
            currentPersona={activeProfileKey as PersonaType}
            forecastData={activeProfile.cashFlowForecast}
            language={language}
          />
        )}

        {activeTab === 'benefits' && (
          <GovernmentBenefits
            currentPersona={activeProfileKey as PersonaType}
            schemes={activeSchemes}
            onFindAiSchemes={handleFindAiSchemes}
            language={language}
          />
        )}

        {activeTab === 'simulator' && (
          <LifeEventSimulator
            currentPersona={activeProfileKey as PersonaType}
            scenarios={activeProfile.scenarios}
            onRunDeepAiSimulation={handleRunDeepAiSimulation}
            language={language}
          />
        )}

        {activeTab === 'identity' && (
          <FinancialIdentity
            currentPersona={activeProfileKey as PersonaType}
            customProfile={customProfile}
            identity={activeProfile.identity}
            language={language}
          />
        )}
      </main>

      {/* Floating Action Advisor Button (Mobile) */}
      <button
        onClick={() => setIsAiChatOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-emerald-400 text-slate-950 font-extrabold p-3.5 rounded-2xl shadow-2xl hover:scale-105 transition-transform flex items-center space-x-2 sm:hidden print:hidden"
      >
        <Sparkles className="w-5 h-5 fill-slate-950" />
        <span className="text-xs">Smart Advisor</span>
      </button>

      {/* Minimal Footer */}
      <footer className="border-t border-white/[0.08] py-6 bg-[#030508] text-center text-xs text-slate-500 space-y-1 print:hidden">
        <p className="font-semibold text-slate-400">
          MoneyMap — Predictive Financial OS
        </p>
        <p className="text-[11px] text-slate-600 font-mono">
          React 19 • TypeScript • Node.js Express • Tailwind CSS • Recharts
        </p>
      </footer>

      {/* Advisor Chat Modal */}
      <FinBotChat
        currentPersona={currentPersona}
        customProfile={customProfile}
        isOpen={isAiChatOpen}
        onClose={() => {
          setIsAiChatOpen(false);
          setAiQuery(undefined);
        }}
        language={language}
        onSendChatMessage={handleSendChatMessage}
        initialQuery={aiQuery}
      />
    </div>
  );
}
