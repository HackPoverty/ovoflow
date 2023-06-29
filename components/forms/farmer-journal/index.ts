import { FarmerJournal } from "@/types/content";
import { CaseType, serialize } from "jsonapi-fractal";
import ChickenEggProduction from "./ChickenEggProduction";
import ChickenFeeding from "./ChickenFeeding";
import ChickenStock from "./ChickenStock";
import JournalConfirmation from "./Confirmation";
import JournalNote from "./Note";
import { FarmerJournalSchema } from "./schema";

export {
  ChickenEggProduction,
  ChickenFeeding,
  ChickenStock,
  JournalConfirmation,
  JournalNote
};

type SerializedType = FarmerJournal & {
  title: string,
}

export const processFormData = (data: FarmerJournalSchema) => {
  const fieldTotalmortality = data.fieldMortality + data.fieldMortalityprolapse;
  const totalEggs = data.fieldSmallEggs = data.fieldMediumEggs + data.fieldLargeEggs;
  const now = new Date();
  const title = `Daily journal ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  const payload = {
    ...data,
    title,
    fieldTotalmortality,
    fieldClosingStock: data.fieldInitialstock - fieldTotalmortality,
    fieldMortalityPercentage_: data.fieldInitialstock ? fieldTotalmortality / data.fieldInitialstock * 100 : undefined,
    fieldProducedEggs: totalEggs - data.fieldDamagedEggs,
    // FIXME: trailing underscores get ignored by the serializer
    // fieldDamagedEggsPercentage__: totalEggs ? data.fieldDamagedEggs / totalEggs * 100 : undefined,
    fieldGramsPerBird: data.fieldInitialstock ? data.fieldGivenFeed / data.fieldInitialstock : undefined,
  } satisfies SerializedType

  return serialize(payload, "node--farmer_daily_journal", {
    changeCase: CaseType.snakeCase
  })
}
