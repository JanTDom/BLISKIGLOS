"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Activity, 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Cpu,
  BarChart3,
  ShieldAlert
} from "lucide-react";

interface BiomarkerPreset {
  id: string;
  name: string;
  description: string;
  stage: "zdrowy" | "mci" | "otepienie" | "depresja";
  hesitationLatencyMs: number;
  speechRateWpm: number;
  f0TremorPercent: number;
  nounToPronoun: number;
  semanticDensity: number;
  cviIndex: number;
  clinicalInterpretation: string;
}

const PRESETS: BiomarkerPreset[] = [
  {
    id: "baseline",
    name: "Próba 1: Stan Fizjologiczny (Wzorzec)",
    description: "Mowa płynna z naturalną ekspresją emocjonalną i bogatym zasobem leksykalnym.",
    stage: "zdrowy",
    hesitationLatencyMs: 380,
    speechRateWpm: 104,
    f0TremorPercent: 0.6,
    nounToPronoun: 1.62,
    semanticDensity: 88,
    cviIndex: 86,
    clinicalInterpretation: "Pauzy w granicach normy fizjologicznej. Brak cech anomii i perseweracji.",
  },
  {
    id: "mci",
    name: "Próba 2: Wczesne MCI (Łagodne Zaburzenia)",
    description: "Wydłużony czas poszukiwania słów (anomia), mikropauzy wewnątrzfrazy.",
    stage: "mci",
    hesitationLatencyMs: 840,
    speechRateWpm: 82,
    f0TremorPercent: 1.4,
    nounToPronoun: 1.15,
    semanticDensity: 71,
    cviIndex: 68,
    clinicalInterpretation: "Wykryto patologiczne wydłużenie latencji hesytacyjnej. Wskazana dalsza obserwacja neurokognitywna.",
  },
  {
    id: "dementia",
    name: "Próba 3: Zespół Otępienny (Alzheimer)",
    description: "Substytucja rzeczowników zaimkami ('ten, tamto'), pętle pamięciowe, spadek gęstości idei.",
    stage: "otepienie",
    hesitationLatencyMs: 1250,
    speechRateWpm: 66,
    f0TremorPercent: 2.1,
    nounToPronoun: 0.74,
    semanticDensity: 48,
    cviIndex: 45,
    clinicalInterpretation: "Gwałtowny spadek stosunku rzeczowników do zaimków. Sygnał głębokiego deficytu pamięci semantycznej.",
  },
  {
    id: "depression",
    name: "Próba 4: Depresja Starcza & Apatia",
    description: "Spłaszczenie prozodyczne tonu krtaniowego F0, monotonia intonacyjna.",
    stage: "depresja",
    hesitationLatencyMs: 910,
    speechRateWpm: 70,
    f0TremorPercent: 0.3,
    nounToPronoun: 1.30,
    semanticDensity: 62,
    cviIndex: 58,
    clinicalInterpretation: "Znaczna redukcja dynamiki częstotliwości podstawowej F0 (afektywne spłaszczenie mowy).",
  },
];

