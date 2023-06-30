import WarningCard from "@/components/WarningCard";
import { jsonApiFetch } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";

type Result = Pick<Node<Farmer>, "id">;

export default async function Statistics() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const t = await getTranslator(useLocale(), "TechnicianDashboard")

  const users = await jsonApiFetch<Result[]>("user/user", {
    "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
    "fields[user--user]": "",
    "filter[recent][condition][path]": "field_farmer_last_visited",
    "filter[recent][condition][operator]": ">=",
    "filter[recent][condition][value]": firstDay
  });

  if (users.length === 0) return <WarningCard label={t("no farms visited")} />

  return <div className="bg-base-200 p-4 rounded-md">
    <h1 className="text-6xl font-bold text-accent">{users.length}</h1>
    <p className="text-sm">{t("farms visited", { count: users.length })}</p>
  </div>
}
