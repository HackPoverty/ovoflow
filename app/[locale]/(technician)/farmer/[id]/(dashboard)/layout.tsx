import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { jsonApiFetch } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { Farmer } from "@/types/user";
import { pick } from "lodash";
import { Metadata, ResolvingMetadata } from "next";
import { AbstractIntlMessages, NextIntlClientProvider, useLocale } from "next-intl";
import { getMessages, getNow, getTranslator } from "next-intl/server";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  params: {
    id: string
  }
  profile: ReactNode,
  visits: ReactNode,
  summary: ReactNode
}

type Result = Pick<Node<Farmer>, "name">

export async function getFarmerName(id: string) {
  try {
    const { name } = await jsonApiFetch<Result>(`user/user/${id}`, {
      "fields[user--user]": "name"
    })
    return name
  } catch (e) {
    return undefined
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslator(params.locale, "FarmerDetail")
  return {
    title: t("title")
  } as Metadata
}

export default async function FarmerDetail({ profile, params, summary, visits }: Props) {
  const locale = useLocale()
  const t = await getTranslator(locale, "FarmerDetail")
  const now = await getNow(locale)
  const lastWeek = +now - 7 * 24 * 3600 * 1000;
  const name = await getFarmerName(params.id)
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric"
  })
  const errorMessages = pick(await getMessages(locale), "FarmerDetail.Error") as AbstractIntlMessages

  return <NextIntlClientProvider locale={locale} messages={errorMessages} >
    <NavigationBar title={name || t("title")} button={<BackButton />} />
    <main className="flex flex-col gap-6 py-6 flex-1 overflow-y-auto">
      <div className="px-6">
        {profile}
        <Link href={`/checklist/${params.id}`} className="w-full btn btn-primary mt-2">{t("add visit record")}</Link>
      </div>
      <div className="w-screen">
        <h3 className="px-6">{t("summary")}</h3>
        <p className="text-base-content px-6">{formatter.formatRange(lastWeek, now)}</p>
        <div className="grid grid-flow-col mt-2 px-6 overflow-x-auto gap-2">
          {summary}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between px-6">
          <h3>{t("recent visit")}</h3>
          <Link href={`/farmer/${params.id}/visits`}>{t("see all")}</Link>
        </div>
        {visits}
      </div>
    </main >
  </NextIntlClientProvider>
}