"use client";

import { FormEvent, useState } from "react";
import { useDemoStore } from "@/store/useDemoStore";

export function AlertFormWindow() {
  const { addLog, openWindow } = useDemoStore();
  const [form, setForm] = useState({
    instalacion: "",
    lugar: "",
    hora: "",
    producto: "",
    responsable: "",
    observaciones: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addLog(
      `Alerta iniciada en ${form.lugar || "ubicación no definida"} (${form.producto || "producto pendiente"})`,
      "Operador OC",
    );
  };

  return (
    <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
      <h4 className="font-semibold">
        Contingencia en instalación origen conocido
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Instalación"
          value={form.instalacion}
          onChange={(e) => setForm({ ...form, instalacion: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Lugar"
          value={form.lugar}
          onChange={(e) => setForm({ ...form, lugar: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Hora"
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Producto"
          value={form.producto}
          onChange={(e) => setForm({ ...form, producto: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Responsable"
          value={form.responsable}
          onChange={(e) => setForm({ ...form, responsable: e.target.value })}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Nivel inicial (demo)"
        />
      </div>
      <textarea
        className="h-24 w-full rounded border border-slate-300 p-2"
        placeholder="Observaciones"
        value={form.observaciones}
        onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-blue-700 px-3 py-1 text-white"
        >
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
