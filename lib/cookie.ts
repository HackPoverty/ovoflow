import { cookies } from "next/headers"

export function getCookies() {
  const store = cookies();
  return {
    token: store.get("token")?.value,
    uid: store.get("uid")?.value,
  }
}