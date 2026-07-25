# MapMyMoney 🚀

> **Intelligent Financial Operating System for India's Young Workforce & Gig Economy**

MapMyMoney is a hyper-focused financial operating system engineered for India's next 100M earners—students, gig creators, freelancers, and first-time professionals navigating fragmented UPI transactions, variable incomes, and financial decision-making.

---

## ⚡ Key Highlights & Features

1. **Unified Cash Flow & UPI Aggregator (`PlatformAggregator`)**
   - Live multi-account aggregation across PhonePe, Google Pay, Paytm, CRED, Amazon Pay, and Bank Accounts.
   - Smart CSV / SMS / UPI Statement Parser for instant offline ingestion.
   - Add/edit transactions directly with instant category tag auto-tuning.

2. **30-Day Predictive Liquidity (`CashFlowPredictor`)**
   - Predictive cash flow trajectory based on upcoming fixed bills, discretionary spending, and expected gig income.
   - Real-time scenario sandbox slider for testing expense shocks.

3. **Government Scheme & Benefit Matcher (`GovernmentBenefits`)**
   - Real-time eligibility matching for central & state financial welfare programs (PM Svamitva, PM Kisan, Post-Matric Scholarships, MUDRA Shishu loans).
   - Direct application guidance and benefit impact calculation.

4. **Life Event Simulator (`LifeEventSimulator`)**
   - Dynamic simulation for major financial milestones (Buying a Laptop, Relocating to a Tier-1 City, Vehicle EMI, Emergency Medical Fund).
   - Chain-Reaction Visualizer mapping cascading financial effects.

5. **Financial Readiness Pulse & Health Score (`HealthScore`)**
   - 0-100 Financial Health index evaluating Emergency Runway, Debt-to-Income, Savings Velocity, and Fixed Overhead Ratio.

6. **AI Financial Advisor ("FinBot")**
   - Multi-persona (Strict Mentor, Supportive Coach, Gen-Z Hinglish Advisor) conversational AI assistant.
   - Supports 6 regional languages (English, Hinglish, Hindi, Tamil, Telugu, Kannada, Marathi).

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts, Motion
- **Backend**: Express.js proxy server with ESBuild CJS bundling
- **AI Integration**: Google GenAI SDK (`@google/genai`) for multi-persona financial advice and scheme eligibility parsing
- **Localization**: Native i18n support for 6 regional languages

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ or v20+
- **npm** or **bun**

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/map-my-money.git
cd map-my-money
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"
```

> **Note**: Even if `GEMINI_API_KEY` is omitted, the application falls back gracefully to high-precision built-in rule engines for offline usage.

### 3. Run Locally
Start the unified Express + Vite dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Start
```bash
# Build client & server bundle
npm run build

# Start production server
npm run start
```

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Application header & language switcher
│   │   ├── DashboardHero.tsx       # Primary balance summary & quick actions
│   │   ├── HealthScore.tsx         # Financial Readiness Pulse score
│   │   ├── PlatformAggregator.tsx  # Multi-platform UPI aggregator & parser
│   │   ├── CashFlowPredictor.tsx   # 30-day liquidity forecasting
│   │   ├── GovernmentBenefits.tsx  # Scheme matching engine
│   │   ├── LifeEventSimulator.tsx  # Event simulation & chain reaction
│   │   ├── FinBotChat.tsx          # Multi-persona AI financial coach
│   │   ├── FinancialIdentity.tsx   # User profile & financial persona
│   │   └── OnboardingModal.tsx     # Setup wizard
│   ├── data/
│   │   └── mockData.ts             # Realistic sample data & scheme registry
│   ├── utils/
│   │   └── i18n.ts                 # Multilingual translation dictionary
│   ├── types.ts                    # Global TypeScript interfaces
│   ├── App.tsx                     # Main layout & state orchestration
│   └── main.tsx                    # Entry point
├── server.ts                       # Express backend API & Vite middleware
├── .env.example                    # Environment variable guide
├── package.json                    # Dependencies & scripts
└── README.md                       # Project documentation
```

---

## 📜 License

MIT License.
