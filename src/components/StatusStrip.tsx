"use client";

import { useDemoStore } from "@/store/useDemoStore";

const statusVisual = {
  ALERTA: "bg-amber-100 text-amber-800 border-amber-300",
  EMERGENCIA_SIT_0: "bg-orange-100 text-orange-800 border-orange-300",
  EMERGENCIA_SIT_1: "bg-red-100 text-red-800 border-red-300",
  DESACTIVADO: "bg-emerald-100 text-emerald-800 border-emerald-300",
};

export function StatusStrip() {
  const incidentStatus = useDemoStore((state) => state.incidentStatus);
  const label = incidentStatus.replaceAll("_", ".");

  return (
    <div className="space-y-2 border-b border-slate-200 bg-white px-4 py-2 text-xs">
      <div className="flex items-center gap-3">
        <span
          className={`rounded border px-2 py-1 font-semibold ${statusVisual[incidentStatus]}`}
        >
          PIM [OPERADOR] : {label}
        </span>
        <span
          className={`rounded border px-2 py-1 font-semibold ${statusVisual[incidentStatus]}`}
        >
          PIM [PUERTO] : {label}
        </span>
        <span className="inline-flex items-center gap-1 text-slate-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Sistema operativo (demo)
        </span>
      </div>
      <div
        className={`rounded border px-2 py-1 font-medium ${statusVisual[incidentStatus]}`}
      >
        {incidentStatus === "DESACTIVADO"
          ? "Evento cerrado. Seguimiento pasivo activo."
          : "Monitorización en curso. Última actualización automática hace 15 s (demo)."}
      </div>
    </div>
  );
}
