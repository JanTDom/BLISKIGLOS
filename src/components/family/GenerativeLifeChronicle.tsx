"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Volume2, 
  Printer, 
  Download, 
  Sparkles, 
  Heart, 
  Calendar, 
  Feather, 
  Share2, 
  ArrowRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { voiceEngine } from "@/lib/voice-engine";

interface ChronicleChapter {
  id: string;
  era: string;
  title: string;
  dateExtracted: string;
  content: string;
  sensoryAnchors: string[];
  quote: string;
}

const DEFAULT_CHAPTERS: ChronicleChapter[] = [
  {
    id: "ch_1",
    era: "1948–1958 • Dzieciństwo i Dom Rodzinny",
    title: "Rozdział I: Zapach jabłek z sadu w Grójcu i piec kaflowy",
    dateExtracted: "Ocalono w rozmowie: 14 września",
    content: "Pamiętam stary piec kaflowy w kuchni, który w zimowe poranki trzeszczał ciepłem jeszcze przed wschodem słońca. Mama wstawała pierwsza, parzyła zbożową kawę i kroiła chleb z masłem od sąsiadki. Zimą na szybach były lodowe kwiaty, których dzisiaj już w oknach nie widać. Ogród za domem pachniał malwami i mokrą ziemią po sierpniowej burzy.",
    sensoryAnchors: ["zapach jabłek", "skrzypiąca podłoga", "lodowe kwiaty na szybie"],
    quote: "„Najpiękniejsze było to, że nikt się wtedy nigdzie nie spieszył. Czas płynął wolno jak mleko nalewane z kanki.”",
  },
  {
    id: "ch_2",
    era: "1962–1970 • Młodość, Studia i Pierwsza Praca",
    title: "Rozdział II: Pierwsza wypłata, adapter Bambino i dancingi w Krynicy",
    dateExtracted: "Ocalono w rozmowie: 22 września",
    content: "Kiedy dostałam pierwszą pensję w biurze projektowym, poszłam prosto do sklepu muzycznego i kupiłam płytę Ireny Santor oraz jedwabną apaszkę w grochy. Wieczorami słuchaliśmy audycji z Radia Luxembourg na falach krótkich, a w wakacje 1968 roku pojechaliśmy pociągiem z drewnianymi ławkami do Krynicy Morskiej. Namioty rozstawialiśmy wprost na piasku w lesie sosnowym.",
    sensoryAnchors: ["adapter Bambino", "płyta winylowa", "szum sosen na Mierzei"],
    quote: "„W tamtych latach człowiek miał w kieszeni tylko parę groszy, ale w sercu tyle odwagi, jakby cały świat należał do nas.”",
  },
  {
    id: "ch_3",
    era: "1972–1985 • Rodzina i Budowanie Domu",
    title: "Rozdział III: Narodziny dzieci i niedzielne obiady z rosołem",
    dateExtracted: "Ocalono w rozmowie: 3 października",
    content: "Gdy urodziła się Ania, za oknem prószył pierwszy śnieg. Pamiętam, jak mąż przyniósł pod okno szpitala bukiet goździków owinięty w gazetę, żeby nie zmarzły na mrozie. W każdą niedzielę na stole leżał biały obrus z lnu, a zapach rosołu z lubczykiem i domowego makaronu zbierał całą rodzinę przy jednym stole. Te chwile były najcenniejsze.",
    sensoryAnchors: ["zapach rosołu z lubczykiem", "biały obrus lniany", "bukiet goździków"],
    quote: "„Wspólny stół to było serce naszego domu. Choćby za oknem działo się cokolwiek, przy stole był spokój i bezpieczeństwo.”",
  },
];

