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
  Flame,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMoodEntries, useCycleData } from "@/hooks/useSupabase";

const HomePage = () => {
  const { profile } = useAuth();
  const { data: moodEntries, isLoading: moodLoading } = useMoodEntries();
  const { data: cycleData } = useCycleData();

  const latestMood = moodEntries?.[0];
  const latestCycle = cycleData?.[0];

  // Calculate cycle day
  const getCycleInfo = () => {
    if (!latestCycle?.period_start) return { day: '-', phase: 'Not tracked' };
    const start = new Date(latestCycle.period_start);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const cycleLength = latestCycle.cycle_length || 28;
    const cycleDay = (daysDiff % cycleLength) + 1;
    
    let phase = 'Menstrual';
    if (cycleDay > 5 && cycleDay <= 13) phase = 'Follicular';
    else if (cycleDay > 13 && cycleDay <= 16) phase = 'Ovulation';
    else if (cycleDay > 16) phase = 'Luteal';
    
    return { day: cycleDay, phase };
  };

  const cycleInfo = getCycleInfo();

  const getMoodLabel = () => {
    if (!latestMood) return 'Not logged';
    const moodMap: Record<string, string> = {
      '1': 'Low', '2': 'Okay', '3': 'Good', '4': 'Great',
      'low': 'Low', 'okay': 'Okay', 'good': 'Good', 'great': 'Great'
    };
    return moodMap[latestMood.mood] || latestMood.mood;
  };

  const dashboardCards = [
    {
      title: "Today's Meal",
      description: "Get personalized recipes",
      icon: Utensils,
      link: "/home/meal",
      color: "teal",
    },
    {
      title: "Workout",
      description: "Phase-optimized training",
      icon: Dumbbell,
      link: "/home/workout",
      color: "coral",
    },
    {
      title: "Cycle Status",
      description: `Day ${cycleInfo.day} • ${cycleInfo.phase} Phase`,
      icon: Calendar,
      link: "/home/cycle",
      color: "lavender",
    },
    {
      title: "Mood Check-in",
      description: "How are you feeling?",
      icon: Heart,
      link: "/home/mood",
      color: "coral",
    },
  ];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <AppLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Greeting */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold mb-0.5">
            {greeting()}, {profile?.first_name || 'there'} ✨
          </h1>
          <p className="text-muted-foreground text-sm">
            Here's your wellness snapshot for today
          </p>
        </div>

        {/* AI Daily Insight */}
        <Card 
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
                  {cycleInfo.phase === 'Ovulation' 
                    ? "You're in your ovulation phase — energy is at its peak! Perfect time for that HIIT workout. 💪"
                    : cycleInfo.phase === 'Luteal'
                    ? "You're in your luteal phase — focus on gentle movement and nourishing foods. 🧘‍♀️"
                    : cycleInfo.phase === 'Menstrual'
                    ? "Rest and recovery are key during your menstrual phase. Listen to your body. 💜"
                    : "Your follicular phase is a great time to try new workouts and build strength! 🌱"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <Card className="glass-card p-3 sm:p-4 text-center">
            <Droplets className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-teal" />
            <div className="text-lg sm:text-2xl font-serif font-bold">4/8</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Glasses</div>
          </Card>
          
          <Card className="glass-card p-3 sm:p-4 text-center">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-coral" />
            <div className="text-lg sm:text-2xl font-serif font-bold">{moodEntries?.length || 0}</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Check-ins</div>
          </Card>
          
          <Card className="glass-card p-3 sm:p-4 text-center">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-lavender" />
            <div className="text-lg sm:text-2xl font-serif font-bold">{getMoodLabel()}</div>
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
                <Card className={`feature-card ${colorClasses[card.color as keyof typeof colorClasses]} group cursor-pointer`}>
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
          className="glass-card overflow-hidden animate-fade-in"
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
