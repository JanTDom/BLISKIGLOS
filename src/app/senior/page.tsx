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
  Mic
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, engineState.transcript, engineState.interimTranscript]);

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
    
    // Jeśli rozmowa trwa, poinformuj o zmianie głosu
    if (isCallActive) {
      voiceEngine.speak(`Od teraz mówi do Pani ${companionName}.`, undefined, voice);
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
        text: `Pani Mario, jestem przy Pani. Proszę opowiadać dalej, słucham z całą uwagą.`,
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

    const greeting = `Dzień dobry, ${profile.name}. Jestem przy Tobie. O czym chciałaby Pani dzisiaj porozmawiać?`;
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

  const fontSizeClass =
    profile.fontSize === "extra-large"
      ? "text-2xl sm:text-3xl leading-relaxed"
      : profile.fontSize === "large"
      ? "text-xl sm:text-2xl leading-relaxed"
      : "text-lg sm:text-xl leading-relaxed";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      <TopNav fontSize={profile.fontSize} onFontSizeChange={handleFontSizeChange} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col items-center">
        {/* Powiadomienie kryzysowe / bezpiecznik */}
        {crisisNotification && (
          <div className="w-full bg-rose-50 border-2 border-rose-400 rounded-3xl p-5 mb-6 shadow-lg flex items-start gap-4 animate-in fade-in">
            <ShieldAlert className="w-10 h-10 text-rose-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl font-bold text-rose-950">
                Powiadomienie bezpieczeństwa
              </h3>
              <p className="text-base text-rose-900 mt-1">
                Wykryto słowa sugerujące gorsze samopoczucie lub potrzebę pomocy. Jeśli źle się Pani czuje, prosimy nie czekać — zadzwoń pod numer <strong>112</strong> lub skontaktuj się z córką Anną: <strong>+48 601 234 567</strong>.
              </p>
              <button
                onClick={() => setCrisisNotification(null)}
                className="mt-3 px-4 py-1.5 rounded-full bg-rose-200 text-rose-900 text-sm font-semibold hover:bg-rose-300 transition-colors"
              >
                Rozumiem, dziękuję
              </button>
            </div>
          </div>
        )}

        {/* Błąd mikrofonu jeśli zablokowany */}
        {engineState.errorMessage && (
          <div className="w-full bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-4 text-amber-950 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>{engineState.errorMessage} — upewnij się, że zezwolono na dostęp do mikrofonu w przeglądarce.</span>
          </div>
        )}

        {/* Wybór rozmówcy dla seniora */}
        <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200/80 p-1.5 rounded-2xl mb-4 shadow-sm">
          <span className="text-sm font-semibold text-stone-600 pl-3">Rozmówca:</span>
          <button
            onClick={() => handleToggleCompanionVoice("krystyna")}
            className={`px-4 py-2 rounded-xl text-base font-bold transition-all ${
              profile.companionVoice === "krystyna"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-stone-700 hover:bg-white"
            }`}
          >
            Pani Krystyna (Ciepły)
          </button>
          <button
            onClick={() => handleToggleCompanionVoice("stanislaw")}
            className={`px-4 py-2 rounded-xl text-base font-bold transition-all ${
              profile.companionVoice === "stanislaw"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-stone-700 hover:bg-white"
            }`}
          >
            Pan Stanisław (Mądry)
          </button>
        </div>

        {/* Centralne Słoneczne Serce */}
        <LivingHearthSenior
          size={320}
          isListening={engineState.isListening || engineState.isRecording}
          isSpeaking={engineState.isSpeaking}
          isProcessing={engineState.isProcessing}
          userVolume={engineState.userVolume}
          companionName={profile.companionName}
          onClick={handleToggleCall}
        />

        {/* Dynamiczny pasek stanu */}
        <div className="w-full max-w-2xl text-center mb-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-amber-200 shadow-md">
            <span
              className={`w-3.5 h-3.5 rounded-full ${
                isCallActive
                  ? engineState.isSpeaking
                    ? "bg-amber-500 animate-pulse"
                    : "bg-emerald-500 animate-ping"
                  : "bg-stone-400"
              }`}
            />
            <span className="font-serif text-lg font-bold text-stone-800">
              {statusLabel}
            </span>
          </div>

          {/* Podgląd tekstu na żywo w trakcie mówienia */}
          {(engineState.transcript || engineState.interimTranscript) && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm animate-in fade-in">
              <span className="text-xs uppercase font-bold text-amber-900 block mb-1">
                Rozpoznawane słowa:
              </span>
              <p className="text-xl font-serif text-stone-900 italic">
                „{engineState.transcript || engineState.interimTranscript}”
              </p>
            </div>
          )}
        </div>

        {/* Główny przycisk akcji */}
        <div className="mb-8">
          <button
            onClick={handleToggleCall}
            className={`px-8 py-4 rounded-full text-xl font-bold shadow-xl transition-all flex items-center gap-3 active:scale-95 ${
              isCallActive
                ? "bg-stone-800 hover:bg-stone-900 text-white shadow-stone-900/20"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30"
            }`}
          >
            {isCallActive ? (
              <>
                <PhoneOff className="w-6 h-6 text-rose-400" />
                Zakończ rozmowę (Odpocznij)
              </>
            ) : (
              <>
                <PhoneCall className="w-6 h-6 text-white" />
                Dotknij, aby porozmawiać ze mną
              </>
            )}
          </button>
        </div>

        {/* Historia rozmowy */}
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl border border-amber-900/10 p-5 sm:p-6 shadow-xl mb-6 flex flex-col gap-4 max-h-[440px] overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === "senior" ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs font-bold text-stone-500 mb-1 px-1">
                {m.sender === "senior" ? "Twoje słowa" : profile.companionName}
              </span>
              <div
                className={`p-5 rounded-3xl max-w-[90%] shadow-sm ${
                  m.sender === "senior"
                    ? "bg-amber-600 text-white rounded-tr-none font-medium"
                    : "bg-[#FFFDF9] text-stone-900 border border-amber-200/80 rounded-tl-none font-serif"
                } ${fontSizeClass}`}
              >
                {m.text}
              </div>

              {m.sender === "companion" && (
                <button
                  onClick={() => handleManualSpeak(m.text)}
                  className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 px-2 py-1"
                  title="Posłuchaj ponownie"
                >
                  <Volume2 className="w-4 h-4" />
                  Odtwórz na głos
                </button>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Pole tekstowe pomocnicze */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (textInput.trim()) {
              processSeniorMessage(textInput);
              setTextInput("");
            }
          }}
          className="w-full max-w-2xl flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-stone-300 shadow-md focus-within:ring-2 focus-within:ring-amber-500"
        >
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Możesz też napisać wiadomość tutaj..."
            className="flex-1 px-4 py-2.5 text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            disabled={!textInput.trim() || engineState.isProcessing}
            className="p-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl transition-all"
            aria-label="Wyślij wiadomość"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </main>

      <footer className="w-full bg-stone-100 border-t border-stone-200 py-4 text-center text-sm text-stone-600">
        Telefon Zaufania dla Osób Starszych: <strong>22 635 09 54</strong> • W nagłych wypadkach: <strong>112</strong>
      </footer>
    </div>
  );
}
