import { jsonApiFetch } from "@/lib/axios"
import { Node } from "@/types/highLevel"
import { Farmer } from "@/types/user"
import { useFormatter, useNow, useTranslations } from "next-intl"
import useSWR from "swr"

type Result = Pick<Node<Farmer>, "name" | "fieldFarmerLastVisited">

export default function Profile({farmerId}: {farmerId: string}) {
  const t = useTranslations("FarmerDetail")
  const formatter = useFormatter()
  const now = useNow()  
  const {data, isLoading} = useSWR(`farmer/${farmerId}/@profile`, () => jsonApiFetch<Result>(`user/user/${farmerId}`))

  if (isLoading) return <Loading />
  if (!data) return null;

  const { name, fieldFarmerLastVisited } = data;
  return <>
  <h1>{name}</h1>
  <p>
    {!fieldFarmerLastVisited
      ? t("never visiteed")
      : t("visit", {
        date: formatter.relativeTime(new Date(fieldFarmerLastVisited), now)
      })
    }
  </p>
</>
}

function Loading() {
  return <>
    <div className="animate-pulse h-8 w-1/3 bg-base-300 mb-1" />
    <div className="animate-pulse h-6 w-1/2 bg-base-300" />
  </>
}

