import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen = ({ onComplete, duration = 2500 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    // Check if splash was already shown this session
    const hasShown = sessionStorage.getItem("splash-shown");
    if (hasShown) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Animation sequence
    const logoTimer = setTimeout(() => setAnimationPhase("text"), 600);
    const exitTimer = setTimeout(() => setAnimationPhase("exit"), duration - 500);
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("splash-shown", "true");
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-hero"
        >
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-coral/30 blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-lavender/30 blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal/20 blur-3xl"
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 0.8 
            }}
            className="relative z-10"
          >
            <motion.div
              animate={animationPhase === "exit" ? { scale: 0.9, opacity: 0 } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="absolute inset-0 rounded-3xl bg-gradient-primary blur-2xl scale-150"
                />
                
                {/* Logo image */}
                <motion.img
                  src={logo}
                  alt="AFIIIA"
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-elevated"
                  initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(0,0,0,0)",
                      "0 0 60px rgba(180, 130, 200, 0.4)",
                      "0 0 30px rgba(180, 130, 200, 0.2)"
                    ]
                  }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase !== "logo" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 relative z-10"
          >
            <motion.h1 
              className="font-serif text-4xl sm:text-5xl font-bold text-gradient"
              animate={animationPhase === "exit" ? { opacity: 0, y: -10 } : {}}
              transition={{ duration: 0.3 }}
            >
              AFIIIA
            </motion.h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={animationPhase === "text" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-muted-foreground text-sm sm:text-base relative z-10"
          >
            Your wellness companion
          </motion.p>

          {/* Loading indicator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={animationPhase === "text" ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8 relative z-10"
          >
            <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full bg-gradient-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
