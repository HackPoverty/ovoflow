import { decodeToken } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json()
  let response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jwt/token?_format=json`, {
    headers: {
      "Authorization": `Basic ${btoa(`${data.username}:${data.password}`)}`,
    }
  })
  if (!response.ok) {
    return response;
  }
  const auth = await response.json()
  const token = auth.token as string;
  const uid = decodeToken(token).user.uid;

  const nextResponse = NextResponse.json({token, uid});
  nextResponse.cookies.set("token", auth.token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax"
  })
  nextResponse.cookies.set("uid", uid, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax"
  })

  return nextResponse;
}