---
name: senior-geriatric-ux-and-accessibility
description: >-
  Zasady projektowania interfejsów klasy premium dla seniorów, osób z demencją, chorobą Alzheimera, zaburzeniami poznawczymi, drżeniem rąk (Parkinson) i osłabionym wzrokiem/słuchem. Aktywuj przy tworzeniu lub modyfikacji UI, komponentów wizualnych, typografii, kontrastów i ergonomii dla osób starszych.
---

# Senior Geriatric UX & WCAG 2.2 AAA Accessibility Standard

Ten skill definiuje bezkompromisowe zasady projektowania i implementacji interfejsu użytkownika w projekcie **BLISKIGLOS**, gwarantując absolutny poziom dostępności (WCAG 2.2 AAA), bezpieczeństwa psychologicznego i redukcji stresu u osób w wieku 75+.

---

## 1. Złote Reguły Ergonomii Geriatrycznej

### A. Minimalizacja Obciążenia Poznawczego (Cognitive Load = 0)
* **Zasada Jednego Głównego Celu:** Na ekranie seniora (`/senior`) może znajdować się tylko JEDNA główna akcja naraz (np. wielki pulsujący przycisk rozmowy "Rozmawiaj ze mną").
* **Zakaz Zagnieżdżonych Modali i Menu:** Żadnych menu hamburgerowych, dropdownów z drobnym drukiem, wyskakujących okienek reklamowych czy zawiłych ustawień.
* **Jednoznaczne Etykiety Tekstowe:** Nigdy nie polegaj na samej ikonie. Każda ikona musi posiadać duży, czytelny podpis słowny (np. ikona mikrofonu + podpis "ROZPOCZNIJ ROZMOWĘ").
* **Brak Limitów Czasowych (No Timeouts):** Seniorzy przetwarzają informacje wolniej (o 30–50%). Nigdy nie zamykaj automatycznie sesji ani nie odliczaj czasu w sposób wywołujący panikę.

### B. Fizjologia Wzroku i Typografia
* **Rozmiar Fontu:**
  * Tekst bazowy (body): minimum `24px` (1.5rem).
  * Nagłówki i etykiety kluczowe: `32px – 48px`.
  * Skalowanie: Wbudowany przełącznik wielkości czcionki (`A`, `A+`, `A++`) w nagłówku.
* **Kontrast i Barwa (APCA / WCAG 2.2 AAA):**
  * Współczynnik kontrastu tekstu do tła: minimum **7:1** dla tekstu normalnego i **4.5:1** dla tekstu wielkiego.
  * Paleta barw: Spokojne, ciepłe barwy ziemi i domowego ogniska (Ciepły Bursztyn `#d97706`, Kojąca Szałwia `#059669`, Głęboki Grafit `#1c1917`, Ciepły Pergamin `#fef3c7`).
  * Zakaz jaskrawych, zimnych neonów, sterylnego szpitalnego błękitu i agresywnych czerwieni (z wyjątkiem jednoznacznego przycisku SOS/Pomoc).

### C. Motoryka i Drżenie Rąk (Parkinson / Artroza)
* **Powierzchnia Dotykowa (Touch Targets):**
  * Minimalna powierzchnia klikalna: **64x64px**, rekomendowana dla kluczowych przycisków: **96x96px** do **140x140px**.
  * Odstępy między elementami interaktywnymi: minimum **24px**, aby zapobiec przypadkowemu naciśnięciu sąsiedniego przycisku.
* **Tolerancja Drżenia i Debouncing:**
  * Wprowadzenie debouncingu kliknięć (min. 400ms), aby wielokrotne, mimowolne dotknięcia ekranu nie wywoływały powtórzonych żądań API.
  * Brak wymogu precyzyjnych gestów: zakaz swipe'ów, pinch-to-zoom, podwójnych kliknięć i przeciągania (drag & drop).

---

## 2. Sensoryczny Komponent "Living Hearth" (Ciepłe Serce Oddechu)

Ekran seniora opiera się na żywym, pulsującym sercu:
1. **Stymulacja Nerwu Błędnego (Vagus Nerve):** Rytm pulsacji 0.1 Hz (ok. 6 oddechów na minutę: 4 sekundy wdech / rozszerzanie, 6 sekund wydech / zwężanie). Działa udowodniony naukowo uspokajająco na układ współczulny, obniżając lęk i ciśnienie krwi.
2. **Dynamiczna Zmiana Stanu Wizualnego:**
   * **Stan Oczekiwania (Czuwanie):** Ciepła, miękka złota poświata, wolny oddech.
   * **Stan Słuchania (Gdy senior mówi):** Delikatne fale reagujące na natężenie głosu, jasna obwódka.
   * **Stan Myślenia (Przetwarzanie):** Harmonijna, powolna rotacja ciepłych cząsteczek.
   * **Stan Mówienia (Gdy lektor odpowiada):** Rytmiczne pulsowanie zsynchronizowane z głosem lektora.

---

## 3. Reagowanie na Błędy i Utraty Połączenia
* Jeśli padnie internet lub mikrofon nie ma uprawnień, **nie wyświetlaj technicznych kodów błędów** (np. `Error 500: Failed to fetch`).
* Zamiast tego wyświetl i przeczytaj kojący, ludzki komunikat:
  > *"Wszystko w porządku. Chwileczkę pomyślę lub połączę się ponownie. Proszę odpocząć, jestem tuż obok."*
* Zapewnij zawsze widoczny, duży przycisk **"Zadzwoń do rodziny"** lub **"Wezwij pomoc (SOS)"**.
