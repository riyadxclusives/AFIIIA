import { useState } from "react";
import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Flame, 
  Play, 
  Dumbbell, 
  Heart, 
  Wind, 
  Sparkles,
  Droplet,
  Sun,
  Zap,
  Moon,
  Timer,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Exercise {
  name: string;
  duration: string;
  reps?: string;
  description: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  duration: string;
  intensity: "Low" | "Medium" | "High";
  calories: number;
  exercises: Exercise[];
  benefits: string[];
  phase: string;
}

const cyclePhases = [
  { 
    id: "menstrual", 
    name: "Menstrual", 
    icon: Droplet, 
    days: "Days 1-5",
    color: "coral",
    tip: "Listen to your body. Focus on gentle movement, stretching, and restorative exercises."
  },
  { 
    id: "follicular", 
    name: "Follicular", 
    icon: Sun, 
    days: "Days 6-13",
    color: "teal",
    tip: "Energy is rising! Great time to try new workouts and increase intensity gradually."
  },
  { 
    id: "ovulation", 
    name: "Ovulation", 
    icon: Zap, 
    days: "Days 14-16",
    color: "lavender",
    tip: "Peak energy and strength! Perfect for high-intensity workouts and personal bests."
  },
  { 
    id: "luteal", 
    name: "Luteal", 
    icon: Moon, 
    days: "Days 17-28",
    color: "coral",
    tip: "Energy decreases. Prioritize strength training and moderate cardio. Rest when needed."
  },
];

