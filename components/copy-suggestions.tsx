"use client";

import React, { useState } from "react";
import { PenTool, Copy, Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CopySuggestions as CopySuggestionsType } from "@/types/audit";

interface CopySuggestionsProps {
  data: CopySuggestionsType;
}

export function CopySuggestions({ data }: CopySuggestionsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const ctaLabels = [
    { label: "Option 1: Direct Action", hint: "Clear & direct" },
    { label: "Option 2: Value-First", hint: "Outcome focused" },
    { label: "Option 3: Risk-Reversal", hint: "Removes buyer doubt" },
  ];

  return (
    <Card className="bg-[#111622] border-slate-800 shadow-sm overflow-hidden break-inside-avoid">
      <CardHeader className="p-5 pb-3 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                <span>AI Copy Suggestions</span>
                <Badge variant="glow" size="sm">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  AI Suggested
                </Badge>
              </CardTitle>
              <p className="text-xs text-slate-400">
                Alternative high-converting copy variations for your page.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Improved Hero Headline */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Improved Headline (H1)</span>
            <button
              onClick={() =>
                copyToClipboard(data.improvedHeroHeadline, "headline")
              }
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer transition-colors text-xs"
            >
              {copiedKey === "headline" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-slate-800 text-sm sm:text-base font-semibold text-white">
            &ldquo;{data.improvedHeroHeadline}&rdquo;
          </div>
        </div>

        {/* Supporting Subheadline */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Supporting Value Proposition</span>
            <button
              onClick={() => copyToClipboard(data.improvedSupportingCopy, "sub")}
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer transition-colors text-xs"
            >
              {copiedKey === "sub" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {data.improvedSupportingCopy}
          </div>
        </div>

        {/* CTA Options */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-slate-400 block">
            CTA Button Options
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {data.ctaOptions.map((cta, i) => {
              const labelInfo = ctaLabels[i] || {
                label: `Option ${i + 1}`,
                hint: "Alternative option",
              };
              const ctaKey = `cta-${i}`;
              return (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-[#0b0f17] border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block">
                      {labelInfo.label}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white">&ldquo;{cta}&rdquo;</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
                    <span>{labelInfo.hint}</span>
                    <button
                      onClick={() => copyToClipboard(cta, ctaKey)}
                      className="text-blue-400 hover:text-blue-300 p-1 rounded transition-colors cursor-pointer"
                      title="Copy button text"
                    >
                      {copiedKey === ctaKey ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
