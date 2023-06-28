import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview"
import { TechnicianVisit } from "@/types/content"
import { useFormContext } from "react-hook-form"
import { TechnicianVisitSchema } from "./schema"

export default function Confirmation() {
  const { watch } = useFormContext<TechnicianVisitSchema>()
  return <TechnicianVisitPreview visit={watch()} />
}