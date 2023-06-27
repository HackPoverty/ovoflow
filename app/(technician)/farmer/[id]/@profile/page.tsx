import { jsonApiFetch } from "@/lib/axios"
import { formatTime } from "@/lib/formatter"
import { Node } from "@/types/highLevel"
import { Farmer } from "@/types/user"

type Props = {
  params: {
    id: string
  }
}

type Result = Pick<Node<Farmer>, "name" | "fieldFarmerLastVisited">

export default async function Profile({ params }: Props) {
  const { name, fieldFarmerLastVisited } = await jsonApiFetch<Result>(`user/user/${params.id}`, {
    "fields[user--user]": "name,field_farmer_last_visited"
  })

  return <>
    <h1>{name}</h1>
    <p>
      {!fieldFarmerLastVisited
        ? "never visited before"
        : `visited ${formatTime(new Date(fieldFarmerLastVisited), new Date())}`}
    </p>
  </>
}