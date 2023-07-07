import { jsonApiFetch } from "@/lib/axios";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import useSWR from "swr";

type Result = Pick<Node<FarmerJournal>, "created">

async function getLastRecordTimestampOfCurrentFarmer() {
  const uid = getCookie("uid")
  const data = await jsonApiFetch<Result[]>(`node/farmer_daily_journal`, {
    "filter[uid.meta.drupal_internal__target_id]": uid,
    "sort": "-created",
    "page[limit]": 1,
    "fields[node--farmer_daily_journal]": "created"
  });
  if (data.length === 0) return undefined;

  return Math.floor(new Date(data[0].created).getTime() / 1000);
}

const SECONDS_IN_DAY = 24 * 60 * 60;

export default function Logging() {
  const { data, isLoading, error } = useSWR("farmer-dashboard-logging", getLastRecordTimestampOfCurrentFarmer)
  const t = useTranslations("FarmerDashboard")
  const diff = !data ? undefined : Math.floor(Date.now() / 1000) - data;

  const disabled = isLoading || error || !diff || diff < SECONDS_IN_DAY

  return <>
    {error && <Error />}
    {diff && diff < SECONDS_IN_DAY && <CompleteNotice />}
    {diff && diff >= 2 * SECONDS_IN_DAY && <OverdueNotice />}
    {<Link className={`btn mx-6 my-2 ${disabled ? "btn-disabled" : "btn-primary"}`} href="/journal">{t("finish daily journal")}</Link>}
  </>
}

function Error() {
  const t = useTranslations("FarmerDashboard.Error")
  return <div className="bg-error sticky top-0 px-4 py-2">
    <p className="text-sm">{t("fetch notice")}</p>
  </div>
}

function CompleteNotice() {
  const t = useTranslations("FarmerDashboard")
  return <div className="bg-success sticky top-0 px-4 py-2 z-10 shadow-lg text-sm">
    <span className="text-sm">{t("complete notice")}</span>
  </div>
}

function OverdueNotice() {
  const t = useTranslations("FarmerDashboard")
  return <div className="bg-warning sticky top-0 px-4 py-2 z-10 shadow-lg text-sm">
    <span className="text-sm">{t("overdue notice")}</span>
  </div>
}