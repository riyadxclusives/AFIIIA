import { useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHapticFeedback } from "./useHapticFeedback";

interface SwipeConfig {
  routes: string[];
  threshold?: number;
  velocityThreshold?: number;
}

export const useSwipeNavigation = ({ 
  routes, 
  threshold = 50,
  velocityThreshold = 0.3 
}: SwipeConfig) => {
  const navigate = useNavigate();
  const location = useLocation();
  const haptic = useHapticFeedback();
  
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEnd = useRef<{ x: number; time: number } | null>(null);

  const currentIndex = routes.indexOf(location.pathname);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
      time: Date.now()
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      time: Date.now()
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;
    
    const distanceX = touchStart.current.x - touchEnd.current.x;
    const timeElapsed = touchEnd.current.time - touchStart.current.time;
    const velocity = Math.abs(distanceX) / timeElapsed;
    
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isFastEnough = velocity > velocityThreshold;
    
    if (currentIndex === -1) return;

    if (isLeftSwipe && (Math.abs(distanceX) > threshold * 2 || isFastEnough)) {
      // Swipe left = go to next tab
      const nextIndex = currentIndex + 1;
      if (nextIndex < routes.length) {
        haptic.light();
        navigate(routes[nextIndex]);
      }
    } else if (isRightSwipe && (Math.abs(distanceX) > threshold * 2 || isFastEnough)) {
      // Swipe right = go to previous tab
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        haptic.light();
        navigate(routes[prevIndex]);
      }
    }
    
    touchStart.current = null;
    touchEnd.current = null;
  }, [currentIndex, routes, navigate, haptic, threshold, velocityThreshold]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    currentIndex,
    canSwipeLeft: currentIndex < routes.length - 1,
    canSwipeRight: currentIndex > 0,
  };
};

export default useSwipeNavigation;
