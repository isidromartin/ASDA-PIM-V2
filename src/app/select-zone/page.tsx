"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/store/useDemoStore";
import { LeafletMap } from "@/components/LeafletMap";
import { ports } from "@/mock/ports";

type ZoneDef = { id: string; label: string; lat: number; lng: number };

const fallbackPort = ports.find((port) => port.clickable) ?? ports[0];

function buildZones(baseLat: number, baseLng: number): ZoneDef[] {
  return [
    { id: "zona-1", label: "Zona I", lat: baseLat + 0.01, lng: baseLng + 0.008 },
    { id: "zona-2", label: "Zona II", lat: baseLat - 0.012, lng: baseLng - 0.01 },
  ];
}

export default function SelectZonePage() {
  const router = useRouter();
  const selectedPortId = useDemoStore((state) => state.selectedPortId);
  const setZone = useDemoStore((state) => state.setZone);
  const [selectedZone, setSelectedZone] = useState<string>("");

  const selectedPort = ports.find((port) => port.id === selectedPortId) ?? fallbackPort;
  const zones = useMemo(
    () => buildZones(selectedPort.coordinates.lat, selectedPort.coordinates.lng),
    [selectedPort.coordinates.lat, selectedPort.coordinates.lng]
  );

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
    [selectedZone, zones]
  );

  return (
    <main className="flex h-screen flex-col bg-slate-100 p-8">
      <h1 className="mb-1 text-2xl font-semibold">Seleccione Zona del Suceso</h1>
      <p className="mb-3 text-sm text-slate-700">Puerto actual: {selectedPort.name}</p>
      <div className="flex-1 overflow-hidden rounded-xl border border-slate-300">
        <LeafletMap
          center={[selectedPort.coordinates.lat, selectedPort.coordinates.lng]}
          zoom={13}
          markers={markers}
          onMarkerClick={setSelectedZone}
          className="h-full w-full"
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {zones.map((zone) => (
          <button
            key={zone.id}
            type="button"
            onClick={() => setSelectedZone(zone.id)}
            className={`rounded border px-3 py-2 text-left text-sm ${
              selectedZone === zone.id ? "border-blue-700 bg-blue-50" : "border-slate-300 bg-white"
            }`}
          >
            <p className="font-semibold">{zone.label}</p>
            <p className="text-xs text-slate-600">{zone.lat.toFixed(4)}, {zone.lng.toFixed(4)}</p>
          </button>
        ))}
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
