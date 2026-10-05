import React from "react";
import {
  LucideIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CategoryAnalysis } from "@/types/audit";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  data: CategoryAnalysis;
  disclaimer?: string;
}

export function CategoryCard({
  title,
  icon: Icon,
  data,
  disclaimer,
}: CategoryCardProps) {
  const getBadgeStyle = (score: number) => {
    if (score >= 8) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    if (score >= 6) return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    if (score >= 4) return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    return "bg-rose-500/15 text-rose-400 border-rose-500/30";
  };

  return (
    <Card className="bg-[#111622] border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between break-inside-avoid shadow-sm">
      <div>
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Icon className="w-4 h-4" />
            </div>
            <CardTitle className="text-sm sm:text-base font-semibold text-white">
              {title}
            </CardTitle>
          </div>

          <Badge className={getBadgeStyle(data.score)} size="sm">
            <span className="font-mono font-bold">{data.score}</span> / 10
          </Badge>
        </CardHeader>

        <CardContent className="p-5 pt-1 space-y-4">
          {/* Analysis text */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0b0f17] p-3 rounded-lg border border-slate-800/80">
            {data.analysis}
          </p>

          {/* Issues */}
          {data.issues.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Friction Points ({data.issues.length})
              </span>
              <ul className="space-y-1">
                {data.issues.map((issue, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-400 flex items-start gap-1.5 leading-relaxed"
                  >
                    <span className="h-1 w-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {data.recommendations.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Recommendations ({data.recommendations.length})
              </span>
              <ul className="space-y-1">
                {data.recommendations.map((rec, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>

      {disclaimer && (
        <div className="px-5 pb-3 pt-1 text-[11px] text-slate-500 italic border-t border-slate-800/40">
          * {disclaimer}
        </div>
      )}
    </Card>
  );
}
