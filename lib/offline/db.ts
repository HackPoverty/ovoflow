import { FarmerJournalSchema } from "@/components/forms/farmer-journal/schema";
import { TechnicianVisitFormSchema } from "@/components/forms/technician-visit/schema";
import Dexie, { Table } from "dexie";

export interface TechnicianVisitFormEntry {
  id?: number;
  value: TechnicianVisitFormSchema,
  farmerId: string
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
    this.version(1).stores({
      technicianVisit: '++id, value, farmerId',
      farmerJournal: '++id, value'
    });
  }
}

export const offlineDB = new OvoflowDexie();
