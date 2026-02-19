"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ports } from "@/mock/ports";
import { useDemoStore } from "@/store/useDemoStore";
import { LeafletMap } from "@/components/LeafletMap";

export default function SelectPortPage() {
  const router = useRouter();
  const setPort = useDemoStore((state) => state.setPort);
  const [selectedPortId, setSelectedPortId] = useState<string>("");

  const continueToZone = () => {
    if (!selectedPortId) return;
    setPort(selectedPortId);
    router.push("/select-zone");
  };

  const markers = useMemo(
    () =>
      ports.map((port) => ({
        id: port.id,
        lat: port.coordinates.lat,
        lng: port.coordinates.lng,
        label: `${port.name}${port.clickable ? "" : " (no disponible demo)"}`,
        selected: selectedPortId === port.id,
      })),
    [selectedPortId]
  );

  return (
    <main className="flex h-screen flex-col bg-slate-100 p-8">
      <h1 className="mb-4 text-2xl font-semibold">Seleccione un puerto</h1>
      <div className="relative flex-1 overflow-hidden rounded-xl border border-slate-300 bg-slate-200">
        <LeafletMap
          center={[28.12, -15.42]}
          zoom={11}
          markers={markers}
          onMarkerClick={(id) => {
            const port = ports.find((item) => item.id === id);
            if (!port?.clickable) return;
            setSelectedPortId(id);
          }}
          className="h-full w-full"
        />
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
