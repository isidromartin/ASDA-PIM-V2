"use client";

import { useEffect } from "react";
import { useDemoStore } from "@/store/useDemoStore";

const styleByVariant = {
  info: "border-blue-300 bg-blue-50 text-blue-900",
  success: "border-emerald-300 bg-emerald-50 text-emerald-900",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
};

export function NotificationBanner() {
  const { activeNotification, dismissActiveNotification, openWindow } = useDemoStore();

  useEffect(() => {
    if (!activeNotification) return;
    const timer = setTimeout(() => dismissActiveNotification(), 2600);
    return () => clearTimeout(timer);
  }, [activeNotification, dismissActiveNotification]);

  if (!activeNotification) return null;

  return (
    <div className="border-b border-slate-300 bg-white px-4 py-2 text-xs">
      <div className={`flex items-center justify-between rounded border px-3 py-2 shadow-soft ${styleByVariant[activeNotification.variant]}`}>
        <div className="flex items-center gap-2">
          <span>{activeNotification.message}</span>
          {activeNotification.windowType && activeNotification.windowTitle && (
            <button
              type="button"
              className="rounded border border-current/40 px-2 py-0.5 text-[11px]"
              onClick={() => openWindow(activeNotification.windowType!, activeNotification.windowTitle!)}
            >
              Abrir ventana
            </button>
          )}
        </div>
        <button type="button" className="text-[11px] underline" onClick={() => dismissActiveNotification()}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
