import { FarmerJournalSchema } from "@/components/forms/farmer-journal/schema";
import { TechnicianVisitFormSchema } from "@/components/forms/technician-visit/schema";

/**
 * Geoinformation for a Drupal Geofield
 */
export type GPSCoordinates = {
  value: string;
  geoType: string;

  /** The Latitude */
  lat: number;

  /** The Longitude */
  lon: number;

  left: number;
  top: number;
  right: number;
  bottom: number;
  geohash: string;
  latlon: string;
};

/**
 * The `node--technician_visit` type
 */
export type TechnicianVisit = TechnicianVisitFormSchema & {
  /** GPS coordinates of where the visit was taken */
  fieldGpsCoordinates?: GPSCoordinates;
};

export type FarmerJournal = FarmerJournalSchema & {
  /** The number of chickens that are alive */
  fieldClosingStock?: number;

  /** The percentage of eggs that are damaged */
  fieldDamagedEggsPercentage__?: number;

  /** The total number of eggs produced */
  fieldProducedEggs?: number;

  /** The amoung of feed given to the birds (in "bags")
   * FIXME: this should be in kgs later on
   */
  fieldGramsPerBird?: number;

  /** The industry standard of grams per bird. A relatively static variable */
  fieldGramPerBirdIndustrySta?: number;

  fieldHoursOfLight?: number;
  fieldMortalityPercentage_?: number;
  fieldTotalmortality?: number;
  fieldWeightOfBird?: number;
};
