import { FarmerJournalSchema } from "@/components/forms/farmer-journal/schema";
import { TechnicianVisitFormSchema } from "@/components/forms/technician-visit/schema";
import { FarmerJournal } from "@/types/content";
import { CaseType, serialize } from "jsonapi-fractal";

type FarmerJournalSerializedType = FarmerJournal & {
  title: string,
}

export const processJournal = (data: FarmerJournalSchema) => {
  const fieldTotalmortality = data.fieldMortality + data.fieldMortalityprolapse;
  const totalEggs = data.fieldSmallEggs = data.fieldMediumEggs + data.fieldLargeEggs;
  const now = new Date();
  const title = `Daily journal ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  const payload: FarmerJournalSerializedType = {
    ...data,
    title,
    fieldTotalmortality,
    fieldClosingStock: data.fieldInitialstock - fieldTotalmortality,
    fieldMortalityPercentage_: data.fieldInitialstock ? fieldTotalmortality / data.fieldInitialstock * 100 : undefined,
    fieldProducedEggs: totalEggs - data.fieldDamagedEggs,
    // FIXME: trailing underscores get ignored by the serializer
    // fieldDamagedEggsPercentage__: totalEggs ? data.fieldDamagedEggs / totalEggs * 100 : undefined,
    fieldGramsPerBird: data.fieldInitialstock ? data.fieldGivenFeed / data.fieldInitialstock : undefined,
  }

  return serialize(payload, "node--farmer_daily_journal", {
    changeCase: CaseType.snakeCase
  })
}

export const processTechnical = (visit: TechnicianVisitFormSchema, farmerId: string) => {
  const postdata = {
    ...visit,
    // TODO: Remove this?
    title: "Technician Journal",
    fieldForFarmer: {
      id: farmerId,
    },
  }

  return serialize<typeof postdata>(postdata, "node--technician_visit", {
    changeCase: CaseType.snakeCase,
    relationships: {
      fieldForFarmer: "user--user",
    },
  })
}