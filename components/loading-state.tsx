"use client";

import React, { useState, useEffect } from "react";
import { Check, Loader2, Globe, FileSearch, Sparkles, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

interface LoadingStateProps {
  targetUrl: string;
}

const STEPS = [
  {
    id: "validate",
    label: "Validating URL",
    icon: ShieldCheck,
    durationMs: 700,
  },
  {
    id: "fetch",
    label: "Fetching webpage content",
    icon: Globe,
    durationMs: 1400,
  },
  {
    id: "extract",
    label: "Extracting headings, CTAs & signals",
    icon: FileSearch,
    durationMs: 1200,
  },
  {
    id: "analyze",
    label: "Evaluating conversion drivers & UX",
    icon: Sparkles,
    durationMs: 2200,
  },
  {
    id: "synthesize",
    label: "Preparing audit report",
    icon: Check,
    durationMs: 1600,
  },
];

export function LoadingState({ targetUrl }: LoadingStateProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(15);

  useEffect(() => {
    let accumulatedTime = 0;
    const timers: NodeJS.Timeout[] = [];

    STEPS.forEach((step, index) => {
      accumulatedTime += step.durationMs;
      const timer = setTimeout(() => {
        setCurrentStepIndex(index);
        setProgressPercent(Math.min(95, Math.round(((index + 1) / STEPS.length) * 100)));
      }, accumulatedTime - step.durationMs);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-16 px-4 animate-in fade-in duration-300">
      <Card className="bg-[#111622] border-slate-800 shadow-xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Auditing Landing Page
            </h2>
            <p className="text-xs text-slate-400 truncate max-w-sm mx-auto font-mono">
              {targetUrl}
            </p>
          </div>

          {/* Progress bar */}
          <Progress
            value={progressPercent}
            className="h-2 bg-slate-800"
            indicatorClassName="bg-blue-600"
          />

          {/* Multi-step progress list */}
          <div className="space-y-2.5 pt-1">
            {STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                    isCurrent
                      ? "bg-blue-500/10 text-white font-medium"
                      : isCompleted
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 text-xs ${
                      isCompleted
                        ? "bg-emerald-500/15 text-emerald-400"
                        : isCurrent
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <StepIcon className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className="flex-1 truncate">{step.label}</span>
                  {isCompleted && (
                    <span className="text-[11px] text-emerald-400 font-medium">Done</span>
                  )}
                  {isCurrent && (
                    <span className="text-[11px] text-blue-400 font-medium">In progress...</span>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
