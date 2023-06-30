"use client"

import ErrorCard from "@/components/error/ErrorCard"
import { useTranslations } from "next-intl"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  const t = useTranslations("TechnicianDashboard.Error")
  return <ErrorCard message={t("fetch statistics")} reset={reset} />
}