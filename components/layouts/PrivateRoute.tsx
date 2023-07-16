import { useNavigatorOnline } from "@/hooks/useNavigatorOnline"
import { AuthorizationError } from "@/lib/error"
import { submitOfflineJournals, submitOfflineTechnicals } from "@/lib/offline/background"
import { FARMER_ROLE, Role, TECHNICIAN_ROLE, decodeToken } from "@/lib/user"
import NotFound from "@/pages/404"
import { getCookie } from "cookies-next"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
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
  const token = getCookie("token")?.toString();
  const isAuthorized = token ? decodeToken(token).user.role === role : false;

  useEffect(() => {
    if (isAuthorized) {
      setRender(children)
    } else {
      router.replace("/logout");
    }
  }, [isAuthorized, children, router])

  // Submit offline data
  useEffect(() => {
    if (!isOnline && !isAuthorized) return;
    if (role === FARMER_ROLE) submitOfflineJournals()
    if (role === TECHNICIAN_ROLE) submitOfflineTechnicals()
  }, [role, isOnline, isAuthorized])

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
