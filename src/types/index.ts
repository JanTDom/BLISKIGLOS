export type FontSizePreference = "normal" | "large" | "extra-large";

export type DementiaStage = "none" | "mild" | "moderate" | "advanced";

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
  companionVoice: "krystyna" | "stanislaw";
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
}

export interface SeniorMessage {
  id: string;
  sender: "senior" | "companion";
  text: string;
  timestamp: string;
  moodContext?: SeniorMood;
  isAudioPlaying?: boolean;
  crisisFlag?: boolean;
}

export interface ReminiscenceStory {
  id: string;
  title: string;
  story: string;
  decadeOrEra?: string; // np. "Lata 60.", "Młodość w Krakowie"
  emotion: string;
  dateExtracted: string;
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
  } | null;
  healthAlert?: string | null;
}
