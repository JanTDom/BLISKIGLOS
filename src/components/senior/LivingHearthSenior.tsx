"use client";

import React, { useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, Sparkles, Heart, Sun } from "lucide-react";

interface LivingHearthSeniorProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  isProcessing?: boolean;
  userVolume?: number;
  companionName?: string;
  onClick?: () => void;
  size?: number;
}

export const LivingHearthSenior: React.FC<LivingHearthSeniorProps> = ({
  isListening = false,
  isSpeaking = false,
  isProcessing = false,
  userVolume = 0,
  companionName = "Pani Krystyna",
  onClick,
  size = 320,
}) => {
  const filterId = useId().replace(/:/g, "_");

  // Stan aktywności rozmowy
  const isActive = isListening || isSpeaking || isProcessing;

  return (
    <div className="flex flex-col items-center justify-center select-none my-6">
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={
          isSpeaking
            ? "Mówię do Ciebie, posłuchaj"
            : isListening
            ? "Rozmowa trwa, słucham Cię uważnie"
            : isProcessing
            ? "Myślę nad słowami"
            : "Dotknij, aby rozpocząć spokojną rozmowę"
        }
        className="relative flex items-center justify-center cursor-pointer transition-transform active:scale-[0.98] focus:outline-none group"
        style={{ width: size, height: size }}
      >
        {/* 1. Wielowarstwowa sensoryczna aura bursztynowo-złota (0.1 Hz stymulacji nerwu błędnego) */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size * 1.45,
            height: size * 1.45,
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.40) 0%, rgba(245, 158, 11, 0.22) 40%, rgba(217, 119, 6, 0.08) 65%, transparent 80%)",
            filter: "blur(32px)",
          }}
          animate={{
            scale: isSpeaking
              ? [1, 1.15, 1]
              : isListening
              ? [1, 1.08 + Math.min(userVolume, 1) * 0.22, 1]
              : isProcessing
              ? [1, 1.08, 1]
              : [1, 1.06, 1],
            opacity: isSpeaking ? [0.85, 1, 0.85] : isListening ? [0.75, 0.95, 0.75] : [0.55, 0.75, 0.55],
          }}
          transition={{
            duration: isSpeaking ? 2.6 : isListening ? 1.4 : isProcessing ? 2.0 : 6.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 2. Zewnętrzne fale akustyczne / pierścienie oddechu */}
        <motion.div
          className="absolute rounded-full border border-amber-400/40 pointer-events-none"
          style={{ width: size * 1.15, height: size * 1.15 }}
          animate={{
            scale: isListening
              ? [1, 1.12 + Math.min(userVolume, 1) * 0.18, 1]
              : isSpeaking
              ? [1, 1.1, 1]
              : [1, 1.04, 1],
            opacity: isListening ? [0.4, 0.8, 0.4] : [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: isListening ? 1.6 : isSpeaking ? 2.2 : 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute rounded-full border-2 border-amber-300/30 pointer-events-none"
          style={{ width: size * 0.98, height: size * 0.98 }}
          animate={{
            scale: isListening ? [1, 1.07, 1] : isSpeaking ? [1, 1.05, 1] : [1, 1.02, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 3. Główne jądro ciepła (Słoneczne Serce Living Hearth) */}
        <div
          className="relative rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-700 overflow-hidden group-hover:shadow-amber-500/40"
          style={{
            width: size * 0.78,
            height: size * 0.78,
            background: isSpeaking
              ? "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 25%, #F59E0B 70%, #B45309 100%)"
              : isListening
              ? "linear-gradient(135deg, #FEF3C7 0%, #FBBF24 40%, #D97706 85%, #92400E 100%)"
              : isProcessing
              ? "linear-gradient(135deg, #FEF9C3 0%, #FDE047 45%, #CA8A04 90%, #854D0E 100%)"
              : "linear-gradient(135deg, #FEF3C7 0%, #F59E0B 45%, #D97706 85%, #92400E 100%)",
            boxShadow:
              "0 24px 60px -12px rgba(217, 119, 6, 0.45), inset 0 3px 12px rgba(255, 255, 255, 0.85), inset 0 -4px 16px rgba(146, 64, 14, 0.35)",
          }}
        >
          {/* Światło pryzmatyczne i miękki połysk słońca */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-amber-100/40 pointer-events-none" />

          {/* Subtelne promienie / pierścień wewnętrzny */}
          <div className="absolute inset-2.5 rounded-full border border-white/40 pointer-events-none" />

          {/* Zawartość centrum Living Hearth */}
          <div className="relative z-10 flex flex-col items-center text-amber-950 text-center px-4">
            <AnimatePresence mode="wait">
              {isSpeaking ? (
                <motion.div
                  key="speaking"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.16, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-18 h-18 rounded-full bg-amber-950/10 flex items-center justify-center mb-2"
                  >
                    <Volume2 className="w-12 h-12 text-amber-950 drop-shadow-sm" />
                  </motion.div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-amber-950">
                    Mówię do Ciebie...
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-amber-900 mt-1 bg-amber-200/50 px-3 py-0.5 rounded-full">
                    Posłuchaj spokojnie
                  </span>
                </motion.div>
              ) : isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
                    className="w-18 h-18 rounded-full bg-amber-950/10 flex items-center justify-center mb-2"
                  >
                    <Sparkles className="w-12 h-12 text-amber-950" />
                  </motion.div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-amber-950">
                    Myślę o Tobie...
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-amber-900 mt-1 bg-amber-200/50 px-3 py-0.5 rounded-full">
                    Chwileczka
                  </span>
                </motion.div>
              ) : isListening ? (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.22 + Math.min(userVolume, 1) * 0.35, 1] }}
                    transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
                    className="w-18 h-18 rounded-full bg-amber-950/10 flex items-center justify-center mb-2"
                  >
                    <Mic className="w-12 h-12 text-amber-950 drop-shadow-sm" />
                  </motion.div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-amber-950">
                    Słucham Cię...
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-amber-900 mt-1 bg-amber-200/50 px-3 py-0.5 rounded-full">
                    Mów spokojnie, mam czas
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="w-18 h-18 rounded-full bg-amber-950/10 flex items-center justify-center mb-2"
                  >
                    <Heart className="w-12 h-12 text-amber-950 fill-amber-950/20 drop-shadow-sm" />
                  </motion.div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-amber-950">
                    Porozmawiajmy
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-950/90 mt-1.5 uppercase tracking-widest bg-white/60 backdrop-blur-sm px-4 py-1 rounded-full border border-amber-300/60 shadow-sm">
                    Dotknij tutaj
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dystyngowany podpis pod sercem z informacją o lektorze */}
      <div className="mt-5 text-center max-w-sm px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-950 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-600" />
          <span>Towarzysz: {companionName}</span>
        </div>
        <p className="text-base sm:text-lg font-serif text-stone-800 leading-snug">
          {isActive
            ? "Mów w stronę telefonu lub tabletu bez dotykania ekranu"
            : "Wystarczy jedno delikatne dotknięcie serca, by rozpocząć rozmowę"}
        </p>
      </div>
    </div>
  );
};
