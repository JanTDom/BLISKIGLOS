import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Wylogowano pomyślnie.",
  });

  response.cookies.delete("bliskiglos_session");

  return response;
}
