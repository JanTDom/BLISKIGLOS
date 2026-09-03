"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { TopNav } from "@/components/navigation/TopNav";
import { LivingHearthSenior } from "@/components/senior/LivingHearthSenior";
import { voiceEngine, VoiceEngineState } from "@/lib/voice-engine";
import { 
  getSeniorProfile, 
  saveSeniorProfile, 
  getStoredMessages, 
  saveStoredMessages, 
  getStoredReminiscences, 
  saveStoredReminiscences 
} from "@/lib/storage";
import { SeniorProfile, SeniorMessage, FontSizePreference } from "@/types";
import { 
  Send, 
  Volume2, 
  PhoneOff, 
  PhoneCall, 
  AlertCircle, 
  ShieldAlert, 
  Sparkles,
  Mic,
  Sun,
  Heart,
  HelpCircle,
  Clock
} from "lucide-react";

export default function SeniorPage() {
  const [profile, setProfile] = useState<SeniorProfile>(getSeniorProfile());
  const [messages, setMessages] = useState<SeniorMessage[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Gotowa do rozmowy");
  
  const [engineState, setEngineState] = useState<VoiceEngineState>({
    isListening: false,
    isRecording: false,
    isSpeaking: false,
    isProcessing: false,
    userVolume: 0,
    transcript: "",
    interimTranscript: "",
    errorMessage: null,
  });

  const [crisisNotification, setCrisisNotification] = useState<string | null>(null);

  const isProcessingRef = useRef(false);
  const isCallActiveRef = useRef(false);
  const profileRef = useRef<SeniorProfile>(profile);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<SeniorMessage[]>([]);
  const hasInitialLoadedRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  useEffect(() => {
    const loadedProfile = getSeniorProfile();
    setProfile(loadedProfile);
    profileRef.current = loadedProfile;

    const stored = getStoredMessages();
    if (stored.length > 0) {
      setMessages(stored);
    } else {
      const initialGreeting: SeniorMessage = {
        id: "msg_init",
        sender: "companion",
        text: `Dzień dobry, ${loadedProfile.name}. Cieszę się, że jesteśmy razem. O czym chciałaby Pani dzisiaj porozmawiać?`,
        timestamp: "Przed chwilą",
        moodContext: "peaceful",
      };
      setMessages([initialGreeting]);
      saveStoredMessages([initialGreeting]);
    }

    return () => {
      voiceEngine.stopLiveDialogue();
      voiceEngine.stopSpeaking();
      isCallActiveRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!hasInitialLoadedRef.current) {
      hasInitialLoadedRef.current = true;
      return;
    }
    if (isCallActive || messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, engineState.transcript, engineState.interimTranscript, isCallActive]);

  const handleFontSizeChange = (size: FontSizePreference) => {
    const updated = { ...profile, fontSize: size };
    setProfile(updated);
    saveSeniorProfile(updated);
  };

  const handleToggleCompanionVoice = (voice: "krystyna" | "stanislaw") => {
    const companionName = voice === "krystyna" ? "Pani Krystyna" : "Pan Stanisław";
    const updated = { ...profile, companionVoice: voice, companionName };
    setProfile(updated);
    saveSeniorProfile(updated);
    
    if (isCallActive) {
      voiceEngine.speak(`Od teraz rozmawia z Tobą ${companionName}.`, undefined, voice);
    }
  };

  // Główna funkcja przetwarzania wypowiedzi seniora
  const processSeniorMessage = useCallback(async (userText: string) => {
    if (!userText || userText.trim().length < 2) return;
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    const cleanText = userText.trim();
    setStatusLabel("Rozmyślam nad odpowiedzią...");

    const userMsg: SeniorMessage = {
      id: "u_" + Date.now(),
      sender: "senior",
      text: cleanText,
      timestamp: "Przed chwilą",
    };

    const currentHistory = [...messagesRef.current, userMsg];
    setMessages(currentHistory);
    saveStoredMessages(currentHistory);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanText,
          profile: profileRef.current,
          history: currentHistory.slice(-8),
        }),
      });

      if (!res.ok) throw new Error("Błąd serwera rozmowy");

      const data = await res.json();

      if (data.crisisFlag) {
        setCrisisNotification(data.crisisReason || "Zgłoszono potrzebę pomocy");
      }

      // Zapis do kroniki wspomnień
      if (data.extractedReminiscence) {
        const stories = getStoredReminiscences();
        const newStory = {
          id: "rem_" + Date.now(),
          title: data.extractedReminiscence.title,
          story: data.extractedReminiscence.story,
          decadeOrEra: data.extractedReminiscence.decadeOrEra || "Dawne lata",
          emotion: data.extractedReminiscence.emotion || "Ciepło",
          dateExtracted: "Dzisiaj",
        };
        saveStoredReminiscences([newStory, ...stories]);
      }

      const companionMsg: SeniorMessage = {
        id: "c_" + Date.now(),
        sender: "companion",
        text: data.reply,
        timestamp: "Przed chwilą",
        moodContext: data.moodContext,
        crisisFlag: data.crisisFlag,
      };

      const updatedHistory = [...currentHistory, companionMsg];
      setMessages(updatedHistory);
      saveStoredMessages(updatedHistory);

      setStatusLabel("Mówię do Ciebie...");

      const startListeningAgain = () => {
        if (!isCallActiveRef.current) return;
        setStatusLabel("Słucham Cię... Mów spokojnie");
        voiceEngine.startLiveDialogue();
      };

      await voiceEngine.speak(
        data.reply, 
        startListeningAgain, 
        profileRef.current.companionVoice
      );
    } catch (err) {
      console.error(err);
      setStatusLabel("Jestem przy Tobie");
      const fallbackMsg: SeniorMessage = {
        id: "c_err_" + Date.now(),
        sender: "companion",
        text: `Jestem przy Tobie. Proszę opowiadaj dalej, słucham z całą uwagą.`,
        timestamp: "Przed chwilą",
      };
      setMessages([...currentHistory, fallbackMsg]);
      voiceEngine.speak(
        fallbackMsg.text,
        () => {
          if (isCallActiveRef.current) voiceEngine.startLiveDialogue();
        },
        profileRef.current.companionVoice
      );
    } finally {
      isProcessingRef.current = false;
    }
  }, []);

  // START / STOP ROZMOWY
  const handleToggleCall = async () => {
    // 1. ZAWSZE odblokowujemy audio synchronicznie w evencie kliknięcia
    await voiceEngine.unlock();

    if (isCallActive) {
      // Zakończ rozmowę
      isCallActiveRef.current = false;
      setIsCallActive(false);
      voiceEngine.stopLiveDialogue();
      voiceEngine.stopSpeaking();
      setStatusLabel("Rozmowa zakończona. Odpocznij.");
      return;
    }

    // Rozpocznij rozmowę
    isCallActiveRef.current = true;
    setIsCallActive(true);
    setStatusLabel("Łączę z towarzyszem...");

    // Podepnij callbacki
    voiceEngine.setCallbacks(
      (capturedText) => {
        processSeniorMessage(capturedText);
      },
      (st: VoiceEngineState) => {
        setEngineState({ ...st });
        if (st.isSpeaking) {
          setStatusLabel("Mówię do Ciebie...");
        } else if (st.isRecording || st.isListening) {
          setStatusLabel("Słucham Cię... Mów spokojnie");
        } else if (st.isProcessing) {
          setStatusLabel("Rozmyślam...");
        }
      }
    );

    // Poproś o mikrofon
    await voiceEngine.getOrCreateMediaStream().catch((e) => {
      console.warn("Media stream request notice:", e);
    });

    const greeting = `Dzień dobry, ${profile.name}. Cieszę się, że jesteśmy razem. O czym chciałabyś dzisiaj porozmawiać?`;
    setStatusLabel("Mówię powitanie...");

    const startMicAfterGreeting = () => {
      if (!isCallActiveRef.current) return;
      setStatusLabel("Słucham Cię... Mów spokojnie");
      voiceEngine.startLiveDialogue();
    };

    voiceEngine.speak(greeting, startMicAfterGreeting, profile.companionVoice).then((ok) => {
      if (!ok && isCallActiveRef.current) {
        startMicAfterGreeting();
      }
    });
  };

  const handleManualSpeak = (text: string) => {
    voiceEngine.unlock();
    voiceEngine.speak(text, undefined, profile.companionVoice);
  };

  // Kliknięcie w gotowe zdanie pomocnicze
  const handlePromptChipClick = (promptText: string) => {
    if (!isCallActive) {
      handleToggleCall().then(() => {
        setTimeout(() => {
          processSeniorMessage(promptText);
        }, 800);
      });
    } else {
      processSeniorMessage(promptText);
    }
  };

  const fontSizeClass =
    profile.fontSize === "extra-large"
      ? "text-2xl sm:text-3xl leading-relaxed"
      : profile.fontSize === "large"
      ? "text-xl sm:text-2xl leading-relaxed"
      : "text-lg sm:text-xl leading-relaxed";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans relative overflow-x-hidden">
      {/* Tło o ciepłym świetle */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/50 via-[#FAF7F2] to-[#FAF7F2]" />

      <TopNav fontSize={profile.fontSize} onFontSizeChange={handleFontSizeChange} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
        {/* Powiadomienie bezpieczeństwa / opieki */}
        {crisisNotification && (
          <div className="w-full bg-rose-50 border-2 border-rose-400 rounded-3xl p-5 mb-6 shadow-xl flex items-start gap-4 animate-in fade-in">
            <ShieldAlert className="w-10 h-10 text-rose-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950">
                Powiadomienie bezpieczeństwa
              </h3>
              <p className="text-base sm:text-lg text-rose-900 mt-1 leading-relaxed">
                Wykryto słowa sugerujące gorsze samopoczucie lub potrzebę pomocy. Jeśli źle się Pani czuje, prosimy nie zwlekać — zadzwoń pod numer <strong>112</strong> lub skontaktuj się z córką: <strong>{profile.familyContact.phone}</strong>.
              </p>
              <button
                onClick={() => setCrisisNotification(null)}
                className="mt-4 px-6 py-2 rounded-full bg-rose-200 text-rose-900 text-sm font-bold hover:bg-rose-300 transition-colors"
              >
                Rozumiem, dziękuję
              </button>
            </div>
          </div>
        )}

        {/* Informacja o mikrofonie */}
        {engineState.errorMessage && (
          <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-5 text-amber-950 text-sm sm:text-base flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-6 h-6 text-amber-700 shrink-0" />
            <span>{engineState.errorMessage} — upewnij się, że zezwolono na mikrofon w przeglądarce.</span>
          </div>
        )}

        {/* Pasek wyboru rozmówcy z portretami */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white/90 backdrop-blur-md border border-amber-200 p-2 rounded-full mb-4 shadow-sm">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-600 pl-3">
            Twój rozmówca:
          </span>

          <button
            onClick={() => handleToggleCompanionVoice("krystyna")}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm sm:text-base font-bold transition-all ${
              profile.companionVoice === "krystyna"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/25"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/60 shrink-0">
              <img src="/images/hero-senior-krystyna.jpg" alt="Pani Krystyna" className="w-full h-full object-cover" />
            </div>
            <span>Pani Krystyna</span>
          </button>

          <button
            onClick={() => handleToggleCompanionVoice("stanislaw")}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm sm:text-base font-bold transition-all ${
              profile.companionVoice === "stanislaw"
                ? "bg-stone-900 text-white shadow-md shadow-stone-900/25"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/60 shrink-0">
              <img src="/images/senior-stanislaw.jpg" alt="Pan Stanisław" className="w-full h-full object-cover" />
            </div>
            <span>Pan Stanisław</span>
          </button>
        </div>

        {/* Centralne Żywe Serce (Living Hearth) */}
        <LivingHearthSenior
          size={320}
          isListening={engineState.isListening || engineState.isRecording}
          isSpeaking={engineState.isSpeaking}
          isProcessing={engineState.isProcessing}
          userVolume={engineState.userVolume}
          companionName={profile.companionName}
          onClick={handleToggleCall}
        />

        {/* Dynamiczny wskaźnik stanu rozmowy */}
        <div className="w-full max-w-xl text-center mb-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/95 backdrop-blur-md border border-amber-200/90 shadow-md">
            <span
              className={`w-3.5 h-3.5 rounded-full ${
                isCallActive
                  ? engineState.isSpeaking
                    ? "bg-amber-500 animate-pulse"
                    : "bg-emerald-500 animate-ping"
                  : "bg-stone-400"
              }`}
            />
            <span className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              {statusLabel}
            </span>
          </div>

          {/* Podgląd tekstu na żywo w trakcie mówienia */}
          {(engineState.transcript || engineState.interimTranscript) && (
            <div className="mt-3 bg-amber-50/90 border border-amber-300 rounded-2xl p-4 shadow-sm animate-in fade-in">
              <span className="text-xs uppercase font-bold text-amber-900 block mb-1">
                Słyszę Cię:
              </span>
              <p className="text-xl sm:text-2xl font-serif text-stone-950 italic">
                „{engineState.transcript || engineState.interimTranscript}”
              </p>
            </div>
          )}
        </div>

        {/* Podpowiedzi tematów rozmowy (eliminacja lęku przed brakiem słów) */}
        <div className="w-full max-w-xl mb-6">
          <span className="text-xs uppercase font-bold tracking-wider text-stone-500 block text-center mb-2">
            Możesz też wybrać temat na początek:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Jak minął dzień?",
              "Opowiedz mi o ogrodzie",
              "Jakie były Twoje dawne wakacje?",
              "Chcę po prostu posłuchać głosu",
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handlePromptChipClick(prompt)}
                className="px-4 py-2 rounded-full bg-white hover:bg-amber-50 text-stone-800 text-sm font-semibold border border-amber-200/80 shadow-sm transition-all hover:scale-102 active:scale-98"
              >
                „{prompt}”
              </button>
            ))}
          </div>
        </div>

        {/* Główny przycisk dotykowy */}
        <div className="mb-8 w-full max-w-md">
          <button
            onClick={handleToggleCall}
            className={`w-full py-5 px-8 rounded-full text-xl sm:text-2xl font-bold shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
              isCallActive
                ? "bg-stone-900 hover:bg-stone-800 text-white shadow-stone-900/30"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/40 hover:-translate-y-0.5"
            }`}
          >
            {isCallActive ? (
              <>
                <PhoneOff className="w-7 h-7 text-rose-400" />
                <span>Zakończ rozmowę (Odpocznij)</span>
              </>
            ) : (
              <>
                <PhoneCall className="w-7 h-7 text-white animate-pulse" />
                <span>Dotknij, aby porozmawiać</span>
              </>
            )}
          </button>
        </div>

        {/* Dystyngowana historia rozmowy w stylu klasycznym */}
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl border border-amber-900/10 p-5 sm:p-6 shadow-xl mb-6 flex flex-col gap-4 max-h-[460px] overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === "senior" ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs font-bold text-stone-500 mb-1 px-1 flex items-center gap-1.5">
                {m.sender === "senior" ? (
                  "Twoje słowa"
                ) : (
                  <>
                    <Heart className="w-3 h-3 text-amber-600 fill-amber-600" />
                    {profile.companionName}
                  </>
                )}
              </span>
              <div
                className={`p-5 rounded-3xl max-w-[90%] shadow-sm leading-relaxed ${
                  m.sender === "senior"
                    ? "bg-amber-600 text-white rounded-tr-none font-medium"
                    : "bg-[#FFFDF9] text-stone-900 border border-amber-200/90 rounded-tl-none font-serif"
                } ${fontSizeClass}`}
              >
                {m.text}
              </div>

              {m.sender === "companion" && (
                <button
                  onClick={() => handleManualSpeak(m.text)}
                  className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-950 px-2 py-1 transition-colors"
                  title="Posłuchaj ponownie"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  Posłuchaj na głos
                </button>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Pomocnicze pole tekstowe (dla seniorów wolących pisać) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (textInput.trim()) {
              processSeniorMessage(textInput);
              setTextInput("");
            }
          }}
          className="w-full max-w-2xl flex items-center gap-3 bg-white p-3 rounded-2xl border border-stone-300 shadow-md focus-within:ring-2 focus-within:ring-amber-500"
        >
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Możesz też wpisać słowa tutaj..."
            className="flex-1 px-4 py-2.5 text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            disabled={!textInput.trim() || engineState.isProcessing}
            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl font-bold transition-all flex items-center gap-2"
            aria-label="Wyślij wiadomość"
          >
            <span>Wyślij</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </main>

      <footer className="w-full bg-stone-100 border-t border-stone-200 py-4 text-center text-xs sm:text-sm text-stone-600 px-4">
        Całodobowy Telefon Zaufania dla Seniorów: <strong>22 635 09 54</strong> • W nagłym wypadku: <strong>112</strong>
      </footer>
    </div>
  );
}
