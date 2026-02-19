const contacts = [
  ['Ana Gil', 'Coordinación', '+34 600 111 111', 'ana.gil@demo.local'],
  ['Luis Pardo', 'Director Plan', '+34 600 222 222', 'luis.pardo@demo.local'],
  ['Eva Martín', 'Operador OC', '+34 600 333 333', 'eva.martin@demo.local'],
  ['Carlos Vega', 'Medios Marítimos', '+34 600 444 444', 'carlos.vega@demo.local'],
  ['Nora Díaz', 'Logística', '+34 600 555 555', 'nora.diaz@demo.local'],
  ['Irene Suárez', 'Comunicaciones', '+34 600 666 666', 'irene.suarez@demo.local'],
  ['Pablo León', 'Seguridad', '+34 600 777 777', 'pablo.leon@demo.local'],
  ['Sofía Ruiz', 'Medio Ambiente', '+34 600 888 888', 'sofia.ruiz@demo.local']
];

export function DirectoryWindow() {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-300 text-left">
          <th>Nombre</th>
          <th>Rol</th>
          <th>Teléfono</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact[0]} className="border-b border-slate-100">
            {contact.map((item) => (
              <td key={item} className="py-1">
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
