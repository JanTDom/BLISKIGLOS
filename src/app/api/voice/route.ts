import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Mapowanie dedykowanych głosów lektorskich dla Seniorów (ciepłe, powolne, wyraźna artykulacja)
const ELEVENLABS_SENIOR_VOICES: Record<string, string> = {
  krystyna: "xJQ0EWXEICoCWK3Ld1Ew", // Agata - ciepła, serdeczna, cierpliwa polska lektorka
  stanislaw: "8qCMI2ZZW5ZGwmg0lM1l", // Paweł Siwek - głęboki, uziemiający, szarmancki głos radiowy
  agata: "xJQ0EWXEICoCWK3Ld1Ew",
  maciej: "8qCMI2ZZW5ZGwmg0lM1l",
  nova: "xJQ0EWXEICoCWK3Ld1Ew",
  echo: "8qCMI2ZZW5ZGwmg0lM1l",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { text, voice = "krystyna" } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Brak tekstu do syntezy" }, { status: 400 });
    }

    const cleanText = text.trim();
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    // 1. ElevenLabs Multilingual v2 z dedykowanymi parametrami geriatrycznymi (stabilność i ciepło)
    if (elevenLabsKey) {
      try {
        const voiceId = ELEVENLABS_SENIOR_VOICES[voice] || ELEVENLABS_SENIOR_VOICES["krystyna"];
        const elevenRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128&optimize_streaming_latency=3`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": elevenLabsKey,
            },
            body: JSON.stringify({
              text: cleanText,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.78, // Wyjątkowo wysoka stabilność: brak nagłych skoków, kojący ton
                similarity_boost: 0.88,
                style: 0.05,
                use_speaker_boost: true,
              },
            }),
          }
        );

        if (elevenRes.ok) {
          const audioBuffer = await elevenRes.arrayBuffer();
          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg",
              "Content-Length": audioBuffer.byteLength.toString(),
              "x-voice-engine": "ElevenLabs-SeniorCare-Polish",
            },
          });
        }
      } catch (elevenErr) {
        console.warn("ElevenLabs TTS warning, falling back to OpenAI:", elevenErr);
      }
    }

    // 2. Niezawodny Fallback: OpenAI TTS-1-HD ze zwolnionym tempem 0.90x dla seniora
    if (openAiKey) {
      const openAiVoice = (voice === "stanislaw" || voice === "maciej" || voice === "echo") ? "echo" : "nova";

      const res = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "tts-1-hd",
          input: cleanText,
          voice: openAiVoice,
          response_format: "mp3",
          speed: 0.90, // Wolniejsze tempo: ułatwia odbiór osobom starszym i niedosłyszącym
        }),
      });

      if (res.ok) {
        const audioBuffer = await res.arrayBuffer();
        return new NextResponse(audioBuffer, {
          status: 200,
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Length": audioBuffer.byteLength.toString(),
            "x-voice-engine": "OpenAI-TTS1-HD-SeniorSpeed",
          },
        });
      }
    }

    return NextResponse.json({ error: "Brak dostępnego silnika audio" }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Błąd serwera audio" }, { status: 500 });
  }
}
