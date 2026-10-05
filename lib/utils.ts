import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
  } catch {
    return url;
  }
}

export function getScoreColor(score: number): {
  color: string;
  bg: string;
  border: string;
  text: string;
  badge: string;
} {
  if (score >= 90) {
    return {
      color: "#10b981", // emerald-500
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    };
  }
  if (score >= 75) {
    return {
      color: "#06b6d4", // cyan-500
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    };
  }
  if (score >= 60) {
    return {
      color: "#3b82f6", // blue-500
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    };
  }
  if (score >= 40) {
    return {
      color: "#f59e0b", // amber-500
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    };
  }
  return {
    color: "#ef4444", // red-500
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };
}

export function getTierLabel(score: number): {
  label: string;
  description: string;
} {
  if (score >= 90) {
    return {
      label: "Excellent",
      description: "Exceptional conversion architecture with minimal friction points.",
    };
  }
  if (score >= 75) {
    return {
      label: "Strong",
      description: "High-performing page with minor optimization opportunities.",
    };
  }
  if (score >= 60) {
    return {
      label: "Good",
      description: "Solid foundation, but several conversion opportunities remain.",
    };
  }
  if (score >= 40) {
    return {
      label: "Needs Improvement",
      description: "Substantial friction detected in value proposition or trust elements.",
    };
  }
  return {
    label: "Critical",
    description: "Urgent conversion blockers preventing prospective customers from taking action.",
  };
}
