import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Metadata } from "next";
import { ReactNode } from "react";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl";
import { pick } from "lodash";

export const metadata: Metadata = {
  title: "Dashboard | Ovoflow"
}

type Props = {
  recent: ReactNode,
  statistics: ReactNode,
  logging: ReactNode
}

export default function Layout({ recent, statistics, logging }: Props) {
  const t = useTranslations("FarmerDashboard")
  const locale = useLocale()
  const errorMessages = pick(useMessages(), "FarmerDashboard.Error") as AbstractIntlMessages

  return <NextIntlClientProvider locale={locale} messages={errorMessages}>
    <NavigationBar title={t("dashboard")} button={<MenuButton />} />
    <main className="pb-6 flex-1 flex flex-col gap-3 overflow-y-auto">
      {logging}
      <div className="w-screen">
        <h3 className="px-6 pb-2">{t("statistics")}</h3>
        <div className="grid grid-flow-col gap-4 px-6 overflow-x-auto">
          {statistics}
        </div>
      </div>
      <div>
        <h3 className="px-6 pb-2">{t("recent entries")}</h3>
        {recent}
      </div>
    </main>
  </NextIntlClientProvider>;
}