import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "glow";
  size?: "sm" | "md" | "lg";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-blue-600/20 text-blue-300 border border-blue-500/30",
    secondary: "bg-slate-800 text-slate-300 border border-slate-700/60",
    outline: "text-slate-300 border border-slate-700 bg-transparent",
    destructive: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    glow: "bg-blue-500/10 text-blue-300 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.3)]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium rounded-full",
    md: "px-2.5 py-1 text-xs font-semibold rounded-full",
    lg: "px-3 py-1.5 text-sm font-semibold rounded-full",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors focus:outline-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
