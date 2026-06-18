const DB_NAME = 'denty_images';
const STORE = 'images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function storeImage(dataUrl: string): Promise<string> {
  const key = `img_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(dataUrl, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  return `idb://${key}`;
}

export async function getImage(ref: string): Promise<string> {
  if (!ref.startsWith('idb://')) return ref;
  const key = ref.slice(6);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result ?? '');
    req.onerror = () => reject(req.error);
  });
}

export async function deleteImage(ref: string): Promise<void> {
  if (!ref.startsWith('idb://')) return;
  const key = ref.slice(6);
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function isIdbRef(src: string) {
  return typeof src === 'string' && src.startsWith('idb://');
}
