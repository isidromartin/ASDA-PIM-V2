# Imágenes requeridas para que la demo funcione correctamente

Este documento lista **todas las imágenes que hay que añadir** en el repositorio para que la interfaz clickable DAGAS-PIM se vea y funcione sin errores visuales.

> Formato recomendado: `PNG` (o adaptar código si se usa otro formato).
> Resoluciones sugeridas para mantener buena calidad visual (pueden variar mientras se respete proporción y nombre/ruta).

## 1) Mapa principal

- `public/assets/map-port.png`
  - Uso: imagen aérea principal en la pantalla `/incident`.
  - Componente: `MapStage`.
  - Sugerencia: 1920x1080 o superior.

## 2) Formularios

- `public/assets/forms/alert.png`
  - Uso: apoyo visual del formulario de **Alerta**.
  - Componente: `AlertFormWindow`.
  - Sugerencia: 1400x900.

- `public/assets/forms/polrep.png`
  - Uso: apoyo visual del formulario **POLREP**.
  - Componente: `PolrepWindow`.
  - Sugerencia: 1400x900.

## 3) Fuentes internas / externas

- `public/assets/sources/posidonia.png`
  - Uso: ventana fuente interna **POSIDONIA**.

- `public/assets/sources/due.png`
  - Uso: ventana fuente interna **DUE**.

- `public/assets/sources/aemet.png`
  - Uso: ventana fuente externa **AEMET**.

- `public/assets/sources/simulator-1.png`
  - Uso: primera captura de **Simulador**.

- `public/assets/sources/simulator-2.png`
  - Uso: segunda captura de **Simulador**.

- `public/assets/sources/traffic.png`
  - Uso: ventana fuente externa **Tráfico marítimo**.

Componentes relacionados: `SourceWindow` + `WindowManager`.
Sugerencia para todas: 1280x720 mínimo.

## 4) CCTV

- `public/assets/cctv/cam16.png`
  - Uso: miniaturas/cámara en ventana **CCTV**.

- `public/assets/cctv/cam22.png`
  - Uso: miniaturas/cámara en ventana **CCTV**.

Componente: `CctvWindow`.
Sugerencia: 1280x720.

## 5) Especificación visual (referencia PDF)

- `public/spec/simulacion-asda.pdf`
  - Uso: documento fuente de referencia (source of truth de diseño/flujo).

- `public/spec/pages/p01.png`
- `public/spec/pages/p02.png`
- `public/spec/pages/p03.png`
- `public/spec/pages/p04.png`
- `public/spec/pages/p05.png`
- `public/spec/pages/p06.png`
- `public/spec/pages/p07.png`
- `public/spec/pages/p08.png`
- `public/spec/pages/p09.png`
- `public/spec/pages/p10.png`
- `public/spec/pages/p11.png`
- `public/spec/pages/p12.png`
- `public/spec/pages/p13.png`
  - Uso: referencias visuales por página para validación rápida del mock.
  - Nota: no afectan a la lógica de runtime si no se muestran directamente en UI, pero sí al paquete de especificación del proyecto.

---

## Checklist rápido

Para que la app no tenga huecos visuales en las ventanas actuales, añade al menos estos 11 archivos operativos:

- `public/assets/map-port.png`
- `public/assets/forms/alert.png`
- `public/assets/forms/polrep.png`
- `public/assets/sources/posidonia.png`
- `public/assets/sources/due.png`
- `public/assets/sources/aemet.png`
- `public/assets/sources/simulator-1.png`
- `public/assets/sources/simulator-2.png`
- `public/assets/sources/traffic.png`
- `public/assets/cctv/cam16.png`
- `public/assets/cctv/cam22.png`

Si además quieres completar el paquete de especificación, añade también `p01..p13.png` bajo `public/spec/pages/`.
