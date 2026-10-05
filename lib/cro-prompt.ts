import { ScrapedPage } from "@/types/audit";

export const CRO_SYSTEM_PROMPT = `You are a world-class Senior Conversion Rate Optimization (CRO) Specialist, Lead UX Researcher, and Ecommerce Growth Strategist.

Your mission is to perform a rigorous, evidence-based CRO audit on the provided structured webpage extraction.

CRITICAL CRO METHODOLOGY & EVIDENCE RULES:
1. Ground every claim directly in the extracted page data (exact headlines, CTA text, meta description, product prices, trust badges, form fields, and paragraphs).
2. DO NOT hallucinate or assume unstated features, reviews, guarantees, or policies.
3. If an element or signal is missing or unclear (e.g. no reviews widget, no guarantee, no visible price), explicitly state "Not detected" rather than assuming it exists.
4. Provide tangible, actionable, high-ROI recommendations instead of vague generalities like "improve copy". Instead say: "Replace generic CTA '[detected text]' with benefit-driven action copy...".
5. For the Mobile UX section, acknowledge that analysis is based on DOM structure, content density, word count, and responsive markup signals. Do NOT claim you tested on a physical mobile device.
6. Calculate an honest, calibrated CRO Score from 0 to 100:
   - 0-39: Critical (Severe conversion barriers, missing value proposition or CTA)
   - 40-59: Needs Improvement (Significant friction, missing trust or unclear product offering)
   - 60-74: Good (Competent foundation, but notable friction or unoptimized hierarchy)
   - 75-89: Strong (High-converting page with minor optimization tweaks available)
   - 90-100: Excellent (Near-flawless conversion architecture)
7. Category scores are integers from 1 to 10.
8. Identify 3 to 5 concrete Conversion Friction Points with severity ('high', 'medium', 'low').
9. Provide 4 to 6 Prioritized Recommendations with priority ('high', 'medium', 'low'), impact ('high', 'medium', 'low'), and effort ('low', 'medium', 'high').
10. Provide 2 to 3 Quick Wins (high impact with low or medium effort).
11. Generate AI Copy Suggestions tailored directly to the specific product/service:
    - 1 high-converting Hero Headline
    - 1 compelling Supporting Copy paragraph
    - 3 distinct CTA options (Direct Action, Value-First, Risk-Reversal)

RESPONSE FORMAT:
You must output STRICT, VALID JSON ONLY.
Do NOT include markdown formatting like \`\`\`json or \`\`\`.
Do NOT include explanations or prose outside the JSON object.`;

