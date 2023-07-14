import { FarmerJournal } from "@/types/content";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../ErrorMeesage";
import Label from "../Label";
import PreviewField from "../PreviewField";
import NumberInput from "./NumberInput";
import { FarmerJournalSchema } from "./schema";
import { useTranslations } from "next-intl";

export default function ChickenEggProduction() {
  const t = useTranslations("FarmerJournal")
  const { formState: { errors }, watch } = useFormContext<FarmerJournalSchema>();
  const [small, medium, large, damaged] = watch(["fieldSmallEggs", "fieldMediumEggs", "fieldLargeEggs", "fieldDamagedEggs"])
  const total = small + medium + large;
  const net = total >= damaged ? total - damaged : undefined;

  return <div className="p-6 grid grid-cols-2 gap-2">
    <Label<FarmerJournal> htmlFor="fieldSmallEggs" required>{t("small eggs")}</Label>
    <NumberInput name="fieldSmallEggs" />
    {errors.fieldSmallEggs ? <ErrorMessage className="col-span-2">{errors.fieldSmallEggs?.message}</ErrorMessage> : null}

    <Label<FarmerJournal> htmlFor="fieldMediumEggs" required>{t("medium eggs")}</Label>
    <NumberInput name="fieldMediumEggs" />
    {errors.fieldMediumEggs ? <ErrorMessage className="col-span-2">{errors.fieldMediumEggs.message}</ErrorMessage> : null}

    <Label<FarmerJournal> htmlFor="fieldLargeEggs" required>{t("large eggs")}</Label>
    <NumberInput name="fieldLargeEggs" />
    {errors.fieldLargeEggs ? <ErrorMessage className="col-span-2">{errors.fieldLargeEggs.message}</ErrorMessage> : null}

    <Label<FarmerJournal> htmlFor="fieldDamagedEggs" required>{t("damaged eggs")}</Label>
    <NumberInput name="fieldDamagedEggs" />
    {errors.fieldDamagedEggs ? <ErrorMessage className="col-span-2">{errors.fieldDamagedEggs.message}</ErrorMessage> : null}

    <Label>{t("total")}</Label>
    <PreviewField className="input inline-flex items-center justify-end" value={total} />

    <Label>{t("net total")}</Label>
    <PreviewField className="input inline-flex items-center justify-end" value={net} />

    <hr className="border-accent my-2 col-span-2" />

    <Label<FarmerJournal> htmlFor="fieldLayFrequency" required>{t("lay frequency")}</Label>
    <NumberInput name="fieldLayFrequency" />
    {errors.fieldLayFrequency ? <ErrorMessage className="col-span-2">{errors.fieldLayFrequency.message}</ErrorMessage> : null}


    <Label<FarmerJournal> htmlFor="fieldLayFrequencyIndustrySta" required>{t("lay frequency")} ({t("industry standard")})</Label>
    <NumberInput name="fieldLayFrequencyIndustrySta" />
    {errors.fieldLayFrequencyIndustrySta ? <ErrorMessage className="col-span-2">{errors.fieldLayFrequencyIndustrySta.message}</ErrorMessage> : null}

  </div>
}