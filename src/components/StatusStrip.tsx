'use client';

import { useDemoStore } from '@/store/useDemoStore';

export function StatusStrip() {
  const incidentStatus = useDemoStore((state) => state.incidentStatus);
  const label = incidentStatus.replaceAll('_', '.');
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-2 text-xs">
      <span className="rounded bg-red-100 px-2 py-1 font-semibold text-red-700">PIM [OPERADOR] : {label}</span>
      <span className="rounded bg-blue-100 px-2 py-1 font-semibold text-blue-700">PIM [PUERTO] : {label}</span>
    </div>
  );
}
