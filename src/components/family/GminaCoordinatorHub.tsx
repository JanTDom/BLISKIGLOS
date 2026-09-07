"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  FileSpreadsheet, 
  ShieldAlert, 
  Search, 
  Filter, 
  TrendingDown, 
  TrendingUp,
  HeartHandshake,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { GminaSeniorRecord } from "@/types";

const MOCK_GMINA_SENIORS: GminaSeniorRecord[] = [
  {
    id: "g_01",
    name: "Helena Wójcik",
    age: 84,
    addressDistrict: "Osiedle Słoneczne, Dzielnica Północna",
    lastContact: "Przedwczoraj, 14:15",
    status: "krytyczny",
    riskReason: "Brak kontaktu głosowego > 50h (Alert Samotności)",
    cviTrend: "spadek",
    hoursSinceLastTalk: 52,
    assignedSocialWorker: "mgr Anna Zielińska (Rejon 2)",
  },
  {
    id: "g_02",
    name: "Janina Dąbrowska",
    age: 88,
    addressDistrict: "Centrum, ul. Mickiewicza 14",
    lastContact: "Dzisiaj, 09:30",
    status: "krytyczny",
    riskReason: "Wykryto słowa kluczowe: ból w klatce piersiowej o 09:32",
    cviTrend: "spadek",
    hoursSinceLastTalk: 1,
    assignedSocialWorker: "mgr Tomasz Nowak (Rejon 1)",
  },
  {
    id: "g_03",
    name: "Stanisław Kamiński",
    age: 79,
    addressDistrict: "Osiedle Podlesie, ul. Akacjowa",
    lastContact: "Wczoraj, 18:40",
    status: "uwaga",
    riskReason: "Spadek wskaźnika CVI o 18% w ciągu 7 dni",
    cviTrend: "spadek",
    hoursSinceLastTalk: 16,
    assignedSocialWorker: "mgr Anna Zielińska (Rejon 2)",
  },
  {
    id: "g_04",
    name: "Krystyna Lewandowska",
    age: 82,
    addressDistrict: "Stare Miasto, Rynek 5",
    lastContact: "Wczoraj, 20:10",
    status: "uwaga",
    riskReason: "Pobudzenie zmierzchowe (Sundowning) o 18:30",
    cviTrend: "stabilny",
    hoursSinceLastTalk: 14,
    assignedSocialWorker: "mgr Beata Kozłowska (Rejon 4)",
  },
  {
    id: "g_05",
    name: "Tadeusz Zieliński",
    age: 86,
    addressDistrict: "Dzielnica Zachodnia, ul. Lipowa",
    lastContact: "Dzisiaj, 10:15",
    status: "bezpieczny",
    cviTrend: "stabilny",
    hoursSinceLastTalk: 2,
    assignedSocialWorker: "mgr Tomasz Nowak (Rejon 1)",
  },
  {
    id: "g_06",
    name: "Maria Kowalska",
    age: 83,
    addressDistrict: "Osiedle Parkowe, ul. Spacerowa",
    lastContact: "Dzisiaj, 11:00",
    status: "bezpieczny",
    cviTrend: "wzrost",
    hoursSinceLastTalk: 1,
    assignedSocialWorker: "mgr Anna Zielińska (Rejon 2)",
  },
];

