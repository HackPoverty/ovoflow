export default function Loading() {
  return <div>
    {Array.from({length: 5}).map((_, i) => <Skeleton key={i} />)}
  </div>
}

function Skeleton() {
  return <div className="bg-base-200 rounded-md px-6 max-w-sm w-full mx-auto my-1">
  <div className="animate-pulse h-16 flex flex-col justify-center gap-2">
    <div className="h-4 bg-base-300 rounded w-1/2"></div>
    <div className="h-4 bg-base-300 rounded w-1/3"></div>
  </div>
</div>
}