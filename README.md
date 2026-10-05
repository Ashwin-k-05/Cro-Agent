# ConvertIQ — AI Landing Page CRO Agent

> Fast, production-grade AI conversion rate optimization agent that analyzes any public Shopify store, SaaS landing page, or website, evaluates 6 core conversion pillars, and delivers a prioritized audit dashboard with actionable fixes.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Validation-Zod-3068b7?style=flat&logo=zod)](https://zod.dev/)
[![Anthropic Claude](https://img.shields.io/badge/LLM-Claude_3.5_Sonnet-d97706?style=flat)](https://www.anthropic.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 1. Project Overview

The **AI Landing Page CRO Agent** allows users to enter any publicly accessible URL—such as a Shopify product page or marketing landing page—and receive an institutional-quality CRO audit in seconds. 

The system programmatically fetches the webpage HTML, extracts DOM semantics, structured JSON-LD schemas, Shopify product tags, trust markers, forms, and call-to-actions, synthesizes this data into a structured prompt for advanced reasoning models (Claude 3.5 Sonnet / GPT-4o), strictly validates the resulting schema with Zod, and renders an interactive, executive SaaS dashboard with:
- Calibrated 0–100 CRO benchmark score
- 6 conversion pillar evaluations (Hero, CTA, Trust, Product, Mobile UX, Copy Clarity)
- Identified conversion friction points and drop-off risks
- Prioritized recommendations (High / Medium / Low impact & effort)
- High-converting AI copy rewrites with one-click copy
- Instant PDF report export

The application operates completely **stateless without a database**, making it lightweight, zero-maintenance, and directly deployable to Vercel or any modern edge runtime.

---

## 2. Features

- **Automated Webpage Scraper & DOM Extractor**: High-speed Cheerio scraper extracts H1/H2/H3 headings, meta tags, button CTAs, navigation links, alt attributes, form elements, and structured JSON-LD data.
- **E-Commerce & Shopify Intelligence**: Automatically identifies Shopify engines, product titles, regular & discounted pricing, inventory availability, shipping notices, and trust badges.
- **Calibrated 0–100 CRO Scoring Engine**: Computes benchmark scores across five performance tiers (*Critical, Needs Improvement, Good, Strong, Excellent*).
- **Hero Section Analysis**: Diagnoses value proposition immediacy, competitive differentiation, and headline resonance above the fold.
- **CTA Quality Audit**: Evaluates visual prominence, button copy psychology, and competing action noise.
- **Trust & Proof Signals**: Identifies presence and placement of verified reviews, guarantees, SSL indicators, and social proof.
- **Product Page Diagnostic**: Identifies pricing anchors, specification overload, and risk-reversal gaps.
- **Mobile UX Observations**: Evaluates structural density, mobile layout signals, viewport declarations, and vertical scroll barriers.
- **Copy Clarity & Tone**: Inspects readability, feature-vs-benefit orientation, and "You-to-We" customer focus.
- **Friction Points Matrix**: Classifies friction points with severity badges (*High, Medium, Low*) and interactive filtering.
- **Prioritized Recommendations Roadmap**: Categorized and scored recommendations based on expected conversion uplift vs engineering complexity.
- **Quick Wins**: Highlights low-effort, immediate-uplift optimizations.
- **AI Copy Variations**: Generates alternative hero headlines, value statements, and 3 distinct CTA psychology angles (Direct, Value-First, Risk-Reversal) with one-click clipboard copying.
- **PDF Report Generation**: Direct client-side print and PDF export with clean print typography via `react-to-print`.
- **Zero-Config Demoability**: Built-in context-aware heuristic analyzer automatically activates if no external LLM API key is configured, guaranteeing full end-to-end functionality out of the box.

---

## 3. Architecture

```text
User Enters URL
      │
      ▼
Next.js App Router (Frontend Dashboard)
      │
      ▼ (POST /api/audit)
Next.js Serverless Route Handler
      │
      ▼
Native Fetch + Cheerio Web Scraper
 ├── Extracts Headings (H1/H2/H3)
 ├── Extracts Buttons & CTAs
 ├── Parses Schema.org / JSON-LD
 ├── Detects Shopify Signals & Trust Markers
 └── Computes Structural Signals (Word count, Alt tags, Viewport)
      │
      ▼
Structured Page Context
      │
      ▼
LLM Orchestrator (`lib/llm.ts`)
 ├── Primary: Anthropic Claude 3.5 Sonnet
 ├── Fallback: OpenAI GPT-4o
 └── Fallback: Context-Aware CRO Analyzer Engine
      │
      ▼
JSON Extraction & Normalization
      │
      ▼
Zod Schema Validation (`croAuditSchema`)
      │
      ▼
Validated CRO Audit Object
      │
      ▼
Interactive React Dashboard + PDF Export
```

---

## 4. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | React Server Components, API routes, fast bundling |
| **Language** | TypeScript 5 | Strict end-to-end type safety |
| **Styling** | Tailwind CSS v4 | Curated dark-mode design system with responsive layouts |
| **Icons** | Lucide React | Professional icon system |
| **Scraping** | Cheerio + Native Fetch | High-speed, lightweight serverless DOM extraction |
| **LLM Providers** | Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o | Deep conversion reasoning & structured JSON output |
| **Validation** | Zod | Runtime schema validation for requests and LLM responses |
| **Print / Export** | react-to-print | Native PDF and paper report printing |

---

## 5. Setup & Local Development

### Prerequisites

- Node.js 18.18+ or 20+
- npm or pnpm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cro-agent.git
cd cro-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables (Optional)

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Primary LLM provider
ANTHROPIC_API_KEY=sk-ant-api03-...

# Alternative / Fallback provider (optional)
OPENAI_API_KEY=sk-proj-...
```

> **Note**: If no API keys are provided, the application runs its calibrated contextual analyzer engine seamlessly. You can test and demonstrate the full flow immediately.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production build

```bash
npm run build
npm run start
```

---

## 6. Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Optional | `""` | Google Gemini API key used for Gemini 1.5 Pro CRO analysis. |
| `ANTHROPIC_API_KEY` | Optional | `""` | Anthropic API key used for Claude 3.5 Sonnet CRO analysis. |
| `OPENAI_API_KEY` | Optional | `""` | OpenAI API key used for GPT-4o JSON completion. |

---

## 7. API Reference

### `POST /api/audit`

Analyzes a target webpage and returns a structured conversion rate optimization audit.

#### Request Headers

```http
Content-Type: application/json
```

#### Request Body

```json
{
  "url": "https://example-store.com/products/example-product"
}
```

#### Response Structure (`200 OK`)

```json
{
  "success": true,
  "audit": {
    "croScore": 76,
    "summary": "The page demonstrates strong brand presentation...",
    "scoreTier": "Strong",
    "heroSection": {
      "score": 8,
      "analysis": "Headline is benefit-driven and prominent...",
      "issues": ["..."],
      "recommendations": ["..."]
    },
    "ctaQuality": {
      "score": 7,
      "analysis": "...",
      "issues": ["..."],
      "recommendations": ["..."]
    },
    "trustSignals": {
      "score": 6,
      "analysis": "...",
      "issues": ["..."],
      "recommendations": ["..."]
    },
    "productPageIssues": {
      "score": 7,
      "analysis": "...",
      "issues": ["..."],
      "recommendations": ["..."]
    },
    "mobileUX": {
      "score": 8,
      "analysis": "...",
      "issues": ["..."],
      "recommendations": ["..."]
    },
    "copyClarity": {
      "score": 7,
      "analysis": "...",
      "issues": ["..."],
      "recommendations": ["..."]
    },
    "frictionPoints": [
      {
        "title": "Deferred Social Proof",
        "description": "Reviews are located below the second scroll fold.",
        "severity": "high",
        "elementHint": "Above-the-fold container"
      }
    ],
    "recommendations": [
      {
        "title": "Add Guarantee Badge near Primary CTA",
        "description": "Place a 30-day money-back guarantee badge within 25px of the buy button.",
        "priority": "high",
        "impact": "high",
        "effort": "low",
        "category": "Trust"
      }
    ],
    "quickWins": [
      {
        "title": "Add Micro-Copy under CTA",
        "description": "Include 'Free 3-day express shipping' directly below the button.",
        "impact": "high",
        "effort": "low"
      }
    ],
    "copySuggestions": {
      "improvedHeroHeadline": "Experience Professional Audio Clarity — Without the Studio Price",
      "improvedSupportingCopy": "Engineered for creators who demand pristine sound...",
      "ctaOptions": [
        "Get Yours Now — Free Express Shipping",
        "Experience Studio Sound Today",
        "Try Risk-Free for 30 Days"
      ]
    },
    "mobileDisclaimer": "Mobile UX observations based on page structure, content density, and markup signals."
  },
  "scrapedData": {
    "url": "https://example-store.com/products/example-product",
    "title": "Example Product",
    "analyzedAt": "2026-10-05T15:30:00.000Z",
    "isShopify": true,
    "signals": {
      "hasViewport": true,
      "isShopify": true,
      "hasSsl": true,
      "hasJsonLd": true,
      "wordCount": 640,
      "headingsCount": 8,
      "buttonCount": 4,
      "linkCount": 18,
      "imageCount": 12,
      "imagesMissingAlt": 1,
      "formCount": 1
    }
  }
}
```

#### Error Responses

- `400 Bad Request`: Invalid or malformed URL payload (`VALIDATION_ERROR`).
- `404 Not Found`: Target webpage not found (`NOT_FOUND`).
- `403 Forbidden`: Automated bot protection or Cloudflare challenge detected (`ACCESS_DENIED`).
- `415 Unsupported Media Type`: Non-HTML content type (`INVALID_CONTENT_TYPE`).
- `408 Request Timeout`: Webpage took longer than 12 seconds to respond (`TIMEOUT`).
- `422 Unprocessable Content`: Empty HTML or pure Single Page Application requiring browser JS (`JAVASCRIPT_REQUIRED`).

---

## 8. Architecture Decisions

1. **Next.js App Router**: Chosen for cohesive full-stack TypeScript execution, native Serverless API route handling, and zero client bundle overhead for backend scraping logic.
2. **Cheerio & Native Fetch over Heavy Headless Browsers**: Headless browsers (e.g., Puppeteer / Playwright) introduce severe cold-start latencies (10–20+ seconds), heavy memory footprints (1GB+ RAM), and fail in standard serverless execution limits. Cheerio parses the full HTML tree in under 50 milliseconds with negligible overhead.
3. **Stateless (No Database)**: Eliminates operational hurdles, credential exposure, data privacy concerns regarding audited client URLs, and database migrations. All state is maintained client-side during the session.
4. **Zod Runtime Schema Validation**: LLM outputs are non-deterministic. Zod guarantees that the frontend receives strictly typed, validated data with guaranteed shapes, preventing runtime crashes.
5. **Multi-Tiered LLM Strategy with Contextual Fallback**: Provides seamless redundancy between Anthropic Claude and OpenAI GPT-4o, backed by a deterministic, signal-calibrated fallback engine that prevents demo disruptions when API credentials are absent.

---

## 9. Limitations & Edge Cases

- **Bot Protection & Cloudflare Turnstile**: Certain sites (e.g., Amazon, Nike) utilize aggressive bot detection or captcha challenges that reject automated HTTP requests. The agent gracefully identifies this and returns a user-friendly explanation.
- **Client-Side SPA Shells**: Websites rendered entirely client-side via JavaScript (where the initial HTML contains only an empty `<div id="root"></div>`) cannot provide full text semantics via static HTML scraping. The agent detects this condition and prompts the user accordingly.
- **Mobile Analysis Scope**: In accordance with the prompt guidelines, mobile observations are derived from DOM layout signals, viewport declarations, content density ratios, and button sizing rather than physical device rendering.
- **LLM Grounding**: The system prompt strictly prohibits the AI from inventing nonexistent guarantees, reviews, or product specifications. If an element is absent from the page, it is diagnosed as missing rather than hallucinated.

---

## 10. Vercel Deployment

This project is built from the ground up to be 100% Vercel compatible:

1. Push your repository to GitHub.
2. Import the repository into your Vercel Dashboard.
3. (Optional) Set `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` in **Settings > Environment Variables**.
4. Click **Deploy**.

No special build commands or server daemon configurations required.

---

## License

MIT License. Designed and engineered for production-ready conversion rate optimization.
