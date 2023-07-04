import TechnicianVisitPreview from "@/components/forms/preview/TechnicianVisitPreview";
import { jsonApiFetch } from "@/lib/axios";
import { TechnicianVisit } from "@/types/content";
import { Node } from "@/types/highLevel";
import { useLocale } from "next-intl";
import { getFormatter, getTranslator } from "next-intl/server";

type Props = {
  params: {
    id: string
  }
}

type Result = TechnicianVisit & {
  fieldForFarmer: {
    name: string,
    id: string
  }
};

export default async function TechnicianVisitDetail({ params }: Props) {
  const locale = useLocale()
  const t = await getTranslator(locale, "TechnicianVisit")
  const formatter = await getFormatter(locale)
  const visit = await jsonApiFetch<Node<Result>>(`node/technician_visit/${params.id}`, {
    "include": "field_for_farmer",
    "fields[user--user]": "name"
  })

  return <>
    <div className="bg-base-200 shadow-lg px-6 py-2">
      <p className="font-semibold">{t("farm visit", { name: visit.fieldForFarmer.name })}</p>
      <p className="text-sm">{t("visit", {
        date: formatter.dateTime(new Date(visit.created), {
          month: "long",
          day: "numeric"
        })
      })}</p>
    </div>
    <main className="p-6 flex-1 overflow-y-auto">
      <TechnicianVisitPreview visit={visit} />
    </main>
  </>
}