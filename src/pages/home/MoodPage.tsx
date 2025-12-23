import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Sparkles, 
  Frown, 
  Meh, 
  Smile, 
  Heart, 
  Moon, 
  Battery, 
  History,
  Flame,
  Brain,
  Droplets,
  Wind,
  AlertCircle,
  Pill,
  Cookie,
  ThermometerSun,
  HeartPulse
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const moodEmojis = [
  { icon: Frown, label: "Low", value: 1, color: "coral" },
  { icon: Meh, label: "Okay", value: 2, color: "coral" },
  { icon: Smile, label: "Good", value: 3, color: "teal" },
  { icon: Heart, label: "Great", value: 4, color: "lavender" },
];

interface SymptomData {
  id: string;
  name: string;
  icon: React.ElementType;
  category: "physical" | "emotional" | "digestive";
}

const symptomsList: SymptomData[] = [
  { id: "cramps", name: "Cramps", icon: Flame, category: "physical" },
  { id: "headache", name: "Headache", icon: Brain, category: "physical" },
  { id: "bloating", name: "Bloating", icon: Wind, category: "digestive" },
  { id: "fatigue", name: "Fatigue", icon: Battery, category: "physical" },
  { id: "anxiety", name: "Anxiety", icon: AlertCircle, category: "emotional" },
  { id: "backpain", name: "Back Pain", icon: HeartPulse, category: "physical" },
  { id: "nausea", name: "Nausea", icon: Pill, category: "digestive" },
  { id: "cravings", name: "Cravings", icon: Cookie, category: "digestive" },
  { id: "breasttenderness", name: "Breast Tenderness", icon: Heart, category: "physical" },
  { id: "hotflashes", name: "Hot Flashes", icon: ThermometerSun, category: "physical" },
  { id: "moodswings", name: "Mood Swings", icon: Droplets, category: "emotional" },
  { id: "irritability", name: "Irritability", icon: AlertCircle, category: "emotional" },
];

interface SelectedSymptom {
  id: string;
  severity: 1 | 2 | 3; // 1=mild, 2=moderate, 3=severe
}

const severityLabels = {
  1: { label: "Mild", color: "bg-teal text-white" },
  2: { label: "Moderate", color: "bg-coral-soft text-coral" },
  3: { label: "Severe", color: "bg-coral text-white" },
};

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [sleepQuality, setSleepQuality] = useState([3]);
  const [energyLevel, setEnergyLevel] = useState([3]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([]);
  const [activeCategory, setActiveCategory] = useState<"all" | "physical" | "emotional" | "digestive">("all");

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const existing = prev.find(s => s.id === symptomId);
      if (existing) {
        // Cycle through severity levels, then remove
        if (existing.severity < 3) {
          return prev.map(s => 
            s.id === symptomId ? { ...s, severity: (s.severity + 1) as 1 | 2 | 3 } : s
          );
        } else {
          return prev.filter(s => s.id !== symptomId);
        }
      } else {
        return [...prev, { id: symptomId, severity: 1 }];
      }
    });
  };

  const getSymptomSeverity = (symptomId: string): SelectedSymptom | undefined => {
    return selectedSymptoms.find(s => s.id === symptomId);
  };

  const filteredSymptoms = activeCategory === "all" 
    ? symptomsList 
    : symptomsList.filter(s => s.category === activeCategory);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in flex items-start justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
              Mood Check-in
            </h1>
            <p className="text-muted-foreground">
              How are you feeling today?
            </p>
          </div>
          <Link to="/home/mood/history">
            <Button variant="outline" size="sm" className="gap-2">
              <History className="w-4 h-4" />
              History
            </Button>
          </Link>
        </div>

        {/* Mood Selection */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Overall Mood</h3>
            <div className="grid grid-cols-4 gap-3">
              {moodEmojis.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.value;
                const colorClasses = {
                  coral: isSelected ? "bg-coral text-primary-foreground" : "bg-coral-soft/30 text-coral hover:bg-coral-soft/50",
                  teal: isSelected ? "bg-teal text-primary-foreground" : "bg-teal-soft/30 text-teal hover:bg-teal-soft/50",
                  lavender: isSelected ? "bg-lavender text-primary-foreground" : "bg-lavender-soft/30 text-lavender hover:bg-lavender-soft/50",
                };
                
                return (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 ${colorClasses[mood.color as keyof typeof colorClasses]} ${isSelected ? "scale-105 shadow-lg" : ""}`}
                  >
                    <Icon className="w-8 h-8" />
                    <span className="text-xs font-medium">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sleep Quality */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-lavender-soft/50 flex items-center justify-center">
                <Moon className="w-5 h-5 text-lavender" />
              </div>
              <div>
                <h3 className="font-semibold">Sleep Quality</h3>
                <p className="text-sm text-muted-foreground">How did you sleep last night?</p>
              </div>
            </div>
            <div className="px-2">
              <Slider
                value={sleepQuality}
                onValueChange={setSleepQuality}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Level */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-soft/50 flex items-center justify-center">
                <Battery className="w-5 h-5 text-teal" />
              </div>
              <div>
                <h3 className="font-semibold">Energy Level</h3>
                <p className="text-sm text-muted-foreground">How's your energy today?</p>
              </div>
            </div>
            <div className="px-2">
              <Slider
                value={energyLevel}
                onValueChange={setEnergyLevel}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms - Enhanced */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Track Symptoms</h3>
              <span className="text-xs text-muted-foreground">Tap to cycle severity</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {[
                { id: "all", label: "All" },
                { id: "physical", label: "Physical" },
                { id: "emotional", label: "Emotional" },
                { id: "digestive", label: "Digestive" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Symptoms Grid */}
            <div className="grid grid-cols-3 gap-2">
              {filteredSymptoms.map((symptom) => {
                const selected = getSymptomSeverity(symptom.id);
                const Icon = symptom.icon;
                
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
                      selected 
                        ? severityLabels[selected.severity].color
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium text-center leading-tight">{symptom.name}</span>
                    {selected && (
                      <Badge 
                        variant="outline" 
                        className={`absolute -top-1 -right-1 text-[10px] px-1.5 py-0 ${
                          selected.severity === 3 ? "bg-coral border-coral text-white" :
                          selected.severity === 2 ? "bg-coral-soft border-coral text-coral" :
                          "bg-teal-soft border-teal text-teal"
                        }`}
                      >
                        {severityLabels[selected.severity].label}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Symptoms Summary */}
            {selectedSymptoms.length > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-coral-soft/20 border border-coral/20">
                <p className="text-sm font-medium mb-2">Logged Symptoms:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSymptoms.map((sym) => {
                    const symptomData = symptomsList.find(s => s.id === sym.id);
                    return (
                      <span 
                        key={sym.id}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          sym.severity === 3 ? "bg-coral text-white" :
                          sym.severity === 2 ? "bg-coral-soft text-coral" :
                          "bg-teal-soft text-teal"
                        }`}
                      >
                        {symptomData?.name} ({severityLabels[sym.severity].label})
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insight Preview */}
        <Card 
          className="bg-gradient-lavender text-primary-foreground border-none animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">AI Mood Insight</span>
            </div>
            <p className="text-sm text-primary-foreground/90 leading-relaxed">
              Based on your recent logs, your mood tends to dip slightly during your luteal phase. 
              Consider adding more magnesium-rich foods and gentle yoga sessions during this time.
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button variant="hero" size="lg" className="w-full animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <Heart className="w-5 h-5 mr-2" />
          Save Check-in
        </Button>
      </div>
    </AppLayout>
  );
};

export default MoodPage;
