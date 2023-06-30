"use client"

import ErrorBanner from "@/components/error/ErrorBanner"
import { useTranslations } from "next-intl"

export default function Error({ reset, error }: { error: Error, reset: () => void }) {
  const t = useTranslations("FarmerDashboard.Error")
  return <ErrorBanner reset={reset} message={t("fetch recent")} />
}