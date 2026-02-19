'use client';

import Image from 'next/image';
import { assets } from '@/mock/assets';
import { useDemoStore } from '@/store/useDemoStore';

export function MapStage() {
  const overlaysEnabled = useDemoStore((state) => state.overlaysEnabled);

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
      <Image src={assets.mapPort} alt="Zona del suceso" fill className="object-cover" />
      {overlaysEnabled && (
        <>
          <div className="absolute left-[40%] top-[46%] h-20 w-24 rounded-full border-2 border-red-600 bg-red-500/30" />
          <div className="absolute left-[46%] top-[41%] h-1 w-28 rotate-12 bg-amber-500" />
          <div className="absolute left-[58%] top-[35%] rounded bg-blue-700 px-2 py-1 text-xs text-white">SEPCAN V</div>
          <div className="absolute left-[30%] top-[58%] rounded bg-blue-700 px-2 py-1 text-xs text-white">SEPCAN I</div>
        </>
      )}
    </div>
  );
}
