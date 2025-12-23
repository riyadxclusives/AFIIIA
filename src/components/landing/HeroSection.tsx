import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-coral-soft/40 blob float"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute top-1/3 -left-32 w-80 h-80 bg-lavender-soft/40 blob float"
          style={{ animationDelay: "2s" }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-72 h-72 bg-teal-soft/40 blob float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 backdrop-blur-sm border border-border/50 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-secondary-foreground">
              Your AI-Powered Wellness Companion
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Embrace Your
            <span className="block text-gradient mt-2">Natural Rhythms</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Track your cycle, plan personalized meals, discover phase-aware workouts, 
            and nurture your mood — all in one beautifully integrated wellness ecosystem.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/home">
              <Button variant="hero" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/#how-it-works">
              <Button variant="glass" size="xl">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div 
            className="mt-16 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by women worldwide
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-gradient-lavender"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">10,000+</div>
                <div className="text-sm text-muted-foreground">Active users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
