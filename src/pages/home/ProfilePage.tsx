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
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
          {!isEditing ? (
            <Button variant="glass" onClick={() => setIsEditing(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="hero" onClick={handleSave}>
                <Check className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>

        {/* Profile Picture & Basic Info */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-serif font-bold">
                {profile.firstName[0]}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
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
                    <h2 className="font-serif text-2xl font-semibold">{profile.firstName}</h2>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
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
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {/* Age */}
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <Calendar className="w-5 h-5 mx-auto mb-2 text-lavender" />
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
                    className="text-center h-8"
                    min={13}
                    max={100}
                  />
                ) : (
                  <div className="text-2xl font-serif font-bold">{profile.age}</div>
                )}
                <div className="text-xs text-muted-foreground mt-1">Years</div>
              </div>

              {/* Height */}
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <Ruler className="w-5 h-5 mx-auto mb-2 text-teal" />
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.height}
                    onChange={(e) => setEditedProfile({ ...editedProfile, height: parseInt(e.target.value) })}
                    className="text-center h-8"
                    min={100}
                    max={250}
                  />
                ) : (
                  <div className="text-2xl font-serif font-bold">{profile.height}</div>
                )}
                <div className="text-xs text-muted-foreground mt-1">cm</div>
              </div>

              {/* Weight */}
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <Weight className="w-5 h-5 mx-auto mb-2 text-coral" />
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedProfile.weight}
                    onChange={(e) => setEditedProfile({ ...editedProfile, weight: parseInt(e.target.value) })}
                    className="text-center h-8"
                    min={30}
                    max={300}
                  />
                ) : (
                  <div className="text-2xl font-serif font-bold">{profile.weight}</div>
                )}
                <div className="text-xs text-muted-foreground mt-1">kg</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-teal" />
              My Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.goals.map((goal) => (
                <span
                  key={goal}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-teal-soft/50 text-teal border border-teal/20"
                >
                  {goalLabels[goal] || goal}
                </span>
              ))}
            </div>
            {isEditing && (
              <Button variant="ghost" size="sm" className="mt-3">
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
