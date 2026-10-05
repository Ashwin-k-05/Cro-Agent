import React from "react";
import { Zap, Clock, Target, Layers } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Recommendation, Priority, Impact, Effort } from "@/types/audit";

interface RecommendationCardProps {
  item: Recommendation;
}

export function RecommendationCard({ item }: RecommendationCardProps) {
  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case "high":
        return {
          badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
          text: "Priority: High",
        };
      case "medium":
        return {
          badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          text: "Priority: Medium",
        };
      case "low":
      default:
        return {
          badge: "bg-slate-800 text-slate-300 border-slate-700",
          text: "Priority: Low",
        };
    }
  };

  const getImpactBadge = (impact: Impact) => {
    switch (impact) {
      case "high":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "medium":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "low":
      default:
        return "text-slate-400 bg-slate-800 border-slate-700";
    }
  };

  const getEffortBadge = (effort: Effort) => {
    switch (effort) {
      case "low":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "high":
      default:
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    }
  };

  const priorityStyle = getPriorityBadge(item.priority);

  return (
    <Card className="bg-[#111622] border-slate-800 hover:border-slate-700 transition-all duration-200 break-inside-avoid shadow-sm">
      <CardContent className="p-5 space-y-3">
        {/* Badges strip */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={priorityStyle.badge} size="sm">
            <Target className="w-3 h-3" />
            <span className="font-semibold">{priorityStyle.text}</span>
          </Badge>

          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded border inline-flex items-center gap-1 ${getImpactBadge(
              item.impact
            )}`}
          >
            <Zap className="w-3 h-3" />
            Impact: {item.impact.toUpperCase()}
          </span>

          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded border inline-flex items-center gap-1 ${getEffortBadge(
              item.effort
            )}`}
          >
            <Clock className="w-3 h-3" />
            Effort: {item.effort.toUpperCase()}
          </span>

          {item.category && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded border bg-[#0b0f17] text-slate-400 border-slate-800 inline-flex items-center gap-1 ml-auto">
              <Layers className="w-3 h-3 text-slate-500" />
              {item.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
          {item.title}
        </h4>

        {/* Actionable guidance */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
}
