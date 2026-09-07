export type FontSizePreference = "normal" | "large" | "extra-large";

export type DementiaStage = "none" | "mild" | "moderate" | "advanced";

export type CompanionVoiceType = "krystyna" | "stanislaw" | "corka_anna";

export type SeniorMood = 
  | "peaceful"      // Spokojny, pogodny
  | "nostalgic"     // Wspominający, tęskniący
  | "anxious"       // Zaniepokojony, sundowning
  | "confused"      // Zdezorientowany w czasie/miejscu (wymaga walidacji Naomi Feil)
  | "sad"           // Przybity, samotny
  | "alert";        // Zgłoszenie bólu lub kryzysu

export interface SeniorProfile {
  id: string;
  name: string;
  age?: number;
  companionName: string;
  companionVoice: CompanionVoiceType;
  fontSize: FontSizePreference;
  dementiaStage: DementiaStage;
  favoriteTopics: string[];
  specialNotes?: string;
  familyContact: {
    name: string;
    phone: string;
    email: string;
    relation: string;
  };
  subscriptionTier: "trial" | "warm_presence" | "family_peace" | "full_year";
  subscriptionActive: boolean;
  streakDays: number;
  kioskModeEnabled?: boolean;
  sundowningShieldActive?: boolean;
}

export interface SeniorMessage {
  id: string;
  sender: "senior" | "companion";
  text: string;
  timestamp: string;
  moodContext?: SeniorMood;
  isAudioPlaying?: boolean;
  crisisFlag?: boolean;
  hesitationScore?: number; // 0.0 - 1.0 (biomarker pauzy)
  emotionalArousal?: number; // 0.0 - 1.0 (pobudzenie/stres)
}

export interface ReminiscenceStory {
  id: string;
  title: string;
  story: string;
  decadeOrEra?: string; // np. "Lata 60.", "Młodość w Krakowie"
  emotion: string;
  dateExtracted: string;
  sensoryAnchors?: string[]; // np. ["zapach chleba", "melodia Fogga"]
}

// ─── FILAR 1: BIOMARKERY MOWY I WSKAŹNIK WITALNOŚCI POZNAWCZEJ (NCBR B+R) ───
export interface AcousticBiomarkers {
  hesitationScore: number;       // 0 - 100 (częstotliwość i długość mikropauz)
  agitationLevel: "low" | "moderate" | "elevated";
  lexicalRichness: number;      // 0 - 100 (różnorodność słownictwa)
  speechCoherence: number;      // 0 - 100 (spójność tematyczna wątków)
  nounToPronounRatio: number;   // wskaźnik afazji amnestycznej (zastępowanie rzeczowników zaimkami)
}

export interface CognitiveVitalityIndex {
  cviScore: number;             // 0 - 100 (ogólny indeks witalności)
  trend: "stabilny" | "lekki_spadek" | "poprawa" | "wymaga_konsultacji";
  weeklyAverageTalkMinutes: number;
  repetitionFrequency: number;  // wskaźnik pętli pamięciowych
  lastEvaluatedDate: string;
}

// ─── FILAR 2: KONSTELACJA WSPOMNIEŃ / GRAF WIEDZY (REMINISCENCE GRAPH) ──────
export type MemoryNodeType = "osoba" | "miejsce" | "kotwica_sensoryczna" | "wydarzenie" | "emocja";

export interface MemoryGraphNode {
  id: string;
  label: string;
  type: MemoryNodeType;
  decadeOrEra?: string;
  importance: number; // 1 - 5 (wielkość węzła w konstelacji)
  details: string;
}

export interface MemoryGraphEdge {
  source: string;
  target: string;
  relation: string; // np. "kochała", "mieszkała w", "pamięta zapach"
}

export interface MemoryGraph {
  nodes: MemoryGraphNode[];
  edges: MemoryGraphEdge[];
}

// ─── FILAR 3: TARCZA ZMIERZCHOWA (ANTI-SUNDOWNING BIO-SHIELD) ───────────────
export interface SundowningShieldConfig {
  isEnabled: boolean;
  autoTriggerTime: string; // np. "16:30"
  colorTemperatureK: number; // np. 1800 (ciepły bursztyn)
  vagusFrequencyHz: number; // np. 0.08 Hz (uspokojenie nerwu błędnego)
  ambientSound: "kominek" | "las_szum" | "retro_radio" | "brak";
  ambientSoundPlaying: boolean;
}

// ─── FILAR 4: MIERNIK WYTCHNIENIA OPIEKUNA (FERS & SKALA ZARITA) ────────────
export interface RespiteMetrics {
  weeklyRespiteHours: number;    // Zaoszczędzone godziny dla opiekuna
  zaritBurdenScore: number;      // Skala Zarita ZBI-12 (0 - 48, im mniej tym lepiej)
  previousZaritScore: number;
  stressReductionPercent: number;
  caregiverPeaceRating: number;  // 1 - 5
}

// ─── FILAR 5: MOST ALARMOWY TELEOPIEKI (PZU / MOPS / 112) ───────────────────
export interface EmergencyDispatchLog {
  id: string;
  timestamp: string;
  triggerPhrase: string;
  sanitizedContext: string;
  dispatchedTo: "PZU_Pomoc" | "MOPS_Teleopieka" | "Rodzina_SMS" | "Krajowy_112";
  status: "potwierdzone" | "w_trakcie" | "test";
}

export interface FamilyReportDay {
  id: string;
  date: string;
  talkDurationMinutes: number;
  moodSummary: string;
  emotionalState: "bardzo_dobry" | "spokojny" | "nostalgiczny" | "wymaga_uwagi";
  keyStoriesHeard: string[];
  healthNotices: string[];
  guardianTip: string;
  cviIndex?: CognitiveVitalityIndex;
}

export interface ChatApiSeniorResponse {
  reply: string;
  moodContext: SeniorMood;
  crisisFlag: boolean;
  crisisReason?: string;
  extractedReminiscence?: {
    title: string;
    story: string;
    decadeOrEra?: string;
    emotion: string;
    sensoryAnchors?: string[];
  } | null;
  extractedGraphNodes?: MemoryGraphNode[];
  extractedGraphEdges?: MemoryGraphEdge[];
  biomarkers?: AcousticBiomarkers;
  healthAlert?: string | null;
}

export interface AuthUser {
  email: string;
  name: string;
  role: "guardian" | "admin";
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

// ─── FILAR 6: KOORDYNATOR GMINNY B2G / MOPS / DPS (FERS DEINSTYTUCJONALIZACJA) 
export interface GminaSeniorRecord {
  id: string;
  name: string;
  age: number;
  addressDistrict: string;
  lastContact: string; // np. "Dzisiaj, 11:20"
  status: "bezpieczny" | "uwaga" | "krytyczny";
  riskReason?: string;
  cviTrend: "stabilny" | "spadek" | "wzrost";
  hoursSinceLastTalk: number;
  assignedSocialWorker: string;
}

// ─── FILAR 7: KWESTIONARIUSZ ZARITA (ZBI-12) ───────────────────────────────
export interface ZaritQuestionItem {
  id: number;
  question: string;
  selectedScore: number; // 0 - Nigdy, 1 - Rzadko, 2 - Czasem, 3 - Dosyć często, 4 - Prawie zawsze
}

