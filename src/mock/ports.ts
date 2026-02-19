export type Port = {
  id: string;
  name: string;
  description: string;
  position: { top: string; left: string };
  coordinates: { lat: number; lng: number };
  clickable?: boolean;
  quickIncident?: boolean;
};

export const ports: Port[] = [
  {
    id: 'port-demo',
    name: 'Puerto Atlántico – Demo',
    description: 'Puerto ficticio para simulación de interfaz',
    position: { top: '48%', left: '42%' },
    coordinates: { lat: 28.138, lng: -15.417 },
    clickable: true,
    quickIncident: true
  },
  {
    id: 'port-norte',
    name: 'Puerto Norte',
    description: 'Disponible para flujo directo a incident (demo)',
    position: { top: '35%', left: '55%' },
    coordinates: { lat: 28.19, lng: -15.39 },
    clickable: true,
    quickIncident: true
  },
  {
    id: 'port-sur',
    name: 'Puerto Sur',
    description: 'No disponible en demo',
    position: { top: '62%', left: '28%' },
    coordinates: { lat: 28.03, lng: -15.45 }
  }
];
