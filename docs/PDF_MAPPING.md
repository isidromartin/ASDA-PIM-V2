# PDF Mapping (simulacion-asda.pdf)

## Página → Ruta/Pantalla

| Página PDF | Ruta | Pantalla |
|---|---|---|
| p01 | `/desktop` | Escritorio con icono DAGAS-PIM |
| p02 | `/select-port` | Selección de puerto |
| p03 | `/select-zone` | Selección de zona |
| p04-p13 | `/incident` | Aplicación principal con ribbon, mapa y panel derecho |

## Menús visibles (ruta `/incident`)

- ARCHIVO
- INICIO
- NOTIFICACIONES
- FTES. INT.
- FTES. EXT
- HERRAMIENTAS

## Ítems clicables y comportamiento

| Menú | Ítem | Acción |
|---|---|---|
| ARCHIVO | Sobre DAGAS-PIM | Abre ventana About con disclaimers + Reset demo |
| ARCHIVO | Generar Escenario | Abre placeholder y registra bitácora |
| ARCHIVO | Iniciar Simulacro | Abre placeholder y registra bitácora |
| ARCHIVO | Salir | Vuelve a `/desktop` |
| INICIO | Alerta | Abre formulario de alerta + acceso a guía |
| INICIO | Emergencia Sit.0 | Actualiza estado y bitácora |
| INICIO | Emergencia Sit.1 | Actualiza estado y bitácora |
| INICIO | Desactivación | Actualiza estado y bitácora |
| NOTIFICACIONES | Llamadas | Ventana lista placeholder |
| NOTIFICACIONES | Avisos | Ventana lista placeholder |
| NOTIFICACIONES | POLREP | Ventana formulario POLREP |
| FTES. INT. | Directorio teléfonos | Ventana con contactos mock |
| FTES. INT. | POSIDONIA | Ventana screenshot fuente interna |
| FTES. INT. | DUE | Ventana screenshot placeholder |
| FTES. EXT | Simulador | Ventana con 2 screenshots |
| FTES. EXT | AEMET | Ventana screenshot |
| FTES. EXT | Tráfico marítimo | Ventana screenshot |
| HERRAMIENTAS | Sala Virtual | Ventana participantes + agenda |
| HERRAMIENTAS | CCTV | Ventana selector CAM16/CAM22 + miniaturas |
| HERRAMIENTAS | Iconos | Toggle overlays sobre mapa |

## Assets requeridos por panel

- Mapa principal: `public/assets/map-port.png`
- Formularios: `public/assets/forms/alert.png`, `public/assets/forms/polrep.png`
- Fuentes internas/externas: `public/assets/sources/*.png`
- CCTV: `public/assets/cctv/cam16.png`, `public/assets/cctv/cam22.png`
- Especificación visual: `public/spec/simulacion-asda.pdf` y `public/spec/pages/p01.png..p13.png`
