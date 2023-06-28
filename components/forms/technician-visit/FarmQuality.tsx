import { useController, useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMeesge";
import Label from "../Label";
import { QUALITY_SCALES, TechnicianVisitSchema, getQualityName } from "./schema";

export default function FarmQuality() {
  return <div className="flex flex-col gap-4">
    <QualityInput label="Light Sufficiency" name="fieldLightSufficiency" />
    <QualityInput label="Feed Quantity" name="fieldFeedQuantity" />
    <QualityInput label="Water Cleanliness" name="fieldWaterCleanliness" />
    <QualityInput label="Clean Bedding" name="fieldCleanBedding" />
    <QualityInput label="Ventilation" name="fieldVentillation" />
  </div>
}

function QualityInput({ name, label }: { name: keyof TechnicianVisitSchema, label: string }) {
  const { formState: { errors }, control } = useFormContext<TechnicianVisitSchema>()
  const { field } = useController({ control, name })

  return <div>
    <Label required>{label}</Label>
    <div className={`flex rounded-lg py-2 join w-full`}>
      {
        QUALITY_SCALES.map(q => <button
          className={`btn join-item flex-1 ${(field.value === q) ? "btn-accent" : ""}`}
          key={`${name}.${q}`}
          type="button"
          onClick={() => field.onChange(q)}>
          {getQualityName(q)}
        </button>)
      }
    </div>
    <ErrorMessage className="w-full">{errors[name]?.message && "Required"}</ErrorMessage>
  </div>
}