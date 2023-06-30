"use client"

import PaginationButtons from "@/components/PaginationButtons";
import ErrorSection from "@/components/error/ErrorSection";
import { useTranslations } from "next-intl";

export default function Error({ reset }: { error: Error, reset: () => void }) {
  const t = useTranslations("FarmersList.Error")
  return <>
    <main className="text-error py-6 flex-1 flex flex-col gap-4 items-center justify-center overflow-y-auto">
      <ErrorSection label={t("message")} />
      <button className="btn">{t("try again")}</button>
    </main>
    <div className="flex justify-between p-4 shadow-lg">
      <PaginationButtons />
    </div>
  </>
}