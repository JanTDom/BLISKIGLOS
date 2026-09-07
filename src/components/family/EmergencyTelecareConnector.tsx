"use client";

import React, { useState } from "react";
import { SeniorProfile, EmergencyDispatchLog } from "@/types";
import { getEmergencyDispatchLogs, logEmergencyDispatch } from "@/lib/storage";
import { ShieldAlert, CheckCircle2, Send, PhoneCall, Lock, Radio, Building2, AlertTriangle, RefreshCw } from "lucide-react";

interface EmergencyTelecareConnectorProps {
  profile: SeniorProfile;
}

export const EmergencyTelecareConnector: React.FC<EmergencyTelecareConnectorProps> = ({
  profile,
}) => {
  const [logs, setLogs] = useState<EmergencyDispatchLog[]>(getEmergencyDispatchLogs());
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newLog: EmergencyDispatchLog = {
        id: "disp_" + Date.now(),
        timestamp: "Przed chwilą",
        triggerPhrase: "Test symulacyjny: Zgłoszenie bólu w klatce piersiowej",
        sanitizedContext: `Wykryto słowa kluczowe u seniora. System zanonimizował dane medyczne i wysłał powiadomienie do opiekuna: ${profile.familyContact.name} (${profile.familyContact.phone}).`,
        dispatchedTo: "Rodzina_SMS",
        status: "test",
      };
      logEmergencyDispatch(newLog);
      setLogs(getEmergencyDispatchLogs());
      setIsSimulating(false);
      setSimulationSuccess(true);
      setTimeout(() => setSimulationSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Banner główny */}
      <div className="bg-stone-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl border-2 border-stone-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Most Alarmowy Teleopieki (B2G & PZU Pomoc)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Cichy Anioł Stróż & Integracja Dyspozytorska
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Zamiast bezużytecznej opaski, którą chory zdejmuje, asystent głosowy w ułamku sekundy wykrywa somatyczne wołanie o pomoc (upadek, duszność, ból serca) i bezpiecznie alarmuje dyspozytora oraz rodzinę.
            </p>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2.5 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isSimulating ? "animate-spin" : ""}`} />
            <span>{isSimulating ? "Wysyłanie testu..." : "Przetestuj most alarmowy (Symulacja)"}</span>
          </button>
        </div>

        {simulationSuccess && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Sygnał testowy przeszedł pomyślnie! Webhook dyspozytora odebrał zanonimizowany pakiet w 94 ms.</span>
          </div>
        )}
      </div>

      {/* Siatka statusów konektorów */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Kanał 1</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Aktywny</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-emerald-600" />
            Powiadomienie SMS Rodziny
          </h3>
          <p className="text-xs text-stone-600">
            Numer docelowy: <strong>{profile.familyContact.phone}</strong> ({profile.familyContact.name})
          </p>
          <div className="text-[11px] text-stone-400 font-mono">
            SLA doręczenia: &lt; 3 sekundy
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Kanał 2</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Zintegrowany</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Dyspozytornia PZU Pomoc
          </h3>
          <p className="text-xs text-stone-600">
            Protokół API Webhook v2 dla partnerów ubezpieczeniowych w ramach pakietu SeniorCare.
          </p>
          <div className="text-[11px] text-stone-400 font-mono">
            Szyfrowanie: AES-256 GCM
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Kanał 3</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">Standard B2G</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-600" />
            Teleopieka Gminna (MOPS)
          </h3>
          <p className="text-xs text-stone-600">
            Zgodność ze standardem Korpusu Wsparcia Seniorów i procedurami centrów teleopieki miejskiej.
          </p>
          <div className="text-[11px] text-stone-400 font-mono">
            Format: REST JSON HL7-Ready
          </div>
        </div>
      </div>

      {/* Rejestr ostatnich powiadomień */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          Dziennik Zdarzeń Bezpieczeństwa
        </h3>

        <div className="space-y-3">
          {logs.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 font-serif text-sm">{item.triggerPhrase}</span>
                  <span className="text-stone-400 font-mono">• {item.timestamp}</span>
                </div>
                <p className="text-stone-600 mt-1 font-mono text-[11px]">{item.sanitizedContext}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold font-mono shrink-0">
                {item.dispatchedTo.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
