'use client';

import Image from 'next/image';
import { assets } from '@/mock/assets';
import { useDemoStore } from '@/store/useDemoStore';

export function AlertFormWindow() {
  const { addLog, openWindow } = useDemoStore();

  return (
    <div className="space-y-3 text-sm">
      <h4 className="font-semibold">Contingencia en instalación origen conocido</h4>
      <Image src={assets.forms.alert} alt="Formulario alerta" width={900} height={500} className="rounded border border-slate-300" />
      <div className="grid grid-cols-2 gap-2">
        <input className="rounded border border-slate-300 p-2" placeholder="Instalación" />
        <input className="rounded border border-slate-300 p-2" placeholder="Hora" />
        <input className="rounded border border-slate-300 p-2" placeholder="Producto" />
        <input className="rounded border border-slate-300 p-2" placeholder="Responsable" />
      </div>
      <div className="flex gap-2">
        <button className="rounded bg-blue-700 px-3 py-1 text-white" onClick={() => addLog('Alerta iniciada', 'Operador OC')}>
          Aceptar/Guardar (demo)
        </button>
        <button className="rounded border border-slate-300 px-3 py-1" onClick={() => openWindow('guide', 'Guía Burro Operador')}>
          Abrir guía
        </button>
      </div>
    </div>
  );
}
