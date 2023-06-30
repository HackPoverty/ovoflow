import { FARMER_ROLE, getAuthRole } from "@/lib/user";
import { redirect } from "next-intl/server";

export default function Index() {
  const role = getAuthRole();
  if (!role) redirect("/logout");
  if (role === FARMER_ROLE) redirect("/dashboard");
  else redirect("/technician");
}