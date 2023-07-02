import { enFullDate } from "@/lib/formatter"
import { TechnicianVisit } from "@/types/content"
import { Node } from "@/types/highLevel"
import Link from "next-intl/link"

type Props = {
  visit: Pick<Node<TechnicianVisit>, "created" | "id" | "title">
}

export default function TechnicianVisitListItem({ visit }: Props) {
  return <Link key={visit.id} href={`/visit/${visit.id}`}>
    <div className="px-6 py-2 bg-base-200 my-1">
      <p className="font-semibold">{visit.title}</p>
      <p className="text-sm">{enFullDate.format(new Date(visit.created))}</p>
    </div>
  </Link>
}