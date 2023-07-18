import { useTranslations } from "next-intl";
import { z } from "zod";

export const useFarmerJournalFormSchema = () => {
  const t = useTranslations("FarmerJournal");
  const required_error = t("required");

  const chickenStockSchema = z
    .object({
      fieldInitialstock: z.number({ required_error }),
      fieldMortality: z.number({ required_error }),
      fieldMortalityprolapse: z.number({ required_error }),
    })
    .refine(
      ({ fieldInitialstock, fieldMortality, fieldMortalityprolapse }) =>
        fieldInitialstock >= fieldMortality + fieldMortalityprolapse,
      {
        message: t("exceed dead chicken"),
        path: ["fieldInitialstock"],
      },
    );

  const eggProductionSchema = z
    .object({
      fieldSmallEggs: z.number({ required_error }),
      fieldMediumEggs: z.number({ required_error }),
      fieldLargeEggs: z.number({ required_error }),
      fieldDamagedEggs: z.number({ required_error }),
      fieldLayFrequency: z.number({ required_error }),
      fieldLayFrequencyIndustrySta: z.number({ required_error }),
    })
    .refine(
      ({ fieldSmallEggs, fieldMediumEggs, fieldLargeEggs, fieldDamagedEggs }) => {
        return fieldSmallEggs + fieldMediumEggs + fieldLargeEggs >= fieldDamagedEggs;
      },
      {
        message: t("exceed damaged eggs"),
        path: ["fieldDamagedEggs"],
      },
    );

  const chickenFeedSchema = z.object({
    fieldGivenFeed: z.number({ required_error }).step(0.01),
  });

  const commentSchema = z.object({
    fieldCommentdailycheck: z.string().optional(),
  });

  return {
    chickenStockSchema,
    eggProductionSchema,
    chickenFeedSchema,
    commentSchema,
    journalSchema: chickenStockSchema
      .and(eggProductionSchema)
      .and(chickenFeedSchema)
      .and(commentSchema),
  };
};

export type FarmerJournalSchema = z.infer<
  ReturnType<typeof useFarmerJournalFormSchema>["journalSchema"]
>;
