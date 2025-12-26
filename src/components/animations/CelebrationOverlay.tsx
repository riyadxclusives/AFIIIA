import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Confetti from "./Confetti";
import useHapticFeedback from "@/hooks/useHapticFeedback";

interface CelebrationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  emoji?: string;
  autoDismissMs?: number;
}

const CelebrationOverlay = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  emoji = "🎉",
  autoDismissMs = 4000,
}: CelebrationOverlayProps) => {
  const haptic = useHapticFeedback();

  useEffect(() => {
    if (isOpen) {
      haptic.success();
      
      if (autoDismissMs > 0) {
        const timer = setTimeout(onClose, autoDismissMs);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, autoDismissMs, onClose, haptic]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti trigger={isOpen} particleCount={50} duration={3500} />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }
              }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 text-center max-w-sm mx-auto"
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Icon/Emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }
                }}
                className="relative mb-6"
              >
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-lavender animate-celebration-glow">
                  {icon || (
                    <span className="text-5xl">{emoji}</span>
                  )}
                </div>
                
                {/* Sparkle effects */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3 + i * 0.15,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute w-3 h-3 rounded-full bg-primary"
                    style={{
                      top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 50}%`,
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 60}%`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2"
              >
                {title}
              </motion.h2>

              {/* Subtitle */}
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground"
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Tap to dismiss hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                className="text-xs text-muted-foreground mt-6"
              >
                Tap anywhere to continue
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CelebrationOverlay;
