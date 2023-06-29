import PaginationButtons from "@/components/PaginationButtons";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function Loading() {
  return <>
    <main className="py-6 flex-1 flex flex-col items-center justify-center overflow-y-auto">
      <LoadingSpinner />
    </main>
    <div className="flex justify-between p-4 shadow-lg">
      <PaginationButtons />
    </div>
  </>
}