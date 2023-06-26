import { decodeToken } from "@/lib/user";
import {cookies} from "next/headers"
import { redirect } from "next/navigation";

export default function Index() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");
  const role = decodeToken(token).user.role;
  if (role === "FARMER") redirect("/dashboard");
  else redirect("/technician");
}