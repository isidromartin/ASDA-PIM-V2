'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DesktopPage() {
  const router = useRouter();

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-700 to-blue-900">
      <button
        onClick={() => router.push('/select-port')}
        className="flex flex-col items-center gap-2 rounded-xl border border-white/40 bg-white/10 p-6 text-white shadow-soft"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded bg-white/20 p-1">
          <Image src="/assets/icono.png" alt="Icono DAGAS-PIM" width={56} height={56} className="h-14 w-14 object-contain" />
        </div>
        <span className="text-sm font-semibold">DAGAS-PIM</span>
      </button>
    </main>
  );
}
