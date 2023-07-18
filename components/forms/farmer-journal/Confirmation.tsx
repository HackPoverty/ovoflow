import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Label from "../Label";
import PreviewField from "../PreviewField";
import PreviewSection from "../preview/PreviewSection";
import { FarmerJournalSchema } from "./schema";

export default function Confirmation() {
  const t = useTranslations("FarmerJournal");

  const { watch } = useFormContext<FarmerJournalSchema>();
  const data = watch();

  return (
    <>
      <PreviewSection label={t("stock")}>
        <div className="grid grid-cols-2 gap-2">
          <Label>{t("initial stock")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldInitialstock}
          />
          <Label>{t("mortality")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldMortality}
          />
          <Label>{t("mortality prolapse")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldMortalityprolapse}
          />
        </div>
      </PreviewSection>
      <PreviewSection label={t("eggs production")}>
        <div className="grid grid-cols-2 gap-2">
          <Label>{t("small eggs")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldSmallEggs}
          />
          <Label>{t("medium eggs")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldMediumEggs}
          />
          <Label>{t("large eggs")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldLargeEggs}
          />
          <Label>{t("damaged eggs")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldDamagedEggs}
          />
          <Label>{t("lay frequency")}</Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldLayFrequency}
          />
          <Label>
            {t("lay frequency")} ({t("industry standard")})
          </Label>
          <PreviewField
            className="input inline-flex items-center justify-end"
            value={data.fieldLayFrequencyIndustrySta}
          />
        </div>
      </PreviewSection>
      <PreviewSection label={t("feeding")}>
        <div className="grid grid-cols-2 gap-2">
          <Label>{t("total given")}</Label>
          <div className="join">
            <PreviewField
              className="input join-item inline-flex w-full items-center justify-end"
              value={data.fieldGivenFeed}
            />
            <span className="join-item inline-flex items-center bg-accent px-2 text-accent-content">
              kg
            </span>
          </div>
        </div>
      </PreviewSection>
      <PreviewSection label={t("note")}>
        <PreviewField className="textarea col-span-2" value={data.fieldCommentdailycheck} />
      </PreviewSection>
    </>
  );
}
