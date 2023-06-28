import { ComponentProps } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  htmlFor?: FieldPath<T>,
  required?: boolean
} & ComponentProps<"label">;

export default function Label<T extends FieldValues>({ children, className, required = false, ...props }: Props<T>) {
  return <label className="label px-0" {...props}>
    <span className="label-text">
      {children}
      {required && <span className="text-error">*</span>}
    </span>
  </label>
}