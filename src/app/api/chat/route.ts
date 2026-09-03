import { NextRequest, NextResponse } from "next/server";
import { buildSeniorCompanionSystemPrompt, detectSeniorCrisis } from "@/lib/geriatric-psychology";
import { SeniorProfile, ChatApiSeniorResponse } from "@/types";

export const dynamic = "force-dynamic";

function cleanForSpeech(text: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/#+/g, "")
    .replace(/(?:^|\n|\s+)[*\-+•]\s+/g, " ")
    .replace(/(?:^|\n|\s+)\d+\.\s+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, ", ")
    .replace(/[""„”]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message, profile, history = [] } = body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Brak klucza OPENAI_API_KEY" }, { status: 503 });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Brak wiadomości" }, { status: 400 });
    }

    const seniorProfile: SeniorProfile = profile || {
      id: "demo_senior",
      name: "Pani Maria",
      age: 83,
      companionName: "Pani Krystyna",
      companionVoice: "krystyna",
      fontSize: "large",
      dementiaStage: "mild",
      favoriteTopics: ["Młodość", "Ogród", "Dawne piosenki", "Gotowanie"],
      familyContact: {
        name: "Anna (Córka)",
        phone: "+48 600 000 000",
        email: "anna@przyklad.pl",
        relation: "Córka"
      },
      subscriptionTier: "family_peace",
      subscriptionActive: true,
      streakDays: 14
    };

    // 1. Sprawdzenie kryzysowe (somatyczne i psychiczne)
    const crisisCheck = detectSeniorCrisis(message);

    // 2. Budowa promptu geriatryczno-terapeutycznego
    const systemPrompt = buildSeniorCompanionSystemPrompt(seniorProfile);

    // 3. Kontekst ostatnich wypowiedzi (maksymalnie 6 ostatnich wiadomości, by nie przeładowywać)
    const formattedHistory = (history || []).slice(-6).map((m: any) => ({
      role: m.sender === "senior" ? "user" : "assistant",
      content: m.text,
    }));

    const responseSchemaPrompt = `
ODPOWIEDZ WYŁĄCZNIE W FORMACIE JSON o następującej strukturze:
{
  "reply": "Twoja ciepła, spokojna odpowiedź do seniora (dokładnie 2-3 zdania, 1 łagodne pytanie na końcu, zero markdown)",
  "moodContext": "peaceful" | "nostalgic" | "anxious" | "confused" | "sad" | "alert",
  "extractedReminiscence": null LUB {
    "title": "Krótki tytuł wspomnienia (np. Zapach chleba w rodzinnym domu)",
    "story": "Co dokładnie senior opowiedział o swojej przeszłości",
    "decadeOrEra": "np. Lata 50. / Dzieciństwo na wsi",
    "emotion": "Wzruszenie i radość"
  },
  "healthAlert": null LUB "Krótki opis jeśli senior wspomniał o złym samopoczuciu, bólu lub osłabieniu"
}
`;

    const openAiMessages = [
      { role: "system", content: systemPrompt + "\n\n" + responseSchemaPrompt },
      ...formattedHistory,
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openAiMessages,
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI API error:", err);
      return NextResponse.json({ error: "Błąd OpenAI API" }, { status: 502 });
    }

    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: "Jestem przy Tobie, słucham Cię uważnie.",
        moodContext: "peaceful",
        extractedReminiscence: null,
        healthAlert: null,
      };
    }

    const finalReply = cleanForSpeech(parsed.reply || "Jestem przy Pani. Proszę opowiadać dalej.");

    const payload: ChatApiSeniorResponse = {
      reply: finalReply,
      moodContext: crisisCheck.isCrisis ? "alert" : (parsed.moodContext || "peaceful"),
      crisisFlag: crisisCheck.isCrisis,
      crisisReason: crisisCheck.reason,
      extractedReminiscence: parsed.extractedReminiscence || null,
      healthAlert: parsed.healthAlert || (crisisCheck.isCrisis ? crisisCheck.reason : null),
    };

    return NextResponse.json(payload);
  } catch (err: any) {
    console.error("Senior chat route error:", err);
    return NextResponse.json({ error: err.message || "Błąd wewnętrzny serwera" }, { status: 500 });
  }
}
