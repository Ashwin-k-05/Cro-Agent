import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ConvertIQ — AI Landing Page CRO Audits",
  description:
    "Fast, professional AI conversion rate optimization audits. Analyze Shopify stores and landing pages in seconds.",
  keywords: [
    "ConvertIQ",
    "CRO",
    "conversion rate optimization",
    "landing page audit",
    "Shopify CRO",
    "AI audit",
  ],
  authors: [{ name: "ConvertIQ" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
