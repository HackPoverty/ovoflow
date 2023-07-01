import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview"
import { useFormContext } from "react-hook-form"
import { TechnicianVisitFormSchema } from "./schema"

export default function Confirmation() {
  const { watch } = useFormContext<TechnicianVisitFormSchema>()
  return <TechnicianVisitPreview visit={watch()} />
}