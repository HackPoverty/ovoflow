export default function Loading() {
  return <div className="rounded-md bg-base-200 px-4">
    <div className="h-[120px] min-w-[200px] flex flex-col gap-2 justify-center animate-pulse">
      <div className="bg-base-300 w-3/4 h-6 rounded-md"></div>
      <div className="bg-base-300 w-16 h-10 rounded-md"></div>
    </div>
  </div>
}