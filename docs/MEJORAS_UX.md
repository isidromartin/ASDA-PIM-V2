# Mejoras UX pendientes (roadmap vivo)

> Objetivo: ir completando mejoras una a una sin romper el look & feel actual.
>
> Uso: cuando una mejora se complete, marcarla como `[x]` o eliminarla del archivo.

## Prioridad alta

- [x] **Siguiente paso recomendado global**
  - Mostrar una tarjeta persistente con el siguiente paso sugerido según estado (ej: completar POLREP, emitir avisos).
  - Añadir CTA directo para abrir la ventana correspondiente.

- [ ] **Hints / onboarding contextual por fase**
  - Guiar al operador según `incidentStatus` y acciones recientes.
  - Ejemplos: flujo ALERTA, flujo EMERGENCIA SIT-1.

- [x] **Notificaciones flotantes más robustas**
  - Ajustar tiempos por severidad (`info`, `warning`, `success`).
  - Añadir acceso a historial de notificaciones pendientes.

## Mapa y geolocalización

- [ ] **Chinchetas editables**
  - Permitir renombrar, borrar y marcar prioridad/color de cada aviso.
  - Mostrar detalle en click (hora, actor, estado).

- [x] **Modo edición de mapa explícito**
  - Toggle visible ON/OFF para alta de chinchetas.
  - Feedback visual claro cuando el modo está activo.

## Formularios

- [ ] **Auto-guardado de borradores**
  - Guardar en segundo plano (por tiempo o por campo) para Alerta y POLREP.
  - Mostrar indicador "Borrador guardado hace X".

- [ ] **Plantillas rápidas de POLREP**
  - Presets para casos frecuentes (ej: vertido leve, escalado SIT-0/SIT-1).
  - Relleno inicial de resumen y acciones recomendadas.

## Ventanas y navegación

- [ ] **Gestión de foco / minimizado de ventanas**
  - Traer ventanas al frente desde status strip.
  - Añadir dock/listado de ventanas abiertas y recuperación rápida.

- [ ] **Atajos de teclado operativos**
  - Atajos para abrir ventanas clave y cerrar/modular foco.

- [ ] **Simplificar flujo de `/select-port`**
  - Dejar CTA principal clara (`Continuar`) y secundarias como opciones.

## Seguimiento

- [x] Iteración 1: recomendación de siguiente paso + notificaciones + modo edición mapa.
- [ ] Iteración 2: chinchetas editables + historial notificaciones.
- [ ] Iteración 3: auto-guardado + plantillas POLREP + dock de ventanas.
