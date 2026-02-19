'use client';

import { useMemo } from 'react';
import { useDemoStore } from '@/store/useDemoStore';
import { LeafletMap } from './LeafletMap';

export function MapStage() {
  const overlaysEnabled = useDemoStore((state) => state.overlaysEnabled);
  const noticePins = useDemoStore((state) => state.noticePins);
  const addNoticePin = useDemoStore((state) => state.addNoticePin);
  const toggleOverlay = useDemoStore((state) => state.toggleOverlay);

  const markers = useMemo(
    () => noticePins.map((pin) => ({ id: pin.id, lat: pin.lat, lng: pin.lng, label: pin.label })),
    [noticePins]
  );

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
      <LeafletMap
        center={[28.12, -15.42]}
        zoom={11}
        markers={markers}
        onMapClick={(lat, lng) => {
          if (!overlaysEnabled) return;
          addNoticePin(lat, lng, `Aviso ${noticePins.length + 1}`);
        }}
        className="h-full w-full"
      />
      <div className="pointer-events-none absolute left-2 top-2 rounded bg-white/85 px-2 py-1 text-xs text-slate-700">
        {overlaysEnabled ? 'Haz click para añadir chinchetas de aviso.' : 'Activa Iconos para habilitar chinchetas.'}
      </div>
      <button
        type="button"
        className={`absolute right-2 top-2 rounded border px-2 py-1 text-xs ${
          overlaysEnabled ? 'border-blue-400 bg-blue-100 text-blue-900' : 'border-slate-300 bg-white text-slate-700'
        }`}
        onClick={toggleOverlay}
      >
        Modo edición mapa: {overlaysEnabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
