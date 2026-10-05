"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { AuditDashboard } from "@/components/audit-dashboard";
import { Footer } from "@/components/footer";
import { UrlInputHandle } from "@/components/url-input";
import { CroAudit, AuditApiResponse } from "@/types/audit";

type AppState = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [state, setState] = useState<AppState>("idle");
  const [activeUrl, setActiveUrl] = useState<string>("");
  const [auditResult, setAuditResult] = useState<CroAudit | null>(null);
  const [scrapedData, setScrapedData] = useState<
    AuditApiResponse["scrapedData"] | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | undefined>(undefined);

  const heroInputRef = useRef<UrlInputHandle>(null);

  const runAudit = async (targetUrl: string) => {
    setActiveUrl(targetUrl);
    setState("loading");
    setErrorMessage(null);
    setErrorCode(undefined);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      const rawText = await response.text();
      let data: AuditApiResponse;

      try {
        data = JSON.parse(rawText);
      } catch {
        // Non-JSON response (usually Vercel 504 Gateway Timeout or 500 Function Crash)
        if (response.status === 504 || rawText.toLowerCase().includes("timeout")) {
          throw new Error(
            "The audit timed out. Vercel's serverless time limit was reached while fetching the website or running AI analysis. Try a faster URL or a different page."
          );
        }
        throw new Error(
          rawText.length > 0 && rawText.length < 200
            ? rawText.trim()
            : `Server returned status ${response.status}. Please check your Vercel deployment logs.`
        );
      }

      if (!response.ok || !data.success || !data.audit) {
        throw new Error(
          data.error || `Server responded with status ${response.status}`
        );
      }

      setAuditResult(data.audit);
      setScrapedData(data.scrapedData || null);
      setState("success");

      // Smooth scroll to top of dashboard
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to analyze the target URL."
      );
    }
  };

  const handleRetry = () => {
    if (activeUrl) {
      runAudit(activeUrl);
    } else {
      setState("idle");
    }
  };

  const handleReset = () => {
    setState("idle");
    setAuditResult(null);
    setScrapedData(null);
    setErrorMessage(null);
    setErrorCode(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavbarAnalyzeClick = () => {
    if (state !== "idle") {
      handleReset();
    } else {
      heroInputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] bg-grid-pattern text-slate-100">
      <Navbar onAnalyzeClick={handleNavbarAnalyzeClick} />

      <main className="flex-1">
        {state === "idle" && (
          <>
            <Hero
              ref={heroInputRef}
              onSubmit={runAudit}
              isLoading={false}
            />
            <HowItWorks />
            <Features />
          </>
        )}

        {state === "loading" && (
          <LoadingState targetUrl={activeUrl} />
        )}

        {state === "error" && (
          <ErrorState
            error={errorMessage || "An unexpected error occurred."}
            errorCode={errorCode}
            onRetry={handleRetry}
            onReset={handleReset}
          />
        )}

        {state === "success" && auditResult && (
          <AuditDashboard
            audit={auditResult}
            scrapedData={scrapedData || undefined}
            onNewAudit={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
