import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "glow"
    | "emerald";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default:
        "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/30 active:scale-[0.98]",
      secondary:
        "bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 active:scale-[0.98]",
      outline:
        "border border-slate-700 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-800/60 text-slate-200 active:scale-[0.98]",
      ghost:
        "hover:bg-slate-800/60 text-slate-300 hover:text-white active:scale-[0.98]",
      destructive:
        "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950/30 active:scale-[0.98]",
      glow:
        "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] active:scale-[0.98]",
      emerald:
        "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/30 active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-10 px-4 text-sm font-medium rounded-xl gap-2",
      lg: "h-12 px-6 text-base font-semibold rounded-xl gap-2.5",
      icon: "h-10 w-10 p-0 rounded-xl justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
