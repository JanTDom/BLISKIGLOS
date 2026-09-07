"use client";

import React, { useState } from "react";
import { SeniorProfile } from "@/types";
import { Mic, Volume2, ShieldCheck, Heart, Sparkles, CheckCircle2, Info, Play, Pause } from "lucide-react";
import { voiceEngine } from "@/lib/voice-engine";

interface FamilyVoiceClonerProps {
  profile: SeniorProfile;
  onVoiceChanged: (newVoice: "krystyna" | "stanislaw" | "corka_anna") => void;
}

export const FamilyVoiceCloner: React.FC<FamilyVoiceClonerProps> = ({
  profile,
  onVoiceChanged,
}) => {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [isRecordingSample, setIsRecordingSample] = useState(false);
  const [sampleSaved, setSampleSaved] = useState(true); // pre-configured demo sample for daughter Anna

  const isCurrentVoiceFamily = profile.companionVoice === "corka_anna";

  const handlePlayFamilyDemo = async () => {
    if (isPlayingDemo) {
      voiceEngine.stopSpeaking();
      setIsPlayingDemo(false);
      return;
    }

    setIsPlayingDemo(true);
    await voiceEngine.unlock();
    const demoText = `Mamusiu, jestem przy Tobie. Pamiętam, jak razem robiłyśmy przetwory z malin w ogrodzie. Odpocznij spokojnie, wszystko jest dobrze.`;
    await voiceEngine.speak(demoText, () => setIsPlayingDemo(false), "corka_anna");
  };

  const handleActivateFamilyVoice = () => {
    onVoiceChanged("corka_anna");
  };

  const handleRevertToKrystyna = () => {
    onVoiceChanged("krystyna");
  };

  return (
    <div className="space-y-8">
      {/* Banner główny modułu */}
      <div className="bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Kotwica Bezpieczeństwa (Family Voice Safe Anchor)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-950">
              Głos Córki jako Kojący Głos Asystenta
            </h2>
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
              Dla osoby w zaawansowanej demencji tembr głosu własnego dziecka jest najsilniejszym znanym uziemieniem emocjonalnym. Dzięki AI asystent może mówić Twoim ciepłym głosem z zachowaniem rygorystycznych guardrails Terapii Walidacyjnej.
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handlePlayFamilyDemo}
              className="px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2.5"
            >
              {isPlayingDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlayingDemo ? "Zatrzymaj próbkę" : "Posłuchaj próbki głosu córki"}</span>
            </button>

            {isCurrentVoiceFamily ? (
              <button
                onClick={handleRevertToKrystyna}
                className="px-6 py-3 rounded-full bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs transition-all text-center"
              >
                Przełącz z powrotem na Panią Krystynę
              </button>
            ) : (
              <button
                onClick={handleActivateFamilyVoice}
                className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all shadow-sm text-center"
              >
                Aktywuj głos córki dla Mamy
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ramy etyczne i status ochrony */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Etyczny Filtr Ochronny (Guardrails Naomi Feil)
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            Klonowany głos bliskiego w rękach nieodpowiedzialnego AI mógłby wywołać lęk u chorego (poczucie, że córka jest uwięziona w telefonie). W systemie BLISKIGLOS zastosowano 3 twarde zabezpieczenia kliniczne:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zasada Obecności:</strong> Asystent zawsze otwiera wypowiedź słowami: <em>„Mamusiu, pamiętam o Tobie i jestem przy Tobie”</em>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zakaz Zobowiązań Czasowych:</strong> Asystent nigdy nie obiecuje niemożliwych wizyt (*„Zaraz przyjadę za 5 minut”*), lecz uziemia w tu i teraz.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Pełne Szyfrowanie Biometryczne:</strong> Model głosu jest zanonimizowany i chroniony unijnym certyfikatem prywatności.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <Mic className="w-5 h-5 text-rose-600" />
                Profil Głosu: Anna (Córka)
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Aktywny & Gotowy
              </span>
            </div>
            <p className="text-stone-600 text-sm">
              Zarejestrowano 60-sekundową próbkę czytanego tekstu o ciepłym tembrze.
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1 font-mono">
              <div>Status: <strong>Wysoka wierność (Similarity 92%)</strong></div>
              <div>Stabilność geriatryczna: <strong>0.85 (Eliminacja nagłych pisków)</strong></div>
              <div>Częstotliwość próbkowania: <strong>44.1 kHz Studio Master</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-center gap-3">
            <Info className="w-5 h-5 text-rose-600 shrink-0" />
            <span>
              Aktualnie wybrany głos na tablecie seniora: <strong>{profile.companionVoice === "corka_anna" ? "Głos Córki Ani" : profile.companionVoice === "krystyna" ? "Pani Krystyna" : "Pan Stanisław"}</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
