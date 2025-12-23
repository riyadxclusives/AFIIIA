import { motion } from "framer-motion";
import { Users, Trophy, Calendar, Clock, ChevronRight, Check, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Challenge {
  id: string;
  title: string;
  type: "hydration" | "workout" | "mood" | "walking" | "custom";
  duration: number;
  daysCompleted: number;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    checkedInToday: boolean;
    streak: number;
  }[];
  status: "active" | "upcoming" | "completed";
  startDate: string;
  endDate: string;
  myStreak: number;
  checkedInToday: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onCheckIn?: () => void;
  onViewDetails?: () => void;
  onJoin?: () => void;
}

const typeConfig = {
  hydration: { icon: "💧", color: "bg-teal-500/20 text-teal-600", label: "Hydration" },
  workout: { icon: "💪", color: "bg-coral/20 text-coral", label: "Workout" },
  mood: { icon: "🌸", color: "bg-lavender/20 text-lavender", label: "Mood Journal" },
  walking: { icon: "🚶‍♀️", color: "bg-accent/20 text-accent-foreground", label: "Walking" },
  custom: { icon: "✨", color: "bg-primary/20 text-primary", label: "Custom" },
};

const ChallengeCard = ({ challenge, onCheckIn, onViewDetails, onJoin }: ChallengeCardProps) => {
  const config = typeConfig[challenge.type];
  const progress = (challenge.daysCompleted / challenge.duration) * 100;
  const daysRemaining = challenge.duration - challenge.daysCompleted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-glow-lavender transition-all duration-300">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${config.color}`}>
                {config.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {config.label}
                  </Badge>
                  {challenge.status === "active" && (
                    <Badge className="bg-gradient-primary text-primary-foreground text-xs">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {challenge.myStreak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-coral/20 text-coral">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">{challenge.myStreak}</span>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                Day {challenge.daysCompleted}/{challenge.duration}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Participants */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div className="flex -space-x-2">
                {challenge.participants.slice(0, 4).map((participant) => (
                  <Avatar key={participant.id} className="w-8 h-8 border-2 border-background">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="text-xs bg-secondary">
                      {participant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {challenge.participants.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground">
                    +{challenge.participants.length - 4}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{daysRemaining} days left</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {challenge.status === "active" && !challenge.checkedInToday && onCheckIn && (
              <Button 
                onClick={onCheckIn}
                className="flex-1 bg-gradient-primary hover:opacity-90 touch-target"
              >
                <Check className="w-4 h-4 mr-2" />
                Check In
              </Button>
            )}
            {challenge.status === "active" && challenge.checkedInToday && (
              <Button 
                disabled
                variant="secondary"
                className="flex-1 touch-target"
              >
                <Check className="w-4 h-4 mr-2" />
                <span className="hidden xs:inline">Checked In </span>Today
              </Button>
            )}
            {challenge.status === "upcoming" && onJoin && (
              <Button 
                onClick={onJoin}
                className="flex-1 bg-gradient-primary hover:opacity-90 touch-target"
              >
                Join Challenge
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={onViewDetails}
              className="flex items-center gap-1 touch-target"
            >
              <Trophy className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChallengeCard;
