import TechnicianVisitListItem from "@/components/technician/TechnicianVisitListItem";
import { jsonApiFetchPaginated } from "@/lib/axios";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";

const PAGE_LIMIT = 5;

type Props = {
  params: {
    id: string
  }
}

type Result = Pick<Node<TechnicianVisit>, "created" | "id" | "title">

export default async function Visits({ params }: Props) {
  const { data } = await jsonApiFetchPaginated<Result>("node/technician_visit", {
    "filter[field_for_farmer.id]": params.id,
    "sort": "-created",
    "fields[node--technician_visit]": "created,title"
  }, PAGE_LIMIT);

  return <div>
    {data.map(entry => <TechnicianVisitListItem key={entry.id} visit={entry} />)}
  </div>
}