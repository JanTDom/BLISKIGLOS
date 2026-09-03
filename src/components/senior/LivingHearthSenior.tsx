"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2, Sparkles, Heart } from "lucide-react";

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

  return (
    <div className="flex flex-col items-center justify-center select-none my-4">
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={isListening ? "Rozmowa trwa, słucham Cię" : "Dotknij, aby rozpocząć rozmowę"}
        className="relative flex items-center justify-center cursor-pointer transition-transform active:scale-95 focus:outline-none"
        style={{ width: size, height: size }}
      >
        {/* Zewnętrzna łagodna poświata słońca / serca */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size * 1.3,
            height: size * 1.3,
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(251, 191, 36, 0.18) 45%, rgba(217, 119, 6, 0.05) 70%, transparent 80%)",
            filter: "blur(28px)",
          }}
          animate={{
            scale: isSpeaking
              ? [1, 1.12, 1]
              : isListening
              ? [1, 1.05 + userVolume * 0.15, 1]
              : [1, 1.04, 1],
            opacity: isSpeaking ? [0.8, 1, 0.8] : [0.6, 0.85, 0.6],
          }}
          transition={{
            duration: isSpeaking ? 2.4 : isListening ? 1.5 : 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pierścienie pulsujące w rytmie oddechu (vagus nerve stimulation) */}
        <motion.div
          className="absolute rounded-full border-2 border-amber-300/40 pointer-events-none"
          style={{ width: size * 0.95, height: size * 0.95 }}
          animate={{
            scale: isListening ? [1, 1.08, 1] : isSpeaking ? [1, 1.06, 1] : [1, 1.02, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Główne jądro ciepła (Słoneczne Serce) */}
        <div
          className="relative rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden"
          style={{
            width: size * 0.76,
            height: size * 0.76,
            background: "linear-gradient(135deg, #FEF3C7 0%, #F59E0B 50%, #D97706 100%)",
            boxShadow: "0 20px 50px rgba(217, 119, 6, 0.35), inset 0 2px 10px rgba(255, 255, 255, 0.8)",
          }}
        >
          {/* Delikatne światło wewnętrzne */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/30 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-amber-950 text-center px-4">
            {isSpeaking ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <Volume2 className="w-16 h-16 text-amber-950 mb-2 drop-shadow-sm" />
                </motion.div>
                <span className="font-serif text-2xl font-bold tracking-wide">
                  Mówię do Ciebie...
                </span>
                <span className="text-sm font-medium text-amber-900 mt-1">
                  Posłuchaj spokojnie
                </span>
              </>
            ) : isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                >
                  <Sparkles className="w-14 h-14 text-amber-950 mb-2" />
                </motion.div>
                <span className="font-serif text-2xl font-bold tracking-wide">
                  Myślę o Tobie...
                </span>
                <span className="text-sm font-medium text-amber-900 mt-1">
                  Chwileczka
                </span>
              </>
            ) : isListening ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2 + userVolume * 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                >
                  <Mic className="w-16 h-16 text-amber-950 mb-2 drop-shadow-sm" />
                </motion.div>
                <span className="font-serif text-2xl font-bold tracking-wide">
                  Słucham Cię...
                </span>
                <span className="text-sm font-medium text-amber-900 mt-1">
                  Mów spokojnie, mam czas
                </span>
              </>
            ) : (
              <>
                <Heart className="w-16 h-16 text-amber-950 mb-2 drop-shadow-sm fill-amber-900/10" />
                <span className="font-serif text-2xl font-bold tracking-wide">
                  Porozmawiajmy
                </span>
                <span className="text-sm font-semibold text-amber-950/80 mt-1 uppercase tracking-wider bg-white/40 px-3 py-1 rounded-full">
                  Dotknij tutaj
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Podpis pod sercem */}
      <div className="mt-4 text-center">
        <p className="text-lg font-serif font-medium text-stone-800">
          Twój towarzysz: <span className="font-bold text-amber-900">{companionName}</span>
        </p>
        <p className="text-sm text-stone-500 mt-0.5">
          {isListening
            ? "Mów w stronę telefonu lub tabletu bez dotykania"
            : "Wystarczy jedno dotknięcie, by zacząć spokojną rozmowę"}
        </p>
      </div>
    </div>
  );
};
