import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview"
import { TechnicianVisit } from "@/types/content"
import { useFormContext } from "react-hook-form"

export default function Confirmation() {
  const { watch } = useFormContext<TechnicianVisit>()
  return <TechnicianVisitPreview visit={watch()} />
}