import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  req.cookies.delete("token");
  req.cookies.delete("uid");
  redirect("/login");
}