// Offline storage service for PWA data persistence and sync

export interface OfflineDataItem {
  id: string;
  type: string;
  data: unknown;
  timestamp: number;
  synced: boolean;
}

const OFFLINE_STORAGE_KEY = 'afiiia_offline_data';
const PENDING_SYNC_KEY = 'afiiia_pending_sync';

// Get all offline data
export const getOfflineData = (): OfflineDataItem[] => {
  try {
    const stored = localStorage.getItem(OFFLINE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading offline data:', error);
    return [];
  }
};

// Save data offline
export const saveOfflineData = (type: string, data: unknown): string => {
  const id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const item: OfflineDataItem = {
    id,
    type,
    data,
    timestamp: Date.now(),
    synced: false,
  };

  const existing = getOfflineData();
  existing.push(item);
  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(existing));
  
  // Also add to pending sync queue
  addToPendingSync(item);
  
  return id;
};

// Get pending sync items
export const getPendingSync = (): OfflineDataItem[] => {
  try {
    const stored = localStorage.getItem(PENDING_SYNC_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading pending sync data:', error);
    return [];
  }
};

// Add item to pending sync queue
const addToPendingSync = (item: OfflineDataItem): void => {
  const pending = getPendingSync();
  pending.push(item);
  localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
};

// Mark item as synced
export const markAsSynced = (id: string): void => {
  // Remove from pending sync
  const pending = getPendingSync().filter((item) => item.id !== id);
  localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
  
  // Update main storage
  const allData = getOfflineData().map((item) =>
    item.id === id ? { ...item, synced: true } : item
  );
  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(allData));
};

// Clear synced data (cleanup)
export const clearSyncedData = (): void => {
  const allData = getOfflineData().filter((item) => !item.synced);
  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(allData));
};

// Sync handler - call this when coming back online
export const syncOfflineData = async (
  syncFn: (item: OfflineDataItem) => Promise<boolean>
): Promise<{ success: number; failed: number }> => {
  const pending = getPendingSync();
  let success = 0;
  let failed = 0;

  for (const item of pending) {
    try {
      const result = await syncFn(item);
      if (result) {
        markAsSynced(item.id);
        success++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`Failed to sync item ${item.id}:`, error);
      failed++;
    }
  }

  // Cleanup synced data
  if (success > 0) {
    clearSyncedData();
  }

  return { success, failed };
};

// Get offline data by type
export const getOfflineDataByType = (type: string): OfflineDataItem[] => {
  return getOfflineData().filter((item) => item.type === type);
};

// Delete offline data item
export const deleteOfflineData = (id: string): void => {
  const allData = getOfflineData().filter((item) => item.id !== id);
  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(allData));
  
  const pending = getPendingSync().filter((item) => item.id !== id);
  localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(pending));
};

// Check if there's pending data to sync
export const hasPendingSync = (): boolean => {
  return getPendingSync().length > 0;
};

// Get count of pending items
export const getPendingSyncCount = (): number => {
  return getPendingSync().length;
};
