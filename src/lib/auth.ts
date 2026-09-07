"use client";

import { AuthSession } from "@/types";

const SESSION_KEY = "bliskiglos_session";
const AUTH_EVENT = "bliskiglos_auth_change";

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Sprawdzenie w localStorage
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const session: AuthSession = JSON.parse(raw);
      if (session.expiresAt && session.expiresAt > Date.now()) {
        return session;
      }
      localStorage.removeItem(SESSION_KEY);
    }

    // 2. Fallback ze sprawdzeniem cookie
    const cookies = document.cookie.split(";");
    for (const c of cookies) {
      const [k, v] = c.trim().split("=");
      if (k === SESSION_KEY && v) {
        const decoded = decodeURIComponent(v);
        const session: AuthSession = JSON.parse(decoded);
        if (session.expiresAt && session.expiresAt > Date.now()) {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          return session;
        }
      }
    }
  } catch (e) {
    console.warn("Błąd odczytu sesji logowania:", e);
  }

  return null;
}

export function isAuthenticated(): boolean {
  return getAuthSession() !== null;
}

export async function loginWithPassword(
  password: string,
  email: string = "opiekun@bliskiglos.pl"
): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: data.error || "Błędne hasło dostępu.",
      };
    }

    const session: AuthSession = data.session;
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: session }));
    }

    return { success: true, session };
  } catch (error) {
    console.error("Błąd zapytania logowania:", error);
    return {
      success: false,
      error: "Wystąpił problem z połączeniem. Spróbuj ponownie.",
    };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (e) {
    console.warn("Błąd żądania wylogowania:", e);
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
      document.cookie = `${SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: null }));
    }
  }
}

export function onAuthChange(callback: (session: AuthSession | null) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const custom = e as CustomEvent<AuthSession | null>;
    callback(custom.detail ?? null);
  };

  window.addEventListener(AUTH_EVENT, handler);
  window.addEventListener("storage", (e) => {
    if (e.key === SESSION_KEY) {
      callback(getAuthSession());
    }
  });

  return () => {
    window.removeEventListener(AUTH_EVENT, handler);
  };
}
