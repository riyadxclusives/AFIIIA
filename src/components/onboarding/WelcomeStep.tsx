import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const WelcomeStep = ({ data, updateData, onNext }: WelcomeStepProps) => {
  const isValid = data.firstName.trim().length > 0;

  return (
    <Card className="glass-card">
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-3">
          Welcome to AFIIIA
        </h1>
        <p className="text-muted-foreground mb-8">
          Let's personalize your wellness journey. We'll ask you a few questions to create your perfect experience.
        </p>

        <div className="space-y-4 text-left max-w-sm mx-auto">
          <div className="space-y-2">
            <Label htmlFor="firstName">What should we call you?</Label>
            <Input
              id="firstName"
              placeholder="Your first name"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className="h-12"
            />
          </div>
        </div>

        <Button
          variant="hero"
          size="lg"
          className="w-full max-w-sm mt-8 group"
          onClick={onNext}
          disabled={!isValid}
        >
          Let's Begin
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default WelcomeStep;
