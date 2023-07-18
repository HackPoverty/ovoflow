import { useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMeesage";
import Label from "../Label";
import PreviewField from "../PreviewField";
import NumberInput from "./NumberInput";
import { FarmerJournalSchema } from "./schema";
import { useTranslations } from "next-intl";

export default function ChickenFeeding() {
  const t = useTranslations("FarmerJournal");
  const {
    watch,
    formState: { errors },
  } = useFormContext<FarmerJournalSchema>();
  const [inital, mortality, proplapse, feed] = watch([
    "fieldInitialstock",
    "fieldMortality",
    "fieldMortalityprolapse",
    "fieldGivenFeed",
  ]);
  const closingStock = inital - mortality - proplapse;
  const feedPerBirds =
    closingStock <= 0
      ? undefined
      : Number(Math.round(+`${(feed * 1000) / closingStock}e2`) + "e-2");

  return (
    <div className="grid grid-cols-2 gap-2 p-6">
      <Label htmlFor="fieldGivenFeed" required>
        {t("total given")}
      </Label>
      <div className="join">
        <NumberInput name="fieldGivenFeed" className="join-item w-full" step={0.01} />
        <span className="join-item inline-flex items-center bg-accent px-2 text-accent-content">
          kg
        </span>
      </div>
      {errors.fieldGivenFeed ? <ErrorMessage>{errors.fieldGivenFeed.message}</ErrorMessage> : null}

      <hr className="col-span-2 my-2 border-accent" />

      <Label>{t("closing stock")}</Label>
      <PreviewField className="input inline-flex items-center justify-end" value={closingStock} />

      <Label>{t("feed per bird")}</Label>
      <div className="join">
        <PreviewField
          className="input join-item inline-flex w-full items-center justify-end"
          value={feedPerBirds}
        />
        <span className="join-item inline-flex items-center bg-accent px-2 text-accent-content">
          g
        </span>
      </div>
    </div>
  );
}
