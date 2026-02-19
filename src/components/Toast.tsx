export function Toast({
  message,
  variant = "info",
}: {
  message: string;
  variant?: "info" | "success" | "warning";
}) {
  const style = {
    info: "border-blue-300 bg-blue-50 text-blue-900",
    success: "border-emerald-300 bg-emerald-50 text-emerald-900",
    warning: "border-amber-300 bg-amber-50 text-amber-900",
  }[variant];

  return (
    <div className={`rounded border px-3 py-2 text-xs shadow-soft ${style}`}>
      {message}
    </div>
  );
}
