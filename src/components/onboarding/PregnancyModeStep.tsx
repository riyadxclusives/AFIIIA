import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Baby, Calendar, AlertCircle } from "lucide-react";
import { OnboardingData } from "@/pages/onboarding/OnboardingPage";

interface PregnancyModeStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PregnancyModeStep = ({ data, updateData, onNext, onBack }: PregnancyModeStepProps) => {
  const isValid = (data.lmpDate || data.dueDate) && data.doctorConfirmed;

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-teal-soft flex items-center justify-center">
          <Baby className="w-8 h-8 text-teal" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2 text-center">
          Pregnancy Details
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Help us calculate your current week
        </p>

        <div className="space-y-6 max-w-sm mx-auto">
          {/* LMP Date */}
          <div className="space-y-2">
            <Label htmlFor="lmpDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-coral" />
              Last Menstrual Period (LMP)
            </Label>
            <Input
              id="lmpDate"
              type="date"
              value={data.lmpDate}
              onChange={(e) => updateData({ lmpDate: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="flex items-center gap-2">
              <Baby className="w-4 h-4 text-teal" />
              Expected Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={data.dueDate}
              onChange={(e) => updateData({ dueDate: e.target.value })}
              className="h-12"
            />
          </div>

          {/* Doctor Confirmation */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-coral-soft/20 border border-coral/20">
            <Checkbox
              id="doctorConfirmed"
              checked={data.doctorConfirmed}
              onCheckedChange={(checked) => updateData({ doctorConfirmed: checked === true })}
              className="mt-1"
            />
            <div>
              <Label htmlFor="doctorConfirmed" className="font-medium cursor-pointer">
                I confirm my pregnancy has been verified by a healthcare provider
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                AFIIIA is not a substitute for medical care
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-xl bg-muted/50 flex gap-3 max-w-sm mx-auto">
          <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            AFIIIA provides lifestyle support only. Always follow your doctor's guidance for prenatal care.
          </p>
        </div>

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

export default PregnancyModeStep;
