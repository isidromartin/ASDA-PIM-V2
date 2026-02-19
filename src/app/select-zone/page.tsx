'use client';

import { useRouter } from 'next/navigation';
import { useDemoStore } from '@/store/useDemoStore';

export default function SelectZonePage() {
  const router = useRouter();
  const setZone = useDemoStore((state) => state.setZone);

  const go = (zoneId: string) => {
    setZone(zoneId);
    router.push('/incident');
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-100">
      <h1 className="mb-8 text-3xl font-semibold">Seleccione Zona del Suceso</h1>
      <div className="flex gap-4">
        <button onClick={() => go('zona-1')} className="rounded-lg border border-slate-300 bg-white px-8 py-4 shadow-soft hover:bg-slate-50">
          Zona I
        </button>
        <button onClick={() => go('zona-2')} className="rounded-lg border border-slate-300 bg-white px-8 py-4 shadow-soft hover:bg-slate-50">
          Zona II
        </button>
      </div>
    </main>
  );
}
