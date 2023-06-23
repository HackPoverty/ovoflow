import { DISEASE_MAP, TechnicianVisit, VACCINE_MAP, getQualityName } from "@/types/content"
import { useFormContext } from "react-hook-form"

export default function Confirmation() {
  const { watch } = useFormContext<TechnicianVisit>()
  const visit = watch()

  return <div>
    <div>
      <h2 className="text-xl font-semibold text-accent mt-4">Quality</h2>
      <TextPreview label="Light Sufficiency" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Feed Quantity" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Water Cleanliness" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Clean Bedding" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Ventilation" value={getQualityName(visit.fieldLightSufficiency)} />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-accent mt-4">Diseases</h2>
      <TextPreview label="Presence of Disease" value={visit.fieldDisease} />
      <TextPreview label="Names of Diseases" value={visit.fieldDiseaseNames.map(item => DISEASE_MAP.get(item)!)} />
      <TextPreview label="Other diseases" value={[visit.fieldOtherpossibledisease || ""]} />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-accent mt-4">Vaccinations</h2>
      <TextPreview label="Were vaccines given?" value={visit.fieldVaccineGiven ? "Yes" : "No"} />
      <TextPreview label="Common vaccines" value={visit.fieldVaccinations.map(item => VACCINE_MAP.get(item)!)} />
      <TextPreview label="Other vaccines" value={[visit.fieldOtherVaccine || ""]} />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-accent mt-4">Note</h2>
      <TextPreview value={[visit.fieldVisitComments || ""]} />
    </div>
  </div>
}

export function TextPreview({ label, value }: { label?: string, value?: string | string[] | null }) {

  return <div className="form-control">
    {label && <label className="label px-0">
      <span className="label-text">{label}</span>
    </label>}
    {
      Array.isArray(value) ? <textarea disabled className="textarea" rows={value.length} value={value.join("\n")} />
        : <input className="input disabled:text-black" disabled value={value || ""} />
    }
  </div>
}