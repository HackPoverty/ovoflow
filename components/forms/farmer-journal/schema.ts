import { z } from "zod";

export const chickenStockSchema = z.object({
  fieldInitialstock: z.number(),
  fieldMortality: z.number(),
  fieldMortalityprolapse: z.number(),
}).refine(({ fieldInitialstock, fieldMortality, fieldMortalityprolapse }) => fieldInitialstock >= fieldMortality + fieldMortalityprolapse, {
  message: "The total number of dead chickens should not execeed the initial number of chickens",
  path: ["fieldInitialstock"]
})

export const eggProductionSchema = z.object({
  fieldSmallEggs: z.number(),
  fieldMediumEggs: z.number(),
  fieldLargeEggs: z.number(),
  fieldDamagedEggs: z.number(),
  fieldLayFrequency: z.number(),
  fieldLayFrequencyIndustrySta: z.number(),
}).refine(({ fieldSmallEggs, fieldMediumEggs, fieldLargeEggs, fieldDamagedEggs }) => {
  return fieldSmallEggs + fieldMediumEggs + fieldLargeEggs >= fieldDamagedEggs
}, {
  message: "The number of damaged eggs should not execeed the total number of eggs produced",
  path: ["fieldDamagedEggs"]
})

export const chickenFeedSchema = z.object({
  fieldGivenFeed: z.number().step(0.01)
})

export const commentSchema = z.object({
  fieldCommentdailycheck: z.string().optional(),
})

export const journalSchema = chickenStockSchema.and(eggProductionSchema).and(chickenFeedSchema).and(commentSchema)


export type FarmerJournalSchema = z.infer<typeof journalSchema>;