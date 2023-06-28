import { ComponentProps } from "react";
import { FieldPath, useFormContext } from "react-hook-form";
import { FarmerJournalSchema } from "./schema";

type Props = {
  name: FieldPath<FarmerJournalSchema>,
} & ComponentProps<'input'>

export default function NumberInput({ name, className, ...props }: Props) {
  const { register, formState: { errors } } = useFormContext<FarmerJournalSchema>();

  return <>
    <input
      {...register(name, { setValueAs: (v) => v === "" ? undefined : parseInt(v, 10) })}
      {...props}
      id={name}
      type="number"
      className={`input ${errors[name] ? "input-error" : "input-accent"} text-right ${className || ""}`} min={0} />
  </>
}