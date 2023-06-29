"use client"

export default function Error({ reset } : {error: Error, reset: () => void}) {
  <div className="bg-red-500 text-white sticky top-0 px-4 py-2" onClick={reset}>
    Cannot fetch most recent logs, tap here to try again
  </div>
}