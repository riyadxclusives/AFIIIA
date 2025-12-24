import { motion } from "framer-motion";
import { LucideIcon, Inbox, FileX, Search, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateType = "default" | "search" | "data" | "calendar" | "custom";

interface EmptyStateProps {
  type?: EmptyStateType;
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const typeConfig: Record<EmptyStateType, { icon: LucideIcon; title: string; description: string }> = {
  default: {
    icon: Inbox,
    title: "Nothing here yet",
    description: "Get started by adding some content.",
  },
  search: {
    icon: Search,
    title: "No results found",
    description: "Try adjusting your search or filters.",
  },
  data: {
    icon: FileX,
    title: "No data available",
    description: "There's nothing to display at the moment.",
  },
  calendar: {
    icon: Calendar,
    title: "No events scheduled",
    description: "Your calendar is clear for now.",
  },
  custom: {
    icon: Sparkles,
    title: "Nothing to show",
    description: "Check back later for updates.",
  },
};

const EmptyState = ({
  type = "default",
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => {
  const config = typeConfig[type];
  const Icon = icon || config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4"
      >
        <Icon className="w-8 h-8 text-muted-foreground" />
      </motion.div>

      <h3 className="font-medium text-lg text-foreground mb-2">
        {title || config.title}
      </h3>
      
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        {description || config.description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-gradient-primary hover:opacity-90">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