const workoutsByPhase: Record<string, Workout[]> = {
  menstrual: [
    {
      id: "mens1",
      name: "Gentle Yoga Flow",
      description: "Restorative stretches to ease cramps and tension",
      duration: "25 min",
      intensity: "Low",
      calories: 80,
      benefits: ["Pain relief", "Relaxation", "Flexibility"],
      phase: "menstrual",
      exercises: [
        { name: "Child's Pose", duration: "2 min", description: "Kneel and stretch arms forward" },
        { name: "Cat-Cow Stretches", duration: "3 min", description: "Alternate arching and rounding spine" },
        { name: "Supine Twist", duration: "2 min each side", description: "Gentle spinal rotation lying down" },
        { name: "Legs Up The Wall", duration: "5 min", description: "Restorative inversion pose" },
        { name: "Pigeon Pose", duration: "2 min each side", description: "Hip opener stretch" },
        { name: "Savasana", duration: "5 min", description: "Final relaxation" },
      ]
    },
    {
      id: "mens2",
      name: "Light Walking",
      description: "Easy-paced walk to boost circulation",
      duration: "20 min",
      intensity: "Low",
      calories: 100,
      benefits: ["Circulation", "Mood boost", "Low impact"],
      phase: "menstrual",
      exercises: [
        { name: "Warm Up Walk", duration: "3 min", description: "Slow, comfortable pace" },
        { name: "Steady Walking", duration: "14 min", description: "Maintain consistent easy pace" },
        { name: "Cool Down", duration: "3 min", description: "Gradual slowdown" },
      ]
    },
    {
      id: "mens3",
      name: "Breathing & Meditation",
      description: "Mindful breathing to reduce stress and pain",
      duration: "15 min",
      intensity: "Low",
      calories: 20,
      benefits: ["Stress relief", "Pain management", "Mental clarity"],
      phase: "menstrual",
      exercises: [
        { name: "4-7-8 Breathing", duration: "5 min", description: "Inhale 4s, hold 7s, exhale 8s" },
        { name: "Body Scan", duration: "5 min", description: "Progressive relaxation meditation" },
        { name: "Belly Breathing", duration: "5 min", description: "Deep diaphragmatic breaths" },
      ]
    },
  ],
  follicular: [
    {
      id: "foll1",
      name: "Cardio Dance",
      description: "Fun, energetic dance workout to match rising energy",
      duration: "30 min",
      intensity: "Medium",
      calories: 250,
      benefits: ["Cardio", "Fun", "Coordination"],
      phase: "follicular",
      exercises: [
        { name: "Warm Up Moves", duration: "5 min", description: "Simple side steps and arm circles" },
        { name: "Dance Cardio Set 1", duration: "8 min", description: "High-energy choreography" },
        { name: "Dance Cardio Set 2", duration: "8 min", description: "New moves, higher tempo" },
        { name: "Core Dance Moves", duration: "5 min", description: "Hip movements and twists" },
        { name: "Cool Down", duration: "4 min", description: "Slow stretches" },
      ]
    },
    {
      id: "foll2",
      name: "Full Body Strength",
      description: "Build strength as your energy increases",
      duration: "35 min",
      intensity: "Medium",
      calories: 220,
      benefits: ["Muscle building", "Metabolism", "Strength"],
      phase: "follicular",
      exercises: [
        { name: "Warm Up", duration: "5 min", description: "Dynamic stretches" },
        { name: "Squats", reps: "3 x 12", duration: "5 min", description: "Bodyweight or weighted" },
        { name: "Push-Ups", reps: "3 x 10", duration: "5 min", description: "Modified or full" },
        { name: "Lunges", reps: "3 x 10 each leg", duration: "6 min", description: "Forward or reverse" },
        { name: "Plank Hold", reps: "3 x 30s", duration: "4 min", description: "Core stability" },
        { name: "Rows", reps: "3 x 12", duration: "5 min", description: "With dumbbells or bands" },
        { name: "Stretch", duration: "5 min", description: "Full body cool down" },
      ]
    },
    {
      id: "foll3",
      name: "Cycling Session",
      description: "Indoor or outdoor bike ride for cardio",
      duration: "30 min",
      intensity: "Medium",
      calories: 300,
      benefits: ["Cardio endurance", "Leg strength", "Low joint impact"],
      phase: "follicular",
      exercises: [
        { name: "Easy Spin", duration: "5 min", description: "Light resistance warm up" },
        { name: "Moderate Hills", duration: "10 min", description: "Increase resistance every 2 min" },
        { name: "Speed Intervals", duration: "10 min", description: "30s fast, 30s recovery" },
        { name: "Cool Down Spin", duration: "5 min", description: "Decreasing resistance" },
      ]
    },
  ],
  ovulation: [
    {
      id: "ovu1",
      name: "High Energy HIIT",
      description: "Maximum intensity to match your peak energy",
      duration: "25 min",
      intensity: "High",
      calories: 350,
      benefits: ["Fat burning", "Endurance", "Strength"],
      phase: "ovulation",
      exercises: [
        { name: "Dynamic Warm Up", duration: "4 min", description: "Jumping jacks, high knees" },
        { name: "Burpees", reps: "45s work, 15s rest", duration: "3 min", description: "Full body power" },
        { name: "Mountain Climbers", reps: "45s work, 15s rest", duration: "3 min", description: "Core and cardio" },
        { name: "Jump Squats", reps: "45s work, 15s rest", duration: "3 min", description: "Explosive legs" },
        { name: "Push-Up Variations", reps: "45s work, 15s rest", duration: "3 min", description: "Chest and arms" },
        { name: "Box Jumps", reps: "45s work, 15s rest", duration: "3 min", description: "Plyometric power" },
        { name: "Sprint Intervals", reps: "30s sprint, 30s rest x 4", duration: "4 min", description: "Max effort sprints" },
        { name: "Cool Down", duration: "2 min", description: "Walking and stretching" },
      ]
    },
    {
      id: "ovu2",
      name: "Power Lifting Session",
      description: "Lift heavy - your strength peaks now",
      duration: "45 min",
      intensity: "High",
      calories: 280,
      benefits: ["Max strength", "Muscle growth", "Power"],
      phase: "ovulation",
      exercises: [
        { name: "Warm Up Sets", duration: "8 min", description: "Light weights, mobility" },
        { name: "Deadlifts", reps: "4 x 6-8", duration: "10 min", description: "Heavy compound lift" },
        { name: "Bench Press", reps: "4 x 6-8", duration: "10 min", description: "Upper body strength" },
        { name: "Barbell Squats", reps: "4 x 6-8", duration: "10 min", description: "Lower body power" },
        { name: "Cool Down Stretch", duration: "7 min", description: "Full body stretches" },
      ]
    },
    {
      id: "ovu3",
      name: "Sprint Training",
      description: "Speed work while your body is primed for performance",
      duration: "30 min",
      intensity: "High",
      calories: 320,
      benefits: ["Speed", "Power", "Fat burning"],
      phase: "ovulation",
      exercises: [
        { name: "Dynamic Warm Up", duration: "6 min", description: "A-skips, B-skips, butt kicks" },
        { name: "Strides", reps: "4 x 80m", duration: "4 min", description: "Build up speed" },
        { name: "Sprint Intervals", reps: "6 x 100m", duration: "12 min", description: "90% effort with rest" },
        { name: "Hill Sprints", reps: "4 x 30s", duration: "5 min", description: "Find an incline" },
        { name: "Cool Down Jog", duration: "3 min", description: "Easy pace" },
      ]
    },
  ],
  luteal: [
    {
      id: "lut1",
      name: "Strength Maintenance",
      description: "Moderate weights to maintain muscle as energy dips",
      duration: "35 min",
      intensity: "Medium",
      calories: 200,
      benefits: ["Maintain strength", "Mood support", "Steady energy"],
      phase: "luteal",
      exercises: [
        { name: "Warm Up", duration: "5 min", description: "Light cardio and stretches" },
        { name: "Goblet Squats", reps: "3 x 12", duration: "6 min", description: "Moderate weight" },
        { name: "Dumbbell Rows", reps: "3 x 10 each arm", duration: "6 min", description: "Back strength" },
        { name: "Shoulder Press", reps: "3 x 12", duration: "5 min", description: "Light to moderate" },
        { name: "Glute Bridges", reps: "3 x 15", duration: "5 min", description: "Hip activation" },
        { name: "Dead Bug", reps: "3 x 10 each side", duration: "4 min", description: "Core stability" },
        { name: "Stretch", duration: "4 min", description: "Focus on hips and back" },
      ]
    },
    {
      id: "lut2",
      name: "Pilates Core",
      description: "Low-impact core work that helps with bloating",
      duration: "30 min",
      intensity: "Low",
      calories: 120,
      benefits: ["Core strength", "Posture", "Bloating relief"],
      phase: "luteal",
      exercises: [
        { name: "Hundred", duration: "2 min", description: "Classic Pilates breathing exercise" },
        { name: "Roll Up", reps: "10 reps", duration: "3 min", description: "Articulate the spine" },
        { name: "Single Leg Circles", reps: "10 each leg", duration: "4 min", description: "Hip mobility" },
        { name: "Criss Cross", reps: "20 reps", duration: "3 min", description: "Oblique work" },
        { name: "Swimming", duration: "2 min", description: "Back extension" },
        { name: "Side Leg Series", duration: "8 min", description: "Outer and inner thigh" },
        { name: "Spine Stretch", duration: "3 min", description: "Flexibility" },
        { name: "Rest Pose", duration: "5 min", description: "Relaxation" },
      ]
    },
    {
      id: "lut3",
      name: "Steady State Cardio",
      description: "Moderate, consistent effort to manage PMS",
      duration: "30 min",
      intensity: "Medium",
      calories: 220,
      benefits: ["Stress relief", "Endorphins", "Steady effort"],
      phase: "luteal",
      exercises: [
        { name: "Warm Up Walk", duration: "5 min", description: "Easy pace" },
        { name: "Brisk Walking/Jogging", duration: "20 min", description: "Maintain steady heart rate" },
        { name: "Cool Down", duration: "5 min", description: "Gradual slowdown and stretch" },
      ]
    },
  ],
};

