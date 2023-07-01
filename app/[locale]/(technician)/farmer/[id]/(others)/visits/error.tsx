"use client"

import PaginationButtons from "@/components/PaginationButtons"
import ErrorSection from "@/components/error/ErrorSection"
import { useTranslations } from "next-intl"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  const t = useTranslations("TechnicianVisitList.Error")
  return <>
    <main className="flex flex-1 flex-col gap-4 items-center justify-center text-error">
      <ErrorSection label={t("message")} />
      <button className="btn" onClick={reset}>{t("try again")}</button>
    </main>
    <div className="flex p-4 justify-between">
      <PaginationButtons />
    </div>
  </>
}