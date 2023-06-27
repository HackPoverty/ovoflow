import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview";
import { jsonApiFetch } from "@/lib/axios";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";

type Props = {
  params: {
    id: string
  }
}

export default async function TechnicianVisitDetail({ params }: Props) {
  const visit = await jsonApiFetch<Node<TechnicianVisit>>(`node/technician_visit/${params.id}`)

  return <main className="p-6">
    <TechnicianVisitPreview visit={visit} />
  </main>
}