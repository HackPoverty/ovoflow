import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { pick } from "lodash";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl";
import { ReactNode } from "react";

export const metadata = {
  title: "Farmers List | Ovoflow"
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