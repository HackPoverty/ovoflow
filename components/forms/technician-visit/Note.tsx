import { useFormContext } from "react-hook-form"
import { TechnicianVisitFormSchema } from "./schema"
import { useTranslations } from "next-intl"

export default function FarmerNote() {
  const { register } = useFormContext<TechnicianVisitFormSchema>()
  const t = useTranslations("FarmChecklist")
  return <div>
    <textarea
      {...register("fieldVisitComments")}
      rows={5}
      className="textarea textarea-accent w-full"
      placeholder="Some note and concerns..." />
  </div>
}