import PaginationButtons from "@/components/PaginationButtons";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("FarmersList")

  return <>
    <main className="py-6 flex-1 flex flex-col items-center justify-center overflow-y-auto">
      <LoadingSpinner label={t("loading")} />
    </main>
    <div className="flex justify-between p-4 shadow-lg">
      <PaginationButtons />
    </div>
  </>
}