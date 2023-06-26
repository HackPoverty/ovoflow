import { decodeToken } from "@/lib/user";
import { cookies } from "next/headers";

export async function POST(request: Request) {
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
  const role = decodeToken(token).user.role;

  return new Response(JSON.stringify({role}), {
    headers: {
      "Set-Cookie": `token=${auth.token}; Path=/; HttpOnly; Secure; SameSite=Lax`
    }
  })
}