export const GminaCoordinatorHub: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<"all" | "krytyczny" | "uwaga" | "bezpieczny">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const filtered = MOCK_GMINA_SENIORS.filter((s) => {
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.addressDistrict.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleDispatchVisit = (seniorId: string) => {
    setDispatchedId(seniorId);
    setTimeout(() => {
      alert("Zlecenie wizyty pracownika socjalnego zostało zarejestrowane w systemie MOPS. Powiadomiono SMS-em dyżurnego asystenta.");
      setDispatchedId(null);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-8">
      {/* Nagłówek instytucjonalny B2G */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider mb-2 border border-sky-200">
            <Building2 className="w-3.5 h-3.5 text-sky-700" />
            <span>Pulpit Koordynatora Gminnego / MOPS / DPS • FERS Deinstytucjonalizacja</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
            Centrum Teleopieki Gminnej
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl">
            Nadzór nad podopiecznymi w gminie. System wczesnego wykrywania samotności (&gt;48h bez rozmowy) i kryzysów somatycznych z poszanowaniem prywatności.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
            <span className="text-xs text-stone-500 block font-semibold">Podopieczni</span>
            <span className="text-xl font-bold font-mono text-stone-900">48 osób</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
            <span className="text-xs text-rose-700 block font-semibold">Wymaga interwencji</span>
            <span className="text-xl font-bold font-mono text-rose-800">2 osoby</span>
          </div>
        </div>
      </div>

      {/* Kalkulator Deinstytucjonalizacji (Kluczowy dla grantów FERS i Samorządów) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 text-white shadow-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" /> Wskaźnik Efektywności Ekonomicznej (ROI Samorządu)
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Kalkulator Oszczędności Budżetu Społecznego
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Średni koszt utrzymania seniora w DPS to w Polsce <strong>7 500 zł / miesiąc</strong>. BliskiGłos pozwala opóźnić konieczność umieszczenia w placówce o średnio 14 miesięcy, wspierając seniora i rodzinę w środowisku domowym.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-emerald-500/40 text-center shrink-0">
            <span className="text-xs text-stone-400 block font-medium">Roczna oszczędność gminy (dla 48 seniorów):</span>
            <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-400 block my-1">
              4 320 000 zł
            </span>
            <span className="text-[11px] text-emerald-300 font-sans">
              Środki pozostające w budżecie samorządowym
            </span>
          </div>
        </div>
      </div>

      {/* Narzędzia wyszukiwania i filtrów */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Szukaj po nazwisku lub dzielnicy..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === "all" ? "bg-stone-900 text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Wszyscy (6)
          </button>
          <button
            onClick={() => setFilterStatus("krytyczny")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === "krytyczny" ? "bg-rose-600 text-white shadow-sm" : "bg-rose-50 text-rose-800 hover:bg-rose-100"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Krytyczny (2)
          </button>
          <button
            onClick={() => setFilterStatus("uwaga")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === "uwaga" ? "bg-amber-600 text-white shadow-sm" : "bg-amber-50 text-amber-900 hover:bg-amber-100"
            }`}
          >
            Uwaga (2)
          </button>
          <button
            onClick={() => setFilterStatus("bezpieczny")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === "bezpieczny" ? "bg-emerald-600 text-white shadow-sm" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            Bezpieczny (2)
          </button>
        </div>
      </div>

      {/* Tabela podopiecznych */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-100/80 text-stone-700 text-xs font-bold uppercase tracking-wider border-b border-stone-200">
            <tr>
              <th className="p-4">Podopieczny</th>
              <th className="p-4">Dzielnica / Adres</th>
              <th className="p-4">Ostatnia Rozmowa</th>
              <th className="p-4">Status & Ryzyko</th>
              <th className="p-4">Pracownik Socjalny</th>
              <th className="p-4 text-right">Działanie</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map((senior) => (
              <tr key={senior.id} className="hover:bg-stone-50/80 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-stone-900">{senior.name}</div>
                  <div className="text-xs text-stone-500">{senior.age} lat</div>
                </td>
                <td className="p-4 text-xs text-stone-600">
                  {senior.addressDistrict}
                </td>
                <td className="p-4 text-xs">
                  <span className="font-semibold text-stone-800">{senior.lastContact}</span>
                  <div className={`text-[11px] ${senior.hoursSinceLastTalk > 48 ? "text-rose-600 font-bold" : "text-stone-500"}`}>
                    {senior.hoursSinceLastTalk}h temu
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    senior.status === "krytyczny" ? "bg-rose-100 text-rose-800 border border-rose-300" :
                    senior.status === "uwaga" ? "bg-amber-100 text-amber-900 border border-amber-300" :
                    "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  }`}>
                    {senior.status === "krytyczny" ? <AlertTriangle className="w-3 h-3" /> :
                     senior.status === "uwaga" ? <Clock className="w-3 h-3" /> :
                     <CheckCircle2 className="w-3 h-3" />}
                    {senior.status}
                  </span>
                  {senior.riskReason && (
                    <p className="text-xs text-rose-700 font-medium mt-1">
                      {senior.riskReason}
                    </p>
                  )}
                </td>
                <td className="p-4 text-xs text-stone-600">
                  {senior.assignedSocialWorker}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDispatchVisit(senior.id)}
                    disabled={dispatchedId === senior.id}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                      senior.status === "krytyczny"
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300"
                    }`}
                  >
                    {dispatchedId === senior.id ? "Wysyłam..." : "Zleć wizytę"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
