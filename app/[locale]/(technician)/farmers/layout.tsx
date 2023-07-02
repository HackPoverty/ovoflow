import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { pick } from "lodash";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import { ReactNode } from "react";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "FarmersList")
  return {
    title: t("farmers list")
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const messages = pick(useMessages(), ["ListNavigation", "FarmersList.Error"])
  const t = useTranslations("FarmersList")

  return <NextIntlClientProvider locale={locale} messages={messages as AbstractIntlMessages}>
    <NavigationBar title={t("farmers list")} button={<MenuButton />} />
    {children}
  </NextIntlClientProvider>
}