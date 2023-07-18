import Profile from "@/components/farmer-detail/Profile";
import RecentVisits from "@/components/farmer-detail/RecentVisits";
import Summary from "@/components/farmer-detail/Summary";
import Navigation from "@/components/layouts/Navigation";
import { PrivateRoute } from "@/components/layouts/PrivateRoute";
import BackButton from "@/components/navigation/BackButton";
import { getLocaleStaticsProps } from "@/lib/i18n";
import { TECHNICIAN_ROLE } from "@/lib/user";
import { GetStaticPaths } from "next";
import { useNow, useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FarmerDetail() {
  const { query, locale } = useRouter()
  const t = useTranslations("FarmerDetail");
  const farmerId = query.farmerId as string;
  const now = useNow()
  const lastWeek = +now - 7 * 24 * 3600 * 1000;
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric"
  })

  return <PrivateRoute role={TECHNICIAN_ROLE}>
    <Head>
      <title>{t("title")}</title>
    </Head>
    <Navigation title={t("title")} buttonNav={<BackButton />}>
      <main className="flex flex-col gap-6 py-6 flex-1 overflow-y-auto">
        <div className="px-6">
          <Profile farmerId={farmerId} />
          <Link href={`/farmer/${farmerId}/checklist`} className="w-full btn btn-primary mt-2" prefetch={false}>{t("add visit record")}</Link>
        </div>
        <div className="w-screen">
          <h3 className="px-6">{t("summary")}</h3>
          <p className="text-base-content px-6">{formatter.formatRange(lastWeek, now)}</p>
          <div className="grid grid-flow-col mt-2 px-6 overflow-x-auto gap-2">
            <Summary farmerId={farmerId} />
          </div>
        </div>
        <div>
          <div className="flex items-center px-6">
            <h3>{t("recent visit")}</h3>
            <Link href={`/farmer/${farmerId}/visits`} className="ml-auto" prefetch={false}>{t("see all")}</Link>
          </div>
          <RecentVisits farmerId={farmerId} />
        </div>
      </main >
    </Navigation>
  </PrivateRoute>
}

export const getStaticProps = getLocaleStaticsProps(["FarmerDetail", "Offline"])

export const getStaticPaths: GetStaticPaths<{ farmerId: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}
