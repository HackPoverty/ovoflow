import { ComponentProps } from "react"

type Props = {
  value?: string | number,
} & ComponentProps<"input">

export default function PreviewField({ value, className, children, ...props }: Props) {
  return <div
    {...props}
    style={{
      verticalAlign: "middle"
    }}
    className={`rounded-lg bg-accent/30 ${className || ""}`}>
    {value === undefined || (typeof value === "number" && Number.isNaN(value)) ? "" : value}
    {children}
  </div>
}