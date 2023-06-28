import { getAuthRole } from "@/lib/user";
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
  if (role === "TECHNICIAN") redirect("/farmers");
  if (role === "FARMER") redirect("/dashboard");

  return children;
}