import { AlertTriangle } from "lucide-react";

export default function WarningCard({ label, width }: { label: string; width?: string }) {
  return (
    <div
      style={{ width }}
      className="flex min-h-[120px] flex-col justify-between rounded-md bg-warning p-4"
    >
      <AlertTriangle className="h-10 w-10" />
      <div className="text-sm">{label}</div>
    </div>
  );
}
