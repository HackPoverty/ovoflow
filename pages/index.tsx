import { TECHNICIAN_ROLE, decodeToken } from "@/lib/user";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { replace } = useRouter();
  
  useEffect(() => {
    const token = getCookie("token")?.toString()
    if (!token) {
      replace("/logout")
      return
    }
    const role = decodeToken(token).user.role;
    if (role === TECHNICIAN_ROLE) replace("/technician");
    else replace("/dashboard")
  }, [replace])

  return null;
}