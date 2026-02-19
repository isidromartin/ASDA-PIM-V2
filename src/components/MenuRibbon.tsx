'use client';

import { menuItems, ribbonTabs } from '@/mock/menu';
import { useDemoStore } from '@/store/useDemoStore';

function DemoButton({ label, onClick, disabled = false }: { label: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="rounded border border-slate-300 bg-white px-3 py-1 text-xs hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}

export function MenuRibbon() {
  const { openWindow, addLog, setIncidentStatus, toggleOverlay } = useDemoStore();

  return (
    <div className="border-b border-slate-300 bg-slate-100">
      <div className="flex gap-2 border-b border-slate-300 px-3 py-1 text-xs font-semibold">
        {ribbonTabs.map((tab) => (
          <span key={tab} className="rounded px-2 py-1 hover:bg-white">
            {tab}
          </span>
        ))}
      </div>
      <div className="space-y-2 px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          {menuItems.ARCHIVO.map((item) => {
            if (item === 'Sobre DAGAS-PIM') return null;
            if (item === 'Salir') return <DemoButton key={item} label={item} onClick={() => (window.location.href = '/desktop')} />;
            return <DemoButton key={item} label={item} disabled />;
          })}
          <DemoButton label="Sobre DAGAS-PIM" onClick={() => openWindow('about', 'Sobre DAGAS-PIM')} />
          <DemoButton label="Generar Escenario" onClick={() => {openWindow('scenario', 'Generar Escenario'); addLog('Escenario generado (demo)');}} />
          <DemoButton label="Iniciar Simulacro" onClick={() => {openWindow('simulacro', 'Iniciar Simulacro'); addLog('Simulacro iniciado (demo)');}} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DemoButton label="Alerta" onClick={() => openWindow('alert', 'Alerta')} />
          <DemoButton label="Emergencia Sit.0" onClick={() => setIncidentStatus('EMERGENCIA_SIT_0')} />
          <DemoButton label="Emergencia Sit.1" onClick={() => setIncidentStatus('EMERGENCIA_SIT_1')} />
          <DemoButton label="Desactivación" onClick={() => setIncidentStatus('DESACTIVADO')} />
          <DemoButton label="Llamadas" onClick={() => openWindow('calls', 'Campaña de llamadas')} />
          <DemoButton label="Avisos" onClick={() => openWindow('notices', 'Avisos emitidos')} />
          <DemoButton label="POLREP" onClick={() => openWindow('polrep', 'Informe POLREP')} />
          <DemoButton label="Directorio teléfonos" onClick={() => openWindow('directory', 'Directorio teléfonos')} />
          <DemoButton label="POSIDONIA" onClick={() => openWindow('source-posidonia', 'POSIDONIA')} />
          <DemoButton label="DUE" onClick={() => openWindow('source-due', 'DUE')} />
          <DemoButton label="Anexos PIM" disabled />
          <DemoButton label="Bases de Datos" disabled />
          <DemoButton label="Simulador" onClick={() => openWindow('source-simulator', 'Simulador')} />
          <DemoButton label="AEMET" onClick={() => openWindow('source-aemet', 'AEMET')} />
          <DemoButton label="Tráfico marítimo" onClick={() => openWindow('source-traffic', 'Tráfico marítimo')} />
          <DemoButton label="Sala Virtual" onClick={() => openWindow('virtual-room', 'Sala Virtual')} />
          <DemoButton label="CCTV" onClick={() => openWindow('cctv', 'CCTV')} />
          <DemoButton label="Iconos" onClick={toggleOverlay} />
        </div>
      </div>
    </div>
  );
}
