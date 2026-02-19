'use client';

type AppWindowProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
};

export function AppWindow({ title, onClose, children, wide }: AppWindowProps) {
  return (
    <div className={`relative z-[1210] rounded-xl border border-slate-300 bg-white shadow-soft ${wide ? 'w-[760px]' : 'w-[580px]'}`}>
      <div className="flex items-center justify-between rounded-t-xl border-b border-slate-200 bg-slate-100 px-4 py-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{title}</h3>
        <button onClick={onClose} className="rounded border border-slate-400 px-2 py-0.5 text-xs hover:bg-slate-200">
          Cerrar
        </button>
      </div>
      <div className="max-h-[70vh] overflow-auto p-4">{children}</div>
    </div>
  );
}
