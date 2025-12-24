import { ReactNode } from "react";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import OfflinePage from "@/pages/OfflinePage";

interface OfflineGuardProps {
  children: ReactNode;
  requiresOnline?: boolean;
  fallback?: ReactNode;
}

/**
 * OfflineGuard - Wraps components that require an internet connection.
 * 
 * Usage:
 * <OfflineGuard requiresOnline>
 *   <AIFeatureComponent />
 * </OfflineGuard>
 * 
 * When offline and requiresOnline is true, shows the offline fallback page.
 * Otherwise, renders children normally.
 */
const OfflineGuard = ({ 
  children, 
  requiresOnline = false,
  fallback 
}: OfflineGuardProps) => {
  const { isOnline } = useOnlineStatus();

  // If online or feature doesn't require online, render children
  if (isOnline || !requiresOnline) {
    return <>{children}</>;
  }

  // Show custom fallback or default offline page
  return <>{fallback || <OfflinePage />}</>;
};

export default OfflineGuard;
