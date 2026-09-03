import { SeniorProfile, SeniorMessage, ReminiscenceStory } from "@/types";

const STORAGE_KEYS = {
  PROFILE: "bliskiglos_profile_v1",
  MESSAGES: "bliskiglos_messages_v1",
  STORIES: "bliskiglos_reminiscences_v1",
};

export const DEFAULT_SENIOR_PROFILE: SeniorProfile = {
  id: "senior_1",
  name: "Pani Maria",
  age: 82,
  companionName: "Pani Krystyna",
  companionVoice: "krystyna",
  fontSize: "large",
  dementiaStage: "mild",
  favoriteTopics: [
    "Wspomnienia z młodości",
    "Ogród i kwiaty",
    "Piosenki Ireny Santor i Mieczysława Fogga",
    "Dawne przepisy kulinarne"
  ],
  specialNotes: "Tęskni za rodzinnym domem. Czasami myli pory dnia, uwielbia spokojne opowieści.",
  familyContact: {
    name: "Anna Kowalska",
    phone: "+48 601 234 567",
    email: "anna.kowalska@przyklad.pl",
    relation: "Córka"
  },
  subscriptionTier: "family_peace",
  subscriptionActive: true,
  streakDays: 8
};

export function getSeniorProfile(): SeniorProfile {
  if (typeof window === "undefined") return DEFAULT_SENIOR_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading senior profile:", e);
  }
  return DEFAULT_SENIOR_PROFILE;
}

export function saveSeniorProfile(profile: SeniorProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.warn("Error saving senior profile:", e);
  }
}

export function getStoredMessages(): SeniorMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading messages:", e);
  }
  return [];
}

export function saveStoredMessages(messages: SeniorMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.warn("Error saving messages:", e);
  }
}

export function getStoredReminiscences(): ReminiscenceStory[] {
  if (typeof window === "undefined") {
    return [
      {
        id: "rem_1",
        title: "Zapach pieczonego chleba w soboty",
        story: "Mama zawsze piekła chleb w piecu kaflowym na zakwasie. Cała wieś pachniała żytnim ciastem, a my jako dzieci czekaliśmy na chrupiącą piętkę z masłem.",
        decadeOrEra: "Lata 50.",
        emotion: "Ciepło i bezpieczeństwo",
        dateExtracted: "Wczoraj"
      },
      {
        id: "rem_2",
        title: "Pierwsza majówka w Parku Łazienkowskim",
        story: "Z mężem Janem poznaliśmy się pod pomnikiem Chopina. Grała orkiestra, a on miał na sobie szary garnitur i kupił mi bukiet konwalii.",
        decadeOrEra: "1964 rok",
        emotion: "Wzruszenie i miłość",
        dateExtracted: "3 dni temu"
      }
    ];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STORIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading reminiscences:", e);
  }
  return [
    {
      id: "rem_1",
      title: "Zapach pieczonego chleba w soboty",
      story: "Mama zawsze piekła chleb w piecu kaflowym na zakwasie. Cała wieś pachniała żytnim ciastem, a my jako dzieci czekaliśmy na chrupiącą piętkę z masłem.",
      decadeOrEra: "Lata 50.",
      emotion: "Ciepło i bezpieczeństwo",
      dateExtracted: "Wczoraj"
    },
    {
      id: "rem_2",
      title: "Pierwsza majówka w Parku Łazienkowskim",
      story: "Z mężem Janem poznaliśmy się pod pomnikiem Chopina. Grała orkiestra, a on miał na sobie szary garnitur i kupił mi bukiet konwalii.",
      decadeOrEra: "1964 rok",
      emotion: "Wzruszenie i miłość",
      dateExtracted: "3 dni temu"
    }
  ];
}

export function saveStoredReminiscences(stories: ReminiscenceStory[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  } catch (e) {
    console.warn("Error saving reminiscences:", e);
  }
}
