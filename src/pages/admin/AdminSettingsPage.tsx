import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Key,
  Shield,
  Database,
  Trash2,
  Save,
  AlertTriangle,
  Info,
  Clock,
  Zap,
  Loader2,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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

type DangerAction = "clear_logs" | "reset_flags" | "purge_data" | null;

const AdminSettingsPage = () => {
  const [bytezApiKey, setBytezApiKey] = useState("");
  const [retentionDays, setRetentionDays] = useState("365");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [dangerDialog, setDangerDialog] = useState<{ open: boolean; action: DangerAction }>({ open: false, action: null });
  const [isExecutingDanger, setIsExecutingDanger] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    toast.success("Settings saved successfully");
  };

  const getDangerDialogContent = () => {
    switch (dangerDialog.action) {
      case "clear_logs":
        return {
          title: "Clear All AI Logs",
          description: "This will permanently delete all AI interaction logs. This action cannot be undone.",
          confirmText: "Clear Logs",
        };
      case "reset_flags":
        return {
          title: "Reset All Feature Flags",
          description: "This will reset all feature flags to their default values. Some features may become unavailable.",
          confirmText: "Reset Flags",
        };
      case "purge_data":
        return {
          title: "Purge All User Data",
          description: "This will permanently delete ALL user data from the database. This action is irreversible and will affect all users.",
          confirmText: "Purge Data",
        };
      default:
        return { title: "", description: "", confirmText: "" };
    }
  };

  const executeDangerAction = async () => {
    setIsExecutingDanger(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExecutingDanger(false);
    
    switch (dangerDialog.action) {
      case "clear_logs":
        toast.success("AI logs cleared successfully");
        break;
      case "reset_flags":
        toast.success("Feature flags reset to defaults");
        break;
      case "purge_data":
        toast.success("All user data has been purged");
        break;
    }
    
    setDangerDialog({ open: false, action: null });
  };

  const dialogContent = getDangerDialogContent();

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 text-sm mt-1">
            System configuration and API settings
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="general" className="data-[state=active]:bg-slate-700">
              General
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-slate-700">
              API Keys
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-slate-700">
              Data & Privacy
            </TabsTrigger>
            <TabsTrigger value="danger" className="data-[state=active]:bg-slate-700">
              Danger Zone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">General Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure system-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-white">AI Features</p>
                      <p className="text-sm text-slate-400">Enable AI-powered features across the app</p>
                    </div>
                  </div>
                  <Switch
                    checked={aiEnabled}
                    onCheckedChange={setAiEnabled}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="font-medium text-white">Maintenance Mode</p>
                      <p className="text-sm text-slate-400">Show maintenance page to all users</p>
                    </div>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                    className="data-[state=checked]:bg-yellow-500"
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Default Timezone</Label>
                    <select className="w-full h-10 px-3 rounded-md bg-slate-700/50 border border-slate-600 text-white">
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">App Version</Label>
                    <Input
                      value="1.0.0"
                      disabled
                      className="bg-slate-700/50 border-slate-600 text-slate-400"
                    />
                  </div>
                </div>

                <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Configuration
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage external API keys and integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      API keys are stored securely and encrypted. Never share these keys publicly.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Bytez AI API Key</Label>
                    <Input
                      type="password"
                      value={bytezApiKey}
                      onChange={(e) => setBytezApiKey(e.target.value)}
                      placeholder="Enter your Bytez API key"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                    <p className="text-xs text-slate-500">Used for AI meal planning, workout generation, and insights</p>
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="space-y-2">
                    <Label className="text-slate-300">Supabase Project URL</Label>
                    <Input
                      value="https://project-ref.supabase.co"
                      disabled
                      className="bg-slate-700/50 border-slate-600 text-slate-400 font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Supabase Anon Key</Label>
                    <Input
                      type="password"
                      value="eyJhbG...configured"
                      disabled
                      className="bg-slate-700/50 border-slate-600 text-slate-400"
                    />
                  </div>
                </div>

                <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save API Keys
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data & Privacy
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure data retention and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Data Retention Period (days)</Label>
                    <Input
                      type="number"
                      value={retentionDays}
                      onChange={(e) => setRetentionDays(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                    <p className="text-xs text-slate-500">
                      User data older than this will be automatically deleted (0 = never delete)
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-white">Auto-purge AI Logs</p>
                        <p className="text-sm text-slate-400">Delete AI interaction logs after 30 days</p>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-white">GDPR Compliance Mode</p>
                        <p className="text-sm text-slate-400">Enforce strict data handling policies</p>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                  </div>
                </div>

                <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger">
            <Card className="bg-slate-800/50 border-red-900/30 border">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Irreversible actions that affect the entire system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-red-400 mb-2">Clear All AI Logs</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Permanently delete all AI interaction logs. This cannot be undone.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                    onClick={() => setDangerDialog({ open: true, action: "clear_logs" })}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear AI Logs
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-red-400 mb-2">Reset All Feature Flags</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Reset all feature flags to their default values.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                    onClick={() => setDangerDialog({ open: true, action: "reset_flags" })}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Reset Feature Flags
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-red-400 mb-2">Purge All User Data</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Delete ALL user data from the database. This action is irreversible.
                  </p>
                  <Button 
                    variant="destructive" 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setDangerDialog({ open: true, action: "purge_data" })}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Purge All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Danger Action Confirmation Dialog */}
      <AlertDialog open={dangerDialog.open} onOpenChange={(open) => setDangerDialog({ open, action: dangerDialog.action })}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              {dialogContent.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              disabled={isExecutingDanger}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDangerAction}
              disabled={isExecutingDanger}
              className="bg-red-600 hover:bg-red-700"
            >
              {isExecutingDanger ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                dialogContent.confirmText
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
