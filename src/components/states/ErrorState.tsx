import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorType = "default" | "network" | "server" | "permission" | "notFound";

interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  fullScreen?: boolean;
}

const typeConfig: Record<ErrorType, { icon: typeof AlertTriangle; title: string; description: string; color: string }> = {
  default: {
    icon: AlertTriangle,
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again.",
    color: "text-destructive",
  },
  network: {
    icon: WifiOff,
    title: "Connection error",
    description: "Unable to connect. Please check your internet connection.",
    color: "text-destructive",
  },
  server: {
    icon: ServerCrash,
    title: "Server error",
    description: "Our servers are having trouble. Please try again later.",
    color: "text-orange-500",
  },
  permission: {
    icon: Ban,
    title: "Access denied",
    description: "You don't have permission to access this resource.",
    color: "text-destructive",
  },
  notFound: {
    icon: AlertTriangle,
    title: "Not found",
    description: "The resource you're looking for doesn't exist.",
    color: "text-muted-foreground",
  },
};

const ErrorState = ({
  type = "default",
  title,
  description,
  onRetry,
  retryLabel = "Try Again",
  className,
  fullScreen = false,
}: ErrorStateProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  const containerClasses = fullScreen
    ? "min-h-screen flex items-center justify-center bg-background p-4"
    : "flex flex-col items-center justify-center py-12 px-4";

  return (
    <div className={cn(containerClasses, className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center max-w-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4"
        >
          <Icon className={cn("w-10 h-10", config.color)} />
        </motion.div>

        <h3 className="font-medium text-xl text-foreground mb-2">
          {title || config.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-6">
          {description || config.description}
        </p>

        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {retryLabel}
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorState;
