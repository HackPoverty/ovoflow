"use client"

import PaginationButtons from "@/components/PaginationButtons";
import ErrorSection from "@/components/error/ErrorSection";

export default function Error({ reset }: { error: Error, reset: () => void }) {
  return <>
    <main className="text-error py-6 flex-1 flex flex-col items-center justify-center overflow-y-auto">
      <ErrorSection reset={reset} />
    </main>
    <div className="flex justify-between p-4 shadow-lg">
      <PaginationButtons />
    </div>
  </>
}