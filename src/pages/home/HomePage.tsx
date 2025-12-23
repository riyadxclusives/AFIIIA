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

const HomePage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Greeting */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
            Good morning, Sarah ✨
          </h1>
          <p className="text-muted-foreground">
            Here's your wellness snapshot for today
          </p>
        </div>

        {/* AI Daily Insight */}
        <Card 
          className="bg-gradient-primary text-primary-foreground border-none overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-5 relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Your Daily Insight</h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed">
                  You're in your ovulation phase — energy is at its peak! Perfect time for 
                  that HIIT workout you've been planning. Your mood tracking shows positive 
                  trends this week. Keep it up! 💪
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {/* Hydration */}
          <Card className="glass-card p-4 text-center">
            <Droplets className="w-6 h-6 mx-auto mb-2 text-teal" />
            <div className="text-2xl font-serif font-bold">4/8</div>
            <div className="text-xs text-muted-foreground">Glasses</div>
          </Card>
          
          {/* Streak */}
          <Card className="glass-card p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-coral" />
            <div className="text-2xl font-serif font-bold">12</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </Card>
          
          {/* Mood */}
          <Card className="glass-card p-4 text-center">
            <Heart className="w-6 h-6 mx-auto mb-2 text-lavender" />
            <div className="text-2xl font-serif font-bold">Good</div>
            <div className="text-xs text-muted-foreground">Mood Today</div>
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
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColors[card.color as keyof typeof iconColors]}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-semibold mb-1">
                            {card.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
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
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-soft/50 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h3 className="font-semibold">Hydration</h3>
                  <p className="text-sm text-muted-foreground">4 of 8 glasses today</p>
                </div>
              </div>
              <Button variant="teal" size="sm">
                + Log Water
              </Button>
            </div>
            
            {/* Progress bar */}
            <div className="h-3 bg-muted rounded-full overflow-hidden">
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
