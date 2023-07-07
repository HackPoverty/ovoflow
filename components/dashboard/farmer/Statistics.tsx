import ErrorCard from "@/components/error/ErrorCard";
import { jsonApiFetch } from "@/lib/axios";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";
import { getCookie } from "cookies-next";
import { AlertTriangle } from "lucide-react";
import { useFormatter, useNow, useTranslations } from "next-intl";
import useSWR from "swr";

const SECONDS_IN_DAY = 24 * 60 * 60;

type Result = Pick<
  Node<FarmerJournal>,
  "created" | "fieldSmallEggs" | "fieldMediumEggs" | "fieldLargeEggs"
>

async function getStatistics() {
  const uid = getCookie("uid");

  const data = await jsonApiFetch<Result[]>(`node/farmer_daily_journal`, {
    "filter[uid.meta.drupal_internal__target_id]": uid,
    "sort": "-created",
    "fields[node--farrmer_daily_journal]": "created,field_small_eggs,field_medium_eggs,field_large_eggs",
    "filter[recent][condition][path]": "created",
    "filter[recent][condition][operator]": ">=",
    "filter[recent][condition][value]": Math.floor(Date.now() / 1000) - 7 * SECONDS_IN_DAY
  });

  if (data.length == 0) return undefined;
  const eggs = data.map(datum => (datum.fieldSmallEggs || 0) + (datum.fieldMediumEggs || 0) + (datum.fieldLargeEggs || 0))
  return {
    average: Math.round(eggs.reduce((a, b) => a + b, 0) / eggs.length),
    lastRecordDate: data[0].created
  }
}

export default function Statistics() {
  const { data, isLoading, error } = useSWR("farmer-statistics", getStatistics);
  const t = useTranslations("FarmerDashboard.Error")

  if (isLoading) return <Loading />
  if (error) return <ErrorCard message={t("fetch statistics")} />
  if (!data) return <WarningCard />
  return <StatsCard value={data.average} date={data.lastRecordDate} />
}

function Loading() {
  return <div className="rounded-md bg-base-200 px-4">
    <div className="h-[120px] min-w-[200px] flex flex-col gap-2 justify-center animate-pulse">
      <div className="bg-base-300 w-3/4 h-6 rounded-md"></div>
      <div className="bg-base-300 w-16 h-10 rounded-md"></div>
    </div>
  </div>
}

function WarningCard() {
  const t = useTranslations("FarmerDashboard")
  return <div className="flex flex-col bg-warning rounded-md p-4 w-full min-h-[120px] justify-between">
    <AlertTriangle className="w-10 h-10" />
    <div className="text-sm">{t("no records for last week")}</div>
  </div>
}

function StatsCard(props: { value: number, date: Date }) {
  const t = useTranslations("FarmerDashboard")
  const formatter = useFormatter()
  const now = useNow()
  return <div className="flex flex-col p-4 rounded-md bg-base-300 w-full min-h-[150px]">
    <div className="">{t("averge")}</div>
    <h3 className="text-6xl font-bold">{props.value}</h3>
    <div className="text-xs mt-auto">{t("last record", { lastRecord: formatter.relativeTime(new Date(props.date), now) })}</div>
  </div>
}