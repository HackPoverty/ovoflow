import { FarmerJournal } from "@/types/content";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

export default function Note() {
  const t = useTranslations("FarmerJournal")
  const { register } = useFormContext<FarmerJournal>();

  return <div className="p-6">
    <textarea 
      className="textarea textarea-accent w-full" 
      rows={10} {...register("fieldCommentdailycheck")}
      placeholder={t("note placeholder")} />
  </div>
}