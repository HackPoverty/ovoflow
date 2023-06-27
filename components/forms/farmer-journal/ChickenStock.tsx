import useJournalStatistics from "@/hooks/useJournalStatistics";
import { FarmerJournal } from "@/types/content";
import Label from "../Label";
import PreviewField from "../PreviewField";
import NumberInput from "./NumberInput";

export default function ChickenStock() {
  const { closingStock, mortalityPercentage, totalMortality } = useJournalStatistics();

  return <div className="grid grid-cols-2 gap-2 p-6">

    <Label<FarmerJournal> htmlFor="fieldInitialstock">Initial Stock</Label>
    <NumberInput name="fieldInitialstock" />

    <Label<FarmerJournal> htmlFor="fieldMortality">Mortality</Label>
    <NumberInput name="fieldMortality" />

    <Label<FarmerJournal> htmlFor="fieldMortalityProlapse_">Mortality Prolapse</Label>
    <NumberInput name="fieldMortalityProlapse_" />

    <hr className="col-span-2 border-accent items-center my-2" />

    <Label>Total Mortality</Label>
    <PreviewField className="input justify-end" value={totalMortality} />

    <Label>Mortality Percentage</Label>
    <div className="join">
      <PreviewField className="join-item w-full input justify-end" value={mortalityPercentage ? mortalityPercentage.toFixed(2) : undefined} />
      <span className="join-item inline-flex items-center p-2 bg-accent text-accent-content">%</span>
    </div>

    <Label>Closing stock</Label>
    <PreviewField className="input justify-end" value={closingStock} />
  </div>
}