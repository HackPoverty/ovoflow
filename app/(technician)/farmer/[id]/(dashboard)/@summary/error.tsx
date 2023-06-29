"use client"

import ErrorCard from "@/components/error/ErrorCard"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  return <ErrorCard reset={reset} />
}