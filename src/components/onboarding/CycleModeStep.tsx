import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Calendar, Hash } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface CycleModeStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CycleModeStep = ({ data, updateData, onNext, onBack }: CycleModeStepProps) => {
  const isValid = data.averageCycleLength && data.lastPeriodDate;

  return (
    <Card variant="glass-strong">
      <CardContent className="p-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-lavender-soft flex items-center justify-center">
          <Calendar className="w-8 h-8 text-lavender" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Your Cycle Details
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          This helps us predict your phases accurately
        </p>

        <div className="space-y-6 max-w-sm mx-auto">
          {/* Average Cycle Length */}
          <div className="space-y-2">
            <Label htmlFor="cycleLength" className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-lavender" />
              Average Cycle Length (days)
            </Label>
            <Input
              id="cycleLength"
              type="number"
              placeholder="e.g., 28"
              value={data.averageCycleLength || ""}
              onChange={(e) => updateData({ averageCycleLength: parseInt(e.target.value) || null })}
              className="h-12"
              min={21}
              max={45}
            />
            <p className="text-xs text-muted-foreground">
              Most cycles are between 21-35 days
            </p>
          </div>

          {/* Last Period Date */}
          <div className="space-y-2">
            <Label htmlFor="lastPeriod" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-coral" />
              First Day of Last Period
            </Label>
            <Input
              id="lastPeriod"
              type="date"
              value={data.lastPeriodDate}
              onChange={(e) => updateData({ lastPeriodDate: e.target.value })}
              className="h-12"
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

export default CycleModeStep;
