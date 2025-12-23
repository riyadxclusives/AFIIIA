import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            Simple, Transparent
            <span className="text-gradient block">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            
            return (
              <Card 
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-elevated ${
                  isPopular 
                    ? "border-coral/50 shadow-glow-coral" 
                    : "border-border"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-coral text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-xl">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-serif font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.color === "coral" ? "bg-coral-soft" : "bg-lavender-soft"
                        }`}>
                          <Check className={`w-3 h-3 ${
                            plan.color === "coral" ? "text-coral" : "text-lavender"
                          }`} />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to="/home">
                    <Button 
                      variant={isPopular ? "hero" : "glass"} 
                      size="lg" 
                      className="w-full"
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Cancel anytime. We'll remind you before your trial ends.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
