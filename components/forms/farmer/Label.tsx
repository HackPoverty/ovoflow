import { FarmerJournal } from "@/types/content";
import { ComponentProps } from "react";
import { FieldPath } from "react-hook-form";

type Props = {
  htmlFor?: FieldPath<FarmerJournal>
} & ComponentProps<"label">;

export default function Label({ children, className, ...props }: Props) {
  return <label className="label px-0" {...props}>
    <span className="label-text">{children}</span>
  </label>
}