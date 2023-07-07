import { Role, decodeToken } from "@/lib/user"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

type Props = {
  role: Role,
  children: ReactNode
}

export const PrivateRoute = ({ role, children }: Props) => {
  const router = useRouter();
  const [render, setRender] = useState<ReactNode>(null);

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
  
  return render;
}