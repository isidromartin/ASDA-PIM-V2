'use client';

import { useMemo } from 'react';
import { useDemoStore } from '@/store/useDemoStore';

export function GuideWindow() {
  const { guideSteps, checkGuideStep, guideData, setGuideData, addLog, currentRole } = useDemoStore();

  const missingFirst = useMemo(() => guideSteps.filter((step) => step.id <= 3 && !step.checked).length, [guideSteps]);

  if (currentRole !== 'OC') {
    return <p className="text-sm text-slate-600">Solo Operador del Centro puede usar la guía completa.</p>;
  }

  return (
    <div className="space-y-4 text-sm">
      {missingFirst > 0 && (
        <p className="rounded border border-amber-300 bg-amber-50 p-2 text-amber-700">Te falta completar {missingFirst} pasos críticos (demo).</p>
      )}
      <div>
        <h4 className="mb-2 font-semibold">Guía operador (10 pasos)</h4>
        <div className="space-y-1">
          {guideSteps.map((step) => (
            <label key={step.id} className="flex items-center gap-2 rounded border border-slate-200 px-2 py-1">
              <input type="checkbox" checked={step.checked} onChange={() => checkGuideStep(step.id)} />
              <span>
                {step.id}. {step.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2 font-semibold">Datos clave</h4>
        <div className="grid grid-cols-2 gap-2">
          {([
            ['producto', 'Producto'],
            ['lugar', 'Lugar'],
            ['horaAviso', 'Hora aviso'],
            ['responsable', 'Responsable'],
            ['observaciones', 'Observaciones']
          ] as const).map(([field, label]) => (
            <input
              key={field}
              className="rounded border border-slate-300 px-2 py-1"
              placeholder={label}
              value={guideData[field]}
              onChange={(event) => setGuideData(field, event.target.value)}
            />
          ))}
        </div>
      </div>
      <button
        className="rounded bg-blue-700 px-3 py-1 text-white"
        onClick={() => addLog('Paso de guía marcado como completado (demo).', 'Operador')}
      >
        Marcar paso completado
      </button>
    </div>
  );
}
