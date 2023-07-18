import ErrorSection from "@/components/error/ErrorSection";
import { FarmerListItem } from "@/components/farmers/FarmerListItem";
import Navigation from "@/components/layouts/Navigation";
import { PrivateRoute } from "@/components/layouts/PrivateRoute";
import { TechnicianDrawer } from "@/components/layouts/TechnicianDrawer";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { usePagination } from "@/hooks/usePagination";
import { jsonApiFetchPaginated } from "@/lib/axios";
import { getLocaleStaticsProps } from "@/lib/i18n";
import { TECHNICIAN_ROLE } from "@/lib/user";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import useSWR from "swr";

const PAGE_LIMIT = 6;

type Result = Pick<Node<Farmer>, "id" | "fieldFarmerLastVisited" | "name">;

function getListofFarmers(offset: number) {
  return jsonApiFetchPaginated<Result>(
    "user/user",
    {
      "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
      "fields[user--user]": "field_farmer_last_visited,name",
      sort: "-field_farmer_last_visited,name",
    },
    PAGE_LIMIT,
    offset,
  );
}

export default function FarmersList() {
  const t = useTranslations("FarmersList");
  const tList = useTranslations("ListNavigation");
  const { offset, onPrevious, onNext } = usePagination(PAGE_LIMIT);
  const { data, isLoading, error } = useSWR(`/farmers?limit=${PAGE_LIMIT}&offset=${offset}`, () =>
    getListofFarmers(offset),
  );

  return (
    <PrivateRoute role={TECHNICIAN_ROLE}>
      <Head>
        <title>{t("farmers list")}</title>
      </Head>
      <Navigation title={t("farmers list")} drawer={<TechnicianDrawer />}>
        {isLoading ? <Loading /> : error || !data ? <Error /> : <Display data={data.data} />}
        <div className="grid grid-cols-2 justify-between gap-4 p-4 shadow-lg">
          <button
            className="btn-accent btn rounded-full"
            onClick={onPrevious}
            disabled={isLoading || error || data?.isFirst}
          >
            <ChevronLeft />
            {tList("previous")}
          </button>
          <button
            className="btn-accent btn rounded-full"
            onClick={onNext}
            disabled={isLoading || error || data?.isLast}
          >
            {tList("next")}
            <ChevronRight />
          </button>
        </div>
      </Navigation>
    </PrivateRoute>
  );
}

function Loading() {
  const t = useTranslations("FarmersList");
  return (
    <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto py-6">
      <LoadingSpinner label={t("loading")} />
    </main>
  );
}

function Error() {
  const t = useTranslations("FarmersList.Error");
  return (
    <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto py-6 text-error">
      <ErrorSection label={t("message")} />
    </main>
  );
}

function Display({ data }: { data: Result[] }) {
  return (
    <main className="flex-1 overflow-y-auto py-6">
      {data.map((farmer) => (
        <FarmerListItem
          key={farmer.id}
          farmerId={farmer.id}
          name={farmer.name}
          lastVisitDate={
            farmer.fieldFarmerLastVisited ? new Date(farmer.fieldFarmerLastVisited) : undefined
          }
        />
      ))}
    </main>
  );
}

export const getStaticProps = getLocaleStaticsProps([
  "FarmersList",
  "ListNavigation",
  "Navigation",
  "Offline",
]);
