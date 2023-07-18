import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview"
import { Location } from "@/hooks/useGeolocation"
import { useFormContext } from "react-hook-form"
import { Map } from "react-map-gl"
import PreviewSection from "../preview/PreviewSection"
import { TechnicianVisitFormSchema } from "./schema"
import { LocationPreview } from "../preview/LocationPreview"

type Props = {
  location?: Location
}

export default function Confirmation({ location }: Props) {
  const { watch } = useFormContext<TechnicianVisitFormSchema>()
  return <>
    <TechnicianVisitPreview visit={watch()} />
    {location ? <LocationPreview location={location} /> : null}
  </>
}