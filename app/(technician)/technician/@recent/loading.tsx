export default function Loading() {
  return Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
}

function Skeleton() {
  return <div className="bg-base-200">
    <div className="animate-pulse flex flex-col px-4 py-2 gap-2 my-1">
      <div className="h-6 bg-base-300 w-1/3"></div>
      <div className="h-3 bg-base-300 w-1/2"></div>
    </div>
  </div>
}