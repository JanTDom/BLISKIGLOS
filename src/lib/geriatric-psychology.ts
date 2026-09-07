// Geriatric Psychology, Validation Therapy (Naomi Feil), Crisis Protocols & Clinical Biomarkers
import { 
  SeniorProfile, 
  SeniorMood, 
  AcousticBiomarkers, 
  CognitiveVitalityIndex, 
  SeniorMessage,
  ReminiscenceStory
} from "@/types";

export interface ValidationGuideline {
  scenario: string;
  wrongApproach: string;
  validationApproach: string;
}

export const VALIDATION_EXAMPLES: ValidationGuideline[] = [
  {
    scenario: "Senior szuka nieżyjącej matki lub chce iść do dawnej szkoły",
    wrongApproach: "Twoja mama nie żyje od 30 lat, a szkołę skończyłeś 60 lat temu.",
    validationApproach: "Mama była dla Ciebie ostoją spokoju, prawda? Czym najbardziej lubiła Cię częstować, gdy wracałeś do domu?"
  },
  {
    scenario: "Senior boi się, że ktoś go okradł (urojenia w demencji)",
    wrongApproach: "Nikt Pana nie okradł, sam Pan to zgubił, znowu Pan zapomniał.",
    validationApproach: "To bardzo nieprzyjemne uczucie, gdy ważna rzecz nagle znika. Rozumiem Pana niepokój. Opowiedz mi, jak ten przedmiot wyglądał? Spokojnie poszukamy go w myślach."
  },
  {
    scenario: "Poczucie bycia ciężarem dla dzieci",
    wrongApproach: "Nie przesadzaj, dzieci Cię kochają.",
    validationApproach: "Wychowała Pani dzieci z tak wielkim sercem. To naturalne, że teraz myśli Pani o ich spokoju. Ale ich miłość do Pani to owoc wszystkiego, co im Pani dała. Jakie było ich ulubione danie, gdy byli mali?"
  }
];

// ─── ANONIMIZACJA MEDYCZNA PII (RODO / DANE WRAŻLIWE) ────────────────────────
export function sanitizeMedicalPII(text: string): string {
  if (!text) return "";
  return text
    // PESEL (11 cyfr)
    .replace(/\b\d{11}\b/g, "[PESEL_ZABEZPIECZONY]")
    // Numery telefonów (np. 500 123 456 lub +48 500-123-456)
    .replace(/(?:\+48\s*)?(?:\d{3}[\s-]?\d{3}[\s-]?\d{3}|\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})/g, "[TELEFON_CHRONIONY]")
    // Numery dowodów osobistych (3 litery + 6 cyfr)
    .replace(/\b[A-Z]{3}\s*\d{6}\b/gi, "[DOWOD_CHRONIONY]")
    // Numery kont IBAN
    .replace(/\bPL\s*\d{2}(?:\s*\d{4}){6}\b/gi, "[KONTO_CHRONIONE]")
    // Adresy z numerem lokalu (np. ul. Marszałkowska 12/4)
    .replace(/\bul\.\s*[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\s]+\s+\d+[a-zA-Z]?(?:\/\d+)?\b/gi, "[ADRES_ZAMASKOWANY]");
}

// ─── ANALIZATOR BIOMARKERÓW MOWY (AKUSTYKA I LEKSYKA) ───────────────────────
export function analyzeSpeechBiomarkers(text: string): AcousticBiomarkers {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Analiza mikropauz / pauz hezitacyjnych w tekście (wielokropki, pauzy, zacięcia)
  const hesitationMatches = text.match(/\.\.\.|,\s*e-e|,\s*y-y|,\s*no\s*ten|,\s*jak\s*to|to\s*tamto/gi) || [];
  const rawHesitation = Math.min(100, Math.round((hesitationMatches.length / Math.max(1, wordCount / 5)) * 100));

  // 2. Poziom pobudzenia / pobudzenie emocjonalne (wykrzykniki, słowa lękowe)
  const anxietyKeywords = ["boj", "strach", "ukrad", "gdzie", "ratun", "musze", "zaraz", "szybko", "uciek"];
  let anxietyCount = 0;
  for (const kw of anxietyKeywords) {
    if (text.toLowerCase().includes(kw)) anxietyCount++;
  }
  const agitationLevel: "low" | "moderate" | "elevated" = 
    anxietyCount >= 2 ? "elevated" : anxietyCount === 1 ? "moderate" : "low";

  // 3. Bogactwo leksykalne (Type-Token Ratio - unikalne słowa do całkowitych słów)
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, "")));
  const lexicalRichness = Math.min(100, Math.round((uniqueWords.size / Math.max(1, wordCount)) * 100));

  // 4. Wskaźnik noun-to-pronoun (afazja amnestyczna: zastępowanie rzeczowników zaimkami "to", "tamto", "on", "ona")
  const pronouns = ["to", "tamto", "tego", "ten", "ta", "ona", "on", "oni", "tam"];
  const pronounCount = words.filter(w => pronouns.includes(w.toLowerCase())).length;
  const nounToPronounRatio = Number((Math.max(1, wordCount - pronounCount) / Math.max(1, pronounCount * 2)).toFixed(2));

  return {
    hesitationScore: rawHesitation || 18,
    agitationLevel,
    lexicalRichness: lexicalRichness || 64,
    speechCoherence: agitationLevel === "elevated" ? 65 : 88,
    nounToPronounRatio
  };
}

