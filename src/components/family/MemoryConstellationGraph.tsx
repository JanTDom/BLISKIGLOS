"use client";

import React, { useRef, useEffect, useState } from "react";
import { MemoryGraph, MemoryGraphNode, MemoryNodeType } from "@/types";
import { Sparkles, Heart, MapPin, User, Music, Compass, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

interface MemoryConstellationGraphProps {
  graph: MemoryGraph;
  onSelectNode?: (node: MemoryGraphNode | null) => void;
}

export const MemoryConstellationGraph: React.FC<MemoryConstellationGraphProps> = ({
  graph,
  onSelectNode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<MemoryGraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<MemoryGraphNode | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  // Pozycje węzłów na płótnie
  const positionsRef = useRef<Map<string, { x: number; y: number; vx: number; vy: number }>>(new Map());

  // Inicjalizacja układu węzłów na okręgach
  useEffect(() => {
    const width = 880;
    const height = 540;
    const center = { x: width / 2, y: height / 2 };

    const totalNodes = graph.nodes.length;
    graph.nodes.forEach((node, idx) => {
      if (!positionsRef.current.has(node.id)) {
        const angle = (idx / Math.max(1, totalNodes)) * Math.PI * 2;
        const radius = 140 + (idx % 3) * 65;
        positionsRef.current.set(node.id, {
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });
      }
    });
  }, [graph.nodes]);

  // Pętla animacji Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // 1. Tło gwiezdne / gradient głębi
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.5);
      bgGrad.addColorStop(0, "#1A1510");
      bgGrad.addColorStop(0.6, "#120E0A");
      bgGrad.addColorStop(1, "#0A0806");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Rysowanie linii połączeń (edges)
      graph.edges.forEach((edge) => {
        const sourcePos = positionsRef.current.get(edge.source);
        const targetPos = positionsRef.current.get(edge.target);
        if (!sourcePos || !targetPos) return;

        const isHighlighted =
          (hoveredNode && (hoveredNode.id === edge.source || hoveredNode.id === edge.target)) ||
          (selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target));

        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.strokeStyle = isHighlighted ? "rgba(251, 191, 36, 0.85)" : "rgba(217, 119, 6, 0.22)";
        ctx.lineWidth = isHighlighted ? 2.5 : 1;
        ctx.stroke();

        // Etykieta relacji na środku linii
        if (isHighlighted) {
          const midX = (sourcePos.x + targetPos.x) / 2;
          const midY = (sourcePos.y + targetPos.y) / 2;
          ctx.fillStyle = "rgba(254, 243, 199, 0.9)";
          ctx.font = "11px sans-serif";
          ctx.fillText(edge.relation, midX + 4, midY - 4);
        }
      });

      // 3. Rysowanie węzłów (nodes)
      graph.nodes.forEach((node) => {
        if (filterType !== "all" && node.type !== filterType) return;

        const pos = positionsRef.current.get(node.id);
        if (!pos) return;

        // Delikatny dryf kosmiczny
        pos.x += pos.vx;
        pos.y += pos.vy;
        if (pos.x < 70 || pos.x > width - 70) pos.vx *= -1;
        if (pos.y < 70 || pos.y > height - 70) pos.vy *= -1;

        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const nodeRadius = 14 + node.importance * 3.5;

        // Aura poświaty
        const auraGrad = ctx.createRadialGradient(pos.x, pos.y, 2, pos.x, pos.y, nodeRadius * 2.2);
        if (node.type === "osoba") {
          auraGrad.addColorStop(0, "rgba(245, 158, 11, 0.6)");
          auraGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
        } else if (node.type === "kotwica_sensoryczna") {
          auraGrad.addColorStop(0, "rgba(236, 72, 153, 0.6)");
          auraGrad.addColorStop(1, "rgba(236, 72, 153, 0)");
        } else if (node.type === "miejsce") {
          auraGrad.addColorStop(0, "rgba(59, 130, 246, 0.6)");
          auraGrad.addColorStop(1, "rgba(59, 130, 246, 0)");
        } else {
          auraGrad.addColorStop(0, "rgba(16, 185, 129, 0.6)");
          auraGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
        }

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = auraGrad;
        ctx.fill();

        // Rdzeń węzła
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
        if (node.type === "osoba") ctx.fillStyle = "#F59E0B";
        else if (node.type === "kotwica_sensoryczna") ctx.fillStyle = "#EC4899";
        else if (node.type === "miejsce") ctx.fillStyle = "#3B82F6";
        else ctx.fillStyle = "#10B981";
        ctx.fill();

        ctx.strokeStyle = isSelected || isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.stroke();

        // Etykieta węzła
        ctx.fillStyle = isSelected || isHovered ? "#FEF3C7" : "#E7E5E4";
        ctx.font = isSelected ? "bold 13px sans-serif" : "11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, pos.x, pos.y + nodeRadius + 15);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [graph, selectedNode, hoveredNode, filterType]);

  // Obsługa kliknięć na płótnie
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    let found: MemoryGraphNode | null = null;
    for (const node of graph.nodes) {
      const pos = positionsRef.current.get(node.id);
      if (!pos) continue;
      const radius = 18 + node.importance * 3.5;
      const dist = Math.hypot(clickX - pos.x, clickY - pos.y);
      if (dist <= radius) {
        found = node;
        break;
      }
    }

    setSelectedNode(found);
    if (onSelectNode) onSelectNode(found);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    let found: MemoryGraphNode | null = null;
    for (const node of graph.nodes) {
      const pos = positionsRef.current.get(node.id);
      if (!pos) continue;
      const radius = 18 + node.importance * 3.5;
      const dist = Math.hypot(mouseX - pos.x, mouseY - pos.y);
      if (dist <= radius) {
        found = node;
        break;
      }
    }
    setHoveredNode(found);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Pasek kontroli i filtrów */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 backdrop-blur-md p-4 rounded-2xl border border-amber-500/20 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-serif text-lg font-bold">
            Konstelacja Wspomnień ({graph.nodes.length} ocalonych wątków)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-stone-400 mr-1">Filtruj:</span>
          {[
            { id: "all", label: "Wszystko" },
            { id: "osoba", label: "Bliscy & Rodzina" },
            { id: "miejsce", label: "Miejsca pamięci" },
            { id: "kotwica_sensoryczna", label: "Zapachy & Dźwięki" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-full transition-all ${
                filterType === f.id
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "bg-stone-800 text-stone-300 hover:bg-stone-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kontener Canvas i Karta szczegółów wybranego węzła */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-900/40 shadow-2xl bg-stone-950">
        <canvas
          ref={canvasRef}
          width={880}
          height={540}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          className="w-full h-auto cursor-pointer display-block"
        />

        {/* Nakładka instrukcji */}
        <div className="absolute top-4 left-4 pointer-events-none text-xs text-amber-200/60 font-mono bg-stone-900/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-500/20">
          ● Kliknij dowolną gwiazdę, aby odkryć wspomnienie
        </div>

        {/* Panel boczny z historią wybranego węzła */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-stone-900/95 backdrop-blur-md border-2 border-amber-400/80 p-5 rounded-3xl text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {selectedNode.type.replace("_", " ")}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {selectedNode.decadeOrEra || "Dawne lata"}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-stone-400 hover:text-white text-sm px-2 py-0.5"
              >
                ✕
              </button>
            </div>

            <h4 className="font-serif text-2xl font-bold text-amber-300 mt-2">
              {selectedNode.label}
            </h4>

            <p className="text-stone-200 text-sm mt-2 leading-relaxed italic">
              „{selectedNode.details}”
            </p>

            <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>Waga emocjonalna: <strong>{selectedNode.importance} / 5</strong></span>
              <span className="text-amber-400 font-semibold">Terapia Reminiscencyjna dr. Butlera</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
