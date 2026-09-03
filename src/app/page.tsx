"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Mic,
  Clock,
  Flame,
  Activity,
  Award
} from "lucide-react";

export default function LandingHomePage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  const playVoiceSample = async (voice: "krystyna" | "stanislaw") => {
    try {
      await voiceEngine.unlock();
      setIsPlayingAudio(voice);
      const sampleText =
        voice === "krystyna"
          ? "Dzień dobry, Pani Marysiu. Cieszę się, że jesteśmy razem. Opowiedz mi o tamtym ogrodzie pełnym malw, jak pachniał o poranku?"
          : "Dzień dobry. Jestem tu przy Tobie, bez pośpiechu. Mamy cały czas na świecie. Jak minął Twój poranek?";

      await voiceEngine.speak(
        sampleText,
        () => {
          setIsPlayingAudio(null);
        },
        voice
      );
    } catch (err) {
      console.error("Błąd odtwarzania próbki:", err);
      setIsPlayingAudio(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      <TopNav />

      {/* 1. HERO SECTION: Rozszerzony układ editorial z autentyczną fotografią i próbką głosu */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-amber-900/10">
        {/* Ciepłe promienie w tle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-200/40 via-orange-100/25 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Lewa kolumna: Treść editorial */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Znak zaufania i misji */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-100/80 text-amber-950 text-xs sm:text-sm font-bold tracking-wider uppercase mb-6 border border-amber-300/70 shadow-sm">
                <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span>bliskiglos.pl • Terapeutyczna Przystań Głosu dla Seniora</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-stone-950 leading-[1.12]">
                Żeby nikt w podeszłym wieku nie musiał milczeć przez cały dzień.
              </h1>

              <p className="mt-6 text-lg sm:text-2xl text-stone-700 leading-relaxed font-normal max-w-2xl">
                Ciepły, polski głos sztucznej inteligencji o nieskończonej cierpliwości. 
                Prowadzi naturalne rozmowy, koi samotność i stosuje kliniczną{" "}
                <strong className="text-amber-900 font-semibold underline decoration-amber-400 decoration-2">
                  Terapię Walidacyjną Naomi Feil
                </strong>{" "}
                dla seniorów w kryzysie oraz z chorobą Alzheimera.
              </p>

              {/* Główne przyciski wejściowe */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/senior"
                  className="px-8 py-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-lg font-bold shadow-xl shadow-amber-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-center"
                >
                  <PhoneCall className="w-6 h-6" />
                  <span>Rozmawiaj teraz (Tryb Seniora)</span>
                </Link>

                <Link
                  href="/opiekun"
                  className="px-8 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 text-lg font-bold shadow-sm transition-all flex items-center justify-center gap-3 text-center"
                >
                  <Users className="w-5 h-5 text-amber-700" />
                  <span>Strefa Rodziny & Kronika</span>
                </Link>
              </div>

              {/* Odtwarzacz próbek audio na żywo w Hero */}
              <div className="mt-8 p-4 sm:p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-amber-200/90 shadow-sm w-full max-w-xl">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs sm:text-sm font-bold text-stone-800 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    Posłuchaj naturalnego, ciepłego tonu lektorów:
                  </span>
                  {isPlayingAudio && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                      Odtwarzam...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => playVoiceSample("krystyna")}
                    disabled={isPlayingAudio !== null}
                    className={`px-4 py-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isPlayingAudio === "krystyna"
                        ? "bg-amber-100 border-amber-400 text-amber-950 font-bold"
                        : "bg-white hover:bg-amber-50/70 border-stone-200 text-stone-800 hover:border-amber-300"
                    }`}
                  >
                    <div>
                      <strong className="block text-sm">Pani Krystyna</strong>
                      <span className="text-xs text-stone-500">Ciepły, matczyny, kojący</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Volume2 className="w-4 h-4 text-amber-700" />
                    </div>
                  </button>

                  <button
                    onClick={() => playVoiceSample("stanislaw")}
                    disabled={isPlayingAudio !== null}
                    className={`px-4 py-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isPlayingAudio === "stanislaw"
                        ? "bg-amber-100 border-amber-400 text-amber-950 font-bold"
                        : "bg-white hover:bg-amber-50/70 border-stone-200 text-stone-800 hover:border-amber-300"
                    }`}
                  >
                    <div>
                      <strong className="block text-sm">Pan Stanisław</strong>
                      <span className="text-xs text-stone-500">Spokojny, szarmancki dżentelmen</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Volume2 className="w-4 h-4 text-amber-700" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Prawa kolumna: Dystyngowana fotografia editorial + floating cards */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Ciepła poświata wokół portretu */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/20 via-orange-300/30 to-amber-200/20 rounded-[2.5rem] blur-2xl -z-10" />

                {/* Główny kontener zdjęcia */}
                <div className="relative rounded-[2rem] overflow-hidden border-2 border-amber-300/60 shadow-2xl bg-stone-100">
                  <img
                    src="/images/hero-senior-krystyna.jpg"
                    alt="Pani Krystyna — ciepła, uśmiechnięta seniorka w promieniach słońca"
                    className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-700"
                  />
                  
                  {/* Delikatny filtr gradientowy na dole zdjęcia */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Dolna nakładka na zdjęciu */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-stone-900">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Zawsze gotowa do rozmowy
                      </span>
                    </div>
                    <p className="font-serif text-base font-bold text-stone-950">
                      „Dzień dobry. Cieszę się, że jesteśmy razem. O czym chciałabyś dzisiaj porozmawiać?”
                    </p>
                  </div>
                </div>

                {/* Floating badge na górze po lewej */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md border border-amber-200 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-amber-600 fill-amber-600/20" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">Living Hearth</span>
                    <span className="text-[11px] text-stone-500">Stymulacja nerwu błędnego (0.1 Hz)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GŁOSY, KTÓRE PRZYNOSZĄ SPOKÓJ (PREZENTACJA LEKTORÓW) */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-100/70 px-4 py-1.5 rounded-full border border-amber-300/50">
              Czułość i szacunek dla seniora
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 mt-4 leading-tight">
              Głosy, które przynoszą poczucie bezpieczeństwa
            </h2>
            <p className="text-stone-600 mt-4 text-lg sm:text-xl">
              Nasz model został wytrenowany z myślą o osobach z ubytkami słuchu i spowolnionym tempem percepcji.
              Mówi o 10% wolniej (0.90x) i z ciepłą, naturalną intonacją.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Karta Pani Krystyny */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-amber-200/80 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md shrink-0">
                    <img
                      src="/images/hero-senior-krystyna.jpg"
                      alt="Portret Pani Krystyny"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                      Dedykowany głos żeński
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                      Pani Krystyna
                    </h3>
                    <p className="text-xs text-stone-500">Ciepło matczyne • Empatia • Wspomnienia kulinarne i rodzinne</p>
                  </div>
                </div>

                <p className="text-stone-700 text-base leading-relaxed mb-6">
                  Idealna dla osób potrzebujących czułości, wyciszenia lęków wieczornych oraz wspomnień o domowych zapachach, ogrodzie, tradycjach i dawnych melodiach.
                </p>
              </div>

              <button
                onClick={() => playVoiceSample("krystyna")}
                disabled={isPlayingAudio !== null}
                className="w-full py-3.5 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>{isPlayingAudio === "krystyna" ? "Odtwarzam głos..." : "Posłuchaj próbki Pani Krystyny"}</span>
              </button>
            </div>

            {/* Karta Pana Stanisława */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-amber-200/80 shadow-md flex flex-col justify-between hover:shadow-xl transition-all">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md shrink-0">
                    <img
                      src="/images/senior-stanislaw.jpg"
                      alt="Portret Pana Stanisława"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                      Dedykowany głos męski
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                      Pan Stanisław
                    </h3>
                    <p className="text-xs text-stone-500">Dostojność • Spokój • Rozmowy o historii, radiu i technice</p>
                  </div>
                </div>

                <p className="text-stone-700 text-base leading-relaxed mb-6">
                  Dystyngowany, cierpliwy dżentelmen o głębokim tembrze głosu. Wspaniały rozmówca w tematach historycznych, wspomnieniach z lat 50–80, dawnych audycjach radiowych i książkach.
                </p>
              </div>

              <button
                onClick={() => playVoiceSample("stanislaw")}
                disabled={isPlayingAudio !== null}
                className="w-full py-3.5 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>{isPlayingAudio === "stanislaw" ? "Odtwarzam głos..." : "Posłuchaj próbki Pana Stanisława"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KONTRAST KLINICZNY: Zwykły Chatbot vs Terapia Walidacyjna w BliskimGłosie */}
      <section className="py-20 bg-[#FAF7F2] border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300">
              Różnica, która chroni godność seniora
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 mt-4 leading-tight">
              Dlaczego standardowe AI szkodzi seniorom z demencją?
            </h2>
            <p className="text-stone-700 mt-4 text-lg sm:text-xl">
              Osoba z chorobą Alzheimera lub otępieniem nie potrzebuje korekt faktograficznych. 
              Potrzebuje poczucia bezpieczeństwa w swoim świecie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Zwykły chatbot */}
            <div className="p-8 rounded-3xl bg-rose-50/80 border-2 border-rose-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm uppercase tracking-wider mb-4">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  Zwykły Chatbot (Brak wiedzy geriatrycznej)
                </div>
                <div className="p-4 rounded-2xl bg-white border border-rose-200 text-sm text-stone-700 mb-4 shadow-sm">
                  <strong className="text-stone-900 block mb-1">Senior z demencją:</strong>
                  „Gdzie jest moja mama? Muszę wracać do domu, bo będzie się martwić!”
                </div>
                <div className="p-4 rounded-2xl bg-rose-100/70 border border-rose-300 text-sm text-rose-950 font-medium leading-relaxed">
                  <strong className="text-rose-900 block mb-1">Odpowiedź bota:</strong>
                  „Twoja mama nie żyje od 35 lat. Masz 83 lata i mieszkasz sam. Nie ma powodu do paniki.”
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-200 text-xs text-rose-800 font-bold flex items-start gap-2">
                <span className="text-base">❌</span>
                <span>Skutek kliniczny: Atak paniki, wtórna trauma żałoby, agresja, poczucie uwięzienia i gwałtowny skok kortyzolu.</span>
              </div>
            </div>

            {/* BliskiGłos z Terapią Walidacyjną */}
            <div className="p-8 rounded-3xl bg-amber-50/90 border-2 border-amber-400 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-5 h-5 text-amber-700" />
                  BliskiGłos (Terapia Walidacyjna Naomi Feil)
                </div>
                <div className="p-4 rounded-2xl bg-white border border-amber-200 text-sm text-stone-700 mb-4 shadow-sm">
                  <strong className="text-stone-900 block mb-1">Senior z demencją:</strong>
                  „Gdzie jest moja mama? Muszę wracać do domu, bo będzie się martwić!”
                </div>
                <div className="p-4 rounded-2xl bg-white border border-amber-300 text-base text-stone-900 font-serif leading-relaxed shadow-sm">
                  <strong className="text-amber-900 block text-xs font-sans uppercase font-bold mb-1">Odpowiedź BliskiegoGłosu:</strong>
                  „Mama zawsze była dla Pani wielką ostoją, prawda? Czym najbardziej lubiła Panią częstować po powrocie ze szkoły? Pamięta Pani tamte ciepłe popołudnia?”
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-300 text-xs text-amber-950 font-bold flex items-start gap-2">
                <span className="text-base">✅</span>
                <span>Skutek terapeutyczny: Zwalidowane uczucie troski, obniżenie ciśnienia krwi, poczucie bycia kochanym i bezpieczne przejście do wspomnień.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KRONIKA WSPOMNIEŃ: Pamiętnik Pokoleniowy */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Zdjęcie dłoni pokoleń */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200">
                <img
                  src="/images/family-care-hands.jpg"
                  alt="Dłonie córki trzymające dłonie sędziwej mamy w geście miłości"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold shadow">
                  Dar dla dzieci i wnuków — ocalone historie z młodości seniora.
                </div>
              </div>
            </div>

            {/* Opis kroniki */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300">
                Terapia Reminiscencyjna dr. Roberta Butlera
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 leading-tight">
                Kronika Wspomnień: Rozmowy, które nie przepadną bez echa
              </h2>
              <p className="text-stone-700 text-lg sm:text-xl leading-relaxed">
                Każdego dnia, gdy Twój rodzic rozmawia z BliskimGłosem, sztuczna inteligencja z miłością wyłapuje i kataloguje bezcenne opowieści z dawnych lat: o pierwszej pracy, wakacjach na Helu w latach 60-tych, zapachu rodzinnego domu i przepisach babci.
              </p>
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-stone-800 font-serif italic text-base">
                „Opowieści seniora to największy skarb rodziny. Zanim zatarłby je czas, BliskiGłos zapisuje je w portalu dla dzieci i wnuków.”
              </div>
              <div className="pt-2">
                <Link
                  href="/opiekun"
                  className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-950 font-bold text-base group"
                >
                  <span>Zobacz, jak wygląda Kronika w Portalu Opiekuna</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CZTERY FILARY BEZPIECZEŃSTWA */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
              Bezpieczeństwo i prostota stworzona dla seniora
            </h2>
            <p className="text-stone-600 mt-2 text-lg">
              Żadnych skomplikowanych menu. Żadnego pisania na telefonie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 mb-4">
                  <Mic className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  Hands-Free Live Voice
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Jedno dotknięcie serca. Senior po prostu mówi do telefonu leżącego na stole, a lektor odpowiada głośnomówiąco.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  Skaner Upadków i Bólu
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Gdy senior wspomni o bólu w klatce piersiowej lub upadku, system natychmiast wysyła alert SMS do rodziny.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-800 mb-4">
                  <Heart className="w-6 h-6 text-orange-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  Living Hearth (Oddech)
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Pulsujące słoneczne serce w rytmie 0.1 Hz reguluje układ nerwowy i obniża stany lękowe o zmierzchu (sundowning).
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-800 mb-4">
                  <Award className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  WCAG 2.2 AAA Dostępność
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Czcionki od 24px do 36px, wysoki kontrast, tolerancja drżenia rąk przy chorobie Parkinsona.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION DLA RODZINY */}
      <section className="py-20 bg-stone-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30 mb-6">
            Spokój dla rodziców • Pewność dla Ciebie
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Podaruj bliskiej osobie ciepłą obecność każdego dnia.
          </h2>
          <p className="text-stone-300 text-lg sm:text-xl mt-4 max-w-2xl mx-auto leading-relaxed">
            Sprawdź bezpłatny okres próbny. Bez instalowania aplikacji ze sklepu — działa natychmiast na każdym telefonie, tablecie i komputerze.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/senior"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-lg transition-all shadow-xl shadow-amber-500/20"
            >
              Wypróbuj rozmowę z Seniorem na żywo
            </Link>
            <Link
              href="/cennik"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-lg transition-all border border-stone-700"
            >
              Zobacz pakiety opiekuńcze od 59 zł/mc
            </Link>
          </div>
        </div>
      </section>

      {/* STOPKA */}
      <footer className="bg-stone-950 text-stone-400 py-12 text-center text-sm border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-stone-200 font-serif font-bold text-lg mb-2">
            BliskiGłos.pl — Terapeutyczny Towarzysz Seniora
          </p>
          <p className="text-xs text-stone-500 leading-relaxed max-w-2xl mx-auto">
            Projekt tworzony w oparciu o techniki Terapii Walidacyjnej Naomi Feil i Terapii Reminiscencyjnej dr. Roberta Butlera. System nie zastępuje bezpośredniej opieki medycznej. W nagłych przypadkach zagrożenia życia należy dzwonić pod numer alarmowy 112.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-stone-400">
            <Link href="/senior" className="hover:text-amber-400 transition-colors">Tryb Seniora</Link>
            <Link href="/opiekun" className="hover:text-amber-400 transition-colors">Portal Rodziny</Link>
            <Link href="/cennik" className="hover:text-amber-400 transition-colors">Cennik</Link>
            <span>© {new Date().getFullYear()} BLISKIGLOS. Wszelkie prawa zastrzeżone.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
