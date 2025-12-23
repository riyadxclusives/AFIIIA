import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

const AchievementBadge = ({ icon, title, description, unlocked, unlockedAt }: AchievementBadgeProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative flex flex-col items-center p-4 rounded-2xl border transition-all ${
        unlocked 
          ? "bg-gradient-to-br from-coral/10 to-lavender/10 border-primary/30 shadow-glow-lavender" 
          : "bg-muted/30 border-border/30"
      }`}
    >
      <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 ${
        unlocked 
          ? "bg-gradient-primary shadow-lg" 
          : "bg-muted"
      }`}>
        {unlocked ? (
          <span>{icon}</span>
        ) : (
          <Lock className="w-6 h-6 text-muted-foreground" />
        )}
        {!unlocked && (
          <div className="absolute inset-0 rounded-full bg-muted/50" />
        )}
      </div>
      
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
  );
};

export default AchievementBadge;
