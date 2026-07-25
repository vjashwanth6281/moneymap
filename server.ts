import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Mock fallback responses will be used if needed.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || 'DUMMY_KEY',
    httpOptions: {
      headers: {
        'User-Agent': 'mapmymoney-app',
      },
    },
  });
};

// API Endpoint 1: Multilingual Financial Advisor Chatbot
app.post('/api/engine/advisor-chat', async (req, res) => {
  try {
    const { message, persona, history, language = 'English / Hinglish' } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: `[AI Advisor Mode] Hello ${persona?.name || 'there'}! I am FinOS India AI. Based on your current profile in ${persona?.location || 'India'}, managing expenses and maintaining a high Financial Standing Score is essential. You asked: "${message}". Keep your subscription drag under 5% and maintain a 30-day emergency buffer!`,
      });
    }

    const ai = getGemini();
    
    const systemPrompt = `You are FinOS India, an empathetic, smart financial operating system assistant for India's young workforce (Students, Gig Workers, First-Time Earners).
User Context:
Name: ${persona?.name || 'User'}
Role: ${persona?.role || 'Young Earner'}
Persona Type: ${persona?.id || 'Student/Worker'}
Location: ${persona?.location || 'India'}
Monthly Income: ₹${persona?.monthlyAverageIncome || 20000}
Financial Standing Score: ${persona?.healthScore || 70}/100

Instructions:
1. Speak in a friendly, plain-language, encouraging tone suitable for India's youth.
2. If language requested is Hinglish or Hindi, weave common Indian terms smoothly (e.g., "Sahi Hai", "Bachat", "EMI trap", "Tapri Chai", "Jugaad").
3. Always explain financial decisions clearly with zero dry jargon.
4. Keep answers focused, practical, and actionable (2-3 concise paragraphs max).
5. Address queries about UPI apps (PhonePe, GPay, Paytm), BNPL (Simpl, LazyPay, CRED), government schemes (e-Shram, PM-SVANidhi, NSP, APY), and cash flow predictions.`;

    const chatHistory = history?.map((h: any) => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n') || '';
    const fullPrompt = `${chatHistory}\nUser: ${message}\nLanguage preference: ${language}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "I'm analyzing your cash flow. Please try asking again!",
    });
  } catch (error: any) {
    console.error('Advisor Chat Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate financial advice' });
  }
});

// API Endpoint 2: Bank SMS / UPI Statement AI Parser
app.post('/api/engine/parse-statement', async (req, res) => {
  try {
    const { statementText, fileData, mimeType } = req.body;

    if ((!statementText || statementText.trim().length === 0) && !fileData) {
      return res.status(400).json({ error: 'Statement text or file is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        parsedTransactions: [
          {
            description: 'PhonePe Tapri Chai Payment',
            amount: 35,
            type: 'expense',
            platform: 'PhonePe',
            category: 'Discretionary',
            plainEnglishSummary: 'Chai and snack scan at local tea stall',
            tags: ['Chai', 'UPI'],
          },
          {
            description: 'Swiggy Delivery Payout',
            amount: 1250,
            type: 'income',
            platform: 'Swiggy Partner',
            category: 'Income',
            plainEnglishSummary: 'Weekly delivery incentive payout received',
            tags: ['Payout', 'Gig'],
          },
        ],
      });
    }

    const ai = getGemini();

    let parts: any[] = [];
    
    if (fileData && mimeType) {
      parts.push({
        inlineData: {
          data: fileData,
          mimeType: mimeType,
        },
      });
    }

    const promptText = `Parse the following raw SMS, transaction bank statement snippet, or document from an Indian user.
Convert it into a JSON array of parsed transactions with these keys:
- description: string (original merchant or description)
- amount: number (in INR)
- type: 'income' | 'expense'
- platform: 'PhonePe' | 'Google Pay' | 'Paytm' | 'CRED' | 'Amazon Pay' | 'HDFC Bank' | 'SBI Bank' | 'Swiggy Partner' | 'Simpl'
- category: 'Essential' | 'Discretionary' | 'Subscription' | 'Income' | 'BNPL / Debt'
- plainEnglishSummary: string (a 1-sentence friendly plain English description)
- tags: string[] (array of 2 short tags)

Statement Text (if any):
"""
${statementText || 'Please read from the attached document.'}
"""

Return ONLY valid JSON array with no extra markdown wrap.`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: parts,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let parsed = [];
    try {
      parsed = JSON.parse(response.text || '[]');
    } catch (e) {
      parsed = [];
    }

    res.json({ parsedTransactions: parsed });
  } catch (error: any) {
    console.error('Statement Parser Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to parse statement' });
  }
});

// API Endpoint 3: AI Government Benefits & Scheme Matcher
app.post('/api/engine/scheme-match', async (req, res) => {
  try {
    const { persona, query } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        schemes: [
          {
            id: 'custom_1',
            name: 'PM-KUSUM Solar Subsidy for Agricultural & Gig Charging',
            category: 'Housing & Asset',
            targetAudience: ['gig_worker', 'first_time_earner'],
            benefitAmount: '60% Government Subsidy',
            summary: 'Subsidized solar equipment setup for green EV charging.',
            plainEnglishExplanation: 'Get up to 60% government grant if you install solar charging points for electric delivery scooters.',
            eligibilityCriteria: ['Indian resident', 'Aadhaar verified'],
            documentsRequired: ['Aadhaar', 'Address Proof'],
            matchScore: 92,
            applicationUrl: 'https://pmkusum.mnre.gov.in',
          },
        ],
      });
    }

    const ai = getGemini();

    const prompt = `User profile:
Name: ${persona?.name}
Role: ${persona?.role}
Age: ${persona?.age}
Location: ${persona?.location}
Income: ₹${persona?.monthlyAverageIncome}

Query / Focus: ${query || 'Find government welfare schemes, scholarships, insurance, or micro-credit loans for me in India.'}

Generate 2 custom relevant Indian Government / State Welfare Schemes that match this profile.
Return a JSON array of objects with schema:
[
  {
    "id": "string",
    "name": "string (Scheme Title)",
    "category": "Scholarship" | "Insurance" | "Micro-Credit" | "Pension" | "Healthcare" | "Housing & Asset",
    "targetAudience": ["student" | "gig_worker" | "first_time_earner"],
    "benefitAmount": "string (e.g. ₹12,000 / year)",
    "summary": "string (1 line summary)",
    "plainEnglishExplanation": "string (explained simply in plain language)",
    "eligibilityCriteria": ["string"],
    "documentsRequired": ["string"],
    "matchScore": number (80 to 99),
    "applicationUrl": "string"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let schemes = [];
    try {
      schemes = JSON.parse(response.text || '[]');
    } catch (e) {
      schemes = [];
    }

    res.json({ schemes: schemes });
  } catch (error: any) {
    console.error('Scheme Matcher Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to match schemes' });
  }
});

