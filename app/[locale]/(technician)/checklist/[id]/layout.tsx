import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { pick } from "lodash";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale } from "next-intl";
import { getMessages, getTranslator } from "next-intl/server";
import { ReactNode } from "react";
import { getFarmerName } from "../../farmer/[id]/(dashboard)/layout";

type Props = {
  params: {
    id: string
  },
  children: ReactNode
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "FarmChecklist")
  return {
    title: t("title")
  }
}

export default async function Layout({ children, params }: Props) {
  const locale = useLocale()
  const t = await getTranslator(locale, "FarmChecklist")
  const checklistMessages = pick(await getMessages(locale), ["FarmChecklist"])
  const name = await getFarmerName(params.id)

  return <NextIntlClientProvider locale={locale} messages={checklistMessages as AbstractIntlMessages}>
    <NavigationBar title={t("title")} button={<BackButton />} />
    {name ? <div className="px-6 py-2 bg-base-200 font-semibold">{t("owner", { name })}</div> : null}
    {children}
  </NextIntlClientProvider>;
}