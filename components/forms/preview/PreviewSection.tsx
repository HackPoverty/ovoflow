import { ReactNode } from "react";

export default function PreviewSection({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  return (
    <>
      <PreviewSectionLabel label={label} />
      <div className="px-4 py-2">{children}</div>
    </>
  );
}

export function PreviewSectionLabel({ label }: { label: string }) {
  return <h4 className="sticky top-0 bg-base-300 px-4 py-1 font-semibold">{label}</h4>;
}
