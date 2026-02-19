'use client';

import { assets } from '@/mock/assets';
import { useDemoStore } from '@/store/useDemoStore';
import { AppWindow } from './AppWindow';
import { AlertFormWindow } from './AlertFormWindow';
import { CctvWindow } from './CctvWindow';
import { DirectoryWindow } from './DirectoryWindow';
import { GuideWindow } from './GuideWindow';
import { PolrepWindow } from './PolrepWindow';
import { SourceWindow } from './SourceWindow';
import { VirtualRoomWindow } from './VirtualRoomWindow';

function Placeholder({ text }: { text: string }) {
  return <p className="text-sm text-slate-700">{text}</p>;
}

export function WindowManager() {
  const { openWindows, closeWindow, resetDemo } = useDemoStore();

  return (
    <div className="pointer-events-none absolute inset-0 z-20 p-6">
      <div className="flex flex-wrap items-start gap-4">
        {openWindows.map((window) => (
          <div key={window.id} className="pointer-events-auto">
            <AppWindow title={window.title} onClose={() => closeWindow(window.id)} wide>
              {window.type === 'about' && (
                <div className="space-y-2 text-sm">
                  <p>Representación de interfaz / demo.</p>
                  <p>Contenido simulado; sin integraciones reales.</p>
                  <p>Diseñado para simplificar operativa, mejorar eficiencia y seguridad (propuesta de valor).</p>
                  <button className="rounded border border-red-300 bg-red-50 px-2 py-1 text-red-700" onClick={resetDemo}>
                    Reset demo
                  </button>
                </div>
              )}
              {window.type === 'guide' && <GuideWindow />}
              {window.type === 'alert' && <AlertFormWindow />}
              {window.type === 'polrep' && <PolrepWindow />}
              {window.type === 'directory' && <DirectoryWindow />}
              {window.type === 'source-posidonia' && (
                <SourceWindow title="POSIDONIA (demo)" images={[assets.sources.posidonia]} text="Fuente interna (contenido simulado)." />
              )}
              {window.type === 'source-due' && <SourceWindow title="DUE (demo)" images={[assets.sources.due]} />}
              {window.type === 'source-simulator' && (
                <SourceWindow title="Simulador (demo)" images={[assets.sources.simulator1, assets.sources.simulator2]} />
              )}
              {window.type === 'source-aemet' && <SourceWindow title="AEMET (demo)" images={[assets.sources.aemet]} />}
              {window.type === 'source-traffic' && <SourceWindow title="Tráfico marítimo (demo)" images={[assets.sources.traffic]} />}
              {window.type === 'cctv' && <CctvWindow />}
              {window.type === 'virtual-room' && <VirtualRoomWindow />}
              {window.type === 'calls' && <Placeholder text="Campaña de llamadas (demo)." />}
              {window.type === 'notices' && <Placeholder text="Avisos emitidos (demo)." />}
              {window.type === 'scenario' && <Placeholder text="Generación de escenario placeholder (demo)." />}
              {window.type === 'simulacro' && <Placeholder text="Simulacro en preparación (demo)." />}
            </AppWindow>
          </div>
        ))}
      </div>
    </div>
  );
}
