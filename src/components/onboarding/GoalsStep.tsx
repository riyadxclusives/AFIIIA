import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Target, Heart, Dumbbell, Brain, Moon, Sparkles } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface GoalsStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const goals = [
  { id: "track_cycle", label: "Track my cycle", icon: Target, color: "lavender" },
  { id: "lose_weight", label: "Lose weight", icon: Dumbbell, color: "coral" },
  { id: "build_muscle", label: "Build strength", icon: Dumbbell, color: "teal" },
  { id: "eat_better", label: "Eat healthier", icon: Heart, color: "teal" },
  { id: "manage_stress", label: "Manage stress", icon: Brain, color: "lavender" },
  { id: "sleep_better", label: "Sleep better", icon: Moon, color: "coral" },
  { id: "boost_energy", label: "Boost energy", icon: Sparkles, color: "teal" },
  { id: "fertility", label: "Support fertility", icon: Heart, color: "lavender" },
];

const GoalsStep = ({ data, updateData, onNext, onBack }: GoalsStepProps) => {
  const toggleGoal = (goalId: string) => {
    const newGoals = data.goals.includes(goalId)
      ? data.goals.filter((g) => g !== goalId)
      : [...data.goals, goalId];
    updateData({ goals: newGoals });
  };

  const isValid = data.goals.length > 0;

  const colorClasses = {
    coral: {
      selected: "bg-coral text-primary-foreground border-coral shadow-glow-coral",
      unselected: "bg-coral-soft/20 border-coral/20 hover:bg-coral-soft/40",
    },
    lavender: {
      selected: "bg-lavender text-primary-foreground border-lavender shadow-glow-lavender",
      unselected: "bg-lavender-soft/20 border-lavender/20 hover:bg-lavender-soft/40",
    },
    teal: {
      selected: "bg-teal text-primary-foreground border-teal shadow-glow-teal",
      unselected: "bg-teal-soft/20 border-teal/20 hover:bg-teal-soft/40",
    },
  };

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-center">
          What are your goals?
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Select all that apply — we'll tailor your experience
        </p>

        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = data.goals.includes(goal.id);
            const colors = colorClasses[goal.color as keyof typeof colorClasses];

            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`
                  p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-300
                  ${isSelected ? colors.selected : colors.unselected}
                `}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium text-center">{goal.label}</span>
              </button>
            );
          })}
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

export default GoalsStep;
