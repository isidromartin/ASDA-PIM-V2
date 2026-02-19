export type Port = {
  id: string;
  name: string;
  description: string;
  position: { top: string; left: string };
  clickable?: boolean;
};

export const ports: Port[] = [
  {
    id: 'port-demo',
    name: 'Puerto Atlántico – Demo',
    description: 'Puerto ficticio para simulación de interfaz',
    position: { top: '48%', left: '42%' },
    clickable: true
  },
  {
    id: 'port-norte',
    name: 'Puerto Norte',
    description: 'No disponible en demo',
    position: { top: '35%', left: '55%' }
  },
  {
    id: 'port-sur',
    name: 'Puerto Sur',
    description: 'No disponible en demo',
    position: { top: '62%', left: '28%' }
  }
];
