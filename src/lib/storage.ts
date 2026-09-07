import { 
  SeniorProfile, 
  SeniorMessage, 
  ReminiscenceStory, 
  MemoryGraph, 
  RespiteMetrics, 
  SundowningShieldConfig, 
  EmergencyDispatchLog,
  MemoryGraphNode,
  MemoryGraphEdge
} from "@/types";

const STORAGE_KEYS = {
  PROFILE: "bliskiglos_profile_v1",
  MESSAGES: "bliskiglos_messages_v1",
  STORIES: "bliskiglos_reminiscences_v1",
  MEMORY_GRAPH: "bliskiglos_memory_graph_v1",
  RESPITE: "bliskiglos_respite_metrics_v1",
  SUNDOWNING: "bliskiglos_sundowning_v1",
  EMERGENCY: "bliskiglos_emergency_logs_v1",
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
  streakDays: 8,
  kioskModeEnabled: false,
  sundowningShieldActive: false
};

// Domyślny graf wiedzy (Konstelacja Wspomnień)
export const DEFAULT_MEMORY_GRAPH: MemoryGraph = {
  nodes: [
    { id: "node_kazio", label: "Mąż Kazimierz (Kazio)", type: "osoba", decadeOrEra: "1960–1995", importance: 5, details: "Ukochany mąż, inżynier, zawsze przynosił konwalie w maju." },
    { id: "node_lazienki", label: "Park Łazienkowski", type: "miejsce", decadeOrEra: "1964 rok", importance: 4, details: "Miejsce zaręczyn pod pomnikiem Chopina przy dźwiękach walca." },
    { id: "node_bzy", label: "Zapach bzów i konwalii", type: "kotwica_sensoryczna", decadeOrEra: "Wiosna", importance: 4, details: "Ulubiony zapach z ogrodu rodzinnego, natychmiast uziemia i uspokaja." },
    { id: "node_chleb", label: "Piec kaflowy i chleb", type: "kotwica_sensoryczna", decadeOrEra: "Lata 50.", importance: 5, details: "Ciepła piętka z masłem pieczona przez Mamę w sobotnie poranki." },
    { id: "node_wilno", label: "Wspomnienia z Wilna", type: "miejsce", decadeOrEra: "Dzieciństwo", importance: 3, details: "Ostra Brama i opowieści dziadka o przedwojennych jarmarkach." },
    { id: "node_fogg", label: "Piosenki Fogga i Santor", type: "kotwica_sensoryczna", decadeOrEra: "Lata 60.", importance: 4, details: "Melodia 'Ta ostatnia niedziela' i 'Powrócisz tu'." },
    { id: "node_ogrod", label: "Ogród z piwoniami", type: "miejsce", decadeOrEra: "Całe życie", importance: 4, details: "Sadzenie cebulek tulipanów i doglądanie róż pnących." }
  ],
  edges: [
    { source: "node_kazio", target: "node_lazienki", relation: "oświadczył się w" },
    { source: "node_kazio", target: "node_bzy", relation: "przynosił bukiety" },
    { source: "node_chleb", target: "node_wilno", relation: "receptura rodzinna z" },
    { source: "node_lazienki", target: "node_fogg", relation: "orkiestra grała" },
    { source: "node_ogrod", target: "node_bzy", relation: "kwitły razem w maju" }
  ]
};

// Domyślne metryki wytchnienia opiekuna (FERS / Skala Zarita)
export const DEFAULT_RESPITE_METRICS: RespiteMetrics = {
  weeklyRespiteHours: 11.5,
  zaritBurdenScore: 18,        // ZBI-12 (spadek z 31 przed wdrożeniem BLISKIGLOS)
  previousZaritScore: 31,
  stressReductionPercent: 42,
  caregiverPeaceRating: 4.8
};

