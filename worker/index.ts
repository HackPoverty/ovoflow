/// <reference lib="webworker" />

import { JOURNAL_SYNC_TAG, TECHNICAL_SYNC_TAG } from "../lib/offline/background";
import { offlineDB } from "../lib/offline/db";

interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string): Promise<void>;
}

declare global {
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly lastChance: boolean;
    readonly tag: string;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
  }
}

self.addEventListener("sync", async (event) => {
  const tag = (event as SyncEvent).tag;
  console.log("event", tag);
  if (tag === JOURNAL_SYNC_TAG) {
    const data = await offlineDB.farmerJournal.toArray();
    const journals = data.map((entry) => entry.value);
    console.log("journals", journals);
    return
  }
  if (tag === TECHNICAL_SYNC_TAG) {
    const data = await offlineDB.technicianVisit.toArray();
    const visits = data.map((entry) => entry.value);
    console.log("visits", visits);
  }
});
