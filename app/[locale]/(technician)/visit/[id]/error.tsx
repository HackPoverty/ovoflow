"use client"

import ErrorSection from "@/components/error/ErrorSection"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  return <main className="flex flex-col items-center justify-center gap-2 flex-1 text-error">
    <ErrorSection label="" />
  </main>
}