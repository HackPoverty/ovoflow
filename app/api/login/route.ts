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
  const authData = await response.json()

  return new Response(authData, {
    headers: {
      "Set-Cookie": `token=${authData.token}; Path=/; HttpOnly; Secure; SameSite=Lax`
    }
  })
}