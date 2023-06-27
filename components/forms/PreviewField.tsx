import { ComponentProps } from "react"

type Props = {
  value?: string | number,
} & ComponentProps<"input">

export default function PreviewField({ value, className, ...props }: Props) {


  return <div
    {...props}
    className={`rounded-lg bg-accent/30 inline-flex items-center ${className || ""}`}>
    {value === undefined || (typeof value === "number" && Number.isNaN(value)) ? "" : value}
  </div>
}