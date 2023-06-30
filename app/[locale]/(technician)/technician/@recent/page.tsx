import { FarmerListItem } from "@/components/farmers/FarmerListItem";
import { jsonApiFetch } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";

type Result = Pick<Node<Farmer>, "id" | "fieldFarmerLastVisited" | "name">

export default async function RecentVisits() {
  const farmers = await jsonApiFetch<Result[]>("user/user", {
    "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
    "fields[user--user]": "field_farmer_last_visited,name",
    "sort": "-field_farmer_last_visited,name",
    "page[limit]": 5
  });
  return <>
    {
      farmers.map(farmer => <FarmerListItem
        key={farmer.id}
        farmerId={farmer.id}
        name={farmer.name}
        lastVisitDate={farmer.fieldFarmerLastVisited ? new Date(farmer.fieldFarmerLastVisited) : undefined}
      />)
    }
  </>
}