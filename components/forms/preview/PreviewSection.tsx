import { ReactNode } from "react";

export default function PreviewSection({ label, children }: { label: string, children?: ReactNode }) {
  return <>
    <h4 className="bg-neutral text-neutral-content font-semibold px-4 py-1 sticky top-0">{label}</h4>
    <div className="px-4 py-2">
      {children}
    </div>
  </>
}