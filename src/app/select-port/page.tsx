'use client';

import { useRouter } from 'next/navigation';
import { ports } from '@/mock/ports';
import { useDemoStore } from '@/store/useDemoStore';

export default function SelectPortPage() {
  const router = useRouter();
  const setPort = useDemoStore((state) => state.setPort);

  return (
    <main className="flex h-screen flex-col bg-slate-100 p-8">
      <h1 className="mb-4 text-2xl font-semibold">Seleccione un puerto</h1>
      <div className="relative flex-1 rounded-xl border border-slate-300 bg-[linear-gradient(150deg,#d9ecff,#f6fbff)]">
        {ports.map((port) => (
          <button
            key={port.id}
            style={port.position}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs ${
              port.clickable ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-400 bg-white text-slate-500'
            }`}
            onClick={() => {
              if (!port.clickable) return;
              setPort(port.id);
              router.push('/select-zone');
            }}
          >
            {port.name}
          </button>
        ))}
      </div>
    </main>
  );
}
