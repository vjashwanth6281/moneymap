import { PlatformAccount, Transaction, CashFlowForecastPoint, HealthPillar, GovernmentScheme, LifeScenario, FinancialIdentityData, PersonaType, QuestionnaireAnswers } from '../types';

export interface PersonaProfile {
  id: PersonaType;
  name: string;
  role: string;
  age: number;
  location: string;
  monthlyAverageIncome: number;
  monthlyAverageExpense: number;
  healthScore: number;
  platforms: PlatformAccount[];
  transactions: Transaction[];
  cashFlowForecast: CashFlowForecastPoint[];
  pillars: HealthPillar[];
  schemes: GovernmentScheme[];
  scenarios: LifeScenario[];
  identity: FinancialIdentityData;
}

export const PERSONA_PROFILES: Record<string, PersonaProfile> = {
  student: {
    id: 'student',
    name: 'Rohan Sharma',
    role: 'Computer Science Student & Freelance Graphic Designer',
    age: 21,
    location: 'Pune, Maharashtra',
    monthlyAverageIncome: 14500,
    monthlyAverageExpense: 11200,
    healthScore: 72,
    platforms: [
      { id: 'p1', name: 'Primary UPI', provider: 'PhonePe', type: 'upi', balanceOrLimit: 4850, currency: 'INR', icon: 'Smartphone', connected: true, lastSynced: 'Just now', category: 'Everyday UPI' },
      { id: 'p2', name: 'Secondary UPI & Cashback', provider: 'Google Pay', type: 'upi', balanceOrLimit: 1200, currency: 'INR', icon: 'QrCode', connected: true, lastSynced: '5 mins ago', category: 'Chai & Canteen' },
      { id: 'p3', name: 'Paytm Pocket Wallet', provider: 'Paytm', type: 'wallet', balanceOrLimit: 350, currency: 'INR', icon: 'Wallet', connected: true, lastSynced: '1 hour ago', category: 'Transit & Bus' },
      { id: 'p4', name: 'Simpl BNPL', provider: 'Simpl', type: 'card', balanceOrLimit: 2500, currency: 'INR', icon: 'CreditCard', connected: true, lastSynced: 'Today', category: 'Zomato & Zepto BNPL' },
      { id: 'p5', name: 'Music & Study Subscriptions', provider: 'Spotify', type: 'subscription', balanceOrLimit: 119, currency: 'INR', icon: 'Tv', connected: true, lastSynced: 'Auto-Debit 5th', category: 'Entertainment' },
      { id: 'p6', name: 'College Hostel Bank', provider: 'SBI Bank', type: 'bank', balanceOrLimit: 12400, currency: 'INR', icon: 'Building2', connected: true, lastSynced: 'Today', category: 'Emergency Fund' },
    ],
    transactions: [
      { id: 't1', date: '2026-07-24', amount: 3500, type: 'income', description: 'Upwork UI Design Client Payout', plainEnglishSummary: 'Freelance project payment credited via PhonePe', platform: 'PhonePe', category: 'Income', status: 'completed', tags: ['Freelance', 'UPI'] },
      { id: 't2', date: '2026-07-23', amount: 45, type: 'expense', description: 'Tapri Chai & Samosa', plainEnglishSummary: 'Quick snack with friends at college gate', platform: 'Google Pay', category: 'Discretionary', status: 'completed', tags: ['Food', 'Daily'] },
      { id: 't3', date: '2026-07-22', amount: 149, type: 'expense', description: 'Spotify Student Auto-Debit', plainEnglishSummary: 'Monthly recurring music subscription', platform: 'PhonePe', category: 'Subscription', status: 'completed', tags: ['Subscription', 'Music'] },
      { id: 't4', date: '2026-07-20', amount: 420, type: 'expense', description: 'Zepto Groceries via Simpl BNPL', plainEnglishSummary: 'Late night snacks and coffee powder due in 15 days', platform: 'Simpl', category: 'BNPL / Debt', status: 'completed', tags: ['BNPL', 'Groceries'] },
      { id: 't5', date: '2026-07-18', amount: 8000, type: 'income', description: 'Monthly Allowance from Parents', plainEnglishSummary: 'Regular monthly stipend received in SBI account', platform: 'SBI Bank', category: 'Income', status: 'completed', tags: ['Allowance'] },
      { id: 't6', date: '2026-07-15', amount: 3200, type: 'expense', description: 'Hostel Mess Fee Payment', plainEnglishSummary: 'Essential monthly meal plan', platform: 'SBI Bank', category: 'Essential', status: 'completed', tags: ['Hostel', 'Food'] },
      { id: 't7', date: '2026-07-12', amount: 1200, type: 'expense', description: 'Reference Textbooks & Photostat', plainEnglishSummary: 'Semester study material purchase', platform: 'PhonePe', category: 'Essential', status: 'completed', tags: ['Education'] },
    ],
    cashFlowForecast: [
      { date: '2026-07-24', dayLabel: 'Today', projectedBalance: 6400, income: 0, expenses: 150 },
      { date: '2026-07-27', dayLabel: '27 Jul', projectedBalance: 6250, income: 0, expenses: 0 },
      { date: '2026-07-30', dayLabel: '30 Jul', projectedBalance: 5830, income: 0, expenses: 420, note: 'Simpl BNPL Bill Due (₹420)' },
      { date: '2026-08-01', dayLabel: '01 Aug', projectedBalance: 13830, income: 8000, expenses: 0, note: 'Allowance Expected (+₹8,000)' },
      { date: '2026-08-05', dayLabel: '05 Aug', projectedBalance: 10511, income: 0, expenses: 3319, isLowWaterMark: false, note: 'Hostel Mess (₹3200) + Spotify (₹119)' },
      { date: '2026-08-10', dayLabel: '10 Aug', projectedBalance: 14511, income: 4000, expenses: 0, note: 'Upwork Freelance Milestone (+₹4,000)' },
      { date: '2026-08-15', dayLabel: '15 Aug', projectedBalance: 13900, income: 0, expenses: 611 },
    ],
    pillars: [
      { name: 'Emergency Buffer', score: 68, maxScore: 100, status: 'optimal', detail: '42 days of basic living expenses covered in SBI account', impactNote: 'Safe for sudden college expenses' },
      { name: 'Subscription Drag', score: 85, maxScore: 100, status: 'optimal', detail: 'Only 1.2% of income tied to monthly auto-debits (Spotify)', impactNote: 'Very lean recurring spending' },
      { name: 'Income Volatility', score: 60, maxScore: 100, status: 'warning', detail: 'Freelance work varies by ₹2,000-₹5,000 month-on-month', impactNote: 'Rely on fixed parent stipend for essentials' },
      { name: 'BNPL & Debt Burden', score: 75, maxScore: 100, status: 'optimal', detail: 'Simpl balance ₹420, well below ₹2,500 safety threshold', impactNote: 'Clear before due date to keep score high' },
    ],
    schemes: [
      {
        id: 'sch_1',
        name: 'National Scholarship Portal (NSP) Central Sector Scheme',
        category: 'Scholarship',
        targetAudience: ['student'],
        benefitAmount: '₹12,000 / year',
        summary: 'Financial support for meritorious college students from low-income families.',
        plainEnglishExplanation: 'Get ₹1,000/month directly deposited into your bank account for tuition & books if your family income is under ₹4.5 Lakh/yr.',
        eligibilityCriteria: ['Above 80th percentile in Class 12', 'Enrolled in regular degree course', 'Family income < ₹4.5L/year'],
        documentsRequired: ['Class 12 Marksheet', 'Income Certificate', 'Aadhaar Card', 'Bank Passbook'],
        matchScore: 96,
        applicationUrl: 'https://scholarships.gov.in',
      },
      {
        id: 'sch_2',
        name: 'PM Vidyalaxmi Education Loan Scheme',
        category: 'Scholarship',
        targetAudience: ['student'],
        benefitAmount: 'Up to ₹7.5 Lakh collateral-free loan',
        summary: 'Zero-collateral education loan with interest subsidy for higher studies.',
        plainEnglishExplanation: 'Borrow money for laptops and semester fees with zero collateral required. Interest is waived while studying.',
        eligibilityCriteria: ['Admitted to recognized Indian university', 'No third-party guarantor needed'],
        documentsRequired: ['Admission Letter', 'Fee Structure', 'Aadhaar Card', 'PAN Card'],
        matchScore: 88,
        applicationUrl: 'https://www.pmvidyalaxmi.gov.in',
      },
      {
        id: 'sch_3',
        name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
        category: 'Insurance',
        targetAudience: ['student', 'gig_worker', 'first_time_earner'],
        benefitAmount: '₹2 Lakh Accidental Coverage',
        summary: 'Ultra-affordable accident insurance scheme for just ₹20 per year.',
        plainEnglishExplanation: 'Pay just ₹20 once a year from your UPI/bank for ₹2,000,000 accident protection on travel.',
        eligibilityCriteria: ['Age 18 to 70 years', 'Savings bank account linked with Aadhaar'],
        documentsRequired: ['Aadhaar Card', 'Bank Account auto-debit consent'],
        matchScore: 92,
        applicationUrl: 'https://www.jansuraksha.gov.in',
      }
    ],
    scenarios: [
      {
        id: 'sc_1',
        title: 'Upgrade to M2 MacBook for Freelancing',
        description: 'Buying a laptop on ₹3,500/month No-Cost EMI for 12 months using student credit limit.',
        monthlyIncomeChange: 1500, // Client output increases with better machine
        monthlyExpenseChange: -3500,
        oneTimeCost: 2000,
        impactOnHealthScore: -8,
        newLowWaterMark: 1200,
        aiAdvice: 'Your low-water balance will dip below ₹2,000 on 30th of each month. Secure 1 extra freelance gig before taking the EMI.'
      },
      {
        id: 'sc_2',
        title: 'Shifting to Private Room near College',
        description: 'Moving out of college hostel to a shared 2BHK flat in Viman Nagar.',
        monthlyIncomeChange: 0,
        monthlyExpenseChange: -2500,
        oneTimeCost: 10000, // Deposit
        impactOnHealthScore: -14,
        newLowWaterMark: -1200,
        aiAdvice: 'Warning: Deposit of ₹10,000 will exhaust your emergency buffer completely. Negotiate splitting the deposit into 2 parts.'
      }
    ],
    identity: {
      passportId: 'IN-FIN-2026-STU-8821',
      userName: 'Rohan Sharma',
      persona: 'student',
      age: 21,
      location: 'Pune, Maharashtra',
      healthScore: 72,
      incomeStabilityIndex: 'Moderate (Freelance + Stipend)',
      emergencyBufferDays: 42,
      activePlatformsCount: 6,
      cleanRepaymentHistoryMonths: 14,
      verifiedBadges: ['Verified Student Identity', 'Zero BNPL Default', 'Disciplined UPI User', 'NSP Eligible'],
      qrPayload: 'https://finos.in/passport/IN-FIN-2026-STU-8821',
      issueDate: '24 July 2026'
    }
  },

  gig_worker: {
    id: 'gig_worker',
    name: 'Priya Nandan',
    role: 'Food Delivery Partner (Swiggy & Zomato) & Urban Company Service Specialist',
    age: 26,
    location: 'Bengaluru, Karnataka',
    monthlyAverageIncome: 28500,
    monthlyAverageExpense: 22100,
    healthScore: 68,
    platforms: [
      { id: 'g1', name: 'Swiggy Delivery Partner Wallet', provider: 'Swiggy Partner', type: 'wallet', balanceOrLimit: 3820, currency: 'INR', icon: 'Wallet', connected: true, lastSynced: 'Today 4 PM', category: 'Daily Earnings' },
      { id: 'g2', name: 'Zomato Payout Account', provider: 'Paytm', type: 'wallet', balanceOrLimit: 1450, currency: 'INR', icon: 'Smartphone', connected: true, lastSynced: 'Yesterday', category: 'Weekly Payout' },
      { id: 'g3', name: 'Fuel & Maintenance UPI', provider: 'PhonePe', type: 'upi', balanceOrLimit: 1800, currency: 'INR', icon: 'QrCode', connected: true, lastSynced: 'Just now', category: 'Petrol & Vehicle' },
      { id: 'g4', name: 'Amazon Pay Later (Groceries)', provider: 'Amazon Pay', type: 'card', balanceOrLimit: 5000, currency: 'INR', icon: 'CreditCard', connected: true, lastSynced: 'Today', category: 'Household BNPL' },
      { id: 'g5', name: 'Home Broadband & Mobile', provider: 'Jio Fiber', type: 'subscription', balanceOrLimit: 599, currency: 'INR', icon: 'Tv', connected: true, lastSynced: 'Auto-Debit 10th', category: 'Work Data Plan' },
      { id: 'g6', name: 'Savings & Emergency Bank', provider: 'HDFC Bank', type: 'bank', balanceOrLimit: 18500, currency: 'INR', icon: 'Building2', connected: true, lastSynced: 'Today', category: 'Family Buffer' },
    ],
    transactions: [
      { id: 'gt1', date: '2026-07-24', amount: 1450, type: 'income', description: 'Swiggy Lunch + Peak Hour Incentive', plainEnglishSummary: 'Daily delivery earnings transferred to wallet', platform: 'Swiggy Partner', category: 'Income', status: 'completed', tags: ['Gig Income', 'Swiggy'] },
      { id: 'gt2', date: '2026-07-24', amount: 280, type: 'expense', description: 'Petrol Filling at HPCL Pump', plainEnglishSummary: '2 Litres fuel for delivery EV/Scooter', platform: 'PhonePe', category: 'Essential', status: 'completed', tags: ['Fuel', 'Work'] },
      { id: 'gt3', date: '2026-07-22', amount: 350, type: 'expense', description: 'Scooter Brake Pad Repair at Garage', plainEnglishSummary: 'Vehicle maintenance expense', platform: 'PhonePe', category: 'Essential', status: 'completed', tags: ['Maintenance'] },
      { id: 'gt4', date: '2026-07-20', amount: 850, type: 'income', description: 'Urban Company Salon Order Payout', plainEnglishSummary: 'Completed 2 home beauty sessions', platform: 'Paytm', category: 'Income', status: 'completed', tags: ['Gig Income', 'UrbanCompany'] },
      { id: 'gt5', date: '2026-07-18', amount: 1200, type: 'expense', description: 'Amazon Pay Later Grocery Repayment', plainEnglishSummary: 'Cleared last month grocery bill with 0 late fee', platform: 'Amazon Pay', category: 'BNPL / Debt', status: 'completed', tags: ['BNPL', 'Repayment'] },
      { id: 'gt6', date: '2026-07-10', amount: 599, type: 'expense', description: 'Jio Fiber Unlimited Data Bill', plainEnglishSummary: 'Essential data connection for order dispatch', platform: 'Jio Fiber', category: 'Subscription', status: 'completed', tags: ['Data', 'Utility'] },
    ],
    cashFlowForecast: [
      { date: '2026-07-24', dayLabel: 'Today', projectedBalance: 7070, income: 1450, expenses: 280 },
      { date: '2026-07-26', dayLabel: '26 Jul', projectedBalance: 9800, income: 3000, expenses: 270, note: 'Weekend Peak Incentive (+₹3,000)' },
      { date: '2026-07-31', dayLabel: '31 Jul', projectedBalance: 12400, income: 3200, expenses: 600, isLowWaterMark: false },
      { date: '2026-08-05', dayLabel: '05 Aug', projectedBalance: 7200, income: 0, expenses: 5200, note: 'House Rent Payment (₹5,200)' },
      { date: '2026-08-10', dayLabel: '10 Aug', projectedBalance: 6601, income: 0, expenses: 599, note: 'Jio Fiber Auto-Debit (₹599)' },
      { date: '2026-08-15', dayLabel: '15 Aug', projectedBalance: 14800, income: 8500, expenses: 300, note: 'Swiggy Weekly Bonus (+₹8,500)' },
    ],
    pillars: [
      { name: 'Emergency Buffer', score: 62, maxScore: 100, status: 'warning', detail: '25 days of living buffer. Income halts immediately if sick.', impactNote: 'Need health insurance shield' },
      { name: 'Subscription Drag', score: 90, maxScore: 100, status: 'optimal', detail: 'Only ₹599/mo (2%) tied to fixed subscriptions', impactNote: 'Very flexible expenditure' },
      { name: 'Income Volatility', score: 52, maxScore: 100, status: 'critical', detail: 'Monsoon rains & algorithm changes cause 30% weekly swings', impactNote: 'High volatility index' },
      { name: 'BNPL & Debt Burden', score: 80, maxScore: 100, status: 'optimal', detail: 'Amazon Pay Later used strictly for groceries & cleared in time', impactNote: 'Good credit hygiene' },
    ],
    schemes: [
      {
        id: 'sch_4',
        name: 'PM-SVANidhi (Micro-Credit Scheme for Urban Gig & Street Workers)',
        category: 'Micro-Credit',
        targetAudience: ['gig_worker'],
        benefitAmount: '₹10,000 to ₹50,000 Working Capital Loan',
        summary: 'Collateral-free working capital loan with 7% interest subsidy and cashback on digital transactions.',
        plainEnglishExplanation: 'Get a ₹10,000 loan to upgrade your scooter or buy equipment. Repay on time and unlock ₹20,000 next cycle with 7% interest rebate!',
        eligibilityCriteria: ['Gig delivery partner / Urban worker with platform ID', 'Aadhaar linked mobile number'],
        documentsRequired: ['Aadhaar Card', 'Gig Platform ID Card / Partner app screenshot', 'Bank Passbook'],
        matchScore: 98,
        applicationUrl: 'https://pmsvanidhi.mohua.gov.in',
      },
      {
        id: 'sch_5',
        name: 'e-Shram National Database Unorganised Workers Card',
        category: 'Healthcare',
        targetAudience: ['gig_worker'],
        benefitAmount: 'Universal UWIN Card & ₹2 Lakh Free Accident Coverage',
        summary: 'Official government identity card for India\'s gig and unorganised workforce.',
        plainEnglishExplanation: 'Register your delivery work on government e-Shram portal to get a portable 12-digit UWIN identity that guarantees government relief during accidents or floods.',
        eligibilityCriteria: ['Age 16 to 59 years', 'Not paying income tax', 'Gig / contract worker'],
        documentsRequired: ['Aadhaar Card', 'Active Mobile Number', 'Bank Account Details'],
        matchScore: 99,
        applicationUrl: 'https://eshram.gov.in',
      },
      {
        id: 'sch_6',
        name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
        category: 'Insurance',
        targetAudience: ['gig_worker', 'first_time_earner'],
        benefitAmount: '₹2 Lakh Life Insurance Shield',
        summary: 'Life insurance cover for death due to any reason for ₹436/year.',
        plainEnglishExplanation: 'Protects your family with ₹2,000,000 if anything happens to you on the road. Costs under ₹1.20 per day.',
        eligibilityCriteria: ['Age 18 to 50 years', 'Savings bank account'],
        documentsRequired: ['Aadhaar Card', 'Nominee Details', 'Auto-debit consent'],
        matchScore: 94,
        applicationUrl: 'https://www.jansuraksha.gov.in',
      }
    ],
    scenarios: [
      {
        id: 'sc_3',
        title: 'Heavy Monsoon Season (35% Order Volume Drop)',
        description: 'Bengaluru rains reduce daily orders for 3 weeks during August.',
        monthlyIncomeChange: -7200,
        monthlyExpenseChange: 0,
        oneTimeCost: 0,
        impactOnHealthScore: -18,
        newLowWaterMark: 850,
        aiAdvice: 'Your low water mark drops to ₹850. Activate PM-SVANidhi micro-buffer now to keep ₹5,000 safe in reserve before August.'
      },
      {
        id: 'sc_4',
        title: 'EV Scooter Lease Switch (Save ₹3,200/mo Petrol)',
        description: 'Swapping petrol scooter for an Ather/Abaani EV on ₹2,400/month subscription.',
        monthlyIncomeChange: 0,
        monthlyExpenseChange: 1200, // Net savings of ₹2,000 petrol - ₹800 charge = +1200 monthly gain
        oneTimeCost: 1500, // Deposit
        impactOnHealthScore: +12,
        newLowWaterMark: 8900,
        aiAdvice: 'Great decision! You eliminate fuel price spikes and net extra ₹1,200 savings every month. Boosts health score to 80.'
      }
    ],
    identity: {
      passportId: 'IN-FIN-2026-GIG-3319',
      userName: 'Priya Nandan',
      persona: 'gig_worker',
      age: 26,
      location: 'Bengaluru, Karnataka',
      healthScore: 68,
      incomeStabilityIndex: 'Moderate-High (Multi-Platform Swiggy + UC)',
      emergencyBufferDays: 25,
      activePlatformsCount: 6,
      cleanRepaymentHistoryMonths: 22,
      verifiedBadges: ['e-Shram Registered Gig Worker', 'e-Way UPI Verified', 'Zero Wallet Overdraft', 'PM-SVANidhi Eligible'],
      qrPayload: 'https://finos.in/passport/IN-FIN-2026-GIG-3319',
      issueDate: '24 July 2026'
    }
  },

  first_time_earner: {
    id: 'first_time_earner',
    name: 'Ankit Verma',
    role: 'Junior QA Test Engineer at TechSolutions Pvt Ltd',
    age: 23,
    location: 'Noida / Delhi NCR',
    monthlyAverageIncome: 32000,
    monthlyAverageExpense: 21500,
    healthScore: 84,
    platforms: [
      { id: 'f1', name: 'Salary Account (HDFC)', provider: 'HDFC Bank', type: 'bank', balanceOrLimit: 24500, currency: 'INR', icon: 'Building2', connected: true, lastSynced: 'Today', category: 'Salary & Savings' },
      { id: 'f2', name: 'CRED Credit Card', provider: 'CRED', type: 'card', balanceOrLimit: 45000, currency: 'INR', icon: 'CreditCard', connected: true, lastSynced: 'Just now', category: 'Card & Rewards' },
      { id: 'f3', name: 'PhonePe UPI', provider: 'PhonePe', type: 'upi', balanceOrLimit: 3200, currency: 'INR', icon: 'Smartphone', connected: true, lastSynced: '10 mins ago', category: 'Daily Scans' },
      { id: 'f4', name: 'Google Pay Auto-Pay', provider: 'Google Pay', type: 'upi', balanceOrLimit: 1100, currency: 'INR', icon: 'QrCode', connected: true, lastSynced: 'Today', category: 'Bills & Utilities' },
      { id: 'f5', name: 'Netflix & Gym Subscriptions', provider: 'Netflix', type: 'subscription', balanceOrLimit: 649, currency: 'INR', icon: 'Tv', connected: true, lastSynced: 'Auto-Debit 1st', category: 'Lifestyle' },
      { id: 'f6', name: 'Mobikwik Zip BNPL', provider: 'Mobikwik', type: 'wallet', balanceOrLimit: 3000, currency: 'INR', icon: 'Wallet', connected: true, lastSynced: 'Yesterday', category: 'Utility Emergency' },
    ],
    transactions: [
      { id: 'ft1', date: '2026-07-01', amount: 32000, type: 'income', description: 'TechSolutions Monthly Salary Credit', plainEnglishSummary: 'First monthly salary in HDFC account', platform: 'HDFC Bank', category: 'Income', status: 'completed', tags: ['Salary'] },
      { id: 'ft2', date: '2026-07-03', amount: 9500, type: 'expense', description: 'Flat Rent via PhonePe UPI', plainEnglishSummary: '3-sharing flat rent in Sector 62 Noida', platform: 'PhonePe', category: 'Essential', status: 'completed', tags: ['Rent', 'Housing'] },
      { id: 'ft3', date: '2026-07-05', amount: 3200, type: 'expense', description: 'Electricity & Maintenance Bill', plainEnglishSummary: 'Shared flat utility bills via Google Pay', platform: 'Google Pay', category: 'Essential', status: 'completed', tags: ['Utilities'] },
      { id: 'ft4', date: '2026-07-10', amount: 649, type: 'expense', description: 'Netflix Premium Auto-Debit', plainEnglishSummary: 'Monthly OTT video subscription', platform: 'Netflix', category: 'Subscription', status: 'completed', tags: ['Subscription'] },
      { id: 'ft5', date: '2026-07-15', amount: 2800, type: 'expense', description: 'Cult.fit Gym Monthly EMI via CRED', plainEnglishSummary: 'Fitness membership credit card transaction', platform: 'CRED', category: 'Discretionary', status: 'completed', tags: ['Fitness', 'Card'] },
      { id: 'ft6', date: '2026-07-20', amount: 1500, type: 'expense', description: 'Weekend Dinner out at CyberHub', plainEnglishSummary: 'Socializing with office colleagues', platform: 'PhonePe', category: 'Discretionary', status: 'completed', tags: ['Dining', 'Social'] },
    ],
    cashFlowForecast: [
      { date: '2026-07-24', dayLabel: 'Today', projectedBalance: 16851, income: 0, expenses: 200 },
      { date: '2026-07-28', dayLabel: '28 Jul', projectedBalance: 16651, income: 0, expenses: 0 },
      { date: '2026-07-31', dayLabel: '31 Jul', projectedBalance: 13851, income: 0, expenses: 2800, note: 'CRED Card Statement Due (₹2,800)' },
      { date: '2026-08-01', dayLabel: '01 Aug', projectedBalance: 45851, income: 32000, expenses: 0, note: 'Salary Credit (+₹32,000)' },
      { date: '2026-08-03', dayLabel: '03 Aug', projectedBalance: 36351, income: 0, expenses: 9500, note: 'Noida Flat Rent (₹9,500)' },
      { date: '2026-08-05', dayLabel: '05 Aug', projectedBalance: 32502, income: 0, expenses: 3849, isLowWaterMark: false, note: 'Utilities + Netflix Auto-Debit' },
      { date: '2026-08-15', dayLabel: '15 Aug', projectedBalance: 29500, income: 0, expenses: 3002 },
    ],
    pillars: [
      { name: 'Emergency Buffer', score: 88, maxScore: 100, status: 'optimal', detail: '68 days of basic expenses saved in HDFC liquid account', impactNote: 'Excellent safety cushion' },
      { name: 'Subscription Drag', score: 82, maxScore: 100, status: 'optimal', detail: '2% of salary tied to Netflix and Gym', impactNote: 'Controlled lifestyle overhead' },
      { name: 'Income Volatility', score: 95, maxScore: 100, status: 'optimal', detail: 'Fixed salary credited consistently on 1st of every month', impactNote: 'High stability score' },
      { name: 'BNPL & Debt Burden', score: 72, maxScore: 100, status: 'warning', detail: 'Credit Card utilization at 15%. Keep full balance paid before 31st.', impactNote: 'Pay in full to avoid 42% APR' },
    ],
    schemes: [
      {
        id: 'sch_7',
        name: 'Atal Pension Yojana (APY) Guaranteed Government Pension',
        category: 'Pension',
        targetAudience: ['first_time_earner', 'gig_worker'],
        benefitAmount: '₹1,000 to ₹5,000 Guaranteed Monthly Pension',
        summary: 'Government-backed pension scheme for early earners with matching co-contributions.',
        plainEnglishExplanation: 'Start contributing just ₹210/month at age 23 to lock in a guaranteed lifetime ₹5,000/month pension after age 60.',
        eligibilityCriteria: ['Age 18 to 40 years', 'Savings account holder', 'Not a statutory social security subscriber'],
        documentsRequired: ['Aadhaar Card', 'HDFC Bank Account Details', 'Nominee Details'],
        matchScore: 97,
        applicationUrl: 'https://www.npscra.nsdl.co.in',
      },
      {
        id: 'sch_8',
        name: 'Ayushman Bharat PM-JAY Cashless Health Cover',
        category: 'Healthcare',
        targetAudience: ['first_time_earner', 'gig_worker'],
        benefitAmount: '₹5 Lakh Annual Family Health Coverage',
        summary: 'World\'s largest government-funded health assurance scheme.',
        plainEnglishExplanation: 'Get zero-cash treatment up to ₹500,000 in empaneled private and government hospitals for major surgeries and treatments.',
        eligibilityCriteria: ['Listed in SECC / Ration card database', 'First-time earner under income slab'],
        documentsRequired: ['Aadhaar Card', 'Ration Card / Family Card'],
        matchScore: 91,
        applicationUrl: 'https://pmjay.gov.in',
      },
      {
        id: 'sch_9',
        name: 'PM Mudra Yojana (Kishore / Tarun Professional Loan)',
        category: 'Micro-Credit',
        targetAudience: ['first_time_earner', 'gig_worker'],
        benefitAmount: 'Up to ₹5 Lakh Collateral-Free Business Loan',
        summary: 'Low-interest loans for first-time entrepreneurs and tech freelancers.',
        plainEnglishExplanation: 'Want to start a side-agency or software consultancy? Get up to ₹500,000 low interest loan from HDFC/SBI with zero security collateral.',
        eligibilityCriteria: ['Indian citizen with viable business idea / consultancy profile'],
        documentsRequired: ['Business Proposal', 'Aadhaar & PAN', '6 Months Bank Statement'],
        matchScore: 85,
        applicationUrl: 'https://www.mudra.org.in',
      }
    ],
    scenarios: [
      {
        id: 'sc_5',
        title: 'Relocating from Noida to Bengaluru (Job Change +₹12,000 Salary)',
        description: 'New job offer at ₹44,000/mo, but Bengaluru rent & deposit are higher.',
        monthlyIncomeChange: 12000,
        monthlyExpenseChange: -6000, // Rent surge from 9,500 to 15,500
        oneTimeCost: 35000, // Deposit + Flight
        impactOnHealthScore: +6,
        newLowWaterMark: 12500,
        aiAdvice: 'Your net monthly savings will jump by ₹6,000/month after higher rent. You recover the ₹35,000 moving deposit in just 6 months!'
      },
      {
        id: 'sc_6',
        title: 'Buying iPhone 16 on 18-month No Cost EMI',
        description: 'Purchasing ₹79,900 iPhone on ₹4,440/month credit card EMI.',
        monthlyIncomeChange: 0,
        monthlyExpenseChange: -4440,
        oneTimeCost: 0,
        impactOnHealthScore: -12,
        newLowWaterMark: 8500,
        aiAdvice: 'Your subscription & EMI drag increases from 2% to 16% of monthly income. Consider waiting until appraisal cycle or selecting a 6-month tenure.'
      }
    ],
    identity: {
      passportId: 'IN-FIN-2026-EARN-9102',
      userName: 'Ankit Verma',
      persona: 'first_time_earner',
      age: 23,
      location: 'Noida / Delhi NCR',
      healthScore: 84,
      incomeStabilityIndex: 'High (Corporate Salary)',
      emergencyBufferDays: 68,
      activePlatformsCount: 6,
      cleanRepaymentHistoryMonths: 18,
      verifiedBadges: ['Verified Salaried Professional', 'Zero Credit Card Late Fees', 'CRED Silver Status', 'APY Pension Enrolled'],
      qrPayload: 'https://finos.in/passport/IN-FIN-2026-EARN-9102',
      issueDate: '24 July 2026'
    }
  }
};

