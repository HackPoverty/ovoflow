import { FarmerJournal } from "@/types/content";
import { useFormContext } from "react-hook-form";
import Label from "../Label";
import PreviewField from "../PreviewField";

export default function Confirmation() {
  const { watch } = useFormContext<FarmerJournal>();
  const data = watch();

  return <div className="grid grid-cols-2 p-6 gap-2">
    <h3 className="font-semibold col-span-2 text-accent">Stock</h3>
    <Label>Initial stock</Label>
    <PreviewField className="input justify-end" value={data.fieldInitialstock} />
    <Label>Mortality</Label>
    <PreviewField className="input justify-end" value={data.fieldMortality} />
    <Label>Mortality Prolapse</Label>
    <PreviewField className="input justify-end" value={data.fieldMortalityProlapse_} />
    <h3 className="font-semibold col-span-2 text-accent">Egg production</h3>
    <Label>Small Eggs</Label>
    <PreviewField className="input justify-end" value={data.fieldSmallEggs} />
    <Label>Medium Eggs</Label>
    <PreviewField className="input justify-end" value={data.fieldMediumEggs} />
    <Label>Large Eggs</Label>
    <PreviewField className="input justify-end" value={data.fieldLargeEggs} />
    <Label>Lay Frequency</Label>
    <PreviewField className="input justify-end" value={data.fieldLayFrequency} />
    <Label>Lay Frequency (industry standard)</Label>
    <PreviewField className="input justify-end" value={data.fieldLayFrequencyIndustrySta} />
    <h3 className="font-semibold col-span-2 text-accent">Feeding</h3>
    <Label>Total given</Label>
    <PreviewField className="input justify-end" value={data.fieldGivenFeed} />
    <h3 className="font-semibold col-span-2 text-accent">Comment</h3>
    <PreviewField className="col-span-2 textarea" value={data.fieldCommentdailycheck} />
  </div>
}