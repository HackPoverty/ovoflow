import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Ovoflow"
}

export default function FarmerDashboard() {
  return <>
    <NavigationBar title="Dashboard" button={<MenuButton />} />
    <main className="px-6 pt-6 pb-16">

    </main>
  </>
}