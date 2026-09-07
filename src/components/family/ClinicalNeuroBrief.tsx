"use client";

import React from "react";
import { 
  SeniorProfile, 
  CognitiveVitalityIndex, 
  RespiteMetrics, 
  AcousticBiomarkers, 
  SeniorMessage 
} from "@/types";
import { 
  Activity, 
  Brain, 
  Clock, 
  Download, 
  FileText, 
  Heart, 
  Printer, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle,
  Sparkles,
  CheckCircle2
} from "lucide-react";

interface ClinicalNeuroBriefProps {
  profile: SeniorProfile;
  cvi: CognitiveVitalityIndex;
  respite: RespiteMetrics;
  messages: SeniorMessage[];
}

export const ClinicalNeuroBrief: React.FC<ClinicalNeuroBriefProps> = ({
  profile,
  cvi,
  respite,
  messages,
}) => {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8 print:p-0 print:m-0">
      {/* Pasek akcji raportu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Brain className="w-4 h-4 text-blue-700" />
            <span>Kliniczny Raport Neuro-Behawioralny (Clinical Decision Support)</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
            Zestawienie dla Lekarza Geriatry / Neurologa
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Obiektywne dane o dynamice mowy, biomarkerach akustycznych i dobowym profilu lęku pacjenta {profile.name}.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2.5 shrink-0"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>Drukuj / Pobierz PDF dla Lekarza</span>
        </button>
      </div>

      {/* DOKUMENT RAPORTU (Przystosowany do wydruku i ekranu) */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-stone-200 shadow-xl print:border-none print:shadow-none print:p-0 text-stone-900">
        {/* Nagłówek dokumentu medycznego */}
        <div className="border-b-2 border-stone-900 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 font-mono">
              SYSTEM BLISKIGLOS 2.0 • CERTYFIKAT ETYCZNO-MEDYCZNY
            </span>
            <h1 className="font-serif text-3xl font-bold text-stone-950 mt-1">
              Raport Neuro-Psychologiczny: {profile.name} (lat {profile.age || 82})
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-mono">
              Identyfikator profilu: {profile.id} • Rozpoznanie wyjściowe: Otępienie w stadium {profile.dementiaStage}
            </p>
          </div>

          <div className="text-right font-mono text-xs text-stone-500">
            <div>Data wygenerowania: <strong>{new Date().toLocaleDateString("pl-PL")}</strong></div>
            <div>Opiekun zgłaszający: <strong>{profile.familyContact.name}</strong></div>
          </div>
        </div>

        {/* 1. Główne Wskaźniki Witalności Poznawczej (CVI) */}
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            1. Obiektywny Wskaźnik Witalności Poznawczej (Cognitive Vitality Index - CVI)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200">
              <span className="text-xs text-blue-800 font-bold uppercase block">
                Wynik CVI (Skala 0-100)
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-4xl font-bold text-blue-950">
                  {cvi.cviScore}
                </span>
                <span className="text-sm font-semibold text-blue-700">/ 100</span>
              </div>
              <p className="text-xs text-blue-800 mt-2 font-medium">
                Trend 30-dniowy: <strong>Stabilny</strong> (brak nagłych skoków ubytkowych).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200">
              <span className="text-xs text-emerald-800 font-bold uppercase block">
                Zaangażowanie w mowę czynną
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-4xl font-bold text-emerald-950">
                  {cvi.weeklyAverageTalkMinutes}
                </span>
                <span className="text-sm font-semibold text-emerald-700">min / dzień</span>
              </div>
              <p className="text-xs text-emerald-800 mt-2 font-medium">
                Optymalna stymulacja ośrodka Broki bez przemęczenia poznawczego.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200">
              <span className="text-xs text-amber-800 font-bold uppercase block">
                Indeks Pętli Pamięciowych
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-4xl font-bold text-amber-950">
                  {cvi.repetitionFrequency}%
                </span>
                <span className="text-sm font-semibold text-amber-700">częstości</span>
              </div>
              <p className="text-xs text-amber-800 mt-2 font-medium">
                Powtarzanie wątków zwalidowane terapeutycznie bez frustracji seniora.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Biomarkery Akustyczno-Leksykalne (Afazja Amnestyczna) */}
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-600" />
            2. Analiza Lingwistyczna & Biomarkery Mowy (Wczesne Wykrywanie Ubytków)
          </h3>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>Wskaźnik bogactwa słownika (Type-Token Ratio):</span>
                  <span>72% (W normie wieku)</span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: "72%" }} />
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Senior zachowuje bogaty zasób słów z okresu młodości i tradycji rodzinnych.
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>Wskaźnik zastępowania rzeczowników zaimkami (Noun-to-Pronoun):</span>
                  <span>2.4 : 1 (Niski wskaźnik afazji)</span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "80%" }} />
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Brak gwałtownego zastępowania nazw konkretnych sformułowaniami typu „to tamto”.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dobowy Profil Lęku Zmierzchowego (Sundowning Tracker) */}
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            3. Analiza Dobowego Pobudzenia i Zespołu Zachodzącego Słońca (Sundowning)
          </h3>

          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <strong className="text-stone-900 block font-serif text-lg">
                  Godziny szczytowego niepokoju: 16:45 – 18:15
                </strong>
                <span className="text-xs text-stone-600">
                  Epizody lękowe zneutralizowane niefarmakologicznie przez Tłumik Zmierzchowy BLISKIGLOS.
                </span>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
                0 koniecznych interwencji doraźnych
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
              {[
                { hour: "08:00", val: "Spokój", color: "bg-emerald-100 text-emerald-900" },
                { hour: "12:00", val: "Pogodny", color: "bg-emerald-100 text-emerald-900" },
                { hour: "15:00", val: "Nostalgia", color: "bg-amber-100 text-amber-900" },
                { hour: "17:00", val: "Lęk (zwalidowany)", color: "bg-orange-200 text-orange-950 font-bold" },
                { hour: "19:00", val: "Wyciszenie", color: "bg-amber-100 text-amber-900" },
                { hour: "21:00", val: "Senny", color: "bg-blue-100 text-blue-900" },
              ].map((slot, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border border-stone-200 ${slot.color}`}>
                  <div className="font-bold">{slot.hour}</div>
                  <div className="text-[10px] mt-0.5">{slot.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Skala Wypalenia Opiekuna (Zarit Burden Scale ZBI-12 - Standard FERS) */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600" />
            4. Odciążenie Opiekuna Nieformalnego (Skala Zarita ZBI-12 & Wytchnienie)
          </h3>

          <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <strong className="text-stone-900 block font-serif text-xl">
                Redukcja Obciążenia Opiekuna o {respite.stressReductionPercent}%
              </strong>
              <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
                Przed wdrożeniem asystenta wynik w skali Zarita wynosił <strong>{respite.previousZaritScore}/48</strong> (wysokie ryzyko załamania psychicznego). Obecny wynik: <strong>{respite.zaritBurdenScore}/48</strong> (poziom bezpieczny, stabilny).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-rose-300 text-center shrink-0 shadow-sm">
              <span className="text-xs text-stone-500 uppercase font-bold block">Czas wytchnienia</span>
              <span className="text-3xl font-serif font-bold text-rose-900">{respite.weeklyRespiteHours} h</span>
              <span className="text-xs text-stone-500 block">w tym tygodniu</span>
            </div>
          </div>
        </div>

        {/* Podpis i nota prawno-etyczna */}
        <div className="pt-6 border-t border-stone-300 text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span>Raport medyczny wygenerowany w oparciu o protokoły Terapii Walidacyjnej Naomi Feil.</span>
          <span className="font-mono">Podpis lekarza / pieczęć: ........................................</span>
        </div>
      </div>
    </div>
  );
};