const MealPage = () => {
  const [activePhase, setActivePhase] = useState("ovulation");
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  
  const currentPhaseData = cyclePhases.find(p => p.id === activePhase)!;
  const workouts = workoutsByPhase[activePhase];

  const colorClasses = {
    coral: {
      bg: "bg-coral-soft/30",
      border: "border-coral/20",
      text: "text-coral",
      gradient: "bg-gradient-coral"
    },
    teal: {
      bg: "bg-teal-soft/30",
      border: "border-teal/20",
      text: "text-teal",
      gradient: "bg-gradient-teal"
    },
    lavender: {
      bg: "bg-lavender-soft/30",
      border: "border-lavender/20",
      text: "text-lavender",
      gradient: "bg-gradient-lavender"
    }
  };

  const intensityColors = {
    Low: "text-teal bg-teal-soft/30",
    Medium: "text-lavender bg-lavender-soft/30",
    High: "text-coral bg-coral-soft/30"
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
            Cycle Workouts
          </h1>
          <p className="text-muted-foreground">
            Training optimized for your cycle phase
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <Tabs value={activePhase} onValueChange={setActivePhase} className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <TabsList className="grid grid-cols-4 h-auto p-1 bg-secondary/50">
            {cyclePhases.map((phase) => {
              const Icon = phase.icon;
              return (
                <TabsTrigger 
                  key={phase.id} 
                  value={phase.id}
                  className="flex flex-col gap-1 py-2 px-1 data-[state=active]:bg-background"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] sm:text-xs">{phase.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Phase Info Card */}
        <Card 
          className={`${colorClasses[currentPhaseData.color as keyof typeof colorClasses].bg} ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].border} border animate-fade-in`}
          style={{ animationDelay: "0.15s" }}
        >
          <CardContent className="p-4 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].gradient} flex items-center justify-center shrink-0`}>
              <currentPhaseData.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm">{currentPhaseData.name} Phase</h4>
                <Badge variant="outline" className="text-[10px]">{currentPhaseData.days}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentPhaseData.tip}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Workout Cards */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-serif text-lg font-semibold">Recommended Workouts</h3>
          
          {workouts.map((workout) => (
            <Card 
              key={workout.id} 
              className="glass-card overflow-hidden"
            >
              <CardContent className="p-0">
                <div className={`p-5 ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].bg} border-b ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].border}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-serif text-lg font-semibold mb-1">
                        {workout.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {workout.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{workout.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Flame className="w-4 h-4" />
                          <span>{workout.calories} cal</span>
                        </div>
                        <Badge className={intensityColors[workout.intensity]}>
                          {workout.intensity}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      size="icon"
                      variant="glass"
                      className="shrink-0 ml-3"
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {workout.benefits.map((benefit) => (
                      <Badge 
                        key={benefit} 
                        variant="outline" 
                        className="text-[10px] bg-background/50"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Exercise List */}
                <div className="p-5">
                  <button
                    onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                    className="flex items-center gap-2 text-sm font-medium mb-3 w-full"
                  >
                    <Timer className="w-4 h-4" />
                    <span>Exercises ({workout.exercises.length})</span>
                    <span className={`ml-auto transition-transform ${expandedWorkout === workout.id ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  {expandedWorkout === workout.id && (
                    <div className="space-y-2 animate-fade-in">
                      {workout.exercises.map((exercise, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30"
                        >
                          <div className={`w-8 h-8 rounded-lg ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].bg} flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-sm font-semibold ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].text}`}>
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-sm">{exercise.name}</h5>
                              <span className="text-xs text-muted-foreground">
                                {exercise.reps || exercise.duration}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {exercise.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    variant={currentPhaseData.color === "coral" ? "coral" : currentPhaseData.color === "teal" ? "teal" : "lavender"}
                    size="sm" 
                    className="w-full mt-4"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Workout
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Generate Button */}
        <Button variant="hero" size="lg" className="w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Custom Workout
        </Button>
      </div>
    </AppLayout>
  );
};

export default MealPage;
