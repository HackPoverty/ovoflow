import { useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMeesage";
import Label from "../Label";
import PreviewField from "../PreviewField";
import NumberInput from "./NumberInput";
import { FarmerJournalSchema } from "./schema";
import { useTranslations } from "next-intl";

export default function ChickenStock() {
  const t = useTranslations("FarmerJournal")
  const { formState: { errors }, watch } = useFormContext<FarmerJournalSchema>();
  const [initial, mortality, mortalityProlapse] = watch(["fieldInitialstock", "fieldMortality", "fieldMortalityprolapse"]);
  const totalMortiality = mortality + mortalityProlapse;
  const closingStock = initial >= totalMortiality ? initial - totalMortiality : undefined;
  const percentage = (initial !== 0)
    ? Number(Math.round(+`${totalMortiality / initial}e2`) + "e-2")
    : undefined

  return <div className="grid grid-cols-2 gap-2 p-6">
    <Label<FarmerJournalSchema> htmlFor="fieldInitialstock" required>{t("initial stock")}</Label>
    <NumberInput name="fieldInitialstock" />
    {errors.fieldInitialstock ? <ErrorMessage className="col-span-2">{errors.fieldInitialstock.message}</ErrorMessage> : null}

    <Label<FarmerJournalSchema> htmlFor="fieldMortality" required>{t("mortality")}</Label>
    <NumberInput name="fieldMortality" />
    {errors.fieldMortality ? <ErrorMessage className="col-span-2">{errors.fieldMortality.message}</ErrorMessage> : null}

    <Label<FarmerJournalSchema> htmlFor="fieldMortalityprolapse" required>{t("mortality prolapse")}</Label>
    <NumberInput name="fieldMortalityprolapse" />
    {errors.fieldMortalityprolapse ? <ErrorMessage className="col-span-2">{errors.fieldMortalityprolapse.message}</ErrorMessage> : null}

    <hr className="col-span-2 border-accent items-center my-2" />

    <Label>{t("total mortality")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={totalMortiality} />

    <Label>{t("mortality percentage")}</Label>
    <div className="join">
      <PreviewField className="join-item w-full input justify-end inline-flex items-center" value={percentage} />
      <span className="join-item inline-flex items-center p-2 bg-accent text-accent-content">%</span>
    </div>

    <Label>{t("closing stock")}</Label>
    <PreviewField className="input justify-end inline-flex items-center" value={closingStock} />
  </div>
}