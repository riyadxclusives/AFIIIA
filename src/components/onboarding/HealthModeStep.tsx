import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Calendar, Heart, Baby } from "lucide-react";
import { OnboardingData, HealthMode } from "@/pages/onboarding/OnboardingPage";

interface HealthModeStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const healthModes = [
  {
    id: "normal_cycle" as HealthMode,
    title: "Normal Cycle",
    description: "Track your menstrual cycle and get phase-aware recommendations",
    icon: Calendar,
    color: "lavender",
  },
  {
    id: "fertility" as HealthMode,
    title: "Fertility Focus",
    description: "Track ovulation, BBT, and get fertility-optimized insights",
    icon: Heart,
    color: "coral",
  },
  {
    id: "pregnant" as HealthMode,
    title: "Pregnancy",
    description: "Week-by-week guidance, safe workouts, and nutrition for pregnancy",
    icon: Baby,
    color: "teal",
  },
];

const HealthModeStep = ({ data, updateData, onNext, onBack }: HealthModeStepProps) => {
  const isValid = data.healthMode !== null;

  const colorClasses = {
    coral: {
      selected: "bg-coral-soft/40 border-coral ring-2 ring-coral shadow-glow-coral",
      unselected: "bg-card border-border hover:border-coral/50 hover:bg-coral-soft/20",
      icon: "bg-coral-soft text-coral",
    },
    lavender: {
      selected: "bg-lavender-soft/40 border-lavender ring-2 ring-lavender shadow-glow-lavender",
      unselected: "bg-card border-border hover:border-lavender/50 hover:bg-lavender-soft/20",
      icon: "bg-lavender-soft text-lavender",
    },
    teal: {
      selected: "bg-teal-soft/40 border-teal ring-2 ring-teal shadow-glow-teal",
      unselected: "bg-card border-border hover:border-teal/50 hover:bg-teal-soft/20",
      icon: "bg-teal-soft text-teal",
    },
  };

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Choose Your Mode
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Select what best describes your current focus
        </p>

        <div className="space-y-4">
          {healthModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = data.healthMode === mode.id;
            const colors = colorClasses[mode.color as keyof typeof colorClasses];

            return (
              <button
                key={mode.id}
                onClick={() => updateData({ healthMode: mode.id })}
                className={`
                  w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300 text-left
                  ${isSelected ? colors.selected : colors.unselected}
                `}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.icon}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold mb-1">{mode.title}</h3>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          You can change your mode anytime in settings
        </p>

        <div className="flex gap-3 mt-6">
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

export default HealthModeStep;
