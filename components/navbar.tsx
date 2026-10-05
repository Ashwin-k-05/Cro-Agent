"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  onAnalyzeClick?: () => void;
}

export function Navbar({ onAnalyzeClick }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/25 ring-1 ring-white/20">
            <span>IQ</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight text-white">
              ConvertIQ
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-700/60 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3 text-blue-400" />
              AI Audit
            </span>
          </div>
        </div>

        {/* Navigation links & CTA */}
        <nav className="flex items-center gap-5 sm:gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
          </div>

          <Button
            size="sm"
            onClick={onAnalyzeClick}
            className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-sm shadow-blue-600/20"
          >
            <span>Audit a Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
