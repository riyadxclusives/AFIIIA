import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, ArrowLeft, Heart, Calendar, Thermometer, Droplets } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface FertilityModeStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FertilityModeStep = ({ data, updateData, onNext, onBack }: FertilityModeStepProps) => {
  const isValid = data.averageCycleLength && data.lastPeriodDate;

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-coral-soft flex items-center justify-center">
          <Heart className="w-8 h-8 text-coral" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Fertility Tracking
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Let's set up your fertility tracking preferences
        </p>

        <div className="space-y-6 max-w-sm mx-auto">
          {/* Cycle Length */}
          <div className="space-y-2">
            <Label htmlFor="cycleLength" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-lavender" />
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

          {/* BBT Tracking */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-soft flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-teal" />
              </div>
              <div>
                <Label className="font-medium">Track BBT</Label>
                <p className="text-xs text-muted-foreground">Basal Body Temperature</p>
              </div>
            </div>
            <Switch
              checked={data.trackBBT}
              onCheckedChange={(checked) => updateData({ trackBBT: checked })}
            />
          </div>

          {/* Mucus Tracking */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lavender-soft flex items-center justify-center">
                <Droplets className="w-5 h-5 text-lavender" />
              </div>
              <div>
                <Label className="font-medium">Track Cervical Mucus</Label>
                <p className="text-xs text-muted-foreground">For fertility awareness</p>
              </div>
            </div>
            <Switch
              checked={data.trackMucus}
              onCheckedChange={(checked) => updateData({ trackMucus: checked })}
            />
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6 max-w-sm mx-auto">
          ⚠️ AFIIIA provides estimates only. Always consult your healthcare provider for medical advice.
        </p>

        <div className="flex gap-3 mt-6 max-w-sm mx-auto">
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

export default FertilityModeStep;
