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
    <div className="min-h-screen bg-gradient-hero">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral-soft/20 blob float" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-lavender-soft/20 blob float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AFIIIA" className="h-10 w-10 rounded-xl object-cover" />
            <span className="font-serif text-xl font-semibold text-gradient">AFIIIA</span>
          </div>
          <Link to="/onboarding">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-3">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start with a 14-day free trial. Cancel anytime before it ends and pay nothing.
          </p>
        </div>

        {/* Plan Cards Carousel */}
        <div className="max-w-lg mx-auto mb-8">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const isPopular = plan.popular;

                return (
                  <CarouselItem key={plan.id} className="pl-2 basis-[85%] sm:basis-full">
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
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-coral text-primary-foreground px-4 py-1 text-sm font-medium rounded-full flex items-center gap-1 z-10">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </div>
                      )}

                      <CardHeader className="pt-8">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected 
                              ? plan.color === "coral" ? "border-coral bg-coral" : "border-lavender bg-lavender"
                              : "border-border"
                          }`}>
                            {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                      </CardHeader>

                      <CardContent>
                        <div className="mb-6">
                          <span className="text-4xl font-serif font-bold">${plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>

                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                plan.color === "coral" ? "bg-coral-soft" : "bg-lavender-soft"
                              }`}>
                                <Check className={`w-3 h-3 ${
                                  plan.color === "coral" ? "text-coral" : "text-lavender"
                                }`} />
                              </div>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-6">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-border hover:bg-secondary" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-border hover:bg-secondary" />
            </div>
          </Carousel>
        </div>

        {/* Subscribe Button */}
        <div className="text-center">
          <Button
            variant="hero"
            size="xl"
            onClick={handleSubscribe}
            disabled={isLoading}
            className="min-w-[300px]"
          >
            {isLoading ? "Setting up..." : "Start 14-Day Free Trial"}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            Cancel anytime during your trial. You'll be reminded before it ends.
          </p>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-muted-foreground mt-8">
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
