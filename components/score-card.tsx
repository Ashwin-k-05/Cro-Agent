"use client";

import React from "react";
import { ExternalLink, ShieldCheck, ShoppingBag, Eye, FileText, MousePointerClick } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { getScoreColor, getTierLabel } from "@/lib/utils";
import { ScrapedTechnicalSignals, ScrapedProduct } from "@/types/audit";

interface ScoreCardProps {
  score: number;
  url: string;
  summary: string;
  analyzedAt?: string;
  signals?: ScrapedTechnicalSignals;
  product?: ScrapedProduct;
}

export function ScoreCard({
  score,
  url,
  summary,
  analyzedAt,
  signals,
  product,
}: ScoreCardProps) {
  const { color, badge } = getScoreColor(score);
  const { label, description } = getTierLabel(score);

  // SVG circular gauge math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const scoreRanges = [
    { range: "0–39", label: "Critical", active: score < 40 },
    { range: "40–59", label: "Needs Work", active: score >= 40 && score < 60 },
    { range: "60–74", label: "Good", active: score >= 60 && score < 75 },
    { range: "75–89", label: "Strong", active: score >= 75 && score < 90 },
    { range: "90–100", label: "Excellent", active: score >= 90 },
  ];

  return (
    <Card className="bg-[#111622] border-slate-800 shadow-xl overflow-hidden">
      <CardContent className="p-5 sm:p-7 space-y-6">
        {/* Top meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Audited Page
              </span>
              {signals?.isShopify && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ShoppingBag className="w-3 h-3" />
                  Shopify Store
                </span>
              )}
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 break-all"
            >
              <span>{url}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            </a>
          </div>

          <div className="text-xs text-slate-400 shrink-0 sm:text-right">
            <span>Audit completed</span>
            {analyzedAt && (
              <span className="block text-slate-500 text-[11px]">
                {new Date(analyzedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Score & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Circular Score Meter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-xl bg-[#0b0f17] border border-slate-800 text-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#1a2234"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={color}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white tracking-tight font-mono">
                  {score}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  / 100
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <Badge className={badge} size="md">
                {label}
              </Badge>
              <p className="text-xs text-slate-400 max-w-[220px] mx-auto pt-0.5">
                {description}
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Summary
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-[#0b0f17] p-4 rounded-xl border border-slate-800/80">
                {summary}
              </p>
            </div>

            {/* Score Ranges Benchmark */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400">
                Score Tiers
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
                {scoreRanges.map((item) => (
                  <div
                    key={item.label}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      item.active
                        ? "bg-blue-500/10 border-blue-500/40 text-blue-400 font-semibold"
                        : "bg-[#0b0f17] border-slate-800/80 text-slate-500"
                    }`}
                  >
                    <div className="font-mono text-xs">{item.range}</div>
                    <div className="text-[10px] truncate">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted page signals */}
            {signals && (
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500 font-medium text-[11px]">Signals:</span>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b0f17] border border-slate-800 text-[11px]">
                  <FileText className="w-3 h-3 text-blue-400" />
                  <span>{signals.headingsCount} Headings</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b0f17] border border-slate-800 text-[11px]">
                  <MousePointerClick className="w-3 h-3 text-blue-400" />
                  <span>{signals.buttonCount} CTAs</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b0f17] border border-slate-800 text-[11px]">
                  <Eye className="w-3 h-3 text-blue-400" />
                  <span>{signals.imageCount} Images</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b0f17] border border-slate-800 text-[11px]">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{signals.hasSsl ? "SSL" : "No SSL"}</span>
                </div>
                {product?.price && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0b0f17] border border-slate-800 text-amber-300 text-[11px]">
                    <span>Price: {product.price}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
