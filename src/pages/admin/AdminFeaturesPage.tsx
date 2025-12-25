import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ToggleLeft,
  Search,
  Info,
  History,
  AlertTriangle,
  Check,
  RotateCcw,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "core" | "ai" | "social" | "experimental";
  lastModified: string;
  modifiedBy: string;
}

const defaultFeatures: FeatureFlag[] = [
  {
    id: "buddy_challenges",
    name: "Buddy Challenges",
    description: "Allow users to create and participate in buddy challenges with friends",
    enabled: true,
    category: "social",
    lastModified: "Jan 15, 2024",
    modifiedBy: "Admin",
  },
  {
    id: "pregnancy_center",
    name: "Pregnancy Center",
    description: "Enable pregnancy tracking mode with week-by-week content and tools",
    enabled: true,
    category: "core",
    lastModified: "Jan 10, 2024",
    modifiedBy: "Admin",
  },
  {
    id: "ai_meal_planner",
    name: "AI Meal Planner",
    description: "Generate personalized meal plans using AI based on ingredients and preferences",
    enabled: true,
    category: "ai",
    lastModified: "Jan 8, 2024",
    modifiedBy: "Admin",
  },
  {
    id: "ai_workout_planner",
    name: "AI Workout Planner",
    description: "Create AI-powered workout plans based on user goals and fitness level",
    enabled: true,
    category: "ai",
    lastModified: "Jan 8, 2024",
    modifiedBy: "Admin",
  },
  {
    id: "ai_mood_insights",
    name: "AI Mood Insights",
    description: "Provide AI-generated insights and correlations from mood data",
    enabled: true,
    category: "ai",
    lastModified: "Jan 5, 2024",
    modifiedBy: "Admin",
  },
  {
    id: "fertility_tracking",
    name: "Fertility Tracking",
    description: "Enable fertility-focused tracking with BBT and symptom logging",
    enabled: true,
    category: "core",
    lastModified: "Jan 3, 2024",
    modifiedBy: "Admin",
  },
  {
    id: "push_notifications",
    name: "Push Notifications",
    description: "Send web push notifications for reminders and updates",
    enabled: true,
    category: "core",
    lastModified: "Jan 1, 2024",
    modifiedBy: "Admin",
  },
  {
    id: "dark_mode",
    name: "Dark Mode",
    description: "Allow users to switch between light and dark themes",
    enabled: false,
    category: "experimental",
    lastModified: "Dec 20, 2023",
    modifiedBy: "Admin",
  },
  {
    id: "social_sharing",
    name: "Social Sharing",
    description: "Enable sharing achievements and milestones on social media",
    enabled: false,
    category: "social",
    lastModified: "Dec 15, 2023",
    modifiedBy: "Admin",
  },
  {
    id: "ai_daily_insights",
    name: "AI Daily Insights",
    description: "Generate personalized daily wellness insights using AI",
    enabled: true,
    category: "ai",
    lastModified: "Dec 10, 2023",
    modifiedBy: "Admin",
  },
];

const STORAGE_KEY = "afiiia_feature_flags";

const categoryColors = {
  core: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  social: "bg-green-500/20 text-green-400 border-green-500/30",
  experimental: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const AdminFeaturesPage = () => {
  const [features, setFeatures] = useState<FeatureFlag[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [resetDialog, setResetDialog] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFeatures(JSON.parse(stored));
      } catch (e) {
        setFeatures(defaultFeatures);
      }
    } else {
      setFeatures(defaultFeatures);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (features.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(features));
    }
  }, [features]);

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || feature.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => {
      if (feature.id === featureId) {
        const newState = !feature.enabled;
        toast.success(
          `${feature.name} ${newState ? "enabled" : "disabled"}`,
          {
            description: `Feature flag updated successfully`,
          }
        );
        return {
          ...feature,
          enabled: newState,
          lastModified: new Date().toLocaleDateString("en-US", { 
            month: "short", 
            day: "numeric", 
            year: "numeric" 
          }),
        };
      }
      return feature;
    }));
  };

  const resetToDefaults = () => {
    setFeatures(defaultFeatures);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFeatures));
    toast.success("Feature flags reset to defaults");
    setResetDialog(false);
  };

  const enabledCount = features.filter(f => f.enabled).length;
  const disabledCount = features.filter(f => !f.enabled).length;

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Feature Flags</h1>
            <p className="text-slate-400 text-sm mt-1">
              Toggle features on or off across the platform
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">{enabledCount} Enabled</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 border border-slate-600">
              <ToggleLeft className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">{disabledCount} Disabled</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => setResetDialog(true)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "core", "ai", "social", "experimental"].map((category) => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter(category)}
                    className={
                      categoryFilter === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700"
                    }
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature List */}
        <div className="space-y-4">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`bg-slate-800/50 border-slate-700/50 transition-all ${
                feature.enabled ? "border-l-4 border-l-green-500" : "border-l-4 border-l-slate-600"
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-white">{feature.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={categoryColors[feature.category]}
                        >
                          {feature.category}
                        </Badge>
                        {feature.category === "experimental" && (
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 border-slate-700 text-white">
                              Experimental feature - use with caution
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <History className="w-3 h-3" />
                          Modified {feature.lastModified}
                        </span>
                        <span>by {feature.modifiedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={feature.id}
                          checked={feature.enabled}
                          onCheckedChange={() => toggleFeature(feature.id)}
                          className="data-[state=checked]:bg-green-500"
                        />
                        <Label 
                          htmlFor={feature.id} 
                          className={`text-sm font-medium ${
                            feature.enabled ? "text-green-400" : "text-slate-500"
                          }`}
                        >
                          {feature.enabled ? "ON" : "OFF"}
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredFeatures.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-12 text-center">
              <ToggleLeft className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No features found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-300">
                  <strong>Note:</strong> Feature flag changes take effect immediately across all users and are persisted locally. 
                  Some features may require users to refresh their browser to see the changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={resetDialog} onOpenChange={setResetDialog}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Reset Feature Flags</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to reset all feature flags to their default values? This will undo any custom changes you've made.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={resetToDefaults}
              className="bg-primary hover:bg-primary/90"
            >
              Reset to Defaults
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminFeaturesPage;
