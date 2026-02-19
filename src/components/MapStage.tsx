'use client';

import { useMemo, useState } from 'react';
import { useDemoStore } from '@/store/useDemoStore';
import { LeafletMap } from './LeafletMap';

export function MapStage() {
  const overlaysEnabled = useDemoStore((state) => state.overlaysEnabled);
  const noticePins = useDemoStore((state) => state.noticePins);
  const addNoticePin = useDemoStore((state) => state.addNoticePin);
  const updateNoticePin = useDemoStore((state) => state.updateNoticePin);
  const removeNoticePin = useDemoStore((state) => state.removeNoticePin);
  const toggleOverlay = useDemoStore((state) => state.toggleOverlay);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const selectedPin = noticePins.find((pin) => pin.id === selectedPinId) ?? null;

  const markers = useMemo(
    () => noticePins.map((pin) => ({ id: pin.id, lat: pin.lat, lng: pin.lng, label: pin.label, selected: pin.id === selectedPinId })),
    [noticePins, selectedPinId]
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
        onMarkerClick={setSelectedPinId}
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

      {selectedPin && (
        <div className="absolute bottom-2 left-2 w-72 rounded border border-slate-300 bg-white p-2 text-xs shadow-soft">
          <p className="font-semibold text-slate-800">Editar aviso</p>
          <label className="mt-2 block">
            <span className="mb-1 block text-slate-600">Etiqueta</span>
            <input
              className="w-full rounded border border-slate-300 px-2 py-1"
              value={selectedPin.label}
              onChange={(event) => updateNoticePin(selectedPin.id, { label: event.target.value })}
            />
          </label>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className={`rounded border px-2 py-1 ${selectedPin.priority === 'high' ? 'border-red-400 bg-red-100 text-red-800' : 'border-slate-300 bg-slate-50 text-slate-700'}`}
              onClick={() => updateNoticePin(selectedPin.id, { priority: selectedPin.priority === 'high' ? 'normal' : 'high' })}
            >
              Prioridad: {selectedPin.priority === 'high' ? 'Alta' : 'Normal'}
            </button>
            <button
              type="button"
              className="rounded border border-red-300 bg-red-50 px-2 py-1 text-red-700"
              onClick={() => {
                removeNoticePin(selectedPin.id);
                setSelectedPinId(null);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
