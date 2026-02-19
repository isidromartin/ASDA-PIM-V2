"use client";

import { useEffect } from "react";
import { useDemoStore } from "@/store/useDemoStore";

const styleByVariant = {
  info: "border-blue-300 bg-blue-50 text-blue-900",
  success: "border-emerald-300 bg-emerald-50 text-emerald-900",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
};

const dismissMsByVariant = {
  info: 4500,
  success: 6000,
  warning: 8000,
};

export function NotificationBanner() {
  const { activeNotification, dismissActiveNotification, openWindow, pendingActionCount } = useDemoStore();

  useEffect(() => {
    if (!activeNotification) return;
    const timeoutMs = dismissMsByVariant[activeNotification.variant];
    const timer = setTimeout(() => dismissActiveNotification(), timeoutMs);
    return () => clearTimeout(timer);
  }, [activeNotification, dismissActiveNotification]);

  if (!activeNotification) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-50 w-[360px] max-w-[calc(100vw-2rem)]">
      <div
        className={`pointer-events-auto rounded border px-3 py-2 text-xs shadow-soft ${styleByVariant[activeNotification.variant]}`}
      >
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="font-semibold">Notificación</p>
          <button type="button" className="text-[11px] underline" onClick={() => dismissActiveNotification()}>
            Cerrar
          </button>
        </div>
        <p>{activeNotification.message}</p>
        {pendingActionCount > 0 && (
          <button
            type="button"
            className="mt-2 rounded border border-current/40 px-2 py-0.5 text-[11px]"
            onClick={() => openWindow("notices", "Avisos emitidos")}
          >
            Ver pendientes ({pendingActionCount})
          </button>
        )}
        {activeNotification.windowType && activeNotification.windowTitle && (
          <button
            type="button"
            className="mt-2 rounded border border-current/40 px-2 py-0.5 text-[11px]"
            onClick={() => openWindow(activeNotification.windowType!, activeNotification.windowTitle!)}
          >
            Ir a {activeNotification.windowTitle}
          </button>
        )}
      </div>
    </div>
  );
}
