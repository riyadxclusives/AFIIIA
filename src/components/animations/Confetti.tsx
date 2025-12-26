import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
  trigger: boolean;
  particleCount?: number;
  duration?: number;
  colors?: string[];
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

const Confetti = ({ 
  trigger, 
  particleCount = 40, 
  duration = 3000,
  colors = [
    "hsl(var(--coral))",
    "hsl(var(--lavender))",
    "hsl(var(--teal))",
    "hsl(var(--primary))",
    "#FFD700",
  ],
  onComplete 
}: ConfettiProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, particleCount, duration, colors, onComplete, isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: `${particle.x}vw`,
                y: -20,
                rotate: 0,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                y: "110vh",
                rotate: particle.rotation + 720,
                opacity: [1, 1, 0],
                scale: [0, 1, 1, 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: duration / 1000,
                delay: particle.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: "absolute",
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Confetti;
