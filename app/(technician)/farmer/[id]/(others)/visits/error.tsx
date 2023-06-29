"use client"

import PaginationButtons from "@/components/PaginationButtons"
import ErrorSection from "@/components/error/ErrorSection"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  return <>
    <main className="flex flex-1 flex-col items-center justify-center text-error">
      <ErrorSection reset={reset} />
    </main>
    <div className="flex p-4 justify-between">
      <PaginationButtons />
    </div>
  </>
}