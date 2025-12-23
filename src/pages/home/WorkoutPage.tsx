import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Flame, Play, Dumbbell, Heart, Wind, Sparkles } from "lucide-react";

const workoutCategories = [
  { name: "HIIT", icon: Flame, duration: "20 min", color: "coral" },
  { name: "Strength", icon: Dumbbell, duration: "30 min", color: "lavender" },
  { name: "Yoga", icon: Heart, duration: "25 min", color: "teal" },
  { name: "Cardio", icon: Wind, duration: "30 min", color: "coral" },
];

const WorkoutPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
            Workout Planner
          </h1>
          <p className="text-muted-foreground">
            Phase-optimized training for your body
          </p>
        </div>

        {/* AI Recommended Workout */}
        <Card 
          className="bg-gradient-coral text-primary-foreground border-none overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium text-primary-foreground/80">Recommended for Ovulation Phase</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-2">High Energy HIIT</h2>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Your energy is at its peak! This workout maximizes your natural strength and stamina.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">20 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span className="text-sm">High Intensity</span>
              </div>
            </div>
            <Button variant="glass" size="lg" className="w-full group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Workout
            </Button>
          </CardContent>
        </Card>

        {/* Quick Categories */}
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <h3 className="font-serif text-lg font-semibold mb-4">Quick Start</h3>
          <div className="grid grid-cols-2 gap-3">
            {workoutCategories.map((category) => {
              const Icon = category.icon;
              const colorClasses = {
                coral: "bg-coral-soft/30 border-coral/20 hover:bg-coral-soft/50",
                lavender: "bg-lavender-soft/30 border-lavender/20 hover:bg-lavender-soft/50",
                teal: "bg-teal-soft/30 border-teal/20 hover:bg-teal-soft/50",
              };
              const iconColors = {
                coral: "text-coral bg-coral-soft/50",
                lavender: "text-lavender bg-lavender-soft/50",
                teal: "text-teal bg-teal-soft/50",
              };
              
              return (
                <Card 
                  key={category.name}
                  className={`cursor-pointer transition-all duration-300 ${colorClasses[category.color as keyof typeof colorClasses]}`}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColors[category.color as keyof typeof iconColors]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Today's Plan */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-serif text-lg font-semibold mb-4">Today's Plan</h3>
          <Card className="glass-card">
            <CardContent className="p-5">
              <div className="space-y-4">
                {/* Warm up */}
                <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-teal-soft/50 flex items-center justify-center">
                    <span className="text-teal font-semibold">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Warm Up</h4>
                    <p className="text-sm text-muted-foreground">Light stretching & mobility</p>
                  </div>
                  <span className="text-sm text-muted-foreground">5 min</span>
                </div>
                
                {/* Main workout */}
                <div className="flex items-center gap-4 p-3 bg-coral-soft/30 rounded-xl border border-coral/20">
                  <div className="w-10 h-10 rounded-lg bg-coral-soft/50 flex items-center justify-center">
                    <span className="text-coral font-semibold">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Main Workout</h4>
                    <p className="text-sm text-muted-foreground">HIIT circuits</p>
                  </div>
                  <span className="text-sm text-muted-foreground">15 min</span>
                </div>
                
                {/* Cool down */}
                <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-lavender-soft/50 flex items-center justify-center">
                    <span className="text-lavender font-semibold">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Cool Down</h4>
                    <p className="text-sm text-muted-foreground">Stretching & breathwork</p>
                  </div>
                  <span className="text-sm text-muted-foreground">5 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Custom Button */}
        <Button variant="hero" size="lg" className="w-full animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Custom Workout
        </Button>
      </div>
    </AppLayout>
  );
};

export default WorkoutPage;
