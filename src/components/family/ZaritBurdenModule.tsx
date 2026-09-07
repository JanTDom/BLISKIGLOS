"use client";

import React, { useState } from "react";
import { 
  HeartHandshake, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  TrendingDown, 
  ArrowRight, 
  FileText, 
  Award,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { ZaritQuestionItem } from "@/types";

const INITIAL_QUESTIONS: ZaritQuestionItem[] = [
  { id: 1, question: "Czy czujesz, że senior oczekuje od Ciebie więcej pomocy, niż jesteś w stanie zapewnić?", selectedScore: 2 },
  { id: 2, question: "Czy czujesz, że z powodu opieki nie masz wystarczająco dużo czasu dla siebie?", selectedScore: 3 },
  { id: 3, question: "Czy odczuwasz stres związany z próbą pogodzenia opieki z pracą lub własną rodziną?", selectedScore: 2 },
  { id: 4, question: "Czy czujesz zakłopotanie lub lęk z powodu nieprzewidywalnych zachowań seniora?", selectedScore: 1 },
  { id: 5, question: "Czy odczuwasz złość lub bezsilność, gdy jesteś w obecności seniora?", selectedScore: 1 },
  { id: 6, question: "Czy boisz się o to, co przyniesie przyszłość dla Twojego bliskiego?", selectedScore: 3 },
  { id: 7, question: "Czy czujesz, że senior jest całkowicie zależny od Ciebie?", selectedScore: 2 },
  { id: 8, question: "Czy czujesz, że Twoje własne zdrowie ucierpiało z powodu obowiązków opiekuńczych?", selectedScore: 1 },
  { id: 9, question: "Czy czujesz, że straciłeś/aś kontrolę nad własnym życiem od czasu choroby seniora?", selectedScore: 1 },
  { id: 10, question: "Czy czujesz, że mógłbyś/mogłabyś opiekować się lepiej, niż to robisz?", selectedScore: 2 },
  { id: 11, question: "Czy czujesz się wyczerpany/a psychicznie pod koniec dnia opieki?", selectedScore: 2 },
  { id: 12, question: "Jak ogólnie oceniasz poziom swojego przeciążenia opieką?", selectedScore: 2 },
];

const SCORE_LABELS = [
  { val: 0, label: "Nigdy" },
  { val: 1, label: "Rzadko" },
  { val: 2, label: "Czasem" },
  { val: 3, label: "Dość często" },
  { val: 4, label: "Prawie zawsze" },
];

export const ZaritBurdenModule: React.FC = () => {
  const [questions, setQuestions] = useState<ZaritQuestionItem[]>(INITIAL_QUESTIONS);

  const totalScore = questions.reduce((acc, q) => acc + q.selectedScore, 0);

  const getTier = (score: number) => {
    if (score <= 10) return { label: "Niskie obciążenie", color: "text-emerald-700 bg-emerald-100 border-emerald-300", desc: "Twój stan emocjonalny jest stabilny. BliskiGłos skutecznie wspiera seniora." };
    if (score <= 20) return { label: "Umiarkowane przeciążenie", color: "text-amber-800 bg-amber-100 border-amber-300", desc: "Pojawiają się pierwsze sygnały zmęczenia rolą opiekuna. Zalecane korzystanie z opieki wytchnieniowej." };
    return { label: "Wysokie ryzyko wypalenia (ZBI > 20)", color: "text-rose-800 bg-rose-100 border-rose-300", desc: "Krytyczne przeciążenie psychiczne. Wymaga natychmiastowego wdrożenia wsparcia wytchnieniowego FERS." };
  };

  const currentTier = getTier(totalScore);

  const handleScoreChange = (qId: number, score: number) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, selectedScore: score } : q));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-8">
      {/* Nagłówek modułu */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            <span>Standard FERS • Wsparcie Opiekuna Faktycznego</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
            Tarcza Przeciążenia Opiekuna (Skala Zarita ZBI-12)
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl">
            Klinicznie zwalidowany kwestionariusz Zarit Burden Interview mierzący syndrom „drugiego pacjenta”. Pozwala monitorować uwalnianie czasu opiekuna dzięki wsparciu BliskiegoGłosu.
          </p>
        </div>

        {/* Licznik wyniku */}
        <div className="p-5 rounded-3xl bg-[#FAF7F2] border-2 border-amber-300 shadow-md text-center shrink-0 min-w-[200px]">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
            Aktualny Wynik ZBI-12
          </span>
          <div className="flex items-baseline justify-center gap-1 my-1">
            <span className="text-4xl font-serif font-bold text-amber-900">{totalScore}</span>
            <span className="text-stone-500 font-mono text-sm">/ 48</span>
          </div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${currentTier.color}`}>
            {currentTier.label}
          </span>
        </div>
      </div>

      {/* Pasek postępu i porównanie przed/po */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
          <span className="text-xs text-stone-500 block font-semibold">Wynik przed BliskimGłosem:</span>
          <span className="text-2xl font-bold font-serif text-stone-700 mt-1 block">34 pkt</span>
          <span className="text-xs text-rose-700 font-semibold">Stan ciężkiego wyczerpania</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs text-emerald-800 block font-semibold">Aktualny wynik z BliskimGłosem:</span>
          <span className="text-2xl font-bold font-serif text-emerald-800 mt-1 block">{totalScore} pkt</span>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingDown className="w-4 h-4" /> Spadek przeciążenia o {Math.round(((34 - totalScore) / 34) * 100)}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <span className="text-xs text-amber-900 block font-semibold">Zaoszczędzony czas wytchnienia:</span>
          <span className="text-2xl font-bold font-serif text-amber-900 mt-1 block">~14 h / tydz.</span>
          <span className="text-xs text-amber-800 font-semibold">Czas na własny odpoczynek i sen</span>
        </div>
      </div>

      {/* Kwestionariusz pytań */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          Krótki kwestionariusz oceny przeciążenia (12 pytań klinicznych)
        </h3>

        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200 hover:border-amber-300 transition-all">
              <div className="text-sm font-semibold text-stone-900 mb-3">
                <span className="font-mono text-amber-800 font-bold mr-2">{idx + 1}.</span>
                {q.question}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SCORE_LABELS.map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => handleScoreChange(q.id, opt.val)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      q.selectedScore === opt.val
                        ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-400"
                        : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {opt.label} ({opt.val})
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendacje kliniczne i pobranie raportu */}
      <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <strong className="text-stone-900 font-serif text-lg block">
            Rekomendacja dla Programu Usług Wytchnieniowych (FERS)
          </strong>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
            {currentTier.desc} Wynik jest gotowy do dołączenia do dokumentacji MOPS / PCPR w celu uzyskania dofinansowania asystenta osoby niepełnosprawnej.
          </p>
        </div>

        <button
          onClick={() => alert("Wygenerowano oficjalny Arkusz Oceny Przeciążenia Opiekuna (ZBI-12) z pieczęcią cyfrową BliskiGłos.")}
          className="px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Drukuj Arkusz ZBI-12</span>
        </button>
      </div>
    </div>
  );
};
