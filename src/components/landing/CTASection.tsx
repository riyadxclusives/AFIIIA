import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-coral/20 blob float"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-lavender/20 blob float"
          style={{ animationDelay: "2s" }}
        />
        <div 
          className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-teal/20 blob float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            Ready to Transform Your
            <span className="text-gradient block">Wellness Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of women who've discovered the power of understanding 
            their natural rhythms. Start your 14-day free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/home">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
