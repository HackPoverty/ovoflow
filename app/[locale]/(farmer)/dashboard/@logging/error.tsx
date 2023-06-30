"use client"

import { useTranslations } from "next-intl"

export default function Error({ reset, error } : {error: Error, reset: () => void}) {
  const t = useTranslations("FarmerDashboard.Error")
  return <div className="bg-error sticky top-0 px-4 py-2" onClick={reset}>
    <p className="text-sm">{t("fetch notice")}</p>
  </div>
}