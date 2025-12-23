import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-hero pt-16 sm:pt-20 pb-12">
      {/* Animated background blobs - smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 bg-coral-soft/40 blob float"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute top-1/3 -left-16 sm:-left-32 w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-lavender-soft/40 blob float"
          style={{ animationDelay: "2s" }}
        />
        <div 
          className="absolute bottom-10 sm:bottom-20 right-1/4 w-36 h-36 sm:w-56 md:w-72 sm:h-56 md:h-72 bg-teal-soft/40 blob float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/60 backdrop-blur-sm border border-border/50 mb-6 sm:mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coral" />
            <span className="text-xs sm:text-sm font-medium text-secondary-foreground">
              Your AI-Powered Wellness Companion
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-4 sm:mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Embrace Your
            <span className="block text-gradient mt-1 sm:mt-2">Natural Rhythms</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-2 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Track your cycle, plan personalized meals, discover phase-aware workouts, 
            and nurture your mood — all in one beautifully integrated wellness ecosystem.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in px-4 sm:px-0"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/home" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                Start Your Journey
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/#how-it-works" className="w-full sm:w-auto">
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div 
            className="mt-12 sm:mt-16 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Trusted by women worldwide
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex -space-x-2 sm:-space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background bg-gradient-lavender"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground text-sm sm:text-base">10,000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
