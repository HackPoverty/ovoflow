import { useNavigatorOnline } from "@/hooks/useNavigatorOnline"
import { AuthorizationError } from "@/lib/error"
import { submitOfflineJournals, submitOfflineTechnicals } from "@/lib/offline/background"
import { FARMER_ROLE, Role, TECHNICIAN_ROLE, decodeToken } from "@/lib/user"
import NotFound from "@/pages/404"
import { getCookie } from "cookies-next"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { PropsWithChildren, ReactNode, useEffect, useState } from "react"
import { SWRConfig } from "swr"

type Props = {
  role: Role,
  children: ReactNode
}

export const PrivateRoute = ({ role, children }: Props) => {
  const router = useRouter();
  const [render, setRender] = useState<ReactNode>(null);
  const isOnline = useNavigatorOnline();
  const t = useTranslations("Offline")

  useEffect(() => {
    const token = getCookie("token")?.toString();
    if (!token) {
      router.replace("/logout")
      return;
    }
    const user = decodeToken(token).user;
    if (user.role === role) setRender(children)
    else router.replace("/logout")
  }, [router, role, children])

  useEffect(() => {
    // Submit offline data
    if (!isOnline) return;
    if (role === FARMER_ROLE) submitOfflineJournals()
    if (role === TECHNICIAN_ROLE) submitOfflineTechnicals()
  }, [role, isOnline])

  return <SWRConfig value={{
    onError(err) {
      if (err instanceof AuthorizationError) {
        router.replace("/logout")
      } else if (err instanceof NotFound) {
        router.replace("/404")
      }
    }
  }}>
    {!isOnline ? <div className="bg-error p-2 text-xs">
      <p>{t("message")}</p>
    </div> : null}
    {render}
  </SWRConfig>;
}
