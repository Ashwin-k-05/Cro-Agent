import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#090d15] py-8 text-slate-400 text-xs no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            IQ
          </div>
          <span className="font-semibold text-white">ConvertIQ</span>
          <span className="text-slate-500">— AI Landing Page Audits</span>
        </div>

        <p className="text-slate-500 text-[11px]">
          © {new Date().getFullYear()} ConvertIQ. Fast, automated conversion rate optimization.
        </p>
      </div>
    </footer>
  );
}
