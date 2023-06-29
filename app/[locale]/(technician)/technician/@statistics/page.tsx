import WarningCard from "@/components/WarningCard";
import { jsonApiFetch } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";

type Result = Pick<Node<Farmer>, "id">;

export default async function Statistics() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const users = await jsonApiFetch<Result[]>("user/user", {
    "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
    "fields[user--user]": "",
    "filter[recent][condition][path]": "field_farmer_last_visited",
    "filter[recent][condition][operator]": ">=",
    "filter[recent][condition][value]": firstDay
  });

  if (users.length === 0) return <WarningCard label="No farms visited this month" />

  return <StatsCard value={users.length} />
}

function StatsCard({ value }: { value: number }) {
  return <div className="bg-base-200 p-4 rounded-md">
    <h1 className="text-6xl font-bold text-accent">{value}</h1>
    <p className="text-sm">{value === 1 ? "farm" : "farms"} visited this month</p>
  </div>
}