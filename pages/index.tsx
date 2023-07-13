import { getLocaleStaticsProps } from "@/lib/i18n";
import { decodeToken, TECHNICIAN_ROLE } from "@/lib/user";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token")?.toString();
    if (!token) {
      router.replace("/logout");
      return;
    }
    const user = decodeToken(token).user;
    if (user.role === TECHNICIAN_ROLE) router.replace("/technician");
    else router.replace("/technician");
  }, [router])

  return null;
}

export const getStaticProps = getLocaleStaticsProps([])