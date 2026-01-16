import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import logo from "@/assets/logo.jpg";

const plans = [
  {
    id: "radiance",
    name: "Radiance",
    price: "19.99",
    description: "Full access to all features",
    features: [
      "Everything in Bloom",
      "Advanced AI meal planning",
      "Personalized workout plans",
      "Fertility & pregnancy modes",
      "Mood correlations & insights",
      "Buddy challenges",
      "Priority AI responses",
      "Exclusive content library",
    ],
    color: "coral" as const,
    popular: true,
  },
  {
    id: "bloom",
    name: "Bloom",
    price: "10.99",
    description: "Perfect for getting started",
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
];

const SubscribePage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("radiance");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = () => {
    setIsLoading(true);
    // Simulate subscription process
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-safe">
      {/* Background blobs - smaller on mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-coral-soft/20 blob float" />
        <div className="absolute top-1/3 -left-16 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-lavender-soft/20 blob float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header - compact on mobile */}
      <header className="relative z-10 p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="AFIIIA" className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl object-cover" />
            <span className="font-serif text-lg sm:text-xl font-semibold text-gradient">AFIIIA</span>
          </div>
          <Link to="/onboarding">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Content - mobile optimized spacing */}
      <main className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-4xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed">
            Start with a 14-day free trial. Cancel anytime before it ends and pay nothing.
          </p>
        </div>

        {/* Plan Cards Carousel - full width on mobile */}
        <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto mb-6 sm:mb-8">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-3">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const isPopular = plan.popular;

                return (
                  <CarouselItem key={plan.id} className="pl-2 sm:pl-3 basis-[88%] sm:basis-[90%] md:basis-full">
                    <Card
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`
                        relative cursor-pointer transition-all duration-300 h-full
                        ${isSelected 
                          ? plan.color === "coral" 
                            ? "ring-2 ring-coral shadow-glow-coral" 
                            : "ring-2 ring-lavender shadow-glow-lavender"
                          : "hover:shadow-elevated"
                        }
                      `}
                    >
                      {isPopular && (
                        <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-coral text-primary-foreground px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1 z-10">
                          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          Most Popular
                        </div>
                      )}

                      <CardHeader className="pt-6 sm:pt-8 pb-2 sm:pb-4 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-serif text-xl sm:text-2xl">{plan.name}</CardTitle>
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                            isSelected 
                              ? plan.color === "coral" ? "border-coral bg-coral" : "border-lavender bg-lavender"
                              : "border-border"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1">{plan.description}</p>
                      </CardHeader>

                      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="mb-4 sm:mb-6">
                          <span className="text-3xl sm:text-4xl font-serif font-bold">${plan.price}</span>
                          <span className="text-muted-foreground text-sm sm:text-base">/month</span>
                        </div>

                        <ul className="space-y-2 sm:space-y-3">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start sm:items-center gap-2 sm:gap-3">
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${
                                plan.color === "coral" ? "bg-coral-soft" : "bg-lavender-soft"
                              }`}>
                                <Check className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                                  plan.color === "coral" ? "text-coral" : "text-lavender"
                                }`} />
                              </div>
                              <span className="text-xs sm:text-sm leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
              <CarouselPrevious className="static translate-y-0 h-8 w-8 sm:h-10 sm:w-10 border-border hover:bg-secondary" />
              <CarouselNext className="static translate-y-0 h-8 w-8 sm:h-10 sm:w-10 border-border hover:bg-secondary" />
            </div>
          </Carousel>
        </div>

        {/* Subscribe Button - full width on mobile */}
        <div className="text-center px-2 sm:px-0">
          <Button
            variant="hero"
            size="xl"
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full sm:w-auto sm:min-w-[280px] md:min-w-[300px] text-sm sm:text-base py-3 sm:py-4"
          >
            {isLoading ? "Setting up..." : "Start 14-Day Free Trial"}
          </Button>
          
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4">
            Cancel anytime during your trial. You'll be reminded before it ends.
          </p>
        </div>

        {/* Terms - smaller on mobile */}
        <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-6 sm:mt-8 px-4">
          By subscribing, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </main>
    </div>
  );
};

export default SubscribePage;
