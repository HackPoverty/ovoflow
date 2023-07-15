import { jsonApiPost } from "../axios";
import { processJournal, processTechnical } from "../process";
import { offlineDB } from "./db";

export async function submitOfflineJournals() {
  const data = await offlineDB.farmerJournal.toArray();
  for (const entry of data) {
    console.log("post journal", entry.id);
    await jsonApiPost("node/farmer_daily_journal", processJournal(entry.value))
    await offlineDB.farmerJournal.delete(entry.id!);
  }
}

export async function submitOfflineTechnicals() {
  const data = await offlineDB.technicianVisit.toArray();
  for (const entry of data) {
    console.log("post technician visit", entry.id);
    await jsonApiPost("node/technician_visit", processTechnical(entry.value, entry.farmerId))
    await offlineDB.technicianVisit.delete(entry.id!);
  }
}