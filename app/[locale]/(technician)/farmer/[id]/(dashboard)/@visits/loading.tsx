import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("FarmerDetail")
  return <div className="bg-base-200 flex flex-col items-center gap-4">
    <LoadingSpinner label={t("loading recent visits")} />
  </div>
}