"use client"

import PaginationButtons from "@/components/PaginationButtons";
import ErrorBanner from "@/components/error/ErrorBanner";

export default function Error({ reset }: { error: Error, reset: () => void }) {
  return <>
    <main className="py-6 flex-1 overflow-y-auto">
      <ErrorBanner />
    </main>
    <div className="flex justify-between p-4 shadow-lg">
      <PaginationButtons />
    </div>
  </>
}