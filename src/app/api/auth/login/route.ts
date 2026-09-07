import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AuthSession, AuthUser } from "@/types";

const LoginRequestSchema = z.object({
  password: z.string().min(1, "Hasło jest wymagane"),
  email: z.string().email().optional().default("opiekun@bliskiglos.pl"),
});

// Hasło systemowe wskazane przez użytkownika
const VALID_PASSWORD = process.env.BLISKIGLOS_APP_PASSWORD || "A132a132!";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = LoginRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane logowania.", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { password, email } = parseResult.data;

    // Bezpieczne sprawdzenie hasła
    if (password !== VALID_PASSWORD) {
      return NextResponse.json(
        { error: "Niepoprawne hasło dostępu. Upewnij się, że wpisujesz właściwe znaki." },
        { status: 401 }
      );
    }

    const user: AuthUser = {
      email,
      name: email === "opiekun@bliskiglos.pl" ? "Opiekun Rodzinny" : email.split("@")[0],
      role: "guardian",
    };

    const session: AuthSession = {
      user,
      token: "sess_" + Buffer.from(`${email}:${Date.now()}`).toString("base64"),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 dni
    };

    const response = NextResponse.json({
      success: true,
      message: "Zalogowano pomyślnie.",
      session,
    });

    // Ustawienie ciasteczka sesyjnego
    response.cookies.set({
      name: "bliskiglos_session",
      value: JSON.stringify(session),
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera podczas logowania." },
      { status: 500 }
    );
  }
}
