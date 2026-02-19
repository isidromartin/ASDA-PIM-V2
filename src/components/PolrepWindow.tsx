'use client';

import Image from 'next/image';
import { assets } from '@/mock/assets';

export function PolrepWindow() {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold">Informe POLREP</h4>
      <Image src={assets.forms.polrep} alt="Formulario POLREP" width={880} height={520} className="rounded border border-slate-300" />
      <textarea className="h-28 w-full rounded border border-slate-300 p-2" placeholder="Resumen del informe (demo)" />
    </div>
  );
}
