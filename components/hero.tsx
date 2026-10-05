"use client";

import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { UrlInput, UrlInputHandle } from "./url-input";

interface HeroProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const Hero = forwardRef<UrlInputHandle, HeroProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <section className="relative pt-14 pb-18 md:pt-22 md:pb-26 overflow-hidden">
        {/* Subtle, luxurious ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[110px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/25 shadow-[0_0_20px_-3px_rgba(59,130,246,0.3)] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Automated CRO Intelligence</span>
            </span>
          </div>

          {/* Styled, high-converting headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Turn more visitors into{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              customers
            </span>
          </h1>

          {/* Refined subheadline */}
          <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Paste any Shopify store or website URL to find conversion blockers, UX friction, and clear fixes to lift your sales.
          </p>

          {/* Main URL input card */}
          <div className="pt-3">
            <UrlInput ref={ref} onSubmit={onSubmit} isLoading={isLoading} />
          </div>

          {/* Clean trust / capability strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-slate-300 text-xs">
            <div className="px-3 py-1.5 rounded-full bg-[#111622]/80 border border-slate-800 flex items-center gap-1.5 shadow-sm">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Page Analysis</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#111622]/80 border border-slate-800 flex items-center gap-1.5 shadow-sm">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>6 Conversion Pillars</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#111622]/80 border border-slate-800 flex items-center gap-1.5 shadow-sm">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>Friction & Quick Wins</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#111622]/80 border border-slate-800 flex items-center gap-1.5 shadow-sm">
              <Check className="w-3.5 h-3.5 text-blue-400" />
              <span>Instant PDF Export</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Hero.displayName = "Hero";
