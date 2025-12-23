import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, TrendingUp, TrendingDown, Minus, Frown, Meh, Smile, Heart, Moon, Battery, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Mock data for mood history
const moodData = [
  { date: "Mon", mood: 3, sleep: 4, energy: 3 },
  { date: "Tue", mood: 4, sleep: 5, energy: 4 },
  { date: "Wed", mood: 3, sleep: 3, energy: 2 },
  { date: "Thu", mood: 2, sleep: 2, energy: 2 },
  { date: "Fri", mood: 3, sleep: 4, energy: 3 },
  { date: "Sat", mood: 4, sleep: 5, energy: 4 },
  { date: "Sun", mood: 4, sleep: 4, energy: 5 },
];

const weeklyData = [
  { week: "Week 1", avgMood: 3.2, avgSleep: 3.5, avgEnergy: 3.0 },
  { week: "Week 2", avgMood: 3.5, avgSleep: 4.0, avgEnergy: 3.5 },
  { week: "Week 3", avgMood: 2.8, avgSleep: 3.2, avgEnergy: 2.5 },
  { week: "Week 4", avgMood: 3.8, avgSleep: 4.2, avgEnergy: 4.0 },
];

const recentCheckins = [
  { id: 1, date: "Today", time: "9:30 AM", mood: 4, moodLabel: "Great", sleep: 5, energy: 4, symptoms: ["None"] },
  { id: 2, date: "Yesterday", time: "8:45 AM", mood: 3, moodLabel: "Good", sleep: 4, energy: 3, symptoms: ["Fatigue"] },
  { id: 3, date: "Dec 21", time: "10:00 AM", mood: 2, moodLabel: "Okay", sleep: 2, energy: 2, symptoms: ["Cramps", "Headache"] },
  { id: 4, date: "Dec 20", time: "9:15 AM", mood: 3, moodLabel: "Good", sleep: 4, energy: 3, symptoms: ["Bloating"] },
  { id: 5, date: "Dec 19", time: "8:30 AM", mood: 4, moodLabel: "Great", sleep: 5, energy: 5, symptoms: ["None"] },
];

const moodIcons = {
  1: { icon: Frown, label: "Low", color: "text-coral" },
  2: { icon: Meh, label: "Okay", color: "text-coral" },
  3: { icon: Smile, label: "Good", color: "text-teal" },
  4: { icon: Heart, label: "Great", color: "text-lavender" },
};

const MoodHistoryPage = () => {
  // Calculate averages and trends
  const avgMood = (moodData.reduce((sum, d) => sum + d.mood, 0) / moodData.length).toFixed(1);
  const avgSleep = (moodData.reduce((sum, d) => sum + d.sleep, 0) / moodData.length).toFixed(1);
  const avgEnergy = (moodData.reduce((sum, d) => sum + d.energy, 0) / moodData.length).toFixed(1);

  // Mock trend calculation (comparing this week to last)
  const moodTrend = 0.3;
  const sleepTrend = 0.5;
  const energyTrend = -0.2;

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-teal" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-coral" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getTrendText = (trend: number) => {
    if (trend > 0) return `+${trend.toFixed(1)} from last week`;
    if (trend < 0) return `${trend.toFixed(1)} from last week`;
    return "No change";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Link to="/home/mood">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold">
                Mood History
              </h1>
              <p className="text-muted-foreground text-sm">
                Track your wellness trends over time
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart className="w-4 h-4 text-lavender" />
                <span className="text-xs text-muted-foreground">Mood</span>
              </div>
              <p className="text-2xl font-bold text-lavender">{avgMood}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon(moodTrend)}
                <span className="text-[10px] text-muted-foreground">{moodTrend > 0 ? "+" : ""}{moodTrend.toFixed(1)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Moon className="w-4 h-4 text-lavender" />
                <span className="text-xs text-muted-foreground">Sleep</span>
              </div>
              <p className="text-2xl font-bold text-lavender">{avgSleep}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon(sleepTrend)}
                <span className="text-[10px] text-muted-foreground">{sleepTrend > 0 ? "+" : ""}{sleepTrend.toFixed(1)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Battery className="w-4 h-4 text-teal" />
                <span className="text-xs text-muted-foreground">Energy</span>
              </div>
              <p className="text-2xl font-bold text-teal">{avgEnergy}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {getTrendIcon(energyTrend)}
                <span className="text-[10px] text-muted-foreground">{energyTrend.toFixed(1)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Mood Chart */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">This Week's Mood</h3>
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--lavender))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--lavender))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[1, 4]} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                    ticks={[1, 2, 3, 4]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="hsl(var(--lavender))" 
                    strokeWidth={3}
                    fill="url(#moodGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sleep & Energy Chart */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Sleep & Energy Trends</h3>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-lavender" />
                  <span className="text-muted-foreground">Sleep</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-teal" />
                  <span className="text-muted-foreground">Energy</span>
                </div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[1, 5]} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="hsl(var(--lavender))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--lavender))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "hsl(var(--lavender))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="hsl(var(--teal))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--teal))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "hsl(var(--teal))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Monthly Overview</h3>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="week" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[1, 5]} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgMood" 
                    name="Mood"
                    stroke="hsl(var(--lavender))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--lavender))", strokeWidth: 0, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Check-ins */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Recent Check-ins</h3>
            <div className="space-y-3">
              {recentCheckins.map((checkin) => {
                const MoodIcon = moodIcons[checkin.mood as keyof typeof moodIcons].icon;
                const moodColor = moodIcons[checkin.mood as keyof typeof moodIcons].color;
                
                return (
                  <div 
                    key={checkin.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-background/50 ${moodColor}`}>
                      <MoodIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{checkin.moodLabel}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{checkin.date}, {checkin.time}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Moon className="w-3 h-3" /> {checkin.sleep}/5
                        </span>
                        <span className="flex items-center gap-1">
                          <Battery className="w-3 h-3" /> {checkin.energy}/5
                        </span>
                      </div>
                      {checkin.symptoms[0] !== "None" && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {checkin.symptoms.map((symptom) => (
                            <span 
                              key={symptom}
                              className="px-2 py-0.5 text-[10px] rounded-full bg-coral-soft/30 text-coral"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Log New Check-in Button */}
        <Link to="/home/mood" className="block">
          <Button variant="hero" size="lg" className="w-full animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <Heart className="w-5 h-5 mr-2" />
            Log New Check-in
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
};

export default MoodHistoryPage;