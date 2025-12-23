import { Smartphone, Sparkles, Heart, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration with parallax */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-lavender-soft/20 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-coral-soft/20 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
            Your Journey to
            <span className="text-gradient block">Wellness Starts Here</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
            Getting started with AFIIIA is simple. Three easy steps to transform your wellness routine.
          </p>
        </motion.div>

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
                <motion.div 
                  key={step.number}
                  initial={{ opacity: 0, y: 40, rotateY: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="relative"
                >
                  {/* Connector line - desktop only */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                      className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent origin-left" 
                    />
                  )}
                  
                  {/* Mobile connector */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                      className="md:hidden absolute left-1/2 -bottom-3 w-0.5 h-6 bg-gradient-to-b from-border to-transparent -translate-x-1/2 origin-top" 
                    />
                  )}
                  
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card p-5 sm:p-6 md:p-8 h-full relative"
                  >
                    {/* Step number */}
                    <span className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-muted/20 absolute top-3 sm:top-4 right-4 sm:right-6">
                      {step.number}
                    </span>
                    
                    {/* Icon */}
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl border flex items-center justify-center mb-4 sm:mb-5 md:mb-6 ${colorClasses[step.color as keyof typeof colorClasses]}`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8" />
                    </motion.div>
                    
                    {/* Content */}
                    <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Arrow indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-8 sm:mt-10 md:mt-12"
          >
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs sm:text-sm font-medium">Start your transformation</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
