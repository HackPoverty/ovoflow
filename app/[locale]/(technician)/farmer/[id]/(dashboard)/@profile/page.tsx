import { jsonApiFetch } from "@/lib/axios"
import { Node } from "@/types/highLevel"
import { Farmer } from "@/types/user"
import { useLocale } from "next-intl"
import { getFormatter, getTranslator } from "next-intl/server"

type Props = {
  params: {
    id: string
  }
}

type Result = Pick<Node<Farmer>, "name" | "fieldFarmerLastVisited">

export default async function Profile({ params }: Props) {
  const locale = useLocale()
  const t = await getTranslator(locale, "FarmerDetail")
  const formatter = await getFormatter(locale)
  const { name, fieldFarmerLastVisited } = await jsonApiFetch<Result>(`user/user/${params.id}`, {
    "fields[user--user]": "name,field_farmer_last_visited"
  })

  return <>
    <h1>{name}</h1>
    <p>
      {!fieldFarmerLastVisited
        ? t("never visiteed")
        : t("visit", {
          date: formatter.relativeTime(new Date(fieldFarmerLastVisited))
        })
      }
    </p>
  </>
}