import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Utensils, 
  Dumbbell, 
  Heart, 
  Droplets, 
  Sparkles,
  Moon,
  Users
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Cycle Tracking",
    description: "Intelligent period predictions, fertility insights, and pregnancy support tailored to your unique rhythm.",
    color: "coral" as const,
  },
  {
    icon: Utensils,
    title: "AI Meal Planner",
    description: "Get personalized recipes from your ingredients, with phase-aware nutrition that adapts to your cycle.",
    color: "teal" as const,
  },
  {
    icon: Dumbbell,
    title: "Smart Workouts",
    description: "Phase-optimized exercise plans that respect your energy levels and support your wellness goals.",
    color: "lavender" as const,
  },
  {
    icon: Heart,
    title: "Mood Insights",
    description: "Track emotions, discover patterns, and receive gentle AI reflections to support your mental wellness.",
    color: "coral" as const,
  },
  {
    icon: Droplets,
    title: "Hydration Goals",
    description: "Stay on track with personalized hydration targets and streak-based motivation.",
    color: "teal" as const,
  },
  {
    icon: Moon,
    title: "Sleep & Recovery",
    description: "AI-powered recovery advice based on your activity, sleep quality, and cycle phase.",
    color: "lavender" as const,
  },
  {
    icon: Sparkles,
    title: "Daily AI Insights",
    description: "Wake up to personalized wellness tips and reflections crafted just for you.",
    color: "coral" as const,
  },
  {
    icon: Users,
    title: "Buddy Challenges",
    description: "Stay accountable with friends through fun wellness challenges and group motivation.",
    color: "teal" as const,
  },
];

const colorClasses = {
  coral: {
    bg: "bg-coral-soft/30",
    icon: "text-coral",
    border: "border-coral/20",
  },
  lavender: {
    bg: "bg-lavender-soft/30",
    icon: "text-lavender",
    border: "border-lavender/20",
  },
  teal: {
    bg: "bg-teal-soft/30",
    icon: "text-teal",
    border: "border-teal/20",
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            Everything You Need,
            <span className="text-gradient block">Beautifully Integrated</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AFIIIA combines the power of AI with deep understanding of women's cyclical 
            physiology to create a truly personalized wellness experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            const Icon = feature.icon;
            
            return (
              <Card 
                key={feature.title}
                className={`feature-card border ${colors.border} ${colors.bg} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
