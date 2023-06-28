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
    <main className="pb-6 flex-1 flex flex-col gap-3 overflow-y-auto">
      {logging}
      <div className="w-screen">
        <h3 className="px-6 pb-2">Statistics</h3>
        <div className="grid grid-flow-col gap-4 px-6 overflow-x-auto">
          {statistics}
        </div>
      </div>
      <div>
        <h3 className="px-6 pb-2">Recent entries</h3>
        {recent}
      </div>
    </main>
  </>;
}