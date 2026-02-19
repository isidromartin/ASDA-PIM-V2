"use client";

import { useMemo, useState } from "react";
import { menuItems, ribbonTabs } from "@/mock/menu";
import { useDemoStore } from "@/store/useDemoStore";

type RibbonTab = (typeof ribbonTabs)[number];

function DemoButton({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export function MenuRibbon() {
  const { openWindow, addLog, setIncidentStatus, toggleOverlay, enqueueNotification } = useDemoStore();
  const [activeTab, setActiveTab] = useState<RibbonTab>("INICIO");

  const visibleItems = useMemo(() => menuItems[activeTab], [activeTab]);

  const notify = (message: string, windowType?: Parameters<typeof openWindow>[0], windowTitle?: string) =>
    enqueueNotification({ message, variant: "info", windowType, windowTitle });

  const handleAction = (item: string) => {
    if (item === "Salir") {
      window.location.href = "/desktop";
      return;
    }

    if (item === "Sobre DAGAS-PIM") {
      openWindow("about", "Sobre DAGAS-PIM");
      notify("Panel informativo abierto.", "about", "Sobre DAGAS-PIM");
      return;
    }

    if (item === "Generar Escenario") {
      openWindow("scenario", "Generar Escenario");
      addLog("Escenario generado (demo)");
      notify("Escenario operativo generado (demo).", "scenario", "Generar Escenario");
      return;
    }

    if (item === "Iniciar Simulacro") {
      openWindow("simulacro", "Iniciar Simulacro");
      addLog("Simulacro iniciado (demo)");
      notify("Simulacro activo. Monitoreando respuesta...", "simulacro", "Iniciar Simulacro");
      return;
    }

    if (item === "Alerta") {
      openWindow("alert", "Alerta");
      notify("Canal de alerta abierto.", "alert", "Alerta");
      return;
    }

    if (item === "Emergencia Sit.0") {
      setIncidentStatus("EMERGENCIA_SIT_0");
      notify("Estado actualizado: Emergencia Sit.0.");
      return;
    }

    if (item === "Emergencia Sit.1") {
      setIncidentStatus("EMERGENCIA_SIT_1");
      notify("Estado actualizado: Emergencia Sit.1.");
      return;
    }

    if (item === "Desactivación") {
      setIncidentStatus("DESACTIVADO");
      notify("Emergencia desactivada (demo).");
      return;
    }

    if (item === "POLREP") {
      openWindow("polrep", "Informe POLREP");
      notify("Formulario POLREP listo para completar.", "polrep", "Informe POLREP");
      return;
    }

    if (item === "Llamadas") {
      openWindow("calls", "Campaña de llamadas");
      notify("Campaña de llamadas en ejecución (demo).", "calls", "Campaña de llamadas");
      return;
    }

    if (item === "Avisos") {
      openWindow("notices", "Avisos emitidos");
      notify("Avisos generados y enviados (demo).", "notices", "Avisos emitidos");
      return;
    }

    if (item === "Directorio teléfonos") {
      openWindow("directory", "Directorio teléfonos");
      notify("Directorio operativo cargado.", "directory", "Directorio teléfonos");
      return;
    }

    if (item === "POSIDONIA") {
      openWindow("source-posidonia", "POSIDONIA");
      notify("Consulta POSIDONIA activa (demo).", "source-posidonia", "POSIDONIA");
      return;
    }

    if (item === "DUE") {
      openWindow("source-due", "DUE");
      notify("Consulta DUE activa (demo).", "source-due", "DUE");
      return;
    }

    if (item === "Simulador") {
      openWindow("source-simulator", "Simulador");
      notify("Simulador cargado con datos demo.", "source-simulator", "Simulador");
      return;
    }

    if (item === "AEMET") {
      openWindow("source-aemet", "AEMET");
      notify("Canal meteorológico actualizado.", "source-aemet", "AEMET");
      return;
    }

    if (item === "Tráfico marítimo") {
      openWindow("source-traffic", "Tráfico marítimo");
      notify("Tráfico marítimo sincronizado (demo).", "source-traffic", "Tráfico marítimo");
      return;
    }

    if (item === "Sala Virtual") {
      openWindow("virtual-room", "Sala Virtual");
      notify("Sala virtual preparada.", "virtual-room", "Sala Virtual");
      return;
    }

    if (item === "CCTV") {
      openWindow("cctv", "CCTV");
      notify("CCTV conectado (simulado).", "cctv", "CCTV");
      return;
    }

    if (item === "Iconos") {
      toggleOverlay();
      notify("Capas tácticas del mapa actualizadas.");
      return;
    }

    notify("Función visible solo en demo.");
  };

  const disabledItems = ["Nuevo", "Abrir", "Guardar", "Guardar como", "Compartir", "Formación", "S N R", "Anexos PIM", "Bases de Datos"];

  return (
    <div className="border-b border-slate-300 bg-slate-100">
      <div className="flex items-center justify-between border-b border-slate-300 px-3 py-1">
        <div className="flex gap-2 text-xs font-semibold">
          {ribbonTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded px-2 py-1 transition ${activeTab === tab ? "bg-white text-blue-800 shadow-sm" : "text-slate-700 hover:bg-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-xs font-medium text-slate-600">Módulo activo: {activeTab}</span>
      </div>

      <div className="flex min-h-[54px] flex-wrap items-center gap-2 px-3 py-2">
        {visibleItems.map((item) => (
          <DemoButton key={item} label={item} disabled={disabledItems.includes(item)} onClick={() => handleAction(item)} />
        ))}
        {activeTab === "ARCHIVO" && (
          <>
            <DemoButton label="Sobre DAGAS-PIM" onClick={() => handleAction("Sobre DAGAS-PIM")} />
            <DemoButton label="Generar Escenario" onClick={() => handleAction("Generar Escenario")} />
            <DemoButton label="Iniciar Simulacro" onClick={() => handleAction("Iniciar Simulacro")} />
          </>
        )}
      </div>
    </div>
  );
}
