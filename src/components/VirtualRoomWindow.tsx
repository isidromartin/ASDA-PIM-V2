const participants = ['OC Operador', 'Director del Plan', 'Coordinador Marítimo', 'Responsable Ambiental', 'Comunicaciones'];

export function VirtualRoomWindow() {
  return (
    <div className="grid gap-4 text-sm md:grid-cols-2">
      <div>
        <h4 className="mb-2 font-semibold">Participantes</h4>
        <ul className="space-y-1">
          {participants.map((participant) => (
            <li key={participant} className="rounded border border-slate-200 px-2 py-1">
              {participant}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <div>
          <h4 className="mb-2 font-semibold">Agenda</h4>
          <ul className="list-disc pl-5">
            <li>Estado situacional inicial.</li>
            <li>Asignación de medios desplegados.</li>
            <li>Seguimiento de próximos 30 minutos.</li>
          </ul>
        </div>
        <div className="rounded border border-dashed border-slate-400 bg-slate-50 p-4 text-center text-slate-600">
          Videoconferencia (integración futura)
        </div>
      </div>
    </div>
  );
}
