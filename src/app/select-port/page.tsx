"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ports } from "@/mock/ports";
import { useDemoStore } from "@/store/useDemoStore";

export default function SelectPortPage() {
  const router = useRouter();
  const setPort = useDemoStore((state) => state.setPort);
  const [selectedPortId, setSelectedPortId] = useState<string>("");

  const continueToZone = () => {
    if (!selectedPortId) return;
    setPort(selectedPortId);
    router.push("/select-zone");
  };

  return (
    <main className="flex h-screen flex-col bg-slate-100 p-8">
      <h1 className="mb-4 text-2xl font-semibold">Seleccione un puerto</h1>
      <div className="relative flex-1 rounded-xl border border-slate-300 bg-[linear-gradient(150deg,#d9ecff,#f6fbff)]">
        {ports.map((port) => {
          const isSelected = selectedPortId === port.id;
          return (
            <button
              key={port.id}
              style={port.position}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs transition ${
                !port.clickable
                  ? "cursor-not-allowed border-slate-400 bg-white text-slate-500"
                  : isSelected
                    ? "border-blue-900 bg-blue-900 text-white ring-4 ring-blue-200"
                    : "border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
              }`}
              onClick={() => {
                if (!port.clickable) return;
                setSelectedPortId(port.id);
              }}
            >
              {port.name}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-700">
          {selectedPortId
            ? `Seleccionado: ${ports.find((port) => port.id === selectedPortId)?.name}`
            : "Selecciona un puerto para continuar"}
        </p>
        <button
          onClick={continueToZone}
          disabled={!selectedPortId}
          className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continuar
        </button>
      </div>
    </main>
  );
}
