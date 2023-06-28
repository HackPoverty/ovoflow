import { getAuthRole } from "@/lib/user";
import { redirect } from "next/navigation";

export default function Index() {
  const role = getAuthRole();
  if (!role) redirect("/logout");
  if (role === "FARMER") redirect("/dashboard");
  else redirect("/technician");
}