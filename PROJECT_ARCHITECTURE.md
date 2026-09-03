# BLISKIGLOS — Kompletna Specyfikacja Architektoniczna i Techniczna Projektu

> **Projekt:** BLISKIGLOS (bliskiglos.pl)  
> **Wersja:** 1.0.0 (Produkcja)  
> **Adres produkcyjny:** [https://bliskiglos.pl](https://bliskiglos.pl) / [https://bliskiglos.vercel.app](https://bliskiglos.vercel.app)  
> **Lokalizacja projektu:** `/Users/macbookpro/PROJEKTY/BLISKIGLOS`  
> **Hosting & DNS:** Vercel Edge Network (zespół `macieto`) + NASK / nazwa.pl  
> **Środowisko:** Next.js 16 (Turbopack, App Router), React 19, TypeScript 5, Tailwind CSS 3.4, ElevenLabs Multilingual v2, OpenAI GPT-4o-mini & Whisper & TTS-1-HD, Web Audio API, Canvas 2D, PWA.

---

## 1. Misja Produktu i Psychologia Geriatryczna

**BLISKIGLOS** to terapeutyczna przystań audio-technologiczna stworzona jako odpowiedź na epidemię samotności wśród osób starszych oraz wsparcie w kryzysach demencyjnych (choroba Alzheimera, otępienia naczyniowe).

W odróżnieniu od ogólnych chatbotów tekstowych, BLISKIGLOS:
1. **Stosuje Terapię Walidacyjną Naomi Feil**: Całkowity zakaz zaprzeczania urojeniom i konfrontowania zagubionego w czasie seniora. Waliduje emocje, obniża poziom lęku i kortyzolu.
2. **Stosuje Terapię Reminiscencyjną dr. Roberta Butlera**: Aktywuje zachowaną pamięć długoterminową (młodość, dawne melodie, potrawy, tradycje).
3. **Prowadzi rozmowy w trybie Hands-Free Live Voice**: Bez konieczności pisania na małej klawiaturze — głośnomówiąca rozmowa ze zwolnionym tempem lektora (0.90x).
4. **Tworzy Portal Rodziny i Kronikę Wspomnień**: Ocala historie z życia seniora i dostarcza dzieciom codzienne raporty dobrostanu oraz alerty bezpieczeństwa.

---

## 2. Architektura Systemu

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROJEKT BLISKIGLOS                              │
│                                                                        │
│   ┌─────────────────────────────────┐   ┌──────────────────────────┐   │
│   │        TRYB DLA SENIORA         │   │      PORTAL RODZINY      │   │
│   │       (Senior-First AAA)        │   │        (/opiekun)        │   │
│   │                                 │   │                          │   │
│   │ • 1 Wielki Przycisk Rozmowy     │   │ • Dziennik samopoczucia  │   │
│   │ • Living Hearth (oddech vagus)  │   │ • Kronika Wspomnień      │   │
│   │ • Czcionki 24–36px, wysoki      │   │ • Bezpieczeństwo somat.  │   │
│   │   kontrast, zero zbędnych opcji │   │ • Zarządzanie opieką     │   │
│   │ • Hands-Free (mówi i słucha)    │   │ • Subskrypcja (59/89 zł) │   │
│   └────────────────┬────────────────┘   └─────────────┬────────────┘   │
│                    │                                  │                │
│                    └────────────────┬─────────────────┘                │
│                                     │                                  │
│                                     ▼                                  │
│              Next.js 16 + Dual Audio & VAD Engine                      │
│              OpenAI GPT-4o-mini (Validation Therapy)                   │
│              ElevenLabs Multilingual v2 (Krystyna & Stanisław)         │
│              OpenAI Whisper (/api/transcribe) + Fallback TTS HD        │
│              Vercel Edge Network (bliskiglos.pl)                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Podwójny Silnik Syntezy i Nasłuchu Mowy

1. **Pre-Unlock Audio Singleton**: Zabezpieczenie przed blokadami Autoplay w Chrome i Safari na iOS/macOS/Android.
2. **Dual VAD & Speech Recognition**:
   * Płynny nasłuch w czasie rzeczywistym (`Web Speech API`).
   * Równoległe nagrywanie i transkrypcja Whisper (`/api/transcribe`) dla cichych i niewyraźnych głosów.
   * Wyciszanie mikrofonu w trakcie mówienia lektora (brak sprzężeń i echa).
3. **Dedykowane Polskie Głosy**:
   * **Pani Krystyna**: ciepła, matczyna, dojrzała lektorka.
   * **Pan Stanisław**: spokojny, szarmancki, cierpliwy dżentelmen.

---

## 4. Struktura Modułów w `/Users/macbookpro/PROJEKTY/BLISKIGLOS`

```
BLISKIGLOS/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts        # Silnik Terapii Walidacyjnej GPT-4o-mini
│   │   │   ├── voice/route.ts       # Synteza mowy ElevenLabs (Krystyna / Stanisław)
│   │   │   ├── transcribe/route.ts  # Whisper transcription (dokładność mowy PL)
│   │   │   └── family/summary/      # Generator podsumowań dnia dla opiekuna
│   │   ├── senior/page.tsx          # Główny ekran seniora (Hands-Free AAA)
│   │   ├── opiekun/page.tsx         # Portal rodziny (Dziennik + Kronika Wspomnień)
│   │   ├── cennik/page.tsx          # Model subskrypcyjny i pakiety opiekuńcze
│   │   ├── layout.tsx               # Root layout PWA
│   │   └── page.tsx                 # Główny landing page bliskiglos.pl
│   ├── components/
│   │   ├── senior/LivingHearthSenior.tsx # Sensoryczne pulsujące serce oddechu
│   │   └── navigation/TopNav.tsx         # Nawigacja, kontrola czcionki (A/A+/A++) i SOS
│   ├── lib/
│   │   ├── geriatric-psychology.ts  # Baza wiedzy walidacji Naomi Feil i detektor kryzysów
│   │   ├── voice-engine.ts          # Silnik audio, VAD, pre-unlock
│   │   └── storage.ts               # Magazyn profili, wspomnień i historii
│   └── types/index.ts               # Typowanie domenowe TypeScript
├── supabase/schema.sql              # Baza danych i tabele pamięci seniora
├── .env.local                       # Klucze produkcyjne (OpenAI, ElevenLabs, Supabase)
└── package.json
```
