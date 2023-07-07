import { jsonApiFetch } from "@/lib/axios"
import { FarmerJournal } from "@/types/content"
import { Node } from "@/types/highLevel"
import { useNow, useTranslations } from "next-intl"
import useSWR from "swr"
import ErrorCard from "../error/ErrorCard"

type Result = Pick<Node<FarmerJournal>,
  "fieldSmallEggs" | "fieldMediumEggs" | "fieldLargeEggs" | "fieldMortality" | "fieldGramPerBirdIndustrySta">

async function getSummary(id: string, unixFromSecond: number, unixToSecond: number) {
  const data = await jsonApiFetch<Result[]>("node/farmer_daily_journal", {
    "filter[uid.id]": id,
    "fields[node--farmer_daily_journal]": "field_small_eggs,field_medium_eggs,field_large_eggs,field_mortality,field_gram_per_bird_industry_sta",
    "filter[before][condition][path]": "created",
    "filter[before][condition][operator]": "<",
    "filter[before][condition][value]": unixToSecond,
    "filter[after][condition][path]": "created",
    "filter[after][condition][operator]": ">=",
    "filter[after][condition][value]": unixFromSecond,
  })

  const totalMortality = data.reduce(((prev, entry) => prev + (entry.fieldMortality || 0)), 0)

  const eggs = data.map(({ fieldSmallEggs, fieldMediumEggs, fieldLargeEggs }) => (fieldSmallEggs || 0) + (fieldMediumEggs || 0) + (fieldLargeEggs || 0))
  const averageEggProduction = eggs.length === 0 ? 0 : Math.round(eggs.reduce((a, b) => a + b, 0) / eggs.length);

  const feeds = data.map(entry => +(entry.fieldGramPerBirdIndustrySta || 0));
  const averageFeed = feeds.length === 0 ? 0 : feeds.reduce((a, b) => a + b, 0) / feeds.length;

  return {
    averageEggProduction,
    totalMortality,
    averageFeed
  }
}

export default function Summary({ farmerId }: { farmerId: string }) {
  const now = +useNow()
  const t = useTranslations("FarmerDetail")
  const lastWeek = now - 7 * 24 * 3600 * 1000;
  const { data: summary, isLoading, error } = useSWR(`/farmer/${farmerId}/@summary`, () => getSummary(farmerId, lastWeek, now));

  if (isLoading) return <>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>

  if (error || !summary) {
    return <ErrorCard message={t("Error.fetch summary error")} />
  }

  return <>
    <div className="p-4 flex flex-col gap-4 justify-between min-w-[200px] rounded-md bg-secondary/30">
      <p className="text-sm">{t("total mortality")}</p>
      <div className="text-4xl font-semibold text-error">{summary.totalMortality}</div>
    </div>
    <div className="p-4 flex flex-col gap-4 justify-between min-w-[200px] rounded-md bg-primary/30">
      <p className="text-sm">{t("average egg produced")}</p>
      <div className="text-4xl font-semibold text-primary">{summary.averageEggProduction}</div>
    </div>
    <div className="p-4 flex flex-col gap-4 justify-between min-w-[200px] rounded-md bg-primary/30">
      <p className="text-sm">{t("average daily feed")}</p>
      <div className="text-4xl font-semibold text-primary">{summary.averageFeed}</div>
    </div>
  </>
}


function Skeleton() {
  return <div className="flex flex-col justify-between w-[200px] bg-base-200 rounded-md h-[128px] p-4 animate-pulse">
    <div className="w-full bg-base-300 h-4" />
    <div className="bg-base-300 h-16 w-24" />
  </div>
}