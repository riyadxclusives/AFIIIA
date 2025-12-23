import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import BodyMetricsStep from "@/components/onboarding/BodyMetricsStep";
import GoalsStep from "@/components/onboarding/GoalsStep";
import LifestyleStep from "@/components/onboarding/LifestyleStep";
import HealthModeStep from "@/components/onboarding/HealthModeStep";
import CycleModeStep from "@/components/onboarding/CycleModeStep";
import FertilityModeStep from "@/components/onboarding/FertilityModeStep";
import PregnancyModeStep from "@/components/onboarding/PregnancyModeStep";
import CongratulationsStep from "@/components/onboarding/CongratulationsStep";
import logo from "@/assets/logo.jpg";

export type HealthMode = "normal_cycle" | "fertility" | "pregnant";

export interface OnboardingData {
  // Basic info
  firstName: string;
  // Body metrics
  age: number | null;
  height: number | null;
  weight: number | null;
  // Goals
  goals: string[];
  // Lifestyle
  dietType: string;
  sleepPattern: string;
  availableTime: string;
  stressLevel: string;
  // Health mode
  healthMode: HealthMode | null;
  // Cycle-specific
  averageCycleLength: number | null;
  lastPeriodDate: string;
  // Fertility-specific
  trackBBT: boolean;
  trackMucus: boolean;
  // Pregnancy-specific
  lmpDate: string;
  dueDate: string;
  doctorConfirmed: boolean;
}

const initialData: OnboardingData = {
  firstName: "",
  age: null,
  height: null,
  weight: null,
  goals: [],
  dietType: "",
  sleepPattern: "",
  availableTime: "",
  stressLevel: "",
  healthMode: null,
  averageCycleLength: 28,
  lastPeriodDate: "",
  trackBBT: false,
  trackMucus: false,
  lmpDate: "",
  dueDate: "",
  doctorConfirmed: false,
};

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  const goToSubscribe = () => {
    // In real app, save data to database first
    navigate("/home/subscribe");
  };

  // Determine total steps based on health mode
  const getSteps = () => {
    const baseSteps = ["welcome", "metrics", "goals", "lifestyle", "healthMode"];
    
    if (data.healthMode === "normal_cycle") {
      return [...baseSteps, "cycleMode", "congrats"];
    } else if (data.healthMode === "fertility") {
      return [...baseSteps, "fertilityMode", "congrats"];
    } else if (data.healthMode === "pregnant") {
      return [...baseSteps, "pregnancyMode", "congrats"];
    }
    
    return [...baseSteps, "congrats"];
  };

  const steps = getSteps();
  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const renderStep = () => {
    const currentStepName = steps[step];

    switch (currentStepName) {
      case "welcome":
        return <WelcomeStep data={data} updateData={updateData} onNext={nextStep} />;
      case "metrics":
        return <BodyMetricsStep data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case "goals":
        return <GoalsStep data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case "lifestyle":
        return <LifestyleStep data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case "healthMode":
        return <HealthModeStep data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case "cycleMode":
        return <CycleModeStep data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case "fertilityMode":
        return <FertilityModeStep data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case "pregnancyMode":
        return <PregnancyModeStep data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case "congrats":
        return <CongratulationsStep data={data} onContinue={goToSubscribe} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral-soft/20 blob float" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-lavender-soft/20 blob float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-teal-soft/20 blob float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AFIIIA" className="h-10 w-10 rounded-xl object-cover" />
            <span className="font-serif text-xl font-semibold text-gradient">AFIIIA</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {step + 1} of {totalSteps}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OnboardingPage;
