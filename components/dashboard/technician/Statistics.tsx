import WarningCard from "@/components/WarningCard";
import ErrorCard from "@/components/error/ErrorCard";
import { jsonApiFetch } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";
import { useNow, useTranslations } from "next-intl";
import useSWR from "swr";

type Result = Pick<Node<Farmer>, "id">;

async function getVisitedFarmsBefore(date: Date) {
  return await await jsonApiFetch<Result[]>("user/user", {
    "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
    "fields[user--user]": "",
    "filter[recent][condition][path]": "field_farmer_last_visited",
    "filter[recent][condition][operator]": ">=",
    "filter[recent][condition][value]": date.toISOString(),
  });
}

export default function Statistics() {
  const now = useNow();
  const t = useTranslations("TechnicianDashboard");
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR("/technician/@statistics", () => getVisitedFarmsBefore(firstDay));

  if (isLoading) return <Loading />;
  if (!users || error) return <ErrorCard message={t("Error.fetch statistics")} />;
  if (users.length === 0) return <WarningCard label={t("no farms visited")} />;
  return (
    <div className="rounded-md bg-base-200 p-4">
      <h1 className="text-6xl font-bold text-accent">{users.length}</h1>
      <p className="text-sm">{t("farms visited", { count: users.length })}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="bg-base-200 p-4">
      <div className="flex animate-pulse flex-col justify-center gap-2">
        <div className="h-14 w-16 bg-base-300" />
        <div className="h-4 w-1/2 bg-base-300" />
      </div>
    </div>
  );
}
