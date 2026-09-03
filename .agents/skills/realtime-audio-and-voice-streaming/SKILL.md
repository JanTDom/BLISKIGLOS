---
name: realtime-audio-and-voice-streaming
description: >-
  Architektura audio w czasie rzeczywistym: ElevenLabs Multilingual v2, OpenAI Whisper, Web Audio API, Dual VAD (Voice Activity Detection), pre-unlocking AudioContext dla iOS/Safari i zapobieganie sprzężeniom akustycznym. Aktywuj przy pracach nad silnikiem mowy, nagrywaniem mikrofonu, transkrypcją i syntezą audio.
---

# Realtime Audio, Speech Synthesis & VAD Engineering

Ten skill określa bezbłędną realizację warstwy dźwiękowej w projekcie **BLISKIGLOS**. Senior nie może walczyć z przyciskami odtwarzacza — dźwięk musi płynąć naturalnie, bez opóźnień, bez trzasków i bez blokad przeglądarkowych.

---

## 1. Zabezpieczenie przed Blokadami Autoplay (iOS / Safari / Chrome)

### A. Singleton Pre-Unlock AudioContext
W mobilnym Safari i Chrome odtwarzanie dźwięku bez uprzedniej interakcji użytkownika jest blokowane (`NotAllowedError`).
* **Wzorzec Pierwszego Gestu:** Przy pierwszym dotknięciu ekranu lub kliknięciu przycisku "Rozpocznij" należy:
  1. Zainicjalizować i natychmiast wywołać `audioContext.resume()`.
  2. Odtworzyć niesłyszalny, 1-milisekundowy cichy bufor (`createBuffer(1, 1, 22050)`).
  3. Przygotować globalną instancję `HTMLAudioElement` odblokowaną na tym samym evencie `pointerdown` / `click`.
* **Utrzymanie Stanu:** Nigdy nie niszcz i nie twórz na nowo instancji `AudioContext` w trakcie rozmowy — używaj trwałego singletonu w `src/lib/voice-engine.ts`.

---

## 2. Podwójny Silnik Nasłuchu i VAD (Voice Activity Detection)

Seniorzy często mówią cicho, niepewnie, z długimi przerwami na zastanowienie się lub niewyraźną dykcją.

### A. Primary: Web Speech API (Płynny nasłuch bez opóźnień)
* Ciągły nasłuch w tle (`continuous: true`, `interimResults: true`, `lang: 'pl-PL'`).
* **Wydłużone Okno Ciszy (Silence Threshold):** Standardowe VAD ucina wypowiedź po 700ms ciszy. U seniora próg ciszy musi wynosić **1500ms – 2200ms**, aby nie przerywać w pół zdania, gdy starsza osoba szuka właściwego słowa.

### B. Fallback: OpenAI Whisper API (`/api/transcribe`)
* Równoległe buforowanie strumienia z mikrofonu przez `MediaRecorder` (`audio/webm` lub `audio/mp4`).
* Gdy `Web Speech API` nie zarejestruje tekstu (np. niewyraźna mowa, szum otoczenia, brak wsparcia w przeglądarce), bufor audio natychmiast trafia do Whisper z wymuszeniem języka polskiego (`language: 'pl'`) i podpowiedzią geriatryczną (prompt bias dla polskich imion i kontekstu).

### C. Wyciszanie Mikrofonu (Echo & Feedback Elimination)
* **Kluczowa Reguła:** W ułamku sekundy, w którym lektor zaczyna mówić (`onAudioPlay`), nasłuch mikrofonu musi zostać natychmiast wyciszony / zawieszony (`mute / abort`), aby głos z głośnika nie został potraktowany jako kolejna wypowiedź seniora (pętla sprzężenia zwrotnego).
* Po zakończeniu wypowiedzi lektora dodaj **400ms marginesu bezpieczeństwa**, zanim mikrofon zostanie ponownie aktywowany.

---

## 3. Synteza Mowy ElevenLabs i Pacing Geriatryczny

* **Model:** ElevenLabs `eleven_multilingual_v2` (dedykowane profile: Krystyna / Stanisław).
* **Tempo Lektora:** Maksymalnie **0.90x – 0.92x**. Standardowe tempo 1.0x jest zbyt szybkie dla osób z ubytkami słuchu i obniżonym tempem przetwarzania mowy.
* **Format Danych:** Strumieniowanie chunków `audio/mpeg` (lub buforowanie do natychmiastowego `ArrayBuffer`).
* **Fallback TTS:** W razie błędu sieci lub przekroczenia limitu ElevenLabs, automatyczny graceful fallback do OpenAI `tts-1-hd` (głos `alloy` lub `onyx`) z zachowaniem tego samego tempa.
