import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { pick } from "lodash";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import { ReactNode } from "react";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "TechnicianVisit")
  return {
    title: t("default farm visit")
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const errorMessages = pick(useMessages(), "TechnicianVisit.Error")
  const t = useTranslations("TechnicianVisit")

  return <NextIntlClientProvider locale={locale} messages={errorMessages as AbstractIntlMessages}>
    <NavigationBar title={t("default farm visit")} button={<BackButton />} />
    {children}
  </NextIntlClientProvider>
}