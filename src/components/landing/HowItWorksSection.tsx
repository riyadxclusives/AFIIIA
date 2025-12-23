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
    <section id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-lavender-soft/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-coral-soft/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
            Your Journey to
            <span className="text-gradient block">Wellness Starts Here</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
            Getting started with AFIIIA is simple. Three easy steps to transform your wellness routine.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Connector line - desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
                  )}
                  
                  {/* Mobile connector */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute left-1/2 -bottom-3 w-0.5 h-6 bg-gradient-to-b from-border to-transparent -translate-x-1/2" />
                  )}
                  
                  <div className="glass-card p-5 sm:p-6 md:p-8 h-full relative">
                    {/* Step number */}
                    <span className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-muted/20 absolute top-3 sm:top-4 right-4 sm:right-6">
                      {step.number}
                    </span>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl border flex items-center justify-center mb-4 sm:mb-5 md:mb-6 ${colorClasses[step.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <span className="text-xs sm:text-sm font-medium">Start your transformation</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
