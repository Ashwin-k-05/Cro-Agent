# ConvertIQ — AI Landing Page CRO Agent

> An institutional-grade, multi-model AI agent that analyzes any public Shopify store, SaaS landing page, or e-commerce URL, evaluates 6 core conversion pillars, and produces a prioritized CRO audit dashboard with actionable fixes and copy rewrites.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Validation-Zod-3068b7?style=flat&logo=zod)](https://zod.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🔗 Live Links

| Resource | Link |
|---|---|
| 🌐 **Live Deployed App** | [https://cro-agent-indol.vercel.app/](https://cro-agent-indol.vercel.app/)  |
| 🎥 **Demo Video Walkthrough** | [Watch Demo Video (Loom / YouTube)](https://your-video-link-here.com)  |

---

## 1. Project Overview

**ConvertIQ** is an autonomous Conversion Rate Optimization (CRO) intelligence agent. By simply entering any publicly accessible URL—such as a Shopify direct-to-consumer product page or B2B SaaS landing page—users receive a rigorous, executive-level CRO audit in seconds.

The system programmatically fetches the webpage HTML, extracts DOM semantics, structured JSON-LD schemas, Shopify product tags, trust markers, forms, and call-to-actions, synthesizes this data into a structured prompt for advanced reasoning models (Google Gemini / Claude 3.5 Sonnet / GPT-4o), strictly validates the resulting schema with Zod, and renders an interactive, executive SaaS dashboard with:
- Calibrated 0–100 CRO benchmark score
- 6 conversion pillar evaluations (Hero, CTA, Trust, Product, Mobile UX, Copy Clarity)
- Identified conversion friction points and drop-off risks
- Prioritized recommendations (High / Medium / Low impact & effort)
- High-converting AI copy rewrites with one-click copy
- Instant PDF report export

> **Zero-Config Ready**: If no external API keys are configured, a built-in context-aware heuristic analyzer automatically takes over, allowing full end-to-end functionality out of the box.

---

## 2. Architecture & How It Works

### High-Level Request Pipeline

```text
User Enters Target URL
         │
         ▼
Next.js App Router (Client Dashboard)
         │
         ▼  POST /api/audit  { url: "https://..." }
Serverless Route Handler (`app/api/audit/route.ts`)
         │
         ▼
[1] Headless Web Scraper (`lib/scraper.ts`)
    ├── Fetches HTML with browser headers & timeout guard
    ├── Parses headings (H1–H3), buttons, forms & viewport metadata
    ├── Extracts Schema.org / JSON-LD structured e-commerce data
    └── Detects Shopify platform markers, pricing & trust badges
         │
         ▼
[2] Multi-LLM Orchestrator (`lib/llm.ts`)
    ├── Priority 1: Google Gemini (gemini-2.0-flash / gemini-1.5-flash)
    ├── Priority 2: Anthropic Claude (claude-3-5-sonnet)
    ├── Priority 3: OpenAI GPT-4o (structured JSON mode)
    └── Fallback: Calibrated Context-Aware Heuristic Engine (Zero-Config)
         │
         ▼
[3] Zod Schema Validation (`lib/schemas.ts`)
    └── Strictly validates and types LLM JSON output against `croAuditSchema`
         │
         ▼
[4] Interactive Dashboard (`components/audit-dashboard.tsx`)
    ├── Visual 0–100 benchmark score & tier classification
    ├── Conversion pillar breakdown & friction point matrix
    ├── Impact vs. Effort prioritization roadmap
    ├── AI headline & CTA copy rewrites with 1-click clipboard copy
    └── Client-side print & PDF export (`react-to-print`)
```

### Brief Architectural Highlights:
1. **Serverless & Stateless**: Operates 100% without a database. Eliminates data persistence risks, user data tracking, and maintenance overhead.
2. **Cheerio over Headless Browsers**: Uses lightweight serverless Cheerio parsing instead of heavy headless Chromium, yielding sub-100ms parsing times and preventing memory crashes on cloud runtimes.
3. **Resilient AI Fallback**: If an API provider experiences rate limits or if no API key is supplied, the built-in signal analyzer automatically generates a calibrated audit so the application never breaks.
4. **Strict Schema Guarantee**: LLM responses are parsed and validated via Zod before reaching the frontend, eliminating runtime rendering errors.

---

## 3. Key Features & The 6 CRO Pillars

- **Hero Section Analysis**: Value proposition immediacy, headline clarity, and above-the-fold relevance.
- **CTA Quality Audit**: Button contrast, visual hierarchy, micro-copy, and action psychology.
- **Trust & Proof Signals**: Placement and strength of reviews, security seals, warranties, and social proof.
- **Product Page Diagnostic**: Pricing clarity, shipping transparency, specification overload, and risk reversal.
- **Mobile UX Signals**: Viewport responsiveness, content density, and touch target feasibility.
- **Copy Clarity & Tone**: Customer-centric ("You" vs "We") balance and readability.
- **Friction Points Matrix**: Categorized blockers flagged with High, Medium, or Low severity.
- **Prioritized Recommendations**: Impact vs. Effort matrix to guide immediate conversion uplifts.
- **AI Copy Variations**: Generates alternative headlines and 3 distinct CTA psychology angles (Direct, Value-First, Risk-Reversal).
- **Executive PDF Export**: Clean client-side PDF and paper report printing via `react-to-print`.

---

## 4. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | React 19 Server & Client Components, Serverless API routes |
| **Language** | TypeScript 5 | Strict end-to-end type safety |
| **Styling** | Tailwind CSS v4 | Modern dark-mode aesthetic with CSS variables |
| **Icons** | Lucide React | Professional icon system |
| **Scraper** | Cheerio + Native Fetch | Lightweight serverless DOM and metadata extraction |
| **AI / LLM** | Google Gemini / Claude 3.5 / GPT-4o | Multi-model conversion reasoning |
| **Validation** | Zod | Runtime schema validation for requests and LLM output |
| **Export** | react-to-print | Browser-native PDF and print report generation |

---

## 5. Local Setup Instructions

Follow these step-by-step instructions to run the project locally on your machine.

### Prerequisites
- **Node.js**: `v18.18+` or `v20+` installed ([Download Node.js](https://nodejs.org/))
- **Git**: Installed on your system ([Download Git](https://git-scm.com/))
- **Package Manager**: `npm` (bundled with Node.js), `pnpm`, or `yarn`

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/cro-agent.git
cd cro-agent
```

---

### Step 2: Install Dependencies
```bash
npm install
```

---

### Step 3: Configure Environment Variables (Optional)
The project runs out-of-the-box with its built-in heuristic engine even without API keys. To enable live AI reasoning, create a `.env.local` file in the project root:

```bash
# Windows PowerShell:
New-Item .env.local -ItemType File

# Or Bash / macOS / Linux:
touch .env.local
```

Open `.env.local` and add your preferred provider key(s):
```env
# Google Gemini (Recommended for speed & low latency)
GEMINI_API_KEY=your_gemini_api_key_here

# Anthropic Claude (Optional)
ANTHROPIC_API_KEY=sk-ant-api03-...

# OpenAI GPT-4o (Optional)
OPENAI_API_KEY=sk-proj-...
```

---

### Step 4: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

---

### Step 5: Build for Production
To test the production build locally:
```bash
npm run build
npm run start
```

---

## 6. Environment Variables Reference

| Variable | Provider | Required | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Google Gemini | Optional | Used for Gemini 2.0 / 1.5 Flash CRO analysis (Priority 1). |
| `ANTHROPIC_API_KEY` | Anthropic | Optional | Used for Claude 3.5 Sonnet CRO analysis (Priority 2). |
| `OPENAI_API_KEY` | OpenAI | Optional | Used for GPT-4o structured JSON completion (Priority 3). |

*(If none are supplied, the app seamlessly defaults to the zero-config context analyzer).*

---

## 7. Deployment to Vercel

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete cro agent application"
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. **Vercel Project Configuration:**
   - **Root Directory:** Leave as `./` (default)
   - **Framework Preset:** `Next.js`
   - **Build & Output Settings:** Leave all switches **OFF** (Vercel uses defaults automatically)
5. **Add Environment Variables:**
   - Under **Environment Variables**, add `GEMINI_API_KEY` (or your chosen provider key).
6. Click **Deploy**.

---

## 8. License

Distributed under the **MIT License**. See `LICENSE` for more information.
