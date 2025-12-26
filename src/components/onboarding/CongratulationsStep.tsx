import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";
import { motion } from "framer-motion";
import Confetti from "@/components/animations/Confetti";
import useHapticFeedback from "@/hooks/useHapticFeedback";

interface CongratulationsStepProps {
  data: OnboardingData;
  onContinue: () => void;
}

const CongratulationsStep = ({ data, onContinue }: CongratulationsStepProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const haptic = useHapticFeedback();
  const benefits = [
    "Personalized meal plans based on your cycle",
    "Phase-optimized workout recommendations",
    "AI-powered daily insights",
    "Mood tracking & pattern detection",
    "Hydration & habit streaks",
  ];

  useEffect(() => {
    // Trigger confetti and haptic on mount
    const timer = setTimeout(() => {
      setShowConfetti(true);
      haptic.success();
    }, 300);
    return () => clearTimeout(timer);
  }, [haptic]);

  return (
    <Card className="glass-card overflow-hidden relative">
      <Confetti trigger={showConfetti} particleCount={50} duration={4000} />
      
      <CardContent className="p-8 text-center">
        {/* Animated confetti/sparkles */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-lavender animate-celebration-glow"
        >
          <Sparkles className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl font-semibold mb-3"
        >
          Welcome, {data.firstName}! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8"
        >
          Your personalized wellness profile is ready. Here's what's waiting for you:
        </motion.p>

        {/* Benefits list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 text-left max-w-sm mx-auto mb-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
            >
              <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Health mode badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-soft/50 border border-lavender/30 mb-8"
        >
          <span className="text-sm">
            Mode: <span className="font-semibold text-lavender">
              {data.healthMode === "normal_cycle" && "Normal Cycle"}
              {data.healthMode === "fertility" && "Fertility Focus"}
              {data.healthMode === "pregnant" && "Pregnancy"}
            </span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            variant="hero"
            size="xl"
            className="w-full max-w-sm group"
            onClick={onContinue}
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default CongratulationsStep;
