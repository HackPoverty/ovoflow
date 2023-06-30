import NavLink from "@/components/navigation/NavLink";
import { FARMER_ROLE, getAuthRole } from "@/lib/user";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

function onLinkClick() {

}

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = getAuthRole();
  if (!role) redirect("/logout")
  if (role === FARMER_ROLE) redirect("/dashboard")
  const t = useTranslations("Navigation")

  return <div className="drawer">
    <input id="private-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col h-screen">
      {children}
    </div>
    <div className="drawer-side z-30">
      <label htmlFor="private-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-60 h-full bg-base-200 text-base-content">
        <NavLink active="technician" href="/technician">
          {t("dashboard")}
        </NavLink>
        <NavLink active="farmers" href="/farmers">
          {t("farmers list")}
        </NavLink>
        <NavLink href="/logout" className="text-error">
          {t("logout")}
        </NavLink>
      </ul>
    </div>
  </div>
}