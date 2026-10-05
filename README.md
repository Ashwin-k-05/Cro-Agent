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

The system programmatically fetches the webpage HTML and extracts DOM semantics. It also extracts structured JSON-LD schemas, Shopify product data, trust markers, forms and call-to-actions.

This data is then synthesized into a structured prompt for advanced reasoning models such as Claude 3.5 Sonnet, GPT-4o or Gemini.

The resulting output is strictly validated with Zod and rendered as an interactive executive SaaS dashboard.

The dashboard includes:

- Calibrated 0–100 CRO benchmark score
- 6 conversion pillar evaluations
- Hero section evaluation
- CTA quality evaluation
- Trust signal evaluation
- Product page evaluation
- Mobile UX evaluation
- Copy clarity evaluation
- Conversion friction points
- Drop-off risk identification
- Prioritized recommendations
- Quick wins
- AI-generated copy improvements
- One-click copy functionality
- PDF report export

The application operates completely **stateless without a database**.

This makes it lightweight and easy to deploy to Vercel or any modern edge runtime.

---

# 2. Features

## Automated Webpage Scraper

The system uses Cheerio with native Fetch to analyze publicly accessible webpages.

The scraper extracts:

- H1 headings
- H2 headings
- H3 headings
- Page title
- Meta description
- Navigation links
- Buttons
- CTA text
- Images
- Image alt attributes
- Forms
- Input fields
- Links
- Structured JSON-LD data
- Word count
- Viewport configuration

---

## Shopify Intelligence

The system automatically detects Shopify-based websites.

It can identify signals such as:

- Shopify platform usage
- Product titles
- Product pricing
- Discounted pricing
- Inventory availability
- Product JSON
- Shipping information
- Trust badges
- Product schema
- Product availability

---

## CRO Scoring

The system calculates a CRO score between **0 and 100**.

The score is divided into five performance levels:

| Score | Tier |
|---|---|
| 0–39 | Critical |
| 40–59 | Needs Improvement |
| 60–74 | Good |
| 75–89 | Strong |
| 90–100 | Excellent |

The score is based on multiple conversion factors instead of a single metric.

---

## Six Conversion Pillars

The application evaluates six major conversion pillars.

### 1. Hero Section

The system analyzes:

- Headline clarity
- Value proposition
- Benefit communication
- Above-the-fold messaging
- Competitive differentiation
- Supporting copy
- Hero CTA

---

### 2. CTA Quality

The system evaluates:

- CTA visibility
- CTA placement
- CTA wording
- CTA psychology
- Primary versus secondary actions
- Competing CTAs
- Risk reduction near the CTA

---

### 3. Trust Signals

The system checks for:

- Reviews
- Ratings
- Testimonials
- Guarantees
- Security indicators
- Social proof
- Trust badges
- Customer logos
- Certifications

---

### 4. Product Page

For product pages the system evaluates:

- Product title
- Product description
- Product benefits
- Pricing
- Discount pricing
- Pricing anchors
- Product images
- Product specifications
- Availability
- Shipping information
- Return policy
- Risk reversal

---

### 5. Mobile UX

The system analyzes mobile-related structural signals including:

- Viewport configuration
- Content density
- Button sizing signals
- Page structure
- Long content sections
- Navigation complexity
- Scroll depth indicators

Mobile analysis is based on HTML and DOM signals rather than physical device rendering.

---

### 6. Copy Clarity

The system evaluates:

- Headline readability
- Sentence complexity
- Feature versus benefit messaging
- Customer-focused language
- Value proposition
- Content hierarchy
- Clarity of product messaging

---

# 3. Friction Point Detection

The system identifies possible conversion friction points.

Each friction point contains:

- Title
- Description
- Severity
- Element hint

Severity levels:

- High
- Medium
- Low

Example:

```json
{
  "title": "Deferred Social Proof",
  "description": "Reviews are located below the second scroll fold.",
  "severity": "high",
  "elementHint": "Above-the-fold container"
}
