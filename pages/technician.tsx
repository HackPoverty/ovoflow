import RecentVisitedFarms from "@/components/dashboard/technician/RecentVisitedFarms";
import Statistics from "@/components/dashboard/technician/Statistics";
import Navigation from "@/components/layouts/Navigation";
import { PrivateRoute } from "@/components/layouts/PrivateRoute";
import { TechnicianDrawer } from "@/components/layouts/TechnicianDrawer";
import { TECHNICIAN_ROLE } from "@/lib/user";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function TechnicianDashboard() {
  const t = useTranslations("TechnicianDashboard")

  return <>
    <Head>
      <title>{t("dashboard")}</title>
    </Head>
    <Navigation title={t("dashboard")} drawer={<TechnicianDrawer />}>
      <PrivateRoute role={TECHNICIAN_ROLE}>
        <main className="py-6 flex flex-1 overflow-y-auto flex-col gap-4">
          <h1 className="px-4">{t("hello", { name: "technician" })}</h1>
          <div className="px-4">
            <h3 className="mb-2">{t("summary")}</h3>
            <Statistics />
          </div>
          <div>
            <h3 className="px-4 pb-2">{t("recent visited farms")}</h3>
            <RecentVisitedFarms />
          </div>
        </main>
      </PrivateRoute >
    </Navigation>
  </>
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}