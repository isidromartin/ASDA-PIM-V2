"use client";

import { useDemoStore } from "@/store/useDemoStore";

const statusVisual = {
  ALERTA: "bg-amber-100 text-amber-800 border-amber-300",
  EMERGENCIA_SIT_0: "bg-orange-100 text-orange-800 border-orange-300",
  EMERGENCIA_SIT_1: "bg-red-100 text-red-800 border-red-300",
  DESACTIVADO: "bg-emerald-100 text-emerald-800 border-emerald-300",
};

export function StatusStrip() {
  const {
    incidentStatus,
    guideSteps,
    openWindow,
    pendingActionCount,
    activeNotification,
    lastAction,
    alertDraft,
    polrepDraft,
  } = useDemoStore();

  const label = incidentStatus.replaceAll("_", ".");
  const checked = guideSteps.filter((step) => step.checked).length;
  const phase = incidentStatus === "ALERTA" ? "Fase de activación" : incidentStatus === "DESACTIVADO" ? "Fase de cierre" : "Fase de emergencia";
  const plansReady = [alertDraft.instalacion, polrepDraft.referencia].filter(Boolean).length;
  const pendingNotifications = pendingActionCount + (activeNotification ? 1 : 0);

  return (
    <div className="space-y-2 border-b border-slate-200 bg-white px-4 py-2 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded border px-2 py-1 font-semibold ${statusVisual[incidentStatus]}`}>PIM [OPERADOR] : {label}</span>
        <span className={`rounded border px-2 py-1 font-semibold ${statusVisual[incidentStatus]}`}>PIM [PUERTO] : {label}</span>
        <span className="inline-flex items-center gap-1 text-slate-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />Sistema operativo (demo)
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        <button className="rounded border border-slate-300 bg-slate-50 px-2 py-1 text-left" onClick={() => openWindow("guide", "Guía Operador")}>
          <p className="font-semibold">Fase</p>
          <p>{phase}</p>
        </button>
        <button className="rounded border border-slate-300 bg-slate-50 px-2 py-1 text-left" onClick={() => openWindow("alert", "Alerta")}>
          <p className="font-semibold">Planes</p>
          <p>{plansReady}/2 formularios iniciados</p>
        </button>
        <button className="rounded border border-slate-300 bg-slate-50 px-2 py-1 text-left" onClick={() => openWindow("guide", "Guía Operador")}>
          <p className="font-semibold">Checklist</p>
          <p>{checked}/{guideSteps.length} pasos</p>
        </button>
        <button className="rounded border border-slate-300 bg-slate-50 px-2 py-1 text-left" onClick={() => openWindow("notices", "Avisos emitidos")}>
          <p className="font-semibold">Notificaciones</p>
          <p>{pendingNotifications} pendientes</p>
        </button>
        <button className="rounded border border-slate-300 bg-slate-50 px-2 py-1 text-left" onClick={() => openWindow("about", "Sobre DAGAS-PIM")}>
          <p className="font-semibold">Última acción</p>
          <p className="truncate">{lastAction}</p>
        </button>
      </div>
    </div>
  );
}
