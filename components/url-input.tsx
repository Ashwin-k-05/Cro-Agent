"use client";

import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { ArrowRight, AlertCircle, Sparkles, X, ShoppingBag, Globe, Zap } from "lucide-react";
import { Button } from "./ui/button";

export interface UrlInputHandle {
  focus: () => void;
  setUrl: (url: string) => void;
}

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const SAMPLE_URLS = [
  {
    label: "Shopify Store",
    icon: ShoppingBag,
    url: "https://allbirds.com/products/mens-tree-runners",
  },
  {
    label: "SaaS Landing",
    icon: Zap,
    url: "https://linear.app",
  },
  {
    label: "Fintech Web",
    icon: Globe,
    url: "https://stripe.com",
  },
];

export const UrlInput = forwardRef<UrlInputHandle, UrlInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [url, setUrl] = useState("");
    const [clientError, setClientError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      },
      setUrl: (newUrl: string) => {
        setUrl(newUrl);
        setClientError(null);
      },
    }));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = url.trim();

      if (!trimmed) {
        setClientError("Please enter a website URL.");
        inputRef.current?.focus();
        return;
      }

      if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        setClientError("URL must start with http:// or https://");
        inputRef.current?.focus();
        return;
      }

      try {
        new URL(trimmed);
      } catch {
        setClientError("Please enter a valid website address.");
        inputRef.current?.focus();
        return;
      }

      setClientError(null);
      onSubmit(trimmed);
    };

    const handleSelectSample = (sampleUrl: string) => {
      setUrl(sampleUrl);
      setClientError(null);
      inputRef.current?.focus();
    };

    return (
      <div className="w-full max-w-2xl mx-auto" id="url-analyzer-card">
        {/* Main Card with top accent light streak */}
        <div className="relative group bg-[#111622]/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-slate-700">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <label
              htmlFor="landing-page-url-input"
              className="block text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
            >
              Enter website or product URL
            </label>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  id="landing-page-url-input"
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (clientError) setClientError(null);
                  }}
                  placeholder="https://yourstore.com/products/item"
                  disabled={isLoading}
                  className="w-full h-13 px-4 pr-10 rounded-xl bg-[#0b0f17]/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner disabled:opacity-60"
                  aria-describedby={clientError ? "url-error-msg" : undefined}
                />
                {url && (
                  <button
                    type="button"
                    onClick={() => {
                      setUrl("");
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Button
                type="submit"
                size="md"
                isLoading={isLoading}
                className="h-13 px-7 text-sm font-semibold shrink-0 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all rounded-xl"
              >
                <span>Run Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Error Message */}
            {clientError && (
              <div
                id="url-error-msg"
                className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg text-left"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{clientError}</span>
              </div>
            )}
          </form>

          {/* Quick-fill sample buttons */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Try sample:
            </span>
            {SAMPLE_URLS.map((sample) => {
              const Icon = sample.icon;
              return (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => handleSelectSample(sample.url)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all cursor-pointer text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <Icon className="w-3 h-3 text-blue-400" />
                  <span>{sample.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

UrlInput.displayName = "UrlInput";
