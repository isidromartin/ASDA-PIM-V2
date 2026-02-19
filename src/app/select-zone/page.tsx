"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/store/useDemoStore";
import { LeafletMap } from "@/components/LeafletMap";

const zones = [
  { id: "zona-1", label: "Zona I", lat: 28.145, lng: -15.405 },
  { id: "zona-2", label: "Zona II", lat: 28.08, lng: -15.45 },
];

export default function SelectZonePage() {
  const router = useRouter();
  const setZone = useDemoStore((state) => state.setZone);
  const [selectedZone, setSelectedZone] = useState<string>("");

  const go = () => {
    if (!selectedZone) return;
    setZone(selectedZone);
    router.push("/incident");
  };

  const markers = useMemo(
    () =>
      zones.map((zone) => ({
        id: zone.id,
        lat: zone.lat,
        lng: zone.lng,
        label: zone.label,
        selected: selectedZone === zone.id,
      })),
    [selectedZone]
  );

  return (
    <main className="flex h-screen flex-col bg-slate-100 p-8">
      <h1 className="mb-4 text-2xl font-semibold">Seleccione Zona del Suceso</h1>
      <div className="flex-1 overflow-hidden rounded-xl border border-slate-300">
        <LeafletMap
          center={[28.12, -15.42]}
          zoom={11}
          markers={markers}
          onMarkerClick={setSelectedZone}
          className="h-full w-full"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-700">
          {selectedZone ? `Seleccionada: ${zones.find((zone) => zone.id === selectedZone)?.label}` : "Selecciona una zona para continuar"}
        </p>
        <button
          onClick={go}
          disabled={!selectedZone}
          className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continuar
        </button>
      </div>
    </main>
  );
}
