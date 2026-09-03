import { NextRequest, NextResponse } from "next/server";
import { FamilyReportDay } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Przykładowe podsumowanie dla opiekuna (lub pobierane z bazy w pełnym wdrożeniu)
  const todayReport: FamilyReportDay = {
    id: "rep_" + Date.now(),
    date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
    talkDurationMinutes: 18,
    moodSummary: "Senior czuł się bezpiecznie i spokojnie. Pięknie wspominał lata młodości i dawne piosenki.",
    emotionalState: "spokojny",
    keyStoriesHeard: [
      "Opowieść o wakacjach na Mazurach w 1965 roku z mężem Janem",
      "Przepis na szarlotkę z cynamonem z rodzinnego domu w Wilnie"
    ],
    healthNotices: [],
    guardianTip: "Mama chętnie wspominała dziś muzykę Ireny Santor. Warto puścić jej tę piosenkę podczas niedzielnych odwiedzin."
  };

  return NextResponse.json({ report: todayReport });
}
