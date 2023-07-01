export default function Loading() {
  return <>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>
}


function Skeleton() {
  return <div className="flex flex-col justify-between w-[200px] bg-base-200 rounded-md h-[128px] p-4 animate-pulse">
    <div className="w-full bg-base-300 h-4" />
    <div className="bg-base-300 h-16 w-24" />
  </div>
}