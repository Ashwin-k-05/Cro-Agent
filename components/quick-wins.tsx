import React from "react";
import { Zap, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { QuickWin } from "@/types/audit";

interface QuickWinsProps {
  items: QuickWin[];
}

export function QuickWins({ items }: QuickWinsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Quick Wins</span>
        </h3>
        <p className="text-xs text-slate-400">
          High-impact fixes that require minimal time to implement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {items.map((win, idx) => (
          <Card
            key={idx}
            className="bg-[#111622] border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-sm"
          >
            <CardContent className="p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  High Impact
                </span>
                <span className="font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Low Effort
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-white">
                {win.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {win.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
