import { useEffect, useCallback, useState } from 'react';
import { toast } from 'sonner';
import useOnlineStatus from './useOnlineStatus';
import {
  syncOfflineData,
  hasPendingSync,
  getPendingSyncCount,
  OfflineDataItem,
} from '@/utils/offlineStorage';

interface SyncResult {
  success: number;
  failed: number;
}

interface UseOfflineSyncOptions {
  // Function to sync a single item - implement based on your API
  syncHandler?: (item: OfflineDataItem) => Promise<boolean>;
  // Whether to auto-sync when coming back online
  autoSync?: boolean;
  // Show toast notifications for sync status
  showNotifications?: boolean;
}

export const useOfflineSync = (options: UseOfflineSyncOptions = {}) => {
  const { 
    syncHandler, 
    autoSync = true, 
    showNotifications = true 
  } = options;
  
  const { isOnline, wasOffline } = useOnlineStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<SyncResult | null>(null);

  // Default sync handler (just marks as synced - replace with actual API calls)
  const defaultSyncHandler = useCallback(async (item: OfflineDataItem): Promise<boolean> => {
    // Simulate API call
    console.log('Syncing item:', item);
    
    // In a real implementation, you would:
    // 1. Send the data to your API
    // 2. Return true if successful, false if failed
    
    // For now, just simulate success after a short delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }, []);

  // Perform sync operation
  const performSync = useCallback(async () => {
    if (!hasPendingSync()) {
      return { success: 0, failed: 0 };
    }

    setIsSyncing(true);
    
    const handler = syncHandler || defaultSyncHandler;
    
    try {
      const result = await syncOfflineData(handler);
      setLastSyncResult(result);
      
      if (showNotifications) {
        if (result.success > 0 && result.failed === 0) {
          toast.success(`Synced ${result.success} item${result.success !== 1 ? 's' : ''} successfully`);
        } else if (result.failed > 0) {
          toast.warning(`Synced ${result.success} items, ${result.failed} failed`);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Sync failed:', error);
      if (showNotifications) {
        toast.error('Failed to sync offline data');
      }
      return { success: 0, failed: getPendingSyncCount() };
    } finally {
      setIsSyncing(false);
    }
  }, [syncHandler, defaultSyncHandler, showNotifications]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (autoSync && isOnline && wasOffline && hasPendingSync()) {
      // Small delay to ensure network is stable
      const timer = setTimeout(() => {
        performSync();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline, autoSync, performSync]);

  return {
    isOnline,
    isSyncing,
    hasPendingData: hasPendingSync(),
    pendingCount: getPendingSyncCount(),
    lastSyncResult,
    performSync,
  };
};

export default useOfflineSync;
