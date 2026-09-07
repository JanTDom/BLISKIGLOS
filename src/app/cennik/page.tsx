"use client";

import React from "react";
import Link from "next/link";
import { TopNav } from "@/components/navigation/TopNav";
import { Heart, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Mic } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      <TopNav />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16 flex flex-col justify-center">
        {/* Banner pilotażu */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-300/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            100% Bezpłatny Dostęp Społeczny • Pilotaż B+R
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            BliskiGłos jest bezpłatny dla seniorów i rodzin
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl mt-4 leading-relaxed">
            Nie pobieramy żadnych opłat, abonamentów ani danych kart płatniczych. Projekt jest rozwijany jako innowacja społeczna i technologiczna (B+R) służąca zapobieganiu izolacji osób chorych na demencję i chorobę Alzheimera.
          </p>
        </div>

        {/* Karta informacyjna */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200/80 mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-600" />
            Wszystkie funkcje systemu dostępne bez ograniczeń:
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 text-stone-700">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-medium">Ciepły Głos Towarzysza</strong>
                <span className="text-sm text-stone-600">Nielimitowane, cierpliwe rozmowy głosowe (Pani Krystyna, Pan Stanisław lub Głos Córki).</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-medium">Terapia Walidacyjna Naomi Feil</strong>
                <span className="text-sm text-stone-600">Bezpieczna rozmowa bez korygowania urojeń, kojąca lęk i niepokój seniora.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-medium">Konstelacja Wspomnień</strong>
                <span className="text-sm text-stone-600">Interaktywny graf relacji i ocalonych historii z młodości seniora.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 font-medium">Kliniczny Raport Neuro-Brief</strong>
                <span className="text-sm text-stone-600">Akustyczne biomarkery mowy i wskaźnik CVI gotowe do wydruku dla lekarza geriatry.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-stone-600 text-sm">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Zgodność z RODO i standardami bioetycznymi</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/senior"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg transition-all shadow-lg shadow-amber-600/20"
              >
                <Mic className="w-5 h-5" />
                Włącz Bliski Głos Seniora
              </Link>
              <Link
                href="/opiekun"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-base transition-all"
              >
                Portal Opiekuna
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
