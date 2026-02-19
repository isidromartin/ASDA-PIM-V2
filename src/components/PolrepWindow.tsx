"use client";

import { FormEvent, useMemo, useState } from "react";
import { useDemoStore } from "@/store/useDemoStore";

export function PolrepWindow() {
  const { addLog, polrepDraft, savePolrepDraft, enqueueNotification } = useDemoStore();
  const [form, setForm] = useState(polrepDraft);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const fieldErrors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.referencia.trim()) fieldErrors.referencia = "Referencia obligatoria";
    if (!form.ubicacion.trim()) fieldErrors.ubicacion = "Ubicación obligatoria";
    if (!form.emisor.trim()) fieldErrors.emisor = "Emisor obligatorio";
    if (!form.resumen.trim()) fieldErrors.resumen = "Añade un resumen";

    return fieldErrors;
  }, [form]);

  const hint =
    !form.referencia || !form.ubicacion
      ? "Paso 1/2: rellena cabecera mínima del POLREP."
      : "Paso 2/2: resume situación y acciones para difundir.";

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      setTouched({ referencia: true, ubicacion: true, emisor: true, resumen: true });
      enqueueNotification({
        message: "POLREP incompleto: revisa los campos marcados.",
        variant: "warning",
        windowType: "polrep",
        windowTitle: "Informe POLREP"
      });
      return;
    }

    savePolrepDraft(form);
    addLog(`POLREP guardado (${form.referencia || "sin referencia"})`, "Operador OC");
    enqueueNotification({
      message: `POLREP ${form.referencia} guardado en local (demo).`,
      variant: "success",
      windowType: "polrep",
      windowTitle: "Informe POLREP"
    });
  };

  return (
    <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
      <h4 className="font-semibold">Informe POLREP</h4>
      <p className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-800">{hint}</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Referencia *"
            value={form.referencia}
            onBlur={() => setTouched((prev) => ({ ...prev, referencia: true }))}
            onChange={(e) => setForm({ ...form, referencia: e.target.value })}
          />
          {touched.referencia && errors.referencia && <p className="text-xs text-red-600">{errors.referencia}</p>}
        </div>
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Fecha y hora"
          value={form.fechaHora}
          onChange={(e) => setForm({ ...form, fechaHora: e.target.value })}
        />
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Ubicación *"
            value={form.ubicacion}
            onBlur={() => setTouched((prev) => ({ ...prev, ubicacion: true }))}
            onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
          />
          {touched.ubicacion && errors.ubicacion && <p className="text-xs text-red-600">{errors.ubicacion}</p>}
        </div>
        <div>
          <input
            className="w-full rounded border border-slate-300 p-2"
            placeholder="Emisor *"
            value={form.emisor}
            onBlur={() => setTouched((prev) => ({ ...prev, emisor: true }))}
            onChange={(e) => setForm({ ...form, emisor: e.target.value })}
          />
          {touched.emisor && errors.emisor && <p className="text-xs text-red-600">{errors.emisor}</p>}
        </div>
      </div>
      <div>
        <textarea
          className="h-24 w-full rounded border border-slate-300 p-2"
          placeholder="Resumen de situación *"
          value={form.resumen}
          onBlur={() => setTouched((prev) => ({ ...prev, resumen: true }))}
          onChange={(e) => setForm({ ...form, resumen: e.target.value })}
        />
        {touched.resumen && errors.resumen && <p className="text-xs text-red-600">{errors.resumen}</p>}
      </div>
      <textarea
        className="h-24 w-full rounded border border-slate-300 p-2"
        placeholder="Acciones recomendadas"
        value={form.acciones}
        onChange={(e) => setForm({ ...form, acciones: e.target.value })}
      />
      <button type="submit" className="rounded bg-blue-700 px-3 py-1 text-white">
        Guardar POLREP (demo)
      </button>
    </form>
  );
}
