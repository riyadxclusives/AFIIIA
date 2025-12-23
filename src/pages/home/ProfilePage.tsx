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
  Crown,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/hooks/useSupabase";
import { HealthMode } from "@/integrations/supabase";

const healthModeLabels: Record<string, string> = {
  normal_cycle: "Normal Cycle",
  fertility: "Fertility Focus",
  pregnant: "Pregnancy",
};

const healthModeColors: Record<string, string> = {
  normal_cycle: "lavender",
  fertility: "coral",
  pregnant: "teal",
};

const ProfilePage = () => {
  const { toast } = useToast();
  const { profile, refreshProfile } = useAuth();
  const updateProfile = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  
  const [editedProfile, setEditedProfile] = useState({
    first_name: profile?.first_name || "",
    health_mode: profile?.health_mode || "normal_cycle" as HealthMode,
  });

  const handleStartEdit = () => {
    setEditedProfile({
      first_name: profile?.first_name || "",
      health_mode: profile?.health_mode || "normal_cycle",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateProfile.mutateAsync({
      first_name: editedProfile.first_name,
      health_mode: editedProfile.health_mode,
    });
    await refreshProfile();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      first_name: profile?.first_name || "",
      health_mode: profile?.health_mode || "normal_cycle",
    });
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

  const colorClasses: Record<string, string> = {
    lavender: "bg-lavender-soft/50 text-lavender border-lavender/30",
    coral: "bg-coral-soft/50 text-coral border-coral/30",
    teal: "bg-teal-soft/50 text-teal border-teal/30",
  };

  const subscriptionLabels: Record<string, string> = {
    free: "Free Plan",
    bloom: "Bloom Plan",
    radiance: "Radiance Plan",
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
            <Button variant="glass" onClick={handleStartEdit}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCancel} disabled={updateProfile.isPending}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="hero" onClick={handleSave} disabled={updateProfile.isPending}>
                {updateProfile.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
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
                {profile?.first_name?.[0] || profile?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="firstName">Name</Label>
                      <Input
                        id="firstName"
                        value={editedProfile.first_name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, first_name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-semibold">
                      {profile?.first_name || 'Set your name'}
                    </h2>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {profile?.email}
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
                  <h3 className="font-semibold">
                    {subscriptionLabels[profile?.subscription_plan || 'free']}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {profile?.subscription_plan === 'free' ? 'Upgrade for more features' : 'Active subscription'}
                  </p>
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
                  const isSelected = editedProfile.health_mode === mode;
                  const color = healthModeColors[mode];
                  return (
                    <button
                      key={mode}
                      onClick={() => setEditedProfile({ ...editedProfile, health_mode: mode })}
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
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${profile?.health_mode ? colorClasses[healthModeColors[profile.health_mode]] : 'bg-secondary/50'}`}>
                <span className="font-medium">
                  {profile?.health_mode ? healthModeLabels[profile.health_mode] : 'Not set'}
                </span>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              Changing your health mode will adjust meal plans, workouts, and tracking features.
            </p>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-coral" />
              Account Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium">
                  {profile?.created_at 
                    ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })
                    : '-'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">Onboarding</span>
                <span className="font-medium">
                  {profile?.onboarding_completed ? '✅ Completed' : '⏳ In progress'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Subscription</span>
                <span className="font-medium capitalize">
                  {profile?.subscription_plan || 'Free'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
