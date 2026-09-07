"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNav } from "@/components/navigation/TopNav";
import { LoginForm } from "@/components/auth/LoginForm";
import { getAuthSession, logout } from "@/lib/auth";
import { AuthSession } from "@/types";
import { Heart, ShieldCheck, ArrowLeft, ArrowRight, LogOut, CheckCircle2, UserCheck } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/opiekun";

  const [session, setSession] = useState<AuthSession | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = getAuthSession();
    if (existing) {
      setSession(existing);
    }
  }, []);

  const handleLoginSuccess = (newSession: AuthSession) => {
    setSession(newSession);
    setTimeout(() => {
      router.push(redirectUrl);
    }, 500);
  };

  const handleLogout = async () => {
    await logout();
    setSession(null);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Przycisk powrotu */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Wróć do strony głównej</span>
        </Link>

        <Link
          href="/senior"
          className="text-xs font-bold text-amber-700 hover:text-amber-900 underline"
        >
          Przejdź do rozmowy jako Senior
        </Link>
      </div>

      {mounted && session ? (
        /* Widok dla już zalogowanego użytkownika */
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-emerald-200 p-8 shadow-2xl text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md mb-4">
            <UserCheck className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Sesja Aktywna
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-950 mt-3">
            Jesteś już zalogowany
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Zalogowano jako: <strong>{session.user.email}</strong>
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={redirectUrl}
              className="w-full py-4 px-6 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-base shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Przejdź do Portalu Opiekuna</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full py-3 px-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Wyloguj się</span>
            </button>
          </div>
        </div>
      ) : (
        /* Okno logowania */
        <LoginForm
          onSuccess={handleLoginSuccess}
          redirectUrl={redirectUrl}
        />
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans relative overflow-x-hidden selection:bg-amber-200">
      {/* Tło ze świetlnym akcentem */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 via-[#FAF7F2] to-[#FAF7F2]" />

      <TopNav />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <Suspense fallback={
          <div className="w-full max-w-lg p-12 text-center text-stone-500 font-medium">
            Ładowanie formularza logowania...
          </div>
        }>
          <LoginContent />
        </Suspense>
      </main>

      <footer className="w-full bg-stone-100/70 border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        BliskiGłos.pl • Bezpieczny system wsparcia seniora i rodziny
      </footer>
    </div>
  );
}
