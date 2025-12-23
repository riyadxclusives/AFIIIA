import { Smartphone, Sparkles, Heart, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Create Your Profile",
    description: "Tell us about your goals, preferences, and where you are in your wellness journey.",
    color: "coral",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get Personalized Plans",
    description: "Our AI crafts custom meal plans, workouts, and insights tailored to your cycle phase.",
    color: "lavender",
  },
  {
    number: "03",
    icon: Heart,
    title: "Track & Thrive",
    description: "Log your progress, discover patterns, and celebrate your wellness wins every day.",
    color: "teal",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-soft/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral-soft/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            Your Journey to
            <span className="text-gradient block">Wellness Starts Here</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with AFIIIA is simple. Three easy steps to transform your wellness routine.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                coral: "bg-coral-soft/40 text-coral border-coral/30",
                lavender: "bg-lavender-soft/40 text-lavender border-lavender/30",
                teal: "bg-teal-soft/40 text-teal border-teal/30",
              };
              
              return (
                <div 
                  key={step.number}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
                  )}
                  
                  <div className="glass-card p-8 h-full">
                    {/* Step number */}
                    <span className="text-6xl font-serif font-bold text-muted/20 absolute top-4 right-6">
                      {step.number}
                    </span>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 ${colorClasses[step.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-serif text-xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <span className="text-sm font-medium">Start your transformation</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
