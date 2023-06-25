import { TechnicianVisit } from "@/types/content"
import { useFormContext } from "react-hook-form"

export default function FarmerNote() {
  const { register } = useFormContext<TechnicianVisit>()
  return <div>
    <textarea
      {...register("fieldVisitComments")}
      rows={5} 
      className="textarea textarea-accent w-full my-4" 
      placeholder="Some note and concerns..." />
  </div>
}