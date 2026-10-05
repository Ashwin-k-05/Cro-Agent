import { NextRequest, NextResponse } from "next/server";
import { auditRequestSchema } from "@/lib/schemas";
import { scrapeWebPage, ScraperError } from "@/lib/scraper";
import { runCroAnalysis, LlmError } from "@/lib/llm";
import { AuditApiResponse } from "@/types/audit";

export const maxDuration = 30; // Allow sufficient time for scraping + LLM call in serverless/Vercel

export async function POST(req: NextRequest): Promise<NextResponse<AuditApiResponse>> {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload. Expected JSON with a 'url' field.",
          errorCode: "INVALID_JSON_BODY",
        },
        { status: 400 }
      );
    }

    // 1. Validate URL with Zod schema
    const validationResult = auditRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Please enter a valid website URL.";
      return NextResponse.json(
        {
          success: false,
          error: firstError,
          errorCode: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    const { url } = validationResult.data;

    // 2. Fetch and scrape the webpage
    let scrapedData;
    try {
      scrapedData = await scrapeWebPage(url);
    } catch (err: unknown) {
      if (err instanceof ScraperError) {
        return NextResponse.json(
          {
            success: false,
            error: err.message,
            errorCode: err.code,
          },
          { status: err.statusCode || 422 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: "We couldn't access this webpage. Please check the URL and try again.",
          errorCode: "SCRAPE_FAILED",
        },
        { status: 502 }
      );
    }

    // 3. Run LLM CRO Analysis
    let audit;
    try {
      audit = await runCroAnalysis(scrapedData);
    } catch (err: unknown) {
      if (err instanceof LlmError) {
        return NextResponse.json(
          {
            success: false,
            error: "The AI analysis failed to process the page content. Please try again.",
            errorCode: err.code,
          },
          { status: err.statusCode || 500 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: "The AI analysis encountered an unexpected error. Please try again.",
          errorCode: "LLM_ANALYSIS_FAILED",
        },
        { status: 500 }
      );
    }

    // 4. Return successful audit response
    const responsePayload: AuditApiResponse = {
      success: true,
      audit,
      scrapedData: {
        url: scrapedData.url,
        title: scrapedData.title,
        analyzedAt: new Date().toISOString(),
        isShopify: scrapedData.signals.isShopify,
        signals: scrapedData.signals,
        productPreview: scrapedData.product,
      },
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error: unknown) {
    console.error("Unhandled error in /api/audit:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected internal error occurred. Please try again later.",
        errorCode: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
