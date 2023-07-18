import { ReactNode } from "react";

export default function PreviewSection({ label, children }: { label: string, children?: ReactNode }) {
  return <>
    <PreviewSectionLabel label={label} />
    <div className="px-4 py-2">
      {children}
    </div>
  </>
}

export function PreviewSectionLabel({ label }: { label: string }) {
  return <h4 className="bg-base-300 font-semibold px-4 py-1 sticky top-0">{label}</h4>
}