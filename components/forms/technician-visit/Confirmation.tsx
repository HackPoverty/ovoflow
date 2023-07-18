import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview";
import { UseGeolocation } from "@/hooks/useGeolocation";
import { LocateIcon, LocateOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { LocationPreview } from "../preview/LocationPreview";
import { TechnicianVisitFormSchema } from "./schema";
import { PreviewSectionLabel } from "../preview/PreviewSection";

export default function Confirmation({ location, isLoading, getLocation }: UseGeolocation) {
  const { watch } = useFormContext<TechnicianVisitFormSchema>();
  const t = useTranslations("FarmChecklist");
  return (
    <>
      <TechnicianVisitPreview visit={watch()} />
      <PreviewSectionLabel label={t("location")} />
      {isLoading ? (
        <div className="flex h-[200px] flex-col items-center justify-center gap-4 bg-info/30">
          <LocateIcon />
          {t("location loading")}
        </div>
      ) : !location ? (
        <div
          className="flex h-[200px] flex-col items-center justify-center gap-4 bg-error/50"
          onClick={getLocation}
        >
          <LocateOffIcon />
          {t("location not found")}
        </div>
      ) : (
        <LocationPreview location={location} />
      )}
    </>
  );
}