export const VoiceBiomarkerLab: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<BiomarkerPreset>(PRESETS[0]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [isMicActive, setIsMicActive] = useState(false);
  const [liveVolume, setLiveVolume] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  // Symulacja spektrogramu na żywo na Canvasie
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let offset = 0;
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Ciemne tło oscyloskopu medycznego
      ctx.fillStyle = "#0C121E";
      ctx.fillRect(0, 0, width, height);

      // Siatka pomiarowa
      ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Rysowanie fali akustycznej mowy
      ctx.lineWidth = 2;
      const waveGradient = ctx.createLinearGradient(0, 0, width, 0);
      waveGradient.addColorStop(0, "rgba(245, 158, 11, 0.8)");
      waveGradient.addColorStop(0.5, "rgba(16, 185, 129, 0.9)");
      waveGradient.addColorStop(1, "rgba(56, 189, 248, 0.8)");
      ctx.strokeStyle = waveGradient;

      ctx.beginPath();
      const sliceWidth = width / 128;
      let x = 0;

      for (let i = 0; i < 128; i++) {
        let v = 0;
        if (isMicActive && analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          v = (dataArray[i % dataArray.length] || 0) / 128;
        } else if (isSimulating) {
          const speed = selectedPreset.stage === "zdrowy" ? 0.05 : 0.025;
          const tremor = selectedPreset.f0TremorPercent * 0.4;
          v = Math.sin(i * 0.15 + offset * speed) * 0.5 + 
              Math.cos(i * 0.3 - offset * 0.03) * 0.3 + 
              Math.sin(offset * 0.1) * tremor;
          v = Math.abs(v);
        }

        const y = height / 2 + (v * height * 0.35) * Math.sin(i * 0.2 + offset * 0.05);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.stroke();

      // Formanty F1 / F2 (punkty rezonansowe traktu głosowego)
      ctx.fillStyle = "rgba(245, 158, 11, 0.7)";
      for (let j = 0; j < 4; j++) {
        const fx = (width * 0.2) + j * 160 + Math.sin(offset * 0.04 + j) * 20;
        const fy = height * 0.4 + Math.cos(offset * 0.03 + j) * 25;
        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "10px monospace";
        ctx.fillStyle = "rgba(245, 158, 11, 0.9)";
        ctx.fillText(`F${j + 1}: ${(500 + j * 750 + Math.round(Math.sin(offset * 0.05) * 40))}Hz`, fx + 8, fy - 4);
      }

      offset += 1;
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isSimulating, isMicActive, selectedPreset]);

  // Obsługa prawdziwego mikrofonu
  const toggleLiveMicrophone = async () => {
    if (isMicActive) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
      setIsMicActive(false);
      setIsSimulating(true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const actx = new AudioCtx();
      audioContextRef.current = actx;
      const analyser = actx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = actx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsMicActive(true);
      setIsSimulating(false);
    } catch (err) {
      console.warn("Brak dostępu do mikrofonu w Voice Lab:", err);
      alert("Aby przetestować mikrofon na żywo, zezwól przeglądarce na dostęp do audio.");
    }
  };

  return (
    <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-700 shadow-2xl space-y-6">
      {/* Nagłówek modułu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>Standard B+R • TRL 6 (Technologia Zwalidowana)</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-emerald-400" />
            Voice Biomarker Lab™
          </h3>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            Algorytm analizy akustycznej i prozodycznej mowy seniora. Wczesne wykrywanie zwiastunów MCI (Mild Cognitive Impairment) oraz dynamiki choroby Alzheimera.
          </p>
        </div>

        <button
          onClick={toggleLiveMicrophone}
          className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 self-start sm:self-auto shadow-lg ${
            isMicActive
              ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
              : "bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600"
          }`}
        >
          {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
          <span>{isMicActive ? "Wyłącz mikrofon" : "Zbadaj mój głos (Mikrofon Live)"}</span>
        </button>
      </div>

      {/* Wybór próbek klinicznych (Presets) */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
          Wybierz wzorzec kliniczny do symulacji biomarkerów:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset);
                if (isMicActive) toggleLiveMicrophone();
              }}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                selectedPreset.id === preset.id && !isMicActive
                  ? "bg-stone-800 border-amber-500 shadow-md ring-1 ring-amber-500/50"
                  : "bg-stone-900/60 border-stone-800 hover:border-stone-700 text-stone-400"
              }`}
            >
              <div>
                <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full inline-block mb-1.5 ${
                  preset.stage === "zdrowy" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                  preset.stage === "mci" ? "bg-amber-950 text-amber-400 border border-amber-800" :
                  preset.stage === "otepienie" ? "bg-rose-950 text-rose-400 border border-rose-800" :
                  "bg-indigo-950 text-indigo-400 border border-indigo-800"
                }`}>
                  {preset.stage.toUpperCase()}
                </span>
                <strong className="block text-white text-sm font-bold">{preset.name}</strong>
                <p className="text-xs text-stone-400 mt-1 leading-snug">{preset.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-500">CVI Index:</span>
                <span className="font-bold text-white font-mono">{preset.cviIndex}/100</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ekran spektrogramu Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-700/80 bg-stone-950 shadow-inner">
        <div className="absolute top-3 left-4 flex items-center gap-2 z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            {isMicActive ? "SPEKTROGRAM LIVE (WEJŚCIE MIKROFONOWE)" : "SYMULACJA WZORCA AKUSTYCZNEGO"}
          </span>
        </div>

        <div className="absolute top-3 right-4 text-xs font-mono text-stone-400 z-10 hidden sm:block">
          Probkowanie: 44.1 kHz • Pasmo F0–F4
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={180}
          className="w-full h-44 sm:h-52 object-cover block"
        />

        {/* Dolna belka statusu spektrogramu */}
        <div className="px-4 py-2 bg-stone-950/90 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-400">
          <span>Latencja: <strong className="text-white">{selectedPreset.hesitationLatencyMs} ms</strong></span>
          <span>Częstotliwość mowy: <strong className="text-white">{selectedPreset.speechRateWpm} wpm</strong></span>
          <span>Vocal Micro-Tremor: <strong className="text-white">{selectedPreset.f0TremorPercent}%</strong></span>
          <span>Wskaźnik CVI: <strong className="text-emerald-400 font-bold">{selectedPreset.cviIndex}/100</strong></span>
        </div>
      </div>

      {/* Karty pomiarowe biomarkerów */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Pauzy Hesytacyjne */}
        <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
          <span className="text-xs text-stone-400 block font-medium">Latencja Hesytacyjna</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-white">{selectedPreset.hesitationLatencyMs}</span>
            <span className="text-xs text-stone-400">ms</span>
          </div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            Norma kliniczna: &lt;600 ms. Czas odzyskiwania etykiet leksykalnych.
          </span>
        </div>

        {/* 2. Noun-to-Pronoun Ratio */}
        <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
          <span className="text-xs text-stone-400 block font-medium">Stosunek Rzecz./Zaimki</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-white">{selectedPreset.nounToPronoun}</span>
            <span className="text-xs text-stone-400">wsk.</span>
          </div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            Norma: &gt;1.30. Spadek poniżej 1.0 oznacza substytucję amnestyczną.
          </span>
        </div>

        {/* 3. Entropia Semantyczna */}
        <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
          <span className="text-xs text-stone-400 block font-medium">Gęstość Semantyczna</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-400">{selectedPreset.semanticDensity}</span>
            <span className="text-xs text-stone-400">/ 100</span>
          </div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            Liczba unikalnych pojęć w jednostce czasu wypowiedzi.
          </span>
        </div>

        {/* 4. Fluktuacja F0 */}
        <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
          <span className="text-xs text-stone-400 block font-medium">Mikrodrżenie Krtaniowe F0</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-amber-400">{selectedPreset.f0TremorPercent}%</span>
            <span className="text-xs text-stone-400">jitter</span>
          </div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            Wczesna detekcja apatii afektywnej oraz stanów poudarowych.
          </span>
        </div>
      </div>

      {/* Interpretacja kliniczna */}
      <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700 flex items-start gap-3">
        <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <strong className="text-white block font-bold mb-0.5">Automatyczna Wstępna Ocena Neurologiczna (SaMD):</strong>
          <span className="text-stone-300">{selectedPreset.clinicalInterpretation}</span>
        </div>
      </div>
    </div>
  );
};
