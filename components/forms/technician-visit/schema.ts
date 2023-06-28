import { z } from "zod"

export const QUALITY_SCALES = [0, 5, 10] as const

export const qualityScale = z.union([
  z.literal(0),
  z.literal(5),
  z.literal(10),
])

export type Quality = (typeof QUALITY_SCALES)[number]

export const QUALITY_NAMES: Record<Quality, string> = {
  0: "Bad",
  5: "Okay",
  10: "Good",
}

export const getQualityName = (score: Quality) => {
  if (score === 0) return "Bad"
  if (score === 5) return "Okay"
  return "Good"
}

export const farmQualitySchema = z.object({
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

export const diseaseChoices = z.union([
  z.literal("mareks"),
  z.literal("newcastle"),
  z.literal("bronchtitis"),
  z.literal("laryngotracheitis"),
  z.literal("fowl_pox"),
  z.literal("fowl_chlorea"),
])

export type Disease = z.infer<typeof diseaseChoices>

export const DISEASES: Record<Disease, string> = {
  mareks: "Marek's Disease",
  newcastle: "New Castle Disease",
  bronchtitis: "Bronchtitis",
  laryngotracheitis: "Laryngotracheitis",
  fowl_pox: "Fowl Pox",
  fowl_chlorea: "Fowl Cholera",
}

export const getDiseaseName = (key: Disease) => DISEASES[key]

export const PRESENCE_OPTIONS = ["Yes", "No", "Possible"] as const

export const farmDiseaseSchema = z.object({
  /** The likelihood of the presence of a disease */
  fieldDisease: z.union([z.literal("Yes"), z.literal("No"), z.literal("Possible")]),

  /** Common disease names */
  fieldDiseaseNames: z.array(diseaseChoices),

  /** An other field in case disease is not among common options */
  fieldOtherpossibledisease: z.string().optional(),
})

export const vaccineChoices = z.union([
  z.literal("newcastle"),
  z.literal("bronchtitis"),
  z.literal("fowl_pox"),
  z.literal("fowl_chlorea"),
])

export type Vaccine = z.infer<typeof vaccineChoices>

export const VACCINES: Record<Vaccine, string> = {
  newcastle: "New Castle Disease",
  bronchtitis: "Bronchtitis",
  fowl_pox: "Fowl Pox",
  fowl_chlorea: "Fowl Cholera",
}

export const getVaccineName = (key: Vaccine) => VACCINES[key]

export const farmVaccineSchema = z.object({
  /** Whether a vaccine was given or not */
  fieldVaccineGiven: z.boolean(),

  /** Common vaccines that were administered */
  fieldVaccinations: z.array(vaccineChoices),

  /** List the name of a vaccine that is not among the previous options */
  fieldOtherVaccine: z.string().optional(),
})

export const technicianCommentSchema = z.object({
  fieldVisitComments: z.string().optional(),
})

export const technicianVisitSchema = farmQualitySchema.and(farmDiseaseSchema).and(farmVaccineSchema).and(technicianCommentSchema)

export type TechnicianVisitSchema = z.infer<typeof technicianVisitSchema>
