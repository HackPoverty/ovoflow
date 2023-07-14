import { useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMeesage";
import Label from "../Label";
import PreviewField from "../PreviewField";
import NumberInput from "./NumberInput";
import { FarmerJournalSchema } from "./schema";
import { useTranslations } from "next-intl";

export default function ChickenFeeding() {
  const t = useTranslations("FarmerJournal")
  const { watch, formState: { errors } } = useFormContext<FarmerJournalSchema>();
  const [inital, mortality, proplapse, feed] = watch(["fieldInitialstock", "fieldMortality", "fieldMortalityprolapse", "fieldGivenFeed"])
  const closingStock = inital - mortality - proplapse;
  const feedPerBirds = closingStock <= 0 ? undefined :
    Number(Math.round(+`${feed * 1000 / closingStock}e2`) + "e-2")

  return <div className="p-6 grid grid-cols-2 gap-2">

    <Label htmlFor="fieldGivenFeed" required>{t("total given")}</Label>
    <div className="join">
      <NumberInput name="fieldGivenFeed" className="w-full join-item" step={0.01} />
      <span className="join-item px-2 inline-flex items-center bg-accent text-accent-content">kg</span>
    </div>
    {errors.fieldGivenFeed ? <ErrorMessage>{errors.fieldGivenFeed.message}</ErrorMessage> : null}

    <hr className="border-accent my-2 col-span-2" />

    <Label>{t("closing stock")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={closingStock} />

    <Label>{t("feed per bird")}</Label>
    <div className="join">
      <PreviewField className="w-full join-item input justify-end inline-flex items-center" value={feedPerBirds} />
      <span className="join-item px-2 inline-flex items-center bg-accent text-accent-content">g</span>
    </div>
  </div>
}
