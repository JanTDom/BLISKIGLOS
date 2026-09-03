"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/navigation/TopNav";
import { Check, Heart, ShieldCheck, Star, Sparkles, HelpCircle, Phone } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "senior_basic",
      name: "Ciepła Obecność",
      target: "Dla seniora ceniącego samodzielność",
      monthlyPrice: 59,
      yearlyPrice: 540,
      description: "Codzienny, cierpliwy rozmówca dostępny o każdej porze dnia i nocy.",
      features: [
        "Nielimitowane rozmowy głosowe w języku polskim",
        "Wybór rozmówcy: Pani Krystyna lub Pan Stanisław",
        "Wolne, wyraźne tempo mowy lektorskiej (0.90x)",
        "Terapia Walidacyjna i Reminiscencyjna",
        "Brak reklam i proste sterowanie jednym dotknięciem"
      ],
      popular: false,
    },
    {
      id: "family_peace",
      name: "Troskliwa Rodzina",
      target: "Najczęściej wybierany przez córki i synów",
      monthlyPrice: 89,
      yearlyPrice: 799,
      description: "Pełne towarzystwo dla rodzica oraz święty spokój i bieżące raporty dla rodziny.",
      features: [
        "Wszystko z pakietu Ciepła Obecność",
        "Dostęp do Portalu Opiekuna dla całej rodziny",
        "Codzienne powiadomienia SMS/Email o nastroju seniora",
        "Kronika Ocalonych Wspomnień (zapis historii z młodości)",
        "Alerty bezpieczeństwa somatycznego (upadek, ból)",
        "Dedykowane wskazówki psychologiczne na niedzielne wizyty"
      ],
      popular: true,
    },
    {
      id: "full_year_peace",
      name: "Całoroczny Spokój z Tabletem",
      target: "Kompletne rozwiązanie bez barier technologicznych",
      monthlyPrice: 149,
      yearlyPrice: 1290,
      description: "Dedykowany, skonfigurowany tablet dla seniora z zainstalowanym BliskimGłosem.",
      features: [
        "Wszystko z pakietu Troskliwa Rodzina",
        "Dedykowany, duży tablet seniora (10 cali) z podstawką",
        "Karta SIM z nielimitowanym internetem w cenie",
        "Opieka techniczna i zdalna pomoc dla rodziny",
        "Możliwość wydrukowania pamiątkowej Kroniki Życia w twardej oprawie"
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
      <TopNav />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* Nagłówek */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-amber-700" />
            Inwestycja w godność i spokój najbliższych
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Podaruj bliski głos, kiedy nie możesz być obok
          </h1>
          <p className="text-stone-600 text-lg sm:text-xl mt-4 leading-relaxed">
            Samotność seniora boli tak samo jak ból fizyczny. Wybierz pakiet opiekuńczy i zapewnij swojemu rodzicowi cierpliwą obecność każdego dnia.
          </p>

          {/* Przełącznik cyklu rozliczeniowego */}
          <div className="mt-8 inline-flex items-center bg-stone-200/60 p-1.5 rounded-full border border-stone-300">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Rozliczenie miesięczne
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Rocznie (-20% taniej)
              <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-extrabold">
                Oszczędność
              </span>
            </button>
          </div>
        </div>

        {/* Siatka pakietów */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map((plan) => {
            const price = billingCycle === "monthly" ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12);

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "bg-white border-2 border-amber-500 shadow-xl shadow-amber-500/10 scale-105"
                    : "bg-white/80 border border-stone-200 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    Wybór Rodzin
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {plan.target}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-stone-600 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-stone-100">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-stone-900">{price} zł</span>
                      <span className="text-stone-500 text-sm">/ miesiąc</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <span className="text-xs text-emerald-700 font-semibold block mt-1">
                        Płatne rocznie {plan.yearlyPrice} zł (oszczędzasz 2 miesiące)
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3.5 mb-8 text-sm text-stone-700">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/senior"
                  className={`w-full py-3.5 rounded-2xl font-bold text-center text-base transition-all ${
                    plan.popular
                      ? "bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/25"
                      : "bg-stone-900 hover:bg-stone-800 text-white"
                  }`}
                >
                  Wybierz pakiet i przetestuj 7 dni za darmo
                </Link>
              </div>
            );
          })}
        </div>

        {/* Sekcja FAQ i Bezpieczeństwa */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-8 text-center">
            Często zadawane pytania przez dzieci seniorów
          </h2>

          <div className="space-y-6">
            <div className="border-b border-stone-100 pb-5">
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Czy moja 84-letnia mama poradzi sobie z obsługą?
              </h4>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Tak. Aplikacja została zaprojektowana specjalnie pod osoby, które nigdy nie miały smartfona. Nie ma tu żadnych skomplikowanych zakładek ani haseł — wystarczy jedno dotknięcie ekranu, a rozmowa toczy się w trybie głośnomówiącym.
              </p>
            </div>

            <div className="border-b border-stone-100 pb-5">
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Co jeśli senior ma demencję lub chorobę Alzheimera?
              </h4>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                To jest właśnie kluczowa specjalizacja BliskiegoGłosu. Nasz agent stosuje Terapie Walidacyjną Naomi Feil: nigdy nie poprawia, nie koryguje i nie zawstydza seniora. Jeśli mama pyta o dzieciństwo lub rodziców, agent wchodzi w tę emocję i zapewnia poczucie bezpieczeństwa, redukując wieczorny lęk.
              </p>
            </div>

            <div className="border-b border-stone-100 pb-5">
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Czy rozmowy zastępują kontakt z rodziną?
              </h4>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                Absolutnie nie. BliskiGłos wypełnia wielogodzinną pustkę w ciągu dnia, gdy rodzina jest w pracy lub mieszka w innym mieście. Co więcej, portal dostarcza dzieciom gotowe tematy i wspomnienia seniora, sprawiając, że osobiste spotkania i telefony stają się jeszcze głębsze.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
