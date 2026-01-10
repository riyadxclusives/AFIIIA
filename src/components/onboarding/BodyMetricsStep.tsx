import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Ruler, Weight, Calendar } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface BodyMetricsStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BodyMetricsStep = ({ data, updateData, onNext, onBack }: BodyMetricsStepProps) => {
  const isValid = data.age && data.height && data.weight;

  return (
    <Card variant="glass-strong">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          This helps us personalize your meal plans and workouts
        </p>

        <div className="space-y-6 max-w-sm mx-auto">
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-lavender" />
              Age
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={data.age || ""}
              onChange={(e) => updateData({ age: parseInt(e.target.value) || null })}
              className="h-12"
              min={13}
              max={100}
            />
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="height" className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-teal" />
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={data.height || ""}
              onChange={(e) => updateData({ height: parseInt(e.target.value) || null })}
              className="h-12"
              min={100}
              max={250}
            />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Weight className="w-4 h-4 text-coral" />
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={data.weight || ""}
              onChange={(e) => updateData({ weight: parseInt(e.target.value) || null })}
              className="h-12"
              min={30}
              max={300}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8 max-w-sm mx-auto">
          <Button variant="ghost" size="lg" onClick={onBack} className="flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="hero"
            size="lg"
            className="flex-1 group"
            onClick={onNext}
            disabled={!isValid}
          >
            Continue
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyMetricsStep;
