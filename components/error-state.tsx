import React from "react";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ErrorStateProps {
  error: string;
  errorCode?: string;
  onRetry: () => void;
  onReset: () => void;
}

export function ErrorState({
  error,
  errorCode,
  onRetry,
  onReset,
}: ErrorStateProps) {
  const getGuidance = (code?: string) => {
    switch (code) {
      case "ACCESS_DENIED":
        return "This website blocks automated access (Cloudflare or bot protection). Try another public store or landing page.";
      case "JAVASCRIPT_REQUIRED":
        return "This page requires browser JavaScript to render content. Public HTML pages or Shopify stores work best.";
      case "TIMEOUT":
        return "The website took longer than 12 seconds to respond. Check if the site is reachable.";
      case "NOT_FOUND":
        return "The page returned 404 Not Found. Please check the URL spelling.";
      case "VALIDATION_ERROR":
        return "Please enter a valid website address starting with http:// or https://";
      default:
        return "Check the URL or try analyzing another website.";
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-16 px-4 animate-in fade-in duration-200">
      <Card className="bg-[#111622] border-slate-800 shadow-xl overflow-hidden text-center">
        <CardContent className="p-6 sm:p-8 space-y-5">
          <div className="mx-auto h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-white">
              Unable to Audit Page
            </h2>
            <p className="text-sm text-slate-300">
              {error}
            </p>
          </div>

          <div className="bg-[#0b0f17] border border-slate-800 rounded-lg p-3 text-xs text-slate-400 text-left">
            <span className="font-semibold text-slate-300 block mb-0.5">Note:</span>
            <p>{getGuidance(errorCode)}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              onClick={onRetry}
              className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </Button>

            <Button
              variant="secondary"
              onClick={onReset}
              className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