export const GenerativeLifeChronicle: React.FC = () => {
  const [chapters, setChapters] = useState<ChronicleChapter[]>(DEFAULT_CHAPTERS);
  const [activeAudioChapter, setActiveAudioChapter] = useState<string | null>(null);

  const handlePlayChapter = async (chapter: ChronicleChapter) => {
    if (activeAudioChapter === chapter.id) {
      voiceEngine.stopSpeaking();
      setActiveAudioChapter(null);
      return;
    }

    try {
      await voiceEngine.unlock();
      setActiveAudioChapter(chapter.id);
      const textToSpeak = `${chapter.title}. ${chapter.content} ${chapter.quote}`;
      await voiceEngine.speak(
        textToSpeak,
        () => setActiveAudioChapter(null),
        "krystyna"
      );
    } catch (e) {
      console.error("Błąd odtwarzania rozdziału:", e);
      setActiveAudioChapter(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-8">
      {/* Nagłówek Kroniki */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Terapia Reminiscencyjna dr. Butlera • Dziedzictwo Pokoleniowe</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
            Generatywna Kronika Życia &amp; Audiobook
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl">
            Sztuczna inteligencja w trakcie codziennych rozmów seniora wyłapuje bezcenne opowieści z przeszłości i układa je w pamiątkową księgę życia dla dzieci, wnuków i prawnuków.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Drukuj Kronikę (PDF)</span>
          </button>
        </div>
      </div>

      {/* Okładka / Podgląd Pamiątkowego Tomu */}
      <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-amber-300 shadow-inner flex flex-col md:flex-row items-center gap-8">
        <div className="w-44 h-60 rounded-2xl bg-gradient-to-tr from-[#3D2314] to-[#734324] text-amber-100 p-5 shadow-2xl border-4 border-[#8C5831] flex flex-col justify-between shrink-0 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
          <div className="border border-amber-400/40 p-3 h-full flex flex-col justify-between rounded-xl">
            <div>
              <span className="text-[10px] tracking-widest font-sans font-bold uppercase text-amber-300/80 block">
                Kronika Rodzinna
              </span>
              <h4 className="font-serif text-lg font-bold text-amber-100 mt-2 leading-tight">
                Księga Ocalonych Wspomnień
              </h4>
            </div>
            <div className="py-2">
              <Feather className="w-6 h-6 text-amber-400 mx-auto" />
            </div>
            <div>
              <span className="text-xs font-serif italic text-amber-200 block">Maria Kowalska</span>
              <span className="text-[9px] font-sans text-amber-300/60 block mt-0.5">Wydanie Pamiątkowe</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Automatycznie skompilowano 3 rozdziały (46 stron wspomnień)
          </span>
          <h3 className="font-serif text-2xl font-bold text-stone-950">
            Pamiątka, która nie zniknie wraz z upływem czasu
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            Dla osób z demencją wspomnienia z młodości są najsilniejszą kotwicą tożsamości. Kronika pozwala rodzinie zachować te historie w formie książkowej oraz odsłuchać je z ciepłym głosem lektorki.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              Format: Księga A4 + Audio MP3
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
              Walidacja: 100% autentyczne cytaty seniora
            </span>
          </div>
        </div>
      </div>

      {/* Rozdziały Kroniki */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-stone-950">
          Zarejestrowane Rozdziały Życia:
        </h3>

        <div className="space-y-6">
          {chapters.map((ch, idx) => (
            <article 
              key={ch.id}
              className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 hover:border-amber-400 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full self-start">
                  {ch.era}
                </span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {ch.dateExtracted}
                </span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {ch.title}
              </h4>

              <p className="text-stone-700 text-base leading-relaxed font-serif">
                {ch.content}
              </p>

              <blockquote className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-600 font-serif italic text-stone-900 text-sm">
                {ch.quote}
              </blockquote>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-200">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                  <span className="font-semibold text-stone-700">Kotwice zmysłowe:</span>
                  {ch.sensoryAnchors.map((anchor, aIdx) => (
                    <span key={aIdx} className="px-2.5 py-0.5 rounded-lg bg-white border border-stone-200 font-mono text-[11px]">
                      #{anchor}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handlePlayChapter(ch)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                    activeAudioChapter === ch.id
                      ? "bg-amber-600 text-white shadow-md animate-pulse"
                      : "bg-white text-stone-800 border border-stone-300 hover:bg-stone-100"
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{activeAudioChapter === ch.id ? "Zatrzymaj lektora" : "Odsłuchaj rozdział (Głos Pani Krystyny)"}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
