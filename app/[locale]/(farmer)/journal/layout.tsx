import BackButton from "@/components/navigation/BackButton"
import NavigationBar from "@/components/navigation/NavigationBar"
import { pick } from "lodash"
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl"
import { getTranslator } from "next-intl/server"
import { ReactNode } from "react"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "FarmerJournal")
  return {
    title: t("new journal")
  }
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