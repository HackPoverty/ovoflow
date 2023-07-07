import { useTranslations } from "next-intl"
import NavLink from "../navigation/NavLink"

export const TechnicianDrawer = () => {
  const t = useTranslations("Navigation")
  return <>
    <NavLink active="technician" href="/technician">
      {t("dashboard")}
    </NavLink>
    <NavLink active="farmers" href="/farmers">
      {t("farmers list")}
    </NavLink>
    <NavLink href="/logout" className="text-error">
      {t("logout")}
    </NavLink>
  </>
}