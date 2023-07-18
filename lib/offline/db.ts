import { FarmerJournalSchema } from "@/components/forms/farmer-journal/schema";
import { TechnicianVisitFormSchema } from "@/components/forms/technician-visit/schema";
import { Location } from "@/hooks/useGeolocation";
import Dexie, { Table } from "dexie";

export interface TechnicianVisitFormEntry {
  id?: number;
  value: TechnicianVisitFormSchema,
  farmerId: string,
  location?: Location
}

export interface FarmerJournalEntry {
  id?: number;
  value: FarmerJournalSchema,
}

const DATABASE_NAME = 'ovoflow-database'

export class OvoflowDexie extends Dexie {
  technicianVisit!: Table<TechnicianVisitFormEntry>
  farmerJournal!: Table<FarmerJournalEntry>

  constructor() {
    super(DATABASE_NAME);
    this.version(2).stores({
      technicianVisit: '++id, value, farmerId, location',
      farmerJournal: '++id, value'
    });
  }
}

export const offlineDB = new OvoflowDexie();
