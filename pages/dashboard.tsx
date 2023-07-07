import Logging from "@/components/dashboard/farmer/Logging";
import RecentEntries from "@/components/dashboard/farmer/RecentEntries";
import Statistics from "@/components/dashboard/farmer/Statistics";
import FarmerDrawer from "@/components/layouts/FarmerDrawer";
import Navigation from "@/components/layouts/Navigation";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function FarmerDashboard() {
  const t = useTranslations("FarmerDashboard")

  return <>
  <Head>
    <title>{t("dashboard")}</title>
  </Head>
  <Navigation title={t("dashboard")} drawer={<FarmerDrawer />}>
    <main className="pb-6 flex-1 flex flex-col gap-3 overflow-y-auto">
      <Logging />
      <div className="w-screen">
        <h3 className="px-6 pb-2">{t("statistics")}</h3>
        <div className="grid grid-flow-col gap-4 px-6 overflow-x-auto">
          <Statistics />
        </div>
      </div>
      <div>
        <h3 className="px-6 pb-2">{t("recent entries")}</h3>
        <RecentEntries />
      </div>
    </main>
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