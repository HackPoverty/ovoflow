import { AlertTriangle } from "lucide-react"

export default function WarningCard({ label, width }: { label: string, width?: string }) {
  return <div style={{ width }} className="flex flex-col bg-warning rounded-md p-4 min-h-[120px] justify-between">
    <AlertTriangle className="w-10 h-10" />
    <div className="text-sm">{label}</div>
  </div>
}