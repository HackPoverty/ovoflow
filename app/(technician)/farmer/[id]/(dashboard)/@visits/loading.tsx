import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function Loading() {
  return <div className="bg-base-200 flex flex-col items-center gap-4">
    <LoadingSpinner />
  </div>
}