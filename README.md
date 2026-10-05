# ConvertIQ — AI Landing Page CRO Agent

> Fast production-grade AI conversion rate optimization agent that analyzes any public Shopify store, SaaS landing page or website. It evaluates 6 core conversion pillars and delivers a prioritized audit dashboard with actionable fixes.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Validation-Zod-3068b7?style=flat&logo=zod)](https://zod.dev/)
[![Anthropic Claude](https://img.shields.io/badge/LLM-Claude_3.5_Sonnet-d97706?style=flat)](https://www.anthropic.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 1. Project Overview

The **AI Landing Page CRO Agent** allows users to enter any publicly accessible URL such as a Shopify product page or marketing landing page and receive an institutional-quality CRO audit in seconds.

The system programmatically fetches the webpage HTML. It extracts DOM semantics, structured JSON-LD schemas, Shopify product data, trust markers, forms and call-to-actions. This data is then synthesized into a structured prompt for advanced reasoning models such as Claude 3.5 Sonnet or GPT-4o.

The resulting output is strictly validated with Zod and rendered as an interactive executive SaaS dashboard.

The dashboard includes:

- Calibrated 0–100 CRO benchmark score
- 6 conversion pillar evaluations
- Identified conversion friction points and drop-off risks
- Prioritized recommendations with impact and effort ratings
- High-converting AI copy rewrites with one-click copy
- Instant PDF report export

The application operates completely **stateless without a database**. This makes it lightweight and easy to deploy to Vercel or any modern edge runtime.

---

## 2. Features

- **Automated Webpage Scraper & DOM Extractor**: High-speed Cheerio scraper extracts H1 H2 and H3 headings. It also extracts meta tags, button CTAs, navigation links, alt attributes, form elements and structured JSON-LD data.
- **E-Commerce & Shopify Intelligence**: Automatically identifies Shopify stores, product titles, regular and discounted pricing, inventory availability, shipping notices and trust badges.
- **Calibrated 0–100 CRO Scoring Engine**: Computes benchmark scores across five performance tiers: *Critical, Needs Improvement, Good, Strong and Excellent*.
- **Hero Section Analysis**: Diagnoses value proposition immediacy, competitive differentiation and headline resonance above the fold.
- **CTA Quality Audit**: Evaluates visual prominence, button copy psychology and competing action noise.
- **Trust & Proof Signals**: Identifies verified reviews, guarantees, SSL indicators and social proof.
- **Product Page Diagnostic**: Identifies pricing anchors, specification overload and risk-reversal gaps.
- **Mobile UX Observations**: Evaluates structural density, mobile layout signals, viewport declarations and vertical scroll barriers.
- **Copy Clarity & Tone**: Inspects readability, feature-vs-benefit orientation and customer-focused messaging.
- **Friction Points Matrix**: Classifies friction points with severity badges: *High, Medium and Low*. Includes interactive filtering.
- **Prioritized Recommendations Roadmap**: Categorizes recommendations based on expected conversion uplift and engineering complexity.
- **Quick Wins**: Highlights low-effort optimizations that can provide immediate improvements.
- **AI Copy Variations**: Generates alternative hero headlines, value statements and 3 CTA psychology angles: Direct, Value-First and Risk-Reversal.
- **PDF Report Generation**: Provides client-side print and PDF export with clean print typography using `react-to-print`.
- **Zero-Config Demoability**: A built-in context-aware heuristic analyzer automatically activates when no external LLM API key is configured. This guarantees full end-to-end functionality out of the box.

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
