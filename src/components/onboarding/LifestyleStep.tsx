import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Utensils, Moon, Clock, Brain } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface LifestyleStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const dietOptions = [
  { value: "omnivore", label: "Omnivore" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "keto", label: "Keto" },
  { value: "paleo", label: "Paleo" },
];

const sleepOptions = [
  { value: "early_bird", label: "Early Bird (before 10pm)" },
  { value: "moderate", label: "Moderate (10pm-12am)" },
  { value: "night_owl", label: "Night Owl (after 12am)" },
];

const timeOptions = [
  { value: "15min", label: "15 minutes" },
  { value: "30min", label: "30 minutes" },
  { value: "45min", label: "45 minutes" },
  { value: "60min", label: "1 hour+" },
];

const stressOptions = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
  { value: "very_high", label: "Very High" },
];

const LifestyleStep = ({ data, updateData, onNext, onBack }: LifestyleStepProps) => {
  const isValid = data.dietType && data.sleepPattern && data.availableTime && data.stressLevel;

  const OptionButton = ({ 
    value, 
    label, 
    selected, 
    onClick 
  }: { 
    value: string; 
    label: string; 
    selected: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border
        ${selected 
          ? "bg-primary text-primary-foreground border-primary" 
          : "bg-secondary/50 text-foreground border-transparent hover:bg-secondary"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Your Lifestyle
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Help us understand your daily routine
        </p>

        <div className="space-y-6">
          {/* Diet Type */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-teal" />
              Diet Preference
            </Label>
            <div className="flex flex-wrap gap-2">
              {dietOptions.map((option) => (
                <OptionButton
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  selected={data.dietType === option.value}
                  onClick={() => updateData({ dietType: option.value })}
                />
              ))}
            </div>
          </div>

          {/* Sleep Pattern */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-lavender" />
              Sleep Pattern
            </Label>
            <div className="flex flex-wrap gap-2">
              {sleepOptions.map((option) => (
                <OptionButton
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  selected={data.sleepPattern === option.value}
                  onClick={() => updateData({ sleepPattern: option.value })}
                />
              ))}
            </div>
          </div>

          {/* Available Time */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-coral" />
              Daily Workout Time
            </Label>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((option) => (
                <OptionButton
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  selected={data.availableTime === option.value}
                  onClick={() => updateData({ availableTime: option.value })}
                />
              ))}
            </div>
          </div>

          {/* Stress Level */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-lavender" />
              Current Stress Level
            </Label>
            <div className="flex flex-wrap gap-2">
              {stressOptions.map((option) => (
                <OptionButton
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  selected={data.stressLevel === option.value}
                  onClick={() => updateData({ stressLevel: option.value })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
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

export default LifestyleStep;
