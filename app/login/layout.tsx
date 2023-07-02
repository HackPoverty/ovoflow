import { FARMER_ROLE, TECHNICIAN_ROLE, getAuthRole } from "@/lib/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login | Ovoflow"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = getAuthRole();
  if (role === TECHNICIAN_ROLE) redirect("/farmers");
  if (role === FARMER_ROLE) redirect("/dashboard");

  return children;
}