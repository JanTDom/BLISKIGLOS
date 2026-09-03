---
name: resilient-nextjs-and-zero-defect
description: >-
  Standardy inżynierii produkcji w Next.js 16 (Turbopack, App Router), React 19, TypeScript, Zod, Supabase RLS oraz PWA. Aktywuj przy architekturze kodu, tworzeniu endpointów API, zarządzaniu stanem, walidacji danych i eliminacji regresji technicznych.
---

# Resilient Next.js 16, TypeScript & Zero-Defect Architecture

Ten skill definiuje standard inżynieryjny w projekcie **BLISKIGLOS**. Zero błędów w konsoli, bezwzględne bezpieczeństwo danych seniora, pełna odporność na niestabilne łącza internetowe.

---

## 1. Architektura Next.js 16 & React 19

### A. Granice Server / Client Components
* **Domyślnie Server Components:** Strony informacyjne, szkielety layoutów, pobieranie danych początkowych z Supabase powinny być komponentami serwerowymi.
* **Klient (`'use client'`):** Tylko tam, gdzie wymagana jest interaktywność, AudioContext, Canvas lub Web Speech API (`src/components/senior/LivingHearthSenior.tsx`, `TopNav.tsx`).
* **Żadnych Tajemnic na Kliencie:** Klucze `OPENAI_API_KEY`, `ELEVENLABS_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` nigdy nie mogą mieć prefiksu `NEXT_PUBLIC_` ani trafić do bundle'a przeglądarki.

### B. Walidacja Kontraktów (Contract-First z Zod)
Wszystkie endpointy API w `src/app/api/*` muszą walidować dane wejściowe:
```typescript
import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  profileId: z.string().uuid().optional(),
  voiceSpeed: z.number().min(0.7).max(1.2).default(0.9)
});
```
Nie przyjmuj niesprawdzonych payloadów `req.json()`. W razie błędu walidacji zwracaj precyzyjny status 400 z czytelnym komunikatem błędu.

---

## 2. Odporność na Błędy i Error Boundaries (Zero White Screens)

* **Zakaz "Białego Ekranu Śmierci":** Aplikacja dla seniora nigdy nie może paść do pustego ekranu z powodu niespójności stanu lub błędu renderowania.
* Każdy kluczowy widok (`/senior`, `/opiekun`) musi być owinięty w dedykowany `error.tsx` z ciepłym, przyjaznym interfejsem:
  > *"Chwileczkę, odświeżam połączenie..."* + Duży, wyraźny przycisk *"Zacznij od nowa"*.

---

## 3. Bezpieczeństwo Danych i RODO / Supabase RLS

1. **Row Level Security (RLS):**
   * Wszystkie tabele (`profiles`, `conversations`, `memories`, `alerts`) muszą mieć włączone RLS (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
   * Dostęp do historii rozmów seniora może mieć wyłącznie zalogowany opiekun przypisany do danego profilu (`auth.uid() = caregiver_id`).
2. **Anonimizacja i Wrażliwość Danych:**
   * Dane dotyczące stanu zdrowia i kryzysów seniora podlegają szczególnej ochronie. Wszelkie logi produkcyjne muszą usuwać dane osobowe (PESEL, adres, nazwiska).

---

## 4. PWA i Działanie w Niestabilnej Sieci

* Aplikacja musi poprawnie działać jako zainstalowana aplikacja PWA na tabletach i smartfonach (iPad, Samsung Galaxy Tab).
* Service Worker powinien cache'ować krytyczne assety oraz awaryjny komunikat głosowy ("Połączenie zostało przerwane, za chwilę spróbuję ponownie"), aby senior nie czuł się zagubiony w przypadku chwilowej utraty Wi-Fi.
