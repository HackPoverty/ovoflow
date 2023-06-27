import { formatTime } from "@/lib/formatter";

type Props = {
  name: string,
  lastVisitDate?: Date,
  now: Date
}

export function FarmerListItem({ name, lastVisitDate, now }: Props) {
  let bgColor = "bg-base-200";
  if (lastVisitDate) {
    const days = Math.ceil((+now - +lastVisitDate) / (1000 * 3600 * 24));
    if (days <= 5) bgColor = "bg-success/70";
    else if (days <= 10) bgColor = "bg-warning/70";
    else bgColor = "bg-error/70"
  }

  return <div className={`px-4 py-2 my-1 ${bgColor}`}>
    <p className="font-semibold">{name}</p>
    <p className="text-sm">
    {!lastVisitDate ? "never visited before" : `visited ${formatTime(lastVisitDate, now)}`}
    </p>
  </div>
}