import { jsonApiFetch } from "@/lib/axios";
import { Node } from "@/types/highLevel";
import { Farmer } from "@/types/user";
import useSWR from "swr";

type Result = Pick<Node<Farmer>, "name">

export const useFarmerName = (farmerId: string) => {
  const { data } = useSWR(`/farmers/${farmerId}/@name`, () => jsonApiFetch<Result>(`user/user/${farmerId}`, {
    "fields[user--user]": "name"
  }))

  return data?.name;
}