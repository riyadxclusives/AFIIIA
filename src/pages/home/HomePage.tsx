import { useEffect, useState } from "react";
import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Dumbbell, 
  Utensils, 
  Heart, 
  Droplets, 
  Sparkles,
  ChevronRight,
  Flame
} from "lucide-react";
import { Link } from "react-router-dom";
import CelebrationOverlay from "@/components/animations/CelebrationOverlay";
import useHapticFeedback from "@/hooks/useHapticFeedback";

const dashboardCards = [
  {
    title: "Today's Meal",
    description: "Get personalized recipes",
    icon: Utensils,
    link: "/home/meal",
    color: "teal",
    gradient: "from-teal-soft to-teal",
  },
  {
    title: "Workout",
    description: "Phase-optimized training",
    icon: Dumbbell,
    link: "/home/workout",
    color: "coral",
    gradient: "from-coral-soft to-coral",
  },
  {
    title: "Cycle Status",
    description: "Day 14 • Ovulation Phase",
    icon: Calendar,
    link: "/home/cycle",
    color: "lavender",
    gradient: "from-lavender-soft to-lavender",
  },
  {
    title: "Mood Check-in",
    description: "How are you feeling?",
    icon: Heart,
    link: "/home/mood",
    color: "coral",
    gradient: "from-coral-soft to-coral",
  },
];

// Streak milestones to celebrate
const STREAK_MILESTONES = [7, 14, 30, 60, 90, 100];

const HomePage = () => {
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState(0);
  const haptic = useHapticFeedback();
  
  // Mock streak value - in real app this would come from state/API
  const currentStreak = 12;

  useEffect(() => {
    // Check if we should celebrate a milestone
    const lastCelebrated = localStorage.getItem("last_streak_milestone");
    const lastMilestone = lastCelebrated ? parseInt(lastCelebrated, 10) : 0;

    // Find the highest milestone the user has reached but not celebrated
    const unCelebratedMilestone = STREAK_MILESTONES.find(
      (milestone) => currentStreak >= milestone && milestone > lastMilestone
    );

    if (unCelebratedMilestone) {
      setCelebrationMilestone(unCelebratedMilestone);
      setShowStreakCelebration(true);
      haptic.success();
      localStorage.setItem("last_streak_milestone", unCelebratedMilestone.toString());
    }
  }, [currentStreak, haptic]);

  return (
    <AppLayout>
      <CelebrationOverlay
        isOpen={showStreakCelebration}
        onClose={() => setShowStreakCelebration(false)}
        title={`${celebrationMilestone} Day Streak!`}
        subtitle="You're on fire! Keep up the amazing work!"
        emoji="🔥"
      />
      <div className="space-y-4 sm:space-y-6">
        {/* Greeting */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold mb-0.5">
            Good morning, Sarah ✨
          </h1>
          <p className="text-muted-foreground text-sm">
            Here's your wellness snapshot for today
          </p>
        </div>

        {/* AI Daily Insight */}
        <Card 
          variant="glass"
          className="bg-gradient-primary text-primary-foreground border-none overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-4 sm:p-5 relative">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">Your Daily Insight</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/90 leading-relaxed">
                  You're in your ovulation phase — energy is at its peak! Perfect time for 
                  that HIIT workout you've been planning. 💪
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {/* Hydration */}
          <Card variant="glass" className="p-3 sm:p-4 text-center">
            <Droplets className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-teal" />
            <div className="text-lg sm:text-2xl font-serif font-bold">4/8</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Glasses</div>
          </Card>
          
          {/* Streak */}
          <Card variant="glass" className="p-3 sm:p-4 text-center">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-coral" />
            <div className="text-lg sm:text-2xl font-serif font-bold">12</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Day Streak</div>
          </Card>
          
          {/* Mood */}
          <Card variant="glass" className="p-3 sm:p-4 text-center">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-lavender" />
            <div className="text-lg sm:text-2xl font-serif font-bold">Good</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Mood</div>
          </Card>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = {
              coral: "bg-coral-soft/30 border-coral/20",
              lavender: "bg-lavender-soft/30 border-lavender/20",
              teal: "bg-teal-soft/30 border-teal/20",
            };
            const iconColors = {
              coral: "text-coral bg-coral-soft/50",
              lavender: "text-lavender bg-lavender-soft/50",
              teal: "text-teal bg-teal-soft/50",
            };
            
            return (
              <Link 
                to={card.link} 
                key={card.title}
                className="animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
              >
                <Card variant="glass" interactive className={`feature-card ${colorClasses[card.color as keyof typeof colorClasses]} group`}>
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${iconColors[card.color as keyof typeof iconColors]}`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-base sm:text-lg font-semibold mb-0.5 truncate">
                            {card.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Hydration Quick Log */}
        <Card 
          variant="glass"
          className="overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-soft/50 flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-teal" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">Hydration</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">4 of 8 glasses today</p>
                </div>
              </div>
              <Button variant="teal" size="sm" className="touch-target shrink-0 text-xs sm:text-sm">
                + Log
              </Button>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 sm:h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-teal rounded-full transition-all duration-500"
                style={{ width: "50%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default HomePage;
