import PaginationButtons from "@/components/PaginationButtons";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function Loading() {
  return <>
    <main className="flex-1 flex flex-col items-center justify-center gap-4">
      <LoadingSpinner />
    </main>
    <div className="flex p-4 justify-between">
      <PaginationButtons />
    </div>
  </>
}