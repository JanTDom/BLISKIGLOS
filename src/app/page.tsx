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
  Award,
  Brain,
  FileText,
  Share2
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

              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-stone-950 leading-[1.12] [text-wrap:balance]">
                Żeby nikt w&nbsp;podeszłym wieku nie musiał milczeć przez&nbsp;cały dzień.
              </h1>

              <p className="mt-6 text-lg sm:text-2xl text-stone-700 leading-relaxed font-normal max-w-2xl [text-wrap:balance]">
                Ciepły, polski głos sztucznej inteligencji o&nbsp;nieskończonej cierpliwości. 
                Prowadzi naturalne rozmowy, koi samotność i&nbsp;stosuje kliniczną{" "}
                <strong className="text-amber-900 font-semibold underline decoration-amber-400 decoration-2">
                  Terapię Walidacyjną Naomi Feil
                </strong>{" "}
                dla&nbsp;seniorów w&nbsp;kryzysie oraz z&nbsp;chorobą Alzheimera.
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
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 mt-4 leading-tight [text-wrap:balance]">
              Głosy, które przynoszą<br className="hidden sm:inline" /> poczucie bezpieczeństwa
            </h2>
            <p className="text-stone-600 mt-4 text-lg sm:text-xl [text-wrap:balance] max-w-2xl mx-auto">
              Nasz model został wytrenowany z&nbsp;myślą o&nbsp;osobach z&nbsp;ubytkami słuchu i&nbsp;spowolnionym tempem percepcji.
              Mówi o&nbsp;10% wolniej (0.90x) i&nbsp;z&nbsp;ciepłą, naturalną intonacją.
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
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 mt-4 leading-tight [text-wrap:balance]">
              Dlaczego standardowe AI<br className="hidden sm:inline" /> szkodzi seniorom z&nbsp;demencją?
            </h2>
            <p className="text-stone-700 mt-4 text-lg sm:text-xl [text-wrap:balance] max-w-2xl mx-auto">
              Osoba z&nbsp;chorobą Alzheimera lub otępieniem nie potrzebuje korekt faktograficznych. 
              Potrzebuje poczucia bezpieczeństwa w&nbsp;swoim świecie.
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
            {/* Zdjęcie dłoni pokoleń — interaktywny link do Kroniki */}
            <div className="lg:col-span-5">
              <Link
                href="/opiekun?tab=memories"
                className="group block relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200 hover:border-amber-400 transition-all transform hover:-translate-y-1"
              >
                <img
                  src="/images/family-care-hands.jpg"
                  alt="Dłonie córki trzymające dłonie sędziwej mamy w geście miłości"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md text-stone-900 text-xs font-semibold shadow-lg flex items-center justify-between">
                  <span>Dar dla dzieci i&nbsp;wnuków — Kronika</span>
                  <span className="text-amber-800 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Otwórz <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>

            {/* Opis kroniki */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300">
                Terapia Reminiscencyjna dr.&nbsp;Roberta Butlera
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 leading-tight [text-wrap:balance]">
                Kronika Wspomnień:<br className="hidden sm:inline" /> rozmowy, które nie przepadną bez&nbsp;echa
              </h2>
              <p className="text-stone-700 text-lg sm:text-xl leading-relaxed [text-wrap:balance]">
                Każdego dnia, gdy Twój rodzic rozmawia z&nbsp;BliskimGłosem, sztuczna inteligencja z&nbsp;miłością wyłapuje i&nbsp;kataloguje bezcenne opowieści z&nbsp;dawnych lat: o&nbsp;pierwszej pracy, wakacjach na&nbsp;Helu w&nbsp;latach 60-tych, zapachu rodzinnego domu i&nbsp;przepisach babci.
              </p>
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-stone-800 font-serif italic text-base">
                „Opowieści seniora to największy skarb rodziny. Zanim zatarłby je czas, BliskiGłos zapisuje je w&nbsp;portalu dla&nbsp;dzieci i&nbsp;wnuków.”
              </div>
              <div className="pt-2">
                <Link
                  href="/opiekun?tab=memories"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-base group transition-all"
                >
                  <span>Otwórz Kronikę Wspomnień w&nbsp;Portalu Opiekuna</span>
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 [text-wrap:balance] leading-tight">
              Bezpieczeństwo i&nbsp;prostota<br className="hidden sm:inline" /> stworzone dla&nbsp;seniora
            </h2>
            <p className="text-stone-600 mt-3 text-lg sm:text-xl [text-wrap:balance]">
              Żadnych skomplikowanych menu. Żadnego pisania na&nbsp;telefonie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Hands-Free Live Voice */}
            <Link
              href="/senior"
              className="group p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center text-amber-800 mb-4 transition-colors">
                  <Mic className="w-6 h-6 text-amber-700" />
                </div>
                <div className="min-h-[3.25rem] flex items-center mb-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors">
                    Hands-Free Live Voice
                  </h3>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Jedno dotknięcie serca. Senior po&nbsp;prostu mówi do&nbsp;telefonu leżącego na&nbsp;stole, a&nbsp;lektor odpowiada głośnomówiąco.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-900">
                <span>Wypróbuj w&nbsp;Trybie Seniora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. Skaner Upadków i Bólu */}
            <Link
              href="/opiekun?tab=telecare"
              className="group p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-emerald-400/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center text-emerald-800 mb-4 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="min-h-[3.25rem] flex items-center mb-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    Skaner Upadków i&nbsp;Bólu
                  </h3>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Gdy senior wspomni o&nbsp;bólu w&nbsp;klatce piersiowej lub upadku, system natychmiast wysyła alert SMS do&nbsp;rodziny.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
                <span>Zobacz Konektor Teleopieki</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. Living Hearth */}
            <Link
              href="/senior"
              className="group p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-orange-400/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center text-orange-800 mb-4 transition-colors">
                  <Heart className="w-6 h-6 text-orange-700" />
                </div>
                <div className="min-h-[3.25rem] flex items-center mb-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug group-hover:text-orange-800 transition-colors">
                    Living Hearth (Oddech)
                  </h3>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Pulsujące słoneczne serce w&nbsp;rytmie 0.1&nbsp;Hz reguluje układ nerwowy i&nbsp;obniża stany lękowe o&nbsp;zmierzchu (sundowning).
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-orange-700 group-hover:text-orange-900">
                <span>Zobacz Living Hearth</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 4. WCAG 2.2 AAA Dostępność */}
            <Link
              href="/senior"
              className="group p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:border-purple-400/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center text-purple-800 mb-4 transition-colors">
                  <Award className="w-6 h-6 text-purple-700" />
                </div>
                <div className="min-h-[3.25rem] flex items-center mb-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug group-hover:text-purple-800 transition-colors">
                    Dostępność WCAG&nbsp;2.2&nbsp;AAA
                  </h3>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Czcionki od&nbsp;24px do&nbsp;36px, wysoki kontrast, pełna tolerancja drżenia rąk przy chorobie Parkinsona.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-900">
                <span>Sprawdź w&nbsp;Trybie Seniora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PIONIERSKIE INNOWACJE B+R I STANDARD KLINICZNY (NCBR, FERS, PFRON) */}
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/40 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Standard Badań i&nbsp;Rozwoju (B+R) • Innowacje Społeczne
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight [text-wrap:balance]">
              Pionierskie technologie<br className="hidden sm:inline" /> w&nbsp;służbie godności seniora
            </h2>
            <p className="text-stone-300 mt-4 text-lg sm:text-xl leading-relaxed [text-wrap:balance] max-w-2xl mx-auto">
              BliskiGłos łączy najnowsze odkrycia psychogeriatrii z&nbsp;przetwarzaniem mowy w&nbsp;czasie rzeczywistym. Narzędzia stworzone dla&nbsp;rodzin, geriatrów i&nbsp;instytucji opiekuńczych.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Konstelacja Wspomnień */}
            <Link
              href="/opiekun?tab=constellation"
              className="group p-7 rounded-3xl bg-stone-800/90 border border-stone-700/90 hover:border-amber-400/90 hover:bg-stone-800 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 group-hover:bg-amber-500/30 flex items-center justify-center text-amber-400 mb-4 transition-colors">
                  <Share2 className="w-6 h-6" />
                </div>
                <div className="min-h-[3.25rem] flex items-center mb-2">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    Konstelacja Wspomnień
                  </h3>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-4">
                  Dynamiczny graf wiedzy łączący wspomnienia, bliskich, ukochane miejsca i&nbsp;kotwice zmysłowe (np. zapach szarlotki z&nbsp;1968&nbsp;r.). AI automatycznie odnajduje powiązania między rozmowami.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-700/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Otwórz interaktywną Konstelację</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. Kliniczny Raport Neuro-Brief & CVI */}
            <Link
              href="/opiekun?tab=clinical"
              className="group p-7 rounded-3xl bg-stone-800/90 border border-stone-700/90 hover:border-emerald-400/90 hover:bg-stone-800 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 group-hover:bg-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-h-[3.25rem] flex items-center mb-2">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    Kliniczny Neuro-Brief &amp;&nbsp;CVI
                  </h3>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-4">
                  Wskaźnik Witalności Poznawczej (CVI) oparty o&nbsp;akustyczne biomarkery mowy (pauzy hesitated, fluktuacje tonu F0) oraz stosunek rzeczowników do&nbsp;zaimków. Gotowy wydruk PDF na&nbsp;wizytę u&nbsp;neurologa.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-700/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> Generuj Raport CVI dla Lekarza</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. Bezpieczna Kotwica Głosu Bliskiej Osoby */}
            <Link
              href="/opiekun?tab=voice_cloner"
              className="group p-7 rounded-3xl bg-stone-800/90 border border-stone-700/90 hover:border-indigo-400/90 hover:bg-stone-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 group-hover:bg-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 transition-colors">
                  <Mic className="w-6 h-6" />
                </div>
                <div className="min-h-[3.25rem] flex items-center mb-2">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    Bezpieczna Kotwica Głosu
                  </h3>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-4">
                  Możliwość syntezy głosu córki lub syna z&nbsp;rygorystycznym filtrem bioetycznym Naomi Feil — AI nigdy nie imituje nieobecnego bliskiego w&nbsp;sposób wprowadzający w&nbsp;błąd, lecz przynosi kojące wsparcie.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-700/80 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                <span className="flex items-center gap-1.5"><Mic className="w-4 h-4" /> Przetestuj Głos Córki Ani</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Dolny pasek teleopieki i tarczy sundowning */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/senior?sundowning=1"
              className="group p-6 rounded-3xl bg-stone-800/70 hover:bg-stone-800 border border-stone-700/60 hover:border-orange-400/80 transition-all flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-2xl bg-orange-500/20 group-hover:bg-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 transition-colors">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base group-hover:text-orange-300 transition-colors">
                  Tarcza Zmierzchowa 1800K
                </h4>
                <p className="text-stone-300 text-xs mt-1 leading-relaxed">
                  Automatyczny tryb ciepłego bursztynowego spektrum światła, redukujący niepokój wieczorny i&nbsp;zaburzenia rytmu dobowego (Sundowning Syndrome).
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:text-orange-300">
                  Włącz Tryb Bursztynowy 1800K w&nbsp;Trybie Seniora
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            <Link
              href="/opiekun?tab=telecare"
              className="group p-6 rounded-3xl bg-stone-800/70 hover:bg-stone-800 border border-stone-700/60 hover:border-sky-400/80 transition-all flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-2xl bg-sky-500/20 group-hover:bg-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 transition-colors">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">
                  Konektor Teleopieki B2G / PZU
                </h4>
                <p className="text-stone-300 text-xs mt-1 leading-relaxed">
                  Integracja z&nbsp;centrami teleopieki gminnej i&nbsp;ubezpieczycieli. Szybka dyspozycja pomocy w&nbsp;sytuacjach nagłych z&nbsp;pełną anonimizacją danych medycznych (PII Scrubber).
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 group-hover:text-sky-300">
                  Otwórz pulpit dyspozytorski teleopieki
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION DLA RODZINY */}
      <section className="py-20 bg-stone-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30 mb-6">
            Spokój dla rodziców • Pewność dla Ciebie
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight [text-wrap:balance]">
            Podaruj bliskiej osobie<br className="hidden sm:inline" /> ciepłą obecność każdego dnia.
          </h2>
          <p className="text-stone-300 text-lg sm:text-xl mt-4 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
            Rozwiązanie bezpłatne w&nbsp;ramach pilotażu innowacji społecznych. Bez&nbsp;instalowania aplikacji — działa natychmiast na&nbsp;każdym telefonie, tablecie i&nbsp;komputerze.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/senior"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-lg transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              Włącz rozmowę z Seniorem na żywo
            </Link>
            <Link
              href="/opiekun"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-lg transition-all border border-stone-700"
            >
              Otwórz Portal Opiekuna i Rodziny
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
            <span>© {new Date().getFullYear()} BLISKIGLOS. Wszelkie prawa zastrzeżone.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
