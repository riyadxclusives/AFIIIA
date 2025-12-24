import { useState } from "react";
import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Calendar, 
  Ruler, 
  Weight, 
  Target, 
  Edit3, 
  Check, 
  X,
  Sparkles,
  Crown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type HealthMode = "normal_cycle" | "fertility" | "pregnant";

const healthModeLabels = {
  normal_cycle: "Normal Cycle",
  fertility: "Fertility Focus",
  pregnant: "Pregnancy",
};

const healthModeColors = {
  normal_cycle: "lavender",
  fertility: "coral",
  pregnant: "teal",
};

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    email: "sarah@example.com",
    age: 28,
    height: 165,
    weight: 62,
    healthMode: "normal_cycle" as HealthMode,
    goals: ["track_cycle", "eat_better", "manage_stress"],
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const goalLabels: Record<string, string> = {
    track_cycle: "Track my cycle",
    lose_weight: "Lose weight",
    build_muscle: "Build strength",
    eat_better: "Eat healthier",
    manage_stress: "Manage stress",
    sleep_better: "Sleep better",
    boost_energy: "Boost energy",
    fertility: "Support fertility",
  };

  const colorClasses = {
    lavender: "bg-lavender-soft/50 text-lavender border-lavender/30",
    coral: "bg-coral-soft/50 text-coral border-coral/30",
    teal: "bg-teal-soft/50 text-teal border-teal/30",
  };

  return (
    <AppLayout>
      <div className="space-y-4 sm:space-y-6 pb-6 sm:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fade-in">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold mb-0.5 sm:mb-1">
              My Profile
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your account and preferences
            </p>
          </div>
          {!isEditing ? (
            <Button variant="glass" size="sm" onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="ghost" size="sm" onClick={handleCancel} className="flex-1 sm:flex-none">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="hero" size="sm" onClick={handleSave} className="flex-1 sm:flex-none">
                <Check className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>

        {/* Profile Picture & Basic Info */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xl sm:text-2xl font-serif font-bold shrink-0">
                {profile.firstName[0]}
              </div>
              <div className="flex-1 text-center sm:text-left w-full">
                {isEditing ? (
                  <div className="space-y-3 max-w-xs mx-auto sm:mx-0">
                    <div>
                      <Label htmlFor="firstName">Name</Label>
                      <Input
                        id="firstName"
                        value={editedProfile.firstName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold">{profile.firstName}</h2>
                    <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card className="bg-gradient-primary text-primary-foreground border-none animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Radiance Plan</h3>
                  <p className="text-sm text-primary-foreground/80">Trial ends in 12 days</p>
                </div>
              </div>
              <Button variant="glass" size="sm">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Health Mode */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lavender" />
              Health Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(healthModeLabels) as HealthMode[]).map((mode) => {
                  const isSelected = editedProfile.healthMode === mode;
                  const color = healthModeColors[mode];
                  return (
                    <button
                      key={mode}
                      onClick={() => setEditedProfile({ ...editedProfile, healthMode: mode })}
                      className={`
                        p-4 rounded-xl border-2 text-center transition-all
                        ${isSelected 
                          ? `${colorClasses[color]} border-current ring-2 ring-current/30` 
                          : "bg-secondary/50 border-transparent hover:border-border"
                        }
                      `}
                    >
                      <span className="font-medium">{healthModeLabels[mode]}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${colorClasses[healthModeColors[profile.healthMode]]}`}>
                <span className="font-medium">{healthModeLabels[profile.healthMode]}</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              Changing your health mode will adjust meal plans, workouts, and tracking features.
            </p>
          </CardContent>
        </Card>

        {/* Body Metrics */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-coral" />
              Body Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {/* Age */}
              <div className="text-center p-2 sm:p-4 rounded-lg sm:rounded-xl bg-secondary/50">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1.5 sm:mb-2 text-lavender" />
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
                    className="text-center h-7 sm:h-8 text-sm"
                    min={13}
                    max={100}
                  />
                ) : (
                  <div className="text-lg sm:text-2xl font-serif font-bold">{profile.age}</div>
                )}
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Years</div>
              </div>

              {/* Height */}
              <div className="text-center p-2 sm:p-4 rounded-lg sm:rounded-xl bg-secondary/50">
                <Ruler className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1.5 sm:mb-2 text-teal" />
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.height}
                    onChange={(e) => setEditedProfile({ ...editedProfile, height: parseInt(e.target.value) })}
                    className="text-center h-7 sm:h-8 text-sm"
                    min={100}
                    max={250}
                  />
                ) : (
                  <div className="text-lg sm:text-2xl font-serif font-bold">{profile.height}</div>
                )}
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">cm</div>
              </div>

              {/* Weight */}
              <div className="text-center p-2 sm:p-4 rounded-lg sm:rounded-xl bg-secondary/50">
                <Weight className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1.5 sm:mb-2 text-coral" />
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.weight}
                    onChange={(e) => setEditedProfile({ ...editedProfile, weight: parseInt(e.target.value) })}
                    className="text-center h-7 sm:h-8 text-sm"
                    min={30}
                    max={300}
                  />
                ) : (
                  <div className="text-lg sm:text-2xl font-serif font-bold">{profile.weight}</div>
                )}
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">kg</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-teal" />
              My Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {profile.goals.map((goal) => (
                <span
                  key={goal}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-teal-soft/50 text-teal border border-teal/20"
                >
                  {goalLabels[goal] || goal}
                </span>
              ))}
            </div>
            {isEditing && (
              <Button variant="ghost" size="sm" className="mt-3 text-xs sm:text-sm">
                Edit Goals
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
