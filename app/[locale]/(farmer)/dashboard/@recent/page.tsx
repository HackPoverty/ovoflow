import { jsonApiFetch } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { FarmerJournal } from "@/types/content";
import { Node } from "@/types/highLevel";
import { useLocale } from "next-intl";
import { getFormatter, getTranslator } from "next-intl/server";

type Result = Pick<Node<FarmerJournal>, "created" | "fieldInitialstock" | "id">

export default async function RecentEntries() {
  const { uid } = getCookies();
  const formatter = await getFormatter(useLocale())
  const journals = await jsonApiFetch<Result[]>(`node/farmer_daily_journal`, {
    "filter[uid.meta.drupal_internal__target_id]": uid,
    "sort": "-created",
    "page[limit]": 8,
    "fields[node--farmer_daily_journal]": "created,field_initialstock"
  });

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