// Domyślna konfiguracja Tarczy Zmierzchowej
export const DEFAULT_SUNDOWNING_CONFIG: SundowningShieldConfig = {
  isEnabled: true,
  autoTriggerTime: "16:30",
  colorTemperatureK: 1800,
  vagusFrequencyHz: 0.08,
  ambientSound: "kominek",
  ambientSoundPlaying: false
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
  if (typeof window === "undefined") return [];
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
      dateExtracted: "Wczoraj",
      sensoryAnchors: ["zapach mąki", "skórka chleba", "piec kaflowy"]
    },
    {
      id: "rem_2",
      title: "Pierwsza majówka w Parku Łazienkowskim",
      story: "Z mężem Janem poznaliśmy się pod pomnikiem Chopina. Grała orkiestra, a on miał na sobie szary garnitur i kupił mi bukiet konwalii.",
      decadeOrEra: "1964 rok",
      emotion: "Wzruszenie i miłość",
      dateExtracted: "3 dni temu",
      sensoryAnchors: ["zapach konwalii", "walc Chopina", "szary garnitur"]
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

// ─── KONSTELACJA WSPOMNIEŃ (GRAF WIEDZY) ────────────────────────────────────
export function getMemoryGraph(): MemoryGraph {
  if (typeof window === "undefined") return DEFAULT_MEMORY_GRAPH;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMORY_GRAPH);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading memory graph:", e);
  }
  return DEFAULT_MEMORY_GRAPH;
}

export function saveMemoryGraph(graph: MemoryGraph): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.MEMORY_GRAPH, JSON.stringify(graph));
  } catch (e) {
    console.warn("Error saving memory graph:", e);
  }
}

export function addNodeToMemoryGraph(node: MemoryGraphNode, edge?: MemoryGraphEdge): void {
  const current = getMemoryGraph();
  if (!current.nodes.some(n => n.id === node.id || n.label.toLowerCase() === node.label.toLowerCase())) {
    current.nodes.push(node);
  }
  if (edge) {
    current.edges.push(edge);
  }
  saveMemoryGraph(current);
}

// ─── METRYKI WYTCHNIENIA OPIEKUNA (FERS) ─────────────────────────────────────
export function getRespiteMetrics(): RespiteMetrics {
  if (typeof window === "undefined") return DEFAULT_RESPITE_METRICS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESPITE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading respite metrics:", e);
  }
  return DEFAULT_RESPITE_METRICS;
}

export function saveRespiteMetrics(metrics: RespiteMetrics): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.RESPITE, JSON.stringify(metrics));
  } catch (e) {
    console.warn("Error saving respite metrics:", e);
  }
}

// ─── TARCZA ZMIERZCHOWA (SUNDOWNING) ─────────────────────────────────────────
export function getSundowningConfig(): SundowningShieldConfig {
  if (typeof window === "undefined") return DEFAULT_SUNDOWNING_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUNDOWNING);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading sundowning config:", e);
  }
  return DEFAULT_SUNDOWNING_CONFIG;
}

export function saveSundowningConfig(config: SundowningShieldConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.SUNDOWNING, JSON.stringify(config));
  } catch (e) {
    console.warn("Error saving sundowning config:", e);
  }
}

// ─── LOGI ALARMOWE TELEOPIEKI (PZU / MOPS) ───────────────────────────────────
export function getEmergencyDispatchLogs(): EmergencyDispatchLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EMERGENCY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading emergency logs:", e);
  }
  return [
    {
      id: "disp_1",
      timestamp: "Wczoraj, 18:42",
      triggerPhrase: "Wykryto słowa: upadek / ból nogi",
      sanitizedContext: "Mama zgłosiła trudność z wstaniem z fotela. Stan zweryfikowany przez asystenta, kontakt z córką.",
      dispatchedTo: "Rodzina_SMS",
      status: "potwierdzone"
    }
  ];
}

export function logEmergencyDispatch(log: EmergencyDispatchLog): void {
  if (typeof window === "undefined") return;
  try {
    const current = getEmergencyDispatchLogs();
    localStorage.setItem(STORAGE_KEYS.EMERGENCY, JSON.stringify([log, ...current]));
  } catch (e) {
    console.warn("Error saving emergency dispatch log:", e);
  }
}

