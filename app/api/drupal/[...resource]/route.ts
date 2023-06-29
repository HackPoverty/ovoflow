import { getCookies } from "@/lib/cookie";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { resource: string[] } }) {
  const path = params.resource.join('/');
  let query = req.nextUrl.searchParams.toString();
  if (query) query = `?${query}`;
  const url = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi_data/${path}${query}`;
  const { token } = getCookies();
  const body = await req.json();
  console.log({url, body, token});
  
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`
    },
  })
}