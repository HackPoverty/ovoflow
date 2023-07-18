import { jsonApiFetchPaginated } from "@/lib/axios";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import ErrorBanner from "../error/ErrorBanner";
import LoadingSpinner from "../loading/LoadingSpinner";
import TechnicianVisitListItem from "../technician/TechnicianVisitListItem";

const PAGE_LIMIT = 5;

type Result = Pick<Node<TechnicianVisit>, "created" | "id" | "title">;

async function getRecentVisitsByFarmerId(farmerId: string, limit: number) {
  const { data } = await jsonApiFetchPaginated<Result>(
    "node/technician_visit",
    {
      "filter[field_for_farmer.id]": farmerId,
      sort: "-created",
      "fields[node--technician_visit]": "created,title",
    },
    limit,
  );
  return data;
}

function RecentVisits({ farmerId }: { farmerId: string }) {
  const { data, isLoading, error } = useSWR(`/farmer/${farmerId}/@receent`, () =>
    getRecentVisitsByFarmerId(farmerId, PAGE_LIMIT),
  );
  if (isLoading) return <Loading />;
  if (error || !data) return <Error />;
  return (
    <div>
      {data.map((entry) => (
        <TechnicianVisitListItem key={entry.id} visit={entry} />
      ))}
    </div>
  );
}

function Error() {
  const t = useTranslations("FarmerDetail.Error");
  return <ErrorBanner message={t("fetch recent visits error")} />;
}

function Loading() {
  const t = useTranslations("FarmerDetail");
  return (
    <div className="flex flex-col items-center gap-4 bg-base-200 py-4">
      <LoadingSpinner label={t("loading recent visits")} />
    </div>
  );
}

export default RecentVisits;