export function generateCustomPersonaProfile(answers: QuestionnaireAnswers): PersonaProfile {
  const {
    fullName,
    age,
    city,
    occupation,
    monthlyIncome,
    incomeType,
    monthlyFixedExpenses,
    activeEmiLoan,
    activeBnplAmount,
    emergencySavings,
    investmentsAmount,
    primaryGoal
  } = answers;

  const totalMonthlyOutflow = (monthlyFixedExpenses || 0) + (activeEmiLoan || 0) + (activeBnplAmount || 0);
  const netMonthlyDisposable = monthlyIncome - totalMonthlyOutflow;

  // Emergency Buffer Days calculation
  const dailyBurn = totalMonthlyOutflow > 0 ? totalMonthlyOutflow / 30 : 300;
  const emergencyBufferDays = Math.min(180, Math.round((emergencySavings || 0) / dailyBurn));

  // Score calculations for 4 Pillars
  const emergencyScore = Math.min(100, Math.max(20, Math.round((emergencyBufferDays / 60) * 100)));
  const debtRatio = monthlyIncome > 0 ? (((activeEmiLoan || 0) + (activeBnplAmount || 0)) / monthlyIncome) * 100 : 50;
  const debtScore = Math.min(100, Math.max(15, Math.round(100 - debtRatio * 1.5)));

  const volatilityScore = incomeType === 'fixed_salary' ? 92 : incomeType === 'freelance' ? 68 : incomeType === 'gig_payouts' ? 60 : incomeType === 'student_allowance' ? 75 : 70;
  const bnplRatio = monthlyIncome > 0 ? ((activeBnplAmount || 0) / monthlyIncome) * 100 : 30;
  const bnplScore = Math.min(100, Math.max(20, Math.round(100 - bnplRatio * 2)));

  const overallHealthScore = Math.round((emergencyScore * 0.35) + (debtScore * 0.25) + (volatilityScore * 0.25) + (bnplScore * 0.15));

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  let currentBalance = emergencySavings || 5000;
  const forecast: CashFlowForecastPoint[] = [];

  const days = [
    { offset: 0, label: 'Today', incPct: 0, expPct: 0.02, note: 'Daily essentials & UPI scan' },
    { offset: 3, label: '+3 Days', incPct: 0, expPct: 0.05, note: 'Food & commute expense' },
    { offset: 7, label: '+7 Days', incPct: incomeType === 'gig_payouts' ? 0.3 : 0, expPct: activeBnplAmount > 0 ? (activeBnplAmount / (emergencySavings || 10000)) : 0, note: activeBnplAmount > 0 ? `Pay Later due (₹${activeBnplAmount})` : 'Weekly review' },
    { offset: 12, label: '+12 Days', incPct: 0, expPct: monthlyFixedExpenses > 0 ? 0.4 : 0.1, note: 'Rent & Utility bills' },
    { offset: 15, label: '+15 Days', incPct: incomeType === 'freelance' ? 0.5 : 0, expPct: activeEmiLoan > 0 ? (activeEmiLoan / (emergencySavings || 10000)) : 0, note: activeEmiLoan > 0 ? `EMI Auto-debit (₹${activeEmiLoan})` : 'Mid-month check' },
    { offset: 22, label: '+22 Days', incPct: 0, expPct: 0.05, note: 'Travel & utilities' },
    { offset: 30, label: '+30 Days', incPct: incomeType === 'fixed_salary' ? 1.0 : incomeType === 'student_allowance' ? 0.8 : 0.6, expPct: 0, note: `Monthly Income Credit (+₹${monthlyIncome.toLocaleString('en-IN')})` },
  ];

  let lowWaterMarkIndex = -1;
  let minBal = Infinity;

  days.forEach((d, idx) => {
    const inc = d.incPct * monthlyIncome;
    const exp = d.expPct * totalMonthlyOutflow;
    currentBalance = currentBalance + inc - exp;
    
    if (currentBalance < minBal) {
      minBal = currentBalance;
      lowWaterMarkIndex = idx;
    }

    const dDate = new Date();
    dDate.setDate(today.getDate() + d.offset);
    
    forecast.push({
      date: dDate.toISOString().split('T')[0],
      dayLabel: d.label,
      projectedBalance: Math.round(currentBalance),
      income: Math.round(inc),
      expenses: Math.round(exp),
      note: d.note
    });
  });

  if (lowWaterMarkIndex >= 0 && forecast[lowWaterMarkIndex]) {
    forecast[lowWaterMarkIndex].isLowWaterMark = true;
  }

  const platforms: PlatformAccount[] = [
    { id: 'cp1', name: 'Primary Bank', provider: 'HDFC Bank', type: 'bank', balanceOrLimit: Math.round((emergencySavings || 5000) * 0.7), currency: 'INR', icon: 'Building2', connected: true, lastSynced: 'Just now', category: 'Main Savings' },
    { id: 'cp2', name: 'Everyday PhonePe', provider: 'PhonePe', type: 'upi', balanceOrLimit: Math.round((emergencySavings || 5000) * 0.2), currency: 'INR', icon: 'Smartphone', connected: true, lastSynced: '2 mins ago', category: 'UPI Scan & Pay' },
    { id: 'cp3', name: 'Google Pay Transit', provider: 'Google Pay', type: 'upi', balanceOrLimit: Math.round((emergencySavings || 5000) * 0.1), currency: 'INR', icon: 'QrCode', connected: true, lastSynced: '10 mins ago', category: 'Snacks & Transport' },
  ];

  if (activeBnplAmount > 0) {
    platforms.push({ id: 'cp4', name: 'Pay Later / Credit', provider: 'Simpl', type: 'card', balanceOrLimit: activeBnplAmount, currency: 'INR', icon: 'CreditCard', connected: true, lastSynced: 'Today', category: 'Active Pay Later' });
  }

  const passportId = `MMM-${(city || 'IND').substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: 'custom_user',
    name: fullName || 'User',
    role: occupation || 'Independent Professional',
    age: age || 24,
    location: city || 'India',
    monthlyAverageIncome: monthlyIncome,
    monthlyAverageExpense: totalMonthlyOutflow,
    healthScore: overallHealthScore,
    platforms,
    transactions: (() => {
      const txs: Transaction[] = [];
      if (monthlyIncome > 0) {
        txs.push({ id: 'ct1', date: todayStr, amount: monthlyIncome, type: 'income', description: `${incomeType.replace('_', ' ').toUpperCase()} Credit`, plainEnglishSummary: `Monthly payout credited to account`, platform: 'Primary Bank', category: 'Income', status: 'completed', tags: ['Income'] });
      }
      if (monthlyFixedExpenses > 0) {
        txs.push({ id: 'ct2', date: todayStr, amount: monthlyFixedExpenses, type: 'expense', description: 'Fixed Monthly Expenses', plainEnglishSummary: 'Essential monthly fixed expenses', platform: 'Everyday PhonePe', category: 'Essential', status: 'completed', tags: ['Fixed', 'Essential'] });
      }
      if (activeEmiLoan > 0) {
        txs.push({ id: 'ct3', date: todayStr, amount: activeEmiLoan, type: 'expense', description: 'Monthly EMI Repayment', plainEnglishSummary: 'Scheduled monthly loan EMI deduction', platform: 'Primary Bank', category: 'BNPL / Debt', status: 'completed', tags: ['EMI', 'Debt'] });
      }
      if (activeBnplAmount > 0) {
        txs.push({ id: 'ct4', date: todayStr, amount: activeBnplAmount, type: 'expense', description: 'Pay Later Outstanding', plainEnglishSummary: 'Active Pay Later balance settlement', platform: 'Pay Later / Credit', category: 'BNPL / Debt', status: 'completed', tags: ['BNPL'] });
      }
      return txs;
    })(),
    cashFlowForecast: forecast,
    pillars: [
      { name: 'Emergency Buffer', score: emergencyScore, maxScore: 100, status: emergencyScore >= 70 ? 'optimal' : emergencyScore >= 45 ? 'warning' : 'critical', detail: `${emergencyBufferDays} days of expenses covered by ₹${(emergencySavings || 0).toLocaleString('en-IN')} liquid savings`, impactNote: emergencyBufferDays >= 30 ? 'Solid safety buffer' : 'Build to at least 30 days buffer' },
      { name: 'Debt & EMI Drag', score: debtScore, maxScore: 100, status: debtScore >= 70 ? 'optimal' : debtScore >= 50 ? 'warning' : 'critical', detail: `EMI & debt commitments take ${Math.round(debtRatio)}% of monthly income`, impactNote: debtRatio <= 25 ? 'Lean & healthy obligations' : 'High monthly commitment' },
      { name: 'Income Volatility', score: volatilityScore, maxScore: 100, status: volatilityScore >= 70 ? 'optimal' : 'warning', detail: `Income stream type: ${incomeType.replace('_', ' ')}`, impactNote: incomeType === 'fixed_salary' ? 'High predictability' : 'Varied cash inflow' },
      { name: 'BNPL & Pay Later Burden', score: bnplScore, maxScore: 100, status: bnplScore >= 75 ? 'optimal' : 'warning', detail: `Active Pay Later total: ₹${(activeBnplAmount || 0).toLocaleString('en-IN')}`, impactNote: activeBnplAmount === 0 ? 'Zero BNPL interest risk' : 'Keep paid before interest kicks in' }
    ],
    schemes: [
      {
        id: 'csch_1',
        name: 'Atal Pension Yojana (APY) Guaranteed Pension',
        category: 'Pension',
        targetAudience: ['first_time_earner', 'gig_worker', 'student'],
        benefitAmount: '₹1,000 to ₹5,000 / Month Guaranteed',
        summary: 'Government of India guaranteed monthly pension upon reaching age 60.',
        plainEnglishExplanation: `Suitable for ${occupation} in ${city}. Auto-debit a small monthly sum from your savings to build a guaranteed safety cushion.`,
        eligibilityCriteria: ['Age 18 to 40 years', 'Indian Resident with Aadhaar & Savings Account'],
        documentsRequired: ['Aadhaar Card', 'Bank Account Auto-debit consent'],
        matchScore: 95,
        applicationUrl: 'https://www.npscra.nsdl.co.in',
      },
      {
        id: 'csch_2',
        name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
        category: 'Insurance',
        targetAudience: ['first_time_earner', 'gig_worker', 'student'],
        benefitAmount: '₹2 Lakh Accidental Health/Life Coverage',
        summary: 'Accident insurance for just ₹20 per year.',
        plainEnglishExplanation: 'Get ₹200,000 insurance coverage automatically linked to your savings account.',
        eligibilityCriteria: ['Age 18 to 70 years', 'Savings account holder'],
        documentsRequired: ['Aadhaar Card'],
        matchScore: 98,
        applicationUrl: 'https://www.jansuraksha.gov.in',
      },
      {
        id: 'csch_3',
        name: 'PM-SVANidhi / PM Mudra Micro Credit Scheme',
        category: 'Micro-Credit',
        targetAudience: ['gig_worker', 'first_time_earner', 'student'],
        benefitAmount: 'Up to ₹50,000 Collateral-Free Micro Loan',
        summary: 'Interest subsidized loan for self-employed workers, freelancers, and independent service providers.',
        plainEnglishExplanation: `Get low-interest capital for digital tools or workspace equipment for ${occupation}.`,
        eligibilityCriteria: ['Self-employed, gig partner, or small business in urban/semi-urban area'],
        documentsRequired: ['Aadhaar Card', 'UPI Payment History / Bank Statement'],
        matchScore: 89,
        applicationUrl: 'https://pmsvanidhi.mohua.gov.in',
      }
    ],
    scenarios: [
      {
        id: 'csc_1',
        title: `Build ₹${((emergencySavings || 0) + 25000).toLocaleString('en-IN')} Emergency Buffer`,
        description: `Set aside ₹${Math.max(1000, Math.round(netMonthlyDisposable * 0.3)).toLocaleString('en-IN')}/month in an auto-sweep fixed deposit.`,
        monthlyIncomeChange: 0,
        monthlyExpenseChange: -Math.max(1000, Math.round(netMonthlyDisposable * 0.3)),
        oneTimeCost: 0,
        impactOnHealthScore: +12,
        newLowWaterMark: (emergencySavings || 0) + 25000,
        aiAdvice: `Saving ₹${Math.max(1000, Math.round(netMonthlyDisposable * 0.3)).toLocaleString('en-IN')}/month increases your Emergency Buffer by 35 additional days within 4 months!`
      },
      {
        id: 'csc_2',
        title: `Take ₹${Math.round(monthlyIncome * 0.5).toLocaleString('en-IN')} Gadget / Vehicle on 6-Mo EMI`,
        description: `Purchasing work equipment on ₹${Math.round((monthlyIncome * 0.5) / 6).toLocaleString('en-IN')}/month EMI.`,
        monthlyIncomeChange: Math.round(monthlyIncome * 0.1),
        monthlyExpenseChange: -Math.round((monthlyIncome * 0.5) / 6),
        oneTimeCost: 2000,
        impactOnHealthScore: -6,
        newLowWaterMark: Math.max(1000, (emergencySavings || 0) - 5000),
        aiAdvice: `Managing this EMI will consume ${Math.round((((monthlyIncome * 0.5) / 6) / monthlyIncome) * 100)}% of your monthly earnings. Maintain ₹5,000 buffer for safety.`
      }
    ],
    identity: {
      passportId,
      userName: fullName || 'User',
      persona: 'custom_user',
      age: age || 24,
      location: `${city || 'India'}`,
      healthScore: overallHealthScore,
      incomeStabilityIndex: incomeType === 'fixed_salary' ? 'High (Salaried)' : 'Moderate (Independent)',
      emergencyBufferDays,
      activePlatformsCount: platforms.length,
      cleanRepaymentHistoryMonths: 12,
      verifiedBadges: ['Custom Profile Verified', 'MapMyMoney Health Score Active', 'Government Scheme Eligible', 'Clean UPI Record'],
      qrPayload: `https://mapmymoney.in/passport/${passportId}`,
      issueDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  };
}

