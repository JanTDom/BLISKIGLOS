"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShieldAlert, Users, PhoneCall, Sparkles } from "lucide-react";

interface TopNavProps {
  fontSize?: "normal" | "large" | "extra-large";
  onFontSizeChange?: (size: "normal" | "large" | "extra-large") => void;
}

export const TopNav: React.FC<TopNavProps> = ({ fontSize = "large", onFontSizeChange }) => {
  const pathname = usePathname();
  const isSeniorPage = pathname === "/senior";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF7F2]/90 border-b border-amber-900/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo i tożsamość */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 text-white fill-white/20" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 block leading-none">
              BliskiGłos<span className="text-amber-600">.pl</span>
            </span>
            <span className="text-xs tracking-wider uppercase text-amber-900/70 font-semibold block mt-1">
              Ciepły Towarzysz Seniora
            </span>
          </div>
        </Link>

        {/* Główne linki nawigacyjne */}
        <nav className="hidden md:flex items-center gap-1.5 bg-stone-200/50 p-1.5 rounded-full border border-stone-300/40">
          <Link
            href="/senior"
            className={`px-5 py-2.5 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
              isSeniorPage
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/25"
                : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Rozmawiaj (Tryb Seniora)
          </Link>
          <Link
            href="/opiekun"
            className={`px-4 py-2.5 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
              pathname === "/opiekun"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/25"
                : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
            }`}
          >
            <Users className="w-4 h-4" />
            Portal Rodziny
          </Link>
          <Link
            href="/cennik"
            className={`px-4 py-2.5 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
              pathname === "/cennik"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/25"
                : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Pakiety i Cennik
          </Link>
        </nav>

        {/* Prawa strona: kontrola czcionki i SOS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Przełącznik czcionki dla seniora */}
          {onFontSizeChange && (
            <div className="flex items-center bg-amber-100/70 rounded-full p-1 border border-amber-200" title="Zmień wielkość liter">
              <button
                type="button"
                onClick={() => onFontSizeChange("normal")}
                className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all ${
                  fontSize === "normal" ? "bg-amber-600 text-white" : "text-amber-950 hover:bg-amber-200/60"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange("large")}
                className={`w-8 h-8 rounded-full text-base font-bold flex items-center justify-center transition-all ${
                  fontSize === "large" ? "bg-amber-600 text-white" : "text-amber-950 hover:bg-amber-200/60"
                }`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange("extra-large")}
                className={`w-8 h-8 rounded-full text-lg font-extrabold flex items-center justify-center transition-all ${
                  fontSize === "extra-large" ? "bg-amber-600 text-white" : "text-amber-950 hover:bg-amber-200/60"
                }`}
              >
                A++
              </button>
            </div>
          )}

          {/* Przycisk Pomocy Nagłej (SOS) */}
          <a
            href="tel:112"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-200 text-sm font-bold transition-colors"
            title="W razie nagłego wypadku zadzwoń pod 112"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span className="hidden sm:inline">Nagła pomoc</span> 112
          </a>
        </div>
      </div>
    </header>
  );
};
