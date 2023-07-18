import ErrorBanner from "@/components/error/ErrorBanner";
import { FarmerListItem } from "@/components/farmers/FarmerListItem";
import FarmerListItemSkeleton from "@/components/farmers/FarmerListItemSkeleton";
import { jsonApiFetch } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";
import { useTranslations } from "next-intl";
import useSWR from "swr";

type Result = Pick<Node<Farmer>, "id" | "fieldFarmerLastVisited" | "name">;

function getRecentVisitedFarms() {
  return jsonApiFetch<Result[]>("user/user", {
    "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
    "fields[user--user]": "field_farmer_last_visited,name",
    sort: "-field_farmer_last_visited,name",
    "page[limit]": 5,
  });
}

export default function RecentVisitedFarms() {
  const t = useTranslations("TechnicianDashboard.Error");
  const { data: farmers, error, isLoading } = useSWR("/technician/@recent", getRecentVisitedFarms);

  if (isLoading) return Array.from({ length: 5 }).map((_, i) => <FarmerListItemSkeleton key={i} />);
  if (error || !farmers) return <ErrorBanner message={t("fetch recent")} />;
  return (
    <>
      {farmers.map((farmer) => (
        <FarmerListItem
          key={farmer.id}
          farmerId={farmer.id}
          name={farmer.name}
          lastVisitDate={
            farmer.fieldFarmerLastVisited ? new Date(farmer.fieldFarmerLastVisited) : undefined
          }
        />
      ))}
    </>
  );
}
