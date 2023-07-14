import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Label from "../Label";
import PreviewField from "../PreviewField";
import { FarmerJournalSchema } from "./schema";

export default function Confirmation() {
  const t = useTranslations("FarmerJournal")

  const { watch } = useFormContext<FarmerJournalSchema>();
  const data = watch();

  return <div className="grid grid-cols-2 p-6 gap-2">
    <h3 className="font-semibold col-span-2 text-accent">{t("stock")}</h3>
    <Label>{t("initial stock")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldInitialstock} />
    <Label>{t("mortality")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldMortality} />
    <Label>{t("mortality prolapse")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldMortalityprolapse} />
    <h3 className="font-semibold col-span-2 text-accent">{t("eggs production")}</h3>
    <Label>{t("small eggs")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldSmallEggs} />
    <Label>{t("medium eggs")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldMediumEggs} />
    <Label>{t("large eggs")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldLargeEggs} />
    <Label>{t("damaged eggs")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldDamagedEggs} />
    <Label>{t("lay frequency")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldLayFrequency} />
    <Label>{t("lay frequency")} ({t("industry standard")})</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={data.fieldLayFrequencyIndustrySta} />
    <h3 className="font-semibold col-span-2 text-accent">{t("feeding")}</h3>
    <Label>{t("total given")}</Label>
    <div className="join">
      <PreviewField className="input justify-end inline-flex items-center join-item w-full" value={data.fieldGivenFeed} />
      <span className="join-item px-2 inline-flex items-center bg-accent text-accent-content">kg</span>
    </div>
    <h3 className="font-semibold col-span-2 text-accent">{t("note")}</h3>
    <PreviewField className="col-span-2 textarea" value={data.fieldCommentdailycheck} />
  </div>
}