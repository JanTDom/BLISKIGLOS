"use client";

import React from "react";
import Link from "next/link";
import { TopNav } from "@/components/navigation/TopNav";
import { 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Building2, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Printer, 
  ExternalLink,
  BookOpen,
  Scale,
  BrainCircuit,
  Lock
} from "lucide-react";

export default function GrantDossierPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      <TopNav />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Nagłówek Dossier B+R */}
        <div className="border-b border-stone-300 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold uppercase tracking-wider border border-emerald-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-700" />
              <span>Dossier Projektu B+R • Wymogi NCBR / FERS / PFRON / Horizon</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 tracking-tight leading-tight [text-wrap:balance]">
              Architektura Badawczo-Rozwojowa &amp;&nbsp;Kliniczna BliskiGłos
            </h1>
            <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Dokumentacja metodologiczna, poziomy gotowości technologicznej (TRL) oraz kwalifikacja medyczno-społeczna projektu dedykowana komisjom oceny grantowej.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Drukuj Dossier (PDF)</span>
          </button>
        </div>

        {/* Matryca TRL (Poziomy Gotowości Technologicznej) */}
        <section className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md space-y-6">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-amber-600" />
            Ścieżka Wdrożeniowa B+R
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
            Kwalifikacja TRL (Technology Readiness Levels)
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-mono font-bold text-stone-500">TRL 4 • OSIĄGNIĘTE</span>
              <strong className="block text-stone-900 text-base font-bold mt-1">Zwalidowane w laboratorium</strong>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Potwierdzenie działania algorytmów Dual-VAD, Terapii Walidacyjnej Naomi Feil i syntezy ElevenLabs 0.90x.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800">TRL 6 • AKTUALNY</span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              </div>
              <strong className="block text-emerald-950 text-base font-bold mt-1">Demonstracja w środowisku</strong>
              <p className="text-xs text-emerald-800 mt-2 leading-relaxed">
                Działający portal seniora i opiekuna, spektrografia mowy live oraz interaktywny graf Konstelacji Wspomnień.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-mono font-bold text-amber-800">TRL 7 • CEL GRANTU</span>
              <strong className="block text-amber-950 text-base font-bold mt-1">Prototyp w warunkach opieki</strong>
              <p className="text-xs text-amber-800 mt-2 leading-relaxed">
                Wdrożenie terminali stacjonarnych BliskiGłos Retro-Box w 5 Dziennych Domach Pobytu i pilotażu domowym n=120.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-mono font-bold text-stone-500">TRL 8 • KOMERCJALIZACJA</span>
              <strong className="block text-stone-900 text-base font-bold mt-1">Certyfikowany system B2G</strong>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Integracja z krajowymi rejestrami teleopieki gminnej oraz systemami ubezpieczeń zdrowotnych.
              </p>
            </div>
          </div>
        </section>

        {/* Metodologia Badawcza & Próba Kliniczna n=120 */}
        <section className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md space-y-6">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-emerald-600" />
            Protokół Kliniczny &amp; Metodologia
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
            Metodyka Badawcza i Mierzalne Wskaźniki Wpływu
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-stone-700">
            <div className="space-y-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                1. Grupa Badawcza i Randomizacja (RCT):
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Próba n=120:</strong> Osoby 70+ z rozpoznanym łagodnym/umiarkowanym otępieniem (MMSE 14–24).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Grupa Kontrolna:</strong> Standardowa opieka środowiskowa bez asystenta głosowego.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Okres obserwacji:</strong> 6 miesięcy ciągłego monitoringu biomarkerów mowy.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                2. Zwalidowane Narzędzia Pomiarowe:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>ZBI-12:</strong> Skala przeciążenia opiekuna Zarita (hipoteza: redukcja o min. 30%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>GDS-15:</strong> Geriatryczna Skala Depresji (hipoteza: spadek lęku wieczornego).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Akustyczne CVI:</strong> Zmienność pauz hesytacyjnych i stabilność F0 w mowie.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* RODO Medyczne & Bioetyka */}
        <section className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md space-y-6">
          <div className="flex items-center gap-2 text-stone-700 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-stone-600" />
            Standard Bezpieczeństwa Medycznego
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
            Zgodność z RODO Medycznym, Deklaracją Helsińską i SaMD
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 text-xs text-stone-700">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200">
              <strong className="block text-stone-900 font-bold mb-1">PII Scrubber w locie:</strong>
              Wszystkie nazwiska, adresy i numery PESEL są usuwane przed analizą psychometryczną.
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200">
              <strong className="block text-stone-900 font-bold mb-1">Klasyfikacja SaMD MDR:</strong>
              Projekt przygotowany do audytu wyrobu medycznego oprogramowania (MDR 2017/745, Reguła 11).
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200">
              <strong className="block text-stone-900 font-bold mb-1">Brak halucynacji faktów:</strong>
              Ścisła implementacja Terapii Walidacyjnej Naomi Feil — brak sprzeczności z urojeniem seniora.
            </div>
          </div>
        </section>

        {/* Bezpośrednie linki do modułów live dla komisji oceniającej */}
        <section className="bg-stone-900 text-white rounded-3xl p-8 border border-stone-800 shadow-2xl space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Eksploracja Środowiska na Żywo
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Przetestuj Aktywne Moduły Systemu:
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/opiekun?tab=clinical"
              className="p-4 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all block group"
            >
              <div className="text-xs text-emerald-400 font-bold mb-1">B+R • Spektrografia</div>
              <strong className="text-white block group-hover:text-emerald-300 transition-colors">
                Voice Biomarker Lab™
              </strong>
              <span className="text-xs text-stone-400 mt-1 block">Badanie biomarkerów mowy live</span>
            </Link>

            <Link
              href="/opiekun?tab=constellation"
              className="p-4 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all block group"
            >
              <div className="text-xs text-amber-400 font-bold mb-1">Wiedza • AI Reminiscencja</div>
              <strong className="text-white block group-hover:text-amber-300 transition-colors">
                Konstelacja Wspomnień
              </strong>
              <span className="text-xs text-stone-400 mt-1 block">Graf 2D powiązań pamięciowych</span>
            </Link>

            <Link
              href="/opiekun?tab=gmina"
              className="p-4 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all block group"
            >
              <div className="text-xs text-sky-400 font-bold mb-1">FERS • B2G Samorząd</div>
              <strong className="text-white block group-hover:text-sky-300 transition-colors">
                Pulpit Koordynatora Gminnego
              </strong>
              <span className="text-xs text-stone-400 mt-1 block">Deinstytucjonalizacja &amp; Triage</span>
            </Link>

            <Link
              href="/opiekun?tab=zarit"
              className="p-4 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all block group"
            >
              <div className="text-xs text-purple-400 font-bold mb-1">Klinika • ZBI-12</div>
              <strong className="text-white block group-hover:text-purple-300 transition-colors">
                Tarcza Przeciążenia Zarita
              </strong>
              <span className="text-xs text-stone-400 mt-1 block">Wskaźnik wypalenia opiekuna</span>
            </Link>

            <Link
              href="/opiekun?tab=memories"
              className="p-4 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all block group"
            >
              <div className="text-xs text-amber-400 font-bold mb-1">Kultura • Dziedzictwo</div>
              <strong className="text-white block group-hover:text-amber-300 transition-colors">
                Kronika Życia &amp; Audiobook
              </strong>
              <span className="text-xs text-stone-400 mt-1 block">Druk pamiątkowy i audio</span>
            </Link>

            <Link
              href="/senior"
              className="p-4 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-all block group"
            >
              <div className="text-xs text-orange-400 font-bold mb-1">Interfejs Seniora</div>
              <strong className="text-white block group-hover:text-orange-300 transition-colors">
                Stanowisko Seniora &amp; Retro-Radio
              </strong>
              <span className="text-xs text-stone-400 mt-1 block">Living Hearth i Radio Lampowe</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
