import ErrorBanner from "@/components/error/ErrorBanner";
import { jsonApiFetch } from "@/lib/axios";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";
import { getCookie } from "cookies-next";
import { useFormatter, useTranslations } from "next-intl";
import useSWR from "swr";

type Result = Pick<Node<FarmerJournal>, "created" | "fieldInitialstock" | "id">

async function getRecentEntries() {
  const uid = getCookie("uid")
  return await jsonApiFetch<Result[]>(`node/farmer_daily_journal`, {
    "filter[uid.meta.drupal_internal__target_id]": uid,
    "sort": "-created",
    "page[limit]": 8,
    "fields[node--farmer_daily_journal]": "created,field_initialstock"
  });
}

export default function RecentEntries() {
  const { data: journals, isLoading, error } = useSWR("/dashboard/@recent", getRecentEntries)
  const t = useTranslations("FarmerDashboard")
  const formatter = useFormatter()

  if (isLoading) return <Loading />
  if (!journals || error) return <ErrorBanner message={t("Error.fetch recent")} />
  return <div>
    {journals.map(journal => {
      return <div key={journal.id} className="py-4 px-6 my-1 bg-base-200">
        <p>{formatter.dateTime(new Date(journal.created), {
          day: "numeric",
          month: "long",
          year: "numeric"
        })}</p>
      </div>
    })}
  </div>
}

function Loading() {
  return <div>
    {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)}
  </div>
}

function Skeleton() {
  return <div className="bg-base-200 rounded-md px-6 my-1">
    <div className="animate-pulse h-16 flex flex-col justify-center gap-2">
      <div className="h-4 bg-base-300 rounded w-1/2"></div>
      <div className="h-4 bg-base-300 rounded w-1/3"></div>
    </div>
  </div>
}