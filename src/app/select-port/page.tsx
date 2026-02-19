"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ports } from "@/mock/ports";
import { useDemoStore } from "@/store/useDemoStore";
import { LeafletMap } from "@/components/LeafletMap";

const defaultPortId = ports.find((port) => port.clickable)?.id ?? "";

export default function SelectPortPage() {
  const router = useRouter();
  const setPort = useDemoStore((state) => state.setPort);
  const setZone = useDemoStore((state) => state.setZone);
  const [selectedPortId, setSelectedPortId] = useState<string>(defaultPortId);

  const selectedPort = ports.find((port) => port.id === selectedPortId);

  const continueToZone = (portId = selectedPortId) => {
    if (!portId) return;
    setPort(portId);
    router.push("/select-zone");
  };

  const continueToIncident = (portId = selectedPortId) => {
    if (!portId) return;
    setPort(portId);
    setZone("zona-1");
    router.push("/incident");
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

      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
        {ports.map((port) => (
          <div
            key={port.id}
            className={`rounded border px-3 py-2 text-xs ${selectedPortId === port.id ? "border-blue-700 bg-blue-50" : "border-slate-300 bg-white"}`}
          >
            <button
              type="button"
              onClick={() => port.clickable && setSelectedPortId(port.id)}
              disabled={!port.clickable}
              className="w-full text-left disabled:cursor-not-allowed disabled:opacity-50"
            >
              <p className="font-semibold">{port.name}</p>
              <p className="text-slate-600">{port.description}</p>
            </button>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => continueToZone(port.id)}
                disabled={!port.clickable}
                className="rounded border border-slate-400 bg-white px-2 py-1 text-[11px] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Elegir zona
              </button>
              <button
                type="button"
                onClick={() => continueToIncident(port.id)}
                disabled={!port.quickIncident}
                className="rounded bg-slate-900 px-2 py-1 text-[11px] text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ir a incidents
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-sm text-slate-700">
          {selectedPortId ? `Seleccionado: ${selectedPort?.name}` : "Selecciona un puerto para continuar"}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => continueToZone()}
            disabled={!selectedPortId}
            className="rounded-lg border border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Elegir zona
          </button>
          <button
            onClick={() => continueToIncident()}
            disabled={!selectedPort?.quickIncident}
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ir a incidents
          </button>
        </div>
      </div>
    </main>
  );
}
