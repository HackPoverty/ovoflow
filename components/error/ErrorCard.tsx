import { AlertCircle } from "lucide-react";

export default function ErrorCard({ reset, message = "Failed to fetch data, tap to try again" }: { reset?: () => void, message?: string }) {
  return <div className="bg-error rounded-md p-4 min-h-[120px] flex flex-col gap-2 justify-between" onClick={reset}>
    <AlertCircle className="w-10 h-10" />
    <div className="text-sm">{message}</div>
  </div>
}