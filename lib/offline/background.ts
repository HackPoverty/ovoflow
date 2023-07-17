import { jsonApiPost } from "../axios";
import { processJournal, processTechnical } from "../process";
import { offlineDB } from "./db";

export async function submitOfflineJournals() {
  const data = await offlineDB.farmerJournal.toArray();
  await Promise.all(data.map(async (entry) => {
    await jsonApiPost("node/farmer_daily_journal", processJournal(entry.value))
    await offlineDB.farmerJournal.delete(entry.id!);
  }));
}

export async function submitOfflineTechnicals() {
  const data = await offlineDB.technicianVisit.toArray();
  await Promise.all(data.map(async (entry) => {
    await jsonApiPost("node/technician_visit", processTechnical(entry.value, entry.farmerId))
    await offlineDB.technicianVisit.delete(entry.id!);
  }))
}