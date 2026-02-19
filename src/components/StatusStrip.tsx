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

  const contextualHint =
    incidentStatus === "ALERTA"
      ? "Flujo sugerido: valida alerta, geolocaliza aviso y abre POLREP."
      : incidentStatus === "EMERGENCIA_SIT_0"
        ? "Flujo sugerido: coordina llamadas y valida medios disponibles."
        : incidentStatus === "EMERGENCIA_SIT_1"
          ? "Flujo sugerido: emite avisos prioritarios y revisa seguimiento continuo."
          : "Flujo sugerido: documenta cierre y confirma checklist final.";

  const nextStep =
    !alertDraft.instalacion
      ? { label: "Completar formulario de Alerta", action: () => openWindow("alert", "Alerta") }
      : !polrepDraft.referencia
        ? { label: "Completar informe POLREP", action: () => openWindow("polrep", "Informe POLREP") }
        : checked < guideSteps.length
          ? { label: "Avanzar checklist operativo", action: () => openWindow("guide", "Guía Operador") }
          : { label: "Revisar avisos y comunicaciones", action: () => openWindow("notices", "Avisos emitidos") };

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
      <div className="w-full rounded border border-indigo-300 bg-indigo-50 px-3 py-2 text-left text-indigo-900">
        <p className="font-semibold">Hint contextual</p>
        <p>{contextualHint}</p>
      </div>
      <button
        className="w-full rounded border border-blue-300 bg-blue-50 px-3 py-2 text-left text-blue-900"
        onClick={nextStep.action}
      >
        <p className="font-semibold">Siguiente paso recomendado</p>
        <p>{nextStep.label}</p>
      </button>
    </div>
  );
}
