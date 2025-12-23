import { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { useAppSettings } from "@/hooks/useSupabase";
import { useAdminUpdateSetting } from "@/hooks/useAdminData";

const AdminSettingsPage = () => {
  const { data: settings, isLoading } = useAppSettings();
  const updateSetting = useAdminUpdateSetting();
  
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowSignups, setAllowSignups] = useState(true);
  const [appName, setAppName] = useState("AFIIIA");
  const [supportEmail, setSupportEmail] = useState("support@afiiia.com");

  useEffect(() => {
    if (settings) {
      const maintenanceSetting = settings.find(s => s.key === 'maintenance_mode');
      const signupSetting = settings.find(s => s.key === 'allow_signups');
      const nameSetting = settings.find(s => s.key === 'app_name');
      const emailSetting = settings.find(s => s.key === 'support_email');
      
      if (maintenanceSetting) setMaintenanceMode(JSON.parse(String(maintenanceSetting.value)));
      if (signupSetting) setAllowSignups(JSON.parse(String(signupSetting.value)));
      if (nameSetting) setAppName(JSON.parse(String(nameSetting.value)));
      if (emailSetting) setSupportEmail(JSON.parse(String(emailSetting.value)));
    }
  }, [settings]);

  const handleSaveGeneral = async () => {
    await updateSetting.mutateAsync({ key: 'maintenance_mode', value: maintenanceMode });
    await updateSetting.mutateAsync({ key: 'allow_signups', value: allowSignups });
    await updateSetting.mutateAsync({ key: 'app_name', value: appName });
    await updateSetting.mutateAsync({ key: 'support_email', value: supportEmail });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
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
                <CardTitle className="text-slate-100">General Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure system-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-slate-100">Allow Signups</p>
                      <p className="text-sm text-slate-400">Allow new users to register</p>
                    </div>
                  </div>
                  <Switch
                    checked={allowSignups}
                    onCheckedChange={setAllowSignups}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="font-medium text-slate-100">Maintenance Mode</p>
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
                    <Label className="text-slate-300">App Name</Label>
                    <Input
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Support Email</Label>
                    <Input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSaveGeneral} 
                  className="bg-primary hover:bg-primary/90"
                  disabled={updateSetting.isPending}
                >
                  {updateSetting.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
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
                      API keys are stored securely as Supabase secrets. Use the Supabase dashboard to manage them.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Supabase Project</Label>
                    <Input
                      value="Connected ✓"
                      disabled
                      className="bg-slate-700/50 border-slate-600 text-green-400 font-mono text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data & Privacy
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Configure data retention and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-100">Auto-purge AI Logs</p>
                      <p className="text-sm text-slate-400">Delete AI interaction logs after 30 days</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-100">GDPR Compliance Mode</p>
                      <p className="text-sm text-slate-400">Enforce strict data handling policies</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
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
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear AI Logs
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-red-400 mb-2">Reset All Settings</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Reset all app settings to their default values.
                  </p>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                    <Settings className="w-4 h-4 mr-2" />
                    Reset Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
