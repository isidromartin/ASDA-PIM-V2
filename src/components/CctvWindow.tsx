'use client';

import { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/mock/assets';

export function CctvWindow() {
  const [camera, setCamera] = useState<'cam16' | 'cam22'>('cam16');
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center gap-2">
        <label className="font-medium">Selector</label>
        <select value={camera} onChange={(e) => setCamera(e.target.value as 'cam16' | 'cam22')} className="rounded border border-slate-300 px-2 py-1">
          <option value="cam16">CAM16</option>
          <option value="cam22">CAM22</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Image src={assets.cctv[camera]} alt="CCTV principal" width={460} height={260} className="rounded border border-slate-300" />
        <Image src={assets.cctv.cam22} alt="CCTV secundaria" width={460} height={260} className="rounded border border-slate-300" />
        <Image src={assets.cctv.cam16} alt="CCTV miniatura" width={460} height={260} className="rounded border border-slate-300" />
      </div>
    </div>
  );
}
