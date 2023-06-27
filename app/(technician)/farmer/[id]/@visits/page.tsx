import PaginationButtons from "@/components/PaginationButtons";
import { jsonApiFetchPaginated } from "@/lib/axios";
import { enDate } from "@/lib/formatter";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";

const PAGE_LIMIT = 6;

type Props = {
  params: {
    id: string
  }
  searchParams: {
    visit_offset?: string
  }
}

type Result = Pick<Node<TechnicianVisit>, "created" | "id">

export default async function Visits({ params, searchParams }: Props) {
  console.log({
    id: params.id,
    offset: searchParams.visit_offset || 0
  })
  const offset = +(searchParams.visit_offset || 0);
  const { data, isFirst, isLast } = await jsonApiFetchPaginated<Result>("node/technician_visit", {
    "filter[field_for_farmer.id]": params.id,
    "sort": "-created",
    "fields[node--technician_visit]": "created"
  }, PAGE_LIMIT, offset);

  return <>
    <div className="my-4">
      {data.map(entry => <div key={entry.id} className="px-6 py-2 bg-base-200 my-1">
        <p>{enDate.format(new Date(entry.created))}</p>
      </div>)}
    </div>
    <div className="flex gap-4 justify-center">
      <PaginationButtons
        prevLink={isFirst ? undefined : `?visit_offset=${Math.max(0, offset - PAGE_LIMIT)}`}
        nextLink={isLast ? undefined : `?visit_offset=${offset + PAGE_LIMIT}`} />
    </div>
  </>
}