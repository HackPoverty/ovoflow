import { useTranslations } from "next-intl";
import Label from "../Label";
import PreviewField from "../PreviewField";
import { TechnicianVisitFormSchema, useTechnicianVisit } from "../technician-visit/schema";
import PreviewSection from "./PreviewSection";

export default function TechnicianVisitPreview({ visit }: { visit: TechnicianVisitFormSchema }) {
  const t = useTranslations("FarmChecklist");
  const { getDiseaseName, getPresence, getQualityNames, getVaccineName } = useTechnicianVisit();

  return (
    <>
      <PreviewSection label={t("quality")}>
        <div className="grid grid-cols-2 gap-2">
          <Label>{t("light sufficiency")}</Label>
          <PreviewField
            className="input flex items-center justify-end"
            value={getQualityNames(visit.fieldLightSufficiency)}
          />
          <Label>{t("feed quality")}</Label>
          <PreviewField
            className="input flex items-center justify-end"
            value={getQualityNames(visit.fieldFeedQuantity)}
          />
          <Label>{t("water cleaniness")}</Label>
          <PreviewField
            className="input flex items-center justify-end"
            value={getQualityNames(visit.fieldWaterCleanliness)}
          />
          <Label>{t("clean bedding")}</Label>
          <PreviewField
            className="input flex items-center justify-end"
            value={getQualityNames(visit.fieldCleanBedding)}
          />
          <Label>{t("ventilation")}</Label>
          <PreviewField
            className="input flex items-center justify-end"
            value={getQualityNames(visit.fieldVentillation)}
          />
        </div>
      </PreviewSection>

      <PreviewSection label={t("diseases")}>
        <div>
          <div className="grid grid-cols-2">
            <Label>{t("presense of diseases")}</Label>
            <PreviewField
              className="input flex items-center justify-end"
              value={getPresence(visit.fieldDisease)}
            />
          </div>
          {visit.fieldDisease !== "No" ? (
            <>
              <div className="col-span-2 mt-2">
                <Label>{t("common diseases")}</Label>
                <PreviewField className="textarea w-full">
                  {visit.fieldDiseaseNames.map((value) => (
                    <p key={value}>{getDiseaseName(value)}</p>
                  ))}
                </PreviewField>
              </div>
              <div className="col-span-2">
                <Label>{t("other diseases")}</Label>
                <PreviewField className="textarea w-full" value={visit.fieldOtherpossibledisease} />
              </div>
            </>
          ) : null}
        </div>
      </PreviewSection>

      <PreviewSection label={t("vaccination")}>
        <div>
          <div className="flex items-center">
            <Label>{t("were vaccine given")}</Label>
            <input
              type="checkbox"
              className="checkbox-accent checkbox ml-auto"
              disabled
              checked={visit.fieldVaccineGiven}
            />
          </div>
          {visit.fieldVaccineGiven ? (
            <>
              <div className="col-span-2 mt-2">
                <Label>{t("common vaccines")}</Label>
                <PreviewField className="textarea w-full">
                  {visit.fieldVaccinations.map((value) => (
                    <p key={value}>{getVaccineName(value)}</p>
                  ))}
                </PreviewField>
              </div>
              <div className="col-span-2">
                <Label>{t("other vaccines")}</Label>
                <PreviewField className="textarea w-full" />
              </div>
            </>
          ) : null}
        </div>
      </PreviewSection>

      <PreviewSection label={t("comment")}>
        <PreviewField className="textarea w-full" />
      </PreviewSection>
    </>
  );
}
