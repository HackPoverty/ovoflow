import { FarmerListItem } from "@/components/FarmerListItem";
import { jsonApi, jsonDeserialize } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";

type Result = Pick<Node<Farmer>, "id" | "fieldFarmerLastVisited" | "name">

async function getRecentVisitedFarmers() {
  const { token } = getCookies();

  // Get 3 most recent visited farmers
  const response = await jsonApi.get("user/user", {
    params: {
      "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
      "fields[user--user]": "field_farmer_last_visited,name",
      "sort": "-field_farmer_last_visited,name",
      "page[limit]": 5
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return jsonDeserialize<Result[]>(response.data);
}

export default async function RecentVisits() {
  const now = new Date();
  const farmers = await getRecentVisitedFarmers();

  return <>
    {
      farmers.map(farmer => <FarmerListItem
        key={farmer.id}
        name={farmer.name}
        now={now}
        lastVisitDate={farmer.fieldFarmerLastVisited ? new Date(farmer.fieldFarmerLastVisited) : undefined}
      />)
    }
  </>
}