"use client"

import ErrorSection from "@/components/error/ErrorSection"
import { useTranslations } from "next-intl"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  const t = useTranslations("TechnicianVisit.Error")
  return <main className="flex flex-col items-center justify-center gap-2 flex-1 text-error">
    <ErrorSection label={t("message")} />
    <button className="btn">{t("try again")}</button>
  </main>
}