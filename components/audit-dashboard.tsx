"use client";

import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Sparkles,
  MousePointerClick,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  FileText,
  FileDown,
  RotateCcw,
  AlertOctagon,
  Target,
  Info,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScoreCard } from "./score-card";
import { CategoryCard } from "./category-card";
import { FrictionCard } from "./friction-card";
import { RecommendationCard } from "./recommendation-card";
import { QuickWins } from "./quick-wins";
import { CopySuggestions } from "./copy-suggestions";
import { CroAudit, AuditApiResponse } from "@/types/audit";

interface AuditDashboardProps {
  audit: CroAudit;
  scrapedData?: AuditApiResponse["scrapedData"];
  onNewAudit: () => void;
}

export function AuditDashboard({
  audit,
  scrapedData,
  onNewAudit,
}: AuditDashboardProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ConvertIQ-Audit-${scrapedData?.url ? new URL(scrapedData.url).hostname : "Report"}`,
  });

  // Filter recommendations
  const filteredRecommendations = audit.recommendations.filter((rec) => {
    if (priorityFilter === "all") return true;
    return rec.priority === priorityFilter;
  });

  // Filter friction points
  const filteredFriction = audit.frictionPoints.filter((fric) => {
    if (severityFilter === "all") return true;
    return fric.severity === severityFilter;
  });

  const highSeverityCount = audit.frictionPoints.filter(
    (f) => f.severity === "high"
  ).length;

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top action toolbar (Hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#111622] border border-slate-800 shadow-sm no-print">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onNewAudit}
            className="flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Audit Another URL</span>
          </Button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <span className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
            URL: <span className="text-white font-medium">{scrapedData?.url || "Custom Page"}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => handlePrint()}
            className="flex items-center gap-1.5 cursor-pointer text-xs shrink-0"
          >
            <FileDown className="w-4 h-4" />
            <span>Export PDF Report</span>
          </Button>
        </div>
      </div>

      {/* Quick Jump Navigation (Hidden in print) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-print scrollbar-none">
        <span className="text-slate-500 font-medium shrink-0">Jump to:</span>
        <button
          onClick={() => scrollToAnchor("section-overview")}
          className="px-2.5 py-1 rounded bg-[#111622] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer shrink-0 transition-colors"
        >
          Overview
        </button>
        {audit.quickWins && audit.quickWins.length > 0 && (
          <button
            onClick={() => scrollToAnchor("section-quick-wins")}
            className="px-2.5 py-1 rounded bg-[#111622] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer shrink-0 transition-colors"
          >
            Quick Wins
          </button>
        )}
        <button
          onClick={() => scrollToAnchor("section-pillars")}
          className="px-2.5 py-1 rounded bg-[#111622] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer shrink-0 transition-colors"
        >
          6 Pillars
        </button>
        <button
          onClick={() => scrollToAnchor("section-friction")}
          className="px-2.5 py-1 rounded bg-[#111622] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer shrink-0 transition-colors"
        >
          Friction Points
        </button>
        <button
          onClick={() => scrollToAnchor("section-recommendations")}
          className="px-2.5 py-1 rounded bg-[#111622] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer shrink-0 transition-colors"
        >
          Recommendations
        </button>
        {audit.copySuggestions && (
          <button
            onClick={() => scrollToAnchor("section-copy")}
            className="px-2.5 py-1 rounded bg-[#111622] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 cursor-pointer shrink-0 transition-colors"
          >
            Copy Suggestions
          </button>
        )}
      </div>

      {/* Printable Report Container */}
      <div ref={printRef} className="space-y-10 print-area">
        {/* Print only header */}
        <div className="hidden print:block pb-4 border-b border-slate-300">
          <h1 className="text-2xl font-bold text-slate-900">
            ConvertIQ — Landing Page CRO Audit Report
          </h1>
          <p className="text-xs text-slate-600">
            URL: {scrapedData?.url} | Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* 1. Score Overview & Executive Summary */}
        <div id="section-overview">
          <ScoreCard
            score={audit.croScore}
            url={scrapedData?.url || "Audited Page"}
            summary={audit.summary}
            analyzedAt={scrapedData?.analyzedAt}
            signals={scrapedData?.signals}
            product={scrapedData?.productPreview}
          />
        </div>

        {/* 2. Quick Wins (High Impact + Low Effort) */}
        {audit.quickWins && audit.quickWins.length > 0 && (
          <div id="section-quick-wins">
            <QuickWins items={audit.quickWins} />
          </div>
        )}

        {/* 3. Category Deep Dive (6 Pillars Grid) */}
        <div id="section-pillars" className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                6 Conversion Pillars
              </h3>
              <p className="text-xs text-slate-400">
                Detailed 10-point heuristic evaluation across the core drivers of conversion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CategoryCard
              title="Hero Section"
              icon={Sparkles}
              data={audit.heroSection}
            />

            <CategoryCard
              title="CTA Quality"
              icon={MousePointerClick}
              data={audit.ctaQuality}
            />

            <CategoryCard
              title="Trust Signals"
              icon={ShieldCheck}
              data={audit.trustSignals}
            />

            <CategoryCard
              title="Product Page Issues"
              icon={ShoppingBag}
              data={audit.productPageIssues}
            />

            <CategoryCard
              title="Mobile UX"
              icon={Smartphone}
              data={audit.mobileUX}
              disclaimer={audit.mobileDisclaimer}
            />

            <CategoryCard
              title="Copy Clarity"
              icon={FileText}
              data={audit.copyClarity}
            />
          </div>
        </div>

        {/* 4. Conversion Friction Points */}
        <div id="section-friction" className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Conversion Friction Points</span>
                {highSeverityCount > 0 && (
                  <Badge variant="destructive" size="sm">
                    {highSeverityCount} High
                  </Badge>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                Identified friction areas causing visitor hesitation or drop-off.
              </p>
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111622] border border-slate-800 text-xs no-print">
              {(["all", "high", "medium", "low"] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize cursor-pointer transition-all ${
                    severityFilter === sev
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredFriction.map((fric, idx) => (
              <FrictionCard key={idx} item={fric} />
            ))}
          </div>
        </div>

        {/* 5. Prioritized Recommendations */}
        <div id="section-recommendations" className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Prioritized Recommendations</span>
              </h3>
              <p className="text-xs text-slate-400">
                Ranked by expected conversion impact versus implementation effort.
              </p>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111622] border border-slate-800 text-xs no-print">
              {(["all", "high", "medium", "low"] as const).map((prio) => (
                <button
                  key={prio}
                  onClick={() => setPriorityFilter(prio)}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize cursor-pointer transition-all ${
                    priorityFilter === prio
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {prio}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredRecommendations.map((rec, idx) => (
              <RecommendationCard key={idx} item={rec} />
            ))}
          </div>
        </div>

        {/* 6. AI Copy Suggestions */}
        {audit.copySuggestions && (
          <div id="section-copy">
            <CopySuggestions data={audit.copySuggestions} />
          </div>
        )}

        {/* 7. Disclaimer */}
        <div className="p-3.5 rounded-lg bg-[#111622] border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-semibold text-slate-300 block">
              Methodology:
            </span>
            <p>{audit.mobileDisclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
