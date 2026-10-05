import React from "react";
import {
  Sparkles,
  Gauge,
  ListChecks,
  Smartphone,
  PenTool,
  FileDown,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Features() {
  const featureList = [
    {
      icon: Sparkles,
      title: "Comprehensive Audit",
      description:
        "Evaluates hero headlines, primary CTA buttons, trust proof, product specifications, and copy clarity.",
    },
    {
      icon: Gauge,
      title: "Calibrated Score",
      description:
        "Receive an objective 0–100 benchmark score based on modern conversion rate optimization standards.",
    },
    {
      icon: ListChecks,
      title: "Prioritized Fixes",
      description:
        "Clear High, Medium, and Low priority recommendations sorted by impact versus implementation effort.",
    },
    {
      icon: Smartphone,
      title: "Mobile UX Diagnostic",
      description:
        "Checks content density, viewport parameters, and visual scrolling hierarchy for mobile shoppers.",
    },
    {
      icon: PenTool,
      title: "AI Copy Suggestions",
      description:
        "Provides alternative benefit-driven headlines, value propositions, and 3 distinct CTA variations.",
    },
    {
      icon: FileDown,
      title: "PDF Export",
      description:
        "Export clean, print-ready reports with one click to share with clients or your engineering team.",
    },
  ];

  return (
    <section id="features" className="py-16 border-t border-slate-800/80 bg-[#0e121b]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Built for Conversion
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Everything you need to diagnose landing pages and find revenue uplift opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureList.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="bg-[#111622] border-slate-800/80 hover:border-slate-700 transition-all duration-200"
              >
                <CardContent className="p-5 space-y-2.5">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
