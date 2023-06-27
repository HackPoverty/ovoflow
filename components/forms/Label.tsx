import { FarmerJournal } from "@/types/content";
import { ComponentProps } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  htmlFor?: FieldPath<T>
} & ComponentProps<"label">;

export default function Label<T extends FieldValues>({ children, className, ...props }: Props<T>) {
  return <label className="label px-0" {...props}>
    <span className="label-text">{children}</span>
  </label>
}