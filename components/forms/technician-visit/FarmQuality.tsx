import { QUALITY_SCALES, TechnicianVisit, getQualityName } from "@/types/content";
import { FieldPath, useFormContext } from "react-hook-form";
import Label from "../Label";

export default function FarmQuality() {
  return <div className="flex flex-col gap-4">
    <QualityInput label="Light Sufficiency" name="fieldLightSufficiency" />
    <QualityInput label="Feed Quantity" name="fieldFeedQuantity" />
    <QualityInput label="Water Cleanliness" name="fieldWaterCleanliness" />
    <QualityInput label="Clean Bedding" name="fieldCleanBedding" />
    <QualityInput label="Ventilation" name="fieldVentillation" />
  </div>
}



function QualityInput(props: { name: FieldPath<TechnicianVisit>, label: string }) {
  const { register } = useFormContext<TechnicianVisit>()

  return <div>
    <Label htmlFor={props.name} required>{props.label}</Label>
    <div className="flex bg-base-300 rounded-lg py-2">
      {
        QUALITY_SCALES.map(q => <label key={`${props.name}.${q}`} className="flex-1 text-center">
          <input type="radio" value={q} className="peer hidden" {...register(props.name)} required />
          <span className="peer-checked:font-bold peer-checked:text-accent">{getQualityName(q)}</span>
        </label>)
      }
    </div>
  </div>
}