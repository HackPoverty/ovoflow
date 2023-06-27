import LogoutButton from "@/components/LogoutButton";
import NavLink from "@/components/navigation/NavLink";
import { getAuthRole } from "@/lib/user";
import { redirect } from "next/navigation";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = getAuthRole();
  if (!role) redirect("/logout")
  if (role === "FARMER") redirect("/dashboard")

  return <div className="drawer">
    <input id="private-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col h-screen">
      {children}
    </div>
    <div className="drawer-side z-30">
      <label htmlFor="private-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-60 h-full bg-base-200 text-base-content">
        <NavLink active="technician" href="/technician">Dashboard</NavLink>
        <NavLink active="farmeres" href="/farmers">Farmers List</NavLink>
        <LogoutButton />
      </ul>
    </div>
  </div>
}