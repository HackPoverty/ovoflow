import ErrorSection from "@/components/error/ErrorSection";
import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview";
import Navigation from "@/components/layouts/Navigation";
import { PrivateRoute } from "@/components/layouts/PrivateRoute";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import BackButton from "@/components/navigation/BackButton";
import { jsonApiFetch } from "@/lib/axios";
import { TECHNICIAN_ROLE } from "@/lib/user";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";
import { GetStaticPropsContext } from "next";
import { useFormatter, useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

type Result = TechnicianVisit & {
  fieldForFarmer: {
    name: string,
    id: string
  }
};

export default function VisitDetail() {
  const t = useTranslations("TechnicianVisit")
  const { query } = useRouter()
  const visitId = query.visitId as string;
  const formatter = useFormatter()
  const { data: visit, isLoading, error } = useSWR(`/visit/${visitId}`, () => jsonApiFetch<Node<Result>>(`node/technician_visit/${visitId}`, {
    "include": "field_for_farmer",
    "fields[user--user]": "name"
  }))

  return <PrivateRoute role={TECHNICIAN_ROLE}>
    <Head>
      <title>{t("default farm visit")}</title>
    </Head>
    <Navigation title={t("default farm visit")} buttonNav={<BackButton />}>
      {isLoading ? <Loading /> : (error || !visit) ? <Error /> : null}
      {visit && <>
        <div className="bg-base-200 shadow-lg px-6 py-2">
          <p className="font-semibold">{t("farm visit", { name: visit.fieldForFarmer.name })}</p>
          <p className="text-sm">{t("visit", {
            date: formatter.dateTime(new Date(visit.created), {
              month: "long",
              day: "numeric"
            })
          })}</p>
        </div>
        <main className="p-6 flex-1 overflow-y-auto">
          <TechnicianVisitPreview visit={visit} />
        </main>
      </>}
    </Navigation>
  </PrivateRoute>
}

function Loading() {
  const t = useTranslations("TechnicianVisit")
  return <main className="flex flex-col items-center justify-center gap-6 flex-1">
    <LoadingSpinner label={t("loading")} />
  </main>
}

function Error() {
  const { reload } = useRouter()
  const t = useTranslations("TechnicianVisit.Error")
  return <main className="flex flex-col items-center justify-center gap-2 flex-1 text-error">
    <ErrorSection label={t("message")} />
    <button className="btn" onClick={reload}>{t("try again")}</button>
  </main>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
