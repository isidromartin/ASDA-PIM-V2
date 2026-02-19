'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoStore } from '@/store/useDemoStore';

export default function SelectZonePage() {
  const router = useRouter();
  const setZone = useDemoStore((state) => state.setZone);
  const [selectedZone, setSelectedZone] = useState<string>('');

  const go = () => {
    if (!selectedZone) return;
    setZone(selectedZone);
    router.push('/incident');
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-100">
      <h1 className="mb-8 text-3xl font-semibold">Seleccione Zona del Suceso</h1>
      <div className="mb-6 flex gap-4">
        {[
          ['zona-1', 'Zona I'],
          ['zona-2', 'Zona II']
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setSelectedZone(id)}
            className={`rounded-lg border px-8 py-4 shadow-soft transition ${
              selectedZone === id ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-300 bg-white hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={go}
        disabled={!selectedZone}
        className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continuar
      </button>
    </main>
  );
}
