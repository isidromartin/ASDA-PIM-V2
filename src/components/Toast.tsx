export function Toast({ message }: { message: string }) {
  return <div className="rounded border border-slate-300 bg-white px-3 py-2 text-xs shadow-soft">{message}</div>;
}
