import { CaseType, serialize } from "jsonapi-fractal";
import FarmConfirmation from "./Confirmation";
import FarmQuality from "./FarmQuality";
import FarmRedFlag from "./FarmRedFlag";
import FarmVaccination from "./FarmVaccination";
import FarmNote from "./Note";
import { TechnicianVisitFormSchema } from "./schema";

export {
  FarmConfirmation,
  FarmNote,
  FarmQuality,
  FarmRedFlag,
  FarmVaccination
};

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