# DAGAS-PIM Clickable Mock (Demo)

Representación interactiva (clickable mock) de la plataforma ASDA/DAGAS-PIM.

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Zustand (persistencia en localStorage)

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abrir `http://localhost:3000`.

## Flujo demo

1. `/desktop` → icono DAGAS-PIM.
2. `/select-port` → seleccionar **Puerto Atlántico – Demo**.
3. `/select-zone` → Zona I o Zona II.
4. `/incident` → app principal con ribbon, mapa, panel derecho, ventanas mock y bitácora.

## Scope de la demo

- Sin login real, DB, integraciones externas, GIS real, CCTV real o videollamada real.
- Todo contenido funcional está simulado para UX/validación visual.

## Reemplazo de imágenes

Mantener los mismos nombres de archivos en `public/assets/`:

- `map-port.png`
- `forms/alert.png`, `forms/polrep.png`
- `sources/posidonia.png`, `due.png`, `aemet.png`, `simulator-1.png`, `simulator-2.png`, `traffic.png`
- `cctv/cam16.png`, `cctv/cam22.png`

También se incluyen placeholders de la especificación en `public/spec/`.
