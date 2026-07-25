export type SupportedLanguage = 'English' | 'Hindi' | 'Hinglish' | 'English / Hinglish';

export const translations: Record<string, Record<string, string>> = {
  English: {
    appTitle: 'MapMyMoney',
    tagline: 'Intelligent Financial Operating System',
    userMode: 'User Mode',
    demoMode: 'Demo Mode',
    guestMode: 'Guest Mode',
    switchMode: 'Switch Mode',
    activeProfile: 'Active Profile',
    monthlyInflow: 'Monthly Inflow',
    healthScore: 'Health Score',
    customizeProfile: 'Retake / Edit Profile',
    aiCoachBtn: 'Smart Advisor',
    
    tabPlatformStream: 'Accounts & Stream',
    tabCashFlow: 'Cash Flow Forecast',
    tabHealth: 'Health Pulse',
    tabGovSubsidies: 'Govt Schemes',
    tabSimulator: 'Life Simulator',
    tabPassport: 'Financial Passport',

    connectedAccounts: 'Connected Accounts & UPI Platforms',
    addTransaction: 'Add Transaction',
    uploadStatement: 'Parse Bank SMS Statement',
    recentActivity: 'Recent Financial Stream',
    inflow: 'Inflow',
    outflow: 'Outflow',
    essential: 'Essential',
    discretionary: 'Discretionary',
    
    predictiveTitle: '30-Day Predictive Cash Flow',
    predictiveSubtitle: 'Projecting balance drops and upcoming bill dues before auto-debit hits.',
    lowWaterMark: 'Predicted Low-Water Mark',
    aiAdvice: 'Mitigation Strategy',

    healthTitle: 'MapMyMoney Health Pulse',
    healthSubtitle: 'Measuring liquidity buffers, debt ratios, and income stability.',
    pillarEmergency: 'Emergency Buffer',
    pillarDebt: 'Debt Drag',
    pillarVolatility: 'Income Stability',
    pillarBnpl: 'BNPL Burden',

    govTitle: 'Govt Schemes & Benefits',
    govSubtitle: 'Schemes Eligibility',
    findSchemes: 'Find Custom Schemes',
    applyNow: 'Apply on Official Portal',

    simTitle: 'Life Event & Expense Simulator',
    simSubtitle: 'Stress-test your health before buying gadgets, taking loans, or relocating.',
    runSim: 'Run Impact Analysis',

    passportTitle: 'Verifiable Financial Passport',
    passportSubtitle: 'Portable financial identity for landlords, lenders, and gig employers.',
    sharePassport: 'Share Passport',
    exportJson: 'Export JSON',
    exportMd: 'Export Markdown',

    footerText: 'MapMyMoney — Intelligent Financial Operating System for India\'s Young Workforce',
  },
  Hindi: {
    appTitle: 'MapMyMoney',
    tagline: 'स्मार्ट वित्तीय ऑपरेटिंग सिस्टम',
    userMode: 'यूजर मोड',
    demoMode: 'डेमो मोड',
    guestMode: 'गेस्ट मोड',
    switchMode: 'मोड बदलें',
    activeProfile: 'सक्रिय प्रोफाइल',
    monthlyInflow: 'मासिक आय',
    healthScore: 'रेडीनेस स्कोर',
    customizeProfile: 'प्रोफाइल बदलें / प्रश्न उत्तर',
    aiCoachBtn: 'स्मार्ट सलाहकार',

    tabPlatformStream: 'खाता व UPI स्ट्रीम',
    tabCashFlow: 'कैश फ्लो भविष्यवाणी',
    tabHealth: 'रेडीनेस पल्स (स्कोर)',
    tabGovSubsidies: 'सरकारी योजनाएं',
    tabSimulator: 'लाइफ सिमुलेटर',
    tabPassport: 'फाइनेंशियल पासपोर्ट',

    connectedAccounts: 'जुड़े बैंक खाते और UPI प्लेटफॉर्म',
    addTransaction: '+ नया लेनदेन जोड़ें',
    uploadStatement: 'बैंक SMS स्टेटमेंट स्कैन करें',
    recentActivity: 'हाल के लेनदेन की सूची',
    inflow: 'क्रेडिट (आय)',
    outflow: 'डेबिट (खर्च)',
    essential: 'आवश्यक खर्च',
    discretionary: 'अन्य खर्च',

    predictiveTitle: '30 दिनों की कैश फ्लो भविष्यवाणी',
    predictiveSubtitle: 'बिल और EMI काटने से पहले अपने न्यूनतम बैंक बैलेंस का पूर्वानुमान लगाएं।',
    lowWaterMark: 'अनुमानित न्यूनतम बैलेंस',
    aiAdvice: 'बचाव योजना',

    healthTitle: 'MapMyMoney रेडीनेस पल्स',
    healthSubtitle: 'आपकी वित्तीय मजबूती, आपातकालीन फंड और कर्ज क्षमता का वास्तविक मापन।',
    pillarEmergency: 'इमरजेंसी फंड buffer',
    pillarDebt: 'कर्ज और EMI भार',
    pillarVolatility: 'आय की स्थिरता',
    pillarBnpl: 'पे-लेटर (BNPL) बोझ',

    govTitle: 'सरकारी योजनाएं और सब्सिडी मैच',
    govSubtitle: 'आपके प्रोफाइल के अनुसार केंद्र व राज्य सरकार की पेंशन, बीमा व सब्सिडी पाएं।',
    findSchemes: 'योजनाएं खोजें',
    applyNow: 'आधिकारिक पोर्टल पर आवेदन करें',

    simTitle: 'लाइफ इवेंट और खर्च सिमुलेटर',
    simSubtitle: 'नया गैजेट, बाइक EMI या घर किराए पर लेने से पहले अपने बजट का स्ट्रेस-टेस्ट करें।',
    runSim: 'सिमुलेशन चलाएं',

    passportTitle: 'सत्यापित फाइनेंशियल पासपोर्ट',
    passportSubtitle: 'मकान मालिक, बैंक और नौकरी के लिए आपका पोर्टेबल वित्तीय साख प्रमाण।',
    sharePassport: 'पासपोर्ट शेयर करें',
    exportJson: 'JSON डाउनलोड',
    exportMd: 'Markdown डाउनलोड',

    footerText: 'MapMyMoney — भारत के युवाओं के लिए स्मार्ट वित्तीय ऑपरेटिंग सिस्टम',
  },
  Hinglish: {
    appTitle: 'MapMyMoney',
    tagline: 'Intelligent Financial Operating System for India',
    userMode: 'User Mode',
    demoMode: 'Demo Mode',
    guestMode: 'Guest Mode',
    switchMode: 'Mode Change',
    activeProfile: 'Active Profile',
    monthlyInflow: 'Monthly Earnings',
    healthScore: 'Health Score',
    customizeProfile: 'Edit Profile Answers',
    aiCoachBtn: 'Smart Advisor',

    tabPlatformStream: 'Accounts & UPI Stream',
    tabCashFlow: 'Cash Flow Forecast',
    tabHealth: 'Health Score',
    tabGovSubsidies: 'Govt Schemes',
    tabSimulator: 'Life Simulator',
    tabPassport: 'Financial Passport',

    connectedAccounts: 'Connected Bank Accounts & UPI Apps',
    addTransaction: '+ Add Expense / Income',
    uploadStatement: 'Scan SMS Bank Statement',
    recentActivity: 'Recent Transactions Stream',
    inflow: 'Inflow (Paise Aaye)',
    outflow: 'Outflow (Kharcha)',
    essential: 'Zaroori Kharcha',
    discretionary: 'Extra Kharcha',

    predictiveTitle: '30-Day Cash Flow Prediction',
    predictiveSubtitle: 'Rent or EMI debit hone se pehle low balance warning dekhein.',
    lowWaterMark: 'Lowest Expected Balance',
    aiAdvice: 'Safety Tip',

    healthTitle: 'MapMyMoney Health Pulse',
    healthSubtitle: 'Aapka emergency buffer, loan drag aur income stability test.',
    pillarEmergency: 'Emergency Savings',
    pillarDebt: 'Loan & EMI Load',
    pillarVolatility: 'Income Regularity',
    pillarBnpl: 'Pay Later (BNPL) Bill',

    govTitle: 'Government Schemes & Grants',
    govSubtitle: 'Aapke profile ke hisaab se sarkari schemes aur subsidies dekhein.',
    findSchemes: 'Find Custom Schemes',
    applyNow: 'Official Site Par Apply Karein',

    simTitle: 'Life Event & EMI Simulator',
    simSubtitle: 'Naya phone, laptop ya loan lene se pehle cash flow par asar dekhein.',
    runSim: 'Run Test',

    passportTitle: 'Verifiable Financial Passport',
    passportSubtitle: 'Landlords aur lenders ko dikhane ke liye aapka verifiable ID card.',
    sharePassport: 'Share Passport Link',
    exportJson: 'Download JSON',
    exportMd: 'Download MD',

    footerText: 'MapMyMoney — Intelligent Financial Operating System for India',
  }
};

export function getTranslation(lang: string, key: string): string {
  const normLang = lang.includes('Hindi') ? 'Hindi' : lang.includes('Hinglish') ? 'Hinglish' : 'English';
  return translations[normLang]?.[key] || translations['English']?.[key] || key;
}
