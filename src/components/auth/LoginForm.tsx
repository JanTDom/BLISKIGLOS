"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { loginWithPassword } from "@/lib/auth";
import { AuthSession } from "@/types";

interface LoginFormProps {
  onSuccess?: (session: AuthSession) => void;
  redirectUrl?: string;
  compact?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectUrl, compact = false }) => {
  const [email, setEmail] = useState("opiekun@bliskiglos.pl");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Wprowadź hasło dostępu.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await loginWithPassword(password, email);

    if (result.success && result.session) {
      setSuccess(true);
      if (onSuccess) {
        onSuccess(result.session);
      }
      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 600);
      }
    } else {
      setError(result.error || "Niepoprawne hasło dostępu.");
      setIsLoading(false);
    }
  };

  const handleFillDemoPassword = () => {
    setPassword("A132a132!");
    setError(null);
  };

  return (
    <div className={`w-full ${compact ? "max-w-md" : "max-w-lg"} mx-auto bg-white/95 backdrop-blur-md rounded-3xl border-2 border-amber-200/90 shadow-2xl p-6 sm:p-8 text-stone-900 transition-all`}>
      {/* Nagłówek okna logowania */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-600/30 mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-950 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>Strefa Zabezpieczona</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
          Logowanie do programu
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          Wprowadź hasło autoryzacyjne, aby uzyskać dostęp do panelu i danych seniora.
        </p>
      </div>

      {/* Komunikat o błędzie */}
      {error && (
        <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-sm flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Błąd logowania</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Komunikat o sukcesie */}
      {success && (
        <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-bold">Hasło poprawne! Logowanie do systemu...</span>
        </div>
      )}

      {/* Formularz */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
            Identyfikator / E-mail opiekuna
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 bg-[#FAF7F2]/50 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            placeholder="opiekun@bliskiglos.pl"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Hasło dostępu
            </label>
            <button
              type="button"
              onClick={handleFillDemoPassword}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline flex items-center gap-1"
              title="Wypełnij hasło A132a132!"
            >
              <KeyRound className="w-3 h-3" />
              Użyj hasła: A132a132!
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              autoFocus
              required
              placeholder="Wpisz hasło..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-stone-300 text-stone-900 bg-[#FAF7F2]/50 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-stone-500 hover:text-stone-800 transition-colors"
              aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Wskazówka dotycząca hasła systemowego */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-stone-700 flex items-start gap-2.5">
          <KeyRound className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Dostęp do programu jest chroniony hasłem systemowym: <strong className="font-mono text-amber-950 font-bold bg-amber-200/70 px-1.5 py-0.5 rounded">A132a132!</strong>
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="w-full py-4 px-6 rounded-full bg-amber-600 hover:bg-amber-700 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-base sm:text-lg shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Weryfikacja hasła...
            </span>
          ) : (
            <>
              <span>Zaloguj się do programu</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
