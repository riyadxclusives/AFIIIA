import { WifiOff, RefreshCw, CloudOff, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const OfflinePage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8 px-6">
            {/* Offline Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="relative mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <WifiOff className="w-12 h-12 text-muted-foreground" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                />
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              You're Offline
            </h1>
            
            {/* Description */}
            <p className="text-muted-foreground mb-6">
              It looks like you've lost your internet connection. Some features require an active connection to work.
            </p>

            {/* Available Offline Section */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                Available Offline
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  View cached pages and content
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Track mood and symptoms locally
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  View your cycle calendar
                </li>
              </ul>
            </div>

            {/* Not Available Section */}
            <div className="bg-destructive/10 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <CloudOff className="w-4 h-4 text-destructive" />
                Requires Internet
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                  AI wellness recommendations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                  Syncing data to cloud
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                  Buddy challenges & leaderboard
                </li>
              </ul>
            </div>

            {/* Retry Button */}
            <Button 
              onClick={handleRetry}
              className="w-full gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>

            {/* Hint */}
            <p className="text-xs text-muted-foreground mt-4">
              Your offline data will automatically sync when you're back online.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OfflinePage;
