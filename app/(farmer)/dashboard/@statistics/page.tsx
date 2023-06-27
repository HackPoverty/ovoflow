import { jsonApiFetch } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { enDate } from "@/lib/formatter";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";

const SECONDS_IN_DAY = 24 * 60 * 60;

type Result = Pick<
  Node<FarmerJournal>,
  "created" | "fieldSmallEggs" | "fieldMediumEggs" | "fieldLargeEggs"
>

async function getStatistics() {
  const { uid } = getCookies();

  const data = await jsonApiFetch<Result[]>(`node/farmer_daily_journal`, {
    "filter[uid.meta.drupal_internal__target_id]": uid,
    "sort": "-created",
    "fields[node--farrmer_daily_journal]": "created,field_small_eggs,field_medium_eggs,field_large_eggs",
    "filter[recent][condition][path]": "created",
    "filter[recent][condition][operator]": ">=",
    "filter[recent][condition][value]": Math.floor(Date.now()) - 7 * SECONDS_IN_DAY
  });
  
  if (data.length == 0) return undefined;
  const eggs = data.map(datum => (datum.fieldSmallEggs || 0) + (datum.fieldMediumEggs || 0) + (datum.fieldLargeEggs || 0))
  return {
    average: Math.round(eggs.reduce((a, b) => a + b, 0) / eggs.length),
    lastRecordDate: data[0].created
  }
}

export default async function Statistics() {
  const data = await getStatistics();
  if (!data) return <div className="alert alert-warning rounded-none flex px-6">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <span className="text-left">You have no records last week</span>
  </div>
  return <div className="bg-base-300 px-6 py-2">
    <p>Average: {data.average}</p>
    <p>Last record date: {enDate.format(new Date(data.lastRecordDate))}</p>
  </div>
}