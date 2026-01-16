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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} id="features" className="py-16 sm:py-20 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with parallax */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
            Everything You Need,
            <span className="text-gradient block">Beautifully Integrated</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
            AFIIIA combines the power of AI with deep understanding of women's cyclical 
            physiology to create a truly personalized wellness experience.
          </p>
        </motion.div>

        {/* Features Grid with stagger animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            const Icon = feature.icon;
            const row = Math.floor(index / 4);
            const col = index % 4;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: (row * 0.1) + (col * 0.08),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <Card 
                  className={`feature-card border ${colors.border} ${colors.bg} h-full`}
                >
                  <CardContent className="p-4 sm:p-5 md:pt-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-3 sm:mb-4`}
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} />
                    </motion.div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
