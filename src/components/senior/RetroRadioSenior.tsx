"use client";

import React, { useState, useEffect } from "react";
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Power, 
  Sparkles, 
  Heart, 
  Info,
  Disc,
  Clock,
  Sun
} from "lucide-react";
import { voiceEngine } from "@/lib/voice-engine";

interface RetroRadioSeniorProps {
  isSpeaking: boolean;
  isListening: boolean;
  onTogglePower: () => void;
  isPowerOn: boolean;
  companionName?: string;
}

export const RetroRadioSenior: React.FC<RetroRadioSeniorProps> = ({
  isSpeaking,
  isListening,
  onTogglePower,
  isPowerOn,
  companionName = "Pani Krystyna",
}) => {
  const [selectedStation, setSelectedStation] = useState("Warszawa I • 227 kHz");
  const [volumeLevel, setVolumeLevel] = useState(75);

  const stations = [
    { name: "Warszawa I • 227 kHz", note: "Fale Długie • Audycje Spokojne" },
    { name: "Program II • 198 kHz", note: "Klasyka i Wspomnienia" },
    { name: "Polskie Radio • 102.4 MHz", note: "Głos Bliskiej Osoby" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Obudowa retro-radia lampowego (orzech polski, mosiądz) */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#3D2314] via-[#2A160A] to-[#1F0F06] p-6 sm:p-10 border-4 border-[#5E381E] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] text-amber-100 font-serif select-none overflow-hidden">
        {/* Odblask lakieru fortepianowego */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Tabliczka znamionowa retro */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#5E381E]/60">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-amber-400" />
            <span className="text-xs tracking-widest font-sans font-bold uppercase text-amber-300">
              BliskiGłos Radio-Box • Model 1965
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-sans text-amber-200/70 font-semibold">
              Odbiór Lampowy Aktywny
            </span>
          </div>
        </div>

        {/* Podświetlana skala radiowa z falami długimi */}
        <div className="relative rounded-2xl bg-gradient-to-b from-stone-950 to-stone-900 border-2 border-amber-900/60 p-5 shadow-inner mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent pointer-events-none rounded-2xl" />

          {/* Magiczne Oko (Lampa elektronowa 6E5S) wskazująca mowę */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {/* Lampa - zielone magiczne oko */}
              <div className="relative w-10 h-10 rounded-full bg-emerald-950 border-2 border-emerald-600/80 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <div 
                  className={`w-6 h-6 rounded-full bg-emerald-400 transition-all duration-150 ${
                    isSpeaking 
                      ? "scale-125 opacity-100 shadow-[0_0_20px_#34d399]" 
                      : isListening 
                      ? "scale-90 opacity-70 animate-pulse" 
                      : "scale-75 opacity-40"
                  }`} 
                />
                <div className="absolute inset-1 rounded-full border border-emerald-300/40" />
              </div>
              <div>
                <span className="text-[10px] font-sans uppercase font-bold tracking-wider text-amber-400 block">
                  Lampa 6E5S (Wskaźnik Mowy)
                </span>
                <span className="text-xs font-sans text-stone-300">
                  {isSpeaking ? "Głos lektora nadaje..." : isListening ? "Słucham Twoich słów..." : "Gotowe do odbioru"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-amber-400 font-bold block">
                227 kHz • WARSZAWA I
              </span>
              <span className="text-[10px] font-sans text-stone-400">
                Maszt w Konstantynowie
              </span>
            </div>
          </div>

          {/* Podświetlana linijka częstotliwości */}
          <div className="relative py-3 border-y border-amber-500/20 flex items-center justify-between text-xs font-mono text-amber-300/80 tracking-wider">
            <span>150</span>
            <span>180</span>
            <span className="text-amber-400 font-bold text-sm bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
              227 (WARSZAWA I)
            </span>
            <span>260</span>
            <span>300 kHz</span>

            {/* Czerwona pionowa igła strojeniowa */}
            <div className="absolute left-[54%] top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_red]" />
          </div>

          <div className="mt-3 text-center">
            <p className="text-amber-200 text-sm font-sans font-medium">
              Stacja towarzysząca: <strong className="text-white font-serif">{companionName}</strong>
            </p>
          </div>
        </div>

        {/* Tkanina głośnikowa z retro-fakturą */}
        <div className="relative rounded-2xl bg-[#1C140D] border-2 border-[#4A2B17] p-6 shadow-inner flex flex-col items-center justify-center min-h-[140px] text-center mb-6">
          {/* Tekstura siatki głośnika */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#amber-400_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

          <button
            onClick={onTogglePower}
            className={`relative z-10 px-8 py-5 rounded-full font-sans font-bold text-xl sm:text-2xl shadow-2xl transition-all transform active:scale-95 flex items-center gap-4 ${
              isPowerOn
                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-amber-500/40 animate-pulse"
                : "bg-stone-800 hover:bg-stone-700 text-amber-200 border-2 border-amber-600/40"
            }`}
          >
            <Power className="w-8 h-8 text-amber-950" />
            <span>{isPowerOn ? "Rozmowa Trwa (Dotknij by Zakończyć)" : "Włącz Radio i Rozmawiaj"}</span>
          </button>

          <p className="relative z-10 text-stone-400 text-xs sm:text-sm font-sans mt-3 max-w-sm">
            Wystarczy włączyć. Radio słucha głosu seniora i odpowiada głośnomówiąco jak dawna audycja.
          </p>
        </div>

        {/* Mosiężne pokrętła i przełączniki dolne */}
        <div className="flex items-center justify-around pt-2">
          {/* Pokrętło 1: Głośność */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8C6D37] via-[#D4AF37] to-[#8C6D37] p-1 shadow-lg border-2 border-[#5E4722] flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#3D2314] flex items-center justify-center border border-[#D4AF37]/50">
                <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full -translate-y-2" />
              </div>
            </div>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-300/80 mt-2">
              Siła Głosu
            </span>
          </div>

          {/* Centralny grawer mosiężny */}
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-1">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs font-serif font-bold text-amber-200 block">
              Złota Era Polskiego Radia
            </span>
            <span className="text-[10px] font-sans text-stone-400">
              Terapia Reminiscencyjna 1950–1980
            </span>
          </div>

          {/* Pokrętło 2: Barwa tonu */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8C6D37] via-[#D4AF37] to-[#8C6D37] p-1 shadow-lg border-2 border-[#5E4722] flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#3D2314] flex items-center justify-center border border-[#D4AF37]/50">
                <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full translate-y-2" />
              </div>
            </div>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-300/80 mt-2">
              Ciepło Barwy
            </span>
          </div>
        </div>
      </div>

      {/* Wyjaśnienie koncepcji sprzętowej dla grantodawców */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-stone-800 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 block font-bold mb-0.5">
            Koncepcja Sprzętowa BliskiGłos Box IoT (Gotowość TRL 7 dla PFRON / FERS):
          </strong>
          <span>
            Dla osób z zaawansowanym otępieniem i chorobą Parkinsona interfejs dotykowy telefonu bywa barierą. W ramach grantu projekt przewiduje dedykowany stacjonarny głośnik w drewnianej obudowie retro z jednym fizycznym pokrętłem — bez ekranu, haseł i kabli manipulacyjnych.
          </span>
        </div>
      </div>
    </div>
  );
};
