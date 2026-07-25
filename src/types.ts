export type PersonaType = 'student' | 'gig_worker' | 'first_time_earner' | 'custom_user';

export type AppMode = 'demo' | 'custom' | 'guest';

export interface QuestionnaireAnswers {
  fullName: string;
  age: number;
  city: string;
  occupation: string; // e.g. "Gig Delivery Rider", "Junior Software Developer", "College Student", "Freelance Creator", "Small Business Owner"
  monthlyIncome: number;
  incomeType: 'fixed_salary' | 'gig_payouts' | 'freelance' | 'student_allowance' | 'business_revenue';
  monthlyFixedExpenses: number; // Rent, food, bills
  activeEmiLoan: number; // Monthly EMI / Loan payouts
  activeBnplAmount: number; // Active Pay Later / BNPL bills (Simpl, LazyPay, CRED)
  emergencySavings: number; // Savings / Bank balance
  investmentsAmount: number; // FDs, Mutual Funds, Stocks
  primaryGoal: string; // E.g., "Build Emergency Safety Net", "Buy Vehicle/Laptop on EMI", "Avoid BNPL Debt Traps", "Find Government Grants & Subsidies"
}

export type PlatformType = 'upi' | 'card' | 'wallet' | 'subscription' | 'bank';

export interface PlatformAccount {
  id: string;
  name: string;
  provider: 'PhonePe' | 'Google Pay' | 'Paytm' | 'CRED' | 'Amazon Pay' | 'Mobikwik' | 'SBI Bank' | 'HDFC Bank' | 'Swiggy Partner' | 'Uber Driver' | 'Netflix' | 'Spotify' | 'Jio Fiber' | 'Simpl' | 'LazyPay';
  type: PlatformType;
  balanceOrLimit: number;
  currency: string;
  icon: string;
  connected: boolean;
  lastSynced: string;
  category: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  plainEnglishSummary: string;
  platform: string;
  category: 'Essential' | 'Discretionary' | 'Subscription' | 'Income' | 'BNPL / Debt';
  status: 'completed' | 'pending' | 'forecasted';
  tags: string[];
}

export interface CashFlowForecastPoint {
  date: string;
  dayLabel: string;
  projectedBalance: number;
  income: number;
  expenses: number;
  isLowWaterMark?: boolean;
  note?: string;
}

export interface HealthPillar {
  name: string;
  score: number; // 0 to 100
  maxScore: number;
  status: 'optimal' | 'warning' | 'critical';
  detail: string;
  impactNote: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Scholarship' | 'Insurance' | 'Micro-Credit' | 'Pension' | 'Healthcare' | 'Housing & Asset';
  targetAudience: ('student' | 'gig_worker' | 'first_time_earner')[];
  benefitAmount: string;
  summary: string;
  plainEnglishExplanation: string;
  eligibilityCriteria: string[];
  documentsRequired: string[];
  matchScore: number; // percentage
  applicationUrl: string;
  isApplied?: boolean;
}

export interface LifeScenario {
  id: string;
  title: string;
  description: string;
  monthlyIncomeChange: number;
  monthlyExpenseChange: number;
  oneTimeCost: number;
  impactOnHealthScore: number;
  newLowWaterMark: number;
  aiAdvice: string;
}

export interface FinancialIdentityData {
  passportId: string;
  userName: string;
  persona: PersonaType;
  age: number;
  city?: string;
  location?: string;
  healthScore: number;
  incomeStabilityIndex: string; // e.g., "High (Salary)" or "Moderate (Gig)"
  emergencyBufferDays: number;
  activePlatformsCount: number;
  cleanRepaymentHistoryMonths: number;
  verifiedBadges: string[];
  qrPayload: string;
  issueDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: string;
  suggestedActions?: string[];
}
