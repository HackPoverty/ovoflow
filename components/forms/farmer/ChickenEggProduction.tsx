import Label from "./Label";
import NumberInput from "./NumberInput";

export default function ChickenEggProduction() {
  return <div className="p-6 grid grid-cols-2 gap-2">
    <Label htmlFor="fieldSmallEggs">Small</Label>
    <NumberInput name="fieldSmallEggs" />

    <Label htmlFor="fieldMediumEggs">Medium</Label>
    <NumberInput name="fieldMediumEggs" />

    <Label htmlFor="fieldLargeEggs">Large</Label>
    <NumberInput name="fieldLargeEggs" />

    <Label htmlFor="fieldDamagedEggs">Damaged</Label>
    <NumberInput name="fieldDamagedEggs" />

    <hr className="border-accent my-2 col-span-2" />

    <Label htmlFor="fieldLayFrequency">Lay frequency</Label>
    <NumberInput name="fieldLayFrequency" />

    <Label htmlFor="fieldLayFrequencyIndustrySta">Industry standard</Label>
    <NumberInput name="fieldLayFrequencyIndustrySta" />
  </div>
}