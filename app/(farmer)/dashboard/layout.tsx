import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Ovoflow"
}

type Props = {
  recent: ReactNode,
  statistics: ReactNode,
  logging: ReactNode
}

export default async function Layout({ recent, statistics, logging }: Props) {
  return <>
    <NavigationBar title="Dashboard" button={<MenuButton />} />
    <main className="pb-6 flex flex-col gap-3">
      {logging}
      <div>
        <h3 className="px-6 pb-2">Statistics</h3>
        {statistics}
      </div>
      <div>
        <h3 className="px-6 pb-2">Recent entries</h3>
        {recent}
      </div>
    </main>
  </>;
}