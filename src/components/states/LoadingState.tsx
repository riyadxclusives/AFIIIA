import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
}

const LoadingState = ({ 
  message = "Loading...", 
  size = "md",
  className,
  fullScreen = false
}: LoadingStateProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const containerClasses = fullScreen 
    ? "min-h-screen flex items-center justify-center bg-background"
    : "flex flex-col items-center justify-center py-12";

  return (
    <div className={cn(containerClasses, className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className={cn(sizeClasses[size], "text-primary")} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "absolute inset-0 rounded-full border-2 border-primary/20",
              size === "sm" && "-inset-1",
              size === "md" && "-inset-2",
              size === "lg" && "-inset-3"
            )}
          />
        </div>
        {message && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default LoadingState;
