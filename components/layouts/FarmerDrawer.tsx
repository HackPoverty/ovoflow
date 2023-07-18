import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import NavLink from "../navigation/NavLink";

export default function FarmerDrawer() {
  const t = useTranslations("Navigation");
  const { route } = useRouter();
  const isAvtive = (path: string) => route === path;

  return (
    <>
      <NavLink active="/dashboard" href="/dashboard">
        {t("dashboard")}
      </NavLink>
      <NavLink href="/logout" className="text-error">
        {t("logout")}
      </NavLink>
    </>
  );
}
