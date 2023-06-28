import { FarmerJournal } from "@/types/content";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMeesge";
import Label from "../Label";
import PreviewField from "../PreviewField";
import NumberInput from "./NumberInput";
import { FarmerJournalSchema } from "./schema";

export default function ChickenEggProduction() {
  const { formState: { errors }, watch } = useFormContext<FarmerJournalSchema>();
  const [small, medium, large, damaged] = watch(["fieldSmallEggs", "fieldMediumEggs", "fieldLargeEggs", "fieldDamagedEggs"])
  const total = small + medium + large;
  const net = total >= damaged ? total - damaged : undefined;

  return <div className="p-6 grid grid-cols-2 gap-2">
    <Label<FarmerJournal> htmlFor="fieldSmallEggs" required>Small</Label>
    <NumberInput name="fieldSmallEggs" />
    <ErrorMessage className="col-span-2">{errors.fieldSmallEggs?.message}</ErrorMessage>

    <Label<FarmerJournal> htmlFor="fieldMediumEggs" required>Medium</Label>
    <NumberInput name="fieldMediumEggs" />
    <ErrorMessage className="col-span-2">{errors.fieldMediumEggs?.message}</ErrorMessage>

    <Label<FarmerJournal> htmlFor="fieldLargeEggs" required>Large</Label>
    <NumberInput name="fieldLargeEggs" />
    <ErrorMessage className="col-span-2">{errors.fieldLargeEggs?.message}</ErrorMessage>

    <Label<FarmerJournal> htmlFor="fieldDamagedEggs" required>Damaged</Label>
    <NumberInput name="fieldDamagedEggs" />
    <ErrorMessage className="col-span-2">{errors.fieldDamagedEggs?.message}</ErrorMessage>

    <Label<FarmerJournal> htmlFor="fieldLargeEggs" required>Total</Label>
    <PreviewField className="input justify-end" value={total} />

    <Label<FarmerJournal> htmlFor="fieldDamagedEggs" required>Net total</Label>
    <PreviewField className="input justify-end" value={net} />

    <hr className="border-accent my-2 col-span-2" />

    <Label<FarmerJournal> htmlFor="fieldLayFrequency" required>Lay frequency</Label>
    <NumberInput name="fieldLayFrequency" />
    <ErrorMessage className="col-span-2">{errors.fieldLayFrequency?.message}</ErrorMessage>


    <Label<FarmerJournal> htmlFor="fieldLayFrequencyIndustrySta" required>Industry standard</Label>
    <NumberInput name="fieldLayFrequencyIndustrySta" />
    <ErrorMessage className="col-span-2">{errors.fieldLayFrequencyIndustrySta?.message}</ErrorMessage>

  </div>
}