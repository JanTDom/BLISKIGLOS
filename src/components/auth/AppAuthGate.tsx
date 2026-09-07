"use client";

import React, { useState, useEffect } from "react";
import { AuthSession } from "@/types";
import { getAuthSession, onAuthChange } from "@/lib/auth";
import { LoginForm } from "@/components/auth/LoginForm";

interface AppAuthGateProps {
  children: React.ReactNode;
  initialSession?: AuthSession | null;
}

export function AppAuthGate({ children, initialSession = null }: AppAuthGateProps) {
  const [session, setSession] = useState<AuthSession | null>(initialSession);
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
    // Sprawdzamy sesję z localStorage / cookies
    const current = getAuthSession();
    if (current) {
      setSession(current);
    }

    const unsubscribe = onAuthChange((newSession) => {
      setSession(newSession);
    });

    return () => unsubscribe();
  }, []);

  // Dopóki użytkownik nie jest zalogowany: wyświetlamy TYLKO okno logowania i nic poza tym!
  if (!session) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col items-center justify-center p-4 sm:p-6 relative selection:bg-amber-200">
        {/* Ciepła ambientowa poświata */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/50 via-[#FAF7F2] to-[#FAF7F2]" />

        {/* Centralne okno logowania */}
        <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-300">
          <LoginForm onSuccess={(newSession) => setSession(newSession)} />
        </div>
      </div>
    );
  }

  // Po zalogowaniu: odblokowany pełny program
  return <>{children}</>;
}
