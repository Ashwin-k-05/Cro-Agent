import { z } from "zod";

// Request schema: User must supply a valid HTTP/HTTPS URL
export const auditRequestSchema = z.object({
  url: z
    .string()
    .min(1, "Please enter a website URL")
    .trim()
    .url("Please enter a valid URL (e.g. https://example.com)")
    .refine(
      (val) => {
        try {
          const parsed = new URL(val);
          return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          return false;
        }
      },
      {
        message: "URL must start with http:// or https://",
      }
    )
    .refine(
      (val) => {
        try {
          const parsed = new URL(val);
          const hostname = parsed.hostname.toLowerCase();
          // Security: Block internal/loopback/private IP addresses
          if (
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "::1" ||
            hostname.endsWith(".local") ||
            hostname.endsWith(".internal") ||
            hostname.startsWith("192.168.") ||
            hostname.startsWith("10.") ||
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
          ) {
            return false;
          }
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Private, local, and internal network addresses cannot be audited.",
      }
    ),
  demo: z.boolean().optional(),
});

export type AuditRequestInput = z.infer<typeof auditRequestSchema>;

// Category Analysis Schema (Hero, CTA, Trust, Product, Mobile, Copy)
export const categoryAnalysisSchema = z.object({
  score: z
    .number()
    .int()
    .min(1, "Score must be at least 1")
    .max(10, "Score cannot exceed 10"),
  analysis: z.string().min(10, "Analysis must be at least 10 characters"),
  issues: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
});

// Friction Points Schema
export const frictionPointSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  severity: z.enum(["high", "medium", "low"]),
  elementHint: z.string().optional(),
});

// Prioritized Recommendations Schema
export const recommendationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["high", "medium", "low"]),
  impact: z.enum(["high", "medium", "low"]),
  effort: z.enum(["low", "medium", "high"]),
  category: z.string().optional(),
});

// Quick Wins Schema
export const quickWinSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  impact: z.enum(["high", "medium"]).default("high"),
  effort: z.enum(["low", "medium"]).default("low"),
});

// AI Copy Suggestions Schema
export const copySuggestionsSchema = z.object({
  improvedHeroHeadline: z.string().min(5),
  improvedSupportingCopy: z.string().min(10),
  ctaOptions: z.array(z.string()).min(2, "Must provide at least 2 CTA options"),
});

// Complete CRO Audit Schema for validating LLM responses
export const croAuditSchema = z.object({
  croScore: z
    .number()
    .int()
    .min(0, "Score cannot be less than 0")
    .max(100, "Score cannot exceed 100"),
  summary: z.string().min(20, "Summary must be at least 20 characters"),
  scoreTier: z
    .enum(["Critical", "Needs Improvement", "Good", "Strong", "Excellent"])
    .optional(),

  heroSection: categoryAnalysisSchema,
  ctaQuality: categoryAnalysisSchema,
  trustSignals: categoryAnalysisSchema,
  productPageIssues: categoryAnalysisSchema,
  mobileUX: categoryAnalysisSchema,
  copyClarity: categoryAnalysisSchema,

  frictionPoints: z
    .array(frictionPointSchema)
    .min(1, "At least 1 friction point required"),
  recommendations: z
    .array(recommendationSchema)
    .min(2, "At least 2 recommendations required"),
  quickWins: z.array(quickWinSchema).default([]),
  copySuggestions: copySuggestionsSchema,
  mobileDisclaimer: z
    .string()
    .default(
      "Mobile UX observations based on page structure, content density, and markup signals."
    ),
});

export type ValidatedCroAudit = z.infer<typeof croAuditSchema>;
