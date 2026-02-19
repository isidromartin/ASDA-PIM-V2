export const initialLogbook = [
  {
    id: 'log-1',
    timestamp: new Date().toISOString(),
    actor: 'Sistema',
    message: 'Se recibe aviso inicial de posible vertido (demo).'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 60_000).toISOString(),
    actor: 'Operador',
    message: 'Se prepara revisión de procedimientos y medios (demo).'
  }
];

export const initialMedia = ['SEPCAN V', 'SEPCAN I', 'Barrera de contención', 'Skimmer', 'Equipo terrestre'];

export const guideStepLabels = [
  'Confirmar recepción del aviso y registrar hora.',
  'Identificar lugar exacto del incidente.',
  'Verificar producto involucrado y riesgo inicial.',
  'Avisar al responsable operativo de guardia.',
  'Emitir alerta interna preliminar.',
  'Comprobar disponibilidad de medios SEPCAN.',
  'Abrir POLREP de situación inicial.',
  'Coordinar seguimiento meteorológico (AEMET).',
  'Actualizar bitácora con acciones ejecutadas.',
  'Preparar estado para escalado o desactivación.'
];
