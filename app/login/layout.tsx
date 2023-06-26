import { decodeToken } from "@/lib/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Login | Ovoflow"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    const role = decodeToken(token).user.role;
    if (role === "FARMER") redirect("/");
    if (role === "TECHNICIAN") redirect("/farmers");
  }

  return children;
}