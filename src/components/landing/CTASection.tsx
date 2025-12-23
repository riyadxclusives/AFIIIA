import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-coral/20 blob float"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-lavender/20 blob float"
          style={{ animationDelay: "2s" }}
        />
        <div 
          className="absolute bottom-1/4 left-1/2 w-28 sm:w-42 md:w-56 h-28 sm:h-42 md:h-56 bg-teal/20 blob float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
            Ready to Transform Your
            <span className="text-gradient block">Wellness Journey?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-10 px-2">
            Join thousands of women who've discovered the power of understanding 
            their natural rhythms. Start your 14-day free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Link to="/home" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mt-5 sm:mt-6">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
