# BLISKIGLOS — Standard Inżynieryjny i Reguły Projektowe

> **System:** BLISKIGLOS (bliskiglos.pl)  
> **Cel:** Terapeutyczna przystań audio-technologiczna dla seniorów (samotność, Alzheimer, demencja) oraz portal wsparcia dla opiekunów.  
> **Standard:** Fable-Grade Senior Engineering, WCAG 2.2 AAA, Zero-Defect Architecture.

---

## 1. Zamontowane Skille Projektowe (`.agents/skills/` & Global)

Projekt posiada dedykowany zestaw umiejętności operacyjnych, które należy aktywować w zależności od zadania:

1. **`senior-geriatric-ux-and-accessibility`** (`.agents/skills/senior-geriatric-ux-and-accessibility/SKILL.md`):
   * Bezkompromisowe WCAG 2.2 AAA dla osób starszych.
   * Typografia min. 24px, kontrasty 7:1+, dotyk min. 64–96px, tolerancja drżenia rąk (Parkinson).
   * Zero zbędnych elementów poznawczych, Living Hearth (oddech 0.1 Hz stymulujący nerw błędny).

2. **`realtime-audio-and-voice-streaming`** (`.agents/skills/realtime-audio-and-voice-streaming/SKILL.md`):
   * Pre-unlocking AudioContext dla iOS Safari / Android Chrome.
   * Dual VAD (Web Speech API + fallback Whisper `/api/transcribe`).
   * ElevenLabs Multilingual v2 lektora z tempem geriatrycznym 0.90x i wyciszaniem mikrofonu w trakcie mowy (brak echa).

3. **`validation-therapy-and-geriatric-ai`** (`.agents/skills/validation-therapy-and-geriatric-ai/SKILL.md`):
   * Terapia Walidacyjna Naomi Feil (bezwzględny zakaz zaprzeczania urojeniom i faktom z przeszłości).
   * Terapia Reminiscencyjna dr. Roberta Butlera (polskie kotwice kulturowe).
   * Automatyczny skaner kryzysów somatycznych (upadki, ból w klatce piersiowej, silna dezorientacja) z eskalacją do portalu rodziny.

4. **`resilient-nextjs-and-zero-defect`** (`.agents/skills/resilient-nextjs-and-zero-defect/SKILL.md`):
   * Next.js 16 (App Router, Turbopack), React 19, TypeScript.
   * Walidacja kontraktów (Zod) dla wszystkich endpointów API.
   * Error boundaries z kojącym interfejsem dla seniora (brak białych ekranów i technicznych kodów błędów).
   * Bezpieczeństwo Supabase RLS i ochrona danych medycznych.

5. **`flawless-testing-and-accessibility-qa`** (`.agents/skills/flawless-testing-and-accessibility-qa/SKILL.md`):
   * Audyty dostępności axe-core, testy E2E maszyny stanów audio, weryfikacja promptów pod kątem braku protekcjonalizmu.
   * Obowiązkowa weryfikacja `npm run build` przed wdrożeniem.

6. **Skille Globalne (Frontend & Architecture):**
   * `bulletproof-architecture-and-ddd` — separacja warstw, czysta architektura.
   * `core-web-vitals-and-performance` — 60fps animacji płótna Canvas, sub-500ms TTFB mowy.
   * `creative-motion-and-physics` — płynna fizyka oddechu bez szarpania.
   * `editorial-typography-and-design-systems` — ciepła, dostojna estetyka.
   * `security-hardening-and-owasp` — ochrona danych osobowych i kluczy API.

---

## 2. Nienegocjowalne Zasady Jakościowe

1. **Empiryczna Weryfikacja:** Żadna funkcja nie jest uznana za ukończoną bez uruchomienia `npm run build` i testu w przeglądarce.
2. **Godność i Szacunek dla Seniora:** Język aplikacji musi być ciepły, szarmancki, cierpliwy i pozbawiony infantylizacji.
3. **Płynność i Spokój:** Żadnych wyskakujących powiadomień, żadnych dźwięków alarmowych (poza SOS), żadnych nerwowych animacji.
