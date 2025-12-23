import { Link } from "react-router-dom";
import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Droplet, Sun, Moon, Zap, Heart, Calendar } from "lucide-react";

const phases = [
  { name: "Menstrual", days: "1-5", color: "coral", description: "Rest & restore" },
  { name: "Follicular", days: "6-13", color: "teal", description: "Rising energy" },
  { name: "Ovulation", days: "14-16", color: "lavender", description: "Peak energy" },
  { name: "Luteal", days: "17-28", color: "coral", description: "Winding down" },
];

const CyclePage = () => {
  const currentPhase = phases[2]; // Ovulation for demo
  
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
            Cycle Tracker
          </h1>
          <p className="text-muted-foreground">
            Understanding your body's rhythm
          </p>
        </div>

        {/* Current Phase Card */}
        <Card 
          className="bg-gradient-lavender text-primary-foreground border-none overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-primary-foreground/80 text-sm mb-1">Current Phase</p>
                <h2 className="font-serif text-3xl font-semibold">Ovulation</h2>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-primary-foreground/80">Day 14 of 28</p>
                <div className="h-2 bg-primary-foreground/20 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-primary-foreground/60 rounded-full" style={{ width: "50%" }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-serif font-bold">14</p>
                <p className="text-xs text-primary-foreground/80">days until period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Mini View */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Link to="/home/period-calendar">
                <Button variant="ghost" className="gap-2">
                  <h3 className="font-semibold">December 2024</h3>
                  <Calendar className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center text-xs text-muted-foreground py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days - simplified demo */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6; // Start from Dec 1 (offset for Sunday start)
                const isValid = day >= 1 && day <= 31;
                const isToday = day === 23;
                const isPeriod = day >= 1 && day <= 5;
                const isOvulation = day >= 14 && day <= 16;
                
                return (
                  <div 
                    key={i}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-sm
                      ${!isValid ? "text-transparent" : ""}
                      ${isToday ? "bg-gradient-primary text-primary-foreground font-bold" : ""}
                      ${isPeriod && !isToday ? "bg-coral-soft/50 text-coral" : ""}
                      ${isOvulation && !isToday ? "bg-lavender-soft/50 text-lavender" : ""}
                    `}
                  >
                    {isValid ? day : ""}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Phase Timeline */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-serif text-lg font-semibold mb-4">Your Cycle Phases</h3>
          <div className="space-y-3">
            {phases.map((phase, index) => {
              const isActive = phase.name === "Ovulation";
              const colorClasses = {
                coral: "bg-coral-soft/30 border-coral/30",
                lavender: "bg-lavender-soft/30 border-lavender/30",
                teal: "bg-teal-soft/30 border-teal/30",
              };
              const iconColors = {
                coral: "text-coral",
                lavender: "text-lavender",
                teal: "text-teal",
              };
              
              return (
                <Card 
                  key={phase.name}
                  className={`${isActive ? "ring-2 ring-lavender" : ""} ${colorClasses[phase.color as keyof typeof colorClasses]}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${colorClasses[phase.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                      {phase.name === "Menstrual" && <Droplet className={`w-5 h-5 ${iconColors[phase.color as keyof typeof iconColors]}`} />}
                      {phase.name === "Follicular" && <Sun className={`w-5 h-5 ${iconColors[phase.color as keyof typeof iconColors]}`} />}
                      {phase.name === "Ovulation" && <Zap className={`w-5 h-5 ${iconColors[phase.color as keyof typeof iconColors]}`} />}
                      {phase.name === "Luteal" && <Moon className={`w-5 h-5 ${iconColors[phase.color as keyof typeof iconColors]}`} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{phase.name}</h4>
                        <span className="text-sm text-muted-foreground">Days {phase.days}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                    {isActive && (
                      <span className="text-xs font-medium text-lavender bg-lavender-soft/50 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Log Period Button */}
        <div className="fixed bottom-24 left-0 right-0 px-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="container mx-auto">
            <Button variant="coral" size="lg" className="w-full">
              <Heart className="w-5 h-5 mr-2" />
              Log Period
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CyclePage;
