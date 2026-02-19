export const ribbonTabs = ['ARCHIVO', 'INICIO', 'NOTIFICACIONES', 'FTES. INT.', 'FTES. EXT', 'HERRAMIENTAS'] as const;

export const menuItems = {
  ARCHIVO: ['Nuevo', 'Abrir', 'Guardar', 'Guardar como', 'Compartir', 'Formación', 'Salir'],
  INICIO: ['Alerta', 'Emergencia Sit.0', 'Emergencia Sit.1', 'Desactivación'],
  NOTIFICACIONES: ['Llamadas', 'Avisos', 'POLREP'],
  'FTES. INT.': ['Anexos PIM', 'Directorio teléfonos', 'Bases de Datos', 'DUE', 'POSIDONIA'],
  'FTES. EXT': ['Simulador', 'AEMET', 'Tráfico marítimo'],
  HERRAMIENTAS: ['Sala Virtual', 'CCTV', 'Iconos']
} as const;
