import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldAlert, 
  Briefcase, 
  IndianRupee, 
  Building2, 
  Wallet, 
  Target, 
  Zap,
  PlayCircle,
  X
} from 'lucide-react';
import { AppMode, QuestionnaireAnswers } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: AppMode) => void;
  onSubmitQuestionnaire: (answers: QuestionnaireAnswers) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSelectMode,
  onSubmitQuestionnaire
}) => {
  const [view, setView] = useState<'mode_select' | 'questionnaire'>('mode_select');
  const [step, setStep] = useState(1);

  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    fullName: '',
    age: 0,
    city: '',
    occupation: '',
    monthlyIncome: 0,
    incomeType: 'fixed_salary',
    monthlyFixedExpenses: 0,
    activeEmiLoan: 0,
    activeBnplAmount: 0,
    emergencySavings: 0,
    investmentsAmount: 0,
    primaryGoal: 'Build 3-Month Emergency Safety Net & Avoid Debt'
  });

  if (!isOpen) return null;

  const totalSteps = 6;

  const handleNextStep = () => {
    // Validation
    if (step === 1 && (!answers.fullName || !answers.age || !answers.city)) {
      alert("Please fill in all basic details.");
      return;
    }
    if (step === 2 && (!answers.occupation || answers.monthlyIncome === undefined || answers.monthlyIncome === 0)) {
      alert("Please fill in your occupation and income.");
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSubmitQuestionnaire(answers);
      onSelectMode('custom');
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setView('mode_select');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-[#0e121b] border border-[#232d3f] rounded-2xl shadow-xl overflow-hidden text-slate-100"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1d2636] bg-[#121824]/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center font-bold text-black text-sm">
              M
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">MapMyMoney</h3>
              <p className="text-xs text-slate-400">Personalized Financial Operating System</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f293d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {view === 'mode_select' ? (
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Welcome to MapMyMoney
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">How would you like to explore?</h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Choose your experience. MapMyMoney is customized to your exact answers, or explore with pre-built Indian personas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Custom User Option */}
              <button
                onClick={() => setView('questionnaire')}
                className="group relative flex flex-col justify-between p-5 min-h-[260px] rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-[#121826] hover:border-emerald-500/60 hover:bg-[#161f32] text-left transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-base">User Mode</h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-black font-extrabold">RECOMMENDED</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Answer 6 quick questions. Generate custom Health Score, Cash Flow Forecast & Scheme matches.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Personalize Profile <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Demo Mode Option */}
              <button
                onClick={() => {
                  onSelectMode('demo');
                  onClose();
                }}
                className="group flex flex-col justify-between p-5 rounded-xl border border-[#232d3f] bg-[#121824]/80 hover:border-indigo-500/50 hover:bg-[#161f32] text-left transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Demo Mode</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Explore pre-built personas (Gig Delivery Partner, College Student, Salaried Earner).
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                  Try Demo Personas <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Guest Mode Option */}
              <button
                onClick={() => {
                  onSelectMode('guest');
                  onClose();
                }}
                className="group flex flex-col justify-between p-5 rounded-xl border border-[#232d3f] bg-[#121824]/80 hover:border-slate-500/50 hover:bg-[#161f32] text-left transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Guest Mode</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Instant quick glimpse into MapMyMoney features without setup.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-300 group-hover:translate-x-1 transition-transform">
                  Instant Guest View <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Questionnaire Wizard */
          <div className="p-6 md:p-8 space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Step {step} of {totalSteps}</span>
                <span className="text-emerald-400 font-semibold">
                  {Math.round((step / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1b2333] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-emerald-400" /> What should we call you?
                    </h3>
                    <p className="text-xs text-slate-400">Tell us a bit about yourself so we can customize your MapMyMoney Passport.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Your Name</label>
                      <input 
                        type="text"
                        value={answers.fullName}
                        onChange={(e) => setAnswers({ ...answers, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-300 font-medium mb-1">Age</label>
                        <input 
                          type="number"
                          value={answers.age || ''}
                          onChange={(e) => setAnswers({ ...answers, age: parseInt(e.target.value) || 20 })}
                          className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 font-medium mb-1">City / State</label>
                        <input 
                          type="text"
                          value={answers.city}
                          onChange={(e) => setAnswers({ ...answers, city: e.target.value })}
                          placeholder="e.g. Pune, MH"
                          className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-400" /> Occupation & Average Monthly Income
                    </h3>
                    <p className="text-xs text-slate-400">MapMyMoney will project your 30-day cash flow based on your earning stream.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Your Work / Role</label>
                      <input 
                        type="text"
                        value={answers.occupation}
                        onChange={(e) => setAnswers({ ...answers, occupation: e.target.value })}
                        placeholder="e.g. Delivery Partner, Student, Software Dev"
                        className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Average Monthly Inflow / Income (₹)</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-sm">₹</div>
                        <input 
                          type="number"
                          value={answers.monthlyIncome || ''}
                          onChange={(e) => setAnswers({ ...answers, monthlyIncome: parseInt(e.target.value) || 0 })}
                          className="w-full pl-8 pr-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-emerald-400" /> Income Type & Inflow Stability
                    </h3>
                    <p className="text-xs text-slate-400">How do you get paid every month?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {[
                      { id: 'fixed_salary', title: 'Fixed Monthly Salary', desc: 'Consistent paycheck on 1st/30th' },
                      { id: 'gig_payouts', title: 'Gig Worker Daily/Weekly Payouts', desc: 'Swiggy, Zomato, Uber, Urban Company' },
                      { id: 'freelance', title: 'Freelance & Contract Work', desc: 'Milestone payouts from clients' },
                      { id: 'student_allowance', title: 'Student Allowance / Stipend', desc: 'Stipend or pocket allowance from family' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAnswers({ ...answers, incomeType: opt.id as any })}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          answers.incomeType === opt.id
                            ? 'border-emerald-500 bg-emerald-500/10 text-white'
                            : 'border-[#232d3f] bg-[#141a29] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="font-semibold text-sm flex items-center justify-between">
                          {opt.title}
                          {answers.incomeType === opt.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-400" /> Monthly Commitments & EMIs
                    </h3>
                    <p className="text-xs text-slate-400">Specify your essential fixed outflows and active loan obligations.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Monthly Fixed Expenses (Rent, Mess, Bills) (₹)</label>
                      <input 
                        type="number"
                        value={answers.monthlyFixedExpenses || ''}
                        onChange={(e) => setAnswers({ ...answers, monthlyFixedExpenses: parseInt(e.target.value) || 0 })}
                        className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white focus:outline-none focus:border-amber-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Active Monthly Loan / EMI Outflow (₹)</label>
                      <input 
                        type="number"
                        value={answers.activeEmiLoan || ''}
                        onChange={(e) => setAnswers({ ...answers, activeEmiLoan: parseInt(e.target.value) || 0 })}
                        placeholder="e.g. Bike EMI, Education Loan"
                        className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white focus:outline-none focus:border-amber-500 text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div 
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-cyan-400" /> Savings Buffer & BNPL / Pay Later
                    </h3>
                    <p className="text-xs text-slate-400">Liquid savings decide your Emergency Buffer Days in MapMyMoney.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Liquid Bank & Wallet Savings (₹)</label>
                      <input 
                        type="number"
                        value={answers.emergencySavings || ''}
                        onChange={(e) => setAnswers({ ...answers, emergencySavings: parseInt(e.target.value) || 0 })}
                        placeholder="Total cash across PhonePe, SBI, HDFC"
                        className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white focus:outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Active Pay Later / BNPL Outstanding (Simpl, LazyPay, CRED) (₹)</label>
                      <input 
                        type="number"
                        value={answers.activeBnplAmount || ''}
                        onChange={(e) => setAnswers({ ...answers, activeBnplAmount: parseInt(e.target.value) || 0 })}
                        placeholder="e.g. 1200"
                        className="w-full px-3.5 py-2.5 bg-[#141a29] border border-[#232d3f] rounded-lg text-white focus:outline-none focus:border-cyan-500 text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div 
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" /> Primary Financial Priority
                    </h3>
                    <p className="text-xs text-slate-400">Select what you want the Smart Advisor to help you achieve first.</p>
                  </div>

                  <div className="space-y-2">
                    {[
                      'Build 3-Month Emergency Safety Net & Avoid Debt Traps',
                      'Buy EV Scooter / Work Laptop on Smart No-Cost EMI',
                      'Claim Relevant Government Grants, Welfare & Scholarships',
                      'Reduce BNPL & Subscription Overhead by 20%'
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setAnswers({ ...answers, primaryGoal: goal })}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                          answers.primaryGoal === goal
                            ? 'border-purple-500 bg-purple-500/10 text-white'
                            : 'border-[#232d3f] bg-[#141a29] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {goal}
                        {answers.primaryGoal === goal && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1d2636]">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#1b2333] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-indigo-400 hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                {step === totalSteps ? 'Generate My MapMyMoney Profile' : 'Next Step'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
