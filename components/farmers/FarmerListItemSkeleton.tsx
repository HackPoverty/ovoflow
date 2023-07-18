export default function FarmerListItemSkeleton() {
  return (
    <div className="bg-base-200">
      <div className="my-1 flex animate-pulse flex-col gap-2 px-4 py-2">
        <div className="h-6 w-1/3 bg-base-300"></div>
        <div className="h-3 w-1/2 bg-base-300"></div>
      </div>
    </div>
  );
}
