export const JOURNAL_SYNC_TAG = "post-journal";
export const TECHNICAL_SYNC_TAG = "post-technical";

export async function registerBackground(tag: string) {
  navigator.serviceWorker.ready.then((registration) => {
    return registration.sync.register(tag);
  })
}