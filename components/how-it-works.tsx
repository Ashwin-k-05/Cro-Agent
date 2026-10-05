import React from "react";
import { Globe, Search, BarChart3 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Globe,
      title: "Enter URL",
      description:
        "Paste any public website, Shopify store, or landing page link to start.",
    },
    {
      step: "02",
      icon: Search,
      title: "AI Analysis",
      description:
        "Our engine extracts headings, CTAs, trust badges, and page structure.",
    },
    {
      step: "03",
      icon: BarChart3,
      title: "Get Actionable Fixes",
      description:
        "Review your score, identified friction points, and prioritized recommendations.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Fast, automated audit in three simple steps. No code snippets or tracking scripts needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="bg-[#111622] border-slate-800 hover:border-slate-700 transition-all duration-200"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
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
