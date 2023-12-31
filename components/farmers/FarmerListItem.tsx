import { useFormatter, useNow, useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  farmerId: string;
  name: string;
  lastVisitDate?: Date;
};

export function FarmerListItem({ name, lastVisitDate, farmerId }: Props) {
  const t = useTranslations("FarmersList");
  const formatter = useFormatter();
  const now = useNow();

  let bgColor = "bg-base-200";
  if (lastVisitDate) {
    const days = Math.ceil((+now - +lastVisitDate) / (1000 * 3600 * 24));
    if (days <= 5) bgColor = "bg-success/70";
    else if (days <= 10) bgColor = "bg-warning/70";
    else bgColor = "bg-error/70";
  }

  return (
    <Link href={`/farmer/${farmerId}`}>
      <div className={`my-1 px-4 py-2 ${bgColor}`}>
        <p className="font-semibold">{name}</p>
        <p className="text-sm">
          {!lastVisitDate
            ? t("never visited")
            : t("visited", {
                date: formatter.relativeTime(lastVisitDate, now),
              })}
        </p>
      </div>
    </Link>
  );
}
