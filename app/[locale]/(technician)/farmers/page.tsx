import PaginationButtons from "@/components/PaginationButtons";
import { FarmerListItem } from "@/components/farmers/FarmerListItem";
import { jsonApiFetchPaginated } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";

const PAGE_LIMIT = 6

type Props = {
  searchParams: {
    offset?: string
  }
}

type Result = Pick<Node<Farmer>, "id" | "fieldFarmerLastVisited" | "name">

export default async function FarmerList({ searchParams }: Props) {
  const offset = +(searchParams.offset || 0);

  const { data, isFirst, isLast } = await jsonApiFetchPaginated<Result>("user/user", {
    "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
    "fields[user--user]": "field_farmer_last_visited,name",
    "sort": "-field_farmer_last_visited,name",
  }, PAGE_LIMIT, offset);

  const now = new Date();

  return <>
    <main className="py-6 flex-1 overflow-y-auto">
      <div>
        {
          data.map(farmer => <FarmerListItem
            key={farmer.id}
            farmerId={farmer.id}
            name={farmer.name}
            now={now}
            lastVisitDate={farmer.fieldFarmerLastVisited
              ? new Date(farmer.fieldFarmerLastVisited) : undefined}
          />)
        }
      </div>
    </main>
    <div className="flex justify-between p-4 shadow-lg">
      <PaginationButtons
        prevLink={isFirst ? undefined : `?offset=${Math.max(0, +offset - PAGE_LIMIT)}`}
        nextLink={isLast ? undefined : `?offset=${+offset + PAGE_LIMIT}`} />
    </div>
  </>
}