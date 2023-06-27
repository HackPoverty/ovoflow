import { jsonApi, jsonDeserialize } from "@/lib/axios";
import { getCookies } from "@/lib/cookie";
import { Node } from "@/types/highLevel";
import { FARMER_ROLE_ID, Farmer } from "@/types/user";

type Result = Pick<Node<Farmer>, "id">;

async function getVisitedFarmsCount() {
  const { token } = getCookies();
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  // Get 3 most recent visited farmers
  const response = await jsonApi.get("user/user", {
    params: {
      "filter[roles.meta.drupal_internal__target_id]": FARMER_ROLE_ID,
      "fields[user--user]": "",
      "filter[recent][condition][path]": "field_farmer_last_visited",
      "filter[recent][condition][operator]": ">=",
      "filter[recent][condition][value]": firstDay
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return jsonDeserialize<Result[]>(response.data).length;
}

export default async function Statistics() {
  const count = await getVisitedFarmsCount();

  if (count === 0) return <div className="alert alert-warning flex rounded-none">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <span className="text-left">No farms visited this month</span>
  </div>

  return <div className="bg-base-200 p-4">
    <h1 className="text-6xl text-accent">{count}</h1>
    <p>{count === 1 ? "farm" : "farms"} visited this month</p>
  </div>
}