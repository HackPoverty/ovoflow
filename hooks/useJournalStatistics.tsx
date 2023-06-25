import { FarmerJournal } from "@/types/content";
import { useFormContext } from "react-hook-form";

export default function useJournalStatistics() {
  const { watch } = useFormContext<FarmerJournal>();
  const [initialStock, mortiality, proplapse, totalFeed] = watch(["fieldInitialstock", "fieldMortality", "fieldMortalityProlapse_", "fieldGivenFeed"])

  const totalMortality = (valid(mortiality! + proplapse!)) ? mortiality! + proplapse! : undefined;
  const mortalityPercentage = (totalMortality !== undefined && initialStock) ? totalMortality / initialStock * 100 : undefined;
  const closingStock = (totalMortality !== undefined && valid(initialStock)) ? Math.max(initialStock! - totalMortality, 0) : undefined;
  const feedPerBirdInGrams = (closingStock !== undefined && valid(totalFeed) && closingStock !== 0) ? totalFeed! / closingStock * 1000 : undefined;

  return {
    totalMortality,
    mortalityPercentage,
    closingStock,
    feedPerBirdInGrams
  }
}

const valid = (value?: number) => value !== undefined && !Number.isNaN(value)