export function buildCroUserPrompt(scraped: ScrapedPage): string {
  const pagePayload = {
    url: scraped.url,
    title: scraped.title || "Not detected",
    metaDescription: scraped.metaDescription || "Not detected",
    canonicalUrl: scraped.canonicalUrl,
    headings: {
      h1: scraped.headings.h1.length > 0 ? scraped.headings.h1 : ["None detected"],
      h2: scraped.headings.h2.slice(0, 8),
      h3: scraped.headings.h3.slice(0, 8),
    },
    detectedButtonsAndCTAs: scraped.buttons.length > 0 ? scraped.buttons : ["None detected"],
    keyParagraphsSample: scraped.paragraphs.slice(0, 10),
    imagesSummary: {
      totalFound: scraped.signals.imageCount,
      missingAltCount: scraped.signals.imagesMissingAlt,
      sampleAltTexts: scraped.images.map((img) => img.alt).filter(Boolean).slice(0, 8),
    },
    formsSummary: {
      formsCount: scraped.signals.formCount,
      inputSample: scraped.forms.flatMap((f) => f.inputs).slice(0, 8),
    },
    ecommerceOrProductSignals: scraped.product
      ? {
          title: scraped.product.title || "Not detected",
          price: scraped.product.price || "Not detected",
          compareAtPrice: scraped.product.compareAtPrice || "Not detected",
          availability: scraped.product.availability || "Not detected",
          rating: scraped.product.rating || "Not detected",
          reviews: scraped.product.reviews || "Not detected",
          addToCartText: scraped.product.addToCartText || "Not detected",
          shippingInfo: scraped.product.shippingInfo || "Not detected",
          guarantee: scraped.product.guarantee || "Not detected",
          trustBadges: scraped.product.trustBadges || ["None detected"],
        }
      : "No direct ecommerce product markup detected (likely lead-gen, SaaS, or generic content page)",
    technicalSignals: {
      isShopify: scraped.signals.isShopify,
      hasSsl: scraped.signals.hasSsl,
      hasViewportTag: scraped.signals.hasViewport,
      totalWordCount: scraped.signals.wordCount,
      buttonCount: scraped.signals.buttonCount,
    },
  };

  return `Please audit the following webpage data and return a complete JSON CRO audit adhering strictly to the schema:

${JSON.stringify(pagePayload, null, 2)}

OUTPUT JSON SCHEMA REQUIREMENT:
{
  "croScore": <integer 0-100>,
  "summary": "<2-4 sentence executive overview citing specific findings>",
  "scoreTier": "<'Critical' | 'Needs Improvement' | 'Good' | 'Strong' | 'Excellent'>",

  "heroSection": {
    "score": <integer 1-10>,
    "analysis": "<Specific evaluation of H1 headline, value proposition clarity, and visual primacy>",
    "issues": ["<specific issue referencing extracted text>", "..."],
    "recommendations": ["<actionable recommendation>", "..."]
  },

  "ctaQuality": {
    "score": <integer 1-10>,
    "analysis": "<Evaluation of button text, color contrast indication, primary vs secondary actions>",
    "issues": ["<specific CTA wording issue>", "..."],
    "recommendations": ["<actionable recommendation>", "..."]
  },

  "trustSignals": {
    "score": <integer 1-10>,
    "analysis": "<Evaluation of social proof, ratings, reviews, security badges, guarantees>",
    "issues": ["<missing or weak trust signal>", "..."],
    "recommendations": ["<actionable recommendation>", "..."]
  },

  "productPageIssues": {
    "score": <integer 1-10>,
    "analysis": "<Evaluation of pricing clarity, benefits vs features, shipping/returns disclosure, purchase friction>",
    "issues": ["<specific product or offer friction>", "..."],
    "recommendations": ["<actionable recommendation>", "..."]
  },

  "mobileUX": {
    "score": <integer 1-10>,
    "analysis": "<Evaluation of structural density, text length, mobile layout readiness based on DOM hints>",
    "issues": ["<mobile friction observation>", "..."],
    "recommendations": ["<actionable recommendation>", "..."]
  },

  "copyClarity": {
    "score": <integer 1-10>,
    "analysis": "<Evaluation of headline readability, scannability, customer-centric vs company-centric phrasing>",
    "issues": ["<copy issue>", "..."],
    "recommendations": ["<actionable recommendation>", "..."]
  },

  "frictionPoints": [
    {
      "title": "<Concise friction title>",
      "description": "<Why this creates hesitation or drop-off for prospective buyers>",
      "severity": "<'high' | 'medium' | 'low'>",
      "elementHint": "<Specific element or text reference>"
    }
  ],

  "recommendations": [
    {
      "title": "<Action-oriented recommendation title>",
      "description": "<Detailed explanation of what to change, where, and expected conversion uplift>",
      "priority": "<'high' | 'medium' | 'low'>",
      "impact": "<'high' | 'medium' | 'low'>",
      "effort": "<'low' | 'medium' | 'high'>",
      "category": "<'Hero' | 'CTA' | 'Trust' | 'Product' | 'Mobile' | 'Copy'>"
    }
  ],

  "quickWins": [
    {
      "title": "<Fast-impact fix title>",
      "description": "<Quick change that can be implemented in under 30 minutes with high ROI>",
      "impact": "<'high' | 'medium'>",
      "effort": "<'low' | 'medium'>"
    }
  ],

  "copySuggestions": {
    "improvedHeroHeadline": "<Rewritten, benefit-driven primary H1 headline>",
    "improvedSupportingCopy": "<Compelling 1-2 sentence supporting subheadline addressing the core pain point>",
    "ctaOptions": [
      "<Option 1: Direct action>",
      "<Option 2: Value-first outcome>",
      "<Option 3: Low-friction / risk-reversal>"
    ]
  },

  "mobileDisclaimer": "Mobile UX observations based on page structure, content density, and markup signals."
}`;
}
