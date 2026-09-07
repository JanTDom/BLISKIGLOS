import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { AppAuthGate } from "@/components/auth/AppAuthGate";
import { AuthSession } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "BliskiGłos.pl — Terapeutyczny Towarzysz Seniora w Samotności",
  description: "Ciepły, polski głos AI, Terapia Walidacyjna Naomi Feil dla osób z demencją, Hands-Free Live Voice oraz bezpieczny portal dla rodziny.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BliskiGłos",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialSession: AuthSession | null = null;
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("bliskiglos_session");
    if (sessionCookie?.value) {
      const parsed = JSON.parse(sessionCookie.value);
      if (parsed?.expiresAt && parsed.expiresAt > Date.now()) {
        initialSession = parsed;
      }
    }
  } catch {
    // Brak aktywnej sesji
  }

  return (
    <html lang="pl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Plus+Jakarta+Sans:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF7F2] text-stone-900 min-h-screen antialiased font-sans">
        <AppAuthGate initialSession={initialSession}>
          {children}
        </AppAuthGate>
      </body>
    </html>
  );
}

