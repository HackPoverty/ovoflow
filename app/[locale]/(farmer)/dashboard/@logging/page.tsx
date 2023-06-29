import { jsonApiFetch } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";
import Link from "next/link";

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

  return <>
    {diff < SECONDS_IN_DAY && <LogComplete />}
    {diff >= 2 * SECONDS_IN_DAY && <LogNotice />}
    <Link className={`btn mx-6 my-2 ${diff < SECONDS_IN_DAY ? "btn-disabled" : "btn-primary"}`} href="/journal">Finish daily journal</Link>
  </>
}

function LogComplete() {
  return <div className="bg-success sticky top-0 px-4 py-2 z-10 shadow-lg text-sm">
    <span className="text-sm">Daily journal completed, please come back tommorow</span>
  </div>
}

function LogNotice() {
  return <div className="bg-warning sticky top-0 px-4 py-2 z-10 shadow-lg text-sm">
    <span className="text-sm">Please finish your daily journal</span>
  </div>
}