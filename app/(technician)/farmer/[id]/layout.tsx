import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  params: {
    id: string
  }
  profile: ReactNode,
  visits: ReactNode,
  summary: ReactNode
}

export default function FarmerDetail({ profile, params, summary, visits }: Props) {
  return <>
    <NavigationBar title="Farmer Detail" button={<BackButton />} />
    <main className="flex flex-col gap-4 py-6">
      <div className="px-6">{profile}</div>
      <Link href={`/checklist/${params.id}`} className="mx-6 btn btn-primary">Add visit record</Link>
      <div className="px-6">
        <h3>7-day Summary</h3>
        {summary}
      </div>
      <div>
        <h3 className="px-6">Visit Records</h3>
        {visits}
      </div>
    </main>
  </>
}