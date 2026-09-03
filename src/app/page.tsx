"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/navigation/TopNav";
import { voiceEngine } from "@/lib/voice-engine";
import { 
  Heart, 
  PhoneCall, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Sun,
  ShieldAlert
} from "lucide-react";

export default function LandingHomePage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  const playVoiceSample = async (voice: "krystyna" | "stanislaw") => {
    await voiceEngine.unlock();
    setIsPlayingAudio(voice);
    const sampleText = voice === "krystyna"
      ? "Dzień dobry, Pani Marysiu. Cieszę się, że jesteśmy razem. Opowiedz mi o tamtym ogrodzie pełnym malw, jak pachniał o poranku?"
      : "Dzień dobry. Jestem tu przy Tobie, bez pośpiechu. Mamy cały czas na świecie. Jak minął Twój poranek?";
    
    await voiceEngine.speak(sampleText, () => {
      setIsPlayingAudio(null);
    }, voice);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      <TopNav />

      {/* 1. HERO SECTION: Poruszający, czuły, bez szablonowości AI */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-amber-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Oznaczenie domeny i misji */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs font-bold uppercase tracking-widest mb-6 border border-amber-200">
              <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
              bliskiglos.pl • Terapeutyczny Towarzysz Seniora
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-stone-950 leading-[1.15]">
              Żeby nikt w podeszłym wieku nie musiał milczeć przez cały dzień.
            </h1>

            <p className="mt-6 text-lg sm:text-2xl text-stone-700 leading-relaxed font-normal">
              Ciepły, polski głos sztucznej inteligencji o nieskończonej cierpliwości. 
              Prowadzi naturalne rozmowy, koi samotność i stosuje kliniczną{" "}
              <strong className="text-amber-900 font-semibold underline decoration-amber-400 decoration-2">
                Terapię Walidacyjną Naomi Feil
              </strong>{" "}
              dla seniorów w kryzysie oraz z demencją.
            </p>

            {/* Dwa główne wejścia */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/senior"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-lg font-bold shadow-xl shadow-amber-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <PhoneCall className="w-6 h-6" />
                <span>Rozmawiaj teraz (Tryb Seniora)</span>
              </Link>

              <Link
                href="/opiekun"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 text-lg font-bold shadow-sm transition-all flex items-center justify-center gap-3"
              >
                <Users className="w-5 h-5 text-amber-700" />
                <span>Strefa dla Rodziny & Cennik</span>
              </Link>
            </div>

            {/* Odsłuchaj próbki głosu na żywo */}
            <div className="mt-10 p-5 rounded-3xl bg-white/70 backdrop-blur-md border border-amber-200/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-bold text-stone-700">
                Posłuchaj, jak ciepło mówi nasz agent:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playVoiceSample("krystyna")}
                  disabled={isPlayingAudio !== null}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  {isPlayingAudio === "krystyna" ? "Odtwarzam..." : "Głos: Pani Krystyna"}
                </button>
                <button
                  onClick={() => playVoiceSample("stanislaw")}
                  disabled={isPlayingAudio !== null}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  {isPlayingAudio === "stanislaw" ? "Odtwarzam..." : "Głos: Pan Stanisław"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KONTRAST KLINICZNY: Zwykły Chatbot vs Terapia Walidacyjna w BliskimGłosie */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
              Różnica, która chroni godność seniora
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 mt-3">
              Dlaczego standardowe AI szkodzi seniorom z demencją?
            </h2>
            <p className="text-stone-600 mt-3 text-lg">
              Osoba z zaburzeniami pamięci nie potrzebuje korekt faktograficznych. Potrzebuje poczucia bezpieczeństwa w swoim świecie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Zwykły chatbot */}
            <div className="p-8 rounded-3xl bg-rose-50/70 border border-rose-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider mb-4">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  Zwykły Chatbot (Brak wiedzy geriatrycznej)
                </div>
                <div className="p-4 rounded-2xl bg-white border border-rose-200 text-sm text-stone-700 mb-4">
                  <strong className="text-stone-900 block mb-1">Senior z demencją:</strong>
                  „Gdzie jest moja mama? Muszę wracać do domu, bo będzie się martwić!”
                </div>
                <div className="p-4 rounded-2xl bg-rose-100/60 border border-rose-300 text-sm text-rose-950 font-medium">
                  <strong className="text-rose-900 block mb-1">Odpowiedź bota:</strong>
                  „Twoja mama nie żyje od 35 lat. Masz 83 lata i jesteś w domu opieki. Nie ma powodu do paniki.”
                </div>
              </div>
              <p className="text-xs text-rose-700 font-semibold mt-4">
                ❌ Skutek: Atak paniki, powrót traumy żałoby, agresja, poczucie uwięzienia i lęk.
              </p>
            </div>

            {/* BliskiGłos z Terapią Walidacyjną */}
            <div className="p-8 rounded-3xl bg-amber-50/70 border-2 border-amber-400 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-5 h-5 text-amber-700" />
                  BliskiGłos (Terapia Walidacyjna Naomi Feil)
                </div>
                <div className="p-4 rounded-2xl bg-white border border-amber-200 text-sm text-stone-700 mb-4">
                  <strong className="text-stone-900 block mb-1">Senior z demencją:</strong>
                  „Gdzie jest moja mama? Muszę wracać do domu, bo będzie się martwić!”
                </div>
                <div className="p-4 rounded-2xl bg-white border border-amber-300 text-base text-stone-900 font-serif leading-relaxed">
                  <strong className="text-amber-900 block text-xs font-sans uppercase font-bold mb-1">Odpowiedź BliskiegoGłosu:</strong>
                  „Mama była dla Pani wielką ostoją, prawda? Czym najbardziej lubiła Panią częstować po powrocie ze szkoły? Pamięta Pani tamte ciepłe popołudnia?”
                </div>
              </div>
              <p className="text-xs text-amber-900 font-bold mt-4">
                ✅ Skutek: Zwalidowana emocja troski, obniżenie kortyzolu, bezpieczne przejście do ciepłych wspomnień.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRZY FILARY PRODUKTU */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 mb-6 font-bold">
                <PhoneCall className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Hands-Free Live Voice
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Senior nie musi pisać, szukać okularów ani dotykać małych literek. Jedno dotknięcie uruchamia głośnomówiącą, ciepłą rozmowę w tempie dopasowanym do osoby starszej.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-800 mb-6 font-bold">
                <BookOpen className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Kronika Wspomnień
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Agent wyłapuje i spisuje opowieści seniora z młodości — o pierwszej miłości, pracy, dzieciństwie. Rodzina otrzymuje dostęp do żywej kroniki rodowej.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-800 mb-6 font-bold">
                <ShieldCheck className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Bezpieczeństwo Rodziny
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Dzieci otrzymują raporty o nastroju rodzica, liczbie minut rozmowy oraz natychmiastowe alerty, gdy senior zgłosi ból fizyczny lub upadek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION DLA RODZINY */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Podaruj rodzicom bliski głos już dziś.
          </h2>
          <p className="text-stone-300 text-lg mt-3 max-w-2xl mx-auto">
            Sprawdź bezpłatny okres próbny. Spokojna obecność dla seniora, bezcenny spokój ducha dla Ciebie.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cennik"
              className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base transition-all shadow-lg"
            >
              Zobacz pakiety opiekuńcze od 59 zł/mc
            </Link>
            <Link
              href="/senior"
              className="px-8 py-4 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-base transition-all border border-stone-700"
            >
              Wypróbuj rozmowę jako Senior
            </Link>
          </div>
        </div>
      </section>

      {/* STOPKA */}
      <footer className="bg-stone-950 text-stone-400 py-10 text-center text-sm border-t border-stone-800">
        <p className="text-stone-300 font-serif font-bold text-base mb-1">
          BliskiGłos.pl — Terapeutyczny Towarzysz Seniora
        </p>
        <p className="text-xs text-stone-500 max-w-xl mx-auto">
          Projekt stworzony w oparciu o techniki Terapii Walidacyjnej Naomi Feil i Terapii Reminiscencyjnej. Nie zastępuje bezpośredniej opieki medycznej. W razie zagrożenia życia dzwoń pod 112.
        </p>
      </footer>
    </div>
  );
}
