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

export default async function Logging() {
  const now = Math.floor(Date.now() / 1000);
  const lastTimeStamp = await getLastRecordTimestampOfCurrentFarmer() || 0;
  if (now - lastTimeStamp > 24 * 60 * 60) return <Link className="btn btn-secondary m-6" href="/journal">Finish daily journal</Link>

  return <div className="alert alert-success flex rounded-none px-6">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="text-left">Daily log completed, please come back tomorrow</span>
  </div>
}