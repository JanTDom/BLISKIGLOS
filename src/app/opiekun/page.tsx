"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TopNav } from "@/components/navigation/TopNav";
import { getSeniorProfile, saveSeniorProfile, getStoredReminiscences } from "@/lib/storage";
import { SeniorProfile, ReminiscenceStory, FamilyReportDay } from "@/types";
import { 
  Heart, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Phone, 
  Settings, 
  CreditCard,
  Flame,
  Lightbulb,
  ArrowRight
} from "lucide-react";

export default function FamilyGuardianPage() {
  const [profile, setProfile] = useState<SeniorProfile>(getSeniorProfile());
  const [reminiscences, setReminiscences] = useState<ReminiscenceStory[]>([]);
  const [activeTab, setActiveTab] = useState<"dashboard" | "memories" | "settings">("dashboard");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProfile(getSeniorProfile());
    setReminiscences(getStoredReminiscences());
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveSeniorProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      <TopNav />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Nagłówek Portalu Opiekuna */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-amber-900/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Strefa Opiekuna & Rodziny
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Pulpit Dobrostanu: {profile.name}
            </h1>
            <p className="text-stone-600 mt-1">
              Bieżący podgląd rozmów, samopoczucia i ocalonych wspomnień Twojej bliskiej osoby.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/senior"
              className="px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-600/20 transition-all flex items-center gap-2"
            >
              Przejdź do widoku Seniora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Zakładki */}
        <div className="flex items-center gap-2 my-6 border-b border-stone-200">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-5 py-3 text-base font-bold border-b-2 transition-all ${
              activeTab === "dashboard"
                ? "border-amber-600 text-amber-900"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            Dziennik i Samopoczucie
          </button>
          <button
            onClick={() => setActiveTab("memories")}
            className={`px-5 py-3 text-base font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "memories"
                ? "border-amber-600 text-amber-900"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Kronika Wspomnień ({reminiscences.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-3 text-base font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-amber-600 text-amber-900"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Settings className="w-4 h-4" />
            Ustawienia & Subskrypcja
          </button>
        </div>

        {/* 1. ZAKŁADKA DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Karty metryk na samej górze */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
                    Nastrój dzisiaj
                  </span>
                  <span className="font-serif text-xl font-bold text-stone-900">
                    Spokojny & pogodny
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
                    Czas rozmów dzisiaj
                  </span>
                  <span className="font-serif text-2xl font-bold text-stone-900">
                    18 minut
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Flame className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
                    Ciągłość obecności
                  </span>
                  <span className="font-serif text-2xl font-bold text-stone-900">
                    {profile.streakDays} dni z rzędu
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">
                  <Heart className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
                    Rozmówca seniora
                  </span>
                  <span className="font-serif text-xl font-bold text-stone-900">
                    {profile.companionName}
                  </span>
                </div>
              </div>
            </div>

            {/* Wskazówka i analiza terapeutyczna od AI */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950">
                    Rekomendacja dla rodziny na ten tydzień
                  </h3>
                  <p className="text-stone-700 text-lg mt-2 leading-relaxed">
                    Podczas dzisiejszej rozmowy Mama z dużym wzruszeniem wspominała pieczenie chleba i dawne soboty na wsi. Nie było żadnych niepokojów wieczornych (sundowning).
                  </p>
                  <div className="mt-4 p-4 rounded-2xl bg-white/80 border border-amber-300/60 flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-amber-600 text-white px-2.5 py-1 rounded-md">
                      Wskazówka
                    </span>
                    <span className="text-sm font-semibold text-stone-800">
                      Gdy zadzwonisz w niedzielę, zapytaj Mamę o Jej przepis na drożdżowe ciasto — rozmowa o smakach dzieciństwa wywołuje u Niej głębokie poczucie bezpieczeństwa.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ostatnie rozmowy i bezpieczeństwo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  Harmonogram aktywności w tym tygodniu
                </h3>
                <ul className="space-y-3">
                  {[
                    { day: "Dzisiaj (Czwartek)", time: "11:20 & 16:40", status: "2 sesje (18 min)", mood: "Bardzo spokojny" },
                    { day: "Wczoraj (Środa)", time: "10:15 & 18:30", status: "2 sesje (24 min)", mood: "Nostalgiczny" },
                    { day: "Wtorek", time: "11:00", status: "1 sesja (12 min)", mood: "Pogodny" },
                    { day: "Poniedziałek", time: "09:45 & 17:10", status: "2 sesje (20 min)", mood: "Spokojny" },
                  ].map((item, idx) => (
                    <li key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                      <div>
                        <strong className="block text-sm text-stone-900">{item.day}</strong>
                        <span className="text-xs text-stone-500">{item.time} • {item.status}</span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        {item.mood}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Raport Bezpieczeństwa Somatycznego
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="text-sm text-emerald-950">
                      <strong>Brak alarmów zdrowotnych w ostatnich 14 dniach.</strong>
                      <p className="text-emerald-800 mt-0.5">
                        Senior nie zgłaszał bólu w klatce piersiowej, upadków ani duszności.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-700">
                    <strong className="text-stone-900 block mb-1">Numer alarmowy opiekuna:</strong>
                    <p>{profile.familyContact.name} ({profile.familyContact.relation})</p>
                    <p className="font-semibold text-stone-900">{profile.familyContact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ZAKŁADKA KRONIKA WSPOMNIEŃ (Reminiscence Vault) */}
        {activeTab === "memories" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Ocalone Wspomnienia Seniora
              </h2>
              <p className="text-stone-600 mb-6">
                Dzięki Terapii Reminiscencyjnej agent automatycznie rejestruje i spisuje najcenniejsze historie, zanim zatarłby je czas. To bezcenne dziedzictwo dla dzieci i wnuków.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reminiscences.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-6 rounded-3xl bg-[#FFFDF9] border border-amber-200/80 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                          {rem.decadeOrEra || "Dawne czasy"}
                        </span>
                        <span className="text-xs text-stone-400 font-medium">
                          {rem.dateExtracted}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                        {rem.title}
                      </h4>
                      <p className="text-stone-700 font-serif italic leading-relaxed text-base">
                        „{rem.story}”
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900/80 font-semibold">
                      <span>Emocja: {rem.emotion}</span>
                      <span className="text-stone-400">Zapisano z głosu</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. ZAKŁADKA USTAWIENIA & SUBSKRYPCJA */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                Dane podopiecznego i preferencje opieki
              </h3>

              {savedSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Zapisano zmiany pomyślnie!
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      Imię seniora (jak ma się zwracać agent)
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                      Wiek seniora
                    </label>
                    <input
                      type="number"
                      value={profile.age || 82}
                      onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Ważne notatki o przeszłości i wrażliwościach seniora
                  </label>
                  <textarea
                    rows={3}
                    value={profile.specialNotes}
                    onChange={(e) => setProfile({ ...profile, specialNotes: e.target.value })}
                    placeholder="Np. Mama tęskni za Wilnem, kocha kwiaty, nie pamięta dat ale uwielbia słuchać o ogrodzie..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    Agent wykorzysta te wskazówki, aby prowadzić bezpieczne rozmowy walidacyjne.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-stone-700 mb-3">
                    Kontakt alarmowy opiekuna
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-stone-500 mb-1">Imię i relacja</label>
                      <input
                        type="text"
                        value={profile.familyContact.name}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            familyContact: { ...profile.familyContact, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 mb-1">Numer telefonu</label>
                      <input
                        type="tel"
                        value={profile.familyContact.phone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            familyContact: { ...profile.familyContact, phone: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 mb-1">E-mail do raportów</label>
                      <input
                        type="email"
                        value={profile.familyContact.email}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            familyContact: { ...profile.familyContact, email: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-md"
                >
                  Zapisz ustawienia opieki
                </button>
              </form>
            </div>

            {/* Karta subskrypcji */}
            <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs uppercase font-bold tracking-wider mb-2">
                  <CreditCard className="w-4 h-4" />
                  Aktywna Subskrypcja
                </div>
                <h4 className="font-serif text-2xl font-bold">
                  Pakiet Troskliwa Rodzina
                </h4>
                <p className="text-stone-300 text-sm mt-2">
                  Nielimitowane rozmowy głosowe AI dla seniora + codzienne powiadomienia i kronika wspomnień.
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-stone-800 border border-stone-700">
                  <span className="text-3xl font-serif font-bold text-amber-400">89 zł</span>
                  <span className="text-stone-400 text-sm"> / miesiąc</span>
                  <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Kolejne odnowienie: 3 października 2026
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800">
                <Link
                  href="/cennik"
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-center block text-sm transition-all"
                >
                  Zmień plan lub zarządzaj płatnością
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
