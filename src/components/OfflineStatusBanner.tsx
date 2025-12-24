import { useEffect, useState } from "react";
import { WifiOff, Wifi, X, CloudUpload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { hasPendingSync, getPendingSyncCount } from "@/utils/offlineStorage";

const OfflineStatusBanner = () => {
  const { isOnline, wasOffline, resetWasOffline } = useOnlineStatus();
  const [showBackOnline, setShowBackOnline] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Check for pending sync items
  useEffect(() => {
    const checkPending = () => {
      setPendingCount(getPendingSyncCount());
    };
    
    checkPending();
    const interval = setInterval(checkPending, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show "back online" message when reconnecting
  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowBackOnline(true);
      setDismissed(false);
      
      const timer = setTimeout(() => {
        setShowBackOnline(false);
        resetWasOffline();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline, resetWasOffline]);

  // Reset dismissed state when going offline
  useEffect(() => {
    if (!isOnline) {
      setDismissed(false);
    }
  }, [isOnline]);

  const handleDismiss = () => {
    setDismissed(true);
    if (showBackOnline) {
      setShowBackOnline(false);
      resetWasOffline();
    }
  };

  // Don't show anything if online and not showing back online message
  if (isOnline && !showBackOnline) return null;
  if (dismissed && !showBackOnline) return null;

  return (
    <AnimatePresence>
      {(!isOnline || showBackOnline) && !dismissed && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-[100] safe-area-top"
        >
          <div
            className={`px-4 py-3 flex items-center justify-between gap-3 ${
              isOnline
                ? "bg-primary text-primary-foreground"
                : "bg-destructive text-destructive-foreground"
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {isOnline ? (
                <>
                  <Wifi className="w-5 h-5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">You're back online!</p>
                    {hasPendingSync() && (
                      <p className="text-xs opacity-90 flex items-center gap-1">
                        <CloudUpload className="w-3 h-3" />
                        Syncing {pendingCount} item{pendingCount !== 1 ? 's' : ''}...
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">You're offline</p>
                    <p className="text-xs opacity-90">
                      Some features may be unavailable
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="shrink-0 h-8 w-8 hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineStatusBanner;
