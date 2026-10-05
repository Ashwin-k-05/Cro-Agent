export type Severity = "high" | "medium" | "low";
export type Priority = "high" | "medium" | "low";
export type Impact = "high" | "medium" | "low";
export type Effort = "low" | "medium" | "high";

export interface CategoryAnalysis {
  score: number; // 1-10
  analysis: string;
  issues: string[];
  recommendations: string[];
}

export interface FrictionPoint {
  title: string;
  description: string;
  severity: Severity;
  elementHint?: string;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: Priority;
  impact: Impact;
  effort: Effort;
  category?: string;
}

export interface QuickWin {
  title: string;
  description: string;
  impact: "high" | "medium";
  effort: "low" | "medium";
}

export interface CopySuggestions {
  improvedHeroHeadline: string;
  improvedSupportingCopy: string;
  ctaOptions: string[];
}

export interface CroAudit {
  croScore: number; // 0-100
  summary: string;
  scoreTier?: "Critical" | "Needs Improvement" | "Good" | "Strong" | "Excellent";
  
  heroSection: CategoryAnalysis;
  ctaQuality: CategoryAnalysis;
  trustSignals: CategoryAnalysis;
  productPageIssues: CategoryAnalysis;
  mobileUX: CategoryAnalysis;
  copyClarity: CategoryAnalysis;

  frictionPoints: FrictionPoint[];
  recommendations: Recommendation[];
  quickWins: QuickWin[];
  copySuggestions: CopySuggestions;
  mobileDisclaimer: string;
}

export interface ScrapedPageMetadata {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface ScrapedProduct {
  title?: string;
  price?: string;
  compareAtPrice?: string;
  availability?: string;
  description?: string;
  reviews?: string;
  rating?: string;
  addToCartText?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  guarantee?: string;
  trustBadges?: string[];
}

export interface ScrapedTechnicalSignals {
  hasViewport: boolean;
  isShopify: boolean;
  hasSsl: boolean;
  hasJsonLd: boolean;
  wordCount: number;
  headingsCount: number;
  buttonCount: number;
  linkCount: number;
  imageCount: number;
  imagesMissingAlt: number;
  formCount: number;
}

export interface ScrapedPage {
  url: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  paragraphs: string[];
  buttons: string[];
  links: string[];
  images: {
    alt: string;
    src?: string;
  }[];
  forms: {
    inputs: string[];
  }[];
  product?: ScrapedProduct;
  signals: ScrapedTechnicalSignals;
  cleanedTextSample: string;
}

export interface AuditApiResponse {
  success: boolean;
  audit?: CroAudit;
  scrapedData?: {
    url: string;
    title: string;
    analyzedAt: string;
    isShopify: boolean;
    signals: ScrapedTechnicalSignals;
    productPreview?: ScrapedProduct;
  };
  error?: string;
  errorCode?: string;
}

export interface AnalysisProgressStep {
  id: string;
  label: string;
  status: "pending" | "current" | "completed" | "error";
  detail?: string;
}
