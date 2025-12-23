import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Plus,
  Send,
  Clock,
  Users,
  Edit2,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Calendar,
  Filter,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const notificationTemplates = [
  { id: "1", name: "Cycle Reminder", type: "cycle", trigger: "3 days before period", status: "active", sent: 12453, opened: 8234 },
  { id: "2", name: "Hydration Reminder", type: "hydration", trigger: "Daily at 10am, 2pm, 6pm", status: "active", sent: 45234, opened: 28123 },
  { id: "3", name: "Workout Motivation", type: "workout", trigger: "Daily at 7am", status: "active", sent: 23456, opened: 15678 },
  { id: "4", name: "Mood Check-in", type: "mood", trigger: "Daily at 8pm", status: "paused", sent: 34567, opened: 21234 },
  { id: "5", name: "Weekly Summary", type: "summary", trigger: "Every Sunday 6pm", status: "active", sent: 8234, opened: 6123 },
];

const recentNotifications = [
  { id: "1", title: "Your period is coming in 3 days", recipients: 1234, sentAt: "2 hours ago", status: "delivered" },
  { id: "2", title: "Time to hydrate! 💧", recipients: 3456, sentAt: "4 hours ago", status: "delivered" },
  { id: "3", title: "Morning workout ready for you", recipients: 2345, sentAt: "6 hours ago", status: "delivered" },
  { id: "4", title: "How are you feeling today?", recipients: 4567, sentAt: "12 hours ago", status: "failed" },
  { id: "5", title: "Your weekly wellness report", recipients: 5678, sentAt: "1 day ago", status: "delivered" },
];

const AdminNotificationsPage = () => {
  const [templates, setTemplates] = useState(notificationTemplates);

  const toggleTemplate = (id: string) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === id) {
        const newStatus = t.status === "active" ? "paused" : "active";
        toast.success(`Template ${newStatus === "active" ? "activated" : "paused"}`);
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const stats = [
    { label: "Total Sent (30d)", value: "124,567", icon: Send, color: "text-blue-400" },
    { label: "Open Rate", value: "67.3%", icon: CheckCircle, color: "text-green-400" },
    { label: "Active Templates", value: templates.filter(t => t.status === "active").length.toString(), icon: Bell, color: "text-purple-400" },
    { label: "Scheduled Today", value: "12", icon: Clock, color: "text-coral" },
  ];

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
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage push notification templates and schedules
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-slate-400">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="templates" className="data-[state=active]:bg-slate-700">
              Templates
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Notification Templates</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure automated notification templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Template</TableHead>
                      <TableHead className="text-slate-400">Trigger</TableHead>
                      <TableHead className="text-slate-400">Sent</TableHead>
                      <TableHead className="text-slate-400">Opened</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400 w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id} className="border-slate-700/50 hover:bg-slate-700/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                              <Bell className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-white">{template.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-400 text-sm">{template.trigger}</TableCell>
                        <TableCell className="text-slate-400">{template.sent.toLocaleString()}</TableCell>
                        <TableCell className="text-slate-400">{template.opened.toLocaleString()}</TableCell>
                        <TableCell>
                          <Switch
                            checked={template.status === "active"}
                            onCheckedChange={() => toggleTemplate(template.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-slate-400">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem className="text-slate-300">
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Recent Notifications</CardTitle>
                <CardDescription className="text-slate-400">
                  History of sent notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Notification</TableHead>
                      <TableHead className="text-slate-400">Recipients</TableHead>
                      <TableHead className="text-slate-400">Sent</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentNotifications.map((notif) => (
                      <TableRow key={notif.id} className="border-slate-700/50 hover:bg-slate-700/30">
                        <TableCell className="font-medium text-white">{notif.title}</TableCell>
                        <TableCell className="text-slate-400">{notif.recipients.toLocaleString()}</TableCell>
                        <TableCell className="text-slate-400">{notif.sentAt}</TableCell>
                        <TableCell>
                          <Badge className={notif.status === "delivered" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-red-500/20 text-red-400"
                          }>
                            {notif.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Push Notification Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure VAPID keys and notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">VAPID Public Key</label>
                    <Input 
                      placeholder="BNz..." 
                      className="bg-slate-700/50 border-slate-600 text-white font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">VAPID Private Key</label>
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
