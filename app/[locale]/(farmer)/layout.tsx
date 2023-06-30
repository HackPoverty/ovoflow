import NavLink from "@/components/navigation/NavLink";
import { TECHNICIAN_ROLE, getAuthRole } from "@/lib/user";
import { useTranslations } from "next-intl";
import { redirect } from "next-intl/server";


export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = getAuthRole();
  if (!role) redirect("/logout")
  if (role === TECHNICIAN_ROLE) redirect("/farmers")
  const t = useTranslations("Navigation")

  return <div className="drawer">
    <input id="private-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col h-screen">
      {children}
    </div>
    <div className="drawer-side z-30">
      <label htmlFor="private-drawer" className="drawer-overlay"></label>
      <ul className="menu w-60 h-full bg-base-200 text-base-content">
        <NavLink active="dashboard" href="/dashboard">
          {t("dashboard")}
        </NavLink>
        <NavLink href="/logout" className="text-error">
          {t("logout")}
        </NavLink>
      </ul>
    </div>
  </div>
}