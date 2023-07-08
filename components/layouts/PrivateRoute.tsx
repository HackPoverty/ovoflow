import { AuthorizationError, ServerError } from "@/lib/error"
import { Role, decodeToken } from "@/lib/user"
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
  const [connected, setConnected] = useState(true)

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

  return <SWRConfig value={{
    onSuccess() { setConnected(true) },
    onError(err) {
      if (err instanceof AuthorizationError) {
        router.replace("/logout")
      } else if (err instanceof NotFound) {
        router.replace("/404")
      } else if (err instanceof ServerError) {
        return
      } else setConnected(false)
    }
  }}>
    <WithInternet hasConnection={connected}>
      {render}
    </WithInternet>
  </SWRConfig>;
}

function WithInternet({ children, hasConnection = true }: PropsWithChildren<{ hasConnection?: boolean }>) {
  const t = useTranslations("Offline")
  return <>
    {!hasConnection ? <div className="bg-error p-2 text-xs">
      <p>{t("message")}</p>
    </div> : null}
    {children}
  </>
}