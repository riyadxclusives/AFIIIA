import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Frown, Meh, Smile, Heart, Moon, Battery, History, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCreateMoodEntry, useMoodEntries } from "@/hooks/useSupabase";

const moodEmojis = [
  { icon: Frown, label: "Low", value: "1", color: "coral" },
  { icon: Meh, label: "Okay", value: "2", color: "coral" },
  { icon: Smile, label: "Good", value: "3", color: "teal" },
  { icon: Heart, label: "Great", value: "4", color: "lavender" },
];

const symptoms = [
  "Cramps", "Headache", "Bloating", "Fatigue", "Anxiety", "Back Pain"
];

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [sleepQuality, setSleepQuality] = useState([3]);
  const [energyLevel, setEnergyLevel] = useState([3]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  
  const { data: recentMoods } = useMoodEntries();
  const createMood = useCreateMoodEntry();

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = async () => {
    if (!selectedMood) return;
    
    await createMood.mutateAsync({
      mood: selectedMood,
      energy_level: energyLevel[0],
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : null,
      notes: notes || null,
    });

    // Reset form
    setSelectedMood(null);
    setEnergyLevel([3]);
    setSleepQuality([3]);
    setSelectedSymptoms([]);
    setNotes("");
  };

  const getInsight = () => {
    if (!recentMoods || recentMoods.length < 3) {
      return "Log a few more mood check-ins to unlock personalized insights about your patterns.";
    }
    
    const avgEnergy = recentMoods.slice(0, 7).reduce((sum, m) => sum + m.energy_level, 0) / Math.min(recentMoods.length, 7);
    
    if (avgEnergy < 2.5) {
      return "Your energy has been lower recently. Consider adding more iron-rich foods and getting extra rest.";
    } else if (avgEnergy > 3.5) {
      return "Great energy levels! Keep up your current routine - it's clearly working for you.";
    }
    return "Based on your recent logs, your mood tends to dip slightly during your luteal phase. Consider adding more magnesium-rich foods and gentle yoga sessions during this time.";
  };

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

        {/* Symptoms */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Any Symptoms?</h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isSelected 
                        ? "bg-coral text-primary-foreground" 
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    {symptom}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.28s" }}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Additional Notes</h3>
            <Textarea
              placeholder="How are you feeling? Any thoughts you'd like to capture..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
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
              {getInsight()}
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full animate-fade-in" 
          style={{ animationDelay: "0.35s" }}
          onClick={handleSave}
          disabled={!selectedMood || createMood.isPending}
        >
          {createMood.isPending ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Heart className="w-5 h-5 mr-2" />
          )}
          {createMood.isPending ? "Saving..." : "Save Check-in"}
        </Button>
      </div>
    </AppLayout>
  );
};

export default MoodPage;