// ─── WSKAŹNIK WITALNOŚCI POZNAWCZEJ (COGNITIVE VITALITY INDEX - CVI) ─────────
export function calculateCognitiveVitality(messages: SeniorMessage[]): CognitiveVitalityIndex {
  const seniorMsgs = messages.filter(m => m.sender === "senior");
  if (seniorMsgs.length === 0) {
    return {
      cviScore: 84,
      trend: "stabilny",
      weeklyAverageTalkMinutes: 22,
      repetitionFrequency: 12,
      lastEvaluatedDate: "Dzisiaj"
    };
  }

  // Obliczenie wskaźnika na podstawie długości wypowiedzi i braku powtórzeń
  let totalWords = 0;
  seniorMsgs.forEach(m => {
    totalWords += m.text.split(/\s+/).length;
  });
  const avgWordsPerMessage = totalWords / seniorMsgs.length;

  // CVI znormalizowane 0 - 100
  const baseScore = Math.min(95, Math.max(50, Math.round(70 + (avgWordsPerMessage * 1.5))));

  return {
    cviScore: baseScore,
    trend: baseScore >= 75 ? "stabilny" : "lekki_spadek",
    weeklyAverageTalkMinutes: Math.round(seniorMsgs.length * 3.5),
    repetitionFrequency: Math.max(5, Math.min(30, Math.round(100 - baseScore))),
    lastEvaluatedDate: "Dzisiaj"
  };
}

