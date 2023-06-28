import LogoutButton from "@/components/LogoutButton";
import NavLink from "@/components/NavLink";
import { decodeToken, getAuthRole } from "@/lib/user";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";


export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = getAuthRole();
  if (!role) redirect("/logout")
  if (role === "TECHNICIAN") redirect("/farmers")
  
  return <div className="drawer">
    <input id="private-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col h-screen">
      {children}
    </div>
    <div className="drawer-side z-30">
      <label htmlFor="private-drawer" className="drawer-overlay"></label>
      <ul className="menu w-60 h-full bg-base-200 text-base-content">
        <NavLink active="dashboard" href="/dashboard">Dashboard</NavLink>
        <LogoutButton />
      </ul>
    </div>
  </div>
}