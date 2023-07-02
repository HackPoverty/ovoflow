import { jsonApiFetch } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";
import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";
import { getTranslator } from "next-intl/server";

type Result = Pick<Node<FarmerJournal>, "created">

async function getLastRecordTimestampOfCurrentFarmer() {
  const { uid } = getCookies();

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

export default async function Logging() {
  const now = Math.floor(Date.now() / 1000);
  const lastTimeStamp = await getLastRecordTimestampOfCurrentFarmer() || 0;
  const diff = now - lastTimeStamp;
  const t = await getTranslator(useLocale(), "FarmerDashboard")

  return <>
    {diff < SECONDS_IN_DAY && <CompleteNotice />}
    {diff >= 2 * SECONDS_IN_DAY && <OverdueNotice />}
    <Link className={`btn mx-6 my-2 ${diff < SECONDS_IN_DAY ? "btn-disabled" : "btn-primary"}`} href="/journal">{t("finish daily journal")}</Link>
  </>
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