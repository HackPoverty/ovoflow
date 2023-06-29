export default function Loading() {
  return <div className="bg-base-200 p-4">
    <div className="animate-pulse flex flex-col justify-center gap-2">
      <div className="bg-base-300 h-14 w-16" />
      <div className="bg-base-300 h-4 w-1/2" />
    </div>
  </div>
}