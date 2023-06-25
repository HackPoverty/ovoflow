import useJournalStatistics from "@/hooks/useJournalStatistics";
import Label from "./Label";
import NumberInput from "./NumberInput";
import PreviewField from "./PreviewField";

export default function ChickenFeeding() {
  const { feedPerBirdInGrams, closingStock } = useJournalStatistics();

  return <div className="p-6 grid grid-cols-2 gap-2">

    <Label htmlFor="fieldGivenFeed">Total given</Label>
    <div className="join">
      <NumberInput name="fieldGivenFeed" className="w-full join-item" />
      <span className="join-item px-2 inline-flex items-center bg-accent text-accent-content">kg</span>
    </div>

    <hr className="border-accent my-2 col-span-2" />

    <Label>Closing stock</Label>
    <PreviewField className="input justify-end" value={closingStock} />

    <Label>Feed per bird</Label>
    <div className="join">
      <PreviewField className="w-full join-item input justify-end" value={feedPerBirdInGrams?.toFixed(2)} />
      <span className="join-item px-2 inline-flex items-center bg-accent text-accent-content">g</span>
    </div>
  </div>
}
