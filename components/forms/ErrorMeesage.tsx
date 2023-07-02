import { ComponentProps } from "react";

export default function ErrorMessage({className, ...props}: ComponentProps<"span">) {
  return <span className={`label-text text-error text-right ${className || ""}`} {...props} />
}