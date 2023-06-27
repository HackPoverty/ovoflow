import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(_: Request) {
  cookies().delete("token");
  cookies().delete("uid");
  redirect("/login");
}