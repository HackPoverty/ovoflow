import { formatTime } from "@/lib/formatter";
import Link from "next/link";

type Props = {
  farmerId: string,
  name: string,
  lastVisitDate?: Date,
  now: Date
}

export function FarmerListItem({ name, lastVisitDate, now , farmerId}: Props) {
  let bgColor = "bg-base-200";
  if (lastVisitDate) {
    const days = Math.ceil((+now - +lastVisitDate) / (1000 * 3600 * 24));
    if (days <= 5) bgColor = "bg-success/70";
    else if (days <= 10) bgColor = "bg-warning/70";
    else bgColor = "bg-error/70"
  }

  return <Link href={`/farmer/${farmerId}`}>
    <div className={`px-4 py-2 my-1 ${bgColor}`}>
      <p className="font-semibold">{name}</p>
      <p className="text-sm">
        {!lastVisitDate ? "never visited before" : `visited ${formatTime(lastVisitDate, now)}`}
      </p>
    </div>
  </Link>
}