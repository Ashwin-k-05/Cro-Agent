import React from "react";
import { AlertOctagon, AlertTriangle, Info, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { FrictionPoint, Severity } from "@/types/audit";

interface FrictionCardProps {
  item: FrictionPoint;
}

export function FrictionCard({ item }: FrictionCardProps) {
  const getSeverityBadge = (severity: Severity) => {
    switch (severity) {
      case "high":
        return {
          icon: AlertOctagon,
          badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
          text: "High Severity",
        };
      case "medium":
        return {
          icon: AlertTriangle,
          badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          text: "Medium Severity",
        };
      case "low":
      default:
        return {
          icon: Info,
          badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
          text: "Low Severity",
        };
    }
  };

  const style = getSeverityBadge(item.severity);
  const Icon = style.icon;

  return (
    <Card className="bg-[#111622] border-slate-800 hover:border-slate-700 transition-all duration-200 break-inside-avoid shadow-sm">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className={style.badge} size="sm">
            <Icon className="w-3 h-3" />
            <span className="font-semibold">{style.text}</span>
          </Badge>

          {item.elementHint && (
            <span className="text-[11px] text-slate-400 flex items-center gap-1 truncate max-w-[200px]">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">{item.elementHint}</span>
            </span>
          )}
        </div>

        <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
          {item.title}
        </h4>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
}
