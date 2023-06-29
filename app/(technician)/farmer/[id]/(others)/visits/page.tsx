import PaginationButtons from "@/components/PaginationButtons";
import TechnicianVisitListItem from "@/components/technician/TechnicianVisitListItem";
import { jsonApiFetchPaginated } from "@/lib/axios";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";
import { Farmer } from "@/types/user";

const PAGE_LIMIT = 10;

type Props = {
  params: {
    id: string,
  }
  searchParams: {
    offset?: string,
  }
}

type Item = Pick<Node<TechnicianVisit>, "created" | "id" | "title">

export default async function TechnicianVisits({ params, searchParams }: Props) {
  const offset = +(searchParams.offset || 0)
  const prev = Math.max(0, offset - PAGE_LIMIT)
  const next = offset + PAGE_LIMIT

  const { data, isFirst, isLast } = await jsonApiFetchPaginated<Item>("node/technician_visit", {
    "filter[field_for_farmer.id]": params.id,
    "sort": "-created",
    "fields[node--technician_visit]": "created,title"
  }, PAGE_LIMIT, offset);

  return <>
    <main className="flex-1 overflow-y-auto py-10">
      {data.map((visit) => <TechnicianVisitListItem visit={visit} key={visit.id} />)}
    </main>
    <div className="flex p-4 justify-between">
      <PaginationButtons
        prevLink={isFirst ? undefined : `?offset=${prev}`}
        nextLink={isLast ? undefined : `?offset=${next}`} />
    </div>
  </>
}