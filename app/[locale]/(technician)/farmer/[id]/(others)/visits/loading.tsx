import PaginationButtons from "@/components/PaginationButtons";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("TechnicianVisitList")
  return <>
    <main className="flex-1 flex flex-col items-center justify-center gap-4">
      <LoadingSpinner label={t("loading")} />
    </main>
    <div className="flex p-4 justify-between">
      <PaginationButtons />
    </div>
  </>
}