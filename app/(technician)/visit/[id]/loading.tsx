import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function Loading() {
  return <main className="flex flex-col items-center justify-center gap-6 flex-1">
    <LoadingSpinner />
  </main>
}