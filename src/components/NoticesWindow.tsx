'use client';

import { useDemoStore } from '@/store/useDemoStore';

export function NoticesWindow() {
  const { activeNotification, notifications, notificationHistory, dismissActiveNotification, closeWindowByType } = useDemoStore();

  return (
    <div className="space-y-3 text-xs text-slate-700">
      <div className="rounded border border-slate-200 bg-slate-50 p-2">
        <p className="font-semibold text-slate-800">Estado de cola</p>
        <p>Activa: {activeNotification ? 'Sí' : 'No'} · En cola: {notifications.length}</p>
        {activeNotification && (
          <button className="mt-2 rounded border border-slate-300 px-2 py-1" onClick={dismissActiveNotification}>
            Descartar notificación activa
          </button>
        )}
      </div>

      <div>
        <p className="mb-1 font-semibold text-slate-800">Historial reciente</p>
        <ul className="max-h-40 space-y-1 overflow-auto rounded border border-slate-200 p-2">
          {notificationHistory.length === 0 && <li className="text-slate-500">Sin notificaciones registradas.</li>}
          {notificationHistory.map((item) => (
            <li key={item.id} className="rounded bg-slate-50 px-2 py-1">
              <p className="font-medium">{item.message}</p>
              <p className="text-[11px] uppercase text-slate-500">{item.variant} · {new Date(item.createdAt).toLocaleTimeString()}</p>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-emerald-800"
        onClick={() => closeWindowByType('notices')}
      >
        Gestión completada · cerrar ventana
      </button>
    </div>
  );
}
