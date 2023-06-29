import PaginationButtons from "@/components/PaginationButtons";
import FarmerListItemSkeleton from "../../../components/farmers/FarmerListItemSkeleton";

export default function Loading() {
  return <>
    <main className="py-6 flex-1 overflow-y-auto">
      {Array.from({ length: 6 }).map((_, i) => <FarmerListItemSkeleton key={i} />)}
    </main>
    <div className="flex justify-between p-4 shadow-lg">
      <PaginationButtons />
    </div>
  </>
}