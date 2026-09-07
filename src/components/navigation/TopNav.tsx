"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, ShieldAlert, Users, PhoneCall, Sparkles, Lock, LogOut, UserCheck } from "lucide-react";
import { getAuthSession, logout, onAuthChange } from "@/lib/auth";
import { AuthSession } from "@/types";

interface TopNavProps {
  fontSize?: "normal" | "large" | "extra-large";
  onFontSizeChange?: (size: "normal" | "large" | "extra-large") => void;
}

export const TopNav: React.FC<TopNavProps> = ({ fontSize = "large", onFontSizeChange }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isSeniorPage = pathname === "/senior";

  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(getAuthSession());
    const unsub = onAuthChange((newSession) => {
      setSession(newSession);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await logout();
    setSession(null);
    if (pathname === "/opiekun") {
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF7F2]/90 border-b border-amber-900/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-2">
        {/* Logo i tożsamość */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white/20" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 block leading-none">
              BliskiGłos<span className="text-amber-600">.pl</span>
            </span>
            <span className="text-[10px] sm:text-xs tracking-wider uppercase text-amber-900/70 font-semibold block mt-1">
              Ciepły Towarzysz Seniora
            </span>
          </div>
        </Link>

        {/* Główne linki nawigacyjne */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-stone-200/50 p-1.5 rounded-full border border-stone-300/40">
          <Link
            href="/senior"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              isSeniorPage
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/25"
                : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Rozmawiaj (Senior)</span>
          </Link>
          <Link
            href="/opiekun"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              pathname === "/opiekun"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/25"
                : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Portal Rodziny</span>
          </Link>
          <Link
            href="/cennik"
            className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              pathname === "/cennik"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/25"
                : "text-stone-700 hover:text-stone-950 hover:bg-white/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Cennik</span>
          </Link>
        </nav>

        {/* Prawa strona: status logowania, czcionka i SOS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status logowania / przycisk logowania */}
          {session ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-full py-1 px-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Zalogowano:</span>
                <span className="font-semibold text-emerald-950">{session.user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 rounded-full text-emerald-700 hover:text-rose-700 hover:bg-rose-50 transition-colors ml-1"
                title="Wyloguj się z programu"
                aria-label="Wyloguj się"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                pathname === "/login"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-white hover:bg-amber-50 text-stone-800 border border-amber-300/80 shadow-sm"
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Logowanie</span>
            </Link>
          )}

          {/* Przełącznik czcionki dla seniora */}
          {onFontSizeChange && (
            <div className="flex items-center bg-amber-100/70 rounded-full p-1 border border-amber-200" title="Zmień wielkość liter">
              <button
                type="button"
                onClick={() => onFontSizeChange("normal")}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center transition-all ${
                  fontSize === "normal" ? "bg-amber-600 text-white" : "text-amber-950 hover:bg-amber-200/60"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange("large")}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-sm sm:text-base font-bold flex items-center justify-center transition-all ${
                  fontSize === "large" ? "bg-amber-600 text-white" : "text-amber-950 hover:bg-amber-200/60"
                }`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => onFontSizeChange("extra-large")}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-base sm:text-lg font-extrabold flex items-center justify-center transition-all ${
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
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-200 text-xs sm:text-sm font-bold transition-colors shrink-0"
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
