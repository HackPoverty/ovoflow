import { FarmerListItem } from "@/components/FarmerListItem";
import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { jsonApiFetchPaginated } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";
import Link from "next/link";

const PAGE_LIMIT = 6

type Props = {
  searchParams: {
    offset?: number
  }
}

type Result = Pick<Node<Farmer>, "id" | "fieldFarmerLastVisited" | "name">

export default async function FarmerList({ searchParams }: Props) {
  const offset = searchParams.offset || 0;
  const prev = Math.max(0, +offset - PAGE_LIMIT);
  const next = +offset + PAGE_LIMIT;


  const { data, isFirst, isLast } = await jsonApiFetchPaginated<Result>("user/user", {
    "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
    "fields[user--user]": "field_farmer_last_visited,name",
    "sort": "-field_farmer_last_visited,name",
  }, PAGE_LIMIT, searchParams.offset);

  const now = new Date();

  return <>
    <NavigationBar title="Farmers List" button={<MenuButton />} />
    <main className="py-6">
      <div>
        {
          data.map(farmer => <FarmerListItem
            key={farmer.id}
            name={farmer.name}
            now={now}
            lastVisitDate={farmer.fieldFarmerLastVisited
              ? new Date(farmer.fieldFarmerLastVisited) : undefined}
          />)
        }
      </div>
      <div className="flex justify-center gap-6 mt-6">
        {/* Previous */}
        <Link href={`?offset=${prev}`} className={`btn btn-circle ${isFirst ? "btn-disabled" : "btn-accent"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        {/* Next */}
        <Link href={`?offset=${next}`} className={`btn btn-circle ${isLast ? "btn-disabled" : "btn-accent"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </main>
  </>
}