import { QUALITY_SCALES, TechnicianVisit, getQualityName } from "@/types/content";
import { FieldPath, useFormContext } from "react-hook-form";

export default function FarmQuality() {
  return <div>
    <QualityInput label="Light Sufficiency" name="fieldLightSufficiency" />
    <QualityInput label="Feed Quantity" name="fieldFeedQuantity" />
    <QualityInput label="Water Cleanliness" name="fieldWaterCleanliness" />
    <QualityInput label="Clean Bedding" name="fieldCleanBedding" />
    <QualityInput label="Ventilation" name="fieldVentillation" />
  </div>
}



function QualityInput(props: { name: FieldPath<TechnicianVisit>, label: string }) {
  const { register } = useFormContext<TechnicianVisit>()

  return <div className="form-control w-full py-2">
    <label className="label"><span className="label-text">{props.label}</span></label>
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