import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const plans = [
  {
    name: "Bloom",
    price: "10.99",
    description: "Perfect for getting started with your wellness journey",
    features: [
      "Cycle & period tracking",
      "Basic meal suggestions",
      "Workout recommendations",
      "Mood logging",
      "Hydration tracking",
      "Daily AI insights",
    ],
    color: "lavender" as const,
    popular: false,
  },
  {
    name: "Radiance",
    price: "19.99",
    description: "Full access to all AFIIIA features and AI capabilities",
    features: [
      "Everything in Bloom",
      "Advanced AI meal planning",
      "Personalized workout plans",
      "Fertility & pregnancy modes",
      "Mood correlations & insights",
      "Buddy challenges",
      "Priority AI responses",
      "Exclusive content",
    ],
    color: "coral" as const,
    popular: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
            Simple, Transparent
            <span className="text-gradient block">Pricing</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Start with a 14-day free trial. Cancel anytime.
          </p>
        </div>

        {/* Pricing Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {plans.map((plan) => {
                const isPopular = plan.popular;
                
                return (
                  <CarouselItem key={plan.name} className="pl-2 md:pl-4 md:basis-1/2">
                    <Card 
                      className={`relative overflow-hidden transition-all duration-300 hover:shadow-elevated h-full ${
                        isPopular 
                          ? "border-coral/50 shadow-glow-coral" 
                          : "border-border"
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute top-0 right-0 bg-gradient-coral text-primary-foreground px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-bl-xl">
                          Most Popular
                        </div>
                      )}
                      
                      <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                        <CardTitle className="font-serif text-xl sm:text-2xl">{plan.name}</CardTitle>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                          {plan.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="p-4 sm:p-6 pt-0">
                        {/* Price */}
                        <div className="mb-4 sm:mb-6">
                          <span className="text-3xl sm:text-4xl font-serif font-bold">${plan.price}</span>
                          <span className="text-muted-foreground text-sm sm:text-base">/month</span>
                        </div>

                        {/* Features */}
                        <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${
                                plan.color === "coral" ? "bg-coral-soft" : "bg-lavender-soft"
                              }`}>
                                <Check className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                                  plan.color === "coral" ? "text-coral" : "text-lavender"
                                }`} />
                              </div>
                              <span className="text-xs sm:text-sm text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <Link to="/home">
                          <Button 
                            variant={isPopular ? "hero" : "glass"} 
                            size="lg" 
                            className="w-full text-sm sm:text-base"
                          >
                            Start Free Trial
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-border hover:bg-secondary" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-border hover:bg-secondary" />
            </div>
          </Carousel>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8">
          Cancel anytime. We'll remind you before your trial ends.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
