"use client";

import { FormEvent, useState } from "react";
import { useDemoStore } from "@/store/useDemoStore";

export function PolrepWindow() {
  const addLog = useDemoStore((state) => state.addLog);
  const [form, setForm] = useState({
    referencia: "",
    fechaHora: "",
    ubicacion: "",
    emisor: "",
    resumen: "",
    acciones: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addLog(
      `POLREP guardado (${form.referencia || "sin referencia"})`,
      "Operador OC",
    );
  };

  return (
    <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
      <h4 className="font-semibold">Informe POLREP</h4>
      <div className="grid grid-cols-2 gap-2">
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Referencia"
          value={form.referencia}
          onChange={(e) => setForm({ ...form, referencia: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Fecha y hora"
          value={form.fechaHora}
          onChange={(e) => setForm({ ...form, fechaHora: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Ubicación"
          value={form.ubicacion}
          onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Emisor"
          value={form.emisor}
          onChange={(e) => setForm({ ...form, emisor: e.target.value })}
        />
      </div>
      <textarea
        className="h-24 w-full rounded border border-slate-300 p-2"
        placeholder="Resumen de situación"
        value={form.resumen}
        onChange={(e) => setForm({ ...form, resumen: e.target.value })}
      />
      <textarea
        className="h-24 w-full rounded border border-slate-300 p-2"
        placeholder="Acciones recomendadas"
        value={form.acciones}
        onChange={(e) => setForm({ ...form, acciones: e.target.value })}
      />
      <button
        type="submit"
        className="rounded bg-blue-700 px-3 py-1 text-white"
      >
        Guardar POLREP (demo)
      </button>
    </form>
  );
}
