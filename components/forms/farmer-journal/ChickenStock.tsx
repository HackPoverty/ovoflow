import useJournalStatistics from "@/hooks/useJournalStatistics";
import { useFormContext } from "react-hook-form";
import Label from "../Label";
import PreviewField from "../PreviewField";
import ErrorMessage from "./ErrorMeesge";
import NumberInput from "./NumberInput";
import { FarmerJournalSchema } from "./schema";

export default function ChickenStock() {
  const { formState: { errors }, watch } = useFormContext<FarmerJournalSchema>();
  const [initial, mortality, mortalityProlapse] = watch(["fieldInitialstock", "fieldMortality", "fieldMortalityProlapse_"]);
  const totalMortiality = mortality + mortalityProlapse;
  const closingStock = initial >= totalMortiality ? initial - totalMortiality : undefined;
  const percentage = (initial !== 0) 
    ? Number(Math.round(+`${totalMortiality / initial}e2`) + "e-2")
     : undefined

  const { mortalityPercentage } = useJournalStatistics();

  return <div className="grid grid-cols-2 gap-2 p-6">
    <Label<FarmerJournalSchema> htmlFor="fieldInitialstock" required>Initial Stock</Label>
    <NumberInput name="fieldInitialstock" />
    <ErrorMessage>{errors.fieldInitialstock?.message}</ErrorMessage>

    <Label<FarmerJournalSchema> htmlFor="fieldMortality" required>Mortality</Label>
    <NumberInput name="fieldMortality" />
    <ErrorMessage>{errors.fieldMortality?.message}</ErrorMessage>

    <Label<FarmerJournalSchema> htmlFor="fieldMortalityProlapse_" required>Mortality Prolapse</Label>
    <NumberInput name="fieldMortalityProlapse_" />
    <ErrorMessage>{errors.fieldMortalityProlapse_?.message}</ErrorMessage>

    <hr className="col-span-2 border-accent items-center my-2" />

    <Label>Total Mortality</Label>
    <PreviewField className="input justify-end" value={totalMortiality} />

    <Label>Mortality Percentage</Label>
    <div className="join">
      <PreviewField className="join-item w-full input justify-end" value={percentage} />
      <span className="join-item inline-flex items-center p-2 bg-accent text-accent-content">%</span>
    </div>

    <Label>Closing stock</Label>
    <PreviewField className="input justify-end" value={closingStock} />
  </div>
}