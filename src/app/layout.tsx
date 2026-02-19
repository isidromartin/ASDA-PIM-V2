import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DAGAS-PIM Demo',
  description: 'Representación de interfaz / demo DAGAS-PIM'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
