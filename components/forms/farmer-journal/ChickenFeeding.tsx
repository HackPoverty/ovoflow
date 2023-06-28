import useJournalStatistics from "@/hooks/useJournalStatistics";
import { useFormContext } from "react-hook-form";
import Label from "../Label";
import PreviewField from "../PreviewField";
import NumberInput from "./NumberInput";
import { FarmerJournalSchema } from "./schema";
import ErrorMessage from "../ErrorMeesge";

export default function ChickenFeeding() {
  const { watch, formState: {errors} } = useFormContext<FarmerJournalSchema>();
  const [inital, mortality, proplapse, feed] = watch(["fieldInitialstock", "fieldMortality", "fieldMortalityProlapse_", "fieldGivenFeed"])
  const closingStock = inital - mortality - proplapse;
  const feedPerBirds = closingStock <= 0 ? undefined : 
    Number(Math.round(+`${feed * 1000 / closingStock}e2`) + "e-2")

  return <div className="p-6 grid grid-cols-2 gap-2">

    <Label htmlFor="fieldGivenFeed" required>Total given</Label>
    <div className="join">
      <NumberInput name="fieldGivenFeed" className="w-full join-item" required step={0.01} />
      <span className="join-item px-2 inline-flex items-center bg-accent text-accent-content">kg</span>
    </div>
    <ErrorMessage>{errors.fieldGivenFeed?.message}</ErrorMessage>

    <hr className="border-accent my-2 col-span-2" />

    <Label>Closing stock</Label>
    <PreviewField className="input justify-end" value={closingStock} />

    <Label>Feed per bird</Label>
    <div className="join">
      <PreviewField className="w-full join-item input justify-end" value={feedPerBirds} />
      <span className="join-item px-2 inline-flex items-center bg-accent text-accent-content">g</span>
    </div>
  </div>
}
