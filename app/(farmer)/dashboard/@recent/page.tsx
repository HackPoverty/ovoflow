import { jsonApiFetch } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { enFullDate } from "@/lib/formatter";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";

type Result = Pick<Node<FarmerJournal>, "created" | "fieldInitialstock" | "id">

export default async function RecentEntries() {
  const { uid } = getCookies();
  const journals = await jsonApiFetch<Result[]>(`node/farmer_daily_journal`, {
    "filter[uid.meta.drupal_internal__target_id]": uid,
    "sort": "-created",
    "page[limit]": 3,
    "fields[node--farmer_daily_journal]": "created,field_initialstock"
  });
  return <div>
    {journals.map(journal => {
      return <div key={journal.id} className="py-2 px-6 bg-base-200">
        <p>Date: {enFullDate.format(new Date(journal.created))}</p>
        <p>Chicken: {journal.fieldInitialstock || 0}</p>
      </div>
    })}
  </div>
}