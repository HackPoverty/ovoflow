import { AlertCircle } from "lucide-react";

export default function ErrorCard({
  reset,
  message = "Failed to fetch data, tap to try again",
}: {
  reset?: () => void;
  message?: string;
}) {
  return (
    <div
      className="flex min-h-[120px] flex-col justify-between gap-2 rounded-md bg-error p-4"
      onClick={reset}
    >
      <AlertCircle className="h-10 w-10" />
      <div className="text-sm">{message}</div>
    </div>
  );
}
