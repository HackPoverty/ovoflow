import { ComponentProps } from "react";

export default function ErrorMessage({ className, ...props }: ComponentProps<"span">) {
  return <span className={`label-text text-right text-error ${className || ""}`} {...props} />;
}
