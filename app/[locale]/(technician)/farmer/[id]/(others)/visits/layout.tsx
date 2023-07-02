import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";

import { Metadata, ResolvingMetadata } from "next";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale } from "next-intl";
import { getMessages, getTranslator } from "next-intl/server";
import { ReactNode } from "react";
import { getFarmerName } from "../../(dashboard)/layout";
import { pick } from "lodash";


type Props = {
  children: ReactNode,
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "TechnicianVisitList")
  return {
    title: t("default farm visit")
  }
}

export default async function Layout({ children, params }: Props) {
  const name = await getFarmerName(params.id)
  const locale = useLocale()
  const messages = pick(await getMessages(locale), ["TechnicianVisitList.Error", "ListNavigation"])
  const t = await getTranslator(locale, "TechnicianVisitList")

  return <NextIntlClientProvider locale={locale} messages={messages as AbstractIntlMessages}>
    <NavigationBar title={name ? t("farm visit", { name }) : t("default farm visit")} button={<BackButton />} />
    {children}
  </NextIntlClientProvider>
}