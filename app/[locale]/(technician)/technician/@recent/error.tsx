"use client"

import ErrorBanner from "@/components/error/ErrorBanner"

export default function Error({ reset }: { error: Error, reset: () => void }) {
  return <ErrorBanner reset={reset} />
}