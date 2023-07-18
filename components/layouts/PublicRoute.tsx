import { TECHNICIAN_ROLE, decodeToken } from "@/lib/user";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

export default function PublicRoute(props: PropsWithChildren<{}>) {
  const router = useRouter();
  const [render, setRender] = useState<ReactNode>(props.children);

  useEffect(() => {
    const token = getCookie("token")?.toString();
    if (!token) return;
    const user = decodeToken(token).user;
    setRender(null);
    if (user.role === TECHNICIAN_ROLE) router.replace("/technician");
    else router.replace("/technician");
  }, [router]);

  return render;
}
