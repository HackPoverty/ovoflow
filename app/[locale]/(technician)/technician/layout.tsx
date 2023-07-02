import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { pick } from "lodash";
import { Metadata } from "next";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import { ReactNode } from "react";

type Props = {
  statistics: ReactNode,
  recent: ReactNode
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "TechnicianDashboard")
  return {
    title: t("dashboard")
  }
}

export default function FarmerDashboard({ statistics, recent }: Props) {
  const locale = useLocale()
  const errorMessage = pick(useMessages(), "TechnicianDashboard.Error")
  const t = useTranslations("TechnicianDashboard")

  return <NextIntlClientProvider locale={locale} messages={errorMessage as AbstractIntlMessages}>
    <NavigationBar title={t("dashboard")} button={<MenuButton />} />
    <main className="py-6 flex flex-1 overflow-y-auto flex-col gap-4">
      <h1 className="px-4">{t("hello", { name: "technician" })}</h1>
      <div className="px-4">
        <h3 className="mb-2">{t("summary")}</h3>
        {statistics}
      </div>
      <div>
        <h3 className="px-4 pb-2">{t("recent visited farms")}</h3>
        {recent}
      </div>
    </main>
  </NextIntlClientProvider>
}