"use client"

import ErrorCard from "@/components/error/ErrorCard"
import { useTranslations } from "next-intl"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  const t = useTranslations("FarmerDetail.Error")
  return <ErrorCard reset={reset} message={t("fetch summary error")} />
}