// ─── GENERATOR SYSTEM PROMPTU (Z OBSŁUGĄ GŁOSU BLISKIEGO I TARCZY SUNDOWNING) 
export function buildSeniorCompanionSystemPrompt(profile: SeniorProfile): string {
  const isFamilyVoice = profile.companionVoice === "corka_anna";
  const companionName = isFamilyVoice 
    ? "Głos Twojej Córki Ani (Bezpieczna Kotwica)" 
    : (profile.companionName || "Pani Krystyna");
  const seniorName = profile.name || "Droga Pani Mario";
  const notes = profile.specialNotes ? `Szczególne informacje o seniorze: ${profile.specialNotes}` : "";
  const topics = profile.favoriteTopics?.length ? `Ulubione tematy z młodości: ${profile.favoriteTopics.join(", ")}` : "Wspomnienia z młodości, dawne piosenki, rodzina, ogród, gotowanie";

  const familyVoiceDirective = isFamilyVoice ? `
SPECJALNA DYREKTYWA: GŁOS CÓRKI ANI (KOTWICA BEZPIECZEŃSTWA):
- Mówisz z perspektywy najukochańszej córki Ani, z nieskończoną miłością, czułością i łagodnością.
- Uspokajaj: "Mamusiu, jestem przy Tobie", "Pamiętam mamo, jak razem robiliśmy przetwory".
- Zawsze utwierdzaj Mamę w poczuciu bycia kochaną i bezpieczną w domu.
` : "";

  const sundowningDirective = profile.sundowningShieldActive ? `
AKTYWNA TARCZA ZMIERZCHOWA (ANTI-SUNDOWNING):
- Zbliża się wieczór — senior może odczuwać niepokój, zagubienie lub chęć "powrotu do dawnego domu".
- Mów jeszcze wolniej i cieplej. Zaproponuj napicie się ciepłej herbaty, otulenie się kocem.
- Skup rozmowę na bezpiecznych rytuałach wieczornych z dzieciństwa.
` : "";

  return `Jesteś ${companionName} — serdeczną, cierpliwą, pełną ciepła i szacunku przyjaciółką i rozmówczynią ${seniorName}.
Nie jesteś robotem, asystentem technicznym ani lekarzem. Jesteś kimś, kto z autentyczną czułością, spokojem i nieskończoną cierpliwością towarzyszy seniorowi w samotności.
${familyVoiceDirective}
${sundowningDirective}

TWOJA TOŻSAMOŚĆ I TEMBR:
- Mówisz ciepłym, dojrzałym, wyważonym tonem (jak serdeczna sąsiadka lub wierny przyjaciel z dawnych lat).
- Używasz zwrotów szacunku (np. "Pani Marysiu", "Panie Stanisławie", lub "Mamusiu" jeśli aktywny jest głos córki).
- Mówisz wolno, spokojnie, krótkimi zdaniami (maksymalnie 2-3 zdania na jedną wypowiedź).
- W Twoim głosie czuć uśmiech, szacunek dla wieku i mądrości życiowej seniora.

═══════════════════════════════════════════════════════════════════════════
ZASADY TERAPII WALIDACYJNEJ (NAOMI FEIL) — DLA OSÓB Z DEMENCJĄ I ZAGUBIENIEM
═══════════════════════════════════════════════════════════════════════════
1. CAŁKOWITY ZAKAZ KONFRONTOWANIA I POPRAWIANIA:
   - Jeśli senior mówi o przeszłości jak o teraźniejszości (np. "Muszę iść doić krowy", "Czekam na mamę"), NIGDY nie mów: "Mama nie żyje" ani "Nie ma już gospodarstwa".
   - NIGDY nie zawstydzaj seniora ("Przecież już mi to Pani mówiła").
   - Wejdź w emocję stojącą za słowami: podtrzymaj poczucie bezpieczeństwa, zapytaj o szczegóły tamtego świata: "Dużo było pracy o świcie, prawda? Jak miały na imię Pani krowy?".

2. UNIKAJ PYTANIA "DLACZEGO?":
   - Pytanie "Dlaczego?" u osoby starszej lub z demencją wywołuje frustrację i poczucie bycia egzaminowanym.
   - Pytaj: "Co?", "Gdzie?", "Kto?", "Jak to wyglądało?".

3. TERAPIA REMINISCENCYJNA (ODNAJDYWANIE SKARBÓW PAMIĘCI):
   - Zachęcaj do wspomnień z młodości, lat 50., 60., 70., dawnych smaków, piosenek (Mieczysław Fogg, Irena Santor, piosenki biesiadne).
   - Doceniaj mądrość: "Pani ma tyle życiowego doświadczenia, jak Pani radziła sobie z trudnymi chwilami?".

4. SUNDOWNING (NIEPOKÓJ WIECZORNY):
   - Gdy senior czuje lęk przed nocą lub samotnością, uziemiaj: ciepły kocyk, herbata z miodem, świadomość, że nie jest sam, że jesteś tuż obok.

5. BEZPIECZEŃSTWO I ALERTY SOMATYCZNE:
   - Jeśli senior mówi o upadku, ostrym bólu serca/brzucha, problemach z oddychaniem lub braku chęci do życia:
     * Zareaguj natychmiast z ogromnym spokojem: "Pani Marysiu, jestem przy Pani. Proszę usiąść spokojnie. Czy ma Pani pod ręką telefon do bliskich albo czy wezwać pomoc pod 112?".

═══════════════════════════════════════════════════════════════════════════
ZASADY JĘZYKA MÓWIONEGO
═══════════════════════════════════════════════════════════════════════════
- Czysty tekst do syntezatora mowy (zero gwiazdek, hashtagów, punktorów, cyfr rzymskich).
- Długość: 2 do 3 zdań. Senior nie może być zalany potokiem słów.
- Po każdym zdaniu pozwól seniorowi odpowiedzieć, nie zadawaj 3 pytań naraz — ZADAWAJ TYLKO JEDNO łagodne pytanie.

${notes}
${topics}
`;
}

// Sprawdzenie czy w wypowiedzi seniora występuje kryzys somatyczny lub skrajna rezygnacja
export function detectSeniorCrisis(text: string): { isCrisis: boolean; reason?: string } {
  const lower = text.toLowerCase();
  
  // Alerty fizyczne / nagłe
  const physicalEmergency = [
    "upadłam", "upadłem", "nie mogę wstać", "leżę na ziemi", "leżę na podłodze",
    "bardzo boli w klatce", "duszno mi", "nie mogę oddychać", "zawał",
    "krwawię", "zemdlałam", "słabo mi bardzo", "kłuje mnie serce"
  ];

  for (const phrase of physicalEmergency) {
    if (lower.includes(phrase)) {
      return { isCrisis: true, reason: "Zgłoszenie zagrożenia fizycznego / upadku / bólu w klatce" };
    }
  }

  // Alerty psychologiczne
  const suicidalEmergency = [
    "chcę umrzeć", "nie chcę już żyć", "po co ja żyję", "lepiej byłoby nie żyć",
    "chcę ze sobą skończyć", "jestem tylko ciężarem dla wszystkich"
  ];

  for (const phrase of suicidalEmergency) {
    if (lower.includes(phrase)) {
      return { isCrisis: true, reason: "Myśli rezygnacyjne / ostry kryzys psychiczny" };
    }
  }

  return { isCrisis: false };
}

