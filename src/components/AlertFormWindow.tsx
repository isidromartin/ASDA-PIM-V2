"use client";

import { FormEvent, useMemo, useState } from "react";
import { useDemoStore } from "@/store/useDemoStore";

function compactTime(input: string) {
  return input.trim().replace(".", ":");
}

export function AlertFormWindow() {
  const { addLog, openWindow, saveAlertDraft, alertDraft, enqueueNotification } =
    useDemoStore();
  const [form, setForm] = useState(alertDraft);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const fieldErrors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.instalacion.trim()) fieldErrors.instalacion = "Indica la instalación";
    if (!form.lugar.trim()) fieldErrors.lugar = "Indica el lugar";
    if (!form.producto.trim()) fieldErrors.producto = "Indica el producto";
    if (!form.responsable.trim()) fieldErrors.responsable = "Indica responsable";

    if (form.hora && !/^\d{1,2}:\d{2}$/.test(compactTime(form.hora))) {
      fieldErrors.hora = "Usa formato HH:MM";
    }

    return fieldErrors;
  }, [form]);

  const stepHint =
    !form.instalacion || !form.lugar
      ? "Paso 1/3: define instalación y lugar para iniciar la alerta."
      : !form.producto || !form.responsable
        ? "Paso 2/3: completa producto y responsable de la activación."
        : "Paso 3/3: añade observaciones y guarda en bitácora.";

  const markTouched = (name: string) => setTouched((prev) => ({ ...prev, [name]: true }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      enqueueNotification({
        message: "Completa los campos obligatorios de la Alerta.",
        variant: "warning",
        windowType: "alert",
        windowTitle: "Alerta"
      });
      setTouched({
        instalacion: true,
        lugar: true,
        hora: true,
        producto: true,
        responsable: true
      });
      return;
    }

    saveAlertDraft(form);
    addLog(
      `Alerta iniciada en ${form.lugar || "ubicación no definida"} (${form.producto || "producto pendiente"})`,
      "Operador OC"
    );
    enqueueNotification({
      message: "Alerta guardada en estado local (demo).",
      variant: "success",
      windowType: "alert",
      windowTitle: "Alerta"
    });
  };

  return (
    <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
      <h4 className="font-semibold">Contingencia en instalación origen conocido</h4>
      <p className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-800">{stepHint}</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Instalación *"
            value={form.instalacion}
            onBlur={() => markTouched("instalacion")}
            onChange={(e) => setForm({ ...form, instalacion: e.target.value })}
          />
          {touched.instalacion && errors.instalacion && <p className="text-xs text-red-600">{errors.instalacion}</p>}
        </div>
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Lugar *"
            value={form.lugar}
            onBlur={() => markTouched("lugar")}
            onChange={(e) => setForm({ ...form, lugar: e.target.value })}
          />
          {touched.lugar && errors.lugar && <p className="text-xs text-red-600">{errors.lugar}</p>}
        </div>
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Hora (HH:MM)"
            value={form.hora}
            onBlur={() => markTouched("hora")}
            onChange={(e) => setForm({ ...form, hora: e.target.value })}
          />
          {touched.hora && errors.hora && <p className="text-xs text-red-600">{errors.hora}</p>}
        </div>
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Producto *"
            value={form.producto}
            onBlur={() => markTouched("producto")}
            onChange={(e) => setForm({ ...form, producto: e.target.value })}
          />
          {touched.producto && errors.producto && <p className="text-xs text-red-600">{errors.producto}</p>}
        </div>
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Responsable *"
            value={form.responsable}
            onBlur={() => markTouched("responsable")}
            onChange={(e) => setForm({ ...form, responsable: e.target.value })}
          />
          {touched.responsable && errors.responsable && <p className="text-xs text-red-600">{errors.responsable}</p>}
        </div>
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Nivel inicial (demo)"
          value={form.nivelInicial}
          onChange={(e) => setForm({ ...form, nivelInicial: e.target.value })}
        />
      </div>
      <textarea
        className="h-24 w-full rounded border border-slate-300 p-2"
        placeholder="Observaciones"
        value={form.observaciones}
        onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
      />
      <div className="flex gap-2">
        <button type="submit" className="rounded bg-blue-700 px-3 py-1 text-white">
          Aceptar/Guardar (demo)
        </button>
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1"
          onClick={() => openWindow("guide", "Guía Operador")}
        >
          Abrir guía
        </button>
      </div>
    </form>
  );
}
