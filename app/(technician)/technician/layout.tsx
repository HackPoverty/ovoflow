import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  statistics: ReactNode,
  recent: ReactNode
}

export const metadata: Metadata = {
  title: "Technician | Ovoflow"
}

export default function FarmerDashboard({ statistics, recent }: Props) {
  return <>
    <NavigationBar title="Dashboard" button={<MenuButton />} />
    <main className="py-6 flex flex-col gap-4">
      <h1 className="px-4">Hello technician</h1>
      {statistics}
      <div>
        <h3 className="px-4 pb-2">Recent Visited Farmers</h3>
        {recent}
      </div>
    </main>
  </>
}