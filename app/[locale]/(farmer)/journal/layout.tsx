import BackButton from "@/components/navigation/BackButton"
import NavigationBar from "@/components/navigation/NavigationBar"
import { pick } from "lodash"
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl"
import { ReactNode } from "react"

export const metadata = {
  title: "New journal | Ovoflow"
}

export default function Layout({ children }: { children: ReactNode }) {
  const t = useTranslations("FarmerJournal")
  const locale = useLocale()
  const messages = pick(useMessages(), "FarmerJournal") as AbstractIntlMessages

  return <NextIntlClientProvider locale={locale} messages={messages}>
    <NavigationBar title={t("new journal")} button={<BackButton />} />
    {children}
  </NextIntlClientProvider>
}