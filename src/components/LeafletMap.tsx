'use client';

import { useEffect, useRef } from 'react';

type MarkerItem = {
  id: string;
  lat: number;
  lng: number;
  label: string;
  selected?: boolean;
};

type LeafletMapProps = {
  center: [number, number];
  zoom?: number;
  markers?: MarkerItem[];
  onMapClick?: (lat: number, lng: number) => void;
  onMarkerClick?: (id: string) => void;
  className?: string;
};

declare global {
  interface Window {
    L?: any;
  }
}

let leafletLoader: Promise<void> | null = null;

async function loadLeaflet() {
  if (typeof window === 'undefined' || window.L) return;
  if (!leafletLoader) {
    leafletLoader = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('No se pudo cargar Leaflet'));
      document.body.appendChild(script);
    });
  }
  await leafletLoader;
}

export function LeafletMap({ center, zoom = 10, markers = [], onMapClick, onMarkerClick, className }: LeafletMapProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerLayerRef = useRef<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await loadLeaflet();
      if (cancelled || !rootRef.current || !window.L) return;

      const map = window.L.map(rootRef.current).setView(center, zoom);
      mapRef.current = map;

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      if (onMapClick) {
        map.on('click', (event: any) => onMapClick(event.latlng.lat, event.latlng.lng));
      }
    };

    run();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  useEffect(() => {
    if (!mapRef.current || !window.L) return;

    markerLayerRef.current.forEach((m) => m.remove());
    markerLayerRef.current = markers.map((marker) => {
      const pin = window.L.circleMarker([marker.lat, marker.lng], {
        radius: marker.selected ? 10 : 7,
        color: marker.selected ? '#1d4ed8' : '#334155',
        weight: 2,
        fillColor: marker.selected ? '#3b82f6' : '#64748b',
        fillOpacity: 0.9
      }).addTo(mapRef.current);
      pin.bindTooltip(marker.label, { direction: 'top' });
      if (onMarkerClick) {
        pin.on('click', () => onMarkerClick(marker.id));
      }
      return pin;
    });
  }, [markers, onMarkerClick]);

  return <div ref={rootRef} className={className ?? 'h-full w-full'} />;
}
