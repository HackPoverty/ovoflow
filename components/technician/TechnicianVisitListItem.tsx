import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";
import { useFormatter } from "next-intl";
import Link from "next/link";

type Props = {
  visit: Pick<Node<TechnicianVisit>, "created" | "id" | "title">;
};

export default function TechnicianVisitListItem({ visit }: Props) {
  const formatter = useFormatter();

  return (
    <Link key={visit.id} href={`/visit/${visit.id}`} prefetch={false}>
      <div className="my-1 bg-base-200 px-6 py-2">
        <p className="font-semibold">{visit.title}</p>
        <p className="text-sm">
          {formatter.dateTime(new Date(visit.created), {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
