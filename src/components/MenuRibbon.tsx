"use client";

import { useMemo, useState } from "react";
import { menuItems, ribbonTabs } from "@/mock/menu";
import { useDemoStore } from "@/store/useDemoStore";
import { Toast } from "./Toast";

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
  const { openWindow, addLog, setIncidentStatus, toggleOverlay } =
    useDemoStore();
  const [activeTab, setActiveTab] = useState<RibbonTab>("INICIO");
  const [notice, setNotice] = useState<string | null>(null);

  const visibleItems = useMemo(() => menuItems[activeTab], [activeTab]);

  const showNotice = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 2200);
  };

  const handleAction = (item: string) => {
    if (item === "Salir") {
      window.location.href = "/desktop";
      return;
    }

    if (item === "Sobre DAGAS-PIM") {
      openWindow("about", "Sobre DAGAS-PIM");
      showNotice("Panel informativo abierto.");
      return;
    }

    if (item === "Generar Escenario") {
      openWindow("scenario", "Generar Escenario");
      addLog("Escenario generado (demo)");
      showNotice("Escenario operativo generado (demo).");
      return;
    }

    if (item === "Iniciar Simulacro") {
      openWindow("simulacro", "Iniciar Simulacro");
      addLog("Simulacro iniciado (demo)");
      showNotice("Simulacro activo. Monitoreando respuesta...");
      return;
    }

    if (item === "Alerta") {
      openWindow("alert", "Alerta");
      showNotice("Canal de alerta abierto.");
      return;
    }

    if (item === "Emergencia Sit.0") {
      setIncidentStatus("EMERGENCIA_SIT_0");
      showNotice("Estado actualizado: Emergencia Sit.0.");
      return;
    }

    if (item === "Emergencia Sit.1") {
      setIncidentStatus("EMERGENCIA_SIT_1");
      showNotice("Estado actualizado: Emergencia Sit.1.");
      return;
    }

    if (item === "Desactivación") {
      setIncidentStatus("DESACTIVADO");
      showNotice("Emergencia desactivada (demo).");
      return;
    }

    if (item === "POLREP") {
      openWindow("polrep", "Informe POLREP");
      showNotice("Formulario POLREP listo para completar.");
      return;
    }

    if (item === "Llamadas") {
      openWindow("calls", "Campaña de llamadas");
      showNotice("Campaña de llamadas en ejecución (demo).");
      return;
    }

    if (item === "Avisos") {
      openWindow("notices", "Avisos emitidos");
      showNotice("Avisos generados y enviados (demo).");
      return;
    }

    if (item === "Directorio teléfonos") {
      openWindow("directory", "Directorio teléfonos");
      showNotice("Directorio operativo cargado.");
      return;
    }

    if (item === "POSIDONIA") {
      openWindow("source-posidonia", "POSIDONIA");
      showNotice("Consulta POSIDONIA activa (demo).");
      return;
    }

    if (item === "DUE") {
      openWindow("source-due", "DUE");
      showNotice("Consulta DUE activa (demo).");
      return;
    }

    if (item === "Simulador") {
      openWindow("source-simulator", "Simulador");
      showNotice("Simulador cargado con datos demo.");
      return;
    }

    if (item === "AEMET") {
      openWindow("source-aemet", "AEMET");
      showNotice("Canal meteorológico actualizado.");
      return;
    }

    if (item === "Tráfico marítimo") {
      openWindow("source-traffic", "Tráfico marítimo");
      showNotice("Tráfico marítimo sincronizado (demo).");
      return;
    }

    if (item === "Sala Virtual") {
      openWindow("virtual-room", "Sala Virtual");
      showNotice("Sala virtual preparada.");
      return;
    }

    if (item === "CCTV") {
      openWindow("cctv", "CCTV");
      showNotice("CCTV conectado (simulado).");
      return;
    }

    if (item === "Iconos") {
      toggleOverlay();
      showNotice("Capas tácticas del mapa actualizadas.");
      return;
    }

    showNotice("Función visible solo en demo.");
  };

  const disabledItems = [
    "Nuevo",
    "Abrir",
    "Guardar",
    "Guardar como",
    "Compartir",
    "Formación",
    "S N R",
    "Anexos PIM",
    "Bases de Datos",
  ];

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
        <span className="text-xs font-medium text-slate-600">
          Módulo activo: {activeTab}
        </span>
      </div>

      <div className="flex min-h-[54px] flex-wrap items-center gap-2 px-3 py-2">
        {visibleItems.map((item) => (
          <DemoButton
            key={item}
            label={item}
            disabled={disabledItems.includes(item)}
            onClick={() => handleAction(item)}
          />
        ))}
        {activeTab === "ARCHIVO" && (
          <>
            <DemoButton
              label="Sobre DAGAS-PIM"
              onClick={() => handleAction("Sobre DAGAS-PIM")}
            />
            <DemoButton
              label="Generar Escenario"
              onClick={() => handleAction("Generar Escenario")}
            />
            <DemoButton
              label="Iniciar Simulacro"
              onClick={() => handleAction("Iniciar Simulacro")}
            />
          </>
        )}
      </div>

      {notice && (
        <div className="border-t border-slate-200 bg-white/80 px-3 py-2">
          <Toast message={notice} variant="info" />
        </div>
      )}
    </div>
  );
}
