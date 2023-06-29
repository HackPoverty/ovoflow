import FarmerListItemSkeleton from "../../../../components/farmers/FarmerListItemSkeleton"

export default function Loading() {
  return Array.from({ length: 5 }).map((_, i) => <FarmerListItemSkeleton key={i} />)
}
