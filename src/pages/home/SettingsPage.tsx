import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  BellOff, 
  Utensils, 
  Dumbbell, 
  Droplets, 
  Calendar,
  Heart,
  Moon,
  Shield,
  LogOut,
  Trash2,
  ExternalLink,
  ChevronRight,
  Smartphone,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  enabled: boolean;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [pushEnabled, setPushEnabled] = useState(true);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { id: "meals", label: "Meal Reminders", description: "Get reminded to plan your meals", icon: Utensils, color: "teal", enabled: true },
    { id: "workouts", label: "Workout Reminders", description: "Stay on track with exercise", icon: Dumbbell, color: "coral", enabled: true },
    { id: "hydration", label: "Hydration Reminders", description: "Remember to drink water", icon: Droplets, color: "teal", enabled: true },
    { id: "cycle", label: "Cycle Notifications", description: "Period and phase alerts", icon: Calendar, color: "lavender", enabled: true },
    { id: "mood", label: "Mood Check-ins", description: "Daily mood reminders", icon: Heart, color: "coral", enabled: false },
    { id: "sleep", label: "Sleep Reminders", description: "Wind down notifications", icon: Moon, color: "lavender", enabled: false },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, enabled: !n.enabled } : n
    ));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been signed out successfully.",
    });
    navigate("/login");
  };

  const colorClasses: Record<string, string> = {
    coral: "bg-coral-soft/50 text-coral",
    lavender: "bg-lavender-soft/50 text-lavender",
    teal: "bg-teal-soft/50 text-teal",
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your app preferences
          </p>
        </div>

        {/* Push Notifications Master Toggle */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pushEnabled ? "bg-gradient-primary" : "bg-muted"}`}>
                  {pushEnabled ? (
                    <Bell className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <BellOff className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {pushEnabled ? "Notifications are enabled" : "All notifications are disabled"}
                  </p>
                </div>
              </div>
              <Switch
                checked={pushEnabled}
                onCheckedChange={setPushEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Categories */}
        {pushEnabled && (
          <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Notification Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div 
                    key={notification.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[notification.color]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <Label className="font-medium cursor-pointer">
                          {notification.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notification.enabled}
                      onCheckedChange={() => toggleNotification(notification.id)}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Install PWA */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-lavender-soft/50 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h3 className="font-semibold">Install AFIIIA</h3>
                  <p className="text-sm text-muted-foreground">
                    Add to your home screen for quick access
                  </p>
                </div>
              </div>
              <Link to="/install" state={{ from: "/home/settings" }}>
                <Button variant="hero" size="sm" className="rounded-full px-5">
                  Install
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Link to="/privacy" state={{ from: "/home/settings" }} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <span className="font-medium">Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link to="/terms" state={{ from: "/home/settings" }} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <span className="font-medium">Terms of Service</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <span className="font-medium">Export My Data</span>
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-lavender" />
              About AFIIIA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Version 1.0.0</p>
              <p>© 2024 AFIIIA. All rights reserved.</p>
              <p className="text-xs mt-4">
                AFIIIA provides lifestyle guidance only and is not a substitute for medical advice. 
                Always consult your healthcare provider for medical decisions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-destructive">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-5 h-5 mr-3" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account 
                    and remove all your data from our servers, including your wellness history, 
                    progress, and preferences.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
