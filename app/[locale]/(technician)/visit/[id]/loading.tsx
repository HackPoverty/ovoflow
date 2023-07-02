import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("TechnicianVisit")
  return <main className="flex flex-col items-center justify-center gap-6 flex-1">
    <LoadingSpinner label={t("loading")} />
  </main>
}