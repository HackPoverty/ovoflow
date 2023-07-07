import { AlertTriangle } from "lucide-react"

export default function ErrorSection({ label }: { label: string }) {
  return <>
    <AlertTriangle />
    <p>{label}</p>
  </>
}