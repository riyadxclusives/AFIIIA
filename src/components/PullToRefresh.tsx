import { useState, useRef, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  className?: string;
}

const PULL_THRESHOLD = 80;
const MAX_PULL = 120;

const PullToRefresh = ({ children, onRefresh, className = "" }: PullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const haptic = useHapticFeedback();
  
  const pullDistance = useMotionValue(0);
  const controls = useAnimation();
  
  const spinnerOpacity = useTransform(pullDistance, [0, PULL_THRESHOLD / 2, PULL_THRESHOLD], [0, 0.5, 1]);
  const spinnerScale = useTransform(pullDistance, [0, PULL_THRESHOLD], [0.5, 1]);
  const spinnerRotation = useTransform(pullDistance, [0, MAX_PULL], [0, 180]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0 && !isRefreshing) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, [isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    if (diff > 0 && containerRef.current?.scrollTop === 0) {
      // Resistance effect - gets harder to pull as you go further
      const resistance = 0.5;
      const pull = Math.min(diff * resistance, MAX_PULL);
      pullDistance.set(pull);
      
      // Haptic feedback when crossing threshold
      if (pull >= PULL_THRESHOLD && pullDistance.getPrevious() < PULL_THRESHOLD) {
        haptic.medium();
      }
    }
  }, [isPulling, isRefreshing, pullDistance, haptic]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;
    
    const currentPull = pullDistance.get();
    
    if (currentPull >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      haptic.success();
      
      // Hold at threshold while refreshing
      await controls.start({ y: PULL_THRESHOLD / 2 });
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        await controls.start({ y: 0 });
        pullDistance.set(0);
      }
    } else {
      pullDistance.set(0);
    }
    
    setIsPulling(false);
  }, [isPulling, pullDistance, isRefreshing, onRefresh, controls, haptic]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-auto native-scroll ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
        style={{ 
          top: useTransform(pullDistance, [0, MAX_PULL], [-40, 40]),
          opacity: spinnerOpacity,
          scale: spinnerScale,
        }}
      >
        <motion.div 
          className={`w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center border border-border ${isRefreshing ? 'animate-spin' : ''}`}
          style={{ rotate: isRefreshing ? undefined : spinnerRotation }}
        >
          <RefreshCw className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
      
      {/* Content */}
      <motion.div
        animate={controls}
        style={{ 
          y: isRefreshing ? undefined : pullDistance,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
