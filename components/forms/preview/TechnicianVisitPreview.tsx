import Label from "../Label";
import PreviewField from "../PreviewField";
import { DISEASES, TechnicianVisitSchema, VACCINES, getQualityName } from "../technician-visit/schema";

export default function TechnicianVisitPreview({ visit }: { visit: TechnicianVisitSchema }) {
  return <div className="flex flex-col gap-8">
    <div>
      <h2 className="text-xl font-semibold text-accent">Quality</h2>
      <TextPreview label="Light Sufficiency" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Feed Quantity" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Water Cleanliness" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Clean Bedding" value={getQualityName(visit.fieldLightSufficiency)} />
      <TextPreview label="Ventilation" value={getQualityName(visit.fieldLightSufficiency)} />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-accent">Diseases</h2>
      <TextPreview label="Presence of Disease" value={visit.fieldDisease} />
      <TextPreview label="Names of Diseases" value={visit.fieldDiseaseNames.map(item => DISEASES[item])} />
      <TextPreview label="Other diseases" value={[visit.fieldOtherpossibledisease || ""]} />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-accent">Vaccinations</h2>
      <TextPreview label="Were vaccines given?" value={visit.fieldVaccineGiven ? "Yes" : "No"} />
      <TextPreview label="Common vaccines" value={visit.fieldVaccinations.map(item => VACCINES[item])} />
      <TextPreview label="Other vaccines" value={[visit.fieldOtherVaccine || ""]} />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-accent">Note</h2>
      <PreviewField className="textarea w-full" value={visit.fieldVisitComments || ""} />
    </div>
  </div>
}

function TextPreview({ label, value }: { label?: string, value?: string | string[] | null }) {

  return <div className="form-control">
    {label && <Label>{label}</Label>}
    {Array.isArray(value)
      ? <PreviewField className="textarea" value={value.join(", ")} />
      : <PreviewField className="input" value={value || ""} />
    }
  </div>
}