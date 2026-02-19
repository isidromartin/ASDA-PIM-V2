'use client';

import { useDemoStore } from '@/store/useDemoStore';
import { initialMedia } from '@/mock/incident';

export function RightPanel() {
  const logbook = useDemoStore((state) => state.logbook);

  return (
    <aside className="w-[320px] shrink-0 border-l border-slate-300 bg-white p-3">
      <div className="mb-3 rounded border border-slate-300 bg-slate-50 p-3 text-center text-sm font-semibold">DAGAS-PIM</div>
      <section className="mb-3">
        <h4 className="mb-2 text-xs font-bold tracking-wide text-slate-700">CUADERNO DE BITÁCORA</h4>
        <div className="max-h-[260px] space-y-2 overflow-auto rounded border border-slate-200 p-2 text-xs">
          {logbook.map((entry) => (
            <article key={entry.id} className="border-b border-slate-100 pb-1">
              <p className="font-semibold">{new Date(entry.timestamp).toLocaleTimeString()} · {entry.actor}</p>
              <p>{entry.message}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h4 className="mb-2 text-xs font-bold tracking-wide text-slate-700">MEDIOS DESPLEGADOS</h4>
        <ul className="space-y-1 rounded border border-slate-200 p-2 text-sm">
          {initialMedia.map((media) => (
            <li key={media}>• {media}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
