import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Yoga Instructor",
    avatar: "S",
    rating: 5,
    text: "AFIIIA has completely transformed how I understand my body. The cycle-based workout recommendations are spot on, and I finally feel like I'm working with my body, not against it.",
    color: "coral" as const,
  },
  {
    name: "Emma L.",
    role: "Marketing Manager",
    avatar: "E",
    rating: 5,
    text: "The meal planning feature is a game-changer! I used to struggle with cravings during my luteal phase, but now I have recipes that actually help me feel balanced and energized.",
    color: "lavender" as const,
  },
  {
    name: "Jessica K.",
    role: "New Mom",
    avatar: "J",
    rating: 5,
    text: "I started using AFIIIA during my fertility journey, and the insights were incredibly helpful. Now postpartum, it helps me track my recovery and mood patterns beautifully.",
    color: "teal" as const,
  },
  {
    name: "Aisha R.",
    role: "Software Engineer",
    avatar: "A",
    rating: 5,
    text: "As someone who loves data, I appreciate how AFIIIA correlates my mood, sleep, and cycle. The patterns it reveals have helped me plan important work around my peak energy days.",
    color: "coral" as const,
  },
  {
    name: "Maria G.",
    role: "Entrepreneur",
    avatar: "M",
    rating: 5,
    text: "The buddy challenges keep me accountable! My sister and I do weekly wellness challenges together, and it has brought us closer while keeping us both on track.",
    color: "lavender" as const,
  },
  {
    name: "Taylor W.",
    role: "Student",
    avatar: "T",
    rating: 5,
    text: "Finally an app that gets it. The AI insights feel like having a wellness coach in my pocket. I especially love the gentle reminders and daily reflections.",
    color: "teal" as const,
  },
];

const colorClasses = {
  coral: {
    bg: "bg-coral-soft/30",
    border: "border-coral/20",
    avatar: "bg-gradient-coral",
  },
  lavender: {
    bg: "bg-lavender-soft/30",
    border: "border-lavender/20",
    avatar: "bg-gradient-lavender",
  },
  teal: {
    bg: "bg-teal-soft/30",
    border: "border-teal/20",
    avatar: "bg-gradient-teal",
  },
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1X = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const blob2X = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration with parallax */}
      <motion.div 
        style={{ x: blob1X }}
        className="absolute top-1/4 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-coral-soft/15 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ x: blob2X }}
        className="absolute bottom-1/4 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-lavender-soft/15 rounded-full blur-3xl" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
            Loved by Women
            <span className="text-gradient block">Around the World</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
            Join thousands of women who have transformed their wellness journey with AFIIIA.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {testimonials.map((testimonial, index) => {
            const colors = colorClasses[testimonial.color];
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            return (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: (row * 0.15) + (col * 0.1),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <Card 
                  className={`border ${colors.border} ${colors.bg} backdrop-blur-sm h-full`}
                >
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    {/* Quote icon */}
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-muted/30 mb-3 sm:mb-4" />
                    
                    {/* Rating */}
                    <div className="flex gap-0.5 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                        >
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-coral text-coral" />
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="text-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${colors.avatar} flex items-center justify-center text-primary-foreground font-semibold text-sm`}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                        <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[
            { value: "10,000+", label: "Happy Users" },
            { value: "4.9", label: "App Rating" },
            { value: "50K+", label: "Cycles Tracked" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-4 sm:p-5 glass-card cursor-default"
            >
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
