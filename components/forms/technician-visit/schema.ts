import { useTranslations } from "next-intl"
import { PropsWithChildren, createContext, useContext } from "react"
import { z } from "zod"

export function useTechnicianVisit() {
  const t = useTranslations("FarmChecklist")

  const scales = [
    z.literal(0).describe(t("bad")),
    z.literal(5).describe(t("okay")),
    z.literal(10).describe(t("good")),
  ] as const

  const presences = [
    z.literal("Yes").describe(t("Yes")),
    z.literal("No").describe(t("No")),
    z.literal("Possible").describe(t("Possible")),
  ] as const

  const diseases = [
    z.literal("mareks").describe(t("mareks")),
    z.literal("newcastle").describe(t("newcastle")),
    z.literal("bronchtitis").describe(t("bronchtitis")),
    z.literal("laryngotracheitis").describe(t("laryngotracheitis")),
    z.literal("fowl_pox").describe(t("fowl_pox")),
    z.literal("fowl_chlorea").describe(t("fowl_chlorea")),
  ] as const

  const vaccines = [
    z.literal("newcastle").describe(t("newcastle")),
    z.literal("bronchtitis").describe(t("bronchtitis")),
    z.literal("fowl_pox").describe(t("fowl_pox")),
    z.literal("fowl_chlorea").describe(t("fowl_chlorea")),
  ] as const

  const qualityScale = z.union(scales)
  const presence = z.union(presences)
  const disease = z.union(diseases)
  const vaccine = z.union(vaccines)

  function getQualityNames(value: z.infer<typeof qualityScale>) {
    return scales.find(z => z.value === value)?.description
  }

  function getPresence(value: z.infer<typeof presence>) {
    return presences.find(z => z.value === value)?.description
  }

  function getDiseaseName(value: z.infer<typeof disease>) {
    return diseases.find(z => z.value === value)?.description
  }

  function getVaccineName(value: z.infer<typeof vaccine>) {
    return vaccines.find(z => z.value === value)?.description
  }

  const farmQualitySchema = z.object({
    /** Checklist field: how clean the bedding is */
    fieldCleanBedding: qualityScale,

    /** Checklist field: how good the feed is */
    fieldFeedQuantity: qualityScale,

    /** Checklist field: whether chickens are getting enough light */
    fieldLightSufficiency: qualityScale,

    /** Checklist field: whether the chicken pens are well ventilated */
    fieldVentillation: qualityScale,

    /** Checklist field: how clean the water is */
    fieldWaterCleanliness: qualityScale
  })

  const farmDiseaseSchema = z.object({
    /** The likelihood of the presence of a disease */
    fieldDisease: presence,

    /** Common disease names */
    fieldDiseaseNames: z.array(disease),

    /** An other field in case disease is not among common options */
    fieldOtherpossibledisease: z.string().optional(),
  }).superRefine((data, ctx) => {
    const hasDisease = data.fieldDiseaseNames.length > 0 || data.fieldOtherpossibledisease
    if (data.fieldDisease === "No" && hasDisease) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("no diseases validation error"),
      })
    } else if (data.fieldDisease !== "No" && !hasDisease) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("diseases validation error"),
        path: ["fieldDiseaseNames"]
      })
    }
  })

  const farmVaccineSchema = z.object({
    /** Whether a vaccine was given or not */
    fieldVaccineGiven: z.boolean(),

    /** Common vaccines that were administered */
    fieldVaccinations: z.array(vaccine),

    /** List the name of a vaccine that is not among the previous options */
    fieldOtherVaccine: z.string().optional(),
  }).superRefine((data, ctx) => {
    const hasVaccines = data.fieldVaccinations.length > 0 || (data.fieldOtherVaccine?.length || 0) > 0
    console.log({ hasVaccine: data.fieldVaccineGiven, hasVaccines })
    if (data.fieldVaccineGiven && !hasVaccines) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("vaccines validation error"),
        path: ["fieldVaccinations"]
      })
    } else if (!data.fieldVaccinations && hasVaccines) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("no vaccines validation error")
      })
    }
  })

  const technicianCommentSchema = z.object({
    fieldVisitComments: z.string().optional(),
  })

  const technicianVisitFormSchema = farmQualitySchema
    .and(farmDiseaseSchema)
    .and(farmVaccineSchema)
    .and(technicianCommentSchema)

  return {
    scales,
    presences,
    diseases,
    vaccines,
    farmQualitySchema,
    farmDiseaseSchema,
    farmVaccineSchema,
    technicianCommentSchema,
    technicianVisitFormSchema,
    getQualityNames,
    getPresence,
    getDiseaseName,
    getVaccineName,
  }
}

export type TechnicianVisit = ReturnType<typeof useTechnicianVisit>
export type TechnicianVisitFormSchema = z.infer<TechnicianVisit["technicianVisitFormSchema"]>


