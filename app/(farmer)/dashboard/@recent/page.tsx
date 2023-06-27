import { jsonApi, jsonDeserialize } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { enDate } from "@/lib/formatter";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";
import { cookies } from "next/headers";

type Result = Pick<Node<FarmerJournal>, "created" | "fieldInitialstock" | "id">

const getPastJournalEntries = async () => {
  const {uid, token} = getCookies();
  const response = await jsonApi.get(
    `node/farmer_daily_journal`, {
    params: {
      "filter[uid.meta.drupal_internal__target_id]": uid,
      "sort": "-created",
      "page[limit]": 3,
      "fields[node--farmer_daily_journal]": "created,field_initialstock"
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return jsonDeserialize<Result[]>(response.data);
}

export default async function RecentEntries() {
  const journals = await getPastJournalEntries();
  return <div>
    {journals.map(journal => {
      return <div key={journal.id} className="py-2 px-6 bg-base-200">
        <p>Date: {enDate.format(new Date(journal.created))}</p>
        <p>Chicken: {journal.fieldInitialstock || 0}</p>
      </div>
    })}
  </div>
}