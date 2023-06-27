import { FarmerJournal } from "@/types/content";
import { ComponentProps } from "react";
import { FieldPath, useFormContext } from "react-hook-form";

type Props = {
  name: FieldPath<FarmerJournal>,
} & Pick<ComponentProps<'input'>, "className">

export default function NumberInput({ name, className }: Props) {
  const { register } = useFormContext<FarmerJournal>();

  return <>
    <input
      {...register(name, { valueAsNumber: true })}
      id={name}
      type="number"
      className={`input input-accent text-right ${className || ""}`} min={0} />
  </>
}