// API Endpoint 4: Life Event Simulation Deep Analysis
app.post('/api/engine/simulate-event', async (req, res) => {
  try {
    const { persona, scenarioDetails } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        analysis: `Simulated Analysis for "${scenarioDetails?.title}":
1. Cash Flow Impact: Your monthly disposable balance changes by ₹${scenarioDetails?.monthlyIncomeChange - Math.abs(scenarioDetails?.monthlyExpenseChange || 0)}.
2. Financial Standing Pulse: Score adjusts to ${persona?.healthScore + (scenarioDetails?.impactOnHealthScore || 0)}/100.
3. Plain Language Advice: Keep a safety buffer of at least 30 days before committing to long-term EMIs or rent shifts.`,
      });
    }

    const ai = getGemini();

    const prompt = `Perform a high-precision financial simulation analysis for an Indian user in plain language.
User: ${persona?.name} (${persona?.role}, Age ${persona?.age}, ${persona?.location})
Current Financial Standing Score: ${persona?.healthScore}/100
Current Monthly Income: ₹${persona?.monthlyAverageIncome}
Current Monthly Expense: ₹${persona?.monthlyAverageExpense}

Simulated Event:
Title: ${scenarioDetails?.title}
Details: ${scenarioDetails?.description}
Income Change: ₹${scenarioDetails?.monthlyIncomeChange}/mo
Expense Change: ₹${scenarioDetails?.monthlyExpenseChange}/mo
One-time Upfront Cost: ₹${scenarioDetails?.oneTimeCost}

Explain in 3 distinct plain-language sections:
1. Cash Flow & Low-Water Mark Projection (What happens to bank/wallet balance on key dates)
2. Financial Standing Score Impact & Risk Assessment (Why the score changes and potential hidden pitfalls)
3. Step-by-Step Strategic Action Plan (3 concrete things to do before making this decision)`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Simulation Analysis Error:', error);
    res.status(500).json({ error: error?.message || 'Failed to run simulation analysis' });
  }
});

async function startServer() {
  // Vite middleware setup in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FinOS India] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
