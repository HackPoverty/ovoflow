import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview";
import { jsonApiFetch } from "@/lib/axios";
import { enFullDate } from "@/lib/formatter";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";

type Props = {
  params: {
    id: string
  }
}

export default async function TechnicianVisitDetail({ params }: Props) {
  const visit = await jsonApiFetch<Node<TechnicianVisit>>(`node/technician_visit/${params.id}`)

  return <>
    <div className="bg-base-200 shadow-lg px-6 py-2">
      <p className="font-semibold">{visit.title}</p>
      <p className="font-small">Visited at {enFullDate.format(new Date(visit.created))}</p>
    </div>
    <main className="p-6 flex-1 overflow-y-auto">
      <TechnicianVisitPreview visit={visit} />
    </main>
  </>
}