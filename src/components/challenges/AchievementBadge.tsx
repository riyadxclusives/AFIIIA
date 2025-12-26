import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Confetti from "@/components/animations/Confetti";
import useHapticFeedback from "@/hooks/useHapticFeedback";

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  showUnlockAnimation?: boolean;
}

const AchievementBadge = ({ 
  icon, 
  title, 
  description, 
  unlocked, 
  unlockedAt,
  showUnlockAnimation = false,
}: AchievementBadgeProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const haptic = useHapticFeedback();

  useEffect(() => {
    if (showUnlockAnimation && unlocked) {
      setIsAnimating(true);
      setShowConfetti(true);
      haptic.success();
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showUnlockAnimation, unlocked, haptic]);

  return (
    <>
      <Confetti 
        trigger={showConfetti} 
        particleCount={25} 
        duration={2000}
        onComplete={() => setShowConfetti(false)}
      />
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        animate={isAnimating ? {
          scale: [1, 1.2, 1],
          transition: { duration: 0.5 }
        } : {}}
        className={`relative flex flex-col items-center p-4 rounded-2xl border transition-all overflow-hidden ${
          unlocked 
            ? "bg-gradient-to-br from-coral/10 to-lavender/10 border-primary/30 shadow-glow-lavender" 
            : "bg-muted/30 border-border/30"
        } ${isAnimating ? "animate-celebration-glow" : ""}`}
      >
        {/* Shine effect on unlock */}
        {isAnimating && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-unlock-shine" />
          </div>
        )}
        
        <motion.div 
          animate={isAnimating ? {
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          } : {}}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 ${
            unlocked 
              ? "bg-gradient-primary shadow-lg" 
              : "bg-muted"
          }`}
        >
          {unlocked ? (
            <span>{icon}</span>
          ) : (
            <Lock className="w-6 h-6 text-muted-foreground" />
          )}
          {!unlocked && (
            <div className="absolute inset-0 rounded-full bg-muted/50" />
          )}
        </motion.div>
        
        <h4 className={`font-medium text-center text-sm ${
          unlocked ? "text-foreground" : "text-muted-foreground"
        }`}>
          {title}
        </h4>
        
        <p className="text-xs text-muted-foreground text-center mt-1">
          {description}
        </p>
        
        {unlocked && unlockedAt && (
          <span className="text-xs text-primary mt-2">
            Earned {unlockedAt}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default AchievementBadge;
