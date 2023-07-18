import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import Label from "../Label";
import { useTechnicianVisitContext } from "./context";
import { TechnicianVisitFormSchema } from "./schema";

export default function FarmQuality() {
  const t = useTranslations("FarmChecklist");
  return (
    <div className="flex flex-col gap-4 pb-4">
      <QualityInput label={t("light sufficiency")} name="fieldLightSufficiency" />
      <QualityInput label={t("feed quality")} name="fieldFeedQuantity" />
      <QualityInput label={t("water cleaniness")} name="fieldWaterCleanliness" />
      <QualityInput label={t("clean bedding")} name="fieldCleanBedding" />
      <QualityInput label={t("ventilation")} name="fieldVentillation" />
    </div>
  );
}

function QualityInput({ name, label }: { name: keyof TechnicianVisitFormSchema; label: string }) {
  const { scales } = useTechnicianVisitContext();
  const { control } = useFormContext<TechnicianVisitFormSchema>();
  const { field } = useController({ control, name });

  return (
    <div className="px-4">
      <Label required>{label}</Label>
      <div className={`join flex w-full rounded-lg`}>
        {scales.map((q) => (
          <button
            className={`btn-sm join-item btn flex-1 ${field.value === q.value ? "btn-accent" : ""}`}
            key={`${name}.${q.value}`}
            type="button"
            onClick={() => field.onChange(q.value)}
          >
            {q.description}
          </button>
        ))}
      </div>
    </div>
  );
}
