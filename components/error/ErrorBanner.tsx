import { AlertCircle } from "lucide-react";

export default function ErrorBanner({ reset, message }: { reset?: () => void; message?: string }) {
  return (
    <div className="alert cursor-pointer gap-2 rounded-none text-error" onClick={reset}>
      <AlertCircle />
      <span>{message}</span>
    </div>
